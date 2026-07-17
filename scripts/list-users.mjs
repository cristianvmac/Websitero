// Who has an account, and what's attached to them.
//
//   npm run users
//
// Better Auth keeps no admin UI of its own, and the hosted dashboard
// (dash.better-auth.com, mounted via the dash plugin in lib/auth.ts) needs a
// reachable deployment — neither is any use while developing on localhost. This
// reads the same tables directly over DATABASE_URL.
//
// Read-only. Nothing here writes, so it's safe to run against production.

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost")
    ? undefined
    : { rejectUnauthorized: false },
  max: 1,
});

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set — run this via `npm run users`, which loads .env.local.");
  process.exit(1);
}

/* "user" and the camelCase columns are quoted throughout: user is a reserved
   word in Postgres, and Better Auth's schema is camelCase, which Postgres folds
   to lowercase unless quoted. Both bite on the first hand-written query. */
const USERS = `
  select
    u.name,
    u.email,
    u."emailVerified"                                as verified,
    coalesce(string_agg(distinct a."providerId", ', '), '—') as sign_in_with,
    count(distinct s.id) filter (where s."expiresAt" > now()) as live_sessions,
    count(distinct b.id)                             as briefs,
    to_char(u."createdAt", 'YYYY-MM-DD HH24:MI')     as created
  from "user" u
  left join account a on a."userId" = u.id
  left join session s on s."userId" = u.id
  left join briefs  b on b.user_id  = u.id
  group by u.id
  order by u."createdAt"
`;

// Briefs nobody has claimed. Expected for anything submitted before the claim
// cookie existed (lib/brief-claim.ts), or submitted on a different device than
// the one that signed up — the /admin queue is where those get picked up.
const ORPHANS = `
  select
    coalesce(nullif(b.brief->'business'->>'name', ''), '(no name)') as business,
    b.brief->'contact'->>'email'                 as contact_email,
    to_char(b.received_at, 'YYYY-MM-DD HH24:MI') as received
  from briefs b
  where b.user_id is null
  order by b.received_at
`;

try {
  const { rows: users } = await pool.query(USERS);
  console.log(`\nUSERS (${users.length})`);
  if (users.length) console.table(users);
  else console.log("  none yet\n");

  const { rows: orphans } = await pool.query(ORPHANS);
  console.log(`UNCLAIMED BRIEFS (${orphans.length})`);
  if (orphans.length) console.table(orphans);
  else console.log("  none\n");
} finally {
  await pool.end();
}
