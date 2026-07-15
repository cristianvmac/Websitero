import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import {
  FileCode2,
  ArrowUpRight,
  Heading1,
  Link2,
  Table,
  FormInput,
  Image as ImageIcon,
  ListTree,
  Lightbulb,
} from "lucide-react";

const topics = [
  {
    title: "Structure & Elements",
    text: "Headings, paragraphs, and the building blocks of every page.",
    icon: Heading1,
  },
  {
    title: "Links & Navigation",
    text: "Connect pages and resources with anchors and navigation.",
    icon: Link2,
  },
  {
    title: "Forms",
    text: "Collect user input with inputs, labels, and buttons.",
    icon: FormInput,
  },
  {
    title: "Tables",
    text: "Organize and display structured data clearly.",
    icon: Table,
  },
  {
    title: "Multimedia",
    text: "Embed images, audio, and video into your content.",
    icon: ImageIcon,
  },
  {
    title: "Semantic Markup",
    text: "Use meaningful tags for accessibility and SEO.",
    icon: ListTree,
  },
];

export default function LearnHtml() {
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
          <span aria-current="page">Learn HTML</span>
        </nav>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">Learn HTML</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          HTML is the structure of every website. The best place to learn it in
          detail is Mozilla&apos;s official documentation — beginner-friendly,
          comprehensive, and constantly updated.
        </p>
      </div>

      {/* Primary CTA card */}
      <Link
        href="https://developer.mozilla.org/en-US/docs/Learn/HTML"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-blue-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-blue-300 mb-12"
      >
        <div className="w-14 h-14 shrink-0 rounded-xl border border-blue-200 bg-white text-gray-600 flex items-center justify-center">
          <FileCode2 className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Access Mozilla Learn HTML
          </h2>
          <p className="text-gray-600">
            The complete HTML guide, straight from the source.
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
          Working through this guide gives you a solid foundation for web
          development. Once you&apos;re comfortable with HTML, move on to{" "}
          <Link
            href="/docs/astro/additional-resources/learn-css"
            className="font-semibold text-gray-600 hover:text-gray-700 hover:underline"
          >
            Learn CSS
          </Link>{" "}
          to style your content.
        </p>
      </div>
      </div>
    </div>
  );
}
