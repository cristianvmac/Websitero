"use client";

import { useState } from 'react';
import Link from 'next/link';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqData = {
    topper: "FAQ",
    title: "Frequently Asked Questions",
    intro: "Find answers to common questions about our HTML/CSS/JS boilerplate and services.",
    faqs: [
      {
        question: "What's included in the boilerplate?",
        answer: "Our boilerplate includes pre-built HTML pages, responsive CSS components, JavaScript utilities, form validation, SEO optimization, and deployment guides. Everything you need to launch a professional website quickly."
      },
      {
        question: "Do I need coding experience?",
        answer: "Basic HTML/CSS knowledge is helpful but not required. Our boilerplate comes with clear documentation and examples. If you get stuck, our Discord community and support team are here to help."
      },
      {
        question: "Can I use this for client projects?",
        answer: "Absolutely! Once you purchase, you have a lifetime license to use the boilerplate for unlimited personal and client projects. No recurring fees or royalties."
      },
      {
        question: "What's your refund policy?",
        answer: "We offer a 14-day money-back guarantee. If you're not satisfied with the boilerplate for any reason, just contact us within 14 days of purchase for a full refund."
      },
      {
        question: "Do you provide updates?",
        answer: "Yes! All plans include lifetime updates. As we improve the boilerplate, add new components, or fix bugs, you'll get free access to all updates."
      },
      {
        question: "How is this different from templates?",
        answer: "Unlike rigid templates, our boilerplate is a flexible foundation. It's clean, documented code you can customize however you want. No bloat, no unnecessary dependencies—just quality code."
      },
      {
        question: "What kind of support do you offer?",
        answer: "All plans include access to our Discord community. Pro Bundle customers get priority support and a 1-on-1 setup call to help you get started."
      },
      {
        question: "Can I get help with customization?",
        answer: "Yes! Our Discord community is active and helpful. Pro Bundle users can also request custom components as part of their package."
      },
      {
        question: "How do I get started after purchase?",
        answer: "After purchase, you'll receive immediate access to download the boilerplate, documentation, and Discord community invite. Pro Bundle users will also receive a calendar link to schedule their setup call."
      }
    ],
    cta: {
      title: "Still Have Questions?",
      text: "We're here to help! Contact us and we'll get back to you as soon as possible.",
      button: "Contact Us"
    }
  };

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">
            {faqData.topper}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            {faqData.title}
          </h2>
          <p className="text-lg text-base-content/70">
            {faqData.intro}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ Items */}
          <ul className="lg:col-span-2 space-y-4">
            {faqData.faqs.map((faq, index) => (
              <li
                key={index}
                className="border border-base-300 rounded-lg overflow-hidden bg-base-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-base-300 transition-colors"
                >
                  <span className="font-semibold text-base-content pr-8">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-primary shrink-0 transition-transform ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="px-6 pb-4 text-base-content/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA Card */}
          <div className="lg:col-span-1">
            <div className="bg-primary/10 border-2 border-primary rounded-lg p-8 sticky top-8">
              <h3 className="text-2xl font-bold mb-4">
                {faqData.cta.title}
              </h3>
              <p className="text-base-content/70 mb-6">
                {faqData.cta.text}
              </p>
              <Link
                href="/contact"
                className="block w-full text-center bg-primary text-primary-content py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                {faqData.cta.button}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;