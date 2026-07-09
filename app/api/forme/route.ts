import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import type { Brief } from "@/app/forme/brief";

/* Receives a "Build it for me" brief from the /forme wizard.
   MVP fulfillment: persist the brief locally (briefs/<id>.json) so the team —
   and later the Stage 2 build worker — has structured input to work from.
   TODO: swap the file write for a DB (e.g. Supabase) and notify the team
   (e.g. Resend email) when deploying to a serverless host. */

export async function POST(req: Request) {
  let brief: Brief;
  try {
    brief = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Minimal validation — mirror what the wizard hard-requires.
  if (
    !brief?.business?.name?.trim() ||
    !brief?.business?.type ||
    !brief?.business?.location?.trim() ||
    !/^\S+@\S+\.\S+$/.test(brief?.contact?.email ?? "")
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  const id = crypto.randomUUID();
  const record = { id, receivedAt: new Date().toISOString(), brief };

  console.log("[forme] new brief:", JSON.stringify(record));

  // Local persistence for dev / self-hosted; harmless no-op if the FS is
  // read-only (serverless) — the console.log above still captures the brief.
  try {
    const dir = path.join(process.cwd(), "briefs");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(record, null, 2));
  } catch (err) {
    console.warn("[forme] could not persist brief to disk:", err);
  }

  // Kick off the preview build in the background — the wizard response
  // shouldn't wait for it. Check /admin/briefs for the result.
  // (Dev / self-hosted; on serverless this becomes a queued job.)
  execFile(
    "node",
    ["scripts/build-site.mjs", id],
    { cwd: process.cwd(), timeout: 300_000 },
    (err) => {
      if (err) console.warn(`[forme] auto-build failed for ${id}:`, err.message);
      else console.log(`[forme] preview built for ${id}`);
    },
  );

  return NextResponse.json({ ok: true, id });
}
