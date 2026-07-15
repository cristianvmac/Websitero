import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import {
  Paintbrush2,
  ArrowUpRight,
  MousePointerClick,
  Palette,
  Type,
  LayoutGrid,
  Smartphone,
  Sparkles,
  Lightbulb,
} from "lucide-react";

const topics = [
  {
    title: "Selectors",
    text: "Target the right elements with classes, IDs, and combinators.",
    icon: MousePointerClick,
  },
  {
    title: "Colors & Backgrounds",
    text: "Apply colors, gradients, and background images with confidence.",
    icon: Palette,
  },
  {
    title: "Typography",
    text: "Control fonts, sizing, spacing, and readable text styles.",
    icon: Type,
  },
  {
    title: "Layouts & Grids",
    text: "Arrange content with Flexbox, CSS Grid, and the box model.",
    icon: LayoutGrid,
  },
  {
    title: "Responsive Design",
    text: "Adapt your pages to every screen size with media queries.",
    icon: Smartphone,
  },
  {
    title: "Transitions & Animations",
    text: "Bring interfaces to life with smooth, tasteful motion.",
    icon: Sparkles,
  },
];

export default function LearnCss() {
  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">
      {/* Hero */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Astro
          </Link>
          <span><LuChevronRight /></span>
          <Link href="/docs/astro/additional-resources" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Additional Resources
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Learn CSS</span>
        </nav>

     

        <h1 className="text-5xl font-bold text-gray-900 mb-4">Learn CSS</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          CSS is what makes the web beautiful. It styles and lays out your HTML
          content — and the best place to learn it in depth is Mozilla&apos;s
          official guide: beginner-friendly, comprehensive, and always
          up-to-date.
        </p>
      </div>

      {/* Primary CTA card */}
      <Link
        href="https://developer.mozilla.org/en-US/docs/Learn/CSS"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-blue-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-blue-300 mb-12"
      >
        <div className="w-14 h-14 shrink-0 rounded-xl border border-blue-200 bg-white text-gray-600 flex items-center justify-center">
          <Paintbrush2 className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Access Mozilla Learn CSS
          </h2>
          <p className="text-gray-600">
            The complete CSS guide, straight from the source.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-base font-semibold text-gray-600 group-hover:text-gray-700 whitespace-nowrap">
          Visit guide
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>

      {/* What you'll learn */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        What you&apos;ll learn
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <div
              key={topic.title}
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-gray-600 border border-blue-200 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{topic.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {topic.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tip */}
      <div className="flex items-start gap-3 p-5 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
        <Lightbulb className="w-6 h-6 shrink-0 text-gray-500 mt-0.5" />
        <p className="text-sm text-gray-700 leading-relaxed">
          Mastering CSS lets you turn plain markup into polished, responsive
          pages. Once you&apos;re comfortable styling content, move on to{" "}
          <Link
            href="/docs/astro/additional-resources/learn-js"
            className="font-semibold text-gray-600 hover:text-gray-700 hover:underline"
          >
            Learn JavaScript
          </Link>{" "}
          to add interactivity.
        </p>
      </div>
      </div>
    </div>
  );
}
