"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EMPTY_BRIEF, type Brief } from "@/app/forme/brief";
import { FRAMEWORKS, isDiyFramework, normalizeRepoUrl, repoSlug } from "@/lib/diy";
import { currentUser } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";
import { sendMail } from "@/lib/mailer";
import { approvedActivateEmail, handoffReceivedEmail } from "@/lib/customer-emails";
import { CURRENCY, isTier, paymentLink, TIERS } from "@/lib/pricing";

/* The review loop on a ready preview — the two things an owner can say about
   it. Approve flips the brief to 'approved'; Request changes carries their
   notes to the team and flips it to 'changes_requested'. Both notify the team
   through lib/mailer.ts (the one door all email goes through) and re-render the
   dashboard, whose tracker and preview card read the new stage.

   Deliberate order: email FIRST, then the status update. The owner's notes
   exist nowhere but that email — no messages table yet — so a failed send must
   fail the whole action (they see the error and can retry) rather than flip
   the status and quietly lose what they asked for. The reverse failure (email
   sent, update lost) costs only a duplicate email on retry.

   Neither action trusts the client to say which brief: they operate on the
   caller's newest owned brief, the same row the dashboard renders. */

type ReviewFormState = { error: string } | null;

const notesLimit = 5000;

function teamInbox(): string {
  const to = process.env.TEAM_EMAIL;
  if (to) return to;
  if (process.env.NODE_ENV === "production") {
    // Same posture as the mailer itself: a review the team never hears about
    // is worse than an error the owner can see and retry.
    throw new Error("TEAM_EMAIL is not set — refusing to drop a review notification.");
  }
  return "team@websitero.dev"; // dev: sendMail prints to the console/outbox anyway
}

/** The caller's newest brief — or null with no session/brief. */
async function ownReviewableBrief() {
  const user = await currentUser();
  if (!user) return null;

  const { data, error } = await supabaseAdmin()
    .from("briefs")
    .select("id, brief, status, preview_url, tier")
    .eq("user_id", user.id)
    .order("received_at", { ascending: false })
    .limit(1);
  if (error) {
    console.error("[review] could not load brief:", error);
    return null;
  }

  const row = data?.[0];
  if (!row) return null;
  const brief = row.brief as Brief;
  return {
    id: row.id as string,
    status: row.status as string,
    previewUrl: (row.preview_url as string | null) ?? "",
    tier: isTier(row.tier) ? row.tier : null,
    siteName: brief?.business?.name?.trim() || "Unnamed site",
    businessName: brief?.business?.name?.trim() || undefined,
    ownerEmail: brief?.contact?.email ?? "",
    userEmail: user.email ?? "",
  };
}

/* Both mutations repeat the stage in the WHERE clause, so a stale form (two
   tabs, or the team moved the brief meanwhile) matches zero rows instead of
   overwriting a fresher state — same idempotence trick as the claim flow. */
async function advance(id: string, from: string, to: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin()
    .from("briefs")
    .update({ status: to })
    .eq("id", id)
    .eq("status", from)
    .select("id");
  if (error) console.error(`[review] could not move brief to ${to}:`, error);
  return Boolean(data?.length);
}

export async function approvePreview(
  _prev: ReviewFormState,
  _formData: FormData,
): Promise<ReviewFormState> {
  const target = await ownReviewableBrief();
  if (!target) return { error: "We couldn't find your site — try reloading the page." };
  if (target.status !== "preview_ready") {
    revalidatePath("/dashboard"); // the page they're looking at is stale
    return { error: "This preview isn't awaiting your approval anymore." };
  }

  try {
    await sendMail({
      to: teamInbox(),
      subject: `Preview approved — ${target.siteName}`,
      text: [
        `${target.userEmail || target.ownerEmail} approved the preview of "${target.siteName}".`,
        "",
        `Preview:  ${target.previewUrl || "(no preview URL on the brief?)"}`,
        `Brief:    ${target.id}`,
        `Package:  ${
          target.tier
            ? `${TIERS[target.tier].label} — ${CURRENCY}${TIERS[target.tier].price}`
            : "NOT SET — they were not quoted a price, invoice them by hand"
        }`,
        "",
        "They've been emailed their payment link. Next: confirm the payment landed in",
        `Stripe (client_reference_id = ${target.id}), then set the stage to 'live' with the`,
        "live URL in /admin/briefs — that's what emails them their launch link.",
      ].join("\n"),
    });
  } catch (err) {
    console.error("[review] approval mail failed:", err);
    return { error: "We couldn't record your approval — please try again." };
  }

  if (!(await advance(target.id, "preview_ready", "approved"))) {
    revalidatePath("/dashboard");
    return { error: "This preview isn't awaiting your approval anymore." };
  }

  /* The revenue email: approval is the moment they pay, so send them their
     payment link right away rather than making them come back to the dashboard.
     Best-effort — the same link is on the approved state they're about to see,
     so a failed send costs a convenience, not the sale. */
  const to = target.ownerEmail || target.userEmail;
  if (to) {
    const link = target.tier
      ? paymentLink(process.env[TIERS[target.tier].env], {
          briefId: target.id,
          email: to,
        })
      : "";
    try {
      await sendMail({
        to,
        ...approvedActivateEmail(
          target.businessName,
          target.tier ? TIERS[target.tier].label : "",
          target.tier ? `${CURRENCY}${TIERS[target.tier].price}` : "",
          link,
        ),
      });
    } catch (err) {
      console.error("[review] activate email failed:", err);
    }
  }

  revalidatePath("/dashboard");
  return null;
}

