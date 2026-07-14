"use client"

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { MessageCircle, Copy, Check, Zap, Mail, Clock, Users, Shield } from "lucide-react";
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
      <div className="max-w-3xl mx-auto">

      {/* Hero Section */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Eleventy
          </Link>
          <span><LuChevronRight /></span>
          <Link href="/docs/eleventy/features" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Features
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Customer Support</span>
        </nav>


        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Add Live Chat Support
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Websitero integrates with Crisp to provide real-time chat support.
          Help your customers instantly with a beautiful live chat widget.
        </p>
      </div>

      {/* Setup Instructions */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Setup Crisp Live Chat
            </h2>
            <p className="text-lg text-gray-600">
              Get live chat working in 5 minutes
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Create a Crisp Account
              </h3>
            </div>
            <div className="ml-11">
              <p className="text-gray-700 mb-3">
                Sign up for a free account at{" "}
                <a href="https://crisp.chat" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">
                  crisp.chat
                </a>
              </p>
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-green-900 font-medium mb-1">
                  ✨ Free Plan Available
                </p>
                <p className="text-sm text-green-800">
                  Crisp offers a free plan with unlimited conversations - perfect for getting started!
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Get Your Website ID
              </h3>
            </div>
            <div className="ml-11">
              <ol className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">•</span>
                  <span>Open <a href="https://app.crisp.chat" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">app.crisp.chat</a> and select your workspace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">•</span>
                  <span>Go to <strong>Settings → Workspace Settings → Setup &amp; Integrations</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">•</span>
                  <span>Open <strong>Chatbox setup instructions</strong> and copy the chatbox script</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">•</span>
                  <span>Inside that snippet, copy the <code className="bg-gray-100 px-2 py-0.5 rounded">CRISP_WEBSITE_ID</code> value (looks like: <code className="bg-gray-100 px-2 py-0.5 rounded">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code>)</span>
                </li>
              </ol>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> The Website ID is the only part of that snippet you actually need — the rest of the loader code is identical for every site.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Add It to Your Client Data
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              The kit keeps a single source of truth in{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">src/_data/client.js</code>. Add your Crisp Website ID
              there so it&apos;s available to every template as <code className="bg-gray-100 px-2 py-0.5 rounded">client.crispWebsiteId</code>:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`// src/_data/client.js
module.exports = {
  name: "Your Business",
  email: "hello@yourbusiness.com",
  phoneForTel: "+15551234567",
  phoneFormatted: "(555) 123-4567",

  // Crisp live chat — paste your Website ID here
  crispWebsiteId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",

  address: { /* ... */ },
  socials: { /* ... */ },
  domain: "https://yourbusiness.com",
  isProduction: process.env.ELEVENTY_ENV === "production",
};`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// src/_data/client.js
module.exports = {
  name: "Your Business",
  email: "hello@yourbusiness.com",
  phoneForTel: "+15551234567",
  phoneFormatted: "(555) 123-4567",

  // Crisp live chat — paste your Website ID here
  crispWebsiteId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",

  address: { /* ... */ },
  socials: { /* ... */ },
  domain: "https://yourbusiness.com",
  isProduction: process.env.ELEVENTY_ENV === "production",
};`, 1)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 1 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Add Crisp Script to Layout
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              The base layout lives at <code className="bg-gray-100 px-2 py-1 rounded">src/_includes/layouts/base.html</code> (Nunjucks).
              Crisp recommends loading the chatbox from the <code className="bg-gray-100 px-2 py-0.5 rounded">&lt;head&gt;</code>, so paste this
              just before the closing <code className="bg-gray-100 px-2 py-0.5 rounded">&lt;/head&gt;</code> tag:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`    {# Crisp Live Chat Widget #}
    {% if client.crispWebsiteId %}
    <script type="text/javascript">
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "{{ client.crispWebsiteId }}";
      (function () {
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    </script>
    {% endif %}
  </head>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`    {# Crisp Live Chat Widget #}
    {% if client.crispWebsiteId %}
    <script type="text/javascript">
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "{{ client.crispWebsiteId }}";
      (function () {
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
    </script>
    {% endif %}
  </head>`, 2)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Success */}
          <div className="ml-11 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-900 font-medium mb-2">
              🎉 You&apos;re All Set!
            </p>
            <p className="text-sm text-green-800">
              Visit your site and you&apos;ll see the Crisp chat widget in the bottom-right corner.
              You can customize colors, messages, and behavior in your Crisp dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Support Button Component */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Add Support Buttons
            </h2>
            <p className="text-lg text-gray-600">
              Create reusable support buttons throughout your site
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Create a Support Button Component
            </h3>
            <p className="text-gray-600 mb-4">
              Create <code className="bg-gray-100 px-2 py-1 rounded">src/_includes/components/button-support.html</code>:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`{# Support Button - Opens Crisp chat or falls back to email #}

{% if client.crispWebsiteId %}
  {# Open Crisp Chat #}
  <button
    onclick="$crisp.push(['do', 'chat:open'])"
    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    Chat with Support
  </button>
{% else %}
  {# Fallback to Email #}
  <a
    href="mailto:{{ client.email }}?subject=Support%20Request"
    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    Email Support
  </a>
{% endif %}`}</code></pre>
              <button
                onClick={() => copyToClipboard(`{# Support Button - Opens Crisp chat or falls back to email #}

{% if client.crispWebsiteId %}
  {# Open Crisp Chat #}
  <button
    onclick="$crisp.push(['do', 'chat:open'])"
    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    Chat with Support
  </button>
{% else %}
  {# Fallback to Email #}
  <a
    href="mailto:{{ client.email }}?subject=Support%20Request"
    class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
    Email Support
  </a>
{% endif %}`, 3)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Use the Support Button
            </h3>
            <p className="text-gray-600 mb-3">
              Add the button anywhere in your pages:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`<div class="text-center py-8">
  <p class="text-gray-600 mb-4">Need help? We're here for you!</p>
  {% include "components/button-support.html" %}
</div>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<div class="text-center py-8">
  <p class="text-gray-600 mb-4">Need help? We're here for you!</p>
  {% include "components/button-support.html" %}
</div>`, 4)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
            <p className="text-purple-900 font-medium mb-2">
              💡 Smart Fallback
            </p>
            <p className="text-sm text-purple-800">
              The button automatically switches between Crisp chat and email based on your configuration.
              If Crisp isn&apos;t set up, users can still contact you via email.
            </p>
          </div>
        </div>
      </div>


      {/* Alternative: Email Only */}
      <div className="mb-12 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
        <div className="flex items-start gap-3">
          <Mail className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Don&apos;t Want Live Chat?
            </h3>
            <p className="text-gray-700 mb-3">
              You can skip Crisp setup and use email-only support. Simply leave{" "}
              <code className="bg-yellow-100 px-2 py-0.5 rounded">crispWebsiteId</code> empty
              in <code className="bg-yellow-100 px-2 py-0.5 rounded">client.js</code> and the support button will
              automatically fall back to your <code className="bg-yellow-100 px-2 py-0.5 rounded">client.email</code> instead.
            </p>
            <p className="text-sm text-gray-600">
              This is perfect for side projects or if you prefer handling support via email.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Help Your Customers! 💬
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Your live chat is now set up and ready to handle customer inquiries in real-time.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https://crisp.chat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
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