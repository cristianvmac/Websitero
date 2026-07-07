"use client";

import { useState } from "react";
import { COLORS, FONTS } from "../styles/tokens";
import type { MenuItemProps } from "../types/navigation";

type NavLinkProps = Pick<MenuItemProps, "href" | "label">;

/** A single nav link in the desktop header. Turns amber on hover. */
export function NavLink({ href, label }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      style={{
        fontSize: 13,
        color: hovered ? COLORS.accent : COLORS.textMuted,
        textDecoration: "none",
        letterSpacing: "0.02em",
        fontWeight: 400,
        transition: "color 0.2s",
        fontFamily: FONTS.body,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  );
}
