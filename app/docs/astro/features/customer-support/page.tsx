"use client";


import { LuChevronRight } from "react-icons/lu";

import Link from "next/link";
import { MessageCircle, Copy, Check, Mail, Shield } from "lucide-react";
import { useState } from "react";

export default function CustomerSupport() {
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
          <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Astro
          </Link>
          <span><LuChevronRight /></span>
          <Link href="/docs/astro/features" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Features
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Customer Support</span>
        </nav>

        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Add Live Chat Support
        </h1>
        
        <p className="text-xl text-slate-600 mb-8">
          Websitero integrates with Crisp to provide real-time chat support.
          Help your customers instantly with a beautiful live chat widget.
        </p>
      </div>

      {/* Setup Instructions */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Setup Crisp Live Chat
            </h2>
            <p className="text-lg text-slate-600">
              Get live chat working in 5 minutes
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Create a Crisp Account
              </h3>
            </div>
            <div className="ml-11">
              <p className="text-slate-700 mb-3">
                Sign up for a free account at{" "}
                <a href="https://crisp.chat" target="_blank" rel="noopener noreferrer" className="text-slate-600 underline font-semibold">
                  crisp.chat
                </a>
              </p>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-slate-900 font-medium mb-1">
                  ✨ Free Plan Available
                </p>
                <p className="text-sm text-slate-800">
                  Crisp offers a free plan with unlimited conversations - perfect for getting started!
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Get Your Website ID
              </h3>
            </div>
            <div className="ml-11">
              <ol className="space-y-2 text-slate-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-600">•</span>
                  <span>In your Crisp dashboard, create a new website (workspace)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-600">•</span>
                  <span>Open <strong>Settings → Workspace Settings → Setup &amp; Integrations</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-600">•</span>
                  <span>Click <strong>Chatbox setup instructions</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-600">•</span>
                  <span>Copy the <code className="bg-slate-100 px-2 py-0.5 rounded">CRISP_WEBSITE_ID</code> (looks like: <code className="bg-slate-100 px-2 py-0.5 rounded">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code>)</span>
                </li>
              </ol>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-slate-800">
                  💡 <strong>Tip:</strong> The Website ID is the UUID inside the HTML snippet on the <strong>Chatbox setup instructions</strong> screen — it&apos;s the value assigned to <code className="bg-blue-100 px-1.5 py-0.5 rounded">CRISP_WEBSITE_ID</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Add to Site Configuration
              </h3>
            </div>
            <p className="text-slate-600 mb-4 ml-11">
              Open <code className="bg-slate-100 px-2 py-1 rounded">src/data/client.ts</code> and add a support config alongside the existing exports:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`// src/data/client.ts
// Add this next to your existing SITE, BUSINESS, SEO and OG exports.
// BUSINESS is already defined in this file, so we reuse its email.

// ===== CUSTOMER SUPPORT =====
export const SUPPORT = {
  email: BUSINESS.email,
  crispWebsiteId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // Your Crisp Website ID
};`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// src/data/client.ts
// Add this next to your existing SITE, BUSINESS, SEO and OG exports.
// BUSINESS is already defined in this file, so we reuse its email.

// ===== CUSTOMER SUPPORT =====
export const SUPPORT = {
  email: BUSINESS.email,
  crispWebsiteId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", // Your Crisp Website ID
};`, 1)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 1 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Add Crisp Script to Layout
              </h3>
            </div>
            <p className="text-slate-600 mb-4 ml-11">
              Open your layout <code className="bg-slate-100 px-2 py-1 rounded">src/layouts/BaseLayout.astro</code>, import the config in the frontmatter, and add the Crisp loader inside the <code className="bg-slate-100 px-2 py-0.5 rounded">&lt;head&gt;</code> (Crisp&apos;s recommended spot). Because the starter ships Astro&apos;s <code className="bg-slate-100 px-2 py-0.5 rounded">&lt;ClientRouter /&gt;</code>, boot it on <code className="bg-slate-100 px-2 py-0.5 rounded">astro:page-load</code> so the widget survives client-side navigation:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
import { ClientRouter } from "astro:transitions";
import { SUPPORT } from "@data/client";
// ...your other layout imports
---
<html lang="en">
  <head>
    <ClientRouter />
    <!-- ...existing head: <Meta />, nav.js, etc. -->

    {/* Crisp Live Chat — boots once and survives View Transitions */}
    {SUPPORT.crispWebsiteId && (
      <script is:inline define:vars={{ crispWebsiteId: SUPPORT.crispWebsiteId }}>
        if (!window.CRISP_WEBSITE_ID) {
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = crispWebsiteId;

          const boot = () => {
            if (document.querySelector('script[src="https://client.crisp.chat/l.js"]')) return;
            const s = document.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = true;
            document.head.appendChild(s);
          };

          boot();
          // <ClientRouter /> swaps pages without a full reload, so re-run after
          // every navigation (astro:page-load also fires on the first load).
          document.addEventListener("astro:page-load", boot);
        }
      </script>
    )}
  </head>
  <body>
    <!-- ...StaticHeader, <slot />, Footer... -->
  </body>
</html>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
import { ClientRouter } from "astro:transitions";
import { SUPPORT } from "@data/client";
// ...your other layout imports
---
<html lang="en">
  <head>
    <ClientRouter />
    <!-- ...existing head: <Meta />, nav.js, etc. -->

    {/* Crisp Live Chat — boots once and survives View Transitions */}
    {SUPPORT.crispWebsiteId && (
      <script is:inline define:vars={{ crispWebsiteId: SUPPORT.crispWebsiteId }}>
        if (!window.CRISP_WEBSITE_ID) {
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = crispWebsiteId;

          const boot = () => {
            if (document.querySelector('script[src="https://client.crisp.chat/l.js"]')) return;
            const s = document.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = true;
            document.head.appendChild(s);
          };

          boot();
          // <ClientRouter /> swaps pages without a full reload, so re-run after
          // every navigation (astro:page-load also fires on the first load).
          document.addEventListener("astro:page-load", boot);
        }
      </script>
    )}
  </head>
  <body>
    <!-- ...StaticHeader, <slot />, Footer... -->
  </body>
</html>`, 2)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>

            <div className="ml-11 mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-slate-800">
                🔁 <strong>Why <code className="bg-blue-100 px-1.5 py-0.5 rounded">astro:page-load</code>?</strong> This starter uses Astro View Transitions (<code className="bg-blue-100 px-1.5 py-0.5 rounded">&lt;ClientRouter /&gt;</code>), which swap page content without a full reload. Booting Crisp from the <code className="bg-blue-100 px-1.5 py-0.5 rounded">astro:page-load</code> event — instead of a one-off snippet before <code className="bg-blue-100 px-1.5 py-0.5 rounded">&lt;/body&gt;</code> — keeps the chat available on every page, not just the first one a visitor lands on.
              </p>
            </div>
          </div>

          {/* Success */}
          <div className="ml-11 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-slate-900 font-medium mb-2">
              🎉 You&apos;re All Set!
            </p>
            <p className="text-sm text-slate-800">
              Run <code className="bg-blue-100 px-1.5 py-0.5 rounded">npm run dev</code> and you&apos;ll see the Crisp chat widget in the bottom-right corner — and thanks to the <code className="bg-blue-100 px-1.5 py-0.5 rounded">astro:page-load</code> hook it stays put as visitors move between pages. Customize colors, messages, and behavior in your Crisp dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Support Button Component */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Add Support Buttons
            </h2>
            <p className="text-lg text-slate-600">
              Create reusable support buttons throughout your site
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Create a Support Button Component
            </h3>
            <p className="text-slate-600 mb-4">
              Following the starter&apos;s component-per-folder convention, create <code className="bg-slate-100 px-2 py-1 rounded">src/components/SupportButton/SupportButton.astro</code>:
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
// Support Button - Opens Crisp chat or falls back to email
import { SUPPORT } from "@data/client";

const { crispWebsiteId, email } = SUPPORT;
---

{crispWebsiteId ? (
  <button
    onclick="$crisp.push(['do', 'chat:open'])"
    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-slate-700 font-bold rounded-lg transition-colors shadow-lg">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    Chat with Support
  </button>
) : (
  <a
    href={\`mailto:\${email}?subject=Support%20Request\`}
    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-slate-700 font-bold rounded-lg transition-colors shadow-lg">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    Email Support
  </a>
)}`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
// Support Button - Opens Crisp chat or falls back to email
import { SUPPORT } from "@data/client";

const { crispWebsiteId, email } = SUPPORT;
---

{crispWebsiteId ? (
  <button
    onclick="$crisp.push(['do', 'chat:open'])"
    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-slate-700 font-bold rounded-lg transition-colors shadow-lg">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    Chat with Support
  </button>
) : (
  <a
    href={\`mailto:\${email}?subject=Support%20Request\`}
    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-slate-700 font-bold rounded-lg transition-colors shadow-lg">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    Email Support
  </a>
)}`, 3)}
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

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Use the Support Button
            </h3>
            <p className="text-slate-600 mb-3">
              Import it in any page or component&apos;s frontmatter, then drop it in your markup:
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`---
import SupportButton from "@components/SupportButton/SupportButton.astro";
---

<div class="text-center py-8">
  <p class="text-slate-600 mb-4">Need help? We're here for you!</p>
  <SupportButton />
</div>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
import SupportButton from "@components/SupportButton/SupportButton.astro";
---

<div class="text-center py-8">
  <p class="text-slate-600 mb-4">Need help? We're here for you!</p>
  <SupportButton />
</div>`, 4)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-slate-900 font-medium mb-2">
              💡 Smart Fallback
            </p>
            <p className="text-sm text-slate-800">
              The button automatically switches between Crisp chat and email based on your configuration.
              If Crisp isn&apos;t set up, users can still contact you via email.
            </p>
          </div>
        </div>
      </div>

      {/* Alternative: Email Only */}
      <div className="mb-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-3">
          <Mail className="w-6 h-6 text-slate-600 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Don&apos;t Want Live Chat?
            </h3>
            <p className="text-slate-700 mb-3">
              You can skip Crisp setup and use email-only support. Simply leave{" "}
              <code className="bg-blue-100 px-2 py-0.5 rounded">crispWebsiteId</code> empty
              in your config and the support button will automatically use your support email instead.
            </p>
            <p className="text-sm text-slate-600">
              This is perfect for side projects or if you prefer handling support via email.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 text-center">
        <h2 className="text-xl font-bold mb-4">
          Ready to Help Your Customers! 💬
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Your live chat is now set up and ready to handle customer inquiries in real-time.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https://crisp.chat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-slate-700 font-bold rounded-lg transition-colors"
          >
            <Shield className="w-5 h-5" />
            Add Live Chat Support
          </Link>
        
        </div>
      </div>

      </div>
    </div>
  );
}