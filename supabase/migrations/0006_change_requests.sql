-- Durable store for the review loop's change requests. Run once:
--
--   node --env-file=.env.local scripts/apply-migration.mjs 0006
--
-- Until now the owner's notes lived only in the notification email to the team:
-- the admin card couldn't show what was asked, the owner couldn't see their own
-- history, and a second round left no trace of the first. This table fixes all
-- three, and is the seed of the future Messages page — hence `author`, so a
-- team reply can share the table later even though only 'customer' writes today.

create table if not exists public.change_requests (
  id         uuid primary key default gen_random_uuid(),
  brief_id   uuid not null references public.briefs(id) on delete cascade,
  author     text not null default 'customer' check (author in ('customer', 'team')),
  body       text not null,
  created_at timestamptz not null default now()
);

-- The only query either side runs: a brief's requests, newest first.
create index if not exists change_requests_brief_idx
  on public.change_requests (brief_id, created_at desc);

-- Same backstop as every other table: RLS on, zero policies, deny all through
-- PostgREST. Only server code (secret key) touches it.
alter table public.change_requests enable row level security;
