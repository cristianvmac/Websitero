import { NextResponse } from "next/server";
import { BRIEFS_BUCKET, supabaseAdmin } from "@/lib/supabase";
import { currentUser } from "@/lib/session";

/* Mints a brief id plus a one-shot signed upload URL per file, so the browser
   can PUT its bytes straight to storage.

   This exists because Vercel caps a serverless function's request body at
   4.5 MB, and the doc + photos an owner sends are routinely well past that — a
   handful of phone photos alone clears it. Routing them through /api/forme as
   multipart, the way this used to work, means the submission dies at the
   platform edge before any of our code runs.

   Signed-in only, now that both ways to start require an account. It used to be
   public by necessity, since owners submitted before signing up. What it exposes
   was always deliberately thin — write access to a fresh, server-chosen path
   under an id the caller never picks, and nothing else. Size and type are
   enforced by the bucket itself (supabase/migrations/0001_briefs.sql), so a
   caller's declared filename only ever decides the extension. It cannot name
   the path, reach another brief's folder, or reuse a token. */

const MAX_PHOTOS = 8;

// Both tables are subsets of the bucket's allowed_mime_types — the browser sends
// whatever we hand back here, so anything absent from the bucket's allowlist
// would be rejected on arrival. Keep the two in step.
const DOC_MIME: Record<string, string> = {
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".rtf": "application/rtf",
  ".odt": "application/vnd.oasis.opendocument.text",
};

const PHOTO_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

const extOf = (name: string) => {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
};

interface Target {
  key: string;
  path: string;
  contentType: string;
}

export async function POST(req: Request) {
  // Same posture as /api/forme: the proxy's cookie check is UX, this is the gate.
  if (!(await currentUser())) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }

  let body: { doc?: { name?: string } | null; photos?: { name?: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // The id is ours, never the caller's — it's what scopes every path below.
  const briefId = crypto.randomUUID();
  const wanted: Target[] = [];

  const docName = body?.doc?.name;
  if (typeof docName === "string") {
    const ext = extOf(docName);
    const contentType = DOC_MIME[ext];
    if (!contentType) {
      return NextResponse.json(
        { ok: false, error: `Unsupported document type: ${ext || "no extension"}` },
        { status: 400 },
      );
    }
    wanted.push({ key: "doc", path: `${briefId}/doc${ext}`, contentType });
  }

  const photos = Array.isArray(body?.photos) ? body.photos.slice(0, MAX_PHOTOS) : [];
  for (const [i, photo] of photos.entries()) {
    const ext = extOf(typeof photo?.name === "string" ? photo.name : "");
    const contentType = PHOTO_MIME[ext];
    if (!contentType) {
      return NextResponse.json(
        { ok: false, error: `Unsupported image type: ${ext || "no extension"}` },
        { status: 400 },
      );
    }
    wanted.push({ key: `photo-${i + 1}`, path: `${briefId}/photo-${i + 1}${ext}`, contentType });
  }

  const supabase = supabaseAdmin();
  let signed: (Target & { url: string })[];
  try {
    signed = await Promise.all(
      wanted.map(async (target) => {
        const { data, error } = await supabase.storage
          .from(BRIEFS_BUCKET)
          .createSignedUploadUrl(target.path);
        if (error || !data) throw error ?? new Error("no signed url returned");
        return { ...target, url: data.signedUrl };
      }),
    );
  } catch (err) {
    console.error("[uploads/sign] could not mint upload URLs:", err);
    return NextResponse.json(
      { ok: false, error: "Could not start the upload" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    briefId,
    doc: signed.find((s) => s.key === "doc") ?? null,
    photos: signed.filter((s) => s.key.startsWith("photo-")),
  });
}
