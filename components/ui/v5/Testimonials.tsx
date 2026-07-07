import { Star, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  color: string;
}

const testimonials: Testimonial[] = [
  { quote: "I launched my plumbing business site in an afternoon. It ranks, it's fast, and I'm not paying a monthly builder fee anymore.", name: "Marcus T.", role: "Local business owner", color: "#4588ba" },
  { quote: "Having both Eleventy and Astro in one kit is genius. Marketing sites in Eleventy, client blogs in Astro — same clean codebase.", name: "Priya S.", role: "Freelance developer", color: "#8b5cf6" },
  { quote: "The SEO and Google Business setup alone saved me a week. Perfect Lighthouse scores out of the box sealed the deal.", name: "Diego R.", role: "Agency founder", color: "#0ea5e9" },
  { quote: "Cleanest boilerplate I've used. I shipped three client sites this month without touching a page builder once.", name: "Hannah K.", role: "Web designer", color: "#14b8a6" },
  { quote: "Pay once, own everything. After years of subscriptions this feels like a cheat code for launching sites.", name: "Sam O.", role: "Solo founder", color: "#316994" },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-80 shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <Quote className="h-7 w-7" style={{ color: t.color }} />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</blockquote>
      <div className="mt-5 flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: t.color }}>
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-semibold text-slate-900">{t.name}</span>
          <span className="block text-xs text-slate-500">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

const Testimonials = () => {
  const track = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold text-[#316994]">
            <Star className="h-4 w-4" />
            Social proof
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Builders ship faster with Websitero
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-slate-600">
            From solo founders to agencies — here&apos;s what people say after launching.
          </p>
        </div>
      </div>

      <div
        className="v5-marquee-group relative mt-14 overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
      >
        <div className="v5-marquee flex w-max gap-6">
          {track.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
