import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

/* Serves the static preview sites built by scripts/build-site.mjs from the
   repo-root previews/ directory (which Next's public/ can't do — it lacks
   directory→index.html resolution). Dev / self-hosted only: on serverless
   hosts previews should be deployed to real preview URLs instead. */

const PREVIEWS_DIR = path.join(process.cwd(), "previews");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await params;

  // Containment check — never serve anything outside previews/
  const resolved = path.resolve(PREVIEWS_DIR, ...parts);
  const rel = path.relative(PREVIEWS_DIR, resolved);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Directory URLs resolve to their index.html
  let file = resolved;
  const stat = await fs.stat(file).catch(() => null);
  if (stat?.isDirectory() || (!stat && !path.extname(file))) {
    file = path.join(file, "index.html");
  }

  try {
    const body = await fs.readFile(file);
    return new NextResponse(new Uint8Array(body), {
      headers: {
        "Content-Type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream",
        "Cache-Control": "no-store", // previews change on rebuild
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
