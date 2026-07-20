import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Inbox, ExternalLink, CheckCircle2, CircleDashed, FileText, Code2 } from "lucide-react";
import type { Brief } from "@/app/forme/brief";
import { asSiteStage, type SiteStage } from "@/lib/site-stage";
import { isTier, type Tier } from "@/lib/pricing";
import { BRIEFS_BUCKET, supabaseAdmin } from "@/lib/supabase";
import DeleteButton from "./DeleteButton";
import EditBrief from "./EditBrief";
import StatusControls from "./StatusControls";

/* Internal fulfillment queue: every brief submitted via /forme or
   /builditforme, the owner's materials (sent text, doc download, photo
   thumbnails — linked by hour-long signed URLs, since the bucket is private),
   an inline editor to complete a brief, a link to the built preview for review
   before the site goes to the owner, and delete.

   Sites are hand-coded from these materials. The build status and preview
   below reflect scripts/build-site.mjs runs from the CLI, not anything this
   page triggers — so both are local-only: previews/ is gitignored and never
   exists on a deployed host, where every brief therefore reads as not built.

   Admin-only: app/admin/layout.tsx gates everything under /admin on the one
   admin account in lib/admin.ts. */

export const dynamic = "force-dynamic"; // always read the briefs dir fresh

interface BriefRecord {
  id: string;
  receivedAt: string;
  brief: Brief;
  /** The customer-facing lifecycle — what their tracker shows. */
  status: SiteStage;
  previewUrl: string;
  liveUrl: string;
  /** "" until the team scopes the build to a package. */
  tier: Tier | "";
}

interface ManifestEntry {
  slug: string;
  builtAt: string;
}

async function loadData() {
  const supabase = supabaseAdmin();

  const { data, error } = await supabase
    .from("briefs")
    .select("id, received_at, brief, status, preview_url, live_url, tier")
    .order("received_at", { ascending: false });

  // Deliberately not caught. An unreadable table must not render as "No briefs
  // yet" — that's indistinguishable from a quiet Sunday, and it's exactly how
  // the old fs version lost data without anyone noticing. Let it hit the error
  // boundary and be obvious.
  if (error) throw new Error(`Could not load briefs: ${error.message}`);

  const records: BriefRecord[] = (data ?? []).map((row) => ({
    id: row.id,
    receivedAt: row.received_at,
    brief: row.brief as Brief,
    status: asSiteStage(row.status),
    previewUrl: row.preview_url ?? "",
    liveUrl: row.live_url ?? "",
    tier: isTier(row.tier) ? row.tier : "",
  }));

  // What each owner has asked to change, so the team sees it here instead of
  // only in an email. Grouped by brief, newest first.
  const changeRequests: Record<string, { body: string; createdAt: string }[]> = {};
  if (records.length > 0) {
    const { data: reqs, error: reqError } = await supabase
      .from("change_requests")
      .select("brief_id, body, created_at")
      .in(
        "brief_id",
        records.map((r) => r.id),
      )
      .order("created_at", { ascending: false });
    if (reqError) console.error("[admin] could not load change requests:", reqError);
    for (const r of reqs ?? []) {
      (changeRequests[r.brief_id] ??= []).push({ body: r.body, createdAt: r.created_at });
    }
  }

  // The bucket is private, so every doc and thumbnail needs its own short-lived
  // signed URL. One batch for the whole page rather than a call per file.
  const paths = records.flatMap(({ id, brief }) => {
    const names = [
      ...(brief.doc ? [brief.doc.file] : []),
      ...(brief.images?.mode === "upload" ? (brief.images.files ?? []) : []),
    ];
    return names.map((n) => `${id}/${n}`);
  });

  const urls: Record<string, string> = {};
  if (paths.length > 0) {
    const { data: signed } = await supabase.storage
      .from(BRIEFS_BUCKET)
      .createSignedUrls(paths, 3600);
    for (const s of signed ?? []) {
      if (s.path && s.signedUrl) urls[s.path] = s.signedUrl;
    }
  }

  // Build status is local-only: scripts/build-site.mjs writes this manifest on
  // the developer's machine and previews/ is gitignored, so on a deployed host
  // this file never exists and every brief reads as not built. The `status`
  // column on public.briefs is where that eventually comes from instead.
  let manifest: Record<string, ManifestEntry> = {};
  try {
    manifest = JSON.parse(
      await fs.readFile(path.join(process.cwd(), "previews", "manifest.json"), "utf8"),
    );
  } catch {
    /* nothing built yet, or not running locally */
  }

  return { records, manifest, urls, changeRequests };
}

