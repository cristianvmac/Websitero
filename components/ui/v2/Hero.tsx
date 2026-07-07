import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Star, Zap, ShieldCheck } from "lucide-react";

const trust = [
  { icon: Zap, label: "Live in hours" },
  { icon: ShieldCheck, label: "No subscriptions" },
  { icon: Star, label: "SEO included" },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-linear-to-b from-slate-50 to-white px-6 py-16 lg:py-24"
    >
      {/* decorative glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4588ba]/15 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row lg:gap-20">
        {/* Left */}
        <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold text-[#316994]">
            <Sparkles className="h-4 w-4" />
            The Eleventy boilerplate for businesses
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Launch your website in hours,{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 bg-linear-to-r from-[#4588ba] to-[#316994] bg-clip-text text-transparent">
                not days
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C50 3 150 3 198 9"
                  stroke="#4588ba"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-600">
            Everything you need to build, deploy, and rank your business
            website — with Google Business Profile and SEO baked in from day one.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="#cta"
              title="Get started with Websitero"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-br from-[#4588ba] to-[#316994] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4588ba]/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4588ba]/40"
            >
              Get Websitero
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/#features"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              See what&apos;s inside
            </Link>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 lg:justify-start">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Icon className="h-4 w-4 text-emerald-600" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="relative w-full max-w-lg lg:w-1/2">
          <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-[#4588ba]/20 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
            <Image
              src="/images/hero-right-side.png"
              width={1080}
              height={1080}
              alt="HTML + CSS + JS + SEO"
              className="h-auto w-full rounded-2xl"
              priority
            />
          </div>

          {/* floating stat card */}
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Zap className="h-5 w-5" />
            </span>
            <div className="text-left">
              <p className="text-lg font-bold leading-none text-slate-900">100/100</p>
              <p className="text-xs text-slate-500">Performance score</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