export async function requestChanges(
  _prev: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const notes = String(formData.get("notes") ?? "").trim();
  if (!notes) return { error: "Tell us what you'd like changed." };
  if (notes.length > notesLimit) {
    return { error: `That's a bit long — please keep it under ${notesLimit} characters.` };
  }

  const target = await ownReviewableBrief();
  if (!target) return { error: "We couldn't find your site — try reloading the page." };
  if (target.status !== "preview_ready") {
    revalidatePath("/dashboard");
    return { error: "This preview isn't open for change requests anymore." };
  }

  /* Persist the note FIRST, before anything that can fail. It's the one piece
     of the request that used to live only in the team's inbox; now it's durable
     in change_requests, which is what lets the admin card and the owner's own
     history show it, and what keeps a second round from erasing the first. If
     this insert fails we stop and let them retry — nothing is lost. */
  const { error: insertError } = await supabaseAdmin()
    .from("change_requests")
    .insert({ brief_id: target.id, author: "customer", body: notes });
  if (insertError) {
    console.error("[review] could not save change request:", insertError);
    return { error: "We couldn't save your notes — please try again." };
  }

  if (!(await advance(target.id, "preview_ready", "changes_requested"))) {
    revalidatePath("/dashboard");
    return { error: "This preview isn't open for change requests anymore." };
  }

  /* Ping the team — best-effort now that the note is safely stored. A failed
     send is logged, not surfaced: the request is recorded and visible in the
     admin queue regardless. */
  try {
    await sendMail({
      to: teamInbox(),
      subject: `Change request — ${target.siteName}`,
      text: [
        `${target.userEmail || target.ownerEmail} asked for changes to "${target.siteName}".`,
        "",
        notes,
        "",
        `Preview:  ${target.previewUrl || "(no preview URL on the brief?)"}`,
        `Brief:    ${target.id}`,
        `Reply to: ${target.ownerEmail || target.userEmail}`,
        "",
        "When the edits are done, set the stage back to 'preview_ready' in /admin/briefs.",
      ].join("\n"),
    });
  } catch (err) {
    console.error("[review] change-request mail failed:", err);
  }

  revalidatePath("/dashboard");
  return null;
}

/* The DIY product's one write: picking a framework, from /startyourwebsite or
   the kit card's "switch" button. The upsert is the moment an account becomes
   a DIY account — there's no other signal, since the kits are public repos.
   Plain form action (no useActionState): the only inputs are our own two
   buttons, so the only user-visible failure mode is "nothing changed", and
   re-clicking is the retry. Switching later is harmless and keeps started_at
   (upsert only touches the columns it names).

   It redirects rather than only revalidating so the pick lands on the kit
   card wherever it was made — from the empty-state card on the overview, or
   from the kit card itself (switch kit), where it's a no-op navigation.

   A bad value returns silently — the caller stays put, which reads as "nothing
   happened", and the only source of that value is our own two buttons. A
   signed-out visitor is a real case now that /startyourwebsite offers this
   button publicly: they go to sign in and come back to the dashboard, where
   they pick again. Starting DIY requires an account, same as a build. */
