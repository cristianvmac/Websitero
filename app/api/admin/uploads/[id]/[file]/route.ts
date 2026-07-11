import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

/* Serves an owner-uploaded file (doc or photo) from briefs/uploads/<id>/ so
   /admin/briefs can render photo thumbnails and doc download links — the
   briefs dir lives outside public/ on purpose. Same caveat as the admin
   page: no auth yet, do NOT deploy this publicly before adding access
   control. */

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".rtf": "application/rtf",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string; file: string }> },
) {
  const { id, file } = await params;

  // Both segments double as path components — accept only uuid-shaped ids
  // and the server-assigned filenames (doc.pdf, photo-1.jpg). Anything else
  // (separators, "..", odd characters) 404s before touching the filesystem.
  if (
    !/^[a-zA-Z0-9-]+$/.test(id) ||
    !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(file) ||
    file.includes("..")
  ) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  try {
    const data = await fs.readFile(
      path.join(process.cwd(), "briefs", "uploads", id, file),
    );
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
}
