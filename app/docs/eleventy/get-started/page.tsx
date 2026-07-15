"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Rocket, Copy, Check, GitFork, Download, Settings } from "lucide-react";
import { Clock, ArrowRight } from "lucide-react";

import { useState } from "react";

function Row({ indent, connector, icon, name, nameClass, desc }: {
  indent: number;
  connector: string;
  icon: "folder" | "file";
  name: string;
  nameClass: string;
  desc?: string;
}) {
  return (
    <div className="flex items-center gap-1.5" style={{ paddingLeft: `${indent * 1.25}rem` }}>
      {connector && <span className="text-slate-600 select-none shrink-0 w-5">{connector}</span>}
      {icon === "folder" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 shrink-0">
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 shrink-0">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      )}
      <span className={nameClass}>{name}</span>
      {desc && <span className="text-slate-600 text-xs ml-1 hidden sm:inline">— {desc}</span>}
    </div>
  );
}

export default function GetStarted() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">

      {/* Hero Section */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Eleventy
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Get Started</span>
        </nav>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-slate-700 rounded-full text-sm font-medium mb-4">
          <Rocket className="w-4 h-4" />
          Get started in 5 minutes
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Get Started with Websitero
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Welcome to Websitero, the Eleventy Starter kit to launch your website + blog fast!
        </p>
        <p className="text-xl text-slate-600 leading-relaxed">
          Follow this guide to get your application up and running.
        </p>
      </div>

      {/* Before You Start */}
      <div className="mb-12 p-3 0 bg-slate-100 border rounded-xl">
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Before You Start
        </h3>
        <p className="text-slate-800 mb-4">
          Make sure you&apos;ve read the initial setup guide.
        </p>
        <Link
          href="/docs/eleventy/quick-setup"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-slate-700 font-semibold rounded-lg transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          See Quick Setup
        </Link>
      </div>

      {/* Setup Instructions */}
      <div id="setup" className="bg-slate-50 rounded-2xl p-8 mb-16 border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          Setup Your Project
        </h2>

        <div className="space-y-6">
          {/* Step 1: Create from Template */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <GitFork className="w-5 h-5" />
                  Create from Template
                </h3>
                <p className="text-slate-600 mb-4">
                  Bootstrap your project using the official Eleventy template, or clone the GitHub repository directly.
                </p>

                {/* Option A: GitHub template */}
                <p className="text-sm font-semibold text-slate-700 mb-2">Option A — Use the GitHub template:</p>
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-900">
                    Go to{" "}
                    <Link
                      href="https://github.com/cristianvmac/Eleventy-Starter"
                      className="font-medium underline"
                      target="_blank"
                    >
                      cristianvmac/Eleventy-Starter
                    </Link>
                    , click <strong>Use this template</strong> → <strong>Create a new repository</strong>, then clone your new repo locally.
                  </p>
                </div>

                {/* Option B: Clone directly */}
                <p className="text-sm font-semibold text-slate-700 mb-2">Option B — Clone directly:</p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-100 relative group">
                  <code>git clone https://github.com/cristianvmac/Eleventy-Starter [YOUR_APP_NAME]</code>
                  <button
                    onClick={() => copyToClipboard("git clone https://github.com/cristianvmac/Eleventy-Starter [YOUR_APP_NAME]", 1)}
                    className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedStep === 1 ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-900">
                    <strong>💡 Pro tip:</strong> Replace <code className="bg-blue-100 px-2 py-0.5 rounded">[YOUR_APP_NAME]</code> with your project name
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Install Dependencies */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Install Dependencies
                </h3>
                <p className="text-slate-600 mb-4">
                  Navigate to your project directory and install all required packages.
                </p>
                <div className="space-y-3">
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-100 relative group">
                    <code>npm install</code>
                    <button
                      onClick={() => copyToClipboard("npm install", 2)}
                      className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      {copiedStep === 3 ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Configure Your Site */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configure Your Site
                </h3>
                <p className="text-slate-600 mb-4">
                  Edit the key files to set up your business info and build settings.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono shrink-0">src/_data/client.js</code>
                    <span>— Site configuration and business info</span>
                  </li>
                  <li className="flex gap-2">
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono shrink-0">src/admin/config.yml</code>
                    <span>— Decap CMS configuration</span>
                  </li>
                  <li className="flex gap-2">
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono shrink-0">src/assets/css/</code>
                    <span>— Styles and design tokens</span>
                  </li>
                  <li className="flex gap-2">
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono shrink-0">.eleventy.js</code>
                    <span>— Plugins, filters, and collections</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4: Start Development Server */}
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Start the Development Server
                </h3>
                <p className="text-slate-600 mb-4">
                  Launch your local development server and see your app in action!
                </p>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-100 relative group">
                  <code>npm start</code>
                  <button
                    onClick={() => copyToClipboard("npm start", 4)}
                    className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedStep === 4 ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-slate-900 font-medium mb-1">
                    🚀 You&apos;re all set!
                  </p>
                  <p className="text-sm text-slate-800">
                    Your app is now running at{" "}
                    <Link href="http://localhost:8080" className="font-mono font-bold underline" target="_blank">
                      http://localhost:8080
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements Note */}
        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <p className="text-sm text-slate-900">
            <strong>⚠️ Requirements:</strong> This kit requires Node.js 18.17 or greater.
            Run <code className="bg-blue-100 px-2 py-0.5 rounded">node -v</code> in your terminal to check your version.
          </p>
        </div>
      </div>

      {/* Project Structure */}
      <div>
        <h2 className="text-xl font-bold mb-2 text-slate-900">
          Project Structure
        </h2>
        <p className="text-sm text-slate-500 mb-4">A standard Eleventy kit project looks like this:</p>

        <div className="bg-[#0f1117] rounded-xl border border-slate-800 overflow-hidden font-mono text-sm">

          <div className="p-5 space-y-0.5 leading-6 text-[13px]">
            <Row indent={0} connector=""   icon="folder" name="ELEVENTY-STARTER" nameClass="text-slate-300 font-semibold" />
            <Row indent={1} connector="├─" icon="folder" name="/public" nameClass="text-slate-300" />
            <Row indent={1} connector="├─" icon="folder" name="/scripts" nameClass="text-slate-300" desc="Build & setup utilities" />
            <Row indent={1} connector="├─" icon="folder" name="/src" nameClass="text-slate-300" />
          </div>
        </div>
      </div>

      {/* Deployment Note */}
      <div className="mt-10 p-5 bg-slate-50 border border-slate-200 rounded-xl">
        <h3 className="font-bold text-slate-900 mb-2">Deploying</h3>
        <p className="text-sm text-slate-700">
          Push to GitHub → Deploy on{" "}
          <Link href="https://www.netlify.com" className="underline" target="_blank">Netlify</Link>{" "}
          → Configure{" "}
          <Link href="https://decapbridge.com" className="underline" target="_blank">DecapBridge</Link>{" "}
          to enable the CMS for your clients.
        </p>
      </div>

      <div className="mt-12">
        <p className="text-xl text-slate-600 leading-relaxed">
          Once you&apos;re done, start with{" "}
          <Link
            href="./tutorials/build-in-5-minutes"
            className="text-slate-400 underline p-2"
          >
            this tutorial
          </Link>
          {" "}to launch your project in 5 minutes.
          Let&apos;s build that website FAST!
        </p>
      </div>

      </div>
    </div>
  );
}
