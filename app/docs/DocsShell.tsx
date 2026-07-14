"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";

type Framework = "eleventy" | "astro";

type Section = {
  title: string;
  path: string;
  items: {
    name: string;
    path: string;
  }[];
};

const frameworkOptions: { label: string; value: Framework; icon: string }[] = [
  { label: "Eleventy", value: "eleventy", icon: "/images/eleventy.png" },
  { label: "Astro", value: "astro", icon: "/images/astro.png" },
];
const sectionTemplates = [
  {
    title: "Quick Setup",
    slug: "quick-setup",
    items: [
      { name: "Install Node.js", slug: "quick-setup/install-node" },
      { name: "Install Git", slug: "quick-setup/install-git" },
      { name: "Install VS Code", slug: "quick-setup/install-vscode" },
    ],
  },
  {
    title: "Get Started",
    slug: "get-started",
    items: [],
  },
  {
    title: "Tutorials",
    slug: "tutorials",
    items: [
      { name: "Build in 5 minutes", slug: "tutorials/build-in-5-minutes" },
      { name: "Landing page", slug: "tutorials/landing-page" },
      { name: "Start a blog", slug: "tutorials/start-blog" },
      { name: "Start an ecommerce website", slug: "tutorials/start-ecommerce" },
    ],
  },
  {
    title: "Features",
    slug: "features",
    items: [
      { name: "SEO", slug: "features/seo" },
      { name: "Google Business Profile", slug: "features/google-business-profile" },
      { name: "Internationalization", slug: "features/internationalization" },
      { name: "Customer support", slug: "features/customer-support" },
    ],
  },
  {
    title: "Components",
    slug: "components",
    items: [
      { name: "Navigation / Header", slug: "components/header" },
      { name: "Hero", slug: "components/hero" },
      { name: "Services", slug: "components/services" },
      { name: "About", slug: "components/about" },
      { name: "Side By Side", slug: "components/side-by-side" },
      { name: "Gallery", slug: "components/gallery" },
      { name: "Reviews", slug: "components/reviews" },
      { name: "FAQ", slug: "components/faq" },
      { name: "CTA", slug: "components/cta" },
      { name: "Footer", slug: "components/footer" },
      { name: "Pricing", slug: "components/pricing" },
      { name: "Why Choose Us", slug: "components/why-choose-us" },
      { name: "Forms & Contact", slug: "components/forms-contact" },
      { name: "Interior Pages", slug: "components/interior-pages" },
      { name: "Problem", slug: "components/problem" },
      { name: "Content Flair", slug: "components/content-flair" },
      { name: "Meet Our Team", slug: "components/meet-our-team" },
      { name: "Steps", slug: "components/steps" },
      { name: "Stats", slug: "components/stats" },
      { name: "Events", slug: "components/events" },
      { name: "MISC", slug: "components/misc" },
      { name: "Quotes", slug: "components/quotes" },
      { name: "Buttons", slug: "components/buttons" },
      { name: "Dark Mode", slug: "components/dark-mode" },
      { name: "Blog", slug: "components/blog" },
      { name: "Ecommerce", slug: "components/ecommerce" },
    ],
  },
  {
    title: "Security",
    slug: "security",
    items: [],
  },
  {
    title: "Deployment",
    slug: "deployment",
    items: [
      { name: "Deploying to Netlify", slug: "deployment/netlify" },
      { name: "Deploying to Vercel", slug: "deployment/vercel" }
    ],
  },
   {
    title: "Analytics",
    slug: "analytics",
    items: [
      { name: "Install Google Analytics", slug: "analytics/google-analytics" },
      { name: "Install Vercel Analytics", slug: "analytics/vercel-analytics" }
    ],
  },
  {
    title: "Extras",
    slug: "extras",
    items: [
      { name: "Favicon", slug: "extras/favicon" },
      { name: "Page Speed Test", slug: "extras/page-speed-test" },
    ],
  },
  {
    title: "Additional Resources",
    slug: "additional-resources",
    items: [
      { name: "Learn HTML",slug: "additional-resources/learn-html" },
      { name: "Learn CSS", slug: "additional-resources/learn-css" },
      { name: "Learn JS", slug: "additional-resources/learn-js" },
    ],
  },
  {
    title: "Contact",
    slug: "contact",
    items: [],
  },
];

