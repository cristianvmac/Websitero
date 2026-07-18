-- The DIY product's account state. Run once:
--
--   node --env-file=.env.local scripts/apply-migration.mjs 0004
--
-- Choosing a framework on the dashboard is the moment an account becomes a DIY
-- account — until then the platform has no way to know someone took the kit,
-- because the repos are public and the docs are open. One row per account,
-- upserted by app/dashboard/actions.ts; the dashboard's Developer section and
-- kit card key off it.
--
-- Deliberately narrow: no site_url, no progress flags — columns arrive with
-- the features that read them (same rule as everywhere else). `framework`
-- mirrors lib/diy.ts; change one, change both.
--
-- ON DELETE CASCADE, unlike briefs' SET NULL: a brief is customer materials
-- that must outlive the account, a framework preference is worthless without it.
create table if not exists public.diy_profiles (
  user_id    text primary key references public."user"(id) on delete cascade,
  framework  text not null check (framework in ('eleventy', 'astro')),
  started_at timestamptz not null default now()
);

-- Same backstop as every other table: RLS on, zero policies, deny all through
-- PostgREST. Server code reaches it via the secret key, nothing else does.
alter table public.diy_profiles enable row level security;
