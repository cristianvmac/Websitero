import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Clock,
  FileText,
  Globe2,
  Inbox,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  MousePointerClick,
  Search,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import UnderConstruction from "@/components/dashboard/UnderConstruction";
import { getDashboardData } from "@/src/data/dashboard";

export const metadata: Metadata = { title: "Analytics | Websitero" };

/* The one switch for this page. While it's true, owners get the
   under-construction card and none of the console below is rendered. Set it to
   false — nothing else — to hand them the real page. */
const UNDER_CONSTRUCTION = true;

/* Site analytics — sessions, sources, pages, engagement.

   Nothing is measured: there's no analytics script on the sites and no events
   table behind this page. So every figure is an em dash, the sessions panel is
   an empty axis frame rather than a chart with invented marks, and each tool
   says it isn't open. Same rule as the SEO and Business Profile consoles: the
   shape is real, the emptiness is honest, and a wired-up source fills its
   panel without the page moving.

   The one thing here that IS computed is the reporting window — the dates below
   are today's real last-30-days and the period it would be compared against, so
   the header means something the moment data starts arriving. */

const CARD = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";
const EMPTY_PANEL =
  "flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center";

const dayMs = 24 * 60 * 60 * 1000;
const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-GB", opts);

/** Sample questions, shown as what the assistant will take — not as things you
    can click yet. */
const QUESTIONS = [
  "How many visitors did I get?",
  "Which page brings the most enquiries?",
  "Where are my visitors coming from?",
];

type Stat = { label: string; hint: string; icon: typeof Users };

const KEY_STATS: Stat[] = [
  { label: "Site sessions", hint: "Visits to your site", icon: LineChart },
  { label: "Visitors", hint: "Individual people", icon: Users },
  { label: "Enquiries", hint: "Forms sent and calls tapped", icon: Inbox },
];

/** The sources worth splitting out for a local business. No paid-ads row: we
    don't sell ads, so offering one here would be an advert for a product that
    doesn't exist. */
const SOURCES = ["Direct", "Google search", "Google Maps", "Social", "Other sites"];

const ENGAGEMENT = [
  { label: "Avg pages per session", icon: FileText },
  { label: "Avg session duration", icon: Timer },
  { label: "Bounce rate", icon: TrendingUp },
];

/* Where the numbers actually get moved. The first two are real routes that
   exist today, so they're links; the rest are honest "not open yet" tiles. */
type MarketingCard = {
  name: string;
  description: string;
  icon: typeof Search;
  href?: string;
};

