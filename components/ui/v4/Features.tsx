import {
  Code2, Search, MapPin, Server, Globe, Smartphone, Headphones,
  ArrowUpRight, type LucideIcon,
} from "lucide-react";
import { SectionHeading, BRAND_GRADIENT } from "./_ui";
import { Reveal } from "./motion";

interface Cell {
  icon: LucideIcon;
  title: string;
  desc: string;
  tool?: string;
  span?: string;
  featured?: boolean;
}

const cells: Cell[] = [
  {
    icon: Code2,
    title: "Hand-crafted development",
    desc: "Custom-coded, responsive sites with clean, maintainable code you fully own — no bloat, no lock-in.",
    tool: "HTML · CSS · JS",
    span: "lg:col-span-2 lg:row-span-2",
    featured: true,
  },
  { icon: Search, title: "SEO services", desc: "Keyword strategy, on-page optimization, and performance tuning so customers actually find you." },
  { icon: MapPin, title: "Google Business Profile", desc: "Profile setup, review management, and local SEO to own the map pack.", tool: "Google" },
  { icon: Server, title: "Hosting", desc: "Fast, reliable hosting with SSL and 99.9% uptime — deploy in minutes.", tool: "Netlify" },
  { icon: Globe, title: "Domains", desc: "Help picking the perfect name, plus registration and DNS setup.", tool: "Namecheap" },
  { icon: Smartphone, title: "Mobile first", desc: "Touch-friendly, fast-loading layouts that shine on every screen size." },
  { icon: Headphones, title: "Ongoing support", desc: "Active Discord community, analytics, and continuous content improvements.", tool: "Discord" },
];

const Features = () => {
  return (
    <section id="features" className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Everything included"
            title="Boost your business instantly — launch faster, earn sooner"
            subtitle="Custom websites that convert, delivered without the headaches. We handle the code, design, and technical complexity so you can launch with confidence."
          />
        </Reveal>

        <div className="mt-14 grid auto-rows-[1fr] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cells.map((cell, idx) => {
            const Icon = cell.icon;
            return (
              <Reveal key={cell.title} delay={idx * 70} className={cell.span ?? ""}>
                {cell.featured ? (
                  <article className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl ${BRAND_GRADIENT} p-8 text-white shadow-lg shadow-[#4588ba]/25`}>
                    <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="relative">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-5 text-2xl font-bold">{cell.title}</h3>
                      <p className="mt-3 max-w-md leading-relaxed text-white/85">{cell.desc}</p>
                    </div>
                    {cell.tool && (
                      <span className="relative mt-6 inline-block w-fit rounded-lg bg-white/15 px-3 py-1 font-mono text-xs backdrop-blur">
                        {cell.tool}
                      </span>
                    )}
                  </article>
                ) : (
                  <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#4588ba]/40 hover:shadow-lg">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4588ba]/10 text-[#316994]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 flex items-center gap-1 text-base font-bold text-slate-900">
                      {cell.title}
                      <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#4588ba]" />
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{cell.desc}</p>
                    {cell.tool && (
                      <span className="mt-4 inline-block w-fit rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-600">
                        {cell.tool}
                      </span>
                    )}
                  </article>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
