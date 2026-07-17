-- Better Auth follow-up — run AFTER the Better Auth CLI has created its tables:
--
--   npx @better-auth/cli@latest migrate --config lib/auth.ts -y
--
-- The CLI owns the core schema ("user", "session", "account", "verification");
-- this file adds what it doesn't know about: Supabase-specific exposure control,
-- and re-pointing briefs at the new user table.

-- 1. Lock the auth tables away from PostgREST.
--
-- Supabase's Data API exposes every table in the public schema to anyone
-- holding the publishable key. Better Auth's tables hold password hashes
-- ("account".password) and live session tokens ("session".token), so that
-- exposure would be catastrophic. RLS with zero policies = deny all through
-- PostgREST; Better Auth itself connects over DATABASE_URL as the tables'
-- owner, and owners bypass RLS — so auth keeps working while the API sees
-- nothing.
alter table if exists public."user"         enable row level security;
alter table if exists public."session"      enable row level security;
alter table if exists public."account"      enable row level security;
alter table if exists public."verification" enable row level security;

-- 2. Re-point briefs.user_id at Better Auth's user table.
--
-- It referenced auth.users (Supabase Auth, now abandoned). Better Auth ids are
-- text, not uuid, so the column type changes too — free of consequence because
-- every brief's user_id is null today (verified before the switch; accounts
-- had not launched). The claiming logic in src/data/dashboard.ts is unchanged:
-- it matches on the brief's contact email, verified-only, exactly as before.
alter table public.briefs
  drop constraint if exists briefs_user_id_fkey;

alter table public.briefs
  alter column user_id type text using user_id::text;

-- Claims made under Supabase Auth point at users that no longer exist — reset
-- them to unclaimed. Nothing is lost: claiming runs on every dashboard read
-- (matching the brief's verified contact email), so the same person re-claims
-- the same briefs the first time they sign in on the new stack.
update public.briefs
  set user_id = null
  where user_id is not null
    and user_id not in (select id from public."user");

alter table public.briefs
  add constraint briefs_user_id_fkey
    foreign key (user_id) references public."user"(id) on delete set null;
