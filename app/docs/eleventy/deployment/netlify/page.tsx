"use client";

import { useState } from "react";
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

export default function NetlifyDeployment() {
  return (
    <section className="bg-gray-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-bold border border-orange-200">
              Eleventy
            </span>
            <span className="text-xl font-semibold text-gray-300">/</span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-200">
              Deployment
            </span>
            <span className="text-xl font-semibold text-gray-300">/</span>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-200">
              Netlify
            </span>
          </div>

          <h1 className="text-gray-900 text-4xl sm:text-5xl font-extrabold mb-5 tracking-tight">
            Deploying an Eleventy Site to Netlify
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            When you&apos;re happy with your website, deploy it to your hosting
            provider of choice. This kit is built for Netlify and ships with a{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              netlify.toml
            </code>{" "}
            file, so the build is already configured — connect your repo and
            click deploy. This guide walks you through the deploy and setting up
            the CMS in just a few minutes.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">
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
            folder. This kit&apos;s{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              netlify.toml
            </code>{" "}
            already sets these for you — they&apos;re shown here so you know what
            Netlify is running under the hood:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Build command */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-400 to-cyan-400" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Build command
                    </p>
                    <p className="text-sm text-gray-700">Compiles your site</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg bg-gray-900 px-4 py-3">
                  <code className="flex items-center gap-2 font-mono text-sm text-gray-100 overflow-x-auto">
                    <span className="text-emerald-400 select-none">$</span>
                    npm run build
                  </code>
                  <CopyButton text="npm run build" />
                </div>
              </div>
            </div>

            {/* Publish directory */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-400 to-cyan-400" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Publish directory
                    </p>
                    <p className="text-sm text-gray-700">Where the site lands</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg bg-gray-900 px-4 py-3">
                  <code className="flex items-center gap-2 font-mono text-sm text-gray-100 overflow-x-auto">
                    <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    public
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deploy from GitHub */}
        <div className="mb-16">
          <SectionHeading eyebrow="Step 1" title="Deploy from GitHub" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            The recommended workflow connects your GitHub repository to Netlify
            so every push redeploys automatically. From start to live site:
          </p>

          <ol className="space-y-4">
            {[
              <>
                <strong>Sign in to or create an account</strong> with Netlify at{" "}
                <a
                  href="https://app.netlify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  app.netlify.com
                </a>
                .
              </>,
              <>
                Click <strong>Sites</strong> in the left-hand navigation, then{" "}
                <strong>Add new site</strong>, and choose{" "}
                <strong>Import an existing project</strong>.
              </>,
              <>
                Choose to deploy your project with <strong>GitHub</strong> and
                follow the steps to link Netlify and GitHub.
              </>,
              <>Find your project in the list of repositories.</>,
              <>
                Everything should be already configured, thanks to the{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-sm">
                  netlify.toml
                </code>{" "}
                file. Click <strong>Deploy [PROJECT NAME]</strong>.
              </>,
              <>
                Check that your site deploys without error. The site should be
                live — but we still need to set up the CMS (see below).
              </>,
            ].map((text, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed pt-1">{text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Configuration */}
        <div className="mb-16">
          <SectionHeading eyebrow="Step 2" title="Configure with netlify.toml" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            This kit already includes a{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              netlify.toml
            </code>{" "}
            at the project root, which is why Netlify detects the build settings
            automatically. It looks like this — version-controlled and
            repeatable across every deploy:
          </p>
          <CodeBlock label="netlify.toml">
{`[build]
  command = "npm run build"
  publish = "public/"

# Caches processed images and remote assets between builds
[[plugins]]
  package = "netlify-plugin-cache"
  [plugins.inputs]
    paths = ["public/assets/images", ".cache"]`}
          </CodeBlock>
        </div>

        {/* Set up the CMS */}
        <div className="mb-16">
          <SectionHeading eyebrow="Step 3" title="Set up the CMS" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Your site is live, but the content editor still needs an
            authentication provider so you can log in and manage content.
          </p>

          <div className="flex items-start gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-6">
            <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-rose-500 text-white shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94l-7.5 12.99A1.5 1.5 0 004.14 19.5h15.72a1.5 1.5 0 001.3-2.25l-7.5-12.99a1.5 1.5 0 00-2.6 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-rose-900 mb-1">
                Important — authentication has changed
              </h3>
              <p className="text-rose-800/90 leading-relaxed">
                This kit now uses{" "}
                <a
                  href="https://decapbridge.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:text-rose-900"
                >
                  decapbridge.com
                </a>{" "}
                for its authentication solution. If you still use Netlify
                Identity, please refer to the Netlify Identity branch of the
                starter repository instead.
              </p>
            </div>
          </div>
        </div>

        {/* Migrating from Netlify Identity */}
        <div className="mb-16">
          <SectionHeading eyebrow="Migration" title="Updating from Netlify Identity to decapbridge" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            If you are upgrading an existing kit from Netlify Identity to
            decapbridge.com, follow these steps:
          </p>

          <ol className="space-y-4 mb-6">
            {[
              <>Log in to your Netlify account.</>,
              <>
                Navigate to <strong>Projects / Your-Site</strong>.
              </>,
              <>
                Navigate to{" "}
                <strong>Project Configuration / Identity</strong> and delete the
                Netlify Identity instance.{" "}
                <span className="text-amber-700 font-semibold">
                  This deletes your users as well
                </span>{" "}
                — they&apos;ll have to be re-created in decapbridge later.
              </>,
              <>
                Delete the Netlify Identity script in{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-sm">
                  src/index.html
                </code>{" "}
                and in{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-sm">
                  src/admin/index.html
                </code>
                .
              </>,
            ].map((text, i) => (
              <li
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed pt-1">{text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Static by design */}
        <div className="mb-16">
          <SectionHeading eyebrow="Good to know" title="Static by design" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Eleventy is a static site generator — every page is prerendered to
            HTML at build time. There is no server runtime or adapter to
            configure: Netlify simply serves the contents of your{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              public
            </code>{" "}
            folder from its CDN, which is what makes Eleventy sites so fast and
            cheap to host.
          </p>

          <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-800 max-w-2xl">
            Need dynamic behavior — form handling, API calls, or auth? You don&apos;t
            give up your static build. Layer it on with{" "}
            <span className="font-semibold">Netlify Functions</span> and{" "}
            <span className="font-semibold">Netlify Forms</span>, covered below.
          </div>
        </div>

        {/* Netlify Functions */}
        <div className="mb-16">
          <SectionHeading eyebrow="Serverless" title="Adding Netlify Functions" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Although Eleventy ships static HTML, you can still add serverless
            backend logic. Drop a file into a{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              netlify/functions
            </code>{" "}
            folder and Netlify deploys it as an on-demand API endpoint — point to
            it from your config:
          </p>

          <CodeBlock label="netlify.toml">
{`[build]
  command = "npm run build"
  publish = "public/"
  functions = "netlify/functions"`}
          </CodeBlock>

          <p className="text-gray-600 mt-6 mb-3 max-w-2xl">
            Each function is reachable at{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              /.netlify/functions/&lt;name&gt;
            </code>
            :
          </p>
          <CodeBlock label="netlify/functions/hello.js">
{`export default async (req, context) => {
  return new Response("Hello from Eleventy on Netlify!");
};`}
          </CodeBlock>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                title: "API endpoints",
                desc: "Files in netlify/functions run as serverless functions.",
                path: "M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z",
              },
              {
                title: "Netlify Forms",
                desc: "Add a netlify attribute to a static HTML form to capture submissions.",
                path: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              },
              {
                title: "Redirects & headers",
                desc: "Define rules in netlify.toml or a _redirects file in your output.",
                path: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-50 text-teal-600 mb-3">
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
        <div className="flex items-start gap-4 rounded-2xl border border-amber-200 bg-linear-to-r from-amber-50 to-yellow-50 p-6 mb-16">
          <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-amber-400 text-white shadow-sm">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94l-7.5 12.99A1.5 1.5 0 004.14 19.5h15.72a1.5 1.5 0 001.3-2.25l-7.5-12.99a1.5 1.5 0 00-2.6 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-amber-900 mb-1">
              A note on Node.js versions
            </h2>
            <p className="text-amber-800/90">
              Eleventy requires a modern Node.js release. If your build fails on
              Netlify&apos;s older build image, set the version your project needs.
              Add an{" "}
              <code className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono text-sm">
                .nvmrc
              </code>{" "}
              file (for example{" "}
              <code className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono text-sm">
                22.12.0
              </code>
              ) to your project root, or define a{" "}
              <code className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono text-sm">
                NODE_VERSION
              </code>{" "}
              environment variable in the Netlify dashboard.
            </p>
          </div>
        </div>

        {/* Resources / Learn more */}
        <div>
          <SectionHeading eyebrow="Keep going" title="Resources & next steps" />
          <p className="text-gray-600 mb-6 max-w-2xl">
            Dive deeper with the official documentation from Eleventy and Netlify.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Eleventy deployment guide",
                desc: "The official Eleventy guide to deploying your built site.",
                href: "https://www.11ty.dev/docs/deployment/",
              },
              {
                title: "Netlify Functions",
                desc: "Build serverless API endpoints alongside your static site.",
                href: "https://docs.netlify.com/functions/overview/",
              },
              {
                title: "File-based configuration",
                desc: "Full netlify.toml reference: builds, redirects, and headers.",
                href: "https://docs.netlify.com/configure-builds/file-based-configuration/",
              },
              {
                title: "Netlify docs",
                desc: "Forms, redirects, environment variables, and more.",
                href: "https://docs.netlify.com/",
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
                  <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {res.desc}
                  </p>
                </div>
                <svg className="w-5 h-5 shrink-0 text-gray-300 transition-colors group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
