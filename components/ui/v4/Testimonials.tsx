import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./_ui";
import { Reveal } from "./motion";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I launched my plumbing business site in an afternoon. It ranks, it's fast, and I'm not paying a monthly builder fee anymore.",
    name: "Marcus T.",
    role: "Local business owner",
    color: "#4588ba",
  },
  {
    quote:
      "Having both Eleventy and Astro in one kit is genius. Marketing sites in Eleventy, client blogs in Astro — same clean codebase.",
    name: "Priya S.",
    role: "Freelance developer",
    color: "#8b5cf6",
  },
  {
    quote:
      "The SEO and Google Business setup alone saved me a week. Perfect Lighthouse scores out of the box sealed the deal.",
    name: "Diego R.",
    role: "Agency founder",
    color: "#0ea5e9",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Social proof"
            eyebrowIcon={Star}
            title="Builders ship faster with Websitero"
            subtitle="From solo founders to agencies — here's what people say after launching."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Reveal key={t.name} delay={idx * 120}>
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <Quote className="h-7 w-7" style={{ color: t.color }} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">{t.name}</span>
                    <span className="block text-xs text-slate-500">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
