import Link from "next/link";
// Eye/Pencil left with the View & Edit buttons they belonged to — see the note
// on the site card: nothing to link to until a built site has a real home.
import { Clock, CreditCard, ExternalLink, Globe, Sparkles } from "lucide-react";
import { getDashboardData, trialRemaining, yearlyDiscount } from "@/src/data/dashboard";
import SeoCard from "@/components/dashboard/SeoCard";
import ChecklistCard from "@/components/dashboard/ChecklistCard";

export default async function DashboardHomePage() {
  const data = await getDashboardData();
  const { site, plan, seo, checklist } = data;

  const remaining = trialRemaining(data.trialEndsAt);
  const onTrial = site?.status === "trial" && remaining !== null;
  const priceLine = `${plan.currency}${plan.monthly}/month or ${plan.currency}${plan.yearly}/year`;

  return (
    <div className="flex flex-col gap-8">
      {onTrial && (
        <section className="relative rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">
          <span className="absolute -top-3 right-6 rounded-full bg-blue-700 px-3 py-1 text-xs font-bold text-white shadow-md">
            {remaining.split(" ")[0]}
          </span>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-700">
              <Clock className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900">
                Your trial ends in {remaining} — keep your site online
              </h2>
              <p className="text-sm text-slate-600">
                {priceLine} (-{yearlyDiscount(plan)}%). No commitment.
              </p>
            </div>
            <Link
              href="/dashboard/upgrade"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/40 sm:ml-auto"
            >
              <Sparkles className="h-4 w-4" />
              Activate my site
            </Link>
          </div>
        </section>
      )}

      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome to your space
        </h1>
        <p className="mt-2 text-slate-500">
          Manage your site, follow your messages and stats in one place.
        </p>
      </header>

      {onTrial && (
        <Link
          href="/dashboard/upgrade"
          className="group flex items-center gap-4 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 transition-colors hover:border-blue-500/50"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white">
            <CreditCard className="h-6 w-6" />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-bold text-slate-900">Buy my site</span>
            <span className="block text-sm text-slate-600">
              {priceLine} to keep this site online.
            </span>
          </span>
          <ExternalLink className="ml-auto h-5 w-5 shrink-0 text-blue-700 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}

      {site ? (
        <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-blue-700">
              <Globe className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Your site
              </p>
              <h2 className="truncate text-xl font-bold text-slate-900">{site.name}</h2>
              <p className="truncate text-sm text-slate-500">
                {/* A built site has nowhere public to live yet, so there's no
                    address to show — see the slug note in src/data/dashboard.ts. */}
                We&apos;re hand-coding it now — you&apos;ll get the link by email.
              </p>
            </div>
          </div>
          {/* View / Edit stay hidden until site.url and site.editUrl are real;
              linking them to "" today would just look broken. */}
          {onTrial && (
            <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
              <Link
                href="/dashboard/upgrade"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/40"
              >
                <CreditCard className="h-4 w-4" />
                Buy
              </Link>
            </div>
          )}
        </section>
      ) : (
        /* Signed up, but no brief has arrived from this address yet. */
        <section className="flex flex-col gap-5 rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Globe className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-slate-900">No site yet</h2>
              <p className="text-sm text-slate-500">
                Send us your business info and photos — we&apos;ll hand-code your site from
                them.
              </p>
            </div>
          </div>
          <Link
            href="/builditforme"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 sm:ml-auto"
          >
            <Sparkles className="h-4 w-4" />
            Start my site
          </Link>
        </section>
      )}

      <SeoCard seo={seo} />

      <ChecklistCard steps={checklist} />
    </div>
  );
}
