"use client";

import { useState } from "react";
import { COLORS, FONTS } from "../styles/tokens";
import type { MobileDrawerProps, MenuItemProps } from "../types/navigation";
import { CloseButton } from "./CloseButton";

/**
 * A slide-in panel from the right side of the screen.
 * Items with subItems render as accordion groups.
 */
export function MobileDrawer({ items, onClose }: MobileDrawerProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function toggleGroup(label: string) {
    setOpenGroup(openGroup === label ? null : label);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
      {/* Backdrop */}
      <div
        className="lhd-backdrop"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Drawer panel */}
      <aside
        className="lhd-drawer"
        style={{
          position: "relative",
          zIndex: 1,
          width: 280,
          maxWidth: "85vw",
          background: "#0f1018",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-24px 0 80px rgba(0,0,0,0.6)",
          overflowY: "auto",
        }}
      >
        {/* Top bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px 16px",
          borderBottom: "1px solid #1f2130",
        }}>
          <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 15, color: "#f0f0f5" }}>
            YourBrand
          </span>
          <CloseButton onClick={onClose} />
        </div>

        {/* Nav list */}
        <nav style={{
          padding: "12px 10px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
          {items.map((item, index) => {
            const { label, href, subItems } = item.props as MenuItemProps;
            const isGroupOpen = openGroup === label;

            if (subItems && subItems.length > 0) {
              return (
                <div key={index}>
                  <button
                    className="lhd-disclosure-btn"
                    onClick={() => toggleGroup(label)}
                  >
                    <span>{label}</span>
                    <svg
                      width="14" height="14" viewBox="0 0 12 12" fill="none"
                      style={{
                        transition: "transform 0.22s",
                        transform: isGroupOpen ? "rotate(180deg)" : "rotate(0deg)",
                        flexShrink: 0,
                      }}
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {isGroupOpen && (
                    <div className="lhd-disclosure-panel" style={{ paddingBottom: 4 }}>
                      <div style={{
                        margin: "4px 14px 6px",
                        height: 1,
                        background: "linear-gradient(90deg, #e8a84c44, transparent)",
                      }} />
                      {subItems.map((sub) => (
                        <a key={sub.href} href={sub.href} className="lhd-drawer-sub-link">
                          <span style={{ display: "block", fontWeight: 500, color: "#c8cce0" }}>
                            {sub.label}
                          </span>
                          {sub.description && (
                            <span style={{ display: "block", fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>
                              {sub.description}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a key={index} href={href} className="lhd-drawer-link" onClick={onClose}>
                {label}
              </a>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
