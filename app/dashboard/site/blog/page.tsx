import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, GitBranch, Globe, PenLine, Rocket } from "lucide-react";
import UnderConstruction from "@/components/dashboard/UnderConstruction";
import { FRAMEWORKS } from "@/lib/diy";
import { getDashboardData } from "@/src/data/dashboard";

export const metadata: Metadata = { title: "Blog | Websitero" };

/* The one switch for this page. While it's true, owners get the
   under-construction card and none of what's below is rendered. Set it to
   false — nothing else — to hand them the real page. */
const UNDER_CONSTRUCTION = true;

/* Writing a post doesn't happen here — it happens in the site's own CMS.
   Both kits ship Decap at /admin, backed by the site's git repo, so this page
   is a door rather than an editor: it deep-links to Decap's new-post route and
   explains what saving actually does. Building a second editor on top would
   mean a second source of truth for content that already lives as markdown in
   the repo.

   The collection is named "blog" in both kits' src/admin/config.yml, which is
   what makes the #/collections/blog/new route below the same for either. */

/** The fields Decap shows on a new post — the shared ones across both kits'
    blog collections. Eleventy adds a URL slug and tags; the kit fills those in
    with sensible defaults, so they're not worth listing as work. */
const FIELDS = [
  { label: "Title", note: "The headline, and what the page is called" },
  { label: "Description", note: "One line for listings and Google's snippet" },
  { label: "Author", note: "The byline" },
  { label: "Date", note: "Publish date — posts sort newest first" },
  { label: "Cover image", note: "Uploaded straight into the site's image folder" },
  { label: "Body", note: "The post itself, written like a document" },
];

const STEPS = [
  {
    icon: PenLine,
    title: "You write and hit publish",
    note: "Decap saves the post as a markdown file — no database, nothing to back up.",
  },
  {
    icon: GitBranch,
    title: "It's committed to your repo",
    note: "Your content is version-controlled with the rest of the site. Nothing is locked in.",
  },
  {
    icon: Rocket,
    title: "The site rebuilds itself",
    note: "A minute or so later the post is live at /blog on your own address.",
  },
];

export default async function BlogPage() {
  if (UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        title="Blog"
        note="Writing and publishing posts from the dashboard isn't ready yet."
      />
    );
  }

  const { site, diy } = await getDashboardData();
  const live = site?.stage === "live";

  // Trailing slashes come and go depending on who typed the address.
  const base = live ? (site?.url ?? "").replace(/\/+$/, "") : "";
  const newPostUrl = base ? `${base}/admin/#/collections/blog/new` : "";
  const cmsUrl = base ? `${base}/admin/` : "";

  // The walkthrough only exists per framework, so it's only offered to accounts
  // whose framework we know. Everyone else gets the docs hub.
  const guideHref = diy ? `${FRAMEWORKS[diy.framework].docsHref}/tutorials/start-blog` : "/docs";

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl">Blog</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Posts are written in your site&apos;s own editor and saved straight into it — no extra
          login, nothing to install.
        </p>
      </header>

      {/* ------------------------------------------------------- write a post */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
            <PenLine className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">Write a new post</h2>
            <p className="text-sm text-slate-500">
              {newPostUrl
                ? "Opens your site's editor with a blank post ready to fill in."
                : "Your editor opens here the moment your site is live."}
            </p>
          </div>
        </div>

        {newPostUrl ? (
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={newPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
            >
              <PenLine className="h-4 w-4" />
              New post
            </a>
            <a
              href={cmsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-700"
            >
              <ExternalLink className="h-4 w-4" />
              All my posts
            </a>
          </div>
        ) : (
          /* No live address means no /admin to open — say which of the two
             reasons it is rather than showing a button that goes nowhere. */
          <div className="mt-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500">
              <Globe className="h-5 w-5" />
            </span>
            <p className="min-w-0 text-sm text-slate-600">
              {site
                ? "Your site isn't live yet. The editor lives at your own address, so it opens as soon as it launches."
                : "There's no site to write for yet — start one and the blog comes with it."}
            </p>
            <Link
              href={site ? "/dashboard/site" : "/startyourwebsite"}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 sm:ml-auto"
            >
              {site ? "See my site" : "Start your website"}
            </Link>
          </div>
        )}

        <p className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          What you&apos;ll fill in
        </p>
        <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <li key={field.label} className="flex items-baseline gap-2 py-1.5">
              <span className="text-sm font-medium text-slate-800">{field.label}</span>
              <span className="min-w-0 text-xs text-slate-500">{field.note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ what saving does */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">What happens when you publish</h2>
        <ol className="mt-5 grid gap-5 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <step.icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Step {index + 1}
                </span>
              </div>
              <p className="mt-3 font-bold text-slate-900">{step.title}</p>
              <p className="mt-1 text-sm text-slate-500">{step.note}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------------- guide */}
      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <BookOpen className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h2 className="font-bold text-slate-900">First time writing a post?</h2>
          <p className="text-sm text-slate-500">
            The walkthrough covers the editor, images, and how to change which fields a post has.
          </p>
        </div>
        <Link
          href={guideHref}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-blue-700 sm:ml-auto"
        >
          Read the guide
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
