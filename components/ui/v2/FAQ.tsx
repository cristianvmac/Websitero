"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, MessageCircle, ArrowRight } from "lucide-react";

const faqData = {
  topper: "FAQ",
  title: "Frequently asked questions",
  intro:
    "Find answers to common questions about our HTML/CSS/JS boilerplate and services.",
  faqs: [
    {
      question: "What's included in the boilerplate?",
      answer:
        "Our boilerplate includes pre-built HTML pages, responsive CSS components, JavaScript utilities, form validation, SEO optimization, and deployment guides. Everything you need to launch a professional website quickly.",
    },
    {
      question: "Do I need coding experience?",
      answer:
        "Basic HTML/CSS knowledge is helpful but not required. Our boilerplate comes with clear documentation and examples. If you get stuck, our Discord community and support team are here to help.",
    },
    {
      question: "Can I use this for client projects?",
      answer:
        "Absolutely! Once you purchase, you have a lifetime license to use the boilerplate for unlimited personal and client projects. No recurring fees or royalties.",
    },
    {
      question: "What's your refund policy?",
      answer:
        "We offer a 14-day money-back guarantee. If you're not satisfied with the boilerplate for any reason, just contact us within 14 days of purchase for a full refund.",
    },
    {
      question: "Do you provide updates?",
      answer:
        "Yes! All plans include lifetime updates. As we improve the boilerplate, add new components, or fix bugs, you'll get free access to all updates.",
    },
    {
      question: "How is this different from templates?",
      answer:
        "Unlike rigid templates, our boilerplate is a flexible foundation. It's clean, documented code you can customize however you want. No bloat, no unnecessary dependencies — just quality code.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "All plans include access to our Discord community. Pro Bundle customers get priority support and a 1-on-1 setup call to help you get started.",
    },
    {
      question: "How do I get started after purchase?",
      answer:
        "After purchase, you'll get immediate access to download the boilerplate, documentation, and a Discord community invite. Pro Bundle users also receive a calendar link to schedule their setup call.",
    },
  ],
  cta: {
    title: "Still have questions?",
    text: "We're here to help! Contact us and we'll get back to you as soon as possible.",
    button: "Contact Us",
  },
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const toggle = (i: number) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section id="faq" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#316994]">
            {faqData.topper}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {faqData.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">{faqData.intro}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Items */}
          <ul className="space-y-3 lg:col-span-2">
            {faqData.faqs.map((faq, index) => {
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

          {/* CTA card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 p-8 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <MessageCircle className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-2xl font-bold">{faqData.cta.title}</h3>
              <p className="mt-3 text-slate-300">{faqData.cta.text}</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-linear-to-br from-[#4588ba] to-[#316994] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#4588ba]/30"
              >
                {faqData.cta.button}
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
