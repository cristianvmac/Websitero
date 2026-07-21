import "server-only";
import { createClient, type PostgrestError, type SupabaseClient } from "@supabase/supabase-js";

/* The Supabase handle, secret-key and server-side only.

   SUPABASE_SECRET_KEY is the sb_secret_ key (what Supabase used to call
   service_role) — the only one that bypasses the deny-all RLS on public.briefs.
   The sb_publishable_ key is not interchangeable and fails quietly: reads come
   back as zero rows rather than an error, so the app would render "no briefs"
   forever instead of complaining.

   The secret key must never reach the browser: no NEXT_PUBLIC_ prefix, and the
   `server-only` import above turns any accidental import from a client component
   into a build error rather than a silent leak of unrestricted read/write on the
   database.

   Nothing client-side talks to Supabase. The app is server-rendered throughout —
   the admin queue and the dashboard are server components, submissions go through
   route handlers — and browser uploads use one-shot signed URLs minted here, so
   the anon key never has to exist. That's what keeps RLS a backstop instead of
   the security model: these route handlers stay the boundary, exactly as they
   were when this was all fs.writeFile. */

export const BRIEFS_BUCKET = "briefs";

let cached: SupabaseClient | null = null;

// Built on first use, not at import: an unset key should fail the request that
// needed it, not the build.
export function supabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set (see .env.local).");
  }
  // Cheap guard against the easiest mistake to make here, since the wrong key
  // degrades into empty results rather than a visible failure.
  if (key.startsWith("sb_publishable_")) {
    throw new Error(
      "SUPABASE_SECRET_KEY holds the publishable key. Use the sb_secret_ key: " +
        "Project Settings → API Keys → Secret keys.",
    );
  }

  cached = createClient(url, key, {
    // No user sessions on this client — it's a trusted server actor, and
    // persisting or refreshing anything would be meaningless across invocations.
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

/* Run a write again when the connection died under it, not the query.

   Node's fetch keeps TLS sockets pooled between requests and Supabase's edge
   retires idle ones on its own schedule. When the two disagree, a request goes
   out on a socket that is already gone and undici throws `TypeError: fetch
   failed` (Caused by: SocketError: other side closed). The query was never seen
   by the database; the same call on a fresh socket succeeds.

   postgrest-js already retries GET/HEAD/OPTIONS for exactly this, which is why
   reads self-heal and only writes surface it. It deliberately won't retry
   PATCH/POST, since a write may have landed before the response was lost — so
   this is opt-in per call, and only for writes that are safe to repeat. */
export async function retryOnDroppedSocket<T extends { error: PostgrestError | null }>(
  run: () => PromiseLike<T>,
): Promise<T> {
  const result = await run();
  // Re-invoked rather than re-awaited: a Supabase builder is a one-shot
  // thenable, so awaiting the same one twice replays the first result.
  return isDroppedSocket(result.error) ? run() : result;
}

function isDroppedSocket(error: PostgrestError | null): boolean {
  // A genuine PostgREST error always carries a code (a SQLSTATE or PGRST###).
  // An empty one alongside a fetch failure is the signature of a request that
  // never reached the database at all.
  return error !== null && error.code === "" && error.message.includes("fetch failed");
}

/* Run a query again when Supabase rejected our own credentials as future-dated.

   Nothing here mints a JWT — the sb_secret_ key goes out as-is. But Supabase's
   edge exchanges that key for a short-lived JWT stamped `iat = now`, and the
   PostgREST that validates it runs on a different clock. When PostgREST's is a
   second behind, a token minted moments ago looks issued in the future and the
   request is rejected with `JWT issued at future` before it reaches the
   database. It is skew between two of their containers, not our clock and not
   the query.

   That makes it both invisible and unfair: the failure is per-request, so two
   reads fired in the same Promise.all can disagree, and the one that lost
   500s a page that had nothing wrong with it. Safe to repeat for writes too —
   a rejected token means the statement never ran.

   Waits before retrying, since the skew is measured in seconds and an instant
   retry just re-loses the race. Two attempts is where it stops: past a couple
   of seconds this is no longer skew, and a page that fails is better than one
   that hangs. */
export async function retryOnClockSkew<T extends { error: PostgrestError | null }>(
  run: () => PromiseLike<T>,
): Promise<T> {
  let result = await run();
  for (const delay of [400, 1200]) {
    if (!isClockSkew(result.error)) break;
    await new Promise((resolve) => setTimeout(resolve, delay));
    // Re-invoked rather than re-awaited, for the same reason as above: a
    // Supabase builder is a one-shot thenable.
    result = await run();
  }
  return result;
}

function isClockSkew(error: PostgrestError | null): boolean {
  // Matched on the message rather than the code: PostgREST files every JWT
  // complaint under PGRST301, so the code alone would also swallow a genuinely
  // bad key — which must fail loudly and immediately, not after two retries.
  return error !== null && error.message.includes("issued at future");
}
