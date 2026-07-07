"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag, ShoppingCart, Store, Key, Database, Code2, CreditCard,
  Webhook, AlertTriangle, Info, Check, Copy, Layers, Package, Search,
  Heart, User, Star, Rocket, ArrowRight, Clock, MousePointerClick,
  type LucideIcon,
} from "lucide-react";

/* ── Reusable primitives ─────────────────────────────────── */

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800">
      {children}
    </code>
  );
}

function CodeBlock({ code, copyText }: { code: string; copyText?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText ?? code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-xl bg-slate-900 p-4 font-mono text-xs leading-relaxed text-slate-100">
      <pre className="overflow-x-auto whitespace-pre-wrap pr-10">{code}</pre>
      <button
        aria-label="Copy code"
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-200"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

const CALLOUT_TONES = {
  amber: "bg-amber-50 border-amber-200 text-amber-900",
  blue: "bg-blue-50 border-blue-200 text-blue-900",
  green: "bg-emerald-50 border-emerald-200 text-emerald-900",
  red: "bg-red-50 border-red-200 text-red-900",
} as const;

function Callout({
  tone, icon: Icon, title, children,
}: {
  tone: keyof typeof CALLOUT_TONES;
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-4 ${CALLOUT_TONES[tone]}`}>
      <p className="mb-1 flex items-center gap-2 font-semibold">
        <Icon className="h-4 w-4 shrink-0" />
        {title}
      </p>
      <div className="text-sm opacity-90">{children}</div>
    </div>
  );
}

function SectionCard({
  icon: Icon, accent, title, subtitle, children,
}: {
  icon: LucideIcon;
  accent: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <header className="mb-6 flex items-start gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
        </div>
      </header>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 underline underline-offset-2">
      {children}
    </a>
  );
}

/* ── Data ────────────────────────────────────────────────── */

const STEPS = [
  { icon: Key, title: "Connect", desc: "Supply your Storefront API credentials" },
  { icon: Database, title: "Fetch", desc: "Fresh product data is pulled at build time" },
  { icon: Layers, title: "Render", desc: "Listing & detail pages generate automatically" },
  { icon: CreditCard, title: "Sell", desc: "Full cart & checkout via Shopify fulfilment" },
];

const FEATURES = [
  {
    icon: Package,
    title: "Generic, adaptive pages",
    body: <>A product listing and product detail setup that adapts to whatever collections and products are defined in the Shopify backend.</>,
  },
  {
    icon: Code2,
    title: "Preset Storefront query",
    body: <>A ready-made GraphQL Storefront API query fetches the most commonly required product fields out of the box.</>,
  },
  {
    icon: Layers,
    title: "Build-time transform",
    body: <>Data is reshaped at build time into an easy-to-follow format to streamline injection — while keeping the raw GraphQL data available.</>,
  },
];

const STOREFRONT_QUERY = `query Products {
  products(first: 50) {
    edges {
      node {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 1) {
          edges {
            node { id }
          }
        }
      }
    }
  }
}`;

const BUTTON_SETUP = `---
// src/pages/products/[handle].astro
import BuyButton from "../../components/BuyButton.astro";

// Define the product ID, then drop the button wherever you like.
const productId = "gid://shopify/Product/1234567890";
---

<BuyButton productId={productId} />`;

const MUST_BUILD = [
  { icon: Search, label: "Search" },
  { icon: Heart, label: "Wish lists" },
  { icon: User, label: "User accounts" },
  { icon: Star, label: "Reviews" },
];

/* ── Page ────────────────────────────────────────────────── */

export default function StartEcommerce() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-slate-700">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-slate-400">
        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-600">Astro</span>
        <span>/</span>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-600">Tutorials</span>
        <span>/</span>
        <span className="text-slate-600">Start an E-commerce Store</span>
      </nav>

      {/* Hero */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          E-commerce with Shopify
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          The Shopify branch instantly adds a shop to your site by simply supplying{" "}
          <Ext href="https://shopify.dev/docs/api/storefront">Storefront API</Ext> credentials. At
          build time, fresh data from the Shopify backend is fetched and used to dynamically render
          pages with full cart and checkout functionality — so customers buy from your client and
          enjoy Shopify&apos;s well-loved fulfilment services.
        </p>
      </header>

      {/* Before you start */}
      <div className="mb-10">
        <Callout tone="amber" icon={Clock} title="Before you start">
          <p className="mb-3">
            Make sure you&apos;ve scaffolded the template and have the dev server running. If not,
            start with the quick build tutorial.
          </p>
          <Link
            href="/docs/astro/tutorials/build-in-5-minutes"
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Build in 5 minutes <ArrowRight className="h-4 w-4" />
          </Link>
        </Callout>
      </div>

      {/* How it works overview */}
      <div className="mb-12">
        <h2 className="mb-5 text-2xl font-bold text-slate-900">How the store works</h2>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="relative rounded-xl border border-slate-200 bg-white p-5">
              <span className="absolute -left-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <div className="mb-3 inline-flex rounded-lg bg-emerald-50 p-2">
                <Icon className="h-4 w-4 text-emerald-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-xs text-slate-500">{desc}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-8">
        {/* What's included */}
        <SectionCard
          icon={ShoppingBag}
          accent="bg-emerald-600"
          title="What's Included"
          subtitle="A lightning-fast frontend that rivals Shopify's own themes."
        >
          <p className="text-sm">
            This branch ships a generic product listing and product detail page setup that adapts
            based on the collections and products defined in your Shopify backend. The Storefront API
            query is pre-configured to fetch the extra product information you need, transformed into
            an easy-to-follow format before the site renders.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-slate-200 p-4">
                <Icon className="mb-2 h-5 w-5 text-emerald-600" />
                <p className="mb-1 text-sm font-bold text-slate-900">{title}</p>
                <p className="text-xs leading-relaxed text-slate-500">{body}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">The preset Storefront query</h3>
            <p className="mb-3 text-sm">
              A single GraphQL query pulls the most commonly required product fields. Extend it with
              any fields your store needs from the{" "}
              <Ext href="https://shopify.dev/docs/api/storefront/latest/queries/products">
                Storefront API reference
              </Ext>
              .
            </p>
            <CodeBlock code={STOREFRONT_QUERY} />
          </div>
        </SectionCard>

        {/* Buy buttons */}
        <SectionCard
          icon={MousePointerClick}
          accent="bg-blue-600"
          title="Adding Buy Buttons"
          subtitle="Wiring up cart and checkout takes two lines."
        >
          <p className="text-sm">
            Setting up button functionality is as simple as defining the product ID on the page and
            specifying where you want the button to render. The component handles adding the item to
            the cart and sending the customer through to Shopify&apos;s hosted checkout.
          </p>
          <CodeBlock code={BUTTON_SETUP} />
          <Callout tone="blue" icon={Info} title="Finding the product ID">
            Grab the global ID (<Code>gid://shopify/Product/…</Code>) from the Storefront API
            response, or from the product&apos;s URL in the Shopify admin.
          </Callout>
        </SectionCard>

        {/* Limitations */}
        <SectionCard
          icon={AlertTriangle}
          accent="bg-amber-600"
          title="Know the Limitations"
          subtitle="A few trade-offs to weigh before offering this to a client."
        >
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Webhook className="h-4 w-4 text-amber-600" /> Webhooks consume build minutes
            </h3>
            <p className="text-sm">
              To keep the store in sync with Shopify, you&apos;ll set up webhooks that rebuild the
              site whenever a product is created, updated, or deleted. A client with many products
              and frequent changes can burn through your build minutes. A future workaround may let
              you cap rebuilds on a per-day basis.
            </p>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
              <Store className="h-4 w-4 text-amber-600" /> The frontend is disconnected from Shopify
            </h3>
            <p className="mb-3 text-sm">
              Because the frontend is fully decoupled, you lose Shopify&apos;s app ecosystem. Several
              storefront features expected in modern stores must be custom-built — some need an extra
              backend and significant custom JavaScript. This kit focuses on rendering listing and
              product pages.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {MUST_BUILD.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <Icon className="h-4 w-4 shrink-0 text-slate-500" />
                  <span className="text-xs font-medium text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <Callout tone="amber" icon={Info} title="Know the Shopify ecosystem">
            A lot of heavy lifting is done for you, but you&apos;ll still be responsible for setting
            up the Shopify store, answering client questions about it, and handling maintenance. We
            strongly advise being comfortable with the Shopify ecosystem before taking this on.
          </Callout>
        </SectionCard>

        {/* Who it's for */}
        <SectionCard
          icon={ShoppingCart}
          accent="bg-purple-600"
          title="Who It's For"
          subtitle="The right fit — and when to reach for something heavier."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-900">
                <Check className="h-4 w-4" /> A great fit
              </p>
              <p className="text-sm text-emerald-900/90">
                Small e-commerce clients who won&apos;t make many changes and don&apos;t need
                extensive functionality. This kit gives them a fast, polished storefront frontend.
              </p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-900">
                <AlertTriangle className="h-4 w-4" /> Think twice if
              </p>
              <p className="text-sm text-amber-900/90">
                The client has a large, frequently-changing catalog or needs search, accounts,
                reviews, and wish lists — the custom build and rebuild costs add up quickly.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Next steps */}
      <footer className="mt-12 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 p-8 text-white">
        <div className="mb-3 flex items-center gap-3">
          <ShoppingBag className="h-7 w-7" />
          <h2 className="text-2xl font-bold">Your store is ready</h2>
        </div>
        <p className="mb-6 text-slate-300">
          A lightning-fast Shopify-powered storefront — products fetched at build time, full cart and
          checkout handled by Shopify, and a frontend that rivals its own themes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="https://shopify.dev/docs/api/storefront"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-semibold transition-colors hover:bg-emerald-700"
          >
            <Database className="h-4 w-4" /> Storefront API Docs
          </Link>
          <Link
            href="/docs/astro/deployment"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            <Rocket className="h-4 w-4" /> Deployment Guide
          </Link>
        </div>
      </footer>
    </div>
  );
}