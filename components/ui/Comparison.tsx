import { X, Check, AlertTriangle, Sparkles } from "lucide-react";

const problems = [
  { title: "Performance Issues", desc: "Bloated code tanks mobile performance, Core Web Vitals, and SEO rankings." },
  { title: "Vendor Lock-in", desc: "Deactivating the builder breaks your site — migrating is nearly impossible." },
  { title: "Maintenance Headaches", desc: "Constant updates and plugin conflicts make layouts break unexpectedly." },
  { title: "Hidden Costs", desc: "Ongoing subscriptions with essential features locked behind paywalls." },
];

const advantages = [
  { title: "Superior Performance", desc: "Optimized Core Web Vitals, fast on mobile, and better SEO rankings." },
  { title: "Complete Control", desc: "Full ownership and unlimited customization — easy to migrate or redesign." },
  { title: "Security & Stability", desc: "Minimal attack surface, no conflicts, and updates that never break your site." },
  { title: "Real Cost Savings", desc: "No subscriptions, cheaper hosting, and lower long-term maintenance." },
];

const Comparison = () => {
  return (
    <section id="comparison" className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold text-[#316994]">
            The honest comparison
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why not just use a page builder?
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-slate-600">
            Page builders feel easy at first — then the costs and headaches pile up. Here&apos;s how
            Websitero compares.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-2">
          <span className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-lg md:flex">
            VS
          </span>

          <div className="h-full rounded-2xl border border-rose-200 bg-rose-50/60 p-6 sm:p-8">
              <header className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-rose-950">WordPress Page Builders</h3>
              </header>
              <ul className="space-y-4">
                {problems.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-200 text-rose-700">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-rose-950">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-rose-900/70">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
          </div>

          <div className="h-full rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm sm:p-8">
              <header className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-emerald-950">Websitero Boilerplate</h3>
              </header>
              <ul className="space-y-4">
                {advantages.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-emerald-950">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-emerald-900/70">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