export default async function AdminBriefs() {
  const { records, manifest, urls, changeRequests } = await loadData();

  return (
    <section className="min-h-screen bg-white px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
            <Inbox className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Briefs</h1>
            <p className="text-sm text-slate-500">
              {records.length} {""} submitted · every &quot;Build it for me&quot; request lands here
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {records.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              No briefs yet — submit one via{" "}
              <Link href="/builditforme" className="font-semibold text-blue-700 hover:underline">
                /builditforme
              </Link>
              .
            </div>
          )}

          {records.map(({ id, receivedAt, brief, status, previewUrl, liveUrl, tier }) => {
            const built = manifest[id];
            // Materials briefs (the /builditforme upload flow) arrive without
            // the structured wizard fields — the doc/text/photos ARE the brief.
            const isMaterials = !brief.business.name?.trim();
            const uploads = brief.images?.mode === "upload" ? brief.images.files ?? [] : [];
            const sentText = brief.prompt?.trim();

            const parts: string[] = [];
            if (brief.doc) parts.push("doc");
            if (uploads.length > 0)
              parts.push(`${uploads.length} photo${uploads.length === 1 ? "" : "s"}`);
            if (sentText) parts.push("text");
            const summary = isMaterials
              ? parts.join(" · ") || "empty brief"
              : `${brief.business.type} · ${brief.business.location}`;

            return (
              <div
                key={id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Brand color swatch from the wizard */}
                  <span
                    aria-hidden
                    className="hidden h-10 w-10 shrink-0 rounded-xl ring-1 ring-black/5 sm:block"
                    style={{ backgroundColor: brief.style.brandColor }}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-900">
                      {isMaterials ? (
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-blue-500" />
                          Materials
                        </span>
                      ) : (
                        brief.business.name
                      )}
                      <span className="ml-2 text-xs font-medium text-slate-400">{summary}</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {brief.contact.email}
                      {brief.contact.phone && ` · ${brief.contact.phone}`} ·{" "}
                      {new Date(receivedAt).toLocaleString()}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium">
                      {built ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700">
                            Built {new Date(built.builtAt).toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <>
                          <CircleDashed className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-slate-500">Not built yet</span>
                        </>
                      )}
                    </p>
                    {/* Where the developer hand-edits this customer's site */}
                    {built && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                        <Code2 className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          Edit{" "}
                          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11px] text-slate-600">
                            workspaces/{built.slug}/
                          </code>{" "}
                          then rebuild it from the CLI
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                    {/* Review the built site before it goes to the owner */}
                    {built && (
                      <a
                        href={`/previews/${built.slug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-500/10"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Preview
                      </a>
                    )}
                    <DeleteButton briefId={id} />
                  </div>
                </div>

                {/* Where the customer's tracker is, and the links their dashboard shows */}
                <StatusControls
                  briefId={id}
                  status={status}
                  previewUrl={previewUrl}
                  liveUrl={liveUrl}
                  tier={tier}
                />

                {/* What this owner has asked to change — was email-only before */}
                {(changeRequests[id]?.length ?? 0) > 0 && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                      Change requests ({changeRequests[id].length})
                    </p>
                    <ul className="mt-2 flex flex-col gap-2">
                      {changeRequests[id].map((req) => (
                        <li key={req.createdAt} className="text-sm text-slate-700">
                          <span className="text-xs text-slate-400">
                            {new Date(req.createdAt).toLocaleString()}
                          </span>
                          <p className="mt-0.5 whitespace-pre-wrap">{req.body}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* The owner's materials — sent text, doc download, photo thumbnails */}
                {(sentText || brief.doc || uploads.length > 0) && (
                  <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    {sentText && (
                      <p className="max-h-40 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                        {sentText}
                      </p>
                    )}
                    {brief.doc && urls[`${id}/${brief.doc.file}`] && (
                      <a
                        href={urls[`${id}/${brief.doc.file}`]}
                        download
                        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:text-blue-700"
                      >
                        <FileText className="h-3.5 w-3.5 text-blue-500" />
                        {brief.doc.file}
                      </a>
                    )}
                    {uploads.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {uploads
                          .filter((f) => urls[`${id}/${f}`])
                          .map((f) => (
                            <a
                              key={f}
                              href={urls[`${id}/${f}`]}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={f}
                              className="transition-opacity hover:opacity-80"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element -- signed storage URL, expires hourly; not worth next/image's remotePatterns */}
                              <img
                                src={urls[`${id}/${f}`]}
                                alt={f}
                                className="h-16 w-16 rounded-lg object-cover ring-1 ring-black/5"
                              />
                            </a>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Complete / correct the brief before (re)building */}
                <EditBrief briefId={id} brief={brief} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
