// Applies one file from supabase/migrations/ over DATABASE_URL.
//
//   node --env-file=.env.local scripts/apply-migration.mjs 0003
//
// The files were written to be pasted into the Supabase SQL editor; this is the
// same thing without leaving the terminal. Pass the numeric prefix (or any
// unique part of the filename). Each file is written to be re-runnable
// ("if exists" / "if not exists" guards), but this keeps no ledger of what ran
// — that stays your job, same as with the SQL editor.
//
// One caveat carried over from the editor workflow: 0001 touches
// storage.buckets, which only the Supabase-side role can write. DATABASE_URL
// (the Better Auth connection) may lack that grant — 0001 belongs in the
// editor; the plain-table migrations (0002+) are fine here.

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "pg";

const wanted = process.argv[2];
if (!wanted) {
  console.error("Usage: node --env-file=.env.local scripts/apply-migration.mjs <prefix, e.g. 0003>");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set — load it with --env-file=.env.local.");
  process.exit(1);
}

const dir = path.join(process.cwd(), "supabase", "migrations");
const matches = (await readdir(dir)).filter((f) => f.endsWith(".sql") && f.includes(wanted));
if (matches.length !== 1) {
  console.error(
    matches.length === 0
      ? `No migration matching "${wanted}" in supabase/migrations/.`
      : `"${wanted}" is ambiguous: ${matches.join(", ")}`,
  );
  process.exit(1);
}

const file = matches[0];
const sql = await readFile(path.join(dir, file), "utf8");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("localhost")
    ? undefined
    : { rejectUnauthorized: false },
});

await client.connect();
try {
  // One transaction: a migration that dies halfway must not leave the table
  // with the old constraint dropped and no new one in its place.
  await client.query("begin");
  await client.query(sql);
  await client.query("commit");
  console.log(`Applied ${file}`);
} catch (err) {
  await client.query("rollback").catch(() => {});
  console.error(`FAILED ${file} — rolled back:\n`, err.message ?? err);
  process.exitCode = 1;
} finally {
  await client.end();
}
