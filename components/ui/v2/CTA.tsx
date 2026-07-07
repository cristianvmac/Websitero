import Link from "next/link";
import { Rocket, ArrowRight, Check } from "lucide-react";

const perks = ["Pay once, own forever", "No subscriptions", "Lifetime updates"];

const CTA = () => {
  return (
    <section id="cta" className="bg-white px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 px-6 py-16 text-center sm:px-12">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4588ba]/30 blur-3xl" />

        <div className="relative">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow-lg shadow-[#4588ba]/30">
            <Rocket className="h-7 w-7" />
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Boost your website, launch, earn
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Don&apos;t waste time on WordPress or page-builder subscriptions. Ship a
            fast, owned website today.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-br from-[#4588ba] to-[#316994] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#4588ba]/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4588ba]/50"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5" />
          </Link>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                <Check className="h-4 w-4 text-emerald-400" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CTA;
