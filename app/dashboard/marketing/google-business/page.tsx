import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  Camera,
  Check,
  CircleDashed,
  Clock,
  Eye,
  FileText,
  Globe,
  HelpCircle,
  Images,
  ListChecks,
  MapPin,
  Megaphone,
  MessagesSquare,
  MousePointerClick,
  Navigation,
  Phone,
  PlayCircle,
  Search,
  Star,
} from "lucide-react";
import UnderConstruction from "@/components/dashboard/UnderConstruction";
import { getDashboardData } from "@/src/data/dashboard";

export const metadata: Metadata = { title: "Google Business Profile | Websitero" };

/* The one switch for this page. While it's true, owners get the
   under-construction card and none of the console below is rendered. Set it to
   false — nothing else — to hand them the real page. */
const UNDER_CONSTRUCTION = true;
/* The Google Business Profile console — the listing that puts a local business
   in the map pack, next to the site rather than inside it.

   Nothing is connected: there's no Google account link, no Business Profile
   API call and no review feed behind this page. Every figure is an em dash and
   every tool says it isn't open, same rule as the SEO console — the shape is
   real, the emptiness is honest, and a wired-up source fills its panel without
   moving the page.

   The two things here that ARE real come from the owner's own brief: the
   business name, and whether they gave us a phone number. Those render as
   known; everything else in the listing preview stays unanswered. */

const CARD = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";
const EYEBROW = "text-[11px] font-semibold uppercase tracking-wider text-slate-400";

/** A row of the listing. `value` is null for everything we can't answer yet —
    the fields connecting a profile would collect. */
type Field = { label: string; value: string | null; icon: typeof MapPin };

type Metric = { label: string; hint: string; icon: typeof Eye };

const METRICS: Metric[] = [
  { label: "Profile views", hint: "On Search and Maps", icon: Eye },
  { label: "Searches", hint: "How people found you", icon: Search },
  { label: "Calls", hint: "Tapped your number", icon: Phone },
  { label: "Directions", hint: "Asked how to reach you", icon: Navigation },
  { label: "Website clicks", hint: "Came through to your site", icon: MousePointerClick },
];

type Lesson = { title: string; length: string; kind: "video" | "read" };

const LESSONS: Lesson[] = [
  { title: "What a Business Profile does that a website can't", length: "3 min", kind: "video" },
  { title: "Getting verified by Google, step by step", length: "4 min", kind: "video" },
  { title: "Photos that make people pick you over the shop next door", length: "2 min", kind: "video" },
  { title: "Replying to reviews — including the bad ones", length: "6 min", kind: "read" },
  { title: "Why the map pack matters more than page one", length: "7 min", kind: "read" },
];

type Tool = {
  name: string;
  description: string;
  icon: typeof MapPin;
  badge?: "BETA" | "NEW";
};

const TOOLS: Tool[] = [
  {
    name: "Connect Google",
    description: "Link the Google account that owns the listing, or let us create one for you.",
    icon: BadgeCheck,
  },
  {
    name: "Business info",
    description: "Name, category, address and service area — the details Google shows first.",
    icon: Building2,
  },
  {
    name: "Opening hours",
    description: "Regular hours plus bank holidays, so nobody turns up to a locked door.",
    icon: CalendarClock,
  },
  {
    name: "Photos",
    description: "Reuse the photos from your site, or add the ones customers respond to.",
    icon: Camera,
  },
  {
    name: "Posts & offers",
    description: "Short updates that appear on your listing — an offer, an event, a notice.",
    icon: Megaphone,
  },
  {
    name: "Reviews & replies",
    description: "Read every review in one place and reply without leaving the dashboard.",
    icon: Star,
  },
  {
    name: "Questions & answers",
    description: "Answer the questions people ask on your listing before a competitor does.",
    icon: HelpCircle,
  },
  {
    name: "Messages",
    description: "Chats started from your listing, landing in the same inbox as the rest.",
    icon: MessagesSquare,
    badge: "BETA",
  },
  {
    name: "Listing checkup",
    description: "A scan of the profile against what ranks in your area, with the gaps listed.",
    icon: ListChecks,
    badge: "NEW",
  },
];

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
      {children}
    </span>
  );
}

