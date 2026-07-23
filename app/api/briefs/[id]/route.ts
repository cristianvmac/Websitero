import { NextResponse } from "next/server";
import { BRIEFS_BUCKET, supabaseAdmin } from "@/lib/supabase";
import { removeLocalPreview } from "@/lib/preview-cleanup";
import { SITE_STAGES, type SiteStage } from "@/lib/site-stage";
import { isTier } from "@/lib/pricing";
import { previewReadyEmail, siteLiveEmail } from "@/lib/customer-emails";
import { sendMail } from "@/lib/mailer";
import { isAdmin } from "@/lib/session";
import type { Brief } from "@/app/forme/brief";

/* Admin mutations for a stored brief:
   PATCH  — two independent halves, sent by two different admin widgets:
            · brief fields (business, style, prompt, contact) merged into the
              jsonb, so the team can complete a materials brief before building;
            · workflow fields (status, previewUrl, liveUrl) written to their
              own columns — this is what moves the customer's tracker and, at
              preview_ready + a preview URL, unlocks Approve / Request changes.
   DELETE — remove the brief, its uploads, and any built preview.

   Admin-only, and enforced here. app/admin/layout.tsx covers the pages but not
   this route, and proxy.ts only proves the caller is signed in as *somebody* —
   without the guard below, any customer with a session could PATCH another
   customer's brief or DELETE it along with their uploads. */

const ID_RE = /^[a-zA-Z0-9-]+$/;

// Every handler in this file starts with this. Returns a response to send back
// when the caller isn't the admin, or null to continue.
async function denyNonAdmin() {
  if (await isAdmin()) return null;
  return NextResponse.json({ ok: false, error: "Not authorized" }, { status: 403 });
}

// Only trimmed strings make it into the stored brief — anything else in the
// payload (wrong types, missing keys) leaves the existing value untouched.
const str = (v: unknown) => (typeof v === "string" ? v.trim() : undefined);

