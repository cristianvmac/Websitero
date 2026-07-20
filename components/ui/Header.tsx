"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Transition,
  // Aliased: `Menu` is already lucide's hamburger icon in this file.
  Menu as AccountMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Menu, X, Rocket, ArrowRight, Sparkles, ExternalLink, ArrowUp,  ArrowUpRight, ChevronDown, Settings, LogOut } from "lucide-react";
import LogOutButton from "@/components/auth/LogOutButton";
import { FaCode } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { isAdminEmail } from "@/lib/admin";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Docs", href: "/docs/" },
  { label: "See Demo ", href: "/", highlight: true },
];

/* One row of the account dropdown. `data-focus` is the state to style, not
   `hover`: Headless UI moves focus to the row under the pointer, so it covers
   hovering AND arrow-key navigation with one rule — styling `hover` instead
   would leave keyboard users with no visible highlight.

   cursor-pointer is deliberate. Tailwind v4's preflight sets buttons to
   cursor:default, so without it the Log Out row is the one item in the panel
   that doesn't feel clickable. The group/* wiring lets the icon pick up the
   blue at the same moment the row does. */
const menuRowClass =
  "group flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors data-focus:bg-blue-500/10 data-focus:text-blue-700";
const menuIconClass = "h-4 w-4 text-slate-400 transition-colors group-data-focus:text-blue-600";

/** First name, or the part of the email before the @ — whatever fits a nav
    slot. Someone who signed up as "Ana Maria Popescu" gets "Ana". */
