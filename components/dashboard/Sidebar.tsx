"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Clock,
  ContactRound,
  ExternalLink,
  Eye,
  FileText,
  Gift,
  Globe,
  Home,
  Image as ImageIcon,
  Languages,
  LogOut,
  MapPin,
  MessageSquare,
  PenLine,
  Palette,
  Receipt,
  Scale,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Type,
  UserRound,
  UtensilsCrossed,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FRAMEWORKS } from "@/lib/diy";
import type { DashboardData, ShellSite } from "@/src/data/dashboard";
import type { ShellUser } from "./DashboardShell";
import { signOut } from "@/lib/auth-actions";

/* The nav below is the planned information architecture, but what renders is a
   function of the account's state — two gates per entry:

   `when`  — the journey stage that makes the entry meaningful. "site" needs a
             brief to exist; "live" needs the launched site; "diy" needs a
             chosen framework. There's no point offering Content or Analytics
             on a site still being hand-coded.
   `ready` — the route exists. Defaults to false; flip it to true in the same
             change that ships the page. This is what keeps the sidebar from
             linking to twenty 404s while the plan is still mostly plan.

   An entry renders only when both say yes, so the nav grows as the customer
   progresses AND as features get built — and never promises either way. */

type StageGate = "always" | "site" | "live" | "diy";

type NavChild = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Defaults to the parent group's gate. */
  when?: StageGate;
  ready?: boolean;
};

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Defaults to "always". */
  when?: StageGate;
  ready?: boolean;
  /** Groups expand in place; their sub-pages are added as routes later. */
  children?: NavChild[];
};

export const homeItem: NavItem = { label: "Overview", href: "/dashboard", icon: Home };

export const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "My site",
    items: [
      { label: "My Site", href: "/dashboard/site", icon: Globe, when: "live" },
      {
        label: "Content",
        href: "/dashboard/content",
        icon: FileText,
        when: "live",
        children: [
          { label: "Pages", href: "/dashboard/content/pages", icon: FileText },
          { label: "Menu labels", href: "/dashboard/content/menu-labels", icon: Type },
          { label: "Media", href: "/dashboard/content/media", icon: ImageIcon },
          { label: "Menu", href: "/dashboard/content/menu", icon: UtensilsCrossed },
          { label: "Our story", href: "/dashboard/content/our-story", icon: Clock },
          { label: "Blog", href: "/dashboard/content/blog", icon: BookOpen },
          { label: "My contact details", href: "/dashboard/content/contact-details", icon: MapPin },
          { label: "Languages", href: "/dashboard/content/languages", icon: Globe },
          { label: "Legal Pages", href: "/dashboard/content/legal", icon: Scale },
        ],
      },
      {
        label: "Appearance",
        href: "/dashboard/appearance",
        icon: Palette,
        when: "live",
        children: [
          { label: "Mood", href: "/dashboard/appearance/mood", icon: Sparkles },
          { label: "Logo", href: "/dashboard/appearance/logo", icon: ImageIcon },
          { label: "Change Design", href: "/dashboard/appearance/design", icon: Globe },
        ],
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        when: "site",
        children: [
          { label: "Settings", href: "/dashboard/settings", icon: Settings },
          { label: "Domain", href: "/dashboard/settings/domain", icon: Search },
          { label: "Backups", href: "/dashboard/settings/backups", icon: ShieldCheck },
        ],
      },
    ],
  },
  {
    label: "My activity",
    items: [
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, when: "live" },
      { label: "Messages", href: "/dashboard/messages", icon: MessageSquare, when: "site" },
      { label: "Contact form", href: "/dashboard/contact-form", icon: ContactRound, when: "live" },
    ],
  },
  {
    label: "Developer",
    items: [
      // The "/docs" href is retargeted to the chosen framework's docs in
      // visibleSections — the master list can't know the account.
      { label: "Documentation", href: "/docs", icon: BookOpen, when: "diy", ready: true },
    ],
  },
  {
    label: "My account",
    items: [
      { label: "Add-ons & extras", href: "/dashboard/addons", icon: ShoppingBag, when: "site" },
      { label: "Orders", href: "/dashboard/orders", icon: Receipt },
      { label: "Referral", href: "/dashboard/referral", icon: Gift },
      { label: "My Account", href: "/dashboard/account", icon: UserRound, ready: true },
    ],
  },
];

