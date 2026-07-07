// ─────────────────────────────────────────────────────────
// SCOPE CLASS
// All CSS is prefixed with this class to avoid leaking into
// the rest of the app.
// ─────────────────────────────────────────────────────────
export const SCOPE = "__lhd__";

// ─────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────
export const COLORS = {
  bg:          "gray-50",
  surface:     "#15161c",
  surface2:    "#1c1e28",
  border:      "#2a2d3a",
  borderSoft:  "#1f2130",
  text:        "black",
  textMuted:   "#6b7089",
  textDim:     "#3d4160",
  accent:      "#e8a84c",
  accentDim:   "#7a5520",
  hover:   "#fff"
};

export const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'DM Sans', sans-serif",
  mono:    "'DM Mono', 'Fira Code', monospace",
};

// Each code tab has its own highlight color
export const TAB_COLORS: Record<string, string> = {
  root:    "#60a5fa", // blue
  html:    "#f87171", // red
  css:     "#a78bfa", // purple
  js:      "#fbbf24", // yellow
  preview: "#e8a84c", // amber
};

// ─────────────────────────────────────────────────────────
// GLOBAL CSS (scoped to .${SCOPE})
// ─────────────────────────────────────────────────────────
export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

  .${SCOPE} {
    --bg:          ${COLORS.bg};
    --surface:     ${COLORS.surface};
    --surface2:    ${COLORS.surface2};
    --border:      ${COLORS.border};
    --border-soft: ${COLORS.borderSoft};
    --text:        ${COLORS.text};
    --text-muted:  ${COLORS.textMuted};
    --text-dim:    ${COLORS.textDim};
    --accent:      ${COLORS.accent};
    --accent-dim:  ${COLORS.accentDim};

    box-sizing: border-box;
    font-family: ${FONTS.body};
    -webkit-font-smoothing: antialiased;
    color: var(--text);
    background: var(--bg);
  }

  .${SCOPE} *, .${SCOPE} *::before, .${SCOPE} *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .${SCOPE} ::-webkit-scrollbar        { width: 6px; height: 6px; }
  .${SCOPE} ::-webkit-scrollbar-track  { background: var(--surface); }
  .${SCOPE} ::-webkit-scrollbar-thumb  { background: var(--border); border-radius: 99px; }

  @keyframes lhd-fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .${SCOPE} .fade-up   { animation: lhd-fadeUp 0.55s cubic-bezier(.22,.68,0,1.2) both; }
  .${SCOPE} .fade-up-2 { animation-delay: 0.08s; }
  .${SCOPE} .fade-up-3 { animation-delay: 0.16s; }
  .${SCOPE} .fade-up-4 { animation-delay: 0.24s; }
  .${SCOPE} .fade-up-5 { animation-delay: 0.32s; }

  @keyframes lhd-slideIn {
    from { transform: translateX(100%); opacity: 0.6; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  @keyframes lhd-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lhd-expand {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lhd-drawer           { animation: lhd-slideIn 0.28s cubic-bezier(.22,.68,0,1.2) both; }
  .lhd-backdrop         { animation: lhd-fadeIn  0.2s ease both; }
  .lhd-disclosure-panel { animation: lhd-expand  0.2s ease both; }

  .lhd-drawer-link {
    display: block;
    border-radius: 8px;
    padding: 10px 14px;    
    font-size: 15px;
    font-weight: 500;
    color: #c8cce0;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    font-family: ${FONTS.body};
  }
  .lhd-drawer-link:hover { background: rgba(255,255,255,0.06); color: #fff; }

  .lhd-drawer-sub-link {
    display: block;
    padding: 8px 14px 8px 36px;
    border-radius: 7px;
    font-size: 13px;
    color: #8b90aa;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    font-family: ${FONTS.body};
  }
  .lhd-drawer-sub-link:hover { background: rgba(255,255,255,0.05); color: #e8a84c; }

  .lhd-disclosure-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    color: #c8cce0;
    background: none;
    border: none;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    font-family: ${FONTS.body};
    text-align: left;
  }
  .lhd-disclosure-btn:hover { background: rgba(255,255,255,0.06); color: #fff; }

  .lhd-select {
    appearance: none;
    -webkit-appearance: none;
    background: var(--surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none' viewBox='0 0 10 6'%3E%3Cpath stroke='%236b7089' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M1 1l4 4 4-4'/%3E%3C/svg%3E") no-repeat right 10px center;
    border: 1px solid var(--border);
    border-radius: 7px;
    color: var(--text);
    font-family: ${FONTS.mono};
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 7px 30px 7px 10px;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s;
    min-width: 110px;
  }
  .lhd-select:focus { border-color: var(--accent); }
  .lhd-select option { background: #15161c; color: var(--text); }
`;
