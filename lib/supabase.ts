import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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
