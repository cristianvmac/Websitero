"use client";

import Link from "next/link";
import {
  Layout,FileCode,Copy, Check, Clock,Eye, Rocket, ArrowRight} from "lucide-react";
import { useState } from "react";


export default function LandingPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
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
      </div>

      {/* Quick Start */}
      {/* Before You Start */}
      <div className="mb-12 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
        <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Before You Start
        </h3>
        <p className="text-yellow-800 mb-4">
          Make sure that you have you&apos;ve read the initial setup guide.
        </p>
        <Link
          href="/docs/astro/quick-setup"
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          See Quick Setup
        </Link>
      </div>

      {/* Example Landing Page */}
      <div id="example" className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Example Landing Page
            </h2>
            <p className="text-lg text-gray-600">
              A complete page assembled from components — start here or copy{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                src/pages/_template.astro
              </code>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Create your landing page
            </h3>
            <p className="text-gray-600 mb-4">
              Go to{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                src/pages/index.astro
              </code>{" "}
              and adjust the components as you need:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-150 overflow-y-auto">
              <pre className="whitespace-pre-wrap">
                <code>{`---
---
// Utils
import { getImage } from "astro:assets";

// Components
import BaseLayout from "@layouts/BaseLayout.astro";
import Hero from "@components/Hero/Hero.astro";
import Services from "@components/Services/Services.astro";
import SideBySide from "@components/SideBySide/SideBySide.astro";
import SideBySideReverse from "@components/SideBySideReverse/SideBySideReverse.astro";
import Gallery from "@components/Gallery/Gallery.astro";
import Testimonials from "@components/Testimonials/Testimonials.astro";
import FAQ from "@components/FAQ/FAQ.astro";
import CTASimple from "@components/CTA/CTASimple.astro";

// Optimize our landing image and pass it as props to the BaseLayout (for preloading) and Banner (for rendering)
import heroImage from "@assets/images/hero/hero3.jpg";

const optimizedHeroImage = await getImage({ src: heroImage, format: "webp" });
---

<BaseLayout title="Boilerplate" description="Meta description for the page" heroImage={optimizedHeroImage}>
	<Hero image={optimizedHeroImage} />
	<Services />
	<SideBySide />
	<SideBySideReverse />
	<Gallery />
	<Testimonials />
	<FAQ />
	<CTASimple />
</BaseLayout>

`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(
                    `---
---
// Utils
import { getImage } from "astro:assets";

// Components
import BaseLayout from "@layouts/BaseLayout.astro";
import Hero from "@components/Hero/Hero.astro";
import Services from "@components/Services/Services.astro";
import SideBySide from "@components/SideBySide/SideBySide.astro";
import SideBySideReverse from "@components/SideBySideReverse/SideBySideReverse.astro";
import Gallery from "@components/Gallery/Gallery.astro";
import Testimonials from "@components/Testimonials/Testimonials.astro";
import FAQ from "@components/FAQ/FAQ.astro";
import CTASimple from "@components/CTA/CTASimple.astro";

// Optimize our landing image and pass it as props to the BaseLayout (for preloading) and Banner (for rendering)
import heroImage from "@assets/images/hero/hero3.jpg";

const optimizedHeroImage = await getImage({ src: heroImage, format: "webp" });
---

<BaseLayout title="Boilerplate" description="Meta description for the page" heroImage={optimizedHeroImage}>
	<Hero image={optimizedHeroImage} />
	<Services />
	<SideBySide />
	<SideBySideReverse />
	<Gallery />
	<Testimonials />
	<FAQ />
	<CTASimple />
</BaseLayout>

`,
                    3
                  )
                }
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

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-blue-900 font-medium mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Preview Your Landing Page
            </p>
            <p className="text-sm text-blue-800">
              Start your dev server with{" "}
              <code className="bg-blue-100 px-2 py-0.5 rounded">
                npm run dev
              </code>{" "}
              and visit{" "}
              <code className="bg-blue-100 px-2 py-0.5 rounded">
                http://localhost:4321
              </code>{" "}
              to see your landing page live. The blog admin is at{" "}
              <code className="bg-blue-100 px-2 py-0.5 rounded">
                /admin
              </code>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-4 text-white">
        <h2 className="text-xl font-bold mb-4">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          You now have everything you need to create fast, SEO-optimized landing
          pages with Astro Starter Kit.
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