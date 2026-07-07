import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading, BRAND_GRADIENT } from "./_ui";
import { Reveal } from "./motion";

const plans = [
  {
    name: "Starter",
    price: "$149",
    originalPrice: "$199",
    currency: "USD",
    popular: false,
    badge: null as string | null,
    features: [
      "Eleventy & Astro boilerplates",
      "5 pre-built page templates",
      "Responsive components library",
      "Contact form with validation",
      "SEO-optimized structure",
      "Tailwind CSS integration",
      "ChatGPT prompts for content",
      "Discord community access",
      "Lifetime updates",
    ],
    cta: "Get Started",
    note: "Pay once. Build unlimited projects!",
  },
  {
    name: "All-in",
    price: "$199",
    originalPrice: "$299",
    currency: "USD",
    popular: true,
    badge: null as string | null,
    features: [
      "Everything in Starter, plus...",
      "10+ page templates",
      "CMS-powered blog (Astro)",
      "Form integrations (Formspree)",
      "Analytics setup (Google)",
      "Performance optimizations",
      "Accessibility features",
      "Deployment guides",
      "Priority support",
      "Lifetime updates",
    ],
    cta: "Get Started",
    note: "Pay once. Build unlimited projects!",
  },
  {
    name: "Pro Bundle",
    price: "$349",
    originalPrice: "$499",
    currency: "USD",
    popular: false,
    badge: "BEST VALUE",
    features: [
      "Everything in All-in, plus...",
      "JavaScript Course ($150 value)",
      "20+ interactive components",
      "E-commerce templates",
      "Payment integration guides",
      "10 hours of video tutorials",
      "1-on-1 setup call",
      "Custom component requests",
      "Lifetime updates",
    ],
    cta: "Get Started",
    note: "Pay once. Build unlimited projects!",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Save hours, ship fast, get profitable"
            eyebrowIcon={Sparkles}
            title="Simple & transparent pricing"
            subtitle="One payment, both boilerplates, lifetime updates. No subscriptions, ever."
          />
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <span>$50 off for early adopters</span>
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              <span className="opacity-80">20 spots left</span>
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid items-start gap-8 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <Reveal key={plan.name} delay={idx * 110}>
              <div
                className={`relative flex h-full flex-col rounded-2xl p-8 transition-transform ${
                  plan.popular
                    ? "border-2 border-[#4588ba] bg-white shadow-2xl shadow-[#4588ba]/15 md:-translate-y-3"
                    : "border border-slate-200 bg-white shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div aria-hidden className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-linear-to-br from-[#4588ba]/20 to-transparent blur" />
                )}
                {(plan.popular || plan.badge) && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`rounded-full ${BRAND_GRADIENT} px-4 py-1 text-xs font-bold tracking-wide text-white shadow-md`}>
                      {plan.badge ?? "MOST POPULAR"}
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>

                <div className="mt-4 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold tracking-tight text-slate-900">{plan.price}</span>
                    <span className="text-slate-400 line-through">{plan.originalPrice}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{plan.currency}</p>
                </div>

                <Link
                  href="/contact"
                  className={`mb-8 inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
                    plan.popular
                      ? `${BRAND_GRADIENT} text-white shadow-md shadow-[#4588ba]/25 hover:shadow-lg hover:shadow-[#4588ba]/40`
                      : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm leading-relaxed text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-center text-xs text-slate-400">{plan.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
