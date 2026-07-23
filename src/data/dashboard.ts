import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Brief } from "@/app/forme/brief";
import { isDiyFramework, type DiyFramework } from "@/lib/diy";
import { asSiteStage, SITE_STAGES, type SiteStage } from "@/lib/site-stage";
import { isTier, paymentLink, TIERS, type Tier } from "@/lib/pricing";
import { currentUser } from "@/lib/session";
import { describeError, retryOnClockSkew, retryOnDroppedSocket, supabaseAdmin } from "@/lib/supabase";
import { CLAIM_COOKIE, readClaim } from "@/lib/brief-claim";

export type DashboardSite = {
  /** The brief row this site is derived from — what the approve/request-changes
      actions and the admin queue both key on. */
  briefId: string;
  name: string;
  /** Where the hand-coding lifecycle is; drives the tracker and the sidebar. */
  stage: SiteStage;
  /** Staging link for the owner's review — "" until the team publishes one
      from /admin/briefs. Approve / Request changes only make sense with this. */
  previewUrl: string;
  /** Public URL of the launched site; "" until the stage is live. */
  url: string;
  /** Where the owner edits the site (visual editor / studio) — no such place
      exists yet, so "" everywhere and the Edit button stays hidden. */
  editUrl: string;
  /** The package this build is scoped to, set by the team during triage. Null
      until then — the owner is quoted this price before they approve, since
      approving is what commits them to paying it. */
  tier: Tier | null;
  /** Their personalized Stripe Payment Link for `tier`, already carrying the
      brief id and their email. "" when there's no tier yet or the link isn't
      configured — callers hide the pay button rather than render a dead one. */
  paymentUrl: string;
  receivedAt: string;
  /** The owner's own change requests, newest first — so they can see "you
      asked for X on the 3rd" instead of it living only in the team's inbox. */
  changeRequests: ChangeRequest[];
};

export type ChangeRequest = { body: string; createdAt: string };

/* What the persistent shell (sidebar + topbar) needs, and nothing else.

   The shell is a client component, so whatever the layout hands it is
   serialized into the payload of EVERY dashboard page. Passing the whole
   DashboardSite shipped the payment link and the full text of every change
   request to pages that render neither. Narrow on purpose — widen it only for
   a field the sidebar actually reads. */
export type ShellSite = Pick<DashboardSite, "stage" | "url" | "previewUrl" | "editUrl" | "tier">;

export function toShellSite(site: DashboardSite | null): ShellSite | null {
  if (!site) return null;
  // `tier` is the plan badge on the account menu's Billing row. The payment
  // link stays out — it's the one field here that shouldn't ride along into
  // every page's payload.
  const { stage, url, previewUrl, editUrl, tier } = site;
  return { stage, url, previewUrl, editUrl, tier };
}

export type ChecklistStep = {
  id: string;
  label: string;
  done: boolean;
  /** Shown as the row action when the step is not done yet. */
  action?: { label: string; href: string };
};

/** What the owner actually sent us — the tracker shows this back to them so
    "hand-coding your site" is visibly grounded in their own materials. */
export type MaterialsSummary = {
  doc: boolean;
  /** Pasted/typed description (the brief's prompt). */
  text: boolean;
  /** 0 = none uploaded; the site uses the kit's professional stock imagery. */
  photos: number;
  phone: boolean;
};

export type DashboardUser = {
  id: string;
  name: string;
  email: string;
  locale: string;
};

/** The DIY product's account state — set the moment they pick a framework on
    the dashboard. It's the only signal DIY leaves: the kits are public repos
    and the docs are open, so nothing else tells us an account is building.
    siteUrl is "" until they link their deployed site.

    The two links are independent, not two spellings of one thing. siteUrl is
    where the site is SERVED — it renders a Visit button and nothing more.
    repoUrl is where the code LIVES, and it's the one that lets us work on a
    site somebody built on their own laptop, so it's what gates "Have us finish
    it". An account can have either, both, or neither. */
