import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Brief } from "@/app/forme/brief";
import { currentUser } from "@/lib/session";
import { supabaseAdmin } from "@/lib/supabase";
import { CLAIM_COOKIE, readClaim } from "@/lib/brief-claim";

export type DashboardSite = {
  name: string;
  slug: string;
  /** Public URL of the live/preview site. */
  url: string;
  /** Where the owner edits the site (visual editor / studio). */
  editUrl: string;
  status: "trial" | "active";
};

export type ChecklistStep = {
  id: string;
  label: string;
  done: boolean;
  /** Shown as the row action when the step is not done yet. */
  action?: { label: string; href: string };
};

export type DashboardUser = {
  id: string;
  name: string;
  email: string;
  locale: string;
};

export type DashboardData = {
  user: DashboardUser;
  /** Null until a brief of theirs arrives — signing up doesn't create a site. */
  site: DashboardSite | null;
  /** null once the site is bought. */
  trialEndsAt: string | null;
  plan: { monthly: number; yearly: number; currency: string };
  credits: { available: number; freePerMonth: number };
  seo: { articlesPublished: number; lastArticleAt: string | null; autopilot: boolean };
  checklist: ChecklistStep[];
};

/* What's real here and what isn't, deliberately:

   REAL — `user` is the signed-in account, and `site` plus the first two
   checklist rows are derived from that person's actual brief.

   PLACEHOLDER — `plan` is the real advertised pricing but isn't read from
   anywhere; `trialEndsAt`, `credits` and `seo` describe products that don't
   exist yet (no billing, no credit ledger, no SEO autopilot). They're left as
   constants rather than backed by invented tables, because schema for features
   with no behaviour behind them would only be rewritten once those get built.
   Each is marked below. The dashboard should stop lying about who you are; it
   shouldn't start lying more precisely about everything else. */

const PLAN = { monthly: 17, yearly: 150, currency: "€" };

export async function getDashboardData(): Promise<DashboardData> {
  const user = await currentUser();
  // proxy.ts only checks that a session cookie EXISTS (no DB round-trip in the
  // hot path); this is the authoritative check against the session table. A
  // forged or expired cookie gets past the proxy and ends here, at sign-in.
  if (!user) redirect(`/login?next=${encodeURIComponent("/dashboard")}`);

  const email = user.email ?? "";
  const admin = supabaseAdmin();

  /* Claim any briefs this person sent before they had an account. Briefs are
     submitted anonymously (that's the /builditforme pitch), so something has to
     prove a brief is theirs. Two independent proofs, either of which is enough:

     1. The claim cookie — dropped when the brief was submitted, redeemed here.
        This is the main path now that signup sends no email at all: it proves
        "same browser as the submission" without an inbox round-trip. Signed, so
        a guessed or leaked brief id can't be claimed. See lib/brief-claim.ts.

     2. A verified contact email. Only Google accounts reach this now (they
        arrive pre-verified); password accounts never verify, so emailVerified
        stays false and this branch skips them. Kept because it's the only thing
        that survives submitting on a phone and signing up on a laptop, and
        because a verified address is genuine proof of ownership. Dropping the
        emailVerified guard here would let anyone sign up as someone else's
        address and walk off with their business documents.

     Done on read rather than once at sign-up so it's self-healing, and so it
     also catches a brief sent *after* the account existed. Both are idempotent:
     the `user_id is null` filter matches nothing on the second pass, which is
     also what stops a stale cookie on a shared browser from stealing a brief
     that someone has already claimed. */
  const claimedBriefId = readClaim((await cookies()).get(CLAIM_COOKIE)?.value);
  if (claimedBriefId) {
    const { error } = await admin
      .from("briefs")
      .update({ user_id: user.id })
      .is("user_id", null)
      .eq("id", claimedBriefId);
    if (error) console.error("[dashboard] could not claim brief from cookie:", error);
  }

  if (email && user.emailVerified) {
    const { error } = await admin
      .from("briefs")
      .update({ user_id: user.id })
      .is("user_id", null)
      .filter("brief->contact->>email", "eq", email);
    if (error) console.error("[dashboard] could not claim briefs:", error);
  }

  const { data: rows, error } = await admin
    .from("briefs")
    .select("id, brief, status, received_at")
    .eq("user_id", user.id)
    .order("received_at", { ascending: false })
    .limit(1);
  if (error) throw new Error(`Could not load your site: ${error.message}`);

  const record = rows?.[0];
  const brief = record?.brief as Brief | undefined;

  const site: DashboardSite | null = record
    ? {
        name: brief?.business?.name?.trim() || "Your website",
        // No slug in the database yet: build-site.mjs mints one locally and
        // records it in previews/manifest.json, which never leaves the
        // developer's machine. Until a built site has somewhere real to live,
        // there's no honest URL to hand the owner.
        slug: "",
        url: "",
        editUrl: "",
        status: "trial", // PLACEHOLDER — no billing, so nothing is ever "active"
      }
    : null;

  return {
    user: {
      id: user.id,
      // Better Auth gives name a first-class column, and Google's profile name
      // maps onto it too — no more metadata juggling. The fallback still beats
      // greeting someone by their user id.
      name: user.name?.trim() || email.split("@")[0],
      email,
      locale: "English", // PLACEHOLDER — no locale preference is stored yet
    },
    site,
    trialEndsAt: null, // PLACEHOLDER — no trial clock exists; hides the banner
    plan: PLAN,
    credits: { available: 0, freePerMonth: 15 }, // PLACEHOLDER — no credit ledger
    seo: { articlesPublished: 0, lastArticleAt: null, autopilot: false }, // PLACEHOLDER
    checklist: buildChecklist(brief),
  };
}

// The first two rows are answerable from the brief itself; the rest describe
// features that don't exist yet, so they're permanently "not done" for now.
function buildChecklist(brief: Brief | undefined): ChecklistStep[] {
  return [
    { id: "created", label: "Site created", done: Boolean(brief) },
    {
      id: "logo",
      label: "Logo added",
      done: false,
      action: { label: "Add my logo", href: "/dashboard/appearance" },
    },
    {
      id: "photos",
      label: "Personal photos",
      done: brief?.images?.mode === "upload" && (brief.images.files?.length ?? 0) > 0,
    },
    {
      id: "seo",
      label: "SEO — write your first blog article",
      done: false,
      action: { label: "Write an article", href: "/dashboard/content" },
    },
    {
      id: "domain",
      label: "Connect your domain",
      done: false,
      action: { label: "Connect domain", href: "/dashboard/settings" },
    },
    {
      id: "contact",
      label: "Contact details filled in",
      done: Boolean(brief?.contact?.phone?.trim()),
      action: { label: "Add details", href: "/dashboard/settings" },
    },
  ];
}

/** Yearly discount vs. paying monthly, e.g. -26%. */
export function yearlyDiscount(plan: DashboardData["plan"]): number {
  return Math.round((1 - plan.yearly / (plan.monthly * 12)) * 100);
}

/** "5d 2h" — remaining trial time, or null when the trial is over/absent. */
export function trialRemaining(trialEndsAt: string | null): string | null {
  if (!trialEndsAt) return null;
  const ms = new Date(trialEndsAt).getTime() - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  return days > 0 ? `${days}d ${hours}h` : `${hours}h`;
}
