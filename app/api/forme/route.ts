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

const MAX_PHOTOS = 8;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  let brief: Brief;
  let photos: File[] = [];
  try {
    // "Use my photos" submissions arrive as multipart (brief JSON + files);
    // everything else keeps the original plain-JSON contract.
    if (req.headers.get("content-type")?.includes("multipart/form-data")) {
      const form = await req.formData();
      brief = JSON.parse(String(form.get("brief")));
      photos = form
        .getAll("photos")
        .filter(
          (f): f is File =>
            f instanceof File && f.size > 0 && f.size <= MAX_PHOTO_BYTES && f.type.startsWith("image/"),
        )
        .slice(0, MAX_PHOTOS);
    } else {
      brief = await req.json();
    }
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

  // Store the owner's photos where the build worker looks for them
  // (briefs/uploads/<id>/), recording the stored names in the brief.
  if (photos.length > 0) {
    try {
      const uploadDir = path.join(process.cwd(), "briefs", "uploads", id);
      await fs.mkdir(uploadDir, { recursive: true });
      const saved: string[] = [];
      for (const [i, file] of photos.entries()) {
        const ext = path.extname(file.name).toLowerCase() || ".jpg";
        const name = `photo-${i + 1}${ext}`;
        await fs.writeFile(path.join(uploadDir, name), Buffer.from(await file.arrayBuffer()));
        saved.push(name);
      }
      brief.images = { mode: "upload", files: saved };
    } catch (err) {
      console.warn("[forme] could not persist photos:", err);
      brief.images = { mode: "ai" }; // build falls back to stock imagery
    }
  }

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
