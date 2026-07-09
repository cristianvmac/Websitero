import { execFile } from "child_process";
import { promisify } from "util";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

/* One-click (re)build: runs scripts/build-site.mjs for a brief and reports
   the preview URL. Dev / self-hosted only — on serverless this becomes a job
   queued to a build worker. */

const execFileAsync = promisify(execFile);

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // The id doubles as a filename — only accept uuid-shaped values.
  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid brief id" }, { status: 400 });
  }
  const briefPath = path.join(process.cwd(), "briefs", `${id}.json`);
  try {
    await fs.access(briefPath);
  } catch {
    return NextResponse.json({ ok: false, error: "Brief not found" }, { status: 404 });
  }

  try {
    // Generous timeout — the build includes a Claude copywriting call.
    await execFileAsync("node", ["scripts/build-site.mjs", id], {
      cwd: process.cwd(),
      timeout: 300_000,
    });
  } catch (err) {
    const stderr = (err as { stderr?: string }).stderr ?? String(err);
    console.error(`[build] failed for ${id}:`, stderr);
    return NextResponse.json(
      { ok: false, error: stderr.slice(-500) },
      { status: 500 },
    );
  }

  // The build script records its result in previews/manifest.json
  const manifest = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "previews", "manifest.json"), "utf8"),
  );
  const entry = manifest[id];
  return NextResponse.json({
    ok: true,
    slug: entry.slug,
    builtAt: entry.builtAt,
    url: `/previews/${entry.slug}/`,
  });
}
