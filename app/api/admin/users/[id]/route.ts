import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser, isAdmin } from "@/lib/session";

/* Delete an account, from /admin/overview.

   This is what `npm run user:delete` does (scripts/delete-user.mjs), moved
   behind a button. Same single statement, and the foreign keys do the rest:

     account       ON DELETE CASCADE    password hash + any linked Google identity
     session       ON DELETE CASCADE    signed out everywhere, immediately
     diy_profiles  ON DELETE CASCADE    framework choice, linked site + repo URLs
     briefs        ON DELETE SET NULL   the brief SURVIVES, back to unclaimed

   That last rule is the important one and it is deliberate (see 0001 and 0004):
   deleting an account must never destroy the customer materials attached to it.
   A brief is a business's documents and photos; a framework preference is
   worthless without the account. Whoever next proves they own that address
   re-claims those briefs on their first dashboard read (lib/brief-claim.ts and
   src/data/dashboard.ts).

   SQL rather than the Supabase client because Better Auth's tables are walled
   off from PostgREST on purpose — supabase/migrations/0002_better_auth.sql, and
   see lib/db.ts.

   Admin-only, and enforced HERE. app/admin/layout.tsx covers the pages under
   /admin but not this route, and proxy.ts only proves the caller is signed in as
   somebody — without the guard below, any customer with a session could delete
   every account on the platform. */

// Better Auth ids are opaque alphanumeric strings. Belt-and-braces next to the
// parameterized query below, and it turns a junk id into a 400 rather than a
// pointless round-trip.
const ID_RE = /^[a-zA-Z0-9_-]+$/;

type Target = { id: string; email: string; briefs: number };

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  // Both from the session, so they cost one lookup each; a delete is rare
  // enough that two is not worth reimplementing isAdmin()'s emailVerified check
  // by hand here (that check is the whole guard — see lib/session.ts).
  const [admin, me] = await Promise.all([isAdmin(), currentUser()]);
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Not authorized" }, { status: 403 });
  }

  const { id } = await params;
  if (!ID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid account id" }, { status: 400 });
  }

  /* The one account this route won't touch: the one making the request. It's
     the only admin (lib/admin.ts), and deleting it from its own session would
     sign the platform's only administrator out of the queue with no way back in
     — the address would have to re-register and re-verify through Google. A
     stray impostor row on the same address is still deletable, because this
     matches on id, not on email. */
  if (me?.id === id) {
    return NextResponse.json(
      { ok: false, error: "That's the account you're signed in as." },
      { status: 400 },
    );
  }

  // Read before writing, so the response can say what actually went and how
  // many briefs came loose — the admin should see the consequence, not just
  // "ok". Also turns an unknown id into a 404 instead of a silent no-op.
  const [target] = await query<Target>(
    `select u.id,
            u.email,
            count(b.id)::int as briefs
       from "user" u
       left join briefs b on b.user_id = u.id
      where u.id = $1
      group by u.id`,
    [id],
  );
  if (!target) {
    return NextResponse.json({ ok: false, error: "No such account" }, { status: 404 });
  }

  const deleted = await query<{ id: string }>(`delete from "user" where id = $1 returning id`, [id]);
  if (!deleted.length) {
    return NextResponse.json({ ok: false, error: "No such account" }, { status: 404 });
  }

  // Worth a server-log line: this is the one irreversible thing the overview
  // can do, and nothing else records that it happened.
  console.log(
    `[admin] deleted account ${target.email} (${target.briefs} brief(s) back to unclaimed)`,
  );

  return NextResponse.json({ ok: true, email: target.email, briefsUnclaimed: target.briefs });
}
