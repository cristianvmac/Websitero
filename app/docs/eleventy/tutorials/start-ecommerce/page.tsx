"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag, ShoppingCart, Store, Key, Database, CreditCard,
  Webhook, AlertTriangle, Info, Check, Copy, Layers, Package, Search,
  Heart, User, Star, Rocket, ArrowRight, Clock, MousePointerClick,
  Zap, Settings2, X, ChevronRight, ShieldCheck, type LucideIcon,
} from "lucide-react";
import { LuChevronRight } from "react-icons/lu";


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
        {copied ? <Check className="h-4 w-4 text-slate-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

const CALLOUT_TONES = {
  amber: "bg-blue-50 border-blue-200 text-slate-900",
  blue: "bg-blue-50 border-blue-200 text-slate-900",
  green: "bg-blue-50 border-blue-200 text-slate-900",
  red: "bg-blue-50 border-blue-200 text-slate-900",
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
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-700 ${accent}`}>
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
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-600 underline underline-offset-2">
      {children}
    </a>
  );
}

function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="mb-2 text-sm font-bold text-slate-900">Pros</p>
        <ul className="space-y-1.5">
          {pros.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-slate-900">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="mb-2 text-sm font-bold text-slate-900">Cons</p>
        <ul className="space-y-1.5">
          {cons.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-slate-900">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────── */

const STEPS = [
  { icon: Key, title: "Connect", desc: "Add your Storefront API token to .env" },
  { icon: Database, title: "Fetch", desc: "A _data file pulls your catalog at build" },
  { icon: Layers, title: "Render", desc: "A shop page loops over the products" },
  { icon: CreditCard, title: "Sell", desc: "Cart API builds the cart, Shopify hosts checkout" },
];

const APPROACHES = [
  {
    icon: Zap,
    accent: "bg-blue-50",
    badge: "Easiest",
    badgeClass: "bg-blue-100 text-slate-700",
    title: "Shopify Buy Button",
    desc: "Drop Shopify's embeddable button into a page. No data fetching, no build step — Shopify owns the cart and checkout.",
    href: "#buy-button",
  },
  {
    icon: Settings2,
    accent: "bg-blue-50",
    badge: "Recommended",
    badgeClass: "bg-blue-100 text-slate-700",
    title: "Storefront API",
    desc: "Fetch products at build time and render them with the kit's own Nunjucks templates for a fast, fully custom storefront.",
    href: "#storefront-api",
  },
];

const BUY_BUTTON_STEPS = [
  "In your Shopify admin, install the Buy Button sales channel.",
  "Generate a Buy Button for a product or collection.",
  "Copy the JavaScript snippet Shopify gives you.",
  "Create a page in src/content/pages/ that extends the base layout.",
  "Paste the snippet inside its body block.",
];

const BUY_BUTTON_EMBED = `---
title: "Shop | Eleventy Starter Template"
permalink: "/shop/"
lang: en
---

{% extends "layouts/base.html" %}

{% block body %}
  <div id="product-component-1234567890"></div>

  <script type="text/javascript">
  /*<![CDATA[*/
  (function () {
    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    if (window.ShopifyBuy && window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      var script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = ShopifyBuyInit;
    }
    function ShopifyBuyInit() {
      var client = ShopifyBuy.buildClient({
        domain: 'your-store.myshopify.com',
        storefrontAccessToken: 'your-storefront-token',
      });
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: 'YOUR_PRODUCT_ID',
          node: document.getElementById('product-component-1234567890'),
        });
      });
    }
  })();
  /*]]>*/
  </script>
{% endblock %}`;

const ENV_SETUP = `# .env  —  add ".env" to your .gitignore, never commit it
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_public_storefront_token
SHOPIFY_API_VERSION=2025-01`;

const DATA_FILE = `// src/_data/products.js — runs once at build time
require("dotenv").config();

