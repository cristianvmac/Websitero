import Link from "next/link";
import { ArrowRight, ExternalLink, Globe, Rocket, Sparkles, Wrench } from "lucide-react";
import { FRAMEWORKS, DIY_FRAMEWORKS } from "@/lib/diy";
import { chooseDiyFramework } from "@/app/dashboard/actions";
import { getDashboardData } from "@/src/data/dashboard";
import BuildTracker from "@/components/dashboard/BuildTracker";
import KitCard from "@/components/dashboard/KitCard";
import KitUpdates from "@/components/dashboard/KitUpdates";
import LinkSiteCard from "@/components/dashboard/LinkSiteCard";
import PreviewCard from "@/components/dashboard/PreviewCard";
import SeoCard from "@/components/dashboard/SeoCard";
import ChecklistCard from "@/components/dashboard/ChecklistCard";

/* The overview routes the journey — what it shows is decided by what the
   account HAS, never by a mode the user picked somewhere:

   nothing yet       → the empty state below: the two ways to start, offered
                       in place. Signing in always opens the dashboard — an
                       account that has done nothing yet still owns this space,
                       and bouncing it to a marketing page made the app look
                       broken to anyone who had only signed up.
   diy, no brief     → the kit card: clone command, docs path, switch, plus
                       the standing "we'll take it from here" offer.
   brief, not live   → the build tracker, plus the preview review card once
                       the team publishes a preview URL. A brief always
                       outranks the kit here: submitting one hands the build
                       over, though the Developer nav stays for DIY accounts.
   live              → the site card with its real address, growth steps, SEO.

   There are no trial or upgrade banners: pricing is a one-off build fee taken
   at approval, so the only money moment is the Activate button inside the
   preview card. Nothing here nags someone who hasn't got a site yet. */

export default async function DashboardHomePage() {
  const data = await getDashboardData();
  const { user, site, materials, diy, seo, checklist } = data;

  // Just the first name — "Welcome, Cristian" reads better than the full name,
  // and single-word names come through unchanged.
  const firstName = user.name.split(" ")[0];

  // No brief, no kit — nothing to manage yet, but this is still their space.
  // Both ways to start are offered below rather than by a redirect.
  const empty = !site && !diy;

  const showPreview =
    site &&
    site.previewUrl &&
    (site.stage === "preview_ready" ||
      site.stage === "changes_requested" ||
      site.stage === "approved");

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome, {firstName}
        </h1>
       {/* <p className="mt-2 text-slate-500">
          {empty
            ? "Nothing here yet — pick how you'd like to start."
            : !site
              ? "Your kit and your docs, all in one place."
              : site.stage === "live"
                ? "Manage your site, follow your messages and stats in one place."
                : "Your site is being hand-coded — follow every step here."}
        </p>*/}
      </header>

      {/* ------------------------------------------- nothing yet: the two ways */}
      {empty && (
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Default path — the primary audience isn't technical. */}
          <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
              <Rocket className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-bold text-slate-900">Build it for me</h2>
            <p className="mt-1 text-sm text-slate-500">
              Send a doc about your business and your photos. We hand-code your site — no
              questions, no forms.
            </p>
            <Link
              href="/builditforme"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* DIY starts with the framework pick — the only signal it leaves.
              Posting straight to the action means no detour through the
              marketing page just to land back here on the kit card. */}
          <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Wrench className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-bold text-slate-900">I&apos;ll build it myself</h2>
            <p className="mt-1 text-sm text-slate-500">
              Start from a complete kit with step-by-step docs and chat support. Pick your
              stack:
            </p>
            <form action={chooseDiyFramework} className="mt-5 flex flex-wrap gap-2">
              {DIY_FRAMEWORKS.map((key) => (
                <button
                  key={key}
                  type="submit"
                  name="framework"
                  value={key}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-700"
                >
                  {FRAMEWORKS[key].label}
                </button>
              ))}
            </form>
          </section>
        </div>
      )}

      {/* ------------------------------------------------- DIY: kit + docs */}
      {!site && diy && (
        <>
         {/* <KitCard framework={diy.framework} /> */}

          {/* Keyed by siteUrl: a successful save remounts the card, closing
              its edit form. */}
          <LinkSiteCard key={diy.siteUrl} siteUrl={diy.siteUrl} framework={diy.framework} />

          {/* Renders nothing when the kit repo has no CHANGELOG.md yet. */}
          {/*<KitUpdates framework={diy.framework} /> */}

          {/* A nudge to get going, not a nag: /startyourwebsite is where both
              ways to launch live, so whichever way they lean the next step is
              one click away — nothing they've already built is lost. */}
          <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
              <Sparkles className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h2 className="font-bold text-slate-900">Ready to start your website?</h2>
              <p className="text-sm text-slate-500">
                Pick up where you left off — build it yourself with your kit, or hand it
                over and we&apos;ll code it for you.
              </p>
            </div>
            <Link
              href="/startyourwebsite"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 sm:ml-auto"
            >
              Start your website
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </>
      )}

      {/* ------------------------------------------- building: tracker + review */}
      {site && site.stage !== "live" && (
        <>
          {/* The preview leads when it's waiting on the owner's decision;
              otherwise "where is my site?" does. */}
          {showPreview && site.stage === "preview_ready" && (
            <PreviewCard
              stage={site.stage}
              previewUrl={site.previewUrl}
              changeRequests={site.changeRequests}
              tier={site.tier}
              // Not payable until they've approved — and the card is a client
              // component, so an unused link here would still ship in the
              // page payload. They see the price, not the checkout.
              paymentUrl=""
            />
          )}
          <BuildTracker stage={site.stage} receivedAt={site.receivedAt} materials={materials} />
          {showPreview && site.stage !== "preview_ready" && (
            <PreviewCard
              stage={site.stage}
              previewUrl={site.previewUrl}
              changeRequests={site.changeRequests}
              tier={site.tier}
              // Only once it's payable. The link isn't secret, but it has no
              // business sitting in the page payload before they've approved.
              paymentUrl={site.stage === "approved" ? site.paymentUrl : ""}
            />
          )}
        </>
      )}

      {/* --------------------------------------------------------------- live */}
      {site && site.stage === "live" && (
        <>
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
                  {site.url || "Live — the address is on its way."}
                </p>
              </div>
            </div>
            {/* No "Buy" here — reaching live means it's already paid for. */}
            <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
              {site.url && (
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
                >
                  <ExternalLink className="h-4 w-4" />
                  View my site
                </a>
              )}
            </div>
          </section>

          <SeoCard seo={seo} />

          <ChecklistCard steps={checklist} />
        </>
      )}
    </div>
  );
}
