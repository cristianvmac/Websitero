-- Briefs submitted via /forme and /builditforme, plus the bucket holding the
-- owner's materials. Run once in the Supabase SQL editor.

-- `brief` stays jsonb rather than being spread across columns: app/forme/brief.ts
-- is the fulfillment contract and is documented as stable + additive, so additive
-- changes to it stay free instead of becoming a migration every time. Nothing
-- queries by its inner fields — the admin queue lists every brief and renders it
-- whole. The two things pulled out are workflow state, not brief content.
create table if not exists public.briefs (
  id          uuid primary key,
  received_at timestamptz not null default now(),
  -- Null until accounts land; a deleted account shouldn't take the brief with it.
  user_id     uuid references auth.users on delete set null,
  brief       jsonb not null,
  -- Written back by scripts/build-site.mjs. previews/manifest.json is local-only
  -- and never exists on the deployed host, so this is how a Vercel-side admin
  -- page will ever know a brief was built.
  status      text not null default 'new'
              check (status in ('new', 'building', 'built', 'delivered'))
);

-- The admin queue's only query: newest first.
create index if not exists briefs_received_at_idx
  on public.briefs (received_at desc);

-- RLS on with zero policies = deny all. The service role bypasses RLS, so the
-- table is reachable from server code and from nowhere else. This is a backstop,
-- not the security model — the app never exposes an anon client to the browser.
alter table public.briefs enable row level security;


-- Private bucket, laid out as <briefId>/doc.pdf, <briefId>/photo-1.jpg — the
-- same shape as briefs/uploads/<id>/ on disk today. Keeping the paths identical
-- is what lets Brief.doc.file and Brief.images.files stay bare filenames, so the
-- Brief contract and scripts/build-site.mjs both go untouched.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'briefs',
  'briefs',
  false,
  10485760, -- 10 MB: the doc ceiling. Photos are held to 8 MB in the client.
  -- Mirrors the MIME table in the old api/admin/uploads route and the client's
  -- DOC_EXTS. Storage enforces this before a byte lands, which is strictly
  -- stronger than the route's old check against a client-supplied content-type.
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
    'application/pdf',
    'text/plain',
    'text/markdown',
    'application/rtf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text'
  ]
)
on conflict (id) do nothing;