function buildSections(framework: Framework): Section[] {
  return sectionTemplates.map((section) => ({
    title: section.title,
    path: `/docs/${framework}/${section.slug}`,
    items: section.items.map((item) => ({
      name: item.name,
      path: `/docs/${framework}/${item.slug}`,
    })),
  }));
}

function getFrameworkPath(pathname: string, nextFramework: Framework) {
  if (pathname.startsWith("/docs/astro")) {
    return pathname.replace("/docs/astro", `/docs/${nextFramework}`);
  }

  if (pathname.startsWith("/docs/eleventy")) {
    return pathname.replace("/docs/eleventy", `/docs/${nextFramework}`);
  }

  return `/docs/${nextFramework}`;
}

export default function DocsShell({
  children,
  framework,
}: {
  children: React.ReactNode;
  framework: Framework;
}) {
  const pathname = usePathname();
  const sections = buildSections(framework);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Quick Setup": true,
    //"Get Started": true,
    Tutorials: true,
    Features: true,
    Components: true,
   // Security: true,
    Deployment: true,
    Analytics: true,
    Extras: true,
    "Additional Resources": true,
  });

  const toggleSection = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleSections = normalizedSearch
    ? sections
        .map((section) => {
          const sectionMatches = section.title.toLowerCase().includes(normalizedSearch);
          const matchingItems = section.items.filter((item) =>
            item.name.toLowerCase().includes(normalizedSearch)
          );

          if (!sectionMatches && matchingItems.length === 0) {
            return null;
          }

          return {
            ...section,
            items: sectionMatches ? section.items : matchingItems,
          };
        })
        .filter((section): section is Section => section !== null)
    : sections;

  const sidebarContent = (
    <div className="pl-3 py-5">
          <label className="relative mt-3 mb-3 block">
            <span className="sr-only">Search documentation</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search docs..."
              className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </label>

          <div className="mb-6 grid grid-cols-2 rounded-lg border border-gray-300 bg-white p-1 shadow-sm">
            {frameworkOptions.map((option) => {
              const isActive = framework === option.value;

              return (
                <Link
                  key={option.value}
                  href={getFrameworkPath(pathname, option.value)}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={`flex min-h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gray-200 text-gray-900 shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-950"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Image
                    src={option.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  {option.label}
                </Link>
              );
            })}
          </div>

          {visibleSections.map((section) => (
            <div key={section.title} className="ml-2 mb-3">
              <Link
                href={section.path}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={`flex w-full items-center justify-between rounded px-1 py-1 text-left text-base font-bold uppercase tracking-wider transition hover:text-gray-700 ${
                  pathname === section.path || pathname.startsWith(section.path + "/")
                    ? "bg-orange-100 text-gray-900"
                    : "text-gray-500"
                }`}
              >
                <h3>{section.title}</h3>

                {section.items.length > 0 && (
                  <span
                    onClick={(e) => toggleSection(section.title, e)}
                    className="rounded hover:bg-gray-200"
                  >
                    {expandedSections[section.title] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>
                )}
              </Link>

              {(normalizedSearch || expandedSections[section.title]) && section.items.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.path}
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className={`block w-full rounded-md px-2 py-1 text-left text-base transition ${
                          pathname === item.path
                            ? "bg-orange-100 font-medium text-black"
                            : "text-gray-700 hover:bg-gray-100 hover:text-black"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {visibleSections.length === 0 && (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white px-3 py-4 text-sm text-gray-500">
              No docs found.
            </div>
          )}
        </div>
  );

  return (
    <div className="flex h-[calc(100vh-5rem)] mt-20">
      <aside className="sidebar-scroll sticky top-20 hidden h-[calc(100vh-5rem)] w-60 shrink-0 overflow-y-auto border-r border-gray-300 bg-gray-50 lg:block">
        {sidebarContent}
      </aside>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close docs menu"
            className="absolute inset-0 bg-gray-950/40"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside className="sidebar-scroll absolute left-0 top-0 h-full w-[min(15rem,75vw)] overflow-y-auto border-r border-gray-300 bg-gray-50 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <span className="text-sm font-semibold text-gray-900">Docs menu</span>
              <button
                type="button"
                aria-label="Close docs menu"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      <main className="main-scroll flex-1 overflow-y-auto border-r border-gray-300 bg-gray-50">
        <div className="sticky top-0 z-30 border-b border-gray-200 bg-gray-50/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100"
            aria-expanded={isMobileSidebarOpen}
          >
            <Menu className="h-4 w-4" />
            Docs menu
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
