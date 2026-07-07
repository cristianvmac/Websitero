"use client";

import React, { useState, useEffect } from "react";
import { FONTS } from "../styles/tokens";
import type { LandingHeaderProps } from "../types/navigation";
import { HamburgerButton } from "./HamburgerButton";
import { MobileDrawer } from "./MobileDrawer";

/**
 * Main header component.
 * - Desktop (≥ 520 px): nav links shown inline.
 * - Mobile (< 520 px): hamburger opens a slide-over drawer.
 *
 * Uses ResizeObserver on its own element so the preview box
 * also collapses correctly inside narrow containers.
 */
export function LandingHeader({
  logoComponent,
  children,
  withBackground = false,
  variant = "primary",
}: LandingHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const isDark = variant === "secondary";

  // Watch the header's own width (not window width)
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new ResizeObserver(([entry]) => {
      setIsMobile(entry.contentRect.width < 520);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const navItems = React.Children.toArray(children) as React.ReactElement[];

  const headerBg = withBackground
    ? isDark ? "#0a0b0e" : "#ffffff"
    : "transparent";

  const headerBorder = withBackground
    ? isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid #e8ecf2"
    : "none";

  const logoColor = isDark ? "#f0f0f0" : "#0e0f13";

  return (
    <>
      <header
        ref={headerRef}
        style={{
          width: "100%",
          background: headerBg,
          borderBottom: headerBorder,
          position: "relative",
        }}
      >
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 20px",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}>
          {/* Logo */}
          {logoComponent ?? (
            <span style={{
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: 16,
              color: logoColor,
              letterSpacing: "-0.01em",
              flexShrink: 0,
            }}>
              YourBrand
            </span>
          )}

          {isMobile ? (
            <HamburgerButton isDark={isDark} onClick={() => setDrawerOpen(true)} />
          ) : (
            <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {children}
            </nav>
          )}
        </div>
      </header>

      {drawerOpen && (
        <MobileDrawer items={navItems} onClose={() => setDrawerOpen(false)} />
      )}
    </>
  );
}
