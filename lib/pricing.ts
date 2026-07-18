/* What a "Build it for me" site costs, and where the customer goes to pay.

   Three one-time build fees, collected at approval (see the pay-at-approval
   model): the preview is free, and paying is what launches the site. No
   subscription, no trial clock — the free build IS the trial.

   Payment is Stripe Payment Links for now: links created by hand in the Stripe
   dashboard, pasted into the env vars below. That means NO webhook, so the app
   never learns that someone paid — the team confirms it in Stripe and then sets
   the brief to 'live'. Swapping this for a real Checkout integration later
   replaces `paymentLink` and nothing else here.

   Mirrors the tier check constraint in supabase/migrations/0007_brief_tier.sql;
   change one, change both. No `server-only` guard — the labels and prices are
   public copy that client components render. Only `paymentLink` touches env,
   and it takes the base URL as an argument so the secret-ish link never has to
   be read from a client bundle. */

export const TIERS = {
  starter: { label: "Starter", price: 149, env: "STRIPE_LINK_STARTER" },
  allin: { label: "All-in", price: 199, env: "STRIPE_LINK_ALLIN" },
  pro: { label: "Pro Bundle", price: 349, env: "STRIPE_LINK_PRO" },
} as const;

export type Tier = keyof typeof TIERS;

export const TIER_KEYS = Object.keys(TIERS) as Tier[];

export const CURRENCY = "€";

export function isTier(value: unknown): value is Tier {
  return typeof value === "string" && value in TIERS;
}

/** "Starter — €149" for buttons and admin rows. */
export function tierLabel(tier: Tier): string {
  return `${TIERS[tier].label} — ${CURRENCY}${TIERS[tier].price}`;
}

/* The owner's personalized checkout URL.

   `client_reference_id` is what makes this operable without an integration: it
   travels to Stripe and shows up on the payment, so every euro received maps
   back to the exact brief instead of being guessed at from a name. Stripe
   restricts it to alphanumerics, dashes and underscores — brief ids are UUIDs,
   which qualify. `prefilled_email` saves retyping and keeps the Stripe customer
   matched to the Websitero account.

   Returns "" when the link isn't configured, which every caller treats as
   "no link to show" rather than rendering a dead button. */
export function paymentLink(
  baseUrl: string | undefined,
  { briefId, email }: { briefId: string; email?: string },
): string {
  if (!baseUrl) return "";
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("client_reference_id", briefId);
    if (email) url.searchParams.set("prefilled_email", email);
    return url.toString();
  } catch {
    // A malformed link in env shouldn't take the dashboard down with it.
    console.error("[pricing] STRIPE_LINK_* is not a valid URL:", baseUrl);
    return "";
  }
}
