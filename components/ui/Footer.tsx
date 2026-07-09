import Link from "next/link";
import { Rocket, Facebook, Linkedin, type LucideIcon } from "lucide-react";
import { FaCode } from "react-icons/fa";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Frameworks", href: "/#frameworks" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Docs",
    links: [
      { label: "Eleventy boilerplate", href: "/docs/eleventy" },
      { label: "Astro boilerplate", href: "/docs/astro" },
      { label: "Get started", href: "/docs/astro/get-started" },
      { label: "Deployment", href: "/docs/astro/deployment" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Licenses", href: "/licenses" },
    ],
  },
];

const social: { name: string; url: string; icon: LucideIcon }[] = [
  { name: "Facebook", url: "https://www.facebook.com/", icon: Facebook },
  { name: "LinkedIn", url: "https://www.linkedin.com/", icon: Linkedin },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow-sm shadow-[#4588ba]/30 transition-transform group-hover:scale-105">
                <FaCode className="h-6 w-5" />
              </span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">Websitero</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Eleventy &amp; Astro boilerplates to launch a fast, owned business website in
              hours — SEO and Google Business Profile included.
            </p>
            <div className="mt-5 flex gap-3">
              {social.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#4588ba] hover:bg-[#4588ba] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-600 transition-colors hover:text-[#316994]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="text-sm text-slate-500">&copy; 2026 Websitero. All rights reserved.</p>
          <p className="text-sm text-slate-400">
            Built by{" "}
            <Link href="https://x.com/cristianvmac" className="font-semibold text-slate-600 hover:text-[#316994]">
              Cristian Marinescu
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
