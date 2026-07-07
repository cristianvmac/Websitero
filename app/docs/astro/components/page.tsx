import Link from "next/link";
import {
  Menu,
  Sparkles,
  Wrench,
  Info,
  Columns2,
  Images,
  Star,
  HelpCircle,
  MousePointerClick,
  PanelBottom,
  Tag,
  Award,
  Mail,
  Files,
  AlertTriangle,
  Wand2,
  Users,
  ListOrdered,
  BarChart3,
  Calendar,
  LayoutGrid,
  Quote,
  SquareMousePointer,
  Moon,
  Newspaper,
  ShoppingCart,
  ArrowRight,
  Blocks,
  type LucideIcon,
} from "lucide-react";

const FRAMEWORK = "astro";

type Component = {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  available?: boolean;
};

// Order mirrors the docs sidebar (see app/docs/DocsShell.tsx).
const components: Component[] = [
  { name: "Navigation / Header", slug: "header", icon: Menu, available: true, description: "Responsive navigation bar with logo, menu links, and a mobile drawer." },
  { name: "Hero", slug: "hero", icon: Sparkles, available: true, description: "Above-the-fold section with headline, supporting copy, and CTA buttons." },
  { name: "Services", slug: "services", icon: Wrench, available: true, description: "Showcase your offerings in a clean, scannable grid of service cards." },
  { name: "About", slug: "about", icon: Info, available: true, description: "Tell your story with text, imagery, and supporting highlights." },
  { name: "Side By Side", slug: "side-by-side", icon: Columns2, available: true, description: "Alternating image-and-text rows for features or storytelling." },
  { name: "Gallery", slug: "gallery", icon: Images, available: true, description: "Responsive image grids and lightboxes to display your work." },
  { name: "Reviews", slug: "reviews", icon: Star, available: true, description: "Customer testimonials and star ratings that build trust." },
  { name: "FAQ", slug: "faq", icon: HelpCircle, available: true, description: "Accordion-style answers to your most common questions." },
  { name: "CTA", slug: "cta", icon: MousePointerClick, available: true, description: "Conversion-focused call-to-action banners and buttons." },
  { name: "Footer", slug: "footer", icon: PanelBottom, available: true, description: "Site footer with links, contact info, and social icons." },
  { name: "Pricing", slug: "pricing", icon: Tag, available: true, description: "Pricing tables and plan comparisons for any offer." },
  { name: "Why Choose Us", slug: "why-choose-us", icon: Award, available: true, description: "Highlight your key differentiators and value props." },
  { name: "Forms & Contact", slug: "forms-contact", icon: Mail, available: true, description: "Contact forms, inputs, and validation-ready patterns." },
  { name: "Interior Pages", slug: "interior-pages", icon: Files, available: true, description: "Ready-made layouts for inner and sub-pages." },
  { name: "Problem", slug: "problem", icon: AlertTriangle, available: true, description: "Frame the pain point your product or service solves." },
  { name: "Content Flair", slug: "content-flair", icon: Wand2, available: true, description: "Decorative accents and flourishes to enrich your content." },
  { name: "Meet Our Team", slug: "meet-our-team", icon: Users, available: true, description: "Introduce team members with photos, roles, and bios." },
  { name: "Steps", slug: "steps", icon: ListOrdered, available: true, description: "Numbered step-by-step and how-it-works sections." },
  { name: "Stats", slug: "stats", icon: BarChart3, available: true, description: "Eye-catching numbers and metrics that prove impact." },
  { name: "Events", slug: "events", icon: Calendar, available: true, description: "List upcoming events with dates, times, and details." },
  { name: "MISC", slug: "misc", icon: LayoutGrid, available: true, description: "Miscellaneous helpers and smaller building blocks." },
  { name: "Quotes", slug: "quotes", icon: Quote, available: true, description: "Pull-quotes and highlighted statements for emphasis." },
  { name: "Buttons", slug: "buttons", icon: SquareMousePointer, available: true, description: "Button styles, sizes, and states ready to drop in." },
  { name: "Dark Mode", slug: "dark-mode", icon: Moon, available: true, description: "Theme toggling and dark-mode-ready styling." },
  { name: "Blog", slug: "blog", icon: Newspaper, available: true, description: "Blog post layouts, listings, and article templates." },
  { name: "Ecommerce", slug: "ecommerce", icon: ShoppingCart, available: true, description: "Product cards, carts, and storefront building blocks." },
];

export default function ComponentsIndex() {

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
         {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
            Astro
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
            Components
          </div>
        </div>
        {/* Header */}
        <div className="mb-12 text-center"> 
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Components</h1>
        
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All components are built with Astro—styled, responsive, and ready to drop
            into your project. Pick a component below to see usage examples and
            customization options.
          </p>
      </div>

      {/* Components Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {components.map((component) => {
          const Icon = component.icon;
          const href = `/docs/${FRAMEWORK}/components/${component.slug}`;

          if (!component.available) {
            return (
              <div
                key={component.slug}
                className="relative block bg-white rounded-2xl p-5 border-2 border-dashed border-gray-200 opacity-70"
              >
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                  Coming soon
                </span>
                <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <h2 className="text-lg font-bold text-gray-700 mb-1">{component.name}</h2>
                <p className="text-sm text-gray-500">{component.description}</p>
              </div>
            );
          }

          return (
            <Link
              key={component.slug}
              href={href}
              className="group block bg-white rounded-2xl p-5 border-2 border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                {component.name}
              </h2>
              <p className="text-sm text-gray-600">{component.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="text-center">
        <p className="text-gray-700">
          All components live in your project&apos;s components folder <code className="bg-gray-100 px-1.5 py-0.5 rounded">/src/components/</code>
        </p>
      </div>
    </div>
  );
}
