"use client";


import React, { useState } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { FaWindows, FaApple } from "react-icons/fa";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1 rounded-full font-semibold transition-all"
      style={{
        background: copied ? "#2297c5" : "rgba(255,255,255,0.15)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.2)",
        cursor: "pointer",
      }}
    >
      {copied ? "✓ Copied!" : "Copy"}
    </button>
  );
};

const CodeBlock = ({ code }: { code: string }) => (
  <div
    className="rounded-xl overflow-hidden my-4"
    style={{ background: "#0f172a", border: "1px solid #1e293b" }}
  >
    <div
      className="flex items-center justify-between px-4 py-2"
      style={{ background: "#1e293b" }}
    >
     <div className="flex gap-1.5">
        {/* <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />*/}
      </div>
      <CopyButton text={code} />
    </div>
    <pre className="p-4 text-sm overflow-x-auto" style={{ color: "#fff", margin: 0 }}>
      <code>{code}</code>
    </pre>
  </div>
);

const Step = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4 mb-6">
    <div
      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-gray-700 text-sm"
      style={{ background: "#c3c5c7" }}
    >
      {number}
    </div>
    <div className="flex-1 pt-1">
      <p className="font-bold text-gray-800 mb-1">{title}</p>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);


const OS_TABS = ["Windows", "macOS"];

