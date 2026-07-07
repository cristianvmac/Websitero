import {
  Rocket, Code2, Palette, Zap, Globe, Server, Smartphone, Search, Plus,
  type LucideIcon,
} from "lucide-react";
import { BRAND_GRADIENT, BRAND_TEXT } from "./_ui";

const stack: { icon: LucideIcon; label: string; color: string }[] = [
  { icon: Code2, label: "HTML", color: "text-orange-600 bg-orange-50" },
  { icon: Palette, label: "CSS", color: "text-blue-600 bg-blue-50" },
  { icon: Zap, label: "Eleventy", color: "text-sky-600 bg-sky-50" },
  { icon: Rocket, label: "Astro", color: "text-violet-600 bg-violet-50" },
  { icon: Globe, label: "Namecheap", color: "text-emerald-600 bg-emerald-50" },
  { icon: Server, label: "Netlify", color: "text-teal-600 bg-teal-50" },
  { icon: Smartphone, label: "Mobile First", color: "text-purple-600 bg-purple-50" },
  { icon: Search, label: "SEO", color: "text-rose-600 bg-rose-50" },
];

const scores = ["Performance", "Accessibility", "Best Practices", "SEO"];

const Performance = () => {
  return (
    <section id="performance" className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${BRAND_GRADIENT} text-white`}>
              <Rocket className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Websitero</span>
          </div>

          <Plus className="h-7 w-7 text-slate-300" />

          <div className="flex flex-wrap justify-center gap-3">
            {stack.map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${color}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </div>
            ))}
          </div>

          <span className="text-3xl font-light text-slate-300">=</span>

          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Launch your website <span className={BRAND_TEXT}>instantly</span>
          </h2>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
            {scores.map((label) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-emerald-500 text-lg font-bold text-emerald-700">
                  100
                </span>
                <span className="text-xs font-medium text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;
