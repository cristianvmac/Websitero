"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  // Aliased: callers commonly have lucide's hamburger `Menu` in scope too.
  Menu as HeadlessMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDown, CreditCard, LogOut, Rocket, Settings } from "lucide-react";
import LogOutButton from "@/components/auth/LogOutButton";

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

export type AccountMenuUser = { name?: string | null; email?: string | null };

/** First name, or the part of the email before the @ — whatever fits a nav
    slot. Someone who signed up as "Ana Maria Popescu" gets "Ana". */
export function shortName(user: AccountMenuUser): string {
  const first = user.name?.trim().split(/\s+/)[0];
  return first || user.email?.split("@")[0] || "My account";
}

/**
 * Avatar + chevron that opens the identity/settings/log-out panel. Shared by
 * the marketing header (right-aligned) and the dashboard sidebar, whose slot
 * sits at the top-left and so needs the panel to open the other way.
 *
 * Headless UI's Menu, not a hand-rolled useState toggle: it brings the parts
 * that are tedious to get right by hand — click-outside and Escape to close,
 * focus moving into the panel and returning to the button, arrow-key
 * navigation, and the aria-expanded / aria-haspopup wiring.
 */
export default function AccountMenu({
  user,
  align = "right",
  trigger = "avatar",
  plan = null,
  className = "",
}: {
  user: AccountMenuUser;
  align?: "left" | "right";
  /** Package name for the Billing row's badge ("All-in"). Null when there's no
      brief yet, or when the caller can't know — the marketing header has only
      the session, not the site — and then the row simply carries no badge. */
  plan?: string | null;
  /** "avatar": initial + chevron, for a tight nav slot. "identity": the name
      and email spelled out, for the sidebar, which has the width for it and
      where "am I in the right account?" is worth answering without a click. */
  trigger?: "avatar" | "identity";
  className?: string;
}) {
  const identity = trigger === "identity";
  /* "Dashboard" is a door you're already standing in once you're inside it —
     the sidebar is right there. Dropped rather than disabled: a row that does
     nothing is worse than no row. */
  const pathname = usePathname();
  const inDashboard = pathname?.startsWith("/dashboard") ?? false;

  return (
    <HeadlessMenu as="div" className={`relative ${className}`}>
      {/* cursor-pointer because Tailwind v4's preflight sets buttons to
          cursor:default — without it the trigger doesn't read as clickable.
          Blue on hover and while open, matching the rows in the panel it
          opens. */}
      <MenuButton
        className={`group cursor-pointer items-center text-sm font-medium text-slate-700 transition-colors hover:bg-blue-500/10 hover:text-blue-700 data-open:bg-blue-500/10 data-open:text-blue-700 ${
          identity
            ? "flex w-full gap-2.5 rounded-xl p-1.5 text-left"
            : "inline-flex gap-1.5 rounded-full py-1 pl-1 pr-2"
        }`}
      >
        <span
          className={`flex shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold uppercase text-white ${
            identity ? "h-9 w-9 text-sm" : "h-7 w-7 text-xs"
          }`}
        >
          {shortName(user).charAt(0)}
        </span>

        {/* min-w-0 + truncate: a long address shortens rather than pushing the
            chevron out of the sidebar. */}
        {identity && (
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold text-slate-900">
              {user.name?.trim() || shortName(user)}
            </span>
            <span className="block truncate text-xs font-normal text-slate-500">{user.email}</span>
          </span>
        )}

        {/* Rotates to point up while the panel is open, so the button shows
            the state of the thing it controls. */}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:text-blue-600 group-data-open:rotate-180 group-data-open:text-blue-600 ${
            identity ? "self-center" : ""
          }`}
        />
        <span className="sr-only">Account menu</span>
      </MenuButton>

      {/* `transition` + data-closed is Headless UI v2's own API — it owns the
          mount/unmount timing, so no <Transition> wrapper.

          modal={false} matters here: left at its default of true, opening the
          menu locks page scroll (overflow:hidden on the document). That
          removes the scrollbar, the viewport gets ~15px wider, and the fixed
          full-width header re-centers — the whole nav visibly jumps right on
          every open. Scroll locking is for dialogs, where trapping the user is
          the point; a nav dropdown just pays the layout shift. */}
      <MenuItems
        transition
        modal={false}
        className={`absolute z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 transition duration-100 ease-out focus:outline-none data-closed:-translate-y-1 data-closed:opacity-0 ${
          // Identity mode already shows the name above; the panel just lines up
          // under the trigger it belongs to, and pads itself since it has no
          // header block to open with.
          identity ? "w-full py-1" : "w-72"
        } ${align === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right"}`}
      >
        {/* Whose account this is — worth repeating right above Log out on a
            shared laptop. Skipped when the trigger already spells it out an
            inch higher. */}
        {!identity && (
          <>
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
          </>
        )}

        {!inDashboard && (
          <MenuItem>
            <Link href="/dashboard" className={menuRowClass}>
              <Rocket className={menuIconClass} />
              Dashboard
            </Link>
          </MenuItem>
        )}
          {/* The badge answers "what am I on?" without the trip to the page.
            ml-auto keeps it pinned right however long the plan name is. */}
        <MenuItem>
          <Link href="/dashboard/billing" className={menuRowClass}>
            <CreditCard className={menuIconClass} />
            Billing
            {plan && (
              <span className="ml-auto shrink-0 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-700">
                {plan}
              </span>
            )}
          </Link>
        </MenuItem>

        <MenuItem>
          <Link href="/dashboard/account" className={menuRowClass}>
            <Settings className={menuIconClass} />
            Account Settings
          </Link>
        </MenuItem>

        {/* A link to /login would only navigate — the session cookie survives
            it. This ends the session, and clears the useSession store so the
            header stops showing the name on the way out. */}
        <div className="border-t border-slate-100">
          <MenuItem>
            <LogOutButton className={`${menuRowClass} font-semibold`}>
              <LogOut className={menuIconClass} />
              Log Out
            </LogOutButton>
          </MenuItem>
        </div>
      </MenuItems>
    </HeadlessMenu>
  );
}
