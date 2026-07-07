import Link from "next/link";
import {
  Braces,
  ArrowUpRight,
  Variable,
  FunctionSquare,
  GitBranch,
  MousePointerClick,
  MousePointer2,
  Rocket,
  Lightbulb,
} from "lucide-react";

const topics = [
  {
    title: "Variables & Data Types",
    text: "Store and work with strings, numbers, arrays, and objects.",
    icon: Variable,
  },
  {
    title: "Functions",
    text: "Reuse logic with parameters, return values, and arrow functions.",
    icon: FunctionSquare,
  },
  {
    title: "Control Flow",
    text: "Make decisions and repeat work with conditionals and loops.",
    icon: GitBranch,
  },
  {
    title: "DOM Manipulation",
    text: "Read and update page elements directly from your scripts.",
    icon: MousePointerClick,
  },
  {
    title: "Events",
    text: "React to clicks, input, and other user interactions.",
    icon: MousePointer2,
  },
  {
    title: "Modern JavaScript",
    text: "Use ES6+ features like destructuring, modules, and promises.",
    icon: Rocket,
  },
];

export default function LearnJs() {
  return (
    <div className="max-w-5xl px-6 py-4">
      {/* Hero */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
            Astro
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <Link
            href="/docs/astro/additional-resources"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200 hover:border-blue-300 transition-colors"
          >
            Additional Resources
          </Link>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-yellow-50 to-amber-50 text-yellow-700 rounded-full text-sm font-bold border-2 border-yellow-200">
            Learn JavaScript
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Learn JavaScript
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          JavaScript is the programming language of the web — it brings your
          pages to life. The best place to learn it in depth is Mozilla&apos;s
          official guide: beginner-friendly, comprehensive, and always
          up-to-date.
        </p>
      </div>

      {/* Primary CTA card */}
      <Link
        href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-linear-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 sm:p-8 border-2 border-yellow-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-yellow-300 mb-12"
      >
        <div className="w-14 h-14 shrink-0 rounded-xl border border-yellow-200 bg-white text-yellow-600 flex items-center justify-center">
          <Braces className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Access Mozilla Learn JavaScript
          </h2>
          <p className="text-gray-600">
            The complete JavaScript guide, straight from the source.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-base font-semibold text-yellow-700 group-hover:text-yellow-800 whitespace-nowrap">
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
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-yellow-200"
            >
              <div className="w-10 h-10 rounded-lg bg-yellow-50 text-yellow-600 border border-yellow-200 flex items-center justify-center mb-3">
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
        <Lightbulb className="w-6 h-6 shrink-0 text-yellow-500 mt-0.5" />
        <p className="text-sm text-gray-700 leading-relaxed">
          With HTML, CSS, and JavaScript under your belt, you have a strong
          foundation for web development. Head back to{" "}
          <Link
            href="/docs/astro/additional-resources"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Additional Resources
          </Link>{" "}
          to review the path or explore what comes next.
        </p>
      </div>
    </div>
  );
}
