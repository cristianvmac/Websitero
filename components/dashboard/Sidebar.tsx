"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronRight,
  ContactRound,
  FileText,
  Gift,
  Globe,
  Home,
  Languages,
  LogOut,
  MessageSquare,
  PenLine,
  Palette,
  Receipt,
  Search,
  Settings,
  ShoppingBag,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { DashboardData } from "@/src/data/dashboard";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Items that will get their own sub-pages later show a chevron. */
  hasChildren?: boolean;
};

export const homeItem: NavItem = { label: "Home", href: "/dashboard", icon: Home };

export const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "My site",
    items: [
      { label: "My Site", href: "/dashboard/site", icon: Globe },
      { label: "Content", href: "/dashboard/content", icon: FileText, hasChildren: true },
      { label: "Appearance", href: "/dashboard/appearance", icon: Palette, hasChildren: true },
      { label: "Settings", href: "/dashboard/settings", icon: Settings, hasChildren: true },
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

/** Topbar label for the current route, e.g. "/dashboard/content" -> "Content". */
export function pageLabel(pathname: string): string {
  const all = navSections.flatMap((s) => s.items);
  const match = all.find((i) => pathname === i.href || pathname.startsWith(i.href + "/"));
  return match?.label ?? homeItem.label;
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors ${
        active
          ? "bg-slate-100 font-semibold text-slate-900"
          : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon className="h-4.5 w-4.5 shrink-0" />
      <span className="truncate">{item.label}</span>
      {item.hasChildren && <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />}
    </Link>
  );
}

type SidebarProps = {
  site: DashboardData["site"];
  credits: DashboardData["credits"];
  locale: string;
};

export default function Sidebar({ site, credits, locale }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="sidebar-scroll flex h-full w-full flex-col overflow-y-auto bg-white p-4">
      <p className="px-2 pb-4 pt-1 text-xl font-bold tracking-tight text-slate-900">
        My Dashboard
      </p>

      <nav className="flex flex-col gap-1">
        <NavLink item={homeItem} active={pathname === homeItem.href} />
      </nav>

      <Link
        href={site.editUrl}
        target="_blank"
        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#4588ba] to-[#316994] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#4588ba]/25 transition-all hover:shadow-lg hover:shadow-[#4588ba]/40"
      >
        <PenLine className="h-4 w-4" />
        Edit my site
      </Link>

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
        className="mt-3 flex items-center gap-3 rounded-xl border border-[#4588ba]/25 bg-[#4588ba]/10 px-4 py-3 transition-colors hover:border-[#4588ba]/40"
      >
        <Zap className="h-5 w-5 shrink-0 text-[#316994]" />
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
          {section.items.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={pathname === item.href || pathname.startsWith(item.href + "/")}
            />
          ))}
        </nav>
      ))}

      <div className="mt-auto flex flex-col gap-1 border-t border-slate-200 pt-4">
        <span className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600">
          <Languages className="h-4.5 w-4.5" />
          {locale}
        </span>
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <LogOut className="h-4.5 w-4.5" />
          Log out
        </Link>
      </div>
    </div>
  );
}