const endpoint = \`https://\${process.env.SHOPIFY_STORE_DOMAIN}/api/\${process.env.SHOPIFY_API_VERSION}/graphql.json\`;

const QUERY = \`{
  products(first: 50) {
    edges {
      node {
        id
        title
        handle
        description
        featuredImage { url altText }
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 1) { edges { node { id } } }
      }
    }
  }
}\`;

module.exports = async function () {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: QUERY }),
  });

  const { data } = await res.json();

  // Flatten the GraphQL edges into a template-friendly shape. Every
  // template can now read the result as a global \`products\` array.
  return data.products.edges.map(({ node }) => ({
    title: node.title,
    handle: node.handle,
    description: node.description,
    image: node.featuredImage,
    price: node.priceRange.minVariantPrice,
    variantId: node.variants.edges[0].node.id,
  }));
};`;

const SHOP_PAGE = `---
title: "Shop | Eleventy Starter Template"
description: "Browse our products"
permalink: "/shop/"
lang: en
---

{% extends "layouts/base.html" %}

{% block head %}
  <link rel="stylesheet" href="/assets/css/shop.css">
  <script defer src="/assets/js/shop.js"></script>
{% endblock %}

{% block body %}
  <section id="shop">
    <ul class="products">
      {% for product in products %}
      <li class="product">
        <img src="{{ product.image.url }}" alt="{{ product.image.altText }}" width="400" height="400">
        <h2>{{ product.title }}</h2>
        <p>{{ product.price.amount }} {{ product.price.currencyCode }}</p>
        <button class="buy" data-variant-id="{{ product.variantId }}">Add to cart</button>
      </li>
      {% endfor %}
    </ul>
  </section>
{% endblock %}`;

const CART_FLOW = `// src/assets/js/shop.js — passthrough-copied to /assets/js/shop.js
const DOMAIN = "your-store.myshopify.com";
const TOKEN = "your_public_storefront_token"; // Storefront token — safe in client code
const API_VERSION = "2025-01";

async function checkout(variantId) {
  const res = await fetch(\`https://\${DOMAIN}/api/\${API_VERSION}/graphql.json\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({
      query: \`mutation Create($id: ID!) {
        cartCreate(input: { lines: [{ merchandiseId: $id, quantity: 1 }] }) {
          cart { checkoutUrl }
        }
      }\`,
      variables: { id: variantId },
    }),
  });

  const { data } = await res.json();
  // Hand the buyer off to Shopify's hosted, PCI-compliant checkout.
  window.location.href = data.cartCreate.cart.checkoutUrl;
}

document.querySelectorAll(".buy").forEach((btn) =>
  btn.addEventListener("click", () => checkout(btn.dataset.variantId))
);`;



/* ── Page ────────────────────────────────────────────────── */