export default function InstallNode() {
  const [activeOS, setActiveOS] = useState("Windows");

  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">

        {/* Header */}
        <div className="mb-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
            <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Eleventy
            </Link>
            <span><LuChevronRight /></span>
            <Link href="/docs/eleventy/quick-setup" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Quick Setup
            </Link>
            <span><LuChevronRight /></span>
            <span aria-current="page">Installing Node.js</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Installing Node.js
          </h1>
          <p className="text-gray-500 text-lg">
            A step-by-step guide for absolute beginners
          </p>
          <div
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: "", color: "#0f172a" }}
          >
            ⏱ Takes about 5 minutes
          </div>
        </div>

        {/* What is Node.js */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e0e7ff" }}
        >
          <h2 className="font-bold text-lg text-gray-900 mb-2">
            🤔 What is Node.js, and why do I need it?
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Node.js lets your computer run JavaScript code — the same language used to build websites — outside of a web browser. Many popular tools and frameworks (like Eleventy, Astro, React, and others) <strong>require Node.js to be installed first</strong> before you can use them.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Think of it like installing a music player before you can listen to songs. Node.js is the player; your code is the music. 🎵
          </p>
        </div>

        {/* OS Selector */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e0e7ff" }}
        >
          <h2 className="font-bold text-lg text-gray-900 mb-4">
            💻 What operating system are you using?
          </h2>
          <div className="flex gap-3 mb-12">
            {OS_TABS.map((os) => (
              <button
                key={os}
                onClick={() => setActiveOS(os)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: activeOS === os
                    ? "#58afed"
                    : "#f8f9ff",
                  color: activeOS === os ? "white" : "#6b7280",
                  border: activeOS === os ? "none" : "1px solid #e5e7eb",
                  boxShadow: activeOS === os ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
                  cursor: "pointer",
                }}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {os === "Windows" ? <FaWindows /> : <FaApple />} {os}
                </span>
              </button>
            ))}
          </div>

          {/* Windows Steps */}
          {activeOS === "Windows" && (
            <div>
              <Step number={1} title="Go to the official Node.js website">
                Open your web browser (Chrome, Edge, or any other — they all work) and visit{" "}
                <a
                  href="https://nodejs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  style={{ color: "#000" }}
                >
                  nodejs.org
                </a>
                . This is the <strong>official</strong> website — always download from here to stay safe.
              </Step>

              <Step number={2} title='Click the big green "LTS" download button'>
                You will see two buttons. Click the one that says <strong>&quot;LTS&quot;</strong> — this stands for
                <em> Long Term Support</em>, meaning it&apos;s the most stable and recommended version for beginners.
                The other version (&quot;Current&quot;) is for advanced users testing new features.
              </Step>

              <Step number={3} title="Run the installer file">
                Once the download finishes, open your <strong>Downloads folder</strong> and double-click the file
                (it will be named something like <code className="bg-gray-100 px-1 rounded">node-v22.x.x-x64.msi</code>).
                A setup wizard will open.
              </Step>

              <Step number={4} title="Click through the setup wizard">
                <ul className="list-none space-y-2 mt-1">
                  <li>• Click <strong>Next</strong> on the welcome screen</li>
                  <li>• Accept the license agreement and click <strong>Next</strong></li>
                  <li>• Leave the install location as-is and click <strong>Next</strong></li>
                  <li>• <strong>Important:</strong> On the &quot;Custom Setup&quot; screen, make sure &quot;Add to PATH&quot; is checked (it should be by default)</li>
                  <li>• Click <strong>Install</strong>, then <strong>Finish</strong></li>
                </ul>
              </Step>

              <div
                className="rounded-xl p-4 mt-2"
                style={{ background: "", border: "" }}
              >
                <p className="text-slate-900 text-sm font-semibold mb-1">✅ What is &quot;Add to PATH&quot;?</p>
                <p className="text-slate-800 text-sm leading-relaxed">
                  PATH is a list your computer uses to find programs. If Node.js is added to PATH,
                  you can run it from anywhere in your terminal. If you skip this, Node.js won&apos;t
                  work properly — so always make sure it&apos;s checked!
                </p>
              </div>
            </div>
          )}

          {/* macOS Steps */}
          {activeOS === "macOS" && (
            <div>
              <Step number={1} title="Go to the official Node.js website">
                Open Chrome (or any browser) and go to{" "}
                <a
                  href="https://nodejs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  style={{ color: "#6366f1" }}
                >
                  nodejs.org
                </a>
                . Always download from the official site to stay safe.
              </Step>

              <Step number={2} title='Click the big green "LTS" download button'>
                You&apos;ll see two options. Click <strong>&quot;LTS&quot;</strong> — this means
                <em> Long Term Support</em> and is the stable, beginner-friendly version.
                It will automatically detect that you&apos;re on macOS.
              </Step>

              <Step number={3} title="Open the downloaded file">
                Go to your <strong>Downloads folder</strong> (or check the bottom of your browser window)
                and double-click the file that ends in <code className="bg-gray-100 px-1 rounded">.pkg</code>.
                It will be named something like <code className="bg-gray-100 px-1 rounded">node-v22.x.x.pkg</code>.
              </Step>

              <Step number={4} title="Follow the installer steps">
                <ul className="list-none space-y-2 mt-1">
                  <li>• Click <strong>Continue</strong> on the introduction screen</li>
                  <li>• Accept the software license agreement</li>
                  <li>• Leave the install destination as-is (your main disk)</li>
                  <li>• Click <strong>Install</strong> — you may be asked for your Mac password</li>
                  <li>• Click <strong>Close</strong> when it finishes</li>
                </ul>
              </Step>

              <div
                className="rounded-xl p-4 mt-2"
                style={{ background: "", border: "" }}
              >
                <p className="text-slate-900 text-sm font-semibold mb-1">🔐 Why does it ask for my password?</p>
                <p className="text-slate-800 text-sm leading-relaxed">
                  macOS asks for your password any time software is being installed to protect your computer.
                  This is completely normal — enter your regular Mac login password and click OK.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Verify Installation */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e0e7ff" }}
        >
          <h2 className="font-bold text-lg text-gray-900 mb-2">
            ✅ Check that it worked
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Now let&apos;s make sure Node.js was installed correctly. We&apos;ll do this using the <strong>terminal</strong> — don&apos;t worry, it&apos;s just two short commands!
          </p>

          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: "", border: "" }}
          >
            <p className="text-slate-800 text-sm font-semibold mb-1 flex items-center gap-2">
              {activeOS === "Windows" ? <FaWindows /> : <FaApple />}
              {activeOS === "Windows" ? "How to open the terminal on Windows:" : "How to open the terminal on macOS:"}
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              {activeOS === "Windows"
                ? 'Press the Windows key + R, type "cmd", and press Enter. A black window will open — that\'s your terminal!'
                : 'Press Command (⌘) + Space, type "Terminal", and press Enter. A white or black window will open — that\'s your terminal!'}
            </p>
          </div>

          <p className="text-gray-600 text-sm mb-1">
            Type (or paste) these commands one at a time, pressing <kbd className="bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs font-mono">Enter</kbd> after each:
          </p>
          <CodeBlock code={`node --version\nnpm --version`} />
          <p className="text-gray-500 text-sm">
            If it worked, you&apos;ll see version numbers printed, like <code className="bg-gray-100 px-1 rounded">v22.13.1</code> and <code className="bg-gray-100 px-1 rounded">11.3.0</code>. The exact numbers don&apos;t matter — any numbers mean success! 🎉
          </p>

          <div
            className="rounded-xl p-4 mt-4"
            style={{ background: "", border: "" }}
          >
            <p className="text-slate-800 text-sm font-semibold mb-1">❌ Seeing an error instead?</p>
            <p className="text-slate-700 text-sm leading-relaxed">
              If you see <em>&quot;command not found&quot;</em> or <em>&quot;not recognized&quot;</em>, try <strong>closing and reopening</strong> the terminal window, then try again.
              On Windows, you may need to restart your computer for PATH changes to take effect.
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm font-medium mt-8">
          Always download Node.js from the official site:{" "}
          <Link
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
            style={{ color: "#6366f1" }}
          >
            nodejs.org
          </Link>
        </p>
      </div>
    </div>
  );
}