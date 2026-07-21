import { NextResponse } from "next/server";
import { BRIEFS_BUCKET, supabaseAdmin } from "@/lib/supabase";
import { CLAIM_COOKIE, CLAIM_COOKIE_OPTIONS, claimToken } from "@/lib/brief-claim";
import { briefReceivedEmail } from "@/lib/customer-emails";
import { sendMail } from "@/lib/mailer";
import { currentUser } from "@/lib/session";
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
   partial upload can't produce a brief that points at missing photos.

   Signed in, always. Briefs used to arrive anonymous and get claimed back later
   from a cookie, which lost every owner who uploaded on their phone and signed
   up on a laptop. Now the session is required up front and the row is stamped
   with user_id at insert, so it is owned from birth and shows on their
   dashboard immediately. */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  // proxy.ts only saw that a cookie exists; this is the lookup that matters.
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }

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

  const { error } = await supabase.from("briefs").insert({ id: briefId, brief, user_id: user.id });
  if (error) {
    console.error("[forme] could not save brief:", error);
    return NextResponse.json({ ok: false, error: "Could not save your brief" }, { status: 500 });
  }

  /* Confirm receipt and nudge them to sign up — best-effort. The brief is
     already saved; a failed email must not turn a successful submission into an
     error the owner sees. It's logged, and the same nudge is on the success
     screen they're looking at right now. */
  try {
    await sendMail({ to: brief.contact.email, ...briefReceivedEmail(brief.business?.name) });
  } catch (mailError) {
    console.error("[forme] brief-received email failed:", mailError);
  }

  /* The claim cookie still gets set, even though the row above already carries
     user_id and needs no claiming. It costs one header and it is the only thing
     that would rescue this brief if the insert's user_id were ever lost — and
     redeeming it is a no-op for an already-owned row, because the claim update
     in src/data/dashboard.ts filters on `user_id is null`. */
  const res = NextResponse.json({ ok: true, id: briefId });
  res.cookies.set(CLAIM_COOKIE, claimToken(briefId), CLAIM_COOKIE_OPTIONS);
  return res;
}
