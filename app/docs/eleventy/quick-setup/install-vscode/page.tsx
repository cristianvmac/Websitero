"use client";


import React, { useState } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

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
        background: copied ? "#22c55e" : "rgba(255,255,255,0.15)",
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
        <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} /> */}
      </div>
      <CopyButton text={code} />
    </div>
    <pre className="p-4 text-sm overflow-x-auto" style={{ color: "#60a5fa", margin: 0 }}>
      <code>{code}</code>
    </pre>
  </div>
);

const Step = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4 mb-6">
    <div
      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
      style={{ background: "linear-gradient(135deg, #2563eb, #0891b2)" }}
    >
      {number}
    </div>
    <div className="flex-1 pt-1">
      <p className="font-bold text-gray-800 mb-1">{title}</p>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

const TipBox = ({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) => (
  <div
    className="rounded-xl p-4 mb-4 flex gap-3"
    style={{ background: "#fefce8", border: "1px solid #fde68a" }}
  >
    <span className="text-xl shrink-0">{icon}</span>
    <div>
      <p className="font-bold text-yellow-800 text-sm mb-1">{title}</p>
      <p className="text-yellow-700 text-sm leading-relaxed">{children}</p>
    </div>
  </div>
);

const OS_TABS = ["Windows", "macOS"];

export default function InstallVSCode() {
  const [activeOS, setActiveOS] = useState("Windows");
  const [checklist, setChecklist] = useState({
    downloaded: false,
    installed: false,
    launched: false,
    extension: false,
  });

  const toggleCheck = (key: keyof typeof checklist) =>
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));

  const allDone = Object.values(checklist).every(Boolean);

  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl mx-auto">

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
            <span aria-current="page">Installing VS Code</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Installing VS Code
          </h1>
          <p className="text-gray-500 text-lg">
            A step-by-step guide for absolute beginners
          </p>
          <div
            className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: "#dbeafe", color: "#1d4ed8" }}
          >
            ⏱ Takes about 5 minutes
          </div>
        </div>

        {/* What is VS Code */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #bfdbfe" }}
        >
          <h2 className="font-bold text-lg text-gray-900 mb-2">
            🤔 What is VS Code, and why do I need it?
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            VS Code (short for Visual Studio Code) is a free program for writing code. Think of it like
            Microsoft Word, but instead of writing essays, you write code — and it helps you by
            <strong> highlighting your code in colors</strong>, catching typos, and suggesting what to type next.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            It&apos;s made by Microsoft, works on Windows and Mac, and is the most popular code editor in the
            world. The best part? It&apos;s completely free. 🎉
          </p>
        </div>

        {/* OS Selector */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #bfdbfe" }}
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
                    ? "linear-gradient(135deg, #2563eb, #0891b2)"
                    : "#f8f9ff",
                  color: activeOS === os ? "white" : "#6b7280",
                  border: activeOS === os ? "none" : "1px solid #e5e7eb",
                  boxShadow: activeOS === os ? "0 4px 14px rgba(37,99,235,0.35)" : "none",
                  cursor: "pointer",
                }}
              >
                {os === "Windows" ? "🪟" : "🍎"} {os}
              </button>
            ))}
          </div>

          {/* Windows Steps */}
          {activeOS === "Windows" && (
            <div>
              <Step number={1} title="Go to the official VS Code website">
                Open your web browser (Chrome, or others — any will work) and visit{" "}
                <a
                  href="https://code.visualstudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  style={{ color: "#2563eb" }}
                >
                  code.visualstudio.com
                </a>
                . This is Microsoft&apos;s official website — always download from here to stay safe.
              </Step>

              <Step number={2} title='Click the big blue "Download for Windows" button'>
                The website will automatically detect you&apos;re on Windows and show you the right button.
                Click it and the download will start. The file will be named something like{" "}
                <code className="bg-gray-100 px-1 rounded">VSCodeSetup-x64-1.x.x.exe</code>.
              </Step>

              <Step number={3} title="Run the installer file">
                Open your <strong>Downloads folder</strong> and double-click the file you just downloaded.
                If Windows asks <em>&quot;Do you want to allow this app to make changes?&quot;</em>, click <strong>Yes</strong> —
                this is normal for any installer.
              </Step>

              <Step number={4} title="Click through the setup wizard">
                <ul className="list-none space-y-2 mt-1">
                  <li>• Accept the license agreement and click <strong>Next</strong></li>
                  <li>• Leave the install location as-is and click <strong>Next</strong></li>
                  <li>• On the &quot;Select Additional Tasks&quot; screen, check these two boxes:
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>✅ <strong>Add &quot;Open with Code&quot; action to Windows Explorer file context menu</strong></li>
                      <li>✅ <strong>Add to PATH</strong></li>
                    </ul>
                  </li>
                  <li>• Click <strong>Next</strong>, then <strong>Install</strong>, then <strong>Finish</strong></li>
                </ul>
              </Step>

              <div
                className="rounded-xl p-4 mt-2"
                style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
              >
                <p className="text-blue-800 text-sm font-semibold mb-1">💡 Why check those two boxes?</p>
                <p className="text-blue-700 text-sm leading-relaxed">
                  <strong>&quot;Open with Code&quot;</strong> lets you right-click any folder or file and open it
                  directly in VS Code — super handy! <strong>&quot;Add to PATH&quot;</strong> lets you type{" "}
                  <code className="bg-blue-100 px-1 rounded">code .</code> in the terminal to open VS Code
                  from anywhere. Both will save you a lot of time.
                </p>
              </div>
            </div>
          )}

          {/* macOS Steps */}
          {activeOS === "macOS" && (
            <div>
              <Step number={1} title="Go to the official VS Code website">
                Open Chrome, or any browser and visit{" "}
                <a
                  href="https://code.visualstudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                  style={{ color: "#2563eb" }}
                >
                  code.visualstudio.com
                </a>
                . Always download from the official site to stay safe.
              </Step>

              <Step number={2} title='Click "Download for Mac"'>
                The website detects you&apos;re on a Mac and shows the right button. Click it — a{" "}
                <code className="bg-gray-100 px-1 rounded">.zip</code> file will download to your
                Downloads folder.
              </Step>

              <TipBox icon="🍎" title="Apple Silicon (M1/M2/M3) or Intel Mac?">
                If you have a newer Mac (2020 or later), you likely have Apple Silicon. The VS Code
                website will usually detect this automatically. If you want to check: click the{" "}
                 menu → <strong>About This Mac</strong>. If it says &quot;Apple M1&quot; or similar, you have
                Apple Silicon. Either version will work fine though!
              </TipBox>

              <Step number={3} title="Unzip and move VS Code to your Applications folder">
                Go to your <strong>Downloads folder</strong> and double-click the{" "}
                <code className="bg-gray-100 px-1 rounded">.zip</code> file to unzip it. You&apos;ll see a
                file called <strong>Visual Studio Code.app</strong> appear. Drag this file into
                your <strong>Applications folder</strong> — the same place as your other apps like
                Safari and Mail.
              </Step>

              <Step number={4} title="Open VS Code for the first time">
                Go to your <strong>Applications folder</strong> and double-click{" "}
                <strong>Visual Studio Code</strong>. The first time you open it, macOS may show a warning:
                <em>&quot;Visual Studio Code is an app downloaded from the Internet. Are you sure you want to open it?&quot;</em>
                — click <strong>Open</strong>. This is normal for any downloaded app.
              </Step>

              <div
                className="rounded-xl p-4 mt-2"
                style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
              >
                <p className="text-blue-800 text-sm font-semibold mb-1">💡 Pro tip: Add VS Code to your Dock</p>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Once VS Code is open, right-click its icon in the Dock at the bottom of your screen
                  and choose <strong>Options → Keep in Dock</strong>. This way you can always open it
                  with one click!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Verify */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #bfdbfe" }}
        >
          <h2 className="font-bold text-lg text-gray-900 mb-2">
            ✅ Check that it worked
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The easiest check: just look for VS Code in your apps and open it! You should see a
            welcome screen with a dark or light background and a sidebar on the left.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            You can also verify it from the terminal. Open your terminal
            {activeOS === "Windows" ? " (search 'cmd' in the Start menu)" : " (⌘ + Space → Terminal)"} and run:
          </p>
          <CodeBlock code="code --version" />
          <p className="text-gray-500 text-sm">
            You&apos;ll see something like <code className="bg-gray-100 px-1 rounded">1.89.0</code> printed —
            that means VS Code is installed and ready to use!
          </p>

          <div
            className="rounded-xl p-4 mt-4"
            style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
          >
            <p className="text-red-800 text-sm font-semibold mb-1">❌ &quot;code&quot; not recognized in the terminal?</p>
            <p className="text-red-700 text-sm leading-relaxed">
              On <strong>Windows</strong>: restart your computer so the PATH change takes effect, then try again.
              On <strong>macOS</strong>: open VS Code, press{" "}
              <kbd className="bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs font-mono">⌘ Cmd</kbd> +{" "}
              <kbd className="bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs font-mono">Shift</kbd> +{" "}
              <kbd className="bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded text-xs font-mono">P</kbd>,
              type <strong>&quot;Shell Command&quot;</strong>, and select <em>&quot;Install &apos;code&apos; command in PATH&quot;</em>.
            </p>
          </div>
        </div>   

        <p className="text-center text-gray-600 text-sm font-medium mt-8">
          Always download VS Code from the official site:{" "}
          <Link
            href="https://code.visualstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
            style={{ color: "#6366f1" }}
          >
            code.visualstudio.com
          </Link>
        </p>
      </div>
    </div>
  );
}