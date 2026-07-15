import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { FileCode2, Paintbrush2, Braces, ArrowUpRight } from "lucide-react";

/* ADD OTHER rESOURCES AS nETLIFY ETC */

const resources = [
  {
    title: "Learn HTML",
    description:
      "HTML is the structure of your website. Learn how to create headings, paragraphs, links, forms, tables, and more.",
    href: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
    cta: "Visit Mozilla Learn HTML",
    icon: FileCode2,
    accent: {
      card: "hover:border-blue-300 hover:shadow-blue-100",
      iconWrap: "bg-blue-50 text-slate-600 border-blue-200",
      link: "text-slate-600 group-hover:text-slate-700",
    },
  },
  {
    title: "Learn CSS",
    description:
      "CSS adds style to your HTML. Learn about colors, fonts, layouts, responsive design, grids, and animations.",
    href: "https://developer.mozilla.org/en-US/docs/Learn/CSS",
    cta: "Visit Mozilla Learn CSS",
    icon: Paintbrush2,
    accent: {
      card: "hover:border-blue-300 hover:shadow-blue-100",
      iconWrap: "bg-blue-50 text-slate-600 border-blue-200",
      link: "text-slate-600 group-hover:text-slate-700",
    },
  },
  {
    title: "Learn JavaScript",
    description:
      "JavaScript adds interactivity to your website. Learn variables, functions, DOM manipulation, events, and modern features.",
    href: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript",
    cta: "Visit Mozilla Learn JavaScript",
    icon: Braces,
    accent: {
      card: "hover:border-blue-300 hover:shadow-blue-100",
      iconWrap: "bg-blue-50 text-slate-600 border-blue-200",
      link: "text-slate-700 group-hover:text-slate-800",
    },
  },
];



export default function AdditionalResources() {
  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">
      {/* Hero */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Eleventy
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Additional Resources</span>
        </nav>


        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Additional Learning Resources
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          If you&apos;re starting with web development, these resources will help you
          build a solid foundation in HTML, CSS, and JavaScript.
        </p>
      </div>

      {/* Resource cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Link
              key={resource.title}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${resource.accent.card}`}
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${resource.accent.iconWrap}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {resource.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">
                {resource.description}
              </p>
              <span
                className={`inline-flex items-center gap-1 text-sm font-semibold ${resource.accent.link}`}
              >
                {resource.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Quick Summary */}
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-slate-900">
            Following all three guides will give you a strong foundation for web
            development and prepare you for more advanced frameworks like Next.js
            or Eleventy.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
