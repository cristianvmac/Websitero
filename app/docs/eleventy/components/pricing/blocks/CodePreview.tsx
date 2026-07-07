"use client";

import { useState, useRef } from "react";
import { COLORS, FONTS, TAB_COLORS } from "../styles/tokens";
import type { CodePreviewProps, TabButtonProps, CopyButtonProps } from "../types/codePreview";
import { useIsMobile } from "../hooks/useIsMobile";
import { CodeBlock } from "./CodeBlock";

// ─────────────────────────────────────────────────────────
// SUB-COMPONENT: TabButton
// ─────────────────────────────────────────────────────────
function TabButton({ tab, isActive, onClick }: TabButtonProps) {
  const [hovered, setHovered] = useState(false);
  const accent = TAB_COLORS[tab] ?? COLORS.accent;

  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        fontSize: 11,
        fontFamily: FONTS.mono,
        fontWeight: 500,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        background: "none",
        border: "none",
        borderBottom: isActive ? `2px solid ${accent}` : "2px solid transparent",
        color: isActive ? accent : hovered ? COLORS.hover : COLORS.textMuted,
        cursor: "pointer",
        transition: "color 0.18s, border-color 0.18s",
        marginBottom: -1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tab}
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// SUB-COMPONENT: CopyButton
// ─────────────────────────────────────────────────────────
function CopyButton({ copied, onClick, compact = false }: CopyButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 10,
        fontFamily: FONTS.mono,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: compact ? "6px 10px" : "4px 10px",
        border: "1px solid var(--border)",
        borderRadius: 6,
        background: copied ? COLORS.accentDim : COLORS.surface,
        color:  copied ? COLORS.accent : COLORS.textMuted,
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? (compact ? "✓" : "✓ Copied") : "Copy"}
    </button>
  );
}

// ─────────────────────────────────────────────────────────
// SUB-COMPONENT: CodeNavBar
// Jump-to-line buttons for long files (> 50 lines)
// ─────────────────────────────────────────────────────────
function CodeNavBar({ code, onJump }: { code: string; onJump: (line: number) => void }) {
  const totalLines = code.split("\n").length;
  const chunkSize  = 50;
  const chunks     = Math.ceil(totalLines / chunkSize);

  if (chunks <= 1) return null;

  return (
    <div style={{
      display: "flex",
      gap: 4,
      padding: "6px 12px",
      background: "var(--surface2)",
      borderBottom: "1px solid var(--border)",
      flexWrap: "wrap",
    }}>
      {Array.from({ length: chunks }, (_, i) => {
        const start = i * chunkSize + 1;
        const end   = Math.min((i + 1) * chunkSize, totalLines);
        return (
          <button
            key={i}
            onClick={() => onJump(start)}
            style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 6,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            {start}–{end}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT: CodePreview
// ─────────────────────────────────────────────────────────

const ALL_TABS = ["preview", "root", "html", "css", "js"] as const;

/**
 * Shows a live preview pane + code tabs (Root / HTML / CSS / JS).
 * On mobile, the tab row collapses to a <select> dropdown.
 */
export function CodePreview({ root, html, css, js, preview }: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [copied,    setCopied]    = useState(false);
  const isMobile     = useIsMobile();
  const codeScrollRef = useRef<HTMLDivElement>(null);

  const codeByTab: Record<string, string> = { root, html, css, js };
  const currentAccent = TAB_COLORS[activeTab] ?? COLORS.accent;

  function handleJump(line: number) {
    const LINE_HEIGHT = 22;
    codeScrollRef.current?.scrollTo({ top: (line - 1) * LINE_HEIGHT, behavior: "smooth" });
  }

  async function handleCopy() {
    if (activeTab === "preview") return;
    const text = codeByTab[activeTab];
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.warn("Copy failed:", err);
    }
  }

  return (
    <div style={{
      border: "1px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
      background: "var(--surface)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
    }}>
      {/* Tab bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "var(--surface2)",
        borderBottom: "1px solid var(--border)",
        padding: isMobile ? "8px 10px" : "0 12px",
        gap: 8,
      }}>
        {isMobile ? (
          <>
            <select
              className="lhd-select"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              style={{ borderColor: currentAccent, color: currentAccent }}
            >
              {ALL_TABS.map((tab) => (
                <option key={tab} value={tab}>{tab.toUpperCase()}</option>
              ))}
            </select>
            {activeTab !== "preview" && (
              <CopyButton copied={copied} onClick={handleCopy} compact />
            )}
          </>
        ) : (
          <>
            <div style={{ display: "flex" }}>
              {ALL_TABS.map((tab) => (
                <TabButton
                  key={tab}
                  tab={tab}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              ))}
            </div>
            {activeTab !== "preview" && (
              <CopyButton copied={copied} onClick={handleCopy} />
            )}
          </>
        )}
      </div>

      {/* Content */}
      {activeTab === "preview" ? (
        <div style={{
          background: "#fff",
          backgroundImage: "radial-gradient(circle at 1px 1px, #d8dde8 1px, transparent 0)",
          backgroundSize: "20px 20px",
          width: "100%",
          height: "auto",
          maxHeight: 520,
         // overflow: "auto",
          display: "block"
        }}>
          {preview}
        </div>
      ) : (
        <>
          <CodeNavBar code={codeByTab[activeTab]} onJump={handleJump} />
          <div ref={codeScrollRef} style={{ maxHeight: 480, overflowY: "auto" }}>
            <CodeBlock code={codeByTab[activeTab]} />
          </div>
        </>
      )}
    </div>
  );
}
