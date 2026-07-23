import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Braces,
  CircleDashed,
  Clock,
  FileCode,
  FileText,
  Gauge,
  Globe,
  Images,
  LineChart,
  Link2,
  ListChecks,
  Map,
  PlayCircle,
  ScanSearch,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import UnderConstruction from "@/components/dashboard/UnderConstruction";
import { getDashboardData } from "@/src/data/dashboard";

export const metadata: Metadata = { title: "SEO & GEO | Websitero" };

/* The one switch for this page. While it's true, owners get the
   under-construction card and none of the console below is rendered. Set it to
   false — nothing else — to hand them the real page. */
const UNDER_CONSTRUCTION = true;

/* The SEO & GEO console: search performance on Google, visibility inside the
   generative engines, and the tools that move both.

   Nothing here is measured yet — there's no Search Console connection, no
   crawler log and no scanner behind this page. So every number renders as an
   em dash rather than a plausible-looking figure, and every tool tile says
   plainly that it isn't open. The shape is real and the emptiness is honest:
   the day a source is wired up, its panel fills in without the page moving.

   Read the em dash as "we don't know", not as "zero". */

type Check = { label: string; note: string };

/** What the readiness scan will cover once it exists. Shown as a preview of
    the work, not as results — none of these has been run against a site. */
const CHECKS: Check[] = [
  { label: "Title tags", note: "One clear, unique title per page" },
  { label: "Meta descriptions", note: "Written for the click, not for the crawler" },
  { label: "Headings", note: "A single H1, in a sane order below it" },
  { label: "Image alt text", note: "Every image described" },
  { label: "Internal links", note: "No orphan pages, no dead links" },
  { label: "Page speed", note: "Core Web Vitals on mobile" },
  { label: "Structured data", note: "LocalBusiness schema for the map pack" },
  { label: "Crawlability", note: "Sitemap, robots.txt and llms.txt agreeing" },
];

/** The engines worth watching. "Last crawled" stays unknown until we're
    reading the site's own access logs. */
const ENGINES = ["ChatGPT", "Gemini", "Perplexity", "Claude"];

type Lesson = { title: string; length: string; kind: "video" | "read" };

const LESSONS: Lesson[] = [
  { title: "What SEO actually does for a local business", length: "4 min", kind: "video" },
  { title: "Picking keywords your customers really type", length: "3 min", kind: "video" },
  { title: "Writing title tags that earn the click", length: "2 min", kind: "video" },
  { title: "Meta descriptions, without the guesswork", length: "2 min", kind: "video" },
  { title: "Verifying your site with Google", length: "2 min", kind: "video" },
  { title: "How AI answers pick which sites to quote", length: "8 min", kind: "read" },
  { title: "Reading your search numbers without a degree", length: "10 min", kind: "read" },
];

type Tool = {
  name: string;
  description: string;
  icon: typeof Search;
  badge?: "BETA" | "NEW";
};

const TOOLS: Tool[] = [
  {
    name: "Get your site ready",
    description: "Work through the checklist for your site, in the order that moves the needle.",
    icon: ListChecks,
  },
  {
    name: "SEO settings",
    description: "Titles, meta tags and search preferences, page by page.",
    icon: Settings2,
  },
  {
    name: "Site inspection",
    description: "See your site the way Google sees it, and why a page isn't showing up.",
    icon: ScanSearch,
  },
  {
    name: "Redirects",
    description: "Point an old address at a new one so nobody — and no crawler — hits a dead end.",
    icon: Link2,
  },
  {
    name: "Site verification",
    description: "Claim ownership with the search engines and unlock their data.",
    icon: ShieldCheck,
  },
  {
    name: "Sitemap",
    description: "The XML index of every page you want found.",
    icon: Map,
  },
  {
    name: "Image optimisation",
    description: "Alt text, file names and sizes, checked across the whole site.",
    icon: Images,
  },
  {
    name: "robots.txt",
    description: "Tell crawlers which pages to skip. For the confident only.",
    icon: FileCode,
  },
  {
    name: "llms.txt",
    description: "Set out how ChatGPT and friends may use your content.",
    icon: Braces,
    badge: "BETA",
  },
  {
    name: "Agent search",
    description: "Make the site answerable to AI agents and assistants directly.",
    icon: Bot,
    badge: "NEW",
  },
];

const CARD = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";
const EYEBROW = "text-[11px] font-semibold uppercase tracking-wider text-slate-400";

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
      {children}
    </span>
  );
}

