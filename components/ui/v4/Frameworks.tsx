import Link from "next/link";
import { Check, ArrowRight, Layers } from "lucide-react";
import { SectionHeading } from "./_ui";
import { Reveal } from "./motion";
import { FRAMEWORKS, FRAMEWORK_ORDER } from "./frameworks-data";

const Frameworks = () => {
  return (
    <section id="frameworks" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Two ways to build"
            eyebrowIcon={Layers}
            title="Choose your stack — both are included"
            subtitle="Every plan ships both boilerplates. Start with the one that fits your project, switch whenever you like."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FRAMEWORK_ORDER.map((key, idx) => {
            const f = FRAMEWORKS[key];
            const Icon = f.icon;
            return (
              <Reveal key={key} delay={idx * 120}>
                <div
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ ["--accent" as string]: f.accent }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${f.accent}, transparent)` }}
                  />

                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm"
                      style={{ backgroundColor: f.accent }}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{f.name}</h3>
                      <p className="text-sm text-slate-500">{f.tagline}</p>
                    </div>
                  </div>

                  <span
                    className="mt-5 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: `${f.accent}1a`, color: f.accent }}
                  >
                    {f.bestFor}
                  </span>

                  <ul className="mt-6 flex-1 space-y-3">
                    {f.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm leading-relaxed text-slate-600">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={f.docs}
                    className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors group-hover:text-[#316994]"
                  >
                    Read the {f.name} docs
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Frameworks;
