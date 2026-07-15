"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Copy, Check } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative ml-auto shrink-0 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400" />
      )}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-700 px-2 py-1 text-xs font-medium text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

function CodeBlock({ label, children }: { label?: string; children: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-800/80 shadow-lg shadow-gray-900/10 ring-1 ring-black/5">
      <div className="flex items-center gap-2 bg-gray-800 px-4 py-2.5">
        {label && (
          <span className="ml-2 text-xs font-mono text-gray-400">{label}</span>
        )}
        <CopyButton text={children} />
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
        {children}
      </pre>
    </div>
  );
}

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
        <span className="h-px w-8 bg-blue-50" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
        {title}
      </h2>
    </div>
  );
}

export default function VercelDeployment() {
  return (
    <section className="min-h-full p-12">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-3xl ml-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
            <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Eleventy
            </Link>
            <span><LuChevronRight /></span>
            <Link href="/docs/eleventy/deployment" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Deployment
            </Link>
            <span><LuChevronRight /></span>
            <span aria-current="page">Vercel</span>
          </nav>

          <h1 className="text-gray-900 text-4xl sm:text-5xl font-extrabold mb-5 tracking-tight">
            Deploying an Eleventy Site to Vercel
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Vercel is a platform for static sites and frontend frameworks, built
            to integrate with your headless content, commerce, or database.
            This kit deploys to Vercel with near-zero configuration — it builds to
            plain static HTML that Vercel serves from its global Edge Network.
          </p>

        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Build settings at a glance */}
        <div className="mb-16">
          <SectionHeading eyebrow="At a glance" title="Build settings" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            This kit builds with{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              npm run build
            </code>{" "}
            and outputs your production site to a{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              public
            </code>{" "}
            folder. Vercel auto-detects Eleventy when you import the project, but
            it defaults to{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              _site
            </code>{" "}
            — so set these two values explicitly to match the kit:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-3 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <p className="text-xs font-bold uppercase tracking-wider">
                  Build command
                </p>
              </div>
              <p className="font-mono text-lg text-gray-900">npm run build</p>
            </div>
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-3 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                <p className="text-xs font-bold uppercase tracking-wider">
                  Output directory
                </p>
              </div>
              <p className="font-mono text-lg text-gray-900">public</p>
            </div>
          </div>
        </div>

        {/* Choose how to deploy */}
        <div className="mb-16">
          <SectionHeading eyebrow="Step 1" title="Choose how to deploy" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Pick whichever workflow fits you — both produce the same result.
          </p>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Method A — Git / UI */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-100 text-gray-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12m0 0a3 3 0 103 3m-3-3a3 3 0 013 3m6-15a3 3 0 11-3 3m3-3a3 3 0 00-3 3m0 0v6a6 6 0 01-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Deploy from Git
                  </h3>
                  <span className="text-xs font-semibold text-gray-600">
                    Easiest · auto-deploys on push
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Connect a repo from GitHub, GitLab, or BitBucket. Vercel detects
                Eleventy and pre-fills the build settings, then ships a preview
                for every push.
              </p>

              <ol className="space-y-3 mt-auto">
                {[
                  <>Click <strong>Add New… → Project</strong> in your Vercel dashboard.</>,
                  <>Import the Git repository you want to deploy.</>,
                  <>Vercel detects <strong>Eleventy</strong>. Set the build command to <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded font-mono text-xs">npm run build</code> and the output directory to <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded font-mono text-xs">public</code>.</>,
                  <>Click <strong>Deploy</strong> — your site goes live in seconds.</>,
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-blue-100 text-gray-700 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Method B — CLI */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-gray-700">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Deploy with the CLI
                  </h3>
                  <span className="text-xs font-semibold text-gray-500">
                    For terminal-first workflows
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Install the Vercel CLI, then run{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">
                  vercel
                </code>{" "}
                from your project root. Add{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">
                  --prod
                </code>{" "}
                to push straight to production.
              </p>

              <div className="mt-auto">
                <CodeBlock label="terminal">
{`npm install --global vercel
vercel login
vercel`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </div>

        {/* Static by design */}
        <div className="mb-16">
          <SectionHeading eyebrow="Good to know" title="Static by design" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Eleventy is a static site generator — every page is prerendered to
            HTML at build time. There is no server runtime or adapter to
            configure: Vercel serves the contents of your{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              public
            </code>{" "}
            folder from its Edge Network, which is what makes Eleventy sites so
            fast and cheap to host.
          </p>

          <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-gray-800 max-w-2xl">
            Need dynamic behavior — form handling, API calls, or auth? You don&apos;t
            give up your static build. Layer it on with{" "}
            <span className="font-semibold">Vercel Functions</span>, covered below.
          </div>
        </div>

        {/* Vercel Functions */}
        <div className="mb-16">
          <SectionHeading eyebrow="Serverless" title="Adding Vercel Functions" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Although Eleventy ships static HTML, you can still add serverless
            backend logic. Create an{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              api
            </code>{" "}
            folder at the root of your project and Vercel deploys each file inside
            it as an on-demand function:
          </p>

          <CodeBlock label="api/hello.js">
{`export default function handler(req, res) {
  res.status(200).send("Hello from Eleventy on Vercel!");
}`}
          </CodeBlock>

          <p className="text-gray-600 mt-6 max-w-2xl">
            That endpoint is reachable at{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              /api/hello
            </code>
            . Make sure Eleventy doesn&apos;t process the{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              api
            </code>{" "}
            folder — add it to your{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              .eleventyignore
            </code>{" "}
            so Vercel handles it instead.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                title: "API endpoints",
                desc: "Files in the api/ folder run as serverless functions.",
                path: "M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
              },
              {
                title: "Edge runtime",
                desc: "Opt a function into the Edge to run close to your users.",
                path: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
              },
              {
                title: "Redirects & rewrites",
                desc: "Define rules in a vercel.json file at your project root.",
                path: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-gray-600 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Node version note */}
        <div className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6 mb-16">
          <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-blue-50 text-gray-700 shadow-sm">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94l-7.5 12.99A1.5 1.5 0 004.14 19.5h15.72a1.5 1.5 0 001.3-2.25l-7.5-12.99a1.5 1.5 0 00-2.6 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              A note on Node.js versions
            </h2>
            <p className="text-gray-800/90">
              Eleventy requires a modern Node.js release. If your build needs a
              specific version, set it in{" "}
              <span className="font-semibold">
                Project Settings → General → Node.js Version
              </span>{" "}
              on Vercel, or pin it with an{" "}
              <code className="bg-blue-100 text-gray-900 px-2 py-0.5 rounded font-mono text-sm">
                engines
              </code>{" "}
              field in your{" "}
              <code className="bg-blue-100 text-gray-900 px-2 py-0.5 rounded font-mono text-sm">
                package.json
              </code>{" "}
              (for example{" "}
              <code className="bg-blue-100 text-gray-900 px-2 py-0.5 rounded font-mono text-sm">
                &quot;node&quot;: &quot;22.x&quot;
              </code>
              ).
            </p>
          </div>
        </div>

        {/* Resources / Learn more */}
        <div>
          <SectionHeading eyebrow="Keep going" title="Resources & next steps" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Dive deeper with the official documentation from Eleventy and Vercel.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Eleventy deployment guide",
                desc: "The official Eleventy guide to deploying your built site.",
                href: "https://www.11ty.dev/docs/deployment/",
              },
              {
                title: "Vercel Functions",
                desc: "Build serverless API endpoints alongside your static site.",
                href: "https://vercel.com/docs/functions",
              },
              {
                title: "Project configuration",
                desc: "Full vercel.json reference: redirects, rewrites, and headers.",
                href: "https://vercel.com/docs/projects/project-configuration",
              },
              {
                title: "Vercel docs",
                desc: "Functions, redirects, environment variables, and more.",
                href: "https://vercel.com/docs",
              },
            ].map((res) => (
              <a
                key={res.href}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200"
              >
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-gray-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {res.desc}
                  </p>
                </div>
                <svg className="w-5 h-5 shrink-0 text-gray-300 transition-colors group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
