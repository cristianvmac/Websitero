import { MousePointerClick, Paintbrush, Rocket, type LucideIcon } from "lucide-react";
import { SectionHeading, BRAND_GRADIENT } from "./_ui";
import { Reveal } from "./motion";

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    icon: MousePointerClick,
    title: "Pick your stack",
    desc: "Grab the Eleventy or Astro boilerplate — both ship with the same clean structure and docs.",
  },
  {
    icon: Paintbrush,
    title: "Customize content",
    desc: "Swap copy, colors, and images. Pre-built sections and ChatGPT prompts get you to done fast.",
  },
  {
    icon: Rocket,
    title: "Deploy & rank",
    desc: "Push to Netlify, connect your domain, and go live with SEO and Google Business set up.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            center
            eyebrow="How it works"
            title="From zero to live in three steps"
            subtitle="No agencies, no page-builder lock-in — just a fast path from idea to a website that ranks."
          />
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-linear-to-r from-transparent via-slate-200 to-transparent md:block" />

          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={idx * 130}>
                  <div className="relative flex flex-col items-center text-center">
                    <span className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${BRAND_GRADIENT} text-white shadow-lg shadow-[#4588ba]/30`}>
                      <Icon className="h-6 w-6" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