function allows(
  gate: StageGate | undefined,
  site: ShellSite | null,
  diy: DashboardData["diy"],
): boolean {
  switch (gate ?? "always") {
    case "always":
      return true;
    case "site":
      return Boolean(site);
    case "live":
      return site?.stage === "live";
    case "diy":
      return Boolean(diy);
  }
}

/** The sections this account gets to see: both gates applied, empty groups and
    empty sections dropped entirely (an empty "My activity" header is noise). */
function visibleSections(site: ShellSite | null, diy: DashboardData["diy"]) {
  // Docs entries point at the account's chosen framework, not the docs hub.
  const retarget = (item: NavItem): NavItem =>
    diy && item.href === "/docs" ? { ...item, href: FRAMEWORKS[diy.framework].docsHref } : item;

  return navSections
    .map((section) => ({
      label: section.label,
      items: section.items.flatMap((item) => {
        if (!item.children) {
          return allows(item.when, site, diy) && item.ready ? [retarget(item)] : [];
        }
        const children = item.children.filter(
          (child) => allows(child.when ?? item.when, site, diy) && child.ready,
        );
        return children.length > 0 ? [{ ...item, children }] : [];
      }),
    }))
    .filter((section) => section.items.length > 0);
}

function matches(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * Topbar label for the current route — the deepest matching entry wins, so
 * "/dashboard/content/blog" shows "Blog" while "/dashboard/content" shows
 * "Content". Reads the full planned nav, not the visible slice: the label must
 * resolve even on a route whose sidebar entry is gated off.
 */
export function pageLabel(pathname: string): string {
  let label = homeItem.label;
  let len = -1;
  for (const section of navSections) {
    for (const item of section.items) {
      if (matches(pathname, item.href) && item.href.length > len) {
        label = item.label;
        len = item.href.length;
      }
      for (const child of item.children ?? []) {
        if (matches(pathname, child.href) && child.href.length > len) {
          label = child.label;
          len = child.href.length;
        }
      }
    }
  }
  return label;
}

/** Label of the group that owns the current route, so it can start expanded. */
function activeGroupLabel(pathname: string): string | null {
  for (const section of navSections) {
    for (const item of section.items) {
      if (item.children && matches(pathname, item.href)) return item.label;
    }
  }
  return null;
}

/**
 * The one child considered active: the longest matching href. Needed because
 * the "Settings" child shares its href with the group, and would otherwise
 * light up together with "Domain" or "Backups".
 */
function activeChildHref(children: NavChild[], pathname: string): string | null {
  let best: string | null = null;
  for (const child of children) {
    if (matches(pathname, child.href) && (!best || child.href.length > best.length)) {
      best = child.href;
    }
  }
  return best;
}

const rowClass = (active: boolean) =>
  `flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
    active
      ? "bg-slate-100 font-semibold text-slate-900"
      : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

function NavLink({ item, active }: { item: NavItem | NavChild; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} className={rowClass(active)}>
      <Icon className="h-4.5 w-4.5 shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function NavGroup({
  item,
  pathname,
  open,
  onToggle,
}: {
  item: NavItem;
  pathname: string;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const activeHref = activeChildHref(item.children ?? [], pathname);

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={rowClass(!open && activeHref !== null)}
      >
        <Icon className="h-4.5 w-4.5 shrink-0" />
        <span className="truncate">{item.label}</span>
        <ChevronRight
          className={`ml-auto h-4 w-4 shrink-0 text-slate-400 transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>
      {open && (
        <div className="mt-1 flex flex-col gap-1">
          {(item.children ?? []).map((child) => {
            const ChildIcon = child.icon;
            const active = child.href === activeHref;
            return (
              <Link
                key={child.label}
                href={child.href}
                className={`flex items-center gap-3 rounded-lg py-2 pl-8 pr-2.5 text-sm transition-colors ${
                  active
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <ChildIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{child.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

type SidebarProps = {
  user: ShellUser;
  site: ShellSite | null;
  diy: DashboardData["diy"];
  credits: DashboardData["credits"];
  locale: string;
};

export default function Sidebar({ user, site, diy, locale }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const group = activeGroupLabel(pathname);
    return group ? { [group]: true } : {};
  });

  const activeGroup = activeGroupLabel(pathname);
  const effectiveOpen = activeGroup ? { ...open, [activeGroup]: true } : open;

  const toggle = (label: string) => setOpen((prev) => ({ ...prev, [label]: !prev[label] }));

  const sections = visibleSections(site, diy);

  /* One primary door to the site itself, in order of how real it is: the
     editor (none exists yet), the live address, the review preview, and for
     DIY accounts the site they linked themselves. External targets, hence
     <a> rather than Link. */
  const siteLink = site?.editUrl
    ? { href: site.editUrl, label: "Edit my site", icon: PenLine }
    : site?.url
      ? { href: site.url, label: "Visit my site", icon: ExternalLink }
      : site?.previewUrl
        ? { href: site.previewUrl, label: "See my preview", icon: Eye }
        : diy?.siteUrl
          ? { href: diy.siteUrl, label: "Visit my site", icon: ExternalLink }
          : null;

  return (
    <div className="sidebar-scroll flex h-full w-full flex-col overflow-y-auto bg-white p-4">
      <p className="px-2 pb-4 pt-1 text-xl font-bold tracking-tight text-slate-900">
        My Dashboard
      </p>

      <nav className="flex flex-col gap-1">
        <NavLink item={homeItem} active={pathname === homeItem.href} />
      </nav>

      {siteLink && (
        <a
          href={siteLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/40"
        >
          <siteLink.icon className="h-4 w-4" />
          {siteLink.label}
        </a>
      )}

      <label className="mt-3 flex cursor-text items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />

      </label>

      {/*<Link
        href="/dashboard/credits"
        className="mt-3 flex items-center gap-3 rounded-xl border border-blue-500/25 bg-blue-500/10 px-4 py-3 transition-colors hover:border-blue-500/40"
      >
        <Zap className="h-5 w-5 shrink-0 text-blue-700" />
        <span>
          <span className="block text-sm font-bold text-slate-900">
            {credits.available} credits
          </span>
          <span className="block text-xs text-slate-500">
            {credits.freePerMonth} free / month
          </span>
        </span>
      </Link>*/}

      {sections.map((section) => (
        <nav key={section.label} className="mt-6 flex flex-col gap-1">
          <p className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {section.label}
          </p>
          {section.items.map((item) =>
            item.children ? (
              <NavGroup
                key={item.label}
                item={item}
                pathname={pathname}
                open={!!effectiveOpen[item.label]}
                onToggle={() => toggle(item.label)}
              />
            ) : (
              <NavLink key={item.label} item={item} active={matches(pathname, item.href)} />
            ),
          )}
        </nav>
      ))}

      <div className="mt-auto flex flex-col gap-1 border-t border-slate-200 pt-4">
        {/* Who's signed in — and the door to their profile. Sits above Log out
            on purpose: on a shared laptop the question "is this my account?"
            wants an answer right next to the button that fixes it. */}
        <Link
          href="/dashboard/account"
          className={rowClass(matches(pathname, "/dashboard/account"))}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold uppercase text-white">
            {user.name.charAt(0)}
          </span>
          <span className="min-w-0 flex-1 text-left">
            <span className="block truncate font-semibold text-slate-900">{user.name}</span>
            <span className="block truncate text-xs font-normal text-slate-500">
              {user.email}
            </span>
          </span>
        </Link>

       {/* <span className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600">
          <Languages className="h-4.5 w-4.5" />
          {locale}
        </span>*/}
        {/* A link here only navigated away — the session cookie survived, so
            /dashboard let you straight back in. This actually ends it. */}
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut className="h-4.5 w-4.5" />
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
