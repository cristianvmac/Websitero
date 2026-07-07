import {
  Sparkles,
  Star,
  PenTool,
  Gauge,
  Lightbulb,
  Check,
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
  "Always include a favicon for branding.",
  "Use SVG logos for sharp, scalable graphics.",
  "Static HTML + optimized assets = fastest load times.",
  "Check performance after deployment — even small tweaks help.",
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
    <div className="max-w-5xl px-6 py-4">
      {/* Hero */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-orange-200 bg-linear-to-r from-orange-50 to-yellow-50 px-3 py-1.5 text-sm font-bold text-orange-700">
            Astro
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-blue-200 bg-linear-to-r from-blue-50 to-purple-50 px-3 py-1.5 text-sm font-bold text-blue-700">
            Extras
          </div>
        </div>

        <h1 className="mb-4 text-5xl font-bold text-gray-900">
          Extra Tips for Your Astro Site
        </h1>
        <p className="text-xl leading-relaxed text-gray-600">
          Small but important enhancements to make your Astro site look
          professional, perform well, and feel polished.
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
            A favicon improves brand recognition in browser tabs, bookmarks, and
            home-screen shortcuts. In Astro it&apos;s a two-step process:
          </p>
          <ul className="mb-5 space-y-2 pl-1 text-gray-700">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <span>
                Drop your favicon files into{" "}
                <InlineCode>public/</InlineCode> — Astro serves everything there
                at the site root as-is, with no passthrough or copy config.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              <span>
                Link them in your layout&apos;s{" "}
                <InlineCode>{"<head>"}</InlineCode> so every page picks them up:
              </span>
            </li>
          </ul>
          <CodeBlock
            label="src/layouts/BaseLayout.astro"
            code={`<link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg" />
<link rel="icon" type="image/x-icon" href="/assets/favicons/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon.png" />
<link rel="manifest" href="/assets/favicons/site.webmanifest" />`}
          />
          <p className="mt-4 text-gray-700">
            See the{" "}
            <a
              href="/docs/astro/extras/favicon"
              className="font-medium text-amber-700 underline decoration-amber-300 underline-offset-2 hover:text-amber-800"
            >
              Favicon guide
            </a>{" "}
            for generating a full icon set and troubleshooting caching.
          </p>
        </section>

        {/* SVG Logo */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <span className={`absolute inset-y-0 left-0 w-1 ${logo.accent.rule}`} />
          <SectionHeader section={logo} />
          <p className="mb-4 text-gray-700">
            SVG logos stay crisp at any size and weigh next to nothing. This
            Astro starter already ships its logo through{" "}
            <InlineCode>astro-icon</InlineCode>, but you can also drop one
            straight into <InlineCode>public/</InlineCode>.
          </p>
          <ul className="mb-5 space-y-2 pl-1 text-gray-700">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              <span>
                Add your SVG to <InlineCode>src/icons/</InlineCode> — the
                filename becomes the icon name — and render it with the{" "}
                <InlineCode>{"<Icon>"}</InlineCode> component:
              </span>
            </li>
          </ul>
          <CodeBlock
            label="src/components/Header/StaticHeader.astro"
            code={`---
import { Icon } from "astro-icon/components";
---
<a href="/" class="cs-logo" aria-label="Return to home page">
  <Icon name="logo-black" />
</a>`}
          />
          <p className="mt-4 text-gray-700">
            Because <InlineCode>astro-icon</InlineCode> inlines the SVG, you can
            recolor it with CSS (use <InlineCode>fill: currentColor</InlineCode>{" "}
            to follow your theme). Full details in the{" "}
            <a
              href="/docs/astro/extras/logo-svg"
              className="font-medium text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-800"
            >
              SVG Logo guide
            </a>
            .
          </p>
        </section>

        {/* PageSpeed */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <span className={`absolute inset-y-0 left-0 w-1 ${speed.accent.rule}`} />
          <SectionHeader section={speed} />
          <p className="mb-4 text-gray-700">
            Astro sites are fast by default — it ships zero JavaScript unless you
            opt in. To optimize further:
          </p>
          <ul className="mb-5 space-y-2 pl-1 text-gray-700">
            {[
              <>
                Optimize images with Astro&apos;s built-in{" "}
                <InlineCode>{"<Image>"}</InlineCode> component from{" "}
                <InlineCode>astro:assets</InlineCode>.
              </>,
              "Minify CSS & JS, keep scripts minimal, and prefer islands for interactivity.",
              "Deploy via CDN for global low-latency delivery.",
              "Inline critical CSS and preload fonts for faster first paint.",
            ].map((tip, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-700">
            Audit your site using tools like Google PageSpeed Insights to spot
            remaining optimizations.
          </p>
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
  );
}
