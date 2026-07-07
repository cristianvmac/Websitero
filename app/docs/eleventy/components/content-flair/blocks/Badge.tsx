"use client";

import { COLORS, FONTS } from "../styles/tokens";
import type { BadgeProps } from "../types/codePreview";

/** Small pill label used in the page header area. */
export function Badge({ children, color = COLORS.accent }: BadgeProps) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 8px",
      borderRadius: 99,
      fontSize: 10,
      fontFamily: FONTS.mono,
      fontWeight: 500,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      border: `1px solid ${color}`,
      color: color,
      background: `${color}18`,
    }}>
      {children}
    </span>
  );
}