export async function chooseDiyFramework(formData: FormData): Promise<void> {
  const framework = formData.get("framework");
  if (!isDiyFramework(framework)) return;

  const user = await currentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/dashboard")}`);

  const { error } = await supabaseAdmin()
    .from("diy_profiles")
    .upsert({ user_id: user.id, framework }, { onConflict: "user_id" });
  if (error) {
    console.error("[diy] could not save framework choice:", error);
    return;
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

/* "Link my site": the owner tells us where their site lives — the two senses of
   "where" being independent, so both ride on one form and one save.

     url      the public address it's SERVED at. Human-typed ("mysite.com"), so
              it gets a scheme bolted on and a real parse.
     repoUrl  the git remote its CODE lives at. Normalized by lib/diy.ts, which
              also rejects hosts we couldn't clone from.

   Either can be empty, and an empty field clears that link — the card's Unlink
   button is just a submit with both blank. Errors come back through
   useActionState: unlike the framework buttons, typing can go wrong. */
export async function linkDiySite(
  _prev: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  let url = String(formData.get("url") ?? "").trim();
  if (url) {
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
    if (url.length > 2048) return { error: "That address is too long." };
    try {
      const parsed = new URL(url);
      // A hostname without a dot ("localhost", a bare word) isn't a site the
      // owner deployed — catch the typo here rather than render a dead button.
      if (!parsed.hostname.includes(".")) throw new Error("no dot");
    } catch {
      return { error: "That doesn't look like a web address — try mysite.com." };
    }
  }

  const repo = normalizeRepoUrl(String(formData.get("repoUrl") ?? ""));
  if ("error" in repo) return { error: repo.error };

  const user = await currentUser();
  if (!user) return { error: "You're signed out — reload the page and try again." };

  const { data, error } = await supabaseAdmin()
    .from("diy_profiles")
    .update({ site_url: url || null, repo_url: repo.url || null })
    .eq("user_id", user.id)
    .select("user_id");
  if (error) {
    console.error("[diy] could not save site links:", error);
    return { error: "We couldn't save that — please try again." };
  }
  // No profile row = no kit chosen; the card shouldn't be reachable then, but
  // a stale tab could get here.
  if (!data?.length) return { error: "Pick your kit first — reload the page." };

  revalidatePath("/dashboard");
  return null;
}

/* "Have us finish it": a DIY owner who got stuck hands the half-built site
   over. This is the whole point of storing repo_url — the request is only
   answerable because their code is somewhere we can clone it from, so a linked
   repo is a hard precondition rather than a nice-to-have.

   It deliberately creates an ordinary brief. A handoff needs exactly what a
   "Build it for me" brief needs (an owner, something to work from, a way to
   reply, a lifecycle) and the only difference — start from their repo, not a
   fresh kit clone — is carried by Brief.repo. So the admin queue, the status
   controls, the tracker, the preview review and pay-at-approval all pick it up
   with no second pipeline: the brief IS the handoff record.

   Insert first, notify after. The brief row is durable storage for what they
   asked, so unlike the approval flow (whose notes exist only in an email) a
   failed send costs a ping, not the request — same reasoning as
   requestChanges. */
export async function requestBuildHelp(
  _prev: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const notes = String(formData.get("notes") ?? "").trim();
  if (!notes) return { error: "Tell us what you'd like us to finish." };
  if (notes.length > notesLimit) {
    return { error: `That's a bit long — please keep it under ${notesLimit} characters.` };
  }

  const user = await currentUser();
  if (!user) return { error: "You're signed out — reload the page and try again." };

  const email = user.email ?? "";
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Your account has no email address for us to reply to." };
  }

  const admin = supabaseAdmin();

  const { data: profile, error: profileError } = await admin
    .from("diy_profiles")
    .select("framework, repo_url")
    .eq("user_id", user.id)
    .maybeSingle();
  if (profileError) {
    console.error("[handoff] could not read diy profile:", profileError);
    return { error: "We couldn't reach your kit — please try again." };
  }

  const repoUrl = (profile?.repo_url as string | null) ?? "";
  const framework = profile?.framework;
  if (!repoUrl || !isDiyFramework(framework)) {
    revalidatePath("/dashboard"); // their card is stale — show them the repo field
    return { error: "Link your code repository first so we know where your site lives." };
  }

  /* One build per account, matching what the dashboard can render: it shows
     the newest brief and nothing else, so a second one would silently hide the
     first. A stale tab is the realistic way to get here. */
  const { data: existing, error: existingError } = await admin
    .from("briefs")
    .select("id")
    .eq("user_id", user.id)
    .limit(1);
  if (existingError) {
    console.error("[handoff] could not check for an existing brief:", existingError);
    return { error: "We couldn't send that — please try again." };
  }
  if (existing?.length) {
    revalidatePath("/dashboard");
    return { error: "You've already got a build with us — it's on your dashboard." };
  }

  const briefId = crypto.randomUUID();
  /* Built field by field rather than spread from EMPTY_BRIEF, whose nested
     objects are shared: this row is handed straight to the admin queue, which
     reads business.type, style.brandColor and images.mode unconditionally. */
  const brief: Brief = {
    business: { name: "", type: "", location: "" },
    features: [],
    style: { ...EMPTY_BRIEF.style },
    prompt: notes,
    images: { mode: "stock" }, // their repo already has whatever imagery they used
    repo: { url: repoUrl, framework },
    contact: { email, phone: "" },
  };

  const { error: insertError } = await admin
    .from("briefs")
    .insert({ id: briefId, brief, user_id: user.id });
  if (insertError) {
    console.error("[handoff] could not save request:", insertError);
    return { error: "We couldn't send that — please try again." };
  }

  try {
    await sendMail({
      to: teamInbox(),
      subject: `DIY handoff — ${repoSlug(repoUrl)}`,
      text: [
        `${email} has been building with the ${FRAMEWORKS[framework].label} kit and wants us to finish it.`,
        "",
        notes,
        "",
        `Repo:     ${repoUrl}`,
        `Brief:    ${briefId}`,
        `Reply to: ${email}`,
        "",
        "Their code is the starting point — clone it instead of the kit:",
        `  git clone ${repoUrl}`,
        "",
        "Work on a branch and open a PR so they can see the changes and pull them;",
        "never push to their main. Then set the stage in /admin/briefs as usual.",
      ].join("\n"),
    });
  } catch (err) {
    console.error("[handoff] team mail failed:", err);
  }

  try {
    await sendMail({ to: email, ...handoffReceivedEmail() });
  } catch (err) {
    console.error("[handoff] customer mail failed:", err);
  }

  revalidatePath("/dashboard");
  return null;
}
