import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-px w-8 bg-linear-to-r from-blue-400 to-cyan-400" />
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
        {title}
      </h2>
    </div>
  );
}

const platforms = [
  {
    name: "Netlify",
    href: "/docs/eleventy/deployment/netlify",
    blurb:
      "Hosting and serverless backend services for static sites and web apps. Auto-deploys on push with a generous free tier.",
    recommended: true,
    tags: ["Git deploys", "Functions", "Forms"],
    initial: "N",
    accent: "from-teal-400 to-cyan-500",
  },
  {
    name: "Vercel",
    href: "/docs/eleventy/deployment/vercel",
    blurb:
      "Frontend cloud with a global Edge Network. Detects Eleventy and ships a preview URL for every push.",
    recommended: true,
    tags: ["Git deploys", "Edge", "Previews"],
    initial: "V",
    accent: "from-gray-700 to-gray-900",
  },
];

export default function Deployment() {
  return (
    <section className="min-h-full p-12">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
            <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Eleventy
            </Link>
            <span><LuChevronRight /></span>
            <span aria-current="page">Deployment</span>
          </nav>

          <h1 className="text-gray-900 text-4xl sm:text-5xl font-extrabold mb-5 tracking-tight">
            Deploy Your Eleventy Site
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Eleventy builds to fast, static HTML, so it runs on virtually any
            host. Pick a platform below for a step-by-step guide — or use the
            shared build settings to deploy anywhere.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Choose a platform */}
        <div className="mb-16">
          <SectionHeading eyebrow="Get started" title="Choose a platform" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Both options connect to your Git repository and redeploy
            automatically on every push.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {platforms.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${p.accent} text-white font-extrabold text-lg shadow-sm`}
                  >
                    {p.initial}
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                    {p.recommended && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Recommended
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {p.blurb}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
                  Read the {p.name} guide
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Build settings at a glance */}
        <div className="mb-16">
          <SectionHeading eyebrow="At a glance" title="Universal build settings" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Most hosts auto-detect Eleventy. If you ever need to enter them by
            hand, these are the only two values that matter:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <p className="text-xs font-bold uppercase tracking-wider">
                  Build command
                </p>
              </div>
              <p className="font-mono text-lg text-gray-900">npx @11ty/eleventy</p>
            </div>
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                <p className="text-xs font-bold uppercase tracking-wider">
                  Publish directory
                </p>
              </div>
              <p className="font-mono text-lg text-gray-900">_site</p>
            </div>
          </div>
        </div>

        {/* Static by design */}
        <div>
          <SectionHeading eyebrow="Good to know" title="Static by design" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Eleventy generates pure static HTML — there is no server runtime to
            configure. When you need a little dynamic behavior, layer it on with
            your host&apos;s serverless functions; each guide covers the exact steps.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Static output</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The default — and the only mode. Eleventy prerenders every page to
                HTML at build time, so you deploy the{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">_site</code>{" "}
                folder to any static host or CDN.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-50 text-teal-600 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Serverless functions</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Add backend logic with{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">netlify/functions</code>{" "}
                on Netlify or an{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">api/</code>{" "}
                folder on Vercel for forms, APIs, and auth.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
