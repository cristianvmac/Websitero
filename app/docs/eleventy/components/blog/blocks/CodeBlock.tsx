"use client";

import { FONTS } from "../styles/tokens";

/** Dark code panel with a line-number gutter on the left. */
export function CodeBlock({ code }: { code: string }) {
  const lines = code.trim().split("\n");

  return (
    <pre style={{
      background: "#090a0e",
      color: "#c9d0e8",
      fontSize: 12,
      lineHeight: 1.75,
      padding: "20px 0",
      overflowX: "auto",
      fontFamily: FONTS.mono,
      display: "flex",
    }}>
      {/* Line number gutter — userSelect: none prevents copying line numbers */}
      <div style={{
        userSelect: "none",
        color: "#2d3050",
        textAlign: "right",
        padding: "0 16px 0 20px",
        minWidth: 48,
        borderRight: "1px solid #1c1e2a",
        marginRight: 20,
      }}>
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <code style={{ flex: 1, paddingRight: 20 }}>
        {code.trim()}
      </code>
    </pre>
  );
}
