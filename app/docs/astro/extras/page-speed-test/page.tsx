"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import {
  Gauge,
  Zap,
  Image as ImageIcon,
  Type,
  Layers,
  Feather,
  Rocket,
  Info,
  Copy,
  Check,
  X,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// Reusable code block with window chrome + copy-to-clipboard.
// Mirrors the CodeBlock used on the other "Extras" docs so
// every page in this section shares the same look & feel.
// ─────────────────────────────────────────────────────────
function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-900/20 ring-1 ring-black/5">
      {/* Window header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 bg-slate-800/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="ml-3 font-mono text-xs text-slate-400">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-700/60 hover:text-slate-100"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Inline code chip — black text on a soft grey pill.
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-900 ring-1 ring-slate-200">
      {children}
    </code>
  );
}

// ─────────────────────────────────────────────────────────
// A single animated Lighthouse-style score ring. The ring's
// colour encodes the score (red / amber / green) the way the
// real Lighthouse report does — that's data, not body copy.
// ─────────────────────────────────────────────────────────
function ScoreRing({ label, score }: { label: string; score: number }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 90 ? "#16a34a" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="7" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-lg font-bold tabular-nums"
          style={{ color }}
        >
          {score}
        </span>
      </div>
      <span className="text-xs font-semibold text-slate-900">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Interactive Lighthouse preview. Toggling between a heavy
// client-rendered SPA and an Astro static build shows why
// shipping less JavaScript moves the Performance score.
// ─────────────────────────────────────────────────────────
const SCENARIOS = {
  spa: {
    label: "Heavy client-rendered SPA",
    scores: { Performance: 54, Accessibility: 88, "Best Practices": 92, SEO: 90 },
  },
  astro: {
    label: "This Astro starter (zero JS)",
    scores: { Performance: 100, Accessibility: 100, "Best Practices": 100, SEO: 100 },
  },
} as const;

function LighthousePreview() {
  const [mode, setMode] = useState<keyof typeof SCENARIOS>("astro");
  const active = SCENARIOS[mode];

  return (
    <div>
      {/* Toggle */}
      <div className="mb-4 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        <button
          onClick={() => setMode("spa")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            mode === "spa" ? "bg-blue-100 text-slate-900" : "text-slate-900 hover:bg-slate-50"
          }`}
        >
          Heavy SPA
        </button>
        <button
          onClick={() => setMode("astro")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            mode === "astro" ? "bg-blue-100 text-slate-900" : "text-slate-900 hover:bg-slate-50"
          }`}
        >
          Astro static
        </button>
      </div>

      {/* Scores */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap justify-around gap-4">
          {Object.entries(active.scores).map(([label, score]) => (
            <ScoreRing key={label} label={label} score={score} />
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-medium text-slate-900">{active.label}</p>
      </div>

      <p className="mt-2 text-xs text-slate-900">
        Illustrative scores — but the gap is real: less JavaScript on the wire means a
        faster Largest Contentful Paint and a higher Performance score.
      </p>
    </div>
  );
}

// ── Step card scaffold ────────────────────────────────────
type Tone = "emerald" | "blue" | "purple" | "pink" | "cyan";

const TONE: Record<Tone, { tile: string; ring: string }> = {
  emerald: { tile: "from-blue-50 to-blue-50", ring: "ring-blue-100" },
  blue: { tile: "from-blue-50 to-blue-50", ring: "ring-blue-100" },
  purple: { tile: "from-blue-50 to-blue-50", ring: "ring-blue-100" },
  pink: { tile: "from-blue-50 to-blue-50", ring: "ring-blue-100" },
  cyan: { tile: "from-blue-50 to-blue-50", ring: "ring-blue-100" },
};

function StepHeader({
  step,
  icon: Icon,
  title,
  tone,
  badge,
}: {
  step: number;
  icon: typeof Zap;
  title: React.ReactNode;
  tone: Tone;
  badge?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${TONE[tone].tile} text-slate-700 shadow-md ring-4 ${TONE[tone].ring}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-900">
          Step {step}
        </span>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      </div>
      {badge && (
        <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-slate-700">
          {badge}
        </span>
      )}
    </div>
  );
}

function Card({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`mt-8 rounded-3xl border bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg ${
        highlight ? "border-blue-200 bg-blue-50/40" : "border-slate-200"
      }`}
    >
      {children}
    </div>
  );
}

// Hero stat pills.
const STATS = [
  { icon: Zap, label: "0 KB JS by default" },
  { icon: ImageIcon, label: "WebP + AVIF images" },
  { icon: Gauge, label: "100 Lighthouse" },
];

export default function PageSpeed() {
  return (
    <section className="relative overflow-hidden min-h-full p-12">
      {/* Decorative background glow */}

      <div className="relative max-w-3xl ml-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Astro
          </Link>
          <span><LuChevronRight /></span>
          <Link href="/docs/astro/extras" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Extras
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Page Speed Test</span>
        </nav>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Optimizing Page Speed
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-900">
          Astro ships your pages as pre-rendered static HTML with{" "}
          <span className="font-bold">zero JavaScript by default</span>, so this starter is
          fast before you do anything. These are the levers that move your Lighthouse{" "}
          <span className="font-bold">Performance</span> score the most.
        </p>

        {/* ── Stat pills ── */}
        <div className="mt-7 flex flex-wrap gap-3">
          {STATS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-sm"
            >
              <Icon className="h-4 w-4 text-slate-600" />
              {label}
            </span>
          ))}
        </div>

        {/* ── Step 1: Islands ── */}
        <Card highlight>
          <StepHeader step={1} icon={Zap} tone="emerald" title="Ship as little JavaScript as possible" badge="Biggest win" />

          <p className="mt-5 text-slate-900">
            Every <Code>.astro</Code> component renders to plain HTML at build time and
            sends <span className="font-bold">no client-side JavaScript</span>. You only opt
            into hydration where you genuinely need interactivity, using a{" "}
            <Code>client:*</Code> directive — and even then, only that one component ships
            JS (an <em>island</em>), not the whole page.
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="src/pages/index.astro"
              code={`---
import Counter from "../components/Counter.jsx";
---
<!-- Static HTML: no JavaScript shipped -->
<Hero />

<!-- Hydrated only once it scrolls into view -->
<Counter client:visible />`}
            />
          </div>

          {/* Live, interactive Lighthouse preview */}
          <p className="mt-6 mb-3 font-medium text-slate-900">
            The less you hydrate, the higher your Lighthouse Performance score — toggle to
            compare:
          </p>
          <LighthousePreview />
        </Card>

        {/* ── Step 2: Images ── */}
        <Card>
          <StepHeader
            step={2}
            icon={ImageIcon}
            tone="blue"
            title="Serve optimized, responsive images"
            badge="Fewer bytes"
          />

          <p className="mt-5 text-slate-900">
            Images are usually the heaviest thing on a page, so this is where the
            Performance score is won or lost. Astro optimizes any image you store in{" "}
            <Code>src/assets/</Code> and render with the built-in <Code>{"<Image />"}</Code>{" "}
            or <Code>{"<Picture />"}</Code> components — files dropped in{" "}
            <Code>public/</Code> are served untouched.
          </p>

          <p className="mt-5 text-slate-900">
            The starter sets <Code>layout: &apos;constrained&apos;</Code> as the default in{" "}
            <Code>astro.config.mjs</Code>, so every image is responsive with no per-image
            work:
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="astro.config.mjs"
              code={`export default defineConfig({
  image: {
    layout: "constrained",
  },
});`}
            />
          </div>

          <ul className="mt-5 space-y-2.5 text-sm text-slate-900">
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                <Code>srcset</Code> and <Code>sizes</Code> are generated automatically from
                each image&apos;s dimensions, so the browser downloads a right-sized file
                instead of a full-resolution one — a big mobile win.
              </span>
            </li>
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                <Code>width</Code> / <Code>height</Code> are optional for images in{" "}
                <Code>src/</Code> (Astro infers them) and reserve the space up front, so the
                layout never jumps — that protects your{" "}
                <span className="font-semibold">CLS</span>.
              </span>
            </li>
          </ul>

          <p className="mt-6 text-slate-900">
            Reach for <Code>{"<Picture />"}</Code> when you want modern formats with a
            fallback — it emits a real <Code>{"<picture>"}</Code> element so the browser
            picks the smallest format it supports:
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="src/pages/index.astro"
              code={`---
import { Picture } from "astro:assets";
import heroImage from "@assets/images/hero.jpg";
---

<Picture
  src={heroImage}
  alt="Description"
  width={400}
  formats={['avif', 'webp']}
  priority
  pictureAttributes={{ class: "cs-picture" }}
/>`}
            />
          </div>

          <p className="mt-6 mb-3 font-medium text-slate-900">Key properties</p>
          <ul className="space-y-2.5 text-sm text-slate-900">
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                <Code>formats</Code> — output formats, e.g.{" "}
                <Code>{"['avif', 'webp']"}</Code>. AVIF and WebP are far smaller than
                JPG/PNG, so fewer bytes reach the browser.
              </span>
            </li>
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                <Code>priority</Code> — automatically sets the optimal <Code>loading</Code>,{" "}
                <Code>decoding</Code>, and <Code>fetchpriority</Code> for above-the-fold
                images (use it on your LCP image).
              </span>
            </li>
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                <Code>width</Code> / <Code>height</Code> — the dimensions to render at.
              </span>
            </li>
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                <Code>layout</Code> — defaults to <Code>&apos;constrained&apos;</Code>{" "}
                (responsive); other options are <Code>&apos;fixed&apos;</Code> and{" "}
                <Code>&apos;full-width&apos;</Code>.
              </span>
            </li>
          </ul>

          {/* CSPicture subsection — art direction */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
            <h3 className="flex flex-wrap items-center gap-2 font-bold text-slate-900">
              <Layers className="h-5 w-5 shrink-0 text-slate-600" />
              Art-direct with <span className="font-mono">{"<CSPicture />"}</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-900">
              Many CodeStitch blocks use a <Code>{"<picture>"}</Code> with multiple{" "}
              <Code>srcset</Code> sources to swap a different crop — or a different image —
              between mobile and desktop. The kit&apos;s custom{" "}
              <Code>{"<CSPicture />"}</Code> (in <Code>src/components/TemplateComponents</Code>)
              replicates that with <Code>getImage()</Code>, serving a smaller asset to
              phones and <span className="font-bold">converting your .jpg files to .webp</span>{" "}
              — less data on the device that needs it most.
            </p>

            <div className="mt-4">
              <CodeBlock
                filename="src/pages/index.astro"
                code={`---
// Import the component and all the images you want to use with it
import CSPicture from "@components/TemplateComponents/CSPicture.astro";
import mobileImage from "@assets/images/construction-m.jpg";
import desktopImage from "@assets/images/cabinets2.jpg";
import fallbackImage from "@assets/images/cabinets2.jpg";
---

<CSPicture
  mobileImgUrl={mobileImage}
  mobileMediaWidth="600px"
  desktopImgUrl={desktopImage}
  desktopMediaWidth="601px"
  fallbackImgUrl={fallbackImage}
  alt=""
/>`}
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-900">
              It accepts three images — mobile, desktop, and a fallback — which can be
              different sizes, crops, or completely different assets, plus optional{" "}
              <Code>mobileMediaWidth</Code> / <Code>desktopMediaWidth</Code> to tune the
              breakpoint per usage.
            </p>
          </div>

          {/* Native picture vs. Astro Picture callout */}
          <div className="mt-5 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
            <p className="text-sm leading-relaxed text-slate-900">
              Not every native <Code>{"<picture>"}</Code> from a CodeStitch block is swapped
              for Astro&apos;s component — it&apos;s your call. The stock markup already
              performs well but means resizing and reformatting assets by hand;{" "}
              Astro&apos;s <Code>{"<Picture />"}</Code> has to be written in manually, yet it
              processes and optimizes assets for you. Read more in the{" "}
              <a
                href="https://docs.astro.build/en/guides/images/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-700 underline decoration-blue-400 underline-offset-2 hover:text-slate-900"
              >
                Astro images docs
              </a>
              .
            </p>
          </div>
        </Card>

        {/* ── Step 3: Preload the hero (LCP) image ── */}
        <Card>
          <StepHeader
            step={3}
            icon={Rocket}
            tone="pink"
            title="Preload your hero (LCP) image"
          />

          <p className="mt-5 text-slate-900">
            The big image above the fold is almost always your{" "}
            <span className="font-bold">Largest Contentful Paint</span> element — the metric
            that weighs most on the Performance score. Pass a <Code>heroImage</Code> to{" "}
            <Code>BaseLayout</Code> and the kit optimizes it for social sharing{" "}
            <span className="font-bold">(1200×600)</span>, adds it to your Open Graph tags,
            and — via the <Code>Meta</Code> component — preloads it with{" "}
            <Code>fetchpriority=&quot;high&quot;</Code> so it loads before anything else.
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="src/pages/index.astro"
              code={`---
import heroImage from "@assets/images/hero.jpg";
import { getImage } from "astro:assets";
const optimizedImage = await getImage({ src: heroImage, format: "webp" });
---

<BaseLayout heroImage={optimizedImage}>
  <Hero />
</BaseLayout>`}
            />
          </div>

          <p className="mt-5 text-slate-900">
            …which produces this in the rendered <Code>{"<head>"}</Code>:
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="Rendered HTML"
              code={`<link
  rel="preload"
  as="image"
  href="/optimized-hero.webp"
  fetchpriority="high"
/>`}
            />
          </div>

          {/* Do / don't preload */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                <Check className="h-4 w-4" /> Preload these
              </p>
              <ul className="space-y-2 text-sm text-slate-900">
                <li>Hero / banner images visible immediately on load.</li>
                <li>Critical brand assets (logos, etc.).</li>
                <li>Above-the-fold content.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
                <X className="h-4 w-4" /> Don&apos;t preload
              </p>
              <ul className="space-y-2 text-sm text-slate-900">
                <li>Below-the-fold images — lazy-load them instead.</li>
                <li>Many images — keep it to 1–2 critical resources per page.</li>
                <li>Small icons or decorative images.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* ── Step 4: Fonts ── */}
        <Card>
          <StepHeader step={4} icon={Type} tone="purple" title="Self-host your fonts" />

          <p className="mt-5 text-slate-900">
            Loading fonts from Google&apos;s servers adds a render-blocking, third-party
            round-trip on every visit. This starter avoids it by{" "}
            <span className="font-bold">self-hosting Roboto</span> — the font files live in{" "}
            <Code>public/assets/fonts/</Code> and are declared with <Code>@font-face</Code>{" "}
            in <Code>src/styles/root.css</Code>:
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="src/styles/root.css"
              code={`/* roboto-regular - latin */
@font-face {
  font-style: normal;
  font-family: "Roboto";
  font-weight: 400;
  font-display: swap;
  src: local(""),
    url("/assets/fonts/roboto-v29-latin-regular.woff2") format("woff2"),
    url("/assets/fonts/roboto-v29-latin-regular.woff") format("woff");
}`}
            />
          </div>

          <p className="mt-5 text-slate-900">
            Base elements then use it, falling back to a system font while it loads:
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="src/styles/root.css"
              code={`body,
html {
  font-family: "Roboto", Arial, sans-serif;
}`}
            />
          </div>

          {/* Why this approach is fast */}
          <ul className="mt-6 space-y-2.5 text-sm text-slate-900">
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                <span className="font-semibold">No third-party request</span> — fonts ship
                from your own domain, so there&apos;s no extra DNS lookup and connection to
                Google blocking the render (and nothing handed off for privacy).
              </span>
            </li>
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                <Code>.woff2</Code> first with a <Code>.woff</Code> fallback — woff2 is the
                smallest modern format and is supported almost everywhere.
              </span>
            </li>
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                <Code>font-display: swap</Code> shows your text immediately in the fallback
                font, then swaps in Roboto once it arrives — no invisible text (FOIT).
              </span>
            </li>
            <li className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <span>
                Only the weights you actually use ship — <Code>400</Code>, <Code>700</Code>,
                and <Code>900</Code> — three files, not the whole Roboto family.
              </span>
            </li>
          </ul>

          <p className="mt-5 text-slate-900">
            To swap in a different font, drop its <Code>.woff2</Code> / <Code>.woff</Code>{" "}
            files into <Code>public/assets/fonts/</Code>, add a matching{" "}
            <Code>@font-face</Code> block, and update the <Code>font-family</Code> — keeping
            the weight list lean.
          </p>
        </Card>

        {/* ── Audit callout — measure after each change ── */}
        <div className="mt-8 flex gap-3 rounded-3xl border border-blue-200 bg-blue-50 p-5">
          <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
          <div>
            <h3 className="font-bold text-slate-900">Measure, don&apos;t guess</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-900">
              After each change, audit the deployed URL with{" "}
              <a
                href="https://pagespeed.web.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-700 underline decoration-blue-400 underline-offset-2 hover:text-slate-900"
              >
                Google PageSpeed Insights
              </a>{" "}
              or the Lighthouse tab in Chrome DevTools. Test the production build — the dev
              server is unoptimized and will always look slower.
            </p>
          </div>
        </div>

        {/* Subtle footer flourish */}
        <p className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-slate-900">
          <Feather className="h-4 w-4 text-slate-500" />
          Light pages, happy users.
        </p>
      </div>
    </section>
  );
}
