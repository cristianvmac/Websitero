"use client";

import { useState } from "react";
import {
  Gauge,
  Zap,
  Image as ImageIcon,
  Type,
  Paintbrush,
  CloudUpload,
  Sparkles,
  Feather,
  Rocket,
  ShieldCheck,
  Server,
  Info,
  Copy,
  Check,
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
    <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-lg shadow-gray-900/20 ring-1 ring-black/5">
      {/* Window header */}
      <div className="flex items-center justify-between border-b border-gray-700/60 bg-gray-800/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
         
          {filename && (
            <span className="ml-3 font-mono text-xs text-gray-400">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-gray-700/60 hover:text-gray-100"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Inline code chip — black text on a soft grey pill.
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-900 ring-1 ring-gray-200">
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
      <span className="text-xs font-semibold text-gray-900">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Interactive Lighthouse preview. Toggling between a heavy
// client-rendered SPA and an Eleventy static build shows why
// shipping less JavaScript moves the Performance score.
// ─────────────────────────────────────────────────────────
const SCENARIOS = {
  spa: {
    label: "Heavy client-rendered SPA",
    scores: { Performance: 54, Accessibility: 88, "Best Practices": 92, SEO: 90 },
  },
  eleventy: {
    label: "This Eleventy site (zero JS)",
    scores: { Performance: 100, Accessibility: 100, "Best Practices": 100, SEO: 100 },
  },
} as const;

function LighthousePreview() {
  const [mode, setMode] = useState<keyof typeof SCENARIOS>("eleventy");
  const active = SCENARIOS[mode];

  return (
    <div>
      {/* Toggle */}
      <div className="mb-4 inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
        <button
          onClick={() => setMode("spa")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            mode === "spa" ? "bg-amber-100 text-gray-900" : "text-gray-900 hover:bg-gray-50"
          }`}
        >
          Heavy SPA
        </button>
        <button
          onClick={() => setMode("eleventy")}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            mode === "eleventy" ? "bg-emerald-100 text-gray-900" : "text-gray-900 hover:bg-gray-50"
          }`}
        >
          Eleventy static
        </button>
      </div>

      {/* Scores */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap justify-around gap-4">
          {Object.entries(active.scores).map(([label, score]) => (
            <ScoreRing key={label} label={label} score={score} />
          ))}
        </div>
        <p className="mt-4 text-center text-sm font-medium text-gray-900">{active.label}</p>
      </div>

      <p className="mt-2 text-xs text-gray-900">
        Illustrative scores — but the gap is real: less JavaScript on the wire means a
        faster Largest Contentful Paint and a higher Performance score.
      </p>
    </div>
  );
}

// ── Step card scaffold ────────────────────────────────────
type Tone = "emerald" | "blue" | "purple" | "pink" | "cyan";

const TONE: Record<Tone, { tile: string; ring: string }> = {
  emerald: { tile: "from-emerald-500 to-teal-600", ring: "ring-emerald-100" },
  blue: { tile: "from-blue-500 to-indigo-600", ring: "ring-blue-100" },
  purple: { tile: "from-purple-500 to-fuchsia-600", ring: "ring-purple-100" },
  pink: { tile: "from-pink-500 to-rose-600", ring: "ring-pink-100" },
  cyan: { tile: "from-cyan-500 to-sky-600", ring: "ring-cyan-100" },
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
        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${TONE[tone].tile} text-white shadow-md ring-4 ${TONE[tone].ring}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
          Step {step}
        </span>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      {badge && (
        <span className="ml-auto rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
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
        highlight ? "border-emerald-200 bg-linear-to-b from-emerald-50/40 to-white" : "border-gray-200"
      }`}
    >
      {children}
    </div>
  );
}

// Hero stat pills.
const STATS = [
  { icon: Zap, label: "0 KB JS by default" },
  { icon: ImageIcon, label: "WebP via the {% image %} shortcode" },
  { icon: Gauge, label: "100 Lighthouse" },
];

export default function PageSpeed() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-emerald-50/30 to-gray-50 py-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
            Eleventy
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
            Extras
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
            Page Speed test
          </div>
        </div>
      
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-xl -translate-x-1/2 rounded-full bg-linear-to-br from-emerald-200/50 to-teal-200/50 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* ── Header ── */}
      

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Optimizing Page Speed
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-900">
          Eleventy renders your pages to pre-built static HTML with{" "}
          <span className="font-bold">no client-side JavaScript by default</span>, so this
          starter is fast before you do anything. The tips below cover how to keep it that
          way — and which pre-wired pieces of this starter do the heavy lifting for you.
        </p>

        {/* ── Stat pills ── */}
        <div className="mt-7 flex flex-wrap gap-3">
          {STATS.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm"
            >
              <Icon className="h-4 w-4 text-emerald-600" />
              {label}
            </span>
          ))}
        </div>

       

        {/* ── Step 1: Less JS ── */}
        <Card highlight>
          <StepHeader step={1} icon={Zap} tone="emerald" title="Ship as little JavaScript as possible" badge="Biggest win" />

          <p className="mt-5 text-gray-900">
            Eleventy compiles every template to plain HTML at build time and ships{" "}
            <span className="font-bold">no client-side JavaScript</span> on its own. There&apos;s
            no framework runtime to hydrate — so only add a{" "}
            <Code>{"<script>"}</Code> where you genuinely need interactivity, and keep it
            small and deferred.
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="src/index.html"
              code={`{# Pure static HTML — nothing ships to the browser #}
<section class="hero">
  <h1>Fast by default</h1>
</section>

{# Add JS only where you truly need it — deferred, scoped #}
<script type="module" src="/assets/js/counter.js"></script>`}
            />
          </div>

          {/* Live, interactive Lighthouse preview */}
          <p className="mt-6 mb-3 font-medium text-gray-900">
            The less you put on the wire, the higher your Lighthouse Performance score —
            toggle to compare:
          </p>
          <LighthousePreview />
        </Card>

        {/* ── Step 2: Images ── */}
        <Card>
          <StepHeader
            step={2}
            icon={ImageIcon}
            tone="blue"
            title={<>Use the built-in <span className="font-mono">{"{% image %}"}</span> shortcode</>}
          />

          <p className="mt-5 text-gray-900">
            This starter already wires up <Code>@11ty/eleventy-img</Code> in{" "}
            <Code>.eleventy.js</Code> as a Nunjucks shortcode — you don&apos;t need to install
            or configure anything. It generates responsive <Code>WebP</Code> + <Code>JPEG</Code>{" "}
            sizes, emits a full <Code>{"<picture>"}</Code>, and bakes in <Code>width</Code> /{" "}
            <Code>height</Code> so the layout never shifts (great for CLS).
          </p>

          <p className="mt-5 text-gray-900">
            Pass the source path, <Code>alt</Code> text, a CSS class, the{" "}
            <Code>loading</Code> attribute, and an optional <Code>sizes</Code> string:
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="src/index.html"
              code={`{# args: src, alt, class, loading, sizes (optional) #}
{% image "./src/assets/images/hero.jpg", "Our team at work", "hero__image", "eager" %}

{# below the fold? lazy-load it #}
{% image "./src/assets/images/gallery/skyscraper.jpg", "Project showcase", "gallery__image", "lazy" %}`}
            />
          </div>

          <p className="mt-5 text-gray-900">
            The shortcode is defined for you — this is what&apos;s already in{" "}
            <Code>.eleventy.js</Code>, so you only tweak it if you want different widths or
            output formats:
          </p>

          <div className="mt-5">
            <CodeBlock
              filename=".eleventy.js"
              code={`let metadata = await Image(\`\${src}\`, {
  widths: [200, 400, 850, 1920, 2500],
  formats: ["webp", "jpeg"],
  urlPath: "/images/",
  outputDir: "./public/images",
});

// registered lower down:
eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);`}
            />
          </div>

          {/* Info callout — the key Eleventy detail */}
          <div className="mt-5 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <p className="text-sm leading-relaxed text-gray-900">
              Always route images through <Code>{"{% image %}"}</Code> rather than a raw{" "}
              <Code>{"<img>"}</Code> — every call emits responsive WebP with dimensions baked
              in. The first <Code>loading</Code> argument lets you mark above-the-fold images{" "}
              <Code>eager</Code> and everything else <Code>lazy</Code>.
            </p>
          </div>
        </Card>

        {/* ── Step 3: Fonts ── */}
        <Card>
          <StepHeader step={3} icon={Type} tone="purple" title="Keep fonts self-hosted" />

          <p className="mt-5 text-gray-900">
            Third-party font requests add a render-blocking round-trip. This starter already
            ships Roboto locally in <Code>src/assets/fonts</Code> (as <Code>.woff2</Code> /{" "}
            <Code>.woff</Code>), and <Code>addPassthroughCopy(&quot;./src/assets&quot;)</Code>{" "}
            in <Code>.eleventy.js</Code> copies them straight to <Code>public/</Code>. To swap
            or add a family, drop the files in that folder and declare them with{" "}
            <Code>@font-face</Code> (use <Code>font-display: swap</Code>):
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="src/assets/css/root.css"
              code={`@font-face {
  font-family: "Roboto";
  src: url("/assets/fonts/roboto-v29-latin-regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}`}
            />
          </div>
                  
        </Card>

        {/* ── Step 4: CSS ── */}
        <Card>
          <StepHeader step={4} icon={Paintbrush} tone="pink" title="Let the LESS → PostCSS pipeline minify your CSS" />

          <p className="mt-5 text-gray-900">
            This starter compiles your styles itself. Write LESS in{" "}
            <Code>src/assets/less</Code>; the processor in{" "}
            <Code>src/config/processors/less.js</Code> renders it through PostCSS — running{" "}
            <Code>autoprefixer</Code> on every build and <Code>cssnano</Code> minification when{" "}
            <Code>ELEVENTY_ENV=PROD</Code> — and writes the result to{" "}
            <Code>public/assets/css</Code>:
          </p>

          <div className="mt-5">
            <CodeBlock
              filename="src/config/processors/less.js"
              code={`const isProduction = process.env.ELEVENTY_ENV === "PROD";

// autoprefixer always; cssnano only minifies in production
const processor = postcss([
  autoprefixer(),
  ...(isProduction ? [cssnano({ preset: "default" })] : []),
]);`}
            />
          </div>

        </Card>     

        {/* ── Audit callout ── */}
        <div className="mt-8 flex gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
          <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <h3 className="font-bold text-gray-900">Measure, don&apos;t guess</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-900">
              After each change, audit the deployed URL with{" "}
              <a
                href="https://pagespeed.web.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 underline decoration-emerald-400 underline-offset-2 hover:text-emerald-900"
              >
                Google PageSpeed Insights
              </a>{" "}
              or the Lighthouse tab in Chrome DevTools. Test the production build — the dev
              server is unoptimized and will always look slower.
            </p>
          </div>
        </div>

        {/* Subtle footer flourish */}
        <p className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-gray-900">
          <Feather className="h-4 w-4 text-emerald-500" />
          Light pages, happy users.
        </p>
      </div>
    </section>
  );
}
