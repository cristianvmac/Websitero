import type { Brief } from "@/app/forme/brief";

/* The one submission path, shared by the /forme wizard and the /builditforme
   upload flow. Three steps, in this order:

     1. ask /api/uploads/sign where to put the files
     2. PUT each one straight to storage — the bytes never touch our server
     3. POST the brief itself, small and plain JSON

   Step 2 is the point: it's what keeps a submission under Vercel's 4.5 MB
   request-body cap, which the old "everything as multipart to /api/forme"
   approach could never have satisfied.

   Note what step 3 doesn't send: any claim about what was uploaded. The server
   reads the bucket to find that out, so this can't assert a file that isn't
   there, and a half-finished upload can't produce a brief that lies. */

interface Materials {
  doc?: File | null;
  photos?: File[];
}

interface SignedTarget {
  path: string;
  url: string;
  contentType: string;
}

async function putFile(target: SignedTarget, file: File) {
  // PUT specifically — the signed upload URL rejects POST. The content type is
  // the server's, derived from the extension it assigned, because a browser's
  // own file.type is empty often enough to trip the bucket's MIME allowlist.
  const res = await fetch(target.url, {
    method: "PUT",
    body: file,
    headers: { "content-type": target.contentType },
  });
  if (!res.ok) throw new Error(`Upload failed for ${file.name} (${res.status})`);
}

export async function submitBrief(brief: Brief, { doc, photos = [] }: Materials = {}) {
  const signRes = await fetch("/api/uploads/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      doc: doc ? { name: doc.name } : null,
      photos: photos.map((f) => ({ name: f.name })),
    }),
  });
  if (!signRes.ok) throw new Error(`Could not start the upload (${signRes.status})`);

  const signed: {
    briefId: string;
    doc: SignedTarget | null;
    photos: SignedTarget[];
  } = await signRes.json();

  const uploads: Promise<void>[] = [];
  if (doc && signed.doc) uploads.push(putFile(signed.doc, doc));
  photos.forEach((file, i) => {
    const target = signed.photos[i];
    if (target) uploads.push(putFile(target, file));
  });
  await Promise.all(uploads);

  const res = await fetch("/api/forme", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ briefId: signed.briefId, brief }),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);

  return (await res.json()) as { ok: true; id: string };
}