const MARKETING: MarketingCard[] = [
  {
    name: "See how people find you on Google",
    description: "Clicks, impressions and the queries you rank for, plus your readiness checklist.",
    icon: Search,
    href: "/dashboard/marketing/seo-geo",
  },
  {
    name: "Show up on Maps",
    description: "Your Business Profile: views, calls and direction requests from local searches.",
    icon: MapPin,
    href: "/dashboard/marketing/google-business",
  },
  {
    name: "Check your presence in AI answers",
    description: "How often ChatGPT and the others reach for your pages when someone asks.",
    icon: Bot,
    href: "/dashboard/marketing/seo-geo",
  },
  {
    name: "Reach past customers by email",
    description: "Campaigns to the people who already got in touch, sent from your own address.",
    icon: Mail,
  },
  {
    name: "Announce something",
    description: "Push an offer or a notice to your site, your listing and your socials at once.",
    icon: Megaphone,
  },
];
export default async function AnalyticsPage() {
  if (UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        title="Site Analytics"
        note="Your visitor stats will live here — where people come from, which pages they read, and what they do next."
      />
    );
  }

  const { site } = await getDashboardData();
  const live = site?.stage === "live";

  /* Last 30 days ending today, and the 30 days before that — the comparison
     window every figure on this page would be measured against. */
  const today = new Date();
  const start = new Date(today.getTime() - 29 * dayMs);
  const prevEnd = new Date(start.getTime() - dayMs);
  const prevStart = new Date(prevEnd.getTime() - 29 * dayMs);

  const previousLabel = `${fmt(prevStart, { day: "numeric", month: "short" })} – ${fmt(prevEnd, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

  // Five ticks across the window, matching how the chart would be labelled.
  const ticks = [0, 6, 12, 18, 24].map((offset) =>
    fmt(new Date(start.getTime() + offset * dayMs), { day: "numeric", month: "short" }),
  );

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Site Analytics
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Access a complete overview of your site’s activity across all areas.
        </p>
      </header>

      {/* ------------------------------------------------------------ ask bar */}
      <section className={CARD}>
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
            <Sparkles className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">Ask a question about your stats</h2>
            <p className="text-sm text-slate-500">
              Plain English in, a straight answer out — no charts to read.
            </p>
          </div>
        </div>

        {/* Deliberately not an input: typing into a box that answers nothing is
            worse than a box that says so. */}
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="min-w-0 truncate text-sm text-slate-400">
            Ask anything about your visitors…
          </span>
          <span className="ml-auto shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-400">
            Not open yet
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {QUESTIONS.map((question) => (
            <span
              key={question}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-400"
            >
              {question}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- key stats */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
          <h2 className="text-xl font-bold text-slate-900">Last 30 days</h2>
          <span className="text-sm text-slate-400">compared with {previousLabel}</span>
        </div>

        <p className="text-sm text-slate-500">
          {live
            ? "Your key stats will appear here once measurement is switched on."
            : "Your key stats will appear here once your site is live."}
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {KEY_STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <stat.icon className="h-5 w-5 text-slate-400" />
              <p className="mt-3 text-3xl font-bold text-slate-300">&mdash;</p>
              <p className="mt-1 text-sm font-medium text-slate-800">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.hint}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ know visitors */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-900">Get to know your visitors</h2>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* An axis frame, not a chart: there is no series to draw, so nothing
              is drawn. Real dates on the x-axis, a 0-based y-axis, recessive
              grid — the frame the first real week will fill. */}
          <div className={`${CARD} flex flex-col lg:col-span-2`}>
            <div className="flex items-center gap-3">
              <LineChart className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Sessions over time</h3>
            </div>

            <div className="mt-5 flex gap-3">
              <div className="flex shrink-0 flex-col justify-between py-0.5 text-[11px] tabular-nums text-slate-300">
                {[4, 3, 2, 1, 0].map((y) => (
                  <span key={y}>{y}</span>
                ))}
              </div>
              <div className="relative min-w-0 flex-1">
                <div className="flex h-40 flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((line) => (
                    <div key={line} className="h-px w-full bg-slate-100" />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-white/80 px-3 py-1 text-sm text-slate-400">
                    No sessions recorded
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex justify-between pl-8 text-[11px] text-slate-400">
              {ticks.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>

          <div className={`${CARD} flex flex-col`}>
            <div className="flex items-center gap-3">
              <Globe2 className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Where they came from</h3>
            </div>
            <ul className="mt-4 divide-y divide-slate-100">
              {SOURCES.map((source) => (
                <li key={source} className="flex items-center justify-between py-2.5">
                  <span className="text-sm font-medium text-slate-800">{source}</span>
                  <span className="text-sm text-slate-300">&mdash;</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${CARD} flex flex-col`}>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-slate-400" />
            <h3 className="font-bold text-slate-900">Where they are</h3>
          </div>
          <div className={`mt-5 ${EMPTY_PANEL}`}>
            <p className="text-sm font-medium text-slate-600">No locations yet</p>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              Towns and postcodes your visitors browse from — the fastest way to tell whether
              you&apos;re reaching the area you actually serve.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- engagement */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-900">Explore visitor engagement</h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className={`${CARD} flex flex-col`}>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Most visited pages</h3>
            </div>
            <div className={`mt-5 ${EMPTY_PANEL}`}>
              <p className="text-sm font-medium text-slate-600">No pages were visited</p>
              <p className="mt-1 max-w-xs text-sm text-slate-500">
                Once traffic starts, your busiest pages are listed here in order.
              </p>
            </div>
          </div>

          <div className={`${CARD} flex flex-col`}>
            <div className="flex items-center gap-3">
              <Timer className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Engagement stats</h3>
            </div>
            <ul className="mt-4 divide-y divide-slate-100">
              {ENGAGEMENT.map((row) => (
                <li key={row.label} className="flex items-center gap-3 py-3">
                  <row.icon className="h-4 w-4 shrink-0 text-slate-400" />
                  <span className="text-sm font-medium text-slate-800">{row.label}</span>
                  <span className="ml-auto text-sm text-slate-300">&mdash;</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              How far people get before they leave — the three numbers that say whether the site
              is doing its job.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`${CARD} flex flex-col`}>
            <div className="flex items-center gap-3">
              <MousePointerClick className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Button click tracking</h3>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Find out which buttons get pressed — Call, Book, Get a quote — and which get
              ignored.
            </p>
            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              Not open yet
            </span>
          </div>

          <div className={`${CARD} flex flex-col`}>
            <div className="flex items-center gap-3">
              <Video className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-slate-900">Session recordings</h3>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Watch back how real visitors moved through the site, so you can see where they got
              stuck.
            </p>
            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              Not open yet
            </span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- marketing */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Analyse marketing performance</h2>
          <p className="text-sm text-slate-500">
            Where the visits come from in the first place. Two of these are already open.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {MARKETING.map((card) =>
            card.href ? (
              <Link
                key={card.name}
                href={card.href}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-500/40 hover:bg-blue-500/5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="min-w-0 font-bold text-slate-900">{card.name}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-500">{card.description}</p>
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-blue-700">
                  Open
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ) : (
              <div
                key={card.name}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <card.icon className="h-5 w-5" />
                  </span>
                  <h3 className="min-w-0 font-bold text-slate-900">{card.name}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-500">{card.description}</p>
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  Not open yet
                </span>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