function shortName(user: { name?: string | null; email?: string | null }): string {
  const first = user.name?.trim().split(/\s+/)[0];
  return first || user.email?.split("@")[0] || "My account";
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  /* Resolves after hydration (see lib/auth-client.ts for why it isn't read on
     the server). `isPending` is the first paint and the reload after it —
     during that window neither "Login" nor a name is true yet, so the account
     slot renders empty rather than flashing "Login" at someone who is signed
     in. Everything around it keeps its position. */
  const { data: session, isPending } = useSession();
  const user = session?.user ?? null;

  // The dashboard has its own chrome (sidebar + topbar).
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/*<div className="bg-blue-500 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-1 text-center text-xs font-medium sm:text-sm">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span>Early-adopter deal — $50 off, 10 spots left.</span>
          <Link href="#pricing" className="hidden items-center gap-1 underline underline-offset-2 hover:opacity-90 sm:inline-flex">
            Claim it <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>*/}

      <div className="bg-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm shadow-blue-500/30 transition-transform group-hover:scale-105">
              <FaCode className="h-6 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">Websitero (beta)</span>
          </Link>

          <nav className="hidden items-center gap-3 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.highlight
                    ? "rounded-lg px-3.5 py-2 text-sm font-semibold text-blue-700  hover:bg-blue-500/10"
                    : "rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                }
              >
                {link.label}
                {link.highlight && <ArrowUpRight className="inline h-4 w-4 align-text-bottom" />}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {/* Cosmetic only — this hides the door, it doesn't lock it. The lock
                is app/admin/layout.tsx, which re-checks against the database. */}
            {isAdminEmail(user?.email) && (
              <Link
                href="/admin/briefs"
                className="items-center rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 inline-flex"
              >
                Briefs
              </Link>
            )}

            {/* Signed in: the account menu — who you are, and the two things
                you came to the header to do (settings, leave). Signed out: the
                login link. Nothing while we're still asking.

                Headless UI's Menu, not a hand-rolled useState toggle: it brings
                the parts that are tedious to get right by hand — click-outside
                and Escape to close, focus moving into the panel and returning
                to the button, arrow-key navigation, and the aria-expanded /
                aria-haspopup wiring. */}
            {isPending ? null : user ? (
              <AccountMenu as="div" className="relative">
                {/* cursor-pointer because Tailwind v4's preflight sets buttons
                    to cursor:default — without it the trigger doesn't read as
                    clickable. Blue on hover and while open, matching the rows
                    in the panel it opens. */}
                <MenuButton className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full py-1 pl-1 pr-2 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-500/10 hover:text-blue-700 data-open:bg-blue-500/10 data-open:text-blue-700">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold uppercase text-white">
                    {shortName(user).charAt(0)}
                  </span>
                  {/* Rotates to point up while the panel is open, so the button
                      shows the state of the thing it controls. */}
                  <ChevronDown className="h-4 w-4 text-slate-400 transition-all group-hover:text-blue-600 group-data-open:rotate-180 group-data-open:text-blue-600" />
                  <span className="sr-only">Account menu</span>
                </MenuButton>

                {/* `transition` + data-closed is Headless UI v2's own API — it
                    owns the mount/unmount timing, so no <Transition> wrapper.

                    modal={false} matters here: left at its default of true,
                    opening the menu locks page scroll (overflow:hidden on the
                    document). That removes the scrollbar, the viewport gets
                    ~15px wider, and this fixed full-width header re-centers —
                    the whole nav visibly jumps right on every open. Scroll
                    locking is for dialogs, where trapping the user is the
                    point; a nav dropdown just pays the layout shift. */}
                <MenuItems
                  transition
                  modal={false}
                  className="absolute right-0 z-50 mt-2 w-72 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 transition duration-100 ease-out focus:outline-none data-closed:-translate-y-1 data-closed:opacity-0"
                >
                    {/* Identity first — on a shared laptop, "is this my
                        account?" wants answering right above Log out. Same
                        reasoning as the dashboard sidebar. */}
                    <div className="flex items-center gap-3 p-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500 text-base font-bold uppercase text-white">
                        {shortName(user).charAt(0)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-bold text-slate-900">
                          {user.name?.trim() || shortName(user)}
                        </span>
                        {/* Long addresses truncate rather than widen the panel */}
                        <span className="block truncate text-sm text-slate-500">{user.email}</span>
                      </span>
                    </div>

                    <div className="border-t border-slate-100" />

                    <MenuItem>
                      <Link href="/dashboard" className={menuRowClass}>
                        <Rocket className={menuIconClass} />
                        Dashboard
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <Link href="/dashboard/account" className={menuRowClass}>
                        <Settings className={menuIconClass} />
                        Account Settings
                      </Link>
                    </MenuItem>

                    {/* A link to /login would only navigate — the session cookie
                        survives it. This ends the session, and clears the
                        useSession store above so this very header stops showing
                        the name on the way out. */}
                    <div className="border-t border-slate-100">
                      <MenuItem>
                        <LogOutButton className={`${menuRowClass} font-semibold`}>
                          <LogOut className={menuIconClass} />
                          Log Out
                        </LogOutButton>
                      </MenuItem>
                    </div>
                  </MenuItems>
              </AccountMenu>
            ) : (
              <Link
                href="/login"
                className="items-center rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 inline-flex"
              >
                Login
              </Link>
            )}

            <Link
              href="/startyourwebsite"
              className="items-center rounded-full bg-blue-500 hover:bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/40 inline-flex"
            >
              Start Your Website
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            onClick={() => setIsOpen((v) => !v)}
            type="button"
            aria-controls="mobile-menu-v5"
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
          <div id="mobile-menu-v5" className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={
                      link.highlight
                      ? "block rounded-lg px-3 py-2.5 text-center text-sm font-semibold text-blue-700  hover:bg-blue-500/10"
                      : "block rounded-lg px-3 py-2.5 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                    }
                  >
                    {link.label}
                    {link.highlight && <ArrowUpRight className=" inline h-4 w-4 align-text-bottom" />}
                  </Link>
                </li>
              ))}
              <li className=" flex flex-col gap-3">
                {isPending ? null : user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold uppercase text-white">
                      {shortName(user).charAt(0)}
                    </span>
                    <span className="truncate">{shortName(user)}</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    Login
                  </Link>
                )}
                <Link
                  href="#cta"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-700 px-5 py-3 text-sm font-semibold text-white"
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
