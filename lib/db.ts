import "server-only";
import { Pool } from "pg";

/* A read-only SQL door onto the same Postgres, for the things PostgREST can't see.

   Almost everything in this app reaches the database through lib/supabase.ts,
   and that stays the rule. This exists for one case: the accounts overview at
   /admin/accounts has to read Better Auth's tables ("user", "account",
   "session"), and those are deliberately walled off from the Data API —
   supabase/migrations/0002_better_auth.sql turns RLS on with zero policies
   precisely so that a leaked publishable key can't read password hashes and
   live session tokens. Reaching them over SQL, as Better Auth itself and
   scripts/list-users.mjs already do, keeps that wall where it is instead of
   punching a PostgREST-shaped hole through it.

   Same connection string and same TLS handling as lib/auth.ts: DATABASE_URL is
   Supabase's transaction pooler, which terminates with certs node-postgres
   can't chain. Small max, because pooling that matters happens on Supabase's
   side once this is running as serverless functions.

   Keep this door narrow. It exists for the tables PostgREST can't reach, not as
   a second way to do what the Supabase client already does — anything touching
   briefs, diy_profiles or change_requests belongs there, with the retry helpers
   and the error handling that live around it. Today that means: the accounts
   read in /admin/overview, and the account delete behind it
   (app/api/admin/users/[id]), which is the only write on this path. */

declare global {
  // Next re-evaluates modules on every hot reload in dev; without this the pools
  // pile up until the pooler starts refusing connections.
  var __websiteroPool: Pool | undefined;
}

function pool(): Pool {
  if (globalThis.__websiteroPool) return globalThis.__websiteroPool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL must be set (see .env.local).");
  }

  const created = new Pool({
    connectionString,
    ssl: connectionString.includes("localhost") ? undefined : { rejectUnauthorized: false },
    max: 2,
  });
  // A pool that emits an error with no listener takes the process down with it.
  created.on("error", (err) => console.error("[db] idle client error:", err.message));

  globalThis.__websiteroPool = created;
  return created;
}

/** One parameterized read. Values go through pg's placeholders — never
    interpolate them into the SQL string. */
export async function query<T>(text: string, values: unknown[] = []): Promise<T[]> {
  const { rows } = await pool().query(text, values);
  return rows as T[];
}
