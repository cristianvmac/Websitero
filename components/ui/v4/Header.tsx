"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { Menu, X, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { BRAND_GRADIENT } from "./_ui";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Frameworks", href: "/#frameworks" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Docs", href: "/docs/eleventy" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 8);
      setProgress(height > 0 ? (top / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress */}
      <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-transparent">
        <div className={`h-full ${BRAND_GRADIENT}`} style={{ width: `${progress}%` }} />
      </div>

      {/* Announcement bar */}
      <div className={`${BRAND_GRADIENT} text-white`}>
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-2 text-center text-xs font-medium sm:text-sm">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span>Early-adopter deal — $50 off, 20 spots left.</span>
          <Link href="#pricing" className="hidden items-center gap-1 underline underline-offset-2 hover:opacity-90 sm:inline-flex">
            Claim it <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Nav bar */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-xl"
            : "border-transparent bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all ${scrolled ? "py-2.5" : "py-3.5"}`}>
          <Link href="/" className="group flex items-center gap-2.5">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${BRAND_GRADIENT} text-white shadow-sm shadow-[#4588ba]/30 transition-transform group-hover:scale-105`}>
              <Rocket className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Websitero (BETA)</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#cta"
            className={`hidden items-center gap-1.5 rounded-full ${BRAND_GRADIENT} px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#4588ba]/25 transition-all hover:shadow-lg hover:shadow-[#4588ba]/40 md:inline-flex`}
          >
            Start Your Website
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            onClick={() => setIsOpen((v) => !v)}
            type="button"
            aria-controls="mobile-menu-v4"
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-2"
        >
          <div id="mobile-menu-v4" className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="#cta"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-center gap-1.5 rounded-full ${BRAND_GRADIENT} px-5 py-3 text-sm font-semibold text-white`}
                >
                  Start Your Website
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </header>
  );
};

export default Header;
