"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  CreditCard,
  ExternalLink,
  Eye,
  Gift,
  Globe,
  Home,
  Image as ImageIcon,
  MapPin,
  MessageSquare,
  Newspaper,
  PenLine,
  Receipt,
  Search,
  ShoppingBag,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { FRAMEWORKS } from "@/lib/diy";
import { TIERS } from "@/lib/pricing";
import type { DashboardData, ShellSite } from "@/src/data/dashboard";
import type { ShellUser } from "./DashboardShell";
// Same panel the marketing header shows, opening left-ward from this corner.
import AccountMenu from "@/components/ui/AccountMenu";

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
  /** Always render this entry, whatever state the account is in — the app has
      one shape and everybody sees it. Overrides both gates: `when`, because a
      sidebar holding nothing but "Overview" reads as broken rather than new,
      and `ready`, because the route exists as an honest placeholder saying the
      feature isn't built. Its own page decides what to show (My Site is the
      one that offers to build you a site). */
  preview?: boolean;
};

export const homeItem: NavItem = { label: "Overview", href: "/dashboard", icon: Home };

export const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "My site",
    items: [
      { 
        label: "My Site", 
        href: "/dashboard/site", 
        icon: Globe, when: "live", 
        preview: true 
      },
      {
        label: "Blog",
        href: "/dashboard/site/blog",
        icon: Newspaper, when: "live",
        preview: true
      },
    ],
  },
  /* The presence platform, not just the website: the site is one surface, and
     these are the others a local business is actually judged on. All unbuilt —
     they exist here as teasers for an empty account, which is the whole point
     of `preview`. */
  {
    label: "Marketing",
    items: [
      { 
        label: "SEO & GEO", 
        href: "/dashboard/marketing/seo-geo", 
        icon: Search, 
        when: "live", 
        preview: true 
      },
      {
        label: "Google Business Profile",
        href: "/dashboard/marketing/google-business",
        icon: MapPin,
        when: "live",
        preview: true,
      },
    ],
  },
  {
    label: "Analytics",
    items: [
      {
        label: "Site Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
        when: "live",
        preview: true,
      },
    ],
  },
  {
    // "My activity" group with a label over a single row.
    label: "Inbox",
    items: [
      {
        label: "Messages",
        href: "/dashboard/messages",
        icon: MessageSquare,
        when: "site",
        preview: true,
      },

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
    ],
  },
];

/* Not in navSections: both are reached from the account menu at the top of the
   sidebar, so neither gets a nav row of its own. They still have to be listed
   somewhere, or pageLabel() would fall back to "Overview" in the topbar while
   you're standing on one. */
const menuItems: NavItem[] = [
  { label: "My Account", href: "/dashboard/account", icon: UserRound, ready: true },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard, ready: true },
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
    empty sections dropped entirely (an empty "My activity" header is noise).

    `preview` entries skip both gates and render for everyone — the app has one
    shape, whether or not there's a site behind it yet. Nothing is promised by
    that: each of those routes exists and says plainly what it is. Everything
    else still appears only when its stage and its page are both real. */
function visibleSections(site: ShellSite | null, diy: DashboardData["diy"]) {
  // Docs entries point at the account's chosen framework, not the docs hub.
  const retarget = (item: NavItem): NavItem =>
    diy && item.href === "/docs" ? { ...item, href: FRAMEWORKS[diy.framework].docsHref } : item;

  return navSections
    .map((section) => ({
      label: section.label,
      items: section.items.flatMap((item) => {
        const children = (item.children ?? []).filter(
          (child) => allows(child.when ?? item.when, site, diy) && child.ready,
        );
        /* A group whose sub-pages are all still gated off collapses to a plain
           link — a chevron that expands into nothing is a worse row than none.
           It becomes a real group again the day a child ships. */
        if (children.length > 0) return [{ ...item, children }];
        if (item.preview) return [{ ...item, children: undefined }];
        if (item.children) return [];
        return allows(item.when, site, diy) && item.ready ? [retarget(item)] : [];
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
  for (const section of [...navSections, { label: "", items: menuItems }]) {
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

  /* One row lights up at a time — the longest matching href wins, same rule as
     activeChildHref. Nested routes are why: /dashboard/site/blog is a prefix
     match for My Site as well as an exact match for Blog, and highlighting
     both makes the nav look like it's lost track of where you are. */
  const activeHref =
    sections
      .flatMap((section) => section.items)
      .filter((item) => matches(pathname, item.href))
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null;

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
    <div className="flex h-full w-full flex-col bg-white">
      {/* Outside the scroll container on purpose: `overflow-y-auto` clips on
          both axes, so in there the open panel would be cut off at the
          sidebar's edge. Identity + the door to the account page + Log out all
          live in here now, which is why there's no footer block below. */}
      <div className="shrink-0 px-4 pb-2 pt-3">
        <AccountMenu
          user={user}
          align="left"
          trigger="identity"
          // Null until the team scopes the brief during triage — no badge
          // rather than a guessed one.
          plan={site?.tier ? TIERS[site.tier].label : null}
        />
      </div>

      <div className="sidebar-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4">
       <nav className="flex flex-col gap-1">
          <NavLink item={homeItem} active={pathname === homeItem.href} />
        </nav>

       {/* {siteLink && (
          <a
            href={siteLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/40"
          >
            <siteLink.icon className="h-4 w-4" />
            {siteLink.label}
          </a>
        )}*/}

        {/*
        <label className="mt-3 flex cursor-text items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
        */}
        {sections.map((section) => (
          <nav key={section.label} className="mt-6 flex flex-col gap-1">
            {section.label && (
              <p className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {section.label}
              </p>
            )}
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
                <NavLink key={item.label} item={item} active={item.href === activeHref} />
              ),
            )}
          </nav>
        ))}
      </div>
    </div>
  );
}
