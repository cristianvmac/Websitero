import { CountUp, Reveal } from "./motion";

interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const stats: Stat[] = [
  { value: 100, suffix: "/100", label: "Lighthouse score" },
  { value: 2, label: "Frameworks included" },
  { value: 0, prefix: "$", suffix: "/mo", label: "Subscription fees" },
  { value: 99.9, decimals: 1, suffix: "%", label: "Hosting uptime" },
];

const Stats = () => {
  return (
    <section className="bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 to-slate-800 px-6 py-12 sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full bg-[#4588ba]/30 blur-3xl" />

          <dl className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <Reveal key={s.label} delay={idx * 100} className="text-center">
                <dt className="bg-linear-to-r from-white to-slate-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                  <CountUp to={s.value} decimals={s.decimals ?? 0} prefix={s.prefix} suffix={s.suffix} />
                </dt>
                <dd className="mt-2 text-sm font-medium text-slate-400">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Stats;
