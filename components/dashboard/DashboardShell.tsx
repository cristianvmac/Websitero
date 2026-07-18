"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PanelLeft, X } from "lucide-react";
import type { DashboardData, ShellSite } from "@/src/data/dashboard";
import Sidebar, { pageLabel } from "./Sidebar";

export type ShellUser = { name: string; email: string };

type DashboardShellProps = {
  user: ShellUser;
  site: ShellSite | null;
  diy: DashboardData["diy"];
  credits: DashboardData["credits"];
  locale: string;
  children: React.ReactNode;
};

export default function DashboardShell({
  user,
  site,
  diy,
  credits,
  locale,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();
  // Independent toggles: the drawer only exists below lg, the static aside only at lg+.
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopHidden, setDesktopHidden] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-900">
      {/* Static sidebar (desktop) */}
      <aside
        className={`${
          desktopHidden ? "hidden" : "hidden lg:flex"
        } w-72 shrink-0 border-r border-slate-200`}
      >
        <Sidebar user={user} site={site} diy={diy} credits={credits} locale={locale} />
      </aside>

      {/* Drawer sidebar (mobile) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-900/40"
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] bg-white shadow-xl">
            <Sidebar user={user} site={site} diy={diy} credits={credits} locale={locale} />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 px-4 lg:px-6">
          <button
            type="button"
            onClick={() => {
              setMobileOpen((v) => !v);
              setDesktopHidden((v) => !v);
            }}
            aria-label="Toggle sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-slate-700">{pageLabel(pathname)}</span>

          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Back to home page</span>
          </Link>
        </header>

        <main className="main-scroll flex-1 overflow-y-auto bg-white">
          <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
