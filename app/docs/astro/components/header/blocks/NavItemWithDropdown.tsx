"use client";

import React, { useState, useEffect } from "react";
import { COLORS, FONTS } from "../styles/tokens";
import type { MenuItemProps } from "../types/navigation";
import { DropdownItem } from "./DropdownItem";

type NavItemWithDropdownProps = Required<Pick<MenuItemProps, "label" | "subItems">>;

/**
 * A nav button that opens a floating panel of sub-links below it.
 * Closes automatically when the user clicks outside.
 */
export function NavItemWithDropdown({ label, subItems }: NavItemWithDropdownProps) {
  const [isOpen,  setIsOpen]  = useState(false);
  const [hovered, setHovered] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleOutsideClick(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          color: isOpen || hovered ? COLORS.accent : COLORS.textMuted,
          letterSpacing: "0.02em",
          fontWeight: 400,
          fontFamily: FONTS.body,
          padding: 0,
          transition: "color 0.2s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {label}
        {/* Chevron — rotates 180° when open */}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1a1c26",
          border: "1px solid #2a2d3a",
          borderRadius: 12,
          minWidth: 220,
          zIndex: 100,
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          overflow: "hidden",
          animation: "lhd-expand 0.18s ease both",
        }}>
          {subItems.map((item) => (
            <DropdownItem key={item.href} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