export default function StartEcommerce() {
  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl text-slate-700 ml-6">
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
        <span aria-current="page">Start an Ecommerce Store</span>
      </nav>

      {/* Hero */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          E-commerce with Shopify
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          This starter is a fast, content-driven 11ty site — styled with LESS, edited through Decap
          CMS, and deployed on Netlify. It doesn&apos;t ship a store, but Shopify is happy to own the
          hard parts — cart, payments, and fulfilment — so adding commerce mostly comes down to
          pulling product data in and dropping a buy button on a page. There are two ways in: a{" "}
          <strong>Buy Button</strong> for the quickest path, or the{" "}
          <Ext href="https://shopify.dev/docs/api/storefront">Storefront API</Ext> to fetch products
          at build time and render a fully custom storefront.
        </p>
      </header>

      {/* Before you start */}
      <div className="mb-10">
        <Callout tone="amber" icon={Clock} title="Before you start">
          <p className="mb-3">
            Make sure you&apos;ve cloned the starter and have the dev server running with{" "}
            <Code>npm start</Code>. New to the kit? Walk through the quick build tutorial first.
          </p>
          <Link
            href="/docs/eleventy/tutorials/build-in-5-minutes"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-100"
          >
            Build in 5 minutes <ArrowRight className="h-4 w-4" />
          </Link>
        </Callout>
      </div>

      {/* Choose your approach */}
      <div className="mb-12">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">Two ways to add Shopify</h2>
        <p className="mb-5 text-sm text-slate-600">
          Pick the approach that matches the project. Start with the Buy Button for the quickest
          path, or go headless with the Storefront API for a fully custom, pre-rendered storefront.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {APPROACHES.map(({ icon: Icon, accent, badge, badgeClass, title, desc, href }) => (
            <a
              key={title}
              href={href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-700 ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}>
                  {badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition-all group-hover:gap-2">
                Jump to setup <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Option 1: Buy Button */}
      <div id="buy-button" className="scroll-mt-6">
        <SectionCard
          icon={Zap}
          accent="bg-blue-50"
          title="Option 1: Shopify Buy Button"
          subtitle="The easiest way to sell — an embeddable button that works on any static page."
        >
          <p className="text-sm">
            Shopify generates an embeddable product button you can paste into any page. Shopify hosts
            the cart and checkout, so there&apos;s no data fetching and nothing to configure in the
            build — it&apos;s pure client-side JavaScript that works as-is on a static 11ty site.
          </p>

          <div>
            <h3 className="mb-3 text-sm font-bold text-slate-900">Steps</h3>
            <ol className="space-y-2">
              {BUY_BUTTON_STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-slate-700">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">Example shop page</h3>
            <p className="mb-3 text-sm">
              Create a page in <Code>src/content/pages/</Code> that extends the base layout, then
              paste Shopify&apos;s snippet inside <Code>{"{% block body %}"}</Code>. Swap in your
              store domain, Storefront access token, and product ID.
            </p>
            <CodeBlock code={BUY_BUTTON_EMBED} />
          </div>

          <ProsCons
            pros={["Very fast to set up", "No data fetching or build step", "Shopify handles cart and checkout"]}
            cons={["Limited customization", "Renders client-side, not pre-rendered"]}
          />
        </SectionCard>
      </div>

      {/* Option 2 heading */}
      <div id="storefront-api" className="mb-12 mt-12 scroll-mt-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            Recommended
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Option 2: Storefront API</h2>
        </div>
        <p className="mb-8 text-sm text-slate-600">
          The headless approach: 11ty fetches your catalog once at build time and renders it with its
          own Nunjucks templates, so product pages ship as static HTML. Shopify still owns the cart
          and checkout. Everything below covers this path.
        </p>
        <h3 className="mb-5 text-lg font-bold text-slate-900">How it works</h3>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="relative rounded-xl border border-slate-200 bg-white p-5">
              <span className="absolute -left-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-slate-700">
                {i + 1}
              </span>
              <div className="mb-3 inline-flex rounded-lg bg-blue-50 p-2">
                <Icon className="h-4 w-4 text-slate-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-xs text-slate-500">{desc}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-8">
        {/* Connecting your store */}
        <SectionCard
          icon={Key}
          accent="bg-blue-50"
          title="Connecting your store"
          subtitle="Generate a Storefront access token and keep it in your environment."
        >
          <p className="text-sm">
            In your Shopify admin, go to <Code>Settings → Apps and sales channels → Develop apps →
            Create an app → Storefront API</Code> and grant read access to products. Copy the
            Storefront access token it generates.
          </p>
          <div>
            <p className="mb-3 text-sm">
              Store it in a <Code>.env</Code> file, add <Code>.env</Code> to <Code>.gitignore</Code>{" "}
              (it isn&apos;t ignored by default), and load it with{" "}
              <Ext href="https://www.npmjs.com/package/dotenv">dotenv</Ext> so the build can read it
              — <Code>npm install dotenv</Code>.
            </p>
            <CodeBlock code={ENV_SETUP} />
          </div>
          <p className="text-sm">
            Deploying on Netlify? Add the same variables under <Code>Site settings → Environment
            variables</Code> so production builds can reach Shopify.
          </p>
          <Callout tone="green" icon={ShieldCheck} title="The Storefront token is safe in client code">
            The Storefront access token is publicly exposed in client-side code by design and is safe
            for that. Don&apos;t confuse it with the <strong>Admin API</strong> key, which can write
            to your store — that one must never ship to the browser.
          </Callout>
        </SectionCard>

        {/* Fetch products */}
        <SectionCard
          icon={Database}
          accent="bg-blue-50"
          title="Fetch products at build time"
          subtitle="A global data file pulls your catalog once per build."
        >
          <p className="text-sm">
            Add a global data file at <Code>src/_data/products.js</Code>, following the same pattern
            as the kit&apos;s existing <Code>client.js</Code>. Because it lives in <Code>_data</Code>,
            11ty runs it once per build and exposes the return value to every template as a{" "}
            <Code>products</Code> array. Node 18+ (which Eleventy 3 requires) has a global{" "}
            <Code>fetch</Code>, so no extra HTTP library is needed.
          </p>
          <CodeBlock code={DATA_FILE} />
          <p className="text-sm">
            Extend the query with any fields your store needs from the{" "}
            <Ext href="https://shopify.dev/docs/api/storefront/latest/queries/products">
              Storefront API reference
            </Ext>
            .
          </p>
        </SectionCard>

        {/* Render the shop page */}
        <SectionCard
          icon={Package}
          accent="bg-blue-50"
          title="Render the shop page"
          subtitle="Loop over the products with the kit's own page convention."
        >
          <p className="text-sm">
            Create <Code>src/content/pages/shop.html</Code> — the same convention the starter uses
            for About, Contact, and the rest. It extends the base layout and loops over the{" "}
            <Code>products</Code> array to render a card per item, loading a small cart script with{" "}
            <Code>{"<script defer>"}</Code> in its head block.
          </p>
          <CodeBlock code={SHOP_PAGE} />
          <Callout tone="blue" icon={Info} title="Use a plain <img> for product images">
            Product images are remote Shopify URLs, so a normal <Code>{"<img>"}</Code> is right here.
            The kit&apos;s <Code>{"{% image %}"}</Code> shortcode is for optimising{" "}
            <em>local</em> files in <Code>src/assets</Code> — it can&apos;t process a remote URL.
          </Callout>
        </SectionCard>

        {/* Cart & checkout */}
        <SectionCard
          icon={MousePointerClick}
          accent="bg-blue-50"
          title="Cart & Checkout"
          subtitle="Each Add-to-cart button creates a cart and redirects to Shopify."
        >
          <p className="text-sm">
            The button on each product only has to do one thing: create a cart and send the shopper
            to Shopify&apos;s checkout. Add a script at <Code>src/assets/js/shop.js</Code> (everything
            under <Code>src/assets</Code> is passthrough-copied to <Code>/assets</Code>). It creates a
            cart with the{" "}
            <Ext href="https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage">
              Storefront Cart API
            </Ext>{" "}
            and follows the <Code>checkoutUrl</Code> it returns.
          </p>
          <CodeBlock code={CART_FLOW} />
          
          <ProsCons
            pros={["Full control over markup and styling", "Products pre-rendered as static HTML", "Fast and SEO-friendly"]}
            cons={["Requires API integration", "Rebuild needed when products change"]}
          />
        </SectionCard>

      </div>

      {/* Next steps */}
      <footer className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-8 text-slate-700">
        <div className="mb-3 flex items-center gap-3">
          <ShoppingBag className="h-7 w-7" />
          <h2 className="text-2xl font-bold">Your store is ready</h2>
        </div>
        <p className="mb-6 text-slate-600">
          Products fetched at build time, rendered with your own Nunjucks templates, and a Cart API
          button handing shoppers off to Shopify&apos;s hosted checkout — all on top of the static
          11ty site you already have.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="https://shopify.dev/docs/api/storefront"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-5 py-2.5 font-semibold transition-colors hover:bg-blue-100"
          >
            <Database className="h-4 w-4" /> Storefront API Docs
          </Link>
          <Link
            href="/docs/eleventy/deployment"
            className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-5 py-2.5 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            <Rocket className="h-4 w-4" /> Deployment Guide
          </Link>
        </div>
      </footer>
      </div>
    </div>
  );
}
