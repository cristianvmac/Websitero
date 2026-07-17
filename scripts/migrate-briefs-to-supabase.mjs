// One-time migration: briefs/ on disk -> the briefs table + storage bucket.
//
//   node scripts/migrate-briefs-to-supabase.mjs [--dry]
//
// Reads every briefs/<id>.json and its briefs/uploads/<id>/ folder and moves
// them into Supabase, preserving ids and receivedAt. Safe to re-run: rows are
// upserted and files are uploaded with upsert, so a partial run finishes
// cleanly on a second pass. Nothing on disk is deleted — delete briefs/ by
// hand once the queue at /admin/briefs looks right.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BRIEFS_DIR = path.join(repoRoot, "briefs");
const dry = process.argv.includes("--dry");

const env = Object.fromEntries(
  fs
    .readFileSync(path.join(repoRoot, ".env.local"), "utf8")
    .split("\n")
    .filter((l) => l.trim() && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

const MIME = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".gif": "image/gif", ".avif": "image/avif",
  ".pdf": "application/pdf", ".txt": "text/plain", ".md": "text/markdown",
  ".rtf": "application/rtf", ".odt": "application/vnd.oasis.opendocument.text",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

// The upload link can drop mid-transfer on some networks; a few retries keep a
// one-shot migration from needing a babysitter.
async function uploadWithRetry(remotePath, body, contentType, tries = 5) {
  for (let i = 1; i <= tries; i++) {
    const { error } = await supabase.storage
      .from("briefs")
      .upload(remotePath, body, { contentType, upsert: true });
    if (!error) return;
    if (i === tries) throw error;
    await new Promise((r) => setTimeout(r, 400 * i));
  }
}

const files = fs.existsSync(BRIEFS_DIR)
  ? fs.readdirSync(BRIEFS_DIR).filter((f) => f.endsWith(".json"))
  : [];

if (files.length === 0) {
  console.log("No briefs/*.json on disk — nothing to migrate.");
  process.exit(0);
}

console.log(`${files.length} brief(s) on disk${dry ? " (dry run)" : ""}\n`);

for (const file of files) {
  const record = JSON.parse(fs.readFileSync(path.join(BRIEFS_DIR, file), "utf8"));
  const { id, receivedAt, brief } = record;
  const uploadDir = path.join(BRIEFS_DIR, "uploads", id);
  const localFiles = fs.existsSync(uploadDir) ? fs.readdirSync(uploadDir) : [];

  console.log(`${id}`);
  console.log(`  ${brief.business?.name || "(materials brief)"} · ${brief.contact?.email}`);
  console.log(`  files: ${localFiles.join(", ") || "(none)"}`);

  if (dry) {
    console.log("  -> skipped (dry run)\n");
    continue;
  }

  for (const name of localFiles) {
    const ext = path.extname(name).toLowerCase();
    await uploadWithRetry(
      `${id}/${name}`,
      fs.readFileSync(path.join(uploadDir, name)),
      MIME[ext] ?? "application/octet-stream",
    );
    console.log(`  -> uploaded ${name}`);
  }

  const { error } = await supabase
    .from("briefs")
    .upsert({ id, received_at: receivedAt, brief }, { onConflict: "id" });
  if (error) throw error;
  console.log("  -> row upserted\n");
}

const { count } = await supabase.from("briefs").select("*", { count: "exact", head: true });
console.log(`Done. briefs table holds ${count} row(s).`);
console.log("Check /admin/briefs, then remove the local briefs/ directory by hand.");
