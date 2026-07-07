import Link from "next/link";
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
      card: "hover:border-orange-300 hover:shadow-orange-100",
      iconWrap: "bg-orange-50 text-orange-600 border-orange-200",
      link: "text-orange-600 group-hover:text-orange-700",
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
      iconWrap: "bg-blue-50 text-blue-600 border-blue-200",
      link: "text-blue-600 group-hover:text-blue-700",
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
      card: "hover:border-yellow-300 hover:shadow-yellow-100",
      iconWrap: "bg-yellow-50 text-yellow-600 border-yellow-200",
      link: "text-yellow-700 group-hover:text-yellow-800",
    },
  },
];



export default function AdditionalResources() {
  return (
    <div className="max-w-5xl px-6 py-4">
      {/* Hero */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
            Eleventy
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
            Additional Resources
          </div>
        </div>


        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Additional Learning Resources
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
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
              className={`group flex flex-col bg-white rounded-2xl p-6 border border-gray-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${resource.accent.card}`}
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${resource.accent.iconWrap}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {resource.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
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
      <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            Following all three guides will give you a strong foundation for web
            development and prepare you for more advanced frameworks like Next.js
            or Eleventy.
          </p>
        </div>
      </div>
    </div>
  );
}
