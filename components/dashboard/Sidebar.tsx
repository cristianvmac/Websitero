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
import type { DashboardData } from "@/src/data/dashboard";
import { signOut } from "@/lib/auth-actions";

type NavChild = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Groups expand in place; their sub-pages are added as routes later. */
  children?: NavChild[];
};

export const homeItem: NavItem = { label: "Overview", href: "/dashboard", icon: Home };

export const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "My site",
    items: [
      { label: "My Site", href: "/dashboard/site", icon: Globe },
      {
        label: "Content",
        href: "/dashboard/content",
        icon: FileText,
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
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
      { label: "Contact form", href: "/dashboard/contact-form", icon: ContactRound },
    ],
  },
  {
    label: "My account",
    items: [
      { label: "Credits", href: "/dashboard/credits", icon: Zap },
      { label: "Add-ons & extras", href: "/dashboard/addons", icon: ShoppingBag },
      { label: "Orders", href: "/dashboard/orders", icon: Receipt },
      { label: "Referral", href: "/dashboard/referral", icon: Gift },
      { label: "My Account", href: "/dashboard/account", icon: UserRound },
    ],
  },
];

function matches(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * Topbar label for the current route — the deepest matching entry wins, so
 * "/dashboard/content/blog" shows "Blog" while "/dashboard/content" shows "Content".
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
  site: DashboardData["site"];
  credits: DashboardData["credits"];
  locale: string;
};

export default function Sidebar({ site, credits, locale }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const group = activeGroupLabel(pathname);
    return group ? { [group]: true } : {};
  });

  const activeGroup = activeGroupLabel(pathname);
  const effectiveOpen = activeGroup ? { ...open, [activeGroup]: true } : open;

  const toggle = (label: string) => setOpen((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div className="sidebar-scroll flex h-full w-full flex-col overflow-y-auto bg-white p-4">
      <p className="px-2 pb-4 pt-1 text-xl font-bold tracking-tight text-slate-900">
        My Dashboard
      </p>

      <nav className="flex flex-col gap-1">
        <NavLink item={homeItem} active={pathname === homeItem.href} />
      </nav>

      {/* Hidden until there's a site with a real editUrl behind it. */}
      {site?.editUrl && (
        <Link
          href={site.editUrl}
          target="_blank"
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/40"
        >
          <PenLine className="h-4 w-4" />
          Edit my site
        </Link>
      )}

      <label className="mt-3 flex cursor-text items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
          ⌘K
        </kbd>
      </label>

      <Link
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
      </Link>

      {navSections.map((section) => (
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
        <span className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600">
          <Languages className="h-4.5 w-4.5" />
          {locale}
        </span>
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