/** A headline figure we can't answer yet. The dash is the point. */
function Stat({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
      <p className={EYEBROW}>{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-300">&mdash;</p>
      <p className="mt-1 text-xs text-slate-500">{hint}</p>
    </div>
  );
}

export default async function SeoGeoPage() {
  if (UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        title="SEO & GEO"
        note="The tools for getting found — on Google and inside AI answers — are being finished."
      />
    );
  }

  const { site } = await getDashboardData();
  const live = site?.stage === "live";

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl">SEO &amp; GEO (Generative Engine Optimazation)</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Get discovered everywhere, from search engines to AI platforms like ChatGPT.
        </p>
      </header>

      {/* A site has to exist and be launched before any of this can be measured.
          Said once, at the top, rather than repeated into every empty panel. */}
      {!live && (
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Globe className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="font-bold text-slate-900">
              {site ? "Your site isn't live yet" : "No site to measure yet"}
            </h2>
            <p className="text-sm text-slate-500">
              {site
                ? "Search engines can only rank a page they can reach. Tracking starts the day your site launches."
                : "Start your site and this page fills in with its real search and AI numbers."}
            </p>
          </div>
          <Link
            href={site ? "/dashboard/site" : "/startyourwebsite"}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 sm:ml-auto"
          >
            {site ? "See my site" : "Start your website"}
          </Link>
        </section>
      )}

      {/* ------------------------------------------------ readiness checklist */}
      <section className={CARD}>
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
            <Sparkles className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">Get your site ready</h2>
            <p className="text-sm text-slate-500">
              A scan of every page, turned into a short list of fixes in priority order.
            </p>
          </div>
          <span className="ml-auto hidden shrink-0 items-center gap-1.5 text-xs text-slate-400 sm:inline-flex">
            <Clock className="h-3.5 w-3.5" />
            Never scanned
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Stat label="Issues" hint="Things costing you rankings" />
          <Stat label="Recommendations" hint="Worth doing when you can" />
          <Stat label="Completed" hint="Fixes already shipped" />
        </div>

        <p className={`mt-6 ${EYEBROW}`}>What the scan looks at</p>
        <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
          {CHECKS.map((check) => (
            <li key={check.label} className="flex items-start gap-3 py-2">
              <CircleDashed className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" />
              <span className="min-w-0">
                <span className="block text-sm font-medium text-slate-800">{check.label}</span>
                <span className="block text-xs text-slate-500">{check.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------- performance on Google */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Performance on Google</h2>
          <p className="text-sm text-slate-500">
            Clicks, impressions and the queries you rank for, pulled from Search Console.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className={`${CARD} flex flex-col`}>
            <div className="flex items-center gap-3">
              <LineChart className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Performance over time</h3>
            </div>
            <div className="mt-5 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <p className="text-sm font-medium text-slate-600">Not connected</p>
              <p className="mt-1 max-w-xs text-sm text-slate-500">
                Connect Google Search Console to see how many clicks and impressions your site is
                getting.
              </p>
              <span className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-400">
                Connecting comes with the tools below
              </span>
            </div>
          </div>

          <div className={`${CARD} flex flex-col`}>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Biggest movers</h3>
            </div>
            <div className="mt-5 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <p className="text-sm font-medium text-slate-600">Nothing to compare yet</p>
              <p className="mt-1 max-w-xs text-sm text-slate-500">
                Once you&apos;re connected, the pages and queries that moved most will be listed
                here week by week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ AI visibility */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold text-slate-900">Visibility in AI answers</h2>
          <Badge>NEW</Badge>
          <span className="ml-auto text-sm text-slate-400">Last 30 days</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className={CARD}>
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Last crawled</h3>
            </div>
            <ul className="mt-4 divide-y divide-slate-100">
              {ENGINES.map((engine) => (
                <li key={engine} className="flex items-center justify-between py-2.5">
                  <span className="text-sm font-medium text-slate-800">{engine}</span>
                  <span className="text-sm text-slate-300">&mdash;</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${CARD} flex flex-col`}>
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Questions you answered</h3>
            </div>
            <div className="mt-5 flex flex-1 flex-col items-center justify-center text-center">
              <p className="text-4xl font-bold text-slate-300">&mdash;</p>
              <p className="mt-2 max-w-xs text-sm text-slate-500">
                How often an AI assistant used one of your pages to answer somebody.
              </p>
            </div>
          </div>

          <div className={`${CARD} flex flex-col`}>
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Visibility score</h3>
            </div>
            <div className="mt-5 flex flex-1 flex-col justify-center">
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-0 rounded-full bg-blue-500" />
              </div>
              <p className="mt-3 text-sm text-slate-500">
                One number for how present your business is across the AI assistants, scored
                against the others in your trade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- learning */}
      <section className={CARD}>
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <PlayCircle className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">Learn SEO &amp; GEO</h2>
            <p className="text-sm text-slate-500">
              Short lessons in plain English. They land here alongside the tools — nothing to
              read yet.
            </p>
          </div>
        </div>

        <ul className="mt-5 divide-y divide-slate-100">
          {LESSONS.map((lesson) => (
            <li key={lesson.title} className="flex items-center gap-3 py-3">
              {lesson.kind === "video" ? (
                <PlayCircle className="h-4 w-4 shrink-0 text-slate-300" />
              ) : (
                <FileText className="h-4 w-4 shrink-0 text-slate-300" />
              )}
              <span className="min-w-0 truncate text-sm font-medium text-slate-700">
                {lesson.title}
              </span>
              <span className="ml-auto shrink-0 text-xs text-slate-400">{lesson.length}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------- tools */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Tools and settings</h2>
          <p className="text-sm text-slate-500">
            Everything that changes how search engines and AI assistants read your site. None of
            it is open yet — each one arrives switched on, with nothing for you to set up.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <tool.icon className="h-5 w-5" />
                </span>
                <h3 className="min-w-0 truncate font-bold text-slate-900">{tool.name}</h3>
                {tool.badge && <Badge>{tool.badge}</Badge>}
              </div>
              <p className="mt-3 text-sm text-slate-500">{tool.description}</p>
              <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                Not open yet
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
