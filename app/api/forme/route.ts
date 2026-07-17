import { NextResponse } from "next/server";
import { BRIEFS_BUCKET, supabaseAdmin } from "@/lib/supabase";
import { CLAIM_COOKIE, CLAIM_COOKIE_OPTIONS, claimToken } from "@/lib/brief-claim";
import type { Brief } from "@/app/forme/brief";

/* Records a "Build it for me" brief from the /forme wizard or the /builditforme
   upload flow. The owner's files are already in storage by the time this runs
   (see /api/uploads/sign and lib/submit-brief.ts) — all that's left is to
   reconcile the brief against them and insert the row.

   Two things this deliberately does differently from the fs.writeFile version
   it replaces:

   Failure is failure. That version wrapped every write in a catch that logged a
   warning and returned ok:true regardless, so on a read-only serverless disk an
   owner would upload their documents, see a confirmation, and leave behind
   nothing but a log line. A brief that didn't persist has to say so.

   The bucket is the source of truth about uploads, not the request body. The
   client tells us nothing about what it uploaded; we list the folder and record
   what's actually in it. So a caller can't claim files that don't exist, and a
   partial upload can't produce a brief that points at missing photos. */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  let payload: { briefId?: unknown; brief?: Brief };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { briefId, brief } = payload;
  if (typeof briefId !== "string" || !UUID_RE.test(briefId) || !brief) {
    return NextResponse.json({ ok: false, error: "Invalid brief id" }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  const { data: listed, error: listError } = await supabase.storage
    .from(BRIEFS_BUCKET)
    .list(briefId);
  if (listError) {
    console.error("[forme] could not read uploads:", listError);
    return NextResponse.json({ ok: false, error: "Could not read your uploads" }, { status: 500 });
  }

  const names = (listed ?? []).map((f) => f.name);
  const docFile = names.find((n) => n.startsWith("doc."));
  // Storage lists alphabetically, which would order photo-10 before photo-2.
  const photoFiles = names
    .filter((n) => /^photo-\d+\./.test(n))
    .sort((a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]));

  // Wizard briefs hard-require the structured fields; materials briefs (a doc
  // and/or pasted text from /builditforme) only need a way to reach the owner —
  // the team derives the rest from the materials.
  const hasMaterials = Boolean(docFile) || Boolean(brief.prompt?.trim());
  if (
    !/^\S+@\S+\.\S+$/.test(brief.contact?.email ?? "") ||
    (!hasMaterials &&
      (!brief.business?.name?.trim() ||
        !brief.business?.type ||
        !brief.business?.location?.trim()))
  ) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  if (docFile) brief.doc = { file: docFile };
  else delete brief.doc;
  brief.images =
    photoFiles.length > 0
      ? { mode: "upload", files: photoFiles }
      : { mode: "stock" }; // build keeps the kit's stock imagery

  const { error } = await supabase.from("briefs").insert({ id: briefId, brief });
  if (error) {
    console.error("[forme] could not save brief:", error);
    return NextResponse.json({ ok: false, error: "Could not save your brief" }, { status: 500 });
  }

  /* Hand this browser a signed claim on the brief it just submitted, so that
     signing up later — with no email verification anywhere — still proves the
     brief is theirs. Redeemed on the first dashboard read; see lib/brief-claim.ts.

     One brief per cookie: a second submission overwrites the first, which costs
     nothing today because the dashboard only ever surfaces the newest brief. */
  const res = NextResponse.json({ ok: true, id: briefId });
  res.cookies.set(CLAIM_COOKIE, claimToken(briefId), CLAIM_COOKIE_OPTIONS);
  return res;
}
