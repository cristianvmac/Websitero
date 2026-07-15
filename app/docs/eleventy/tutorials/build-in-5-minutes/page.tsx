"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Rocket, Copy, Check, Clock, ArrowRight, Code, Eye, Settings, FileCode } from "lucide-react";

export default function BuildMinutes() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      title: "Install the Template",
      description: "Scaffold your Eleventy project from the starter template in one command",
      time: "1 min",
      icon: Code,
    },
    {
      title: "Customize Your Site Info",
      description: "Update your business name, colors, and navigation data",
      time: "2 min",
      icon: Settings,
    },
    {
      title: "Edit the Landing and Interior Pages",
      description: "Modify the sections in the includes folder",
      time: "",
      icon: FileCode,
    },
    {
      title: "Preview & Deploy",
      description: "Run the dev server, verify your page, and ship it",
      time: "1 min",
      icon: Rocket,
    },
  ];

  return (
    <div className="min-h-full p-12">
    <div className="max-w-3xl ml-6">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
        <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
          Eleventy
        </Link>
        <span><LuChevronRight /></span>
        <Link href="/docs/eleventy/tutorials" className="rounded-full py-1 hover:text-slate-600 hover:underline">
          Tutorials
        </Link>
        <span><LuChevronRight /></span>
        <span aria-current="page">Build in 5 Minutes</span>
      </nav>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-slate-900 mb-4 leading-tight">
          Build your website in 5 minutes
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          This Eleventy starter ships pre-built sections, a Decap CMS-powered blog,
          LESS styling, and automatic image optimization via the Sharp plugin — all organized inside
          src/ using the includes-and-sections pattern.
        </p>
      </div>

      {/* Before You Start */}
      <div className="mb-10 p-4 bg-blue-50 border border-slate-200 rounded-xl">
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Before You Start
        </h3>
        <p className="text-slate-800 mb-4">
          Make sure that you have you&apos;ve read the initial setup guide.
        </p>
        <Link
          href="/docs/eleventy/quick-setup"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-slate-700 font-semibold rounded-lg transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          See Quick Setup
        </Link>
      </div>

      {/* Steps Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">What We&apos;ll Build</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-xl p-5 border border-slate-200"
              >
                <div className="absolute -top-3 -left-3 w-9 h-9 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="flex items-center gap-2 mb-3 mt-1">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Icon className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {step.time}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Step 1 ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            1
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-900">Install the Template</h2>
              <span className="text-sm font-bold text-slate-600 bg-blue-50 px-3 py-1 rounded-full">1 minute</span>
            </div>
            <p className="text-slate-600">
              Pull the project straight from the GitHub template using degit.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Scaffold the project</h3>
            <p className="text-slate-600 mb-3 text-sm">
              This copies the starter template into a new folder with a clean git history — no extra setup needed.
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-100 relative">
              <code>npx degit cristianvmac/Eleventy-Starter my-eleventy-site</code>
              <button
                onClick={() => copyToClipboard("npx degit cristianvmac/Eleventy-Starter my-eleventy-site", 1)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 1 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Enter the project and start the dev server</h3>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-100 relative">
              <pre className="whitespace-pre-wrap">{`cd my-eleventy-site
npm install
npm start`}</pre>
              <button
                onClick={() => copyToClipboard("cd my-eleventy-site\nnpm install\nnpm start", 2)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-slate-900 font-medium mb-1 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Your site is live locally
            </p>
            <p className="text-sm text-slate-800">
              Open{" "}
              <code className="bg-blue-100 px-2 py-0.5 rounded font-mono">http://localhost:8080</code>{" "}
              — you should see the full demo landing page from the template.
            </p>
          </div>
        </div>
      </div>

      {/* ── Step 2 ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            2
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-900">Customize Your Site Info</h2>
              <span className="text-sm font-bold text-slate-600 bg-blue-50 px-3 py-1 rounded-full">2 minutes</span>
            </div>
            <p className="text-slate-600">
              Two files control all global site data — your business info and your navigation links.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* client.js */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Edit <code className="bg-slate-100 px-2 py-0.5 rounded text-sm">src/_data/client.js</code>
            </h3>
            <p className="text-slate-600 mb-3 text-sm">
              This is the single source of truth for your brand — name, address, SEO metadata, and social links. Replace the placeholder values:
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative max-h-72 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{`// src/_data/client.js
module.exports = {
  name: "Your Business Name",
  email: "hello@yourdomain.com",
  phoneForTel: "555-555-5555",
  phoneFormatted: "(555) 555-5555",
  address: {
    lineOne: "123 Main Street",
    lineTwo: "",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
    mapLink: "https://maps.google.com/?q=...",
  },
  socials: {
    facebook: "https://facebook.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
  },
  // Used for SEO canonical tags and the sitemap
  domain: "https://yourdomain.com",
  isProduction: process.env.ELEVENTY_ENV === "PROD",
};`}</pre>
              <button
                onClick={() => copyToClipboard(`// src/_data/client.js
module.exports = {
  name: "Your Business Name",
  email: "hello@yourdomain.com",
  phoneForTel: "555-555-5555",
  phoneFormatted: "(555) 555-5555",
  address: {
    lineOne: "123 Main Street",
    lineTwo: "",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
    mapLink: "https://maps.google.com/?q=...",
  },
  socials: {
    facebook: "https://facebook.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
  },
  domain: "https://yourdomain.com",
  isProduction: process.env.ELEVENTY_ENV === "PROD",
};`, 3)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-slate-900 font-medium mb-1">Also update your navigation in <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">src/_includes/sections/header.html</code></p>
            <p className="text-sm text-slate-800">
              Edit the anchor links to match your pages. The active link is highlighted automatically by comparing each <code className="bg-blue-100 px-1.5 py-0.5 rounded">href</code> against <code className="bg-blue-100 px-1.5 py-0.5 rounded">page.url</code>.
            </p>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-100 mt-3 relative">
              <code>{`<li class="cs-li"><a href="/about/" class="cs-li-link">About</a></li>`}</code>
              <button
                onClick={() => copyToClipboard(`<li class="cs-li"><a href="/about/" class="cs-li-link">About</a></li>`, 5)}
                className="absolute right-3 top-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              >
                {copiedStep === 5 ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Step 3 ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            3
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-900">Edit the Landing Page and Interior Pages</h2>
              <span className="text-sm font-bold text-slate-600 bg-blue-50 px-3 py-1 rounded-full">1 minute</span>
            </div>
            <p className="text-slate-600">
              The landing page lives at <code className="bg-slate-100 px-2 py-0.5 rounded text-sm">src/index.html</code> and the interior pages live in <code className="bg-slate-100 px-2 py-0.5 rounded text-sm">src/content/pages/</code>. It&apos;s composed of pre-built sections you can swap or edit.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Page structure at a glance</h3>
            <p className="text-slate-600 mb-3 text-sm">
              Open <code className="bg-slate-100 px-2 py-0.5 rounded">src/index.html</code>.
            </p>
            <p className="text-slate-600 mb-3 text-sm">
              See {" "}
                <Link
                  href="./landing-page/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 underline font-semibold"
                >
                  Landing page
                </Link>{" "}
            </p>


          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">Editing a page</h3>
            <p className="text-slate-600 mb-3 text-sm">
              Each page is its own <code className="bg-slate-100 px-2 py-0.5 rounded">.html</code> file inside <code className="bg-slate-100 px-2 py-0.5 rounded">src/content/pages/</code>.
              Open any section and edit the text and image paths directly in the markup — no config files needed:
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative max-h-72 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{`<!-- src/_includes/sections/hero.html -->
<section id="hero">
  <div class="cs-container">
    <div class="cs-content">
      <h1 class="cs-title">Your Headline Here</h1>
      <p class="cs-text">
        A short description of what you do and who you help.
      </p>
      <a href="/contact/" class="cs-button-solid">Get Started</a>
    </div>
    <picture class="cs-picture">
      <img src="/assets/images/hero.jpg" alt="Hero image"
           loading="lazy" decoding="async" width="600" height="400" />
    </picture>
  </div>
</section>`}</pre>
              <button
                onClick={() => copyToClipboard(`<!-- src/_includes/sections/hero.html -->
<section id="hero">
  <div class="cs-container">
    <div class="cs-content">
      <h1 class="cs-title">Your Headline Here</h1>
      <p class="cs-text">
        A short description of what you do and who you help.
      </p>
      <a href="/contact/" class="cs-button-solid">Get Started</a>
    </div>
    <picture class="cs-picture">
      <img src="/assets/images/hero.jpg" alt="Hero image"
           loading="lazy" decoding="async" width="600" height="400" />
    </picture>
  </div>
</section>`, 7)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 7 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-slate-900 font-medium mb-1">Replace placeholder images</p>
            <p className="text-sm text-slate-800">
              Drop your own images into <code className="bg-blue-100 px-1.5 py-0.5 rounded">src/assets/images/</code> and update the paths in the section files. Eleventy automatically optimizes them with the Sharp image plugin.
            </p>
          </div>
        </div>
      </div>

      {/* ── Step 4 ── */}
      <div className="mb-10 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            4
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-900">Build &amp; Deploy</h2>
              <span className="text-sm font-bold text-slate-600 bg-blue-50 px-3 py-1 rounded-full">1 minute</span>
            </div>
            <p className="text-slate-600">
              Run a production build and deploy to any static host in seconds.
              See   {" "}
              <Link
                href="/docs/eleventy/deployment"
                className="text-slate-600 underline font-semibold"
              >
                Deployment Guide
              </Link>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Build for production</h3>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-100 relative">
              <code>npm run build</code>
              <button
                onClick={() => copyToClipboard("npm run build", 8)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 8 ? <Check className="w-4 h-4 text-slate-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Output goes to <code className="bg-slate-100 px-1.5 py-0.5 rounded">public/</code>. Preview it locally with <code className="bg-slate-100 px-1.5 py-0.5 rounded">npm start</code>.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3">Deploy to your platform (recommend)</h3>
            <div className="grid md:grid-cols-2 gap-10 ml-20 mr-20">
              {[
                { name: "Netlify", desc: "Connect your repo — netlify.toml is already configured", href: "https://netlify.com" },
                { name: "Vercel", desc: "Import your GitHub repo — zero config needed", href: "https://vercel.com" },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 border rounded-lg transition text-center group ${platform.name === "Netlify" ? "border-blue-400 bg-blue-50 hover:border-blue-500" : "border-slate-200 hover:border-blue-400 hover:shadow-md"}`}
                >
                  <div className={`font-bold mb-1 transition-colors ${platform.name === "Netlify" ? "text-slate-700 group-hover:text-slate-900" : "text-slate-900 group-hover:text-slate-600"}`}>
                    {platform.name}
                  </div>
                  <p className="text-xs text-slate-600">{platform.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-base text-slate-500">
              Congrats!
        </p>
      </div>
    </div>
    </div>
  );
}
