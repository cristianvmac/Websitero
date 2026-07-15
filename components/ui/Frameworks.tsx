import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Layers } from "lucide-react";
import { FRAMEWORKS, FRAMEWORK_ORDER } from "./frameworks-data";

const Frameworks = () => {
  return (
    <section id="frameworks" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 text-sm font-semibold text-blue-700">
            <Layers className="h-4 w-4" />
            Two ways to build
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Choose your stack — both are included
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-slate-600">
            Every plan ships both boilerplates. Start with the one that fits your project, switch
            whenever you like.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {FRAMEWORK_ORDER.map((key) => {
            const f = FRAMEWORKS[key];
            return (
              <div
                key={key}
                className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-full flex-col p-8">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${f.accent}, transparent)` }} />

                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm" style={{ backgroundColor: f.accent }}>
                        <Image src={f.icon} alt="" width={24} height={24} className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{f.name}</h3>
                        <p className="text-sm text-slate-500">{f.tagline}</p>
                      </div>
                    </div>

                    <span className="mt-5 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${f.accent}1a`, color: f.accent }}>
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

                    <Link href={f.docs} className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-colors hover:text-blue-700">
                      Read the {f.name} docs
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Frameworks;
