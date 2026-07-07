"use client";

import {
  Layout,
  FileCode,
  Sparkles,
  Copy,
  Check,
  Rocket,
  ArrowRight,
  Image,
  Layers,
  Star,
  LayoutGrid,
  
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function OthersToAdd() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const components = [
    {
      name: "Navigation / Header",
      description: "DynamicHeader (data-driven via navData.json) and StaticHeader",
      file: "src/components/Header/",
      icon: Layout,
      color: "purple",
    },
    {
      name: "Hero",
      description: "Eye-catching hero sections with CTA buttons",
      file: "src/components/Hero/Hero.astro",
      icon: Sparkles,
      color: "blue",
    },
    {
      name: "Services",
      description: "Services section",
      file: "src/components/Services/Services.astro",
      icon: Sparkles,
      color: "blue",
    },
    {
      name: "About",
      description: "Two-column about section with a stacked image layout on the left and content on the right, featuring a topper, heading, body text, a highlighted quote block with attribution, and a CTA button.",
      file: "src/components/About/About.astro",
      icon: Sparkles,
      color: "blue",
    },
    {
      name: "Side By Side",
      description: "Two-column content section with the image stack on the right and text on the left on desktop, featuring a topper, heading, and body text paragraphs.",
      file: "src/components/side-by-side/",
      icon: Rocket,
      color: "red",
    },
    {
      name: "Gallery",
      description: "Responsive image gallery grid",
      file: "src/components/Gallery/Gallery.astro",
      icon: LayoutGrid,
      color: "purple",
    },
    {
      name: "Reviews",
      description: "Star-rated client reviews and testimonial cards",
      file: "src/components/Reviews/Reviews.astro",
      icon: Star,
      color: "yellow",
    },
    {
      name: "FAQ",
      description: "Accordion-style FAQ section with client-side interactivity",
      file: "src/components/FAQ/FAQ.astro",
      icon: FileCode,
      color: "orange",
    },
    {
      name: "CTA",
      description: "Two variants: CTASimple.astro and CTAArtDirection.astro",
      file: "src/components/CTA/",
      icon: Rocket,
      color: "red",
    },
    {
      name: "Footer",
      description: "Footer with optional newsletter subscribe section",
      file: "src/components/Footer/",
      icon: Layers,
      color: "pink",
    },
    
  ];

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-700",
    pink: "bg-pink-100 text-pink-700",
    gray: "bg-gray-100 text-gray-700",
    teal: "bg-teal-100 text-teal-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  const iconBgClasses: Record<string, string> = {
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    green: "bg-green-600",
    orange: "bg-orange-500",
    red: "bg-red-600",
    pink: "bg-pink-500",
    gray: "bg-gray-700",
    teal: "bg-teal-600",
    yellow: "bg-yellow-500",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
            Astro
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
            Tutorials
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
            Landing page
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Build Landing Pages in Minutes
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-6">
           Use the{" "}
          <Link
            href="https://github.com/cristianvmac/Astro-Starter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-semibold"
          >
           Astro Starter Kit 
          </Link>{" "}
           to spin up a fully responsive landing page from scratch.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="#components"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            <Layout className="w-5 h-5" />
            View Components
          </Link>
          <Link
            href="#example"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-lg transition-colors border-2 border-gray-200"
          >
            <FileCode className="w-5 h-5" />
            See Example
          </Link>
        </div>
      </div>

      {/* Components List */}
      <div id="components" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Available Components
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          All components follow the component-per-folder pattern inside{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">src/components/</code>
          . Each folder can hold multiple variants — for example,{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">CTA/</code> ships both{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">CTASimple.astro</code>{" "}
          and{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            CTAArtDirection.astro
          </code>
          .
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {components.map((component, index) => {
            const Icon = component.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 ${colorClasses[component.color]} rounded-lg shrink-0`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {component.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{component.description}</p>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {component.file}
                    </code>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Want to see all components in action?
          </h3>
          <p className="text-blue-800 mb-4">
            Check out the components showcase page to see live examples of every
            component with interactive demos.
          </p>
          <Link
            href="/docs/astro/components"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            View Component Library
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>




      {/* Image Optimization */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-teal-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Image className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Image Optimization
            </h2>
            <p className="text-lg text-gray-600">
              Store images in{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">src/assets/</code>{" "}
              and use the built-in{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">{`<Picture />`}</code>{" "}
              component — Astro handles the rest
            </p>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-72 overflow-y-auto">
          <pre className="whitespace-pre-wrap">
            <code>{`---
import { Picture } from "astro:assets";
import heroImage from "@assets/images/hero.jpg";
---

<Picture
  src={heroImage}
  alt="Hero image"
  width={1200}
  formats={["avif", "webp"]}
  priority
  pictureAttributes={{ class: "cs-picture" }}
/>`}</code>
          </pre>
          <button
            onClick={() =>
              copyToClipboard(
                `---
import { Picture } from "astro:assets";
import heroImage from "@assets/images/hero.jpg";
---

<Picture
  src={heroImage}
  alt="Hero image"
  width={1200}
  formats={["avif", "webp"]}
  priority
  pictureAttributes={{ class: "cs-picture" }}
/>`,
                4
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 4 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
        <ul className="mt-4 text-sm text-gray-600 space-y-1">
          <li>
            • <code className="bg-gray-100 px-1 rounded">formats</code> — output
            AVIF and WebP automatically
          </li>
          <li>
            • <code className="bg-gray-100 px-1 rounded">priority</code> — sets{" "}
            <code className="bg-gray-100 px-1 rounded">fetchpriority=&quot;high&quot;</code>{" "}
            and adds a preload link for above-the-fold images
          </li>
          <li>
            • <code className="bg-gray-100 px-1 rounded">layout: constrained</code>{" "}
            (default in astro.config.mjs) — responsive{" "}
            <code className="bg-gray-100 px-1 rounded">srcset</code> generated
            automatically
          </li>
          <li>
            • CMS-uploaded blog images go to{" "}
            <code className="bg-gray-100 px-1 rounded">
              src/assets/images/blog/
            </code>{" "}
            and are fully optimizable
          </li>
        </ul>
      </div>
      {/* Customization Tips - keep or not think about it*/}
      {/* Perhaps make small guides for all these  */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Customization Tips
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🎨 Design Tokens
            </h3>
            <p className="text-gray-700 mb-3">
              Site-wide colors, fonts, and spacing live in{" "}
              <code className="bg-purple-200 px-2 py-0.5 rounded text-sm">
                src/styles/root.less
              </code>
              . Dark mode overrides are defined alongside them using the{" "}
              <code className="bg-purple-200 px-2 py-0.5 rounded text-sm">
                [data-theme=&quot;dark&quot;]
              </code>{" "}
              selector.
            </p>
            <Link
              href="/docs/styling"
              className="text-purple-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              Styling guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🏢 Your Business Info
            </h3>
            <p className="text-gray-700 mb-3">
              Edit{" "}
                <code className="bg-blue-200 px-2 py-0.5 rounded text-sm">
                  src/data/client.ts
                </code>{" "}
                  to set your business name, contact details, and social links once —
                  they&apos;re pulled in across every page and component.
            </p>
            <Link
              href="/docs/pages"
              className="text-blue-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              Page & data guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              📝 Configure the CMS
            </h3>
            <p className="text-gray-700 mb-3">
              Edit{" "}
                <code className="bg-green-200 px-2 py-0.5 rounded text-sm">
                  public/admin/config.yml
                </code>{" "}
                  to adjust collections, fields, and media uploads. Blog posts live in{" "}
                <code className="bg-green-200 px-2 py-0.5 rounded text-sm">
                  src/content/blog/
                </code>
                  . Authentication is handled via{" "}
            <Link
              href="https://decapbridge.com"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              decapbridge.com
            </Link>
            .
            </p>
            <Link
              href="/docs/cms"
              className="text-green-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              CMS guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🚀 Ready to Deploy?
            </h3>
            <p className="text-gray-700 mb-3">
              Update{" "}
              <code className="bg-orange-200 px-2 py-0.5 rounded text-sm">
                site
              </code>{" "}
                in{" "}
              <code className="bg-orange-200 px-2 py-0.5 rounded text-sm">
                astro.config.mjs
              </code>{" "}
                and{" "}
              <code className="bg-orange-200 px-2 py-0.5 rounded text-sm">
                public/robots.txt
              </code>
                , then push to GitHub and deploy on Netlify — build caching is
                preconfigured in{" "}
              <code className="bg-orange-200 px-2 py-0.5 rounded text-sm">
                netlify.toml
              </code>
              .
            </p>
            <Link
              href="/docs/deployment"
              className="text-orange-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              Deploy your site
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>     
      
     

      {/* Next Steps */}
      <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          You now have everything you need to create fast, SEO-optimized landing
          pages with Astro Starter Kit — complete with a CMS-powered blog your clients
          can manage themselves.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/docs/astro/tutorials/build-in-5-minutes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            <Rocket className="w-5 h-5" />
            Build in 5 Minutes
          </Link>
          <Link
            href="/docs/astro/components"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-lg transition-colors"
          >
            <Layout className="w-5 h-5" />
            Explore All Components
          </Link>
        </div>
      </div>
    </div>
  );
}

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