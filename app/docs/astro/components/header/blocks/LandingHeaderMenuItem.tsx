"use client";

import type { MenuItemProps } from "../types/navigation";
import { NavLink } from "./NavLink";
import { NavItemWithDropdown } from "./NavItemWithDropdown";

/**
 * Smart wrapper: renders a dropdown when subItems are provided,
 * or a plain NavLink otherwise.
 */
export function LandingHeaderMenuItem({ href, label, subItems }: MenuItemProps) {
  if (subItems && subItems.length > 0) {
    return <NavItemWithDropdown label={label} subItems={subItems} />;
  }
  return <NavLink href={href} label={label} />;
}
