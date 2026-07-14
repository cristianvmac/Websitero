"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Rocket, Copy, Check, Star,Sparkles, Clock, ArrowRight, Code, Eye, Settings, FileCode } from "lucide-react";

/*REVIEW AND CHANGE THE CODE  IN Sections*/
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
      description: "Clone your Astro project from the starter template in one command",
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
      description: "Modify the components in pages folder",
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
    <div className="max-w-3xl mx-auto">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
        <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
          Astro
        </Link>
        <span><LuChevronRight /></span>
        <Link href="/docs/astro/tutorials" className="rounded-full py-1 hover:text-slate-600 hover:underline">
          Tutorials
        </Link>
        <span><LuChevronRight /></span>
        <span aria-current="page">Build in 5 Minutes</span>
      </nav>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Build your website in 5 minutes
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
           This Astro starter ships pre-built components, a Decap CMS-powered blog, dark mode, 
           View Transitions, and automatic image optimization — all organized inside src/components/ 
           using the component-per-folder pattern.
        </p>
      </div>

      {/* Before You Start */}
      <div className="mb-10 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
        <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Before You Start
        </h3>
        <p className="text-yellow-800 mb-4">
          Make sure that you have you&apos;ve read the initial setup guide.
        </p>
        <Link
          href="/docs/astro/quick-setup"
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          See Quick Setup
        </Link>
      </div>

      {/* Steps Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We&apos;ll Build</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-linear-to-br from-white to-gray-50 rounded-xl p-5 border-2 border-gray-200"
              >
                <div className="absolute -top-3 -left-3 w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="flex items-center gap-2 mb-3 mt-1">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {step.time}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Step 1 ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            1
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">Install the Template</h2>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">1 minute</span>
            </div>
            <p className="text-gray-600">
              Clone the project straight from the GitHub template using the Astro CLI.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Run the create command</h3>
            <p className="text-gray-600 mb-3 text-sm">
              This pulls the template, sets up the folder structure, and installs dependencies automatically.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 relative">
                <code>npm create astro@latest -- --template cristianvmac/Astro-Starter</code>
                <button
                  onClick={() => copyToClipboard("npm create astro@latest -- --template cristianvmac/Astro-Starter", 1)}
              >
                {copiedStep === 1 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Enter the project and start the dev server</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 relative">
              <pre className="whitespace-pre-wrap">{`cd my-astro-site
npm install
npm run dev`}</pre>
              <button
                onClick={() => copyToClipboard("cd my-astro-site\nnpm install\nnpm run dev", 2)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-900 font-medium mb-1 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Your site is live locally
            </p>
            <p className="text-sm text-green-800">
              Open{" "}
              <code className="bg-green-100 px-2 py-0.5 rounded font-mono">http://localhost:4321</code>{" "}
              — you should see the full demo landing page from the template.
            </p>
          </div>
        </div>
      </div>

      {/* ── Step 2 ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            2
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">Customize Your Site Info</h2>
              <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">2 minutes</span>
            </div>
            <p className="text-gray-600">
              Two files control all global site data — your business info and your navigation links.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* client.ts */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Edit <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">src/data/client.ts</code>
            </h3>
            <p className="text-gray-600 mb-3 text-sm">
              This is the single source of truth for your brand — name, address, SEO metadata, and social links. Replace the placeholder values:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative max-h-72 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{`// src/data/client.ts
export const client = {
  name: "Your Business Name",
  email: "hello@yourdomain.com",
  phoneForTel: "555-555-5555",
  phoneFormatted: "(555) 555-5555",
  address: {
    lineOne: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
    mapLink: "https://maps.google.com/?q=...",
  },
  socials: {
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
  },
  // Used for SEO <title> and Open Graph tags
  domain: "https://yourdomain.com",
};`}</pre>
              <button
                onClick={() => copyToClipboard(`// src/data/client.ts
export const client = {
  name: "Your Business Name",
  email: "hello@yourdomain.com",
  phoneForTel: "555-555-5555",
  phoneFormatted: "(555) 555-5555",
  address: {
    lineOne: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
    mapLink: "https://maps.google.com/?q=...",
  },
  socials: {
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourhandle",
  },
  domain: "https://yourdomain.com",
};`, 3)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-blue-900 font-medium mb-1">Also update <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">astro.config.mjs</code></p>
            <p className="text-sm text-blue-800">
              Set the <code className="bg-blue-100 px-1.5 py-0.5 rounded">site</code> field to your production URL so Astro generates correct canonical tags and sitemaps.
            </p>
            <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-100 mt-3 relative">
              <code>{`site: "https://yourdomain.com"`}</code>
              <button
                onClick={() => copyToClipboard(`site: "https://yourdomain.com"`, 5)}
                className="absolute right-3 top-2 p-1.5 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              >
                {copiedStep === 5 ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-gray-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Step 3 ── */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            3
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">Edit the Landing Page and Interior Pages</h2>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">1 minute</span>
            </div>
            <p className="text-gray-600">
              The landing page lives at <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">src/pages/index.astro</code> and  the interior pages lives at <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">src/pages/</code>. It&apos;s composed of pre-built components you can swap or edit.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Page structure at a glance</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Open <code className="bg-gray-100 px-2 py-0.5 rounded">src/pages/index.astro</code>. 
            </p>
            <p className="text-gray-600 mb-3 text-sm">
              See {" "}
                <Link
                  href="./landing-page/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-semibold"
                > 
                  Landing page
                </Link>{" "}
            </p>
            
           
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Editing a section component</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Each section is its own <code className="bg-gray-100 px-2 py-0.5 rounded">.astro</code> file inside <code className="bg-gray-100 px-2 py-0.5 rounded">src/components/</code>.
              Open any component and edit the text and image paths directly in the HTML — no config files needed:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative max-h-72 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{`---
// src/components/Hero.astro
import { Image } from "astro:assets";
import heroImg from "@assets/images/hero.jpg";
---

<section id="hero">
  <div class="cs-container">
    <div class="cs-content">
      <h1 class="cs-title">Your Headline Here</h1>
      <p class="cs-text">
        A short description of what you do and who you help.
      </p>
      <a href="/contact" class="cs-button-solid">Get Started</a>
    </div>
    <Image src={heroImg} alt="Hero image" class="cs-picture" />
  </div>
</section>`}</pre>
              <button
                onClick={() => copyToClipboard(`---
import { Image } from "astro:assets";
import heroImg from "@assets/images/hero.jpg";
---

<section id="hero">
  <div class="cs-container">
    <div class="cs-content">
      <h1 class="cs-title">Your Headline Here</h1>
      <p class="cs-text">
        A short description of what you do and who you help.
      </p>
      <a href="/contact" class="cs-button-solid">Get Started</a>
    </div>
    <Image src={heroImg} alt="Hero image" class="cs-picture" />
  </div>
</section>`, 7)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 7 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
            <p className="text-yellow-900 font-medium mb-1">Replace placeholder images</p>
            <p className="text-sm text-yellow-800">
              Drop your own images into <code className="bg-yellow-100 px-1.5 py-0.5 rounded">src/assets/images/</code> and update the import paths in the component files. Astro automatically optimizes them.
            </p>
          </div>
        </div>
         <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Want to see all components in action?
          </h3>
          <p className="text-blue-800 mb-4">
            Check out the components showcase page to see live examples of every component with interactive demos.
          </p>
          <Link
            href="/docs/components"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            View Component Library
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Step 4 ── */}
      <div className="mb-10 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
            4
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">Build &amp; Deploy</h2>
              <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">1 minute</span>
            </div>
            <p className="text-gray-600">
              Run a production build and deploy to any static host in seconds. 
              See   {" "}
              <Link
                href="/docs/astro/deployment"
                className="text-blue-600 underline font-semibold"
              >
                Deployment Guide
              </Link>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Build for production</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 relative">
              <code>npm run build</code>
              <button
                onClick={() => copyToClipboard("npm run build", 8)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 8 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Output goes to <code className="bg-gray-100 px-1.5 py-0.5 rounded">dist/</code>. Preview it locally with <code className="bg-gray-100 px-1.5 py-0.5 rounded">npm run preview</code>.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Deploy to your platform (recommend)</h3>
            <div className="grid md:grid-cols-2 gap-10 ml-20 mr-20">
              {[
                { name: "Netlify", desc: "Drag & drop the dist/ folder or connect your repo", href: "https://netlify.com" },
                { name: "Vercel", desc: "Import your GitHub repo — zero config needed", href: "https://vercel.com" },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 border-2 rounded-lg transition text-center group ${platform.name === "Netlify" ? "border-green-400 bg-green-50 hover:border-green-500" : "border-gray-200 hover:border-blue-400 hover:shadow-md"}`}
                >
                  <div className={`font-bold mb-1 transition-colors ${platform.name === "Netlify" ? "text-green-700 group-hover:text-green-900" : "text-gray-900 group-hover:text-blue-600"}`}>
                    {platform.name}
                  </div>
                  <p className="text-xs text-gray-600">{platform.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      <div className="">
        <p className="text-base text-gray-500">
              Congrats! 
        </p>
      </div>
    </div>
    </div>
  );
}