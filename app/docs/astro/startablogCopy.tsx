"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Newspaper, Copy, Check, Clock, ArrowRight, Settings, Palette,
  Server, Database, FileText, Image as ImageIcon, Tag, Eye,
  Rocket, Star, Info, type LucideIcon,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   NOTE: gradient classes use `bg-gradient-to-*` (Tailwind v3).
   On Tailwind v4, find-replace `bg-gradient-to-` → `bg-linear-to-`.
   ──────────────────────────────────────────────────────────── */

/* ── Reusable primitives ─────────────────────────────────── */

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800">
      {children}
    </code>
  );
}

function CodeBlock({ code, copyText }: { code: string; copyText?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText ?? code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
      <pre className="overflow-x-auto whitespace-pre-wrap pr-10">{code}</pre>
      <button
        aria-label="Copy code"
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-200"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

const CALLOUT_TONES = {
  amber: "bg-amber-50 border-amber-200 text-amber-900",
  blue: "bg-blue-50 border-blue-200 text-blue-900",
  green: "bg-emerald-50 border-emerald-200 text-emerald-900",
} as const;

function Callout({
  tone, icon: Icon, title, children,
}: {
  tone: keyof typeof CALLOUT_TONES;
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-4 ${CALLOUT_TONES[tone]}`}>
      <p className="mb-1 flex items-center gap-2 font-semibold">
        <Icon className="h-4 w-4 shrink-0" />
        {title}
      </p>
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
}

function SectionCard({
  icon: Icon, accent, title, subtitle, children,
}: {
  icon: LucideIcon;
  accent: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <header className="mb-6 flex items-start gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
        </div>
      </header>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 underline underline-offset-2">
      {children}
    </a>
  );
}

/* ── Data ────────────────────────────────────────────────── */

const STEPS = [
  { icon: Settings, title: "Configure", desc: "Set up collections in public/admin/config.yml" },
  { icon: FileText, title: "Write", desc: "Posts are markdown / MDX in src/content/blog" },
  { icon: ImageIcon, title: "Upload", desc: "Media lands in src/assets/images/blog" },
  { icon: Eye, title: "Publish", desc: "Manage everything at the /admin dashboard" },
];

const CONTENT_FACTS = [
  { icon: FileText, title: "Where content lives", body: <>Markdown files in <Code>src/content/blog</Code>. Use <Code>.mdx</Code> for JSX components.</> },
  { icon: Tag, title: "Frontmatter", body: <>Title, description, and tags live in the frontmatter. The permalink matches the file name.</> },
  { icon: ImageIcon, title: "Uploaded media", body: <>Media-library uploads are stored in <Code>src/assets/images/blog</Code> so Astro can optimize them.</> },
];

const FRONTMATTER = `---
title: "My First Post"
description: "A short summary used for SEO and previews"
draft: false
# Add "featured" to surface this post in the featured list
tags: ["news", "featured"]
---

Write your post content here in **markdown**.
You can also use .mdx to drop in JSX components.`;

const COLLECTION_BENEFITS = [
  "Organize your documents",
  "Validate your frontmatter",
  "Automatic TypeScript type-safety for all your content",
  "Use Astro's <Image /> and <Picture /> components with CMS-uploaded images",
];

/* ── Page ────────────────────────────────────────────────── */

export default function StartBlog() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-slate-700">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-slate-400">
        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-600">Astro</span>
        <span>/</span>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-600">Tutorials</span>
        <span>/</span>
        <span className="text-slate-600">Start a Blog</span>
      </nav>

      {/* Hero */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Content Management &amp; Blog
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          This starter ships with a fully working, CMS-powered blog out of the box, managed through{" "}
          <Ext href="https://decapcms.org/docs/basic-steps/">Decap CMS</Ext> — the same system your
          clients can use to manage their site without your involvement.
        </p>
      </header>

      {/* Before you start */}
      <div className="mb-10">
        <Callout tone="amber" icon={Clock} title="Before you start">
          <p className="mb-3">
            Make sure you&apos;ve scaffolded the template and have the dev server running. If not,
            start with the quick build tutorial.
          </p>
          <Link
            href="/docs/astro/tutorials/build-in-5-minutes"
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Build in 5 minutes <ArrowRight className="h-4 w-4" />
          </Link>
        </Callout>
      </div>

      {/* How it works overview */}
      <div className="mb-12">
        <h2 className="mb-5 text-2xl font-bold text-slate-900">How the blog works</h2>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="relative rounded-xl border border-slate-200 bg-white p-5">
              <span className="absolute -left-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <div className="mb-3 inline-flex rounded-lg bg-emerald-50 p-2">
                <Icon className="h-4 w-4 text-emerald-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-xs text-slate-500">{desc}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-8">
        {/* Configuring the CMS */}
        <SectionCard
          icon={Settings}
          accent="bg-blue-600"
          title="Configuring the CMS"
          subtitle="Ready out of the box — reshape it to fit your project."
        >
          <p className="text-sm">
            In <Code>public/admin/</Code> you&apos;ll find a <Code>config.yml</Code> file with the
            blog configuration. Customize it using{" "}
            <Ext href="https://decapcms.org/docs/configuration-options/">Decap&apos;s docs</Ext>.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {CONTENT_FACTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-slate-200 p-4">
                <Icon className="mb-2 h-5 w-5 text-blue-600" />
                <p className="mb-1 text-sm font-bold text-slate-900">{title}</p>
                <p className="text-xs leading-relaxed text-slate-500">{body}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">Example post frontmatter</h3>
            <CodeBlock code={FRONTMATTER} />
          </div>

          <Callout tone="green" icon={Star} title="Featured posts">
            Add <Code>featured</Code> to the comma-separated list of tags to surface a post as
            featured in the frontend.
          </Callout>

          <Callout tone="blue" icon={Eye} title="Accessing the dashboard">
            On the deployed site, go to <Code>/admin</Code> and enter your{" "}
            <Ext href="https://decapbridge.com">decapbridge</Ext> credentials. Create, update, and
            delete all content from there.
          </Callout>
        </SectionCard>

        {/* Preview pane */}
        <SectionCard
          icon={Palette}
          accent="bg-purple-600"
          title="Styling the Decap Preview Pane"
          subtitle="Make admin previews resemble the live site."
        >
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="font-bold text-purple-600">1.</span>
              <span>Preview styles live in <Code>public/admin/decap-preview-styles.css</Code>.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-purple-600">2.</span>
              <span>
                The preview script in <Code>src/pages/admin.astro</Code> pulls collection props,
                builds the DOM elements, and registers them and the styles for the preview panel.
              </span>
            </li>
          </ul>
          <p className="text-sm">
            Edit those two files to match your branding. See{" "}
            <Ext href="https://decapcms.org/docs/customization/">Decap&apos;s customization docs</Ext>.
          </p>
          <Callout tone="amber" icon={Info} title="Notes">
            <ul className="list-inside list-disc space-y-1">
              <li>The style sheet must be a CSS file.</li>
              <li>The style sheet does not support nested CSS.</li>
            </ul>
          </Callout>
        </SectionCard>

        {/* Local backend */}
        <SectionCard
          icon={Server}
          accent="bg-indigo-600"
          title="Adding a Local Backend"
          subtitle="Make content changes from the dashboard during development."
        >
          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">
              1. Enable the local backend in <Code>public/admin/config.yml</Code>
            </h3>
            <CodeBlock code="+ local_backend: true" copyText="local_backend: true" />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">2. Install the helper packages</h3>
            <CodeBlock code={`npm install npm-run-all --save-dev\nnpm install decap-server`} />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">
              3. Update the scripts in <Code>package.json</Code>
            </h3>
            <CodeBlock
              code={`"scripts": {
  "astro": "astro dev",
  "decap": "npx decap-server",
  "dev": "npm-run-all --parallel astro decap"
}`}
            />
          </div>

          <Callout tone="green" icon={Eye} title="Run it">
            <Code>npm run dev</Code> spins up a CMS proxy on <Code>localhost:8081</Code>. Visit{" "}
            <Code>http://localhost:4321/admin</Code> — no login needed while running locally.
          </Callout>

          <Callout tone="amber" icon={Info} title="Watch for port conflicts">
            If <Code>localhost:8080</Code> is already taken, you may hit errors — keep an eye out.
          </Callout>
        </SectionCard>

        {/* Content collections */}
        <SectionCard
          icon={Database}
          accent="bg-teal-600"
          title="Astro Content Collections"
          subtitle="Configure in src/content/config.ts to supercharge your content."
        >
          <p className="text-sm">
            Not required to run the blog, but Content Collections supercharge it — already configured
            here, and usable for the Portfolio or Gallery too. They also work on content not created
            via the CMS.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {COLLECTION_BENEFITS.map((b) => (
              <div key={b} className="flex items-start gap-2.5 rounded-xl border border-teal-100 bg-teal-50 p-3.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                <span className="text-sm text-slate-700">{b}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Next steps */}
      <footer className="mt-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
        <div className="mb-3 flex items-center gap-3">
          <Newspaper className="h-7 w-7" />
          <h2 className="text-2xl font-bold">Your blog is ready</h2>
        </div>
        <p className="mb-6 text-slate-300">
          A CMS-powered blog your clients can manage themselves — markdown content, auto-optimized
          media, all editable from <Code>/admin</Code>.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="https://decapcms.org/docs/basic-steps/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold transition-colors hover:bg-blue-700"
          >
            <Database className="h-4 w-4" /> Decap CMS Docs
          </Link>
          <Link
            href="/docs/astro/deployment"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            <Rocket className="h-4 w-4" /> Deployment Guide
          </Link>
        </div>
      </footer>
    </div>
  );
}