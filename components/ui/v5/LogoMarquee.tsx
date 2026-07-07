import {
  Code2, Palette, Zap, Rocket, Globe, Server, Search, Smartphone, MapPin,
  type LucideIcon,
} from "lucide-react";

const items: { icon: LucideIcon; label: string }[] = [
  { icon: Code2, label: "HTML" },
  { icon: Palette, label: "CSS" },
  { icon: Zap, label: "Eleventy" },
  { icon: Rocket, label: "Astro" },
  { icon: Globe, label: "Namecheap" },
  { icon: Server, label: "Netlify" },
  { icon: Search, label: "SEO" },
  { icon: Smartphone, label: "Mobile First" },
  { icon: MapPin, label: "Google Business" },
];

const LogoMarquee = () => {
  const track = [...items, ...items];

  return (
    <section className="border-y border-slate-200 bg-white py-8">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
        Everything wired up, out of the box
      </p>
      <div
        className="v5-marquee-group relative overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}
      >
        <div className="v5-marquee flex w-max items-center gap-4">
          {track.map(({ icon: Icon, label }, i) => (
            <span
              key={`${label}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600"
            >
              <Icon className="h-4 w-4 text-[#4588ba]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
