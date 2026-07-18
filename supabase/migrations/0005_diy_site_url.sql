-- "Link my site" for DIY accounts. Run once:
--
--   node --env-file=.env.local scripts/apply-migration.mjs 0005
--
-- The owner pastes where they deployed their kit-built site
-- (app/dashboard/actions.ts normalizes and validates it). Null = not linked;
-- the dashboard card and the sidebar's "Visit my site" button key off it.
-- This is the first thing a DIY account tells us about the site itself —
-- and the doorway to anything later that needs a real URL (site checkups,
-- SEO help, maintenance).
alter table public.diy_profiles
  add column if not exists site_url text;
