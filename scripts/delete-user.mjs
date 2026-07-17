// Remove an account. Testing tool — there is no admin UI for this.
//
//   npm run user:delete -- <email> [--dry]
//
// Better Auth's own /delete-user endpoint is self-service (it deletes the
// caller's own account, from their own session) and is disabled in lib/auth.ts
// anyway, so it's no use for clearing out test accounts. This goes at the table.
//
// One statement does it — the foreign keys do the rest:
//   account  ON DELETE CASCADE   password hash + any linked Google identity
//   session  ON DELETE CASCADE   signed out everywhere
//   briefs   ON DELETE SET NULL  the brief SURVIVES, back to unclaimed
//
// That last rule is deliberate (supabase/migrations/0001): deleting an account
// must never destroy the customer materials attached to it. Whoever next proves
// they own that address can claim those briefs again — see lib/brief-claim.ts.

import { Pool } from "pg";

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const email = args.find((a) => !a.startsWith("--"));

if (!email) {
  console.error("Usage: npm run user:delete -- <email> [--dry]");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set — run via `npm run user:delete`, which loads .env.local.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? undefined
    : { rejectUnauthorized: false },
  max: 1,
});

try {
  // Always show what's about to go, before it goes. `user` is quoted because
  // it's a reserved word; the camelCase columns because Postgres folds unquoted
  // identifiers to lowercase.
  const { rows } = await pool.query(
    `select u.id, u.name, u.email, u."emailVerified",
            coalesce(string_agg(distinct a."providerId", ', '), '—') as sign_in_with,
            count(distinct s.id) as sessions,
            count(distinct b.id) as briefs_to_unclaim
       from "user" u
       left join account a on a."userId" = u.id
       left join session s on s."userId" = u.id
       left join briefs  b on b.user_id  = u.id
      where lower(u.email) = lower($1)
      group by u.id`,
    [email],
  );

  if (!rows.length) {
    console.log(`\nNo account with the email ${email} — nothing to delete.\n`);
    process.exit(0);
  }

  const target = rows[0];
  console.log("\nAbout to delete:");
  console.table([target]);
  if (Number(target.briefs_to_unclaim) > 0) {
    console.log(
      `  ${target.briefs_to_unclaim} brief(s) will go back to unclaimed — kept, not deleted.\n`,
    );
  }

  if (dry) {
    console.log("--dry given, so nothing was written.\n");
    process.exit(0);
  }

  const { rowCount } = await pool.query(`delete from "user" where id = $1`, [target.id]);
  console.log(rowCount ? `Deleted ${target.email}.\n` : "Nothing was deleted.\n");
} finally {
  await pool.end();
}
