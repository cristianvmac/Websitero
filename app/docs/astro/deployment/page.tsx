import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

type ChecklistLine = { label: string; code?: boolean; note?: string; href?: string };
type ChecklistItem = {
  title: string;
  desc?: string;
  items?: ChecklistLine[];
  links?: { label: string; href: string }[];
  groups?: { title: string; lines: ChecklistLine[] }[];
};

const checklist: ChecklistItem[] = [
  {
    title: "Site URLs",
    desc: "Update in:",
    items: [
      { label: "astro.config.mjs", code: true, note: "site property" },
      { label: "src/data/client.ts", code: true, note: "SITE.url" },
      { label: "public/robots.txt", code: true, note: "Sitemap URL" },
    ],
  },
  {
    title: "Business Information",
    desc: "Update src/data/client.ts:",
    items: [
      { label: "Company name, address, phone" },
      { label: "Email and opening hours" },
      { label: "Social media links" },
    ],
  },
  {
    title: "Favicons",
    desc: "Replace default favicons in public/assets/favicons/",
    links: [{ label: "Generator", href: "https://realfavicongenerator.net/" }],
  },
  {
    title: "Default Social Image",
    desc: "Create public/assets/social.jpg (1200x600px recommended).",
  },
  {
    title: "Decap CMS Configuration",
    desc: "Update public/admin/config.yml:",
    items: [
      { label: "Repository name" },
      { label: "Site URL" },
      { label: "DecapBridge settings" },
    ],
  },
  {
    title: "Test JSON-LD and Social Sharing",
    desc: "Validate before deploying.",
    groups: [
      {
        title: "JSON-LD Validation",
        lines: [
          { label: "Build locally:", href: undefined, code: false },
          { label: "npm run build && npm run preview", code: true },
          { label: "View page source and copy the JSON-LD script (inside <script type=\"application/ld+json\">)" },
          { label: "Validate at", href: "https://validator.schema.org/" },
          { label: "Test with Google Rich Results:", href: "https://search.google.com/test/rich-results" },
        ],
      },
      {
        title: "Social Sharing",
        lines: [
          { label: "Facebook:", href: "https://developers.facebook.com/tools/debug/" },
          { label: "Twitter:", href: "https://cards-dev.twitter.com/validator" },
          { label: "LinkedIn:", href: "https://www.linkedin.com/post-inspector/" },
        ],
      },
    ],
  },
];

const platforms = [
  {
    name: "Netlify",
    href: "/docs/astro/deployment/netlify",
    blurb:
      "Hosting and serverless backend services for static sites and web apps. Auto-deploys on push with a generous free tier.",
    tags: ["Git deploys", "Functions", "Forms"],
    initial: "N",
    accent: "from-teal-400 to-cyan-500",
  },
  {
    name: "Vercel",
    href: "/docs/astro/deployment/vercel",
    blurb:
      "Frontend cloud with a global Edge Network. Zero-config Astro deploys and a preview URL for every push.",
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
            <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Astro
            </Link>
            <span><LuChevronRight /></span>
            <span aria-current="page">Deployment</span>
          </nav>

          <h1 className="text-gray-900 text-3xl sm:text-5xl font-bold mb-5 tracking-tight">
            Deploy Your Astro Site
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Astro builds to fast, static HTML by default, so it runs on virtually
            any host. Pick a platform below for a step-by-step guide — or use the
            shared build settings to deploy anywhere.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Pre-deployment checklist */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-linear-to-r from-orange-400 to-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Before you deploy
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Pre-Deployment Checklist
            </h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Before deploying, make sure you&apos;ve configured the following.
          </p>

          <ol className="space-y-4">
            {checklist.map((item, i) => (
              <li
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-orange-50 text-orange-600 font-bold text-sm border border-orange-200">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    {item.desc && (
                      <p className="text-sm text-gray-600 leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    )}
                    {item.items && (
                      <ul className="mt-3 space-y-1.5">
                        {item.items.map((line) => (
                          <li
                            key={line.label}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <svg
                              className="w-4 h-4 mt-0.5 shrink-0 text-orange-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <span>
                              {line.code ? (
                                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">
                                  {line.label}
                                </code>
                              ) : (
                                <span className="font-semibold text-gray-700">{line.label}</span>
                              )}
                              {line.note && (
                                <span className="text-gray-500"> — {line.note}</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.links && (
                      <ul className="mt-3 space-y-1.5">
                        {item.links.map((link) => (
                          <li key={link.href} className="flex items-start gap-2 text-sm">
                            <span className="text-orange-400 mt-0.5">→</span>
                            <span>
                              <span className="font-semibold text-gray-700">{link.label}:</span>{" "}
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-600 font-medium hover:underline break-all"
                              >
                                {link.href}
                              </a>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.groups && (
                      <div className="mt-4 space-y-4">
                        {item.groups.map((group) => (
                          <div key={group.title}>
                            <h4 className="text-sm font-bold text-gray-700 mb-2">
                              {group.title}
                            </h4>
                            <ul className="space-y-1.5">
                              {group.lines.map((line) => (
                                <li
                                  key={line.label}
                                  className="flex items-start gap-2 text-sm text-gray-600"
                                >
                                  <span className="text-orange-400 mt-0.5">→</span>
                                  <span>
                                    {line.code ? (
                                      <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">
                                        {line.label}
                                      </code>
                                    ) : (
                                      <span>{line.label}</span>
                                    )}
                                    {line.href && (
                                      <>
                                        {" "}
                                        <a
                                          href={line.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-orange-600 font-medium hover:underline break-all"
                                        >
                                          {line.href}
                                        </a>
                                      </>
                                    )}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Choose a platform */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-linear-to-r from-orange-400 to-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Get started
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Choose a platform
            </h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Both options connect to your Git repository and redeploy
            automatically on every push.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {platforms.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:border-orange-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${p.accent} text-white font-extrabold text-lg shadow-sm`}
                  >
                    {p.initial}
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {p.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Recommended
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">{p.blurb}</p>

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

                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-orange-600">
                  Read the {p.name} guide
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Static vs SSR */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-linear-to-r from-orange-400 to-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Good to know
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Static or server-rendered?
            </h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Astro is static by default. If you need server-rendered routes or API
            endpoints, add the platform&apos;s adapter — each guide covers the
            exact steps.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-orange-600 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Static output</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The default. Astro prerenders every page to HTML at build time —
                deploy the{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">
                  dist
                </code>{" "}
                folder to any static host or CDN.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-50 text-teal-600 mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Server output (SSR)</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Add an adapter with{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">
                  npx astro add netlify
                </code>{" "}
                or{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">
                  vercel
                </code>{" "}
                to enable on-demand rendering and serverless functions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
