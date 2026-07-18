-- Which package a "Build it for me" customer is on. Run once:
--
--   node --env-file=.env.local scripts/apply-migration.mjs 0007
--
-- Pricing is three one-time build fees (Starter €149, All-in €199, Pro Bundle
-- €349), collected at approval — see lib/pricing.ts, which mirrors these keys.
-- The tier is set by the team in /admin/briefs during triage, NOT chosen by the
-- customer: a hand-coded site's scope has to be agreed before it's built, or
-- you build a Pro Bundle and get approved against a Starter price.
--
-- Nullable on purpose. Briefs arrive without a tier and get one when the team
-- scopes them; the dashboard degrades to "we'll email you your invoice" rather
-- than inventing a price, and the admin queue nags for it before preview.
--
-- Deliberately NOT added here: any paid/unpaid flag. With Stripe Payment Links
-- there's no webhook telling us about a payment, so a column would only ever
-- hold what an admin retyped from the Stripe dashboard. The lifecycle already
-- encodes it — a site reaches 'live' because payment was confirmed in Stripe.

alter table public.briefs
  add column if not exists tier text
  check (tier is null or tier in ('starter', 'allin', 'pro'));
