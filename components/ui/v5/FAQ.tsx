"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, MessageCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Do I get both the Eleventy and Astro boilerplates?",
    answer:
      "Yes — every plan includes both boilerplates. Use Eleventy for fast, content-focused business sites or Astro for content-rich, interactive projects. Switch whenever you like.",
  },
  {
    question: "Do I need coding experience?",
    answer:
      "Basic HTML/CSS knowledge helps but isn't required. Both boilerplates come with clear documentation and examples, and our Discord community is there when you get stuck.",
  },
  {
    question: "Can I use this for client projects?",
    answer:
      "Absolutely. Your lifetime license covers unlimited personal and client projects — no recurring fees or royalties.",
  },
  {
    question: "What's your refund policy?",
    answer:
      "We offer a 14-day money-back guarantee. If it's not for you, contact us within 14 days of purchase for a full refund.",
  },
  {
    question: "Do you provide updates?",
    answer:
      "All plans include lifetime updates. As we improve the boilerplates, add components, or fix bugs, you get free access to everything.",
  },
  {
    question: "How is this different from templates?",
    answer:
      "Unlike rigid templates, these are flexible foundations — clean, documented code you can shape however you want. No bloat, no unnecessary dependencies.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "Every plan includes our Discord community. Pro Bundle customers get priority support and a 1-on-1 setup call.",
  },
  {
    question: "How do I get started after purchase?",
    answer:
      "You'll get immediate access to download both boilerplates, the docs, and a Discord invite. Pro Bundle users also receive a link to schedule their setup call.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const toggle = (i: number) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section id="faq" className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold text-[#316994]">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Find answers to common questions about the Eleventy &amp; Astro boilerplates and our services.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <ul className="space-y-3 lg:col-span-2">
            {faqs.map((faq, index) => {
              const open = activeIndex === index;
              return (
                <li
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                    open ? "border-[#4588ba]/40 shadow-sm" : "border-slate-200"
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
                  >
                    <span className="font-semibold text-slate-900">{faq.question}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all ${
                        open ? "rotate-45 bg-[#4588ba] text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 leading-relaxed text-slate-600">{faq.answer}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-1">
            <div className="sticky top-28 overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 p-8 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <MessageCircle className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-2xl font-bold">Still have questions?</h3>
              <p className="mt-3 text-slate-300">
                We&apos;re here to help! Contact us and we&apos;ll get back to you as soon as possible.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-linear-to-br from-[#4588ba] to-[#316994] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#4588ba]/30"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