type PatchPayload = Partial<Brief> & {
  status?: unknown;
  previewUrl?: unknown;
  liveUrl?: unknown;
  tier?: unknown;
};

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await denyNonAdmin();
  if (denied) return denied;

  const { id } = await params;
  if (!ID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid brief id" }, { status: 400 });
  }

  let patch: PatchPayload;
  try {
    patch = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};

  // ---------------------------------------------------------- workflow half
  if ("status" in patch) {
    if (!SITE_STAGES.includes(patch.status as SiteStage)) {
      return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 400 });
    }
    updates.status = patch.status;
  }

  // Which package this build is scoped to — set during triage, and what the
  // owner is quoted and charged at approval. "" clears it back to unscoped.
  if ("tier" in patch) {
    if (patch.tier === "" || patch.tier === null) {
      updates.tier = null;
    } else if (isTier(patch.tier)) {
      updates.tier = patch.tier;
    } else {
      return NextResponse.json({ ok: false, error: "Invalid tier" }, { status: 400 });
    }
  }

  // Empty string clears a URL (null in the column, buttons vanish from the
  // dashboard); anything else has to be a link a customer could click.
  for (const [key, column] of [
    ["previewUrl", "preview_url"],
    ["liveUrl", "live_url"],
  ] as const) {
    if (key in patch) {
      const raw = patch[key];
      if (typeof raw !== "string") {
        return NextResponse.json({ ok: false, error: `Invalid ${key}` }, { status: 400 });
      }
      const url = raw.trim();
      if (url && (url.length > 2048 || !/^https?:\/\/\S+$/i.test(url))) {
        return NextResponse.json(
          { ok: false, error: `${key} must be an http(s) link` },
          { status: 400 },
        );
      }
      updates[column] = url || null;
    }
  }

  // ------------------------------------------------------------- brief half
  const supabase = supabaseAdmin();
  const touchesBrief =
    patch.business !== undefined ||
    patch.style !== undefined ||
    patch.prompt !== undefined ||
    patch.contact !== undefined;

  // Read the current row when we either merge brief fields or change status:
  // the merge needs the existing jsonb, and the status change needs the OLD
  // status (to fire the notification only on a real transition, not a re-save)
  // plus the contact email to send it to.
  const needsRow = touchesBrief || "status" in patch;
  type BriefRow = {
    brief: Brief;
    status: string;
    preview_url: string | null;
    live_url: string | null;
    tier: string | null;
  };
  let row: BriefRow | null = null;
  if (needsRow) {
    const { data, error: readError } = await supabase
      .from("briefs")
      .select("brief, status, preview_url, live_url, tier")
      .eq("id", id)
      .maybeSingle();
    if (readError) {
      console.error("[briefs] read failed:", readError);
      return NextResponse.json({ ok: false, error: "Could not read brief" }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ ok: false, error: "Brief not found" }, { status: 404 });
    }
    row = data as unknown as BriefRow;
  }

  let merged: Brief | undefined;
  if (touchesBrief && row) {
    // Merge only the fields the edit form owns — the owner's uploads (`images`,
    // `doc`) and `features` can't be clobbered from here.
    const b = row.brief;
    b.business = {
      name: str(patch.business?.name) ?? b.business.name,
      type: str(patch.business?.type) ?? b.business.type,
      location: str(patch.business?.location) ?? b.business.location,
    };
    const color = str(patch.style?.brandColor);
    b.style = {
      brandColor: color && /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : b.style.brandColor,
      vibe: str(patch.style?.vibe) ?? b.style.vibe,
    };
    if (typeof patch.prompt === "string") b.prompt = patch.prompt.trim();
    const email = str(patch.contact?.email);
    if (email !== undefined) {
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
      }
      b.contact.email = email;
    }
    const phone = str(patch.contact?.phone);
    if (phone !== undefined) b.contact.phone = phone;

    updates.brief = b;
    merged = b;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ ok: false, error: "Nothing to update" }, { status: 400 });
  }

  const { data: written, error: writeError } = await supabase
    .from("briefs")
    .update(updates)
    .eq("id", id)
    .select("id");
  if (writeError) {
    console.error("[briefs] update failed:", writeError);
    return NextResponse.json({ ok: false, error: "Could not save changes" }, { status: 500 });
  }
  // The workflow-only path skips the existence read above, so a wrong id
  // surfaces here as zero updated rows instead of a silent no-op.
  if (!written?.length) {
    return NextResponse.json({ ok: false, error: "Brief not found" }, { status: 404 });
  }

  // Notify the owner when a stage they care about becomes *actually* reachable.
  // The trigger isn't "status changed" but "the notifiable condition just went
  // from false to true" — where the condition is (right stage AND the URL it
  // needs is present). That way setting live without a URL sends nothing, and
  // the follow-up save that adds the URL is what fires the email — even though
  // the status didn't change on that second save. Re-saving an already-notified
  // stage (e.g. correcting a URL) stays quiet because the condition was already
  // true. Best-effort: status is persisted, so a failed send is a warning only.
  let emailWarning: string | undefined;
  if (row && typeof updates.status === "string") {
    const newStatus = updates.status as SiteStage;
    const brief = row.brief;
    const to = brief.contact?.email;
    const newPreview = ("preview_url" in updates ? updates.preview_url : row.preview_url) as
      | string
      | null;
    const newLive = ("live_url" in updates ? updates.live_url : row.live_url) as string | null;

    const nowPreview = newStatus === "preview_ready" && Boolean(newPreview);
    const wasPreview = row.status === "preview_ready" && Boolean(row.preview_url);
    const nowLive = newStatus === "live" && Boolean(newLive);
    const wasLive = row.status === "live" && Boolean(row.live_url);

    const email =
      nowPreview && !wasPreview
        ? previewReadyEmail(brief.business?.name)
        : nowLive && !wasLive
          ? siteLiveEmail(brief.business?.name, newLive!)
          : null;

    if (email && to) {
      try {
        await sendMail({ to, ...email });
      } catch (mailError) {
        console.error("[briefs] stage-change email failed:", mailError);
        emailWarning = "Status saved, but the notification email didn't send.";
      }
    } else if (newStatus !== row.status) {
      // Advanced into a stage that needs a URL, but none is set — the email
      // would point nowhere. Nudge the admin to paste the link; the follow-up
      // save that adds it will send the notification.
      if (newStatus === "preview_ready" && !newPreview) {
        emailWarning = "Set to preview ready, but there's no preview URL — add it to notify them.";
      } else if (newStatus === "live" && !newLive) {
        emailWarning = "Set to live, but there's no live URL — add it to notify them.";
      }
    }

    // Approving is what commits the owner to paying, so an untiered brief must
    // not reach the review stage — they'd be asked to approve with no price on
    // screen and no link to pay with.
    const tier = "tier" in updates ? updates.tier : row.tier;
    if (newStatus === "preview_ready" && !tier) {
      emailWarning = [emailWarning, "No package set — they'll see no price when approving."]
        .filter(Boolean)
        .join(" ");
    }
  }

  return NextResponse.json({
    ok: true,
    ...(merged && { brief: merged }),
    ...(emailWarning && { warning: emailWarning }),
  });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await denyNonAdmin();
  if (denied) return denied;

  const { id } = await params;
  if (!ID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid brief id" }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  // The owner's materials go first: an orphaned row is visible and fixable in
  // the queue, whereas an orphaned folder is invisible and would quietly keep
  // customer documents around after their brief is gone.
  const { data: listed } = await supabase.storage.from(BRIEFS_BUCKET).list(id);
  if (listed?.length) {
    const { error } = await supabase.storage
      .from(BRIEFS_BUCKET)
      .remove(listed.map((f) => `${id}/${f.name}`));
    if (error) {
      console.error("[briefs] could not remove uploads:", error);
      return NextResponse.json({ ok: false, error: "Could not remove uploads" }, { status: 500 });
    }
  }

  const { data: deleted, error } = await supabase
    .from("briefs")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) {
    console.error("[briefs] delete failed:", error);
    return NextResponse.json({ ok: false, error: "Could not delete brief" }, { status: 500 });
  }
  if (!deleted?.length) {
    return NextResponse.json({ ok: false, error: "Brief not found" }, { status: 404 });
  }

  await removeLocalPreview(id);

  return NextResponse.json({ ok: true });
}
