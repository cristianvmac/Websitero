"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import {
  ShoppingBag, Key, Database, Code2, CreditCard,
  Info, Check, Copy, Layers, Package,
  Rocket, ArrowRight, Clock, MousePointerClick,
  Zap, Settings2, X, Terminal, FolderTree,
  AlertTriangle, ShieldCheck, Store, type LucideIcon,
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
        {copied ? <Check className="h-4 w-4 text-gray-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

const CALLOUT_TONES = {
  amber: "bg-blue-50 border-blue-200 text-gray-900",
  blue: "bg-blue-50 border-blue-200 text-gray-900",
  green: "bg-blue-50 border-blue-200 text-gray-900",
  red: "bg-blue-50 border-blue-200 text-gray-900",
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
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-gray-700 ${accent}`}>
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
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-600 underline underline-offset-2">
      {children}
    </a>
  );
}

function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="mb-2 text-sm font-bold text-gray-900">Pros</p>
        <ul className="space-y-1.5">
          {pros.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-gray-900">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="mb-2 text-sm font-bold text-gray-900">Cons</p>
        <ul className="space-y-1.5">
          {cons.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-gray-900">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
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
  { icon: Key, title: "Connect", desc: "Supply your Storefront API credentials" },
  { icon: Database, title: "Fetch", desc: "Fresh product data is pulled at build time" },
  { icon: Layers, title: "Render", desc: "Listing & detail pages generate automatically" },
  { icon: CreditCard, title: "Sell", desc: "Cart API builds the cart, Shopify hosts checkout" },
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

const BUY_BUTTON_EMBED = `---
// src/components/Product.astro
---

<div id="product-component"></div>

<script>
  const client = ShopifyBuy.buildClient({
    domain: "your-store.myshopify.com",
    storefrontAccessToken: "YOUR_TOKEN",
  });

  ShopifyBuy.UI.onReady(client).then((ui) => {
    ui.createComponent("product", {
      id: "123456789",
      node: document.getElementById("product-component"),
    });
  });
</script>`;

const BUTTON_SETUP = `---
// src/pages/products/[handle].astro
import BuyButton from "../../components/BuyButton.astro";

// Pass the variant's global ID; drop the button wherever you like.
const variantId = "gid://shopify/ProductVariant/1234567890";
---

<BuyButton variantId={variantId} quantity={1} />`;

const CART_FLOW = `// On click, create a cart for the chosen variant…
const res = await storefront(\`
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { field message }
    }
  }
\`, { lines: [{ merchandiseId: variantId, quantity }] });

// …then hand the buyer off to Shopify's hosted checkout.
window.location.href = res.data.cartCreate.cart.checkoutUrl;`;

const APPROACHES = [
  {
    icon: Zap,
    accent: "bg-blue-50",
    badge: "Easiest",
    badgeClass: "bg-blue-100 text-gray-700",
    title: "Shopify Buy Button",
    desc: "Drop an embeddable, Shopify-generated button onto any static page. Shopify owns the cart and checkout.",
    href: "#buy-button",
  },
  {
    icon: Settings2,
    accent: "bg-blue-50",
    badge: "Recommended",
    badgeClass: "bg-blue-100 text-gray-700",
    title: "Storefront API",
    desc: "A fully custom, headless storefront. Fetch products at build time and hand checkout off to Shopify.",
    href: "#storefront-api",
  },
];

const BUY_BUTTON_STEPS = [
  "Create a Shopify store.",
  "Install the Buy Button sales channel.",
  "Create a Buy Button for a product.",
  "Copy the generated JavaScript snippet.",
  "Paste it into an Astro component.",
];

const ENV_SETUP = `# .env  —  copy from .env.example, then fill in your values
PUBLIC_SHOPIFY_STORE_URL=your-store.myshopify.com
PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_public_access_token
PRIVATE_SHOPIFY_STOREFRONT_TOKEN=your_private_access_token`;

const INSTALL_RUN = `# Install dependencies
npm install        # or: yarn  /  pnpm install

# Start the dev server
npm run dev        # or: yarn dev  /  pnpm dev`;

const CONFIG_TS = `// src/utils/config.ts
// Credentials are read here from your .env file.
// Bump the Storefront API version whenever you need newer fields.
export const SHOPIFY_API_VERSION = "2024-10";`;

const SHOPIFY_SETUP_STEPS = [
  {
    title: "Create or sign in to a Shopify account",
    body: (
      <>
        Use an existing store or create a new one at{" "}
        <Ext href="https://accounts.shopify.com/store-login">accounts.shopify.com</Ext>.
      </>
    ),
  },
  {
    title: "Add the Headless sales channel",
    body: <>From your store admin, add the Shopify <strong>Headless</strong> channel, then click <strong>Add Storefront</strong>.</>,
  },
  {
    title: "Copy your access tokens",
    body: <>Copy the <strong>public</strong> and <strong>private</strong> access tokens into your <Code>.env</Code> file.</>,
  },
  {
    title: "Set your Storefront API access scopes",
    body: (
      <>
        Check <strong>Storefront API access scopes</strong>. <Code>unauthenticated_read_product_listings</Code>{" "}
        and <Code>unauthenticated_read_product_inventory</Code> are enough to get started — add more
        scopes if you need additional permissions.
      </>
    ),
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

const PROJECT_STRUCTURE = `/
├── public/
├── src/
│   ├── components/
│   │   └── Header.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── stores/
│   │   └── cart.ts
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── shopify.ts
└── package.json`;

/* ── Page ────────────────────────────────────────────────── */

export default function StartEcommerce() {
  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6 text-slate-700">
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
        <span aria-current="page">Start an Ecommerce Store</span>
      </nav>

      {/* Hero */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Ecommerce with Shopify
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          The Shopify branch instantly adds a shop to your site by simply supplying{" "}
          <Ext href="https://shopify.dev/docs/api/storefront">Storefront API</Ext>  {" "} credentials. At
          build time, fresh data from the Shopify backend is fetched and used to dynamically render
          pages with full cart and checkout functionality.
        </p>
      </header>

      {/* Before you start */}
      <div className="mb-10">
        <Callout tone="amber" icon={Clock} title="Before you start">
          <p className="mb-3">
            Make sure you&apos;ve cloned the template and have the dev server running. If not,
            start with the quick build tutorial.
          </p>
          <Link
            href="/docs/astro/tutorials/build-in-5-minutes"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3.5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-blue-100"
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
          path, or go headless with the Storefront API for a fully custom storefront.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {APPROACHES.map(({ icon: Icon, accent, badge, badgeClass, title, desc, href }) => (
            <a
              key={title}
              href={href}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-700 ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}>
                  {badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 group-hover:gap-2 transition-all">
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
          subtitle="The easiest way to sell — an embeddable button that works on any static site."
        >
          <p className="text-sm">
            Shopify generates embeddable product buttons that drop into any page. Shopify handles the
            cart and checkout entirely, so there&apos;s no backend logic to wire up — you just paste a
            snippet where you want the button to appear.
          </p>

          <div>
            <h3 className="mb-3 text-sm font-bold text-slate-900">Steps</h3>
            <ol className="space-y-2">
              {BUY_BUTTON_STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-gray-700">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">Example Astro component</h3>
            <p className="mb-3 text-sm">
              Paste the snippet Shopify generates into a component, then render it on any page. Swap in
              your store domain, Storefront access token, and product ID.
            </p>
            <CodeBlock code={BUY_BUTTON_EMBED} />
          </div>

          <ProsCons
            pros={["Fastest setup", "Shopify handles cart and checkout"]}
            cons={["Limited customization", "Doesn't feel fully integrated"]}
          />
        </SectionCard>
      </div>

      {/* Option 2 heading */}
      <div id="storefront-api" className="mb-12 mt-12 scroll-mt-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
            Recommended
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Option 2: Storefront API</h2>
        </div>
        <p className="mb-8 text-sm text-slate-600">
          The most common headless Shopify + Astro setup. Astro stays static and excellent at
          performance, while Shopify still handles payments. Everything below covers this approach.
        </p>
        <h3 className="mb-5 text-lg font-bold text-slate-900">How the store works</h3>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="relative rounded-xl border border-slate-200 bg-white p-5">
              <span className="absolute -left-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-gray-700">
                {i + 1}
              </span>
              <div className="mb-3 inline-flex rounded-lg bg-blue-50 p-2">
                <Icon className="h-4 w-4 text-gray-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              <p className="mt-1 text-xs text-slate-500">{desc}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-8">
        {/* Where to start */}
        <SectionCard
          icon={Terminal}
          accent="bg-blue-50"
          title="Where to start"
          subtitle="Add your credentials, install dependencies, and run the dev server."
        >
          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">1. Create your .env file</h3>
            <p className="mb-3 text-sm">
              Copy <Code>.env.example</Code> to <Code>.env</Code> and add your Shopify store URL
              along with your public and private access tokens.
            </p>
            <CodeBlock code={ENV_SETUP} />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">2. Review the config</h3>
            <p className="mb-3 text-sm">
              The credentials are consumed inside <Code>src/utils/config.ts</Code>. You can bump the
              Storefront API version there whenever you need newer fields.
            </p>
            <CodeBlock code={CONFIG_TS} />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">3. Install &amp; run</h3>
            <p className="mb-3 text-sm">
              Install dependencies with your package manager of choice, then start the dev server.
            </p>
            <CodeBlock code={INSTALL_RUN} />
          </div>
        </SectionCard>

        {/* Shopify configuration guide */}
        <SectionCard
          icon={Store}
          accent="bg-blue-50"
          title="Shopify Configuration Guide"
          subtitle="Connect a Shopify store and grant the Storefront API the right scopes."
        >
          <ol className="space-y-4">
            {SHOPIFY_SETUP_STEPS.map(({ title, body }, i) => (
              <li key={title} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-gray-700">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <p className="mt-0.5 text-sm text-slate-600">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Callout tone="green" icon={ShieldCheck} title="Minimum scopes to get started">
            <Code>unauthenticated_read_product_listings</Code> and{" "}
            <Code>unauthenticated_read_product_inventory</Code> cover product browsing and stock.
            Add more scopes only as your storefront needs them.
          </Callout>
        </SectionCard>

        {/* What's included */}
        <SectionCard
          icon={ShoppingBag}
          accent="bg-blue-50"
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
                <Icon className="mb-2 h-5 w-5 text-gray-600" />
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
          accent="bg-blue-50"
          title="Cart & Checkout"
          subtitle="Wiring up cart and checkout takes two lines."
        >
          <p className="text-sm">
            Setting up button functionality is as simple as defining the variant ID on the page and
            specifying where you want the button to render. On click, the component creates a cart
            with the{" "}
            <Ext href="https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage">
              Storefront Cart API
            </Ext>{" "}
            and redirects the customer to the <Code>checkoutUrl</Code> it returns, landing them on
            Shopify&apos;s hosted checkout.
          </p>
          <CodeBlock code={BUTTON_SETUP} />
          <p className="text-sm">
            Under the hood, the component runs a <Code>cartCreate</Code> mutation and follows the
            returned URL:
          </p>
          <CodeBlock code={CART_FLOW} />
          <Callout tone="blue" icon={Info} title="Finding the variant ID">
            Grab the variant&apos;s global ID (<Code>gid://shopify/ProductVariant/…</Code>) from the{" "}
            <Code>variants</Code> field in the Storefront API response. The Cart API takes a{" "}
            <Code>merchandiseId</Code> (a variant), not a product ID.
          </Callout>
          <ProsCons
            pros={[
              "Fully custom storefront",
              "Excellent performance",
              "Astro stays static",
              "Shopify handles payments",
            ]}
            cons={["More development work"]}
          />
        </SectionCard>

        {/* Project structure */}
        <SectionCard
          icon={FolderTree}
          accent="bg-blue-50"
          title="Project Structure"
          subtitle="Where everything lives inside the template."
        >
          <CodeBlock code={PROJECT_STRUCTURE} />
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
              <span>
                Astro looks for <Code>.astro</Code> or <Code>.md</Code> files in{" "}
                <Code>src/pages/</Code>. Each file is exposed as a route based on its name.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
              <span>
                <Code>src/components/</Code> is where Astro/React/Vue/Svelte/Preact components live —
                there&apos;s nothing special about it, it&apos;s just convention.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" />
              <span>
                Static assets like images go in <Code>public/</Code>, and{" "}
                <Code>src/utils/shopify.ts</Code> holds the Storefront API helpers and cart logic.
              </span>
            </li>
          </ul>
        </SectionCard>
      </div>

      {/* Next steps */}
      <footer className="mt-12 rounded-2xl bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 p-4 text-gray-700">
        <div className="mb-3 flex items-center gap-3">
          <ShoppingBag className="h-7 w-7" />
          <h2 className="text-xl font-bold">Your store is ready</h2>
        </div>
        <p className="mb-6 text-gray-600">
          A lightning-fast Shopify-powered storefront.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="https://shopify.dev/docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-5 py-2.5 font-semibold transition-colors hover:bg-blue-100"
          >
            <Database className="h-4 w-4" /> Shopify Docs
          </Link>
          <Link
            href="/docs/astro/deployment"
            className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-5 py-2.5 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
          >
            <Rocket className="h-4 w-4" /> Deployment Guide
          </Link>
        </div>
      </footer>
      </div>
    </div>
  );
}