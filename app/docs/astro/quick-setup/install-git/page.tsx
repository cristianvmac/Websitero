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
        {/*<div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
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
      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-slate-700 text-sm"
      style={{ background: "#c3c5c7" }}
    >
      {number}
    </div>
    <div className="flex-1 pt-1">
      <p className="font-bold text-slate-800 mb-1">{title}</p>
      <div className="text-slate-600 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

const OS_TABS = ["Windows", "macOS"];

export default function InstallGit() {
  const [activeOS, setActiveOS] = useState("Windows");
  const [checklist, setChecklist] = useState({
    downloaded: false,
    installed: false,
    verified: false,
    configured: false,
  });


  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">

        {/* Header */}
        <div className="mb-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
            <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Astro
            </Link>
            <span><LuChevronRight /></span>
            <Link href="/docs/astro/quick-setup" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Quick Setup
            </Link>
            <span><LuChevronRight /></span>
            <span aria-current="page">Installing Git</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Installing Git
          </h1>
          <p className="text-slate-500 text-lg">
            A step-by-step guide for absolute beginners
          </p>
          <div
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: "", color: "#0f172a" }}
          >
            ⏱ Takes about 10 minutes
          </div>
        </div>

        {/* What is Git */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e0e7ff" }}
        >
          <h2 className="font-bold text-lg text-slate-900 mb-2">
            🤔 What is Git, and why do I need it?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Imagine you&apos;re writing an essay and you save a copy every time you make big changes —
            <em> essay_v1.doc, essay_v2.doc, essay_FINAL.doc</em>. Git does this automatically for your code,
            but in a much smarter way. It remembers <strong>every change you ever made</strong>, lets you go
            back to any earlier version, and makes it easy to work on projects with other people.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Almost every coding job, tutorial, and project uses Git. It&apos;s one of the first things
            developers install on a new computer. 💾
          </p>
        </div>

        {/* OS Selector */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e0e7ff" }}
        >
          <h2 className="font-bold text-lg text-slate-900 mb-4">
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
              <Step number={1} title="Go to the official Git website">
                Open your web browser (Chrome, or others — any will work) and visit{" "}
                <Link
                  href="https://git-scm.com/download/win"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  style={{ color: "#000" }}
                >
                  git-scm.com/download/win
                </Link>
                . This is the <strong>official</strong> website — always download from here to stay safe.
              </Step>

              <Step number={2} title="Download the installer">
                The download may start automatically. If it doesn&apos;t, look for a link that says
                {" "}<strong>&quot;Click here to download manually&quot;</strong>. Choose the <strong>64-bit</strong> version
                — this is correct for almost all modern Windows computers.
              </Step>

              <Step number={3} title="Run the installer file">
                Open your <strong>Downloads folder</strong> and double-click the file
                (named something like <code className="bg-slate-100 px-1 rounded">Git-2.x.x-64-bit.exe</code>).
                A setup wizard will open.
              </Step>

              <Step number={4} title="Click through the setup wizard">
                There are many screens — don&apos;t be overwhelmed! Here&apos;s what to do on the important ones:
                <ul className="list-none space-y-2 mt-2">
                  <li>• Click <strong>Next</strong> on the license screen</li>
                  <li>• Leave the install location as-is, click <strong>Next</strong></li>
                  <li>• On &quot;Choosing the default editor&quot;, select <strong>Visual Studio Code</strong> if you have it, otherwise leave the default and click <strong>Next</strong></li>
                  <li>• On every other screen, just leave the defaults and keep clicking <strong>Next</strong></li>
                  <li>• Click <strong>Install</strong>, then <strong>Finish</strong></li>
                </ul>
              </Step>

              <div
                className="rounded-xl p-4 mt-2"
                style={{ background: "", border: "" }}
              >
                <p className="text-slate-900 text-sm font-semibold mb-1">✅ What is &quot;Git Bash&quot;?</p>
                <p className="text-slate-800 text-sm leading-relaxed">
                  Git for Windows installs a program called <strong>Git Bash</strong> — a special terminal
                  window made for using Git. After installation, you can use either Git Bash or the
                  regular Command Prompt to run Git commands. Either works fine!
                </p>
              </div>
            </div>
          )}

          {/* macOS Steps */}
          {activeOS === "macOS" && (
            <div>
              <Step number={1} title="Open the Terminal">
                Press <kbd className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-xs font-mono">⌘ Command</kbd> +{" "}
                <kbd className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-xs font-mono">Space</kbd>, type{" "}
                <strong>Terminal</strong>, and press Enter. A window with a text prompt will open — that&apos;s your terminal.
              </Step>

              <Step number={2} title="Check if Git is already installed">
                Type this command in the terminal and press Enter:
                <CodeBlock code="git --version" />
                If you see a version number like <code className="bg-slate-100 px-1 rounded">git version 2.39.0</code>, Git is
                already on your Mac and <strong>you&apos;re done!</strong> If you see a popup or an error, continue to the next step.
              </Step>

              <Step number={3} title="Install Git via the Xcode Command Line Tools">
                If Git wasn&apos;t found, macOS will either show a popup asking to install it automatically — click{" "}
                <strong>Install</strong> and follow the prompts. If no popup appeared, run this command:
                <CodeBlock code="xcode-select --install" />
                A popup will appear. Click <strong>Install</strong>, agree to the license, and wait for it to finish
                (it may take a few minutes).
              </Step>

              <div
                className="rounded-xl p-4 mt-2 mb-6"
                style={{ background: "", border: "" }}
              >
                <p className="text-slate-900 text-sm font-semibold mb-1">✅ What are &quot;Xcode Command Line Tools&quot;?</p>
                <p className="text-slate-800 text-sm leading-relaxed">
                  This is a free package from Apple that includes Git and other useful developer tools.
                  It&apos;s the official, recommended way to get Git on a Mac — no third-party downloads needed!
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
          <h2 className="font-bold text-lg text-slate-900 mb-2">
            ✅ Check that it worked
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Let&apos;s confirm Git is installed. Open your terminal (or Git Bash on Windows) and run:
          </p>

          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: "", border: "" }}
          >
            <p className="text-slate-800 text-sm font-semibold mb-1 flex items-center gap-2">
              {activeOS === "Windows" ? <FaWindows /> : <FaApple />}
              {activeOS === "Windows" ? "How to open Git Bash on Windows:" : "How to open the terminal on macOS:"}
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              {activeOS === "Windows"
                ? "Click the Start menu, search for \"Git Bash\", and click it. A dark window will open."
                : "Press ⌘ + Space, type \"Terminal\", and press Enter."}
            </p>
          </div>

          <CodeBlock code="git --version" />
          <p className="text-slate-500 text-sm">
            You should see something like <code className="bg-slate-100 px-1 rounded">git version 2.43.0</code>.
            The exact number doesn&apos;t matter — any version number means it worked! 🎉
          </p>

          <div
            className="rounded-xl p-4 mt-4"
            style={{ background: "", border: "" }}
          >
            <p className="text-slate-800 text-sm font-semibold mb-1">❌ Seeing an error instead?</p>
            <p className="text-slate-700 text-sm leading-relaxed">
              Try <strong>closing and reopening</strong> the terminal, then run the command again.
              On Windows, make sure you&apos;re using <strong>Git Bash</strong> (not the regular Command Prompt) or try restarting your computer.
            </p>
          </div>
        </div>

        {/* First-time Setup — this is what the original was completely missing */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e0e7ff" }}
        >
          <h2 className="font-bold text-lg text-slate-900 mb-2">
            👤 One-time setup — tell Git who you are
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Before you can use Git, you need to give it your name and email address. Git uses this to
            label every change you make, so others (and your future self!) can see who did what.
            You only need to do this <strong>once per computer</strong>.
          </p>
          <p className="text-slate-600 text-sm mb-1">
            Run these two commands in your terminal, replacing the example text with your own name and email:
          </p>
          <CodeBlock code={`git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"`} />
          <div
            className="rounded-xl p-4"
            style={{ background: "", border: "" }}
          >
            <p className="text-slate-800 text-sm font-semibold mb-1">💡 What email should I use?</p>
            <p className="text-slate-700 text-sm leading-relaxed">
              Use any email address you have. If you plan to use GitHub (a website for storing your code),
              use the same email you&apos;ll sign up with there.
            </p>
          </div>
        </div>



         <p className="text-center text-slate-600 text-sm font-medium mt-8">
          Always download Git from the official site:{" "}
          <Link
            href="https://git-scm.com/install/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
            style={{ color: "#6366f1" }}
          >
            git-scm.com
          </Link>
          </p>
      </div>
    </div>
  );
}