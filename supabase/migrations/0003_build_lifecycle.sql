-- The customer-facing build lifecycle. Run once in the Supabase SQL editor
-- (or: node --env-file=.env.local scripts/apply-migration.mjs 0003).
--
-- 0001 gave status four team-side values ('new','building','built','delivered')
-- meant to be written back by scripts/build-site.mjs — which never happened, so
-- nothing reads or writes them today (the admin queue still keys off the local
-- previews/manifest.json). This replaces them with the lifecycle the dashboard
-- tracker shows the owner:
--
--   received → in_build → preview_ready ⇄ changes_requested → approved → live
--
-- The rename mapping below: 'built' becomes 'in_build', NOT 'preview_ready' —
-- built on the developer's machine is invisible to the customer until a preview
-- URL is published, and 'preview_ready' is a promise that there's a link to see.
--
-- lib/site-stage.ts mirrors this list; change one, change both.

alter table public.briefs drop constraint if exists briefs_status_check;

update public.briefs
set status = case status
  when 'new'       then 'received'
  when 'building'  then 'in_build'
  when 'built'     then 'in_build'
  when 'delivered' then 'live'
  else status
end
where status in ('new', 'building', 'built', 'delivered');

alter table public.briefs
  alter column status set default 'received';

alter table public.briefs
  add constraint briefs_status_check
  check (status in ('received', 'in_build', 'preview_ready',
                    'changes_requested', 'approved', 'live'));

-- Where the customer looks at their site. Both set from /admin/briefs (paste a
-- link, hit save); null/'' means "nothing to show yet" and the dashboard hides
-- the corresponding buttons. preview_url is the staging link that unlocks
-- Approve / Request changes at stage 'preview_ready'; live_url is the launched
-- site's public address once the stage is 'live'.
alter table public.briefs
  add column if not exists preview_url text,
  add column if not exists live_url text;
