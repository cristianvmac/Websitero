"use client";

import { useState } from "react";
import { COLORS, FONTS } from "../styles/tokens";
import type { SubItem } from "../types/navigation";

/** A single row inside the floating dropdown panel. */
export function DropdownItem({ item }: { item: SubItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.href}
      style={{
        display: "block",
        padding: "10px 16px",
        textDecoration: "none",
        background: hovered ? "rgba(255,255,255,0.04)" : "transparent",
        borderBottom: "1px solid #1f2130",
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text, fontFamily: FONTS.body }}>
        {item.label}
      </div>
      {item.description && (
        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2, fontFamily: FONTS.body }}>
          {item.description}
        </div>
      )}
    </a>
  );
}