export default async function GoogleBusinessPage() {
  if (UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        title="Google Business Profile"
        note="Managing your Google listing from here — the map pack, your reviews and your opening hours — is on the way."
      />
    );
  }

  const { site, materials } = await getDashboardData();
  const live = site?.stage === "live";

  /* Straight from the brief. The name is the one field of a listing we can
     answer today; the phone is a yes/no because the dashboard summary only
     records whether they gave one, not the number itself. */
  const fields: Field[] = [
    { label: "Business name", value: site?.name ?? null, icon: Building2 },
    { label: "Category", value: null, icon: ListChecks },
    { label: "Address or service area", value: null, icon: MapPin },
    { label: "Phone", value: materials?.phone ? "On file from your brief" : null, icon: Phone },
    { label: "Opening hours", value: null, icon: Clock },
    { label: "Website", value: live && site?.url ? site.url : null, icon: Globe },
    { label: "Photos", value: null, icon: Images },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Google Business Profile
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          The listing that puts you on Google Maps and in the local results, managed from here.
        </p>
      </header>

      {/* -------------------------------------------------------------- pitch */}
      <section className={`${CARD} grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center`}>
        <div className="min-w-0">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
            <MapPin className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
            Promote your business on Google Search &amp; Maps
          </h2>
          <p className="mt-2 text-slate-500">
            Bring in local traffic with a Google Business Profile.
          </p>

          <ul className="mt-5 flex flex-col gap-3">
            {[
              "Give potential customers your business info at a glance",
              "Make sure customers can easily get in touch",
              "Create and manage your profile from this dashboard",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-slate-700">{point}</span>
              </li>
            ))}
          </ul>

          <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            Connecting isn&apos;t open yet
          </span>
        </div>

        {/* A preview of the owner's own listing — their name, and dashes for
            every field nobody has answered yet. Not a mock-up of somebody
            else's business. */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className={EYEBROW}>How your listing would look</p>
          <p className="mt-2 truncate text-lg font-bold text-slate-900">
            {site?.name ?? "Your business"}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <Star className="h-4 w-4 text-slate-300" />
            <span className="text-sm text-slate-300">&mdash;</span>
            <span className="text-sm text-slate-400">No reviews yet</span>
          </div>

          <ul className="mt-4 flex flex-col gap-2.5">
            {fields.slice(1).map((field) => (
              <li key={field.label} className="flex items-center gap-3">
                <field.icon className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="text-sm text-slate-500">{field.label}</span>
                <span
                  className={`ml-auto truncate text-sm ${
                    field.value ? "font-medium text-slate-700" : "text-slate-300"
                  }`}
                >
                  {field.value ?? "—"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The listing itself doesn't need a launched site — but the link on it
          does, so this only explains the one field that has to wait. */}
      {!live && (
        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Globe className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="font-bold text-slate-900">
              {site ? "Your site address is still coming" : "No site linked yet"}
            </h2>
            <p className="text-sm text-slate-500">
              {site
                ? "A profile works on its own, but the Website button on it is worth more than the rest put together. It fills in the day your site launches."
                : "You can be listed on Maps without a website — you'll just get more out of both together."}
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

      {/* ---------------------------------------------------------- the numbers */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold text-slate-900">How people find you</h2>
          <span className="ml-auto text-sm text-slate-400">Last 30 days</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {METRICS.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <metric.icon className="h-5 w-5 text-slate-400" />
              <p className="mt-3 text-2xl font-bold text-slate-300">&mdash;</p>
              <p className="mt-1 text-sm font-medium text-slate-800">{metric.label}</p>
              <p className="text-xs text-slate-500">{metric.hint}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-500">
          These come straight from Google once the profile is connected. Until then there&apos;s
          nothing to count.
        </p>
      </section>

      {/* ----------------------------------------------------- listing + reviews */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section className={`${CARD} flex flex-col`}>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
              <ListChecks className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900">Your listing details</h2>
              <p className="text-sm text-slate-500">
                A complete profile outranks a thin one in the map pack.
              </p>
            </div>
          </div>

          <ul className="mt-5 divide-y divide-slate-100">
            {fields.map((field) => (
              <li key={field.label} className="flex items-center gap-3 py-2.5">
                {field.value ? (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <CircleDashed className="h-5 w-5 shrink-0 text-slate-300" />
                )}
                <span className="text-sm font-medium text-slate-800">{field.label}</span>
                <span
                  className={`ml-auto min-w-0 truncate text-sm ${
                    field.value ? "text-slate-500" : "text-slate-300"
                  }`}
                >
                  {field.value ?? "Not set"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${CARD} flex flex-col`}>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Star className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900">Reviews</h2>
              <p className="text-sm text-slate-500">
                Every review on your listing, answerable from here.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
              <p className={EYEBROW}>Average rating</p>
              <p className="mt-1 text-2xl font-bold text-slate-300">&mdash;</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
              <p className={EYEBROW}>Total reviews</p>
              <p className="mt-1 text-2xl font-bold text-slate-300">&mdash;</p>
            </div>
          </div>

          <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
            <MessagesSquare className="h-8 w-8 text-slate-300" />
            <p className="mt-3 text-sm font-medium text-slate-600">Nothing to read yet</p>
            <p className="mt-1 max-w-xs text-sm text-slate-500">
              Connect the profile and reviews land here as they arrive — with a reply box under
              each one.
            </p>
          </div>
        </section>
      </div>

      {/* --------------------------------------------------------------- posts */}
      <section className={CARD}>
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Megaphone className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">Posts &amp; offers</h2>
            <p className="text-sm text-slate-500">
              Short updates that show on your listing — an offer, an event, a change of hours.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
          <p className="text-sm font-medium text-slate-600">No posts</p>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            Posting isn&apos;t open yet. When it is, anything you publish here goes straight onto
            the listing — no second login.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- learning */}
      <section className={CARD}>
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <PlayCircle className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">Learn local search</h2>
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
            Everything that shapes your listing. None of it is open yet — each one arrives
            switched on, with nothing for you to set up.
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
