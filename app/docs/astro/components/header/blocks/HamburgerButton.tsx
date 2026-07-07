"use client";

import { useState } from "react";
import { COLORS } from "../styles/tokens";
import type { HamburgerButtonProps } from "../types/navigation";

/** The ☰ button shown on mobile to open the drawer. */
export function HamburgerButton({ isDark, onClick }: HamburgerButtonProps) {
  const [hovered, setHovered] = useState(false);

  const borderColor = hovered
    ? COLORS.accent
    : isDark ? "rgba(255,255,255,0.12)" : "#dde2ec";

  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      style={{
        background: "none",
        border: `1px solid ${borderColor}`,
        borderRadius: 7,
        padding: "6px 8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isDark ? "#aab0c8" : "#5a6180",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <path d="M0 1h16M0 7h16M0 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
