import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import {
  Sparkles,
  Star,
  PenTool,
  Gauge,
  Lightbulb,
  Check,
  ArrowRight,
} from "lucide-react";

type Section = {
  step: number;
  title: string;
  icon: typeof Star;
  accent: {
    iconWrap: string;
    rule: string;
  };
};

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] text-gray-800">
      {children}
    </code>
  );
}

function CodeBlock({ label, code }: { label?: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-950/40 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
        {label && (
          <span className="ml-2 font-mono text-xs text-gray-400">{label}</span>
        )}
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className: string;
}) {
  return (
    <Link
      href={href}
      className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

const favicon: Section = {
  step: 1,
  title: "Favicon",
  icon: Star,
  accent: {
    iconWrap: "bg-amber-50 text-amber-600 border-amber-200",
    rule: "bg-amber-500",
  },
};

const logo: Section = {
  step: 2,
  title: "SVG Logo",
  icon: PenTool,
  accent: {
    iconWrap: "bg-violet-50 text-violet-600 border-violet-200",
    rule: "bg-violet-500",
  },
};

const speed: Section = {
  step: 3,
  title: "Page Speed",
  icon: Gauge,
  accent: {
    iconWrap: "bg-emerald-50 text-emerald-600 border-emerald-200",
    rule: "bg-emerald-500",
  },
};

const quickTips = [
  "Swap the kit's favicon set in src/assets/favicons/ — it's already linked in base.html.",
  "Use SVG logos for sharp, scalable, styleable graphics.",
  "Static HTML with zero JS by default means the fastest load times.",
  "Audit the production build with PageSpeed Insights — the dev server always looks slower.",
];

function SectionHeader({ section }: { section: Section }) {
  const Icon = section.icon;
  return (
    <div className="mb-5 flex items-center gap-4">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${section.accent.iconWrap}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Step {section.step}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
      </div>
    </div>
  );
}

export default function Extras() {
  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Eleventy
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Extras</span>
        </nav>

        <h1 className="mb-4 text-5xl font-bold text-gray-900">
          Extra Tips for Your Eleventy Site
        </h1>
        <p className="text-xl leading-relaxed text-gray-600">
          Small but important touches that make this CodeStitch starter look
          professional, perform well, and feel polished. Each section links to a
          full step-by-step guide.
        </p>
      </div>

      <div className="space-y-6">
        {/* Favicon */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <span
            className={`absolute inset-y-0 left-0 w-1 ${favicon.accent.rule}`}
          />
          <SectionHeader section={favicon} />
          <p className="mb-4 text-gray-700">
            A favicon is the small icon in browser tabs, bookmarks, and
            home-screen shortcuts. This starter already ships a full favicon set
            in <InlineCode>src/assets/favicons/</InlineCode> and links it in{" "}
            <InlineCode>base.html</InlineCode> — so making it yours is mostly
            just swapping files:
          </p>
          <ul className="mb-5 space-y-2 pl-1 text-gray-700">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <span>
                Generate a complete set from a square source image (512×512 or
                larger, or an SVG) with a tool like realfavicongenerator.net or
                favicon.io.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <span>
                Drop the generated files into{" "}
                <InlineCode>src/assets/favicons/</InlineCode>, keeping the same
                filenames so the existing links keep working.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <span>
                Nothing else to configure — the whole{" "}
                <InlineCode>src/assets</InlineCode> folder is already
                passthrough-copied, and the links already live in{" "}
                <InlineCode>{"<head>"}</InlineCode>:
              </span>
            </li>
          </ul>
          <CodeBlock
            label="src/_includes/layouts/base.html"
            code={`<link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg" />
<link rel="icon" type="image/png" sizes="96x96" href="/assets/favicons/favicon-96x96.png" />
<link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png" />
<link rel="manifest" href="/assets/favicons/site.webmanifest" />`}
          />
          <p className="mt-4 text-gray-700">
            Because{" "}
            <InlineCode>addPassthroughCopy(&quot;./src/assets&quot;)</InlineCode>{" "}
            copies the folder with its path intact,{" "}
            <InlineCode>src/assets/favicons/favicon.svg</InlineCode> is served at{" "}
            <InlineCode>/assets/favicons/favicon.svg</InlineCode> in the{" "}
            <InlineCode>public</InlineCode> build — and a single SVG can even
            recolor itself for dark mode.
          </p>
          <SectionLink
            href="/docs/eleventy/extras/favicon"
            label="Read the full favicon guide"
            className="text-amber-700 hover:text-amber-800"
          />
        </section>

        {/* Logo SVG */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <span className={`absolute inset-y-0 left-0 w-1 ${logo.accent.rule}`} />
          <SectionHeader section={logo} />
          <p className="mb-4 text-gray-700">
            SVG logos are scalable and lightweight. You can:
          </p>
          <ul className="mb-5 space-y-2 pl-1 text-gray-700">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              <span>
                Add the SVG as an image file and copy it using{" "}
                <InlineCode>addPassthroughCopy</InlineCode>:
              </span>
            </li>
          </ul>
          <CodeBlock
            label="layout"
            code={`<img src="/assets/logo.svg" alt="Site Logo" width="120">`}
          />
          <p className="my-4 text-gray-700">
            Or inline the SVG directly in your layout for styling and animations:
          </p>
          <CodeBlock
            label="inline svg"
            code={`<svg width="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="currentColor" />
</svg>`}
          />
          <SectionLink
            href="/docs/eleventy/extras/logo-svg"
            label="Read the full SVG logo guide"
            className="text-violet-700 hover:text-violet-800"
          />
        </section>

        {/* PageSpeed */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <span className={`absolute inset-y-0 left-0 w-1 ${speed.accent.rule}`} />
          <SectionHeader section={speed} />
          <p className="mb-4 text-gray-700">
            Eleventy renders your pages to static HTML with no client-side
            JavaScript by default, so this starter is fast before you touch
            anything. The kit also pre-wires the pieces that keep it that way:
          </p>
          <ul className="mb-5 space-y-2 pl-1 text-gray-700">
            {[
              <>
                Ships <InlineCode>0 KB</InlineCode> of JavaScript by default —
                add a small, deferred <InlineCode>{"<script>"}</InlineCode> only
                where you truly need interactivity.
              </>,
              <>
                Route every image through the built-in{" "}
                <InlineCode>{"{% image %}"}</InlineCode> shortcode (powered by{" "}
                <InlineCode>@11ty/eleventy-img</InlineCode>) for responsive WebP
                with dimensions baked in.
              </>,
              <>
                Fonts are self-hosted in{" "}
                <InlineCode>src/assets/fonts</InlineCode> — no render-blocking
                third-party requests.
              </>,
              <>
                Your LESS is compiled through PostCSS, with{" "}
                <InlineCode>autoprefixer</InlineCode> on every build and{" "}
                <InlineCode>cssnano</InlineCode> minification in production.
              </>,
            ].map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700">
            Audit the production build with Google PageSpeed Insights or the
            Lighthouse tab in Chrome DevTools — the dev server is unoptimized and
            always looks slower.
          </p>
          <SectionLink
            href="/docs/eleventy/extras/page-speed-test"
            label="Read the full page speed guide"
            className="text-emerald-700 hover:text-emerald-800"
          />
        </section>
      </div>

      {/* Quick Tips */}
      <div className="mt-12 rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 p-8">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
          <Lightbulb className="h-6 w-6 text-amber-500" />
          Quick Tips
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickTips.map((tip) => (
            <div
              key={tip}
              className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm text-gray-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
