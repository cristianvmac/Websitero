import type { Metadata } from "next";
import { ExternalLink, Eye, Globe } from "lucide-react";
import { STAGE_LABELS } from "@/lib/site-stage";
import { getDashboardData } from "@/src/data/dashboard";
import NoSiteYet from "@/components/dashboard/NoSiteYet";

export const metadata: Metadata = { title: "My Site | Websitero" };

export default async function MySitePage() {
  const { site } = await getDashboardData();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">My Site</h1>

      {!site ? (
        <NoSiteYet />
      ) : (
        /* Only what the brief row actually knows: its name, where the build has
           got to, and whichever addresses exist. The overview owns the tracker
           and the approve/pay decision — this page is the site's address book,
           not a second copy of that flow. */
        <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-blue-700">
              <Globe className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {STAGE_LABELS[site.stage]}
              </p>
              <p className="truncate text-lg font-bold text-slate-900">{site.name}</p>
              {site.url && <p className="truncate text-sm text-slate-500">{site.url}</p>}
            </div>
          </div>

          {(site.url || site.previewUrl) && (
            <div className="flex flex-wrap gap-3">
              {site.url && (
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit my site
                </a>
              )}
              {site.previewUrl && (
                <a
                  href={site.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-700"
                >
                  <Eye className="h-4 w-4" />
                  See my preview
                </a>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
