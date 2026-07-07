import { MousePointerClick, Paintbrush, Rocket, type LucideIcon } from "lucide-react";

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
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold text-[#316994]">
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            From zero to live in three steps
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-slate-600">
            No agencies, no page-builder lock-in — just a fast path from idea to a website that ranks.
          </p>
        </div>

        <div className="relative mt-16">
          {/* connecting line */}
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-linear-to-r from-transparent via-slate-200 to-transparent md:block" />

          <div className="grid gap-10 md:grid-cols-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow-lg shadow-[#4588ba]/30">
                      <Icon className="h-6 w-6" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
