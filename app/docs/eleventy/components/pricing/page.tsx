"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

// Styles
import { SCOPE, FONTS, COLORS, globalStyles } from "./styles/tokens";

// Components
import { Badge }       from "./blocks/Badge";
import { CodePreview } from "./blocks/CodePreview";

// Data
import { examples } from "./templates/pricingTemplates";

// ─────────────────────────────────────────────────────────
// PAGE: Header
// Assembles the full documentation page for the Navigation /
// Header component. All sub-components and data live in their
// own files; this file is a pure orchestrator.
// ─────────────────────────────────────────────────────────
export default function Pricing() {
  const [mounted, setMounted] = useState(false);

  // Trigger fade-up entrance animations after mount
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Inject scoped CSS */}
      <style>{globalStyles}</style>

      {/* Root wrapper — carries the SCOPE class and all CSS variables */}
      <div
        className={SCOPE}
        style={{
          minHeight: "100%",
          background: "var(--bg)",
          color: "var(--text)",
          fontFamily: FONTS.body,
        }}
      >
      

        {/* Scrollable content column */}
        <div style={{
          maxWidth: 864,
          margin: "0 auto",
          padding: "72px 48px 120px",
          position: "relative",
          zIndex: 1,
        }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
            <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Eleventy
            </Link>
            <span><LuChevronRight /></span>
            <Link href="/docs/eleventy/components" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Components
            </Link>
            <span><LuChevronRight /></span>
            <span aria-current="page">Pricing</span>
          </nav>

          {/* ── Page heading ── */}
          <div
            className={`fade-up ${mounted ? "" : "opacity-0"}`}
            style={{ marginBottom: 56 }}
          >
         

            <h1 style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: 14,
            }}>
              Pricing
            </h1>

            <p style={{
              fontSize: 20,
              lineHeight: 1.5,
              color: "var(--text-muted)",
            //  maxWidth: 520,
              fontWeight: 300,
            }}>
              A flexible pricing section showcasing multiple plans with clear feature breakdowns, comparison-friendly layouts, and optional toggles for billing periods, designed to adapt seamlessly across screen sizes and themes.
            </p>

            {/* Amber gradient divider */}
            <div style={{
              marginTop: 32,
              height: 1,
              background: "linear-gradient(90deg, var(--accent) 0%, var(--border) 40%, transparent 100%)",
              opacity: 0.4,
            }} />
          </div>

          {/* ── Examples loop ── */}
          {examples.map((example, i) => (
            <section
              key={i}
              className={`fade-up fade-up-${i + 2}`}
              style={{ marginBottom: 52 }}
            >
              {/* Section number + title */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                <span style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                  color: COLORS.accent,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.6,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}>
                  {example.title}
                </h2>
              </div>

              <p style={{
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 14,
                lineHeight: 1.6,
                fontWeight: 300,
              }}>
                {example.description}
              </p>

              <CodePreview {...example.code} preview={example.preview} />
            </section>
          ))}

          {/* ── Footer ── */}
          <div style={{
            borderTop: "1px solid var(--border-soft)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: FONTS.mono }}>
              Navigation / Header
            </span>
            <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: FONTS.mono }}>
              v1.0.0
            </span>
          </div>

        </div>
      </div>
    </>
  );
}