export type DiyProfile = {
  framework: DiyFramework;
  startedAt: string;
  siteUrl: string;
  repoUrl: string;
};

export type DashboardData = {
  user: DashboardUser;
  /** Null until a brief of theirs arrives — signing up doesn't create a site. */
  site: DashboardSite | null;
  materials: MaterialsSummary | null;
  /** Null until they pick a framework. A brief outranks this on the overview
      (submitting one means they've handed the build over), but the Developer
      nav keeps rendering for as long as the profile exists. */
  diy: DiyProfile | null;
  credits: { available: number; freePerMonth: number };
  seo: { articlesPublished: number; lastArticleAt: string | null; autopilot: boolean };
  /** Post-launch growth steps — only the live overview renders these. */
  checklist: ChecklistStep[];
};

/* What's real here and what isn't, deliberately:

   REAL — `user` is the signed-in account; `site` (stage, both URLs, tier and
   the payment link built from it) and `materials` come from that person's
   actual brief row, which the admin queue moves through the lifecycle.

   PLACEHOLDER — `credits` and `seo` describe products that don't exist yet (no
   credit ledger, no SEO autopilot). They're left as constants rather than
   backed by invented tables, because schema for features with no behaviour
   behind them would only be rewritten once those get built. Each is marked
   below.

   GONE — the trial clock and monthly/yearly plan. Pricing is three one-time
   build fees collected at approval (lib/pricing.ts), so there is no trial to
   count down and no subscription to upgrade to: the free build IS the trial. */

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
     that someone has already claimed. That same filter is what makes them safe
     to send twice when the connection drops under one.

     Both retries apply, in the order a failure reaches us: clock skew outside,
     because a token rejected as future-dated means the statement never ran, and
     a dropped socket inside, because that request never left. Reads below need
     only the first — postgrest-js already retries GETs for a dead socket. */
  const claimedBriefId = readClaim((await cookies()).get(CLAIM_COOKIE)?.value);
  if (claimedBriefId) {
    const { error } = await retryOnClockSkew(() =>
      retryOnDroppedSocket(() =>
        admin
          .from("briefs")
          .update({ user_id: user.id })
          .is("user_id", null)
          .eq("id", claimedBriefId),
      ),
    );
    if (error) console.error("[dashboard] could not claim brief from cookie:", describeError(error));
  }

  if (email && user.emailVerified) {
    const { error } = await retryOnClockSkew(() =>
      retryOnDroppedSocket(() =>
        admin
          .from("briefs")
          .update({ user_id: user.id })
          .is("user_id", null)
          .filter("brief->contact->>email", "eq", email),
      ),
    );
    if (error) console.error("[dashboard] could not claim briefs:", describeError(error));
  }

  /* Both reads throw on failure (see below), so both are shielded from the one
     failure mode that isn't really a failure: Supabase rejecting its own
     freshly-minted token as future-dated. postgrest-js retries reads for a
     dropped socket already, but not for this. */
  const [briefsRes, diyRes] = await Promise.all([
    // Every brief of theirs, newest first — the pick happens below, and it
    // isn't "the newest". Unbounded in name only: an account has one site.
    retryOnClockSkew(() =>
      admin
        .from("briefs")
        .select("id, brief, status, received_at, preview_url, live_url, tier")
        .eq("user_id", user.id)
        .order("received_at", { ascending: false }),
    ),
    retryOnClockSkew(() =>
      admin
        .from("diy_profiles")
        .select("framework, started_at, site_url, repo_url")
        .eq("user_id", user.id)
        .maybeSingle(),
    ),
  ]);
  const { data: rows, error } = briefsRes;
  if (error) throw new Error(`Could not load your site: ${error.message}`);
  // Thrown rather than swallowed for the same reason as briefs: "no DIY kit"
  // rendered from a failed read is indistinguishable from the real thing.
  if (diyRes.error) throw new Error(`Could not load your kit: ${diyRes.error.message}`);

  /* One site per account: the one they paid for. Briefs get claimed onto the
     account on every read (above), so a second one can always arrive — same
     browser, or the same verified address. Taking the newest would hand the
     dashboard to that draft and quietly take the live site away from its owner,
     so the pick is by lifecycle: SITE_STAGES is declared in build order, which
     makes its index the rank. sort() is stable, so briefs at the same stage
     keep the newest-first order the query returned.

     The trade is deliberate. A second brief stays invisible to the owner (it's
     still in the admin queue, and still gets built) rather than displacing a
     site that's live. Somebody who wants a second website opens a second
     account; multi-site per account is a real feature — a switcher here, plus a
     scope on every marketing page — and waits until someone asks for it. */
  const record = (rows ?? [])
    .slice()
    .sort(
      (a, b) =>
        SITE_STAGES.indexOf(asSiteStage(b.status)) - SITE_STAGES.indexOf(asSiteStage(a.status)),
    )[0];
  const brief = record?.brief as Brief | undefined;

  // Their own change-request history for this brief, newest first.
  let changeRequests: ChangeRequest[] = [];
  if (record) {
    const { data: reqs, error: reqError } = await admin
      .from("change_requests")
      .select("body, created_at")
      .eq("brief_id", record.id)
      .eq("author", "customer")
      .order("created_at", { ascending: false });
    if (reqError) console.error("[dashboard] could not load change requests:", describeError(reqError));
    else changeRequests = (reqs ?? []).map((r) => ({ body: r.body, createdAt: r.created_at }));
  }

  const tier = isTier(record?.tier) ? record.tier : null;

  const site: DashboardSite | null = record
    ? {
        briefId: record.id,
        name: brief?.business?.name?.trim() || "Your website",
        stage: asSiteStage(record.status),
        previewUrl: record.preview_url ?? "",
        url: record.live_url ?? "",
        editUrl: "",
        tier,
        // Built here rather than in the component: the link base is a private
        // env var, and this keeps it out of the client bundle entirely.
        paymentUrl: tier
          ? paymentLink(process.env[TIERS[tier].env], {
              briefId: record.id,
              email: brief?.contact?.email || email,
            })
          : "",
        receivedAt: record.received_at,
        changeRequests,
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
    materials: brief ? summarizeMaterials(brief) : null,
    diy:
      diyRes.data && isDiyFramework(diyRes.data.framework)
        ? {
            framework: diyRes.data.framework,
            startedAt: diyRes.data.started_at,
            siteUrl: diyRes.data.site_url ?? "",
            repoUrl: diyRes.data.repo_url ?? "",
          }
        : null,
    credits: { available: 0, freePerMonth: 15 }, // PLACEHOLDER — no credit ledger
    seo: { articlesPublished: 0, lastArticleAt: null, autopilot: false }, // PLACEHOLDER
    checklist: growthChecklist(brief),
  };
}

function summarizeMaterials(brief: Brief): MaterialsSummary {
  return {
    doc: Boolean(brief.doc),
    text: Boolean(brief.prompt?.trim()),
    photos: brief.images?.mode === "upload" ? brief.images.files?.length ?? 0 : 0,
    phone: Boolean(brief.contact?.phone?.trim()),
  };
}

/* Post-launch growth steps. Only "contact" is answerable from data today; the
   rest describe features whose dashboard pages don't exist yet, so they carry
   no action links — a row that can't be completed shouldn't also link to a 404.
   The actions come back with the routes (domain settings, blog editor). */
function growthChecklist(brief: Brief | undefined): ChecklistStep[] {
  return [
    { id: "live", label: "Site live", done: true },
    { id: "domain", label: "Connect your own domain", done: false },
    { id: "seo", label: "Publish your first blog article", done: false },
    {
      id: "contact",
      label: "Contact details filled in",
      done: Boolean(brief?.contact?.phone?.trim()),
    },
  ];
}

