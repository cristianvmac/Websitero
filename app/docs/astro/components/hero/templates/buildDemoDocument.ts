// ─────────────────────────────────────────────────────────
// buildDemoDocument
// Assembles a self-contained, runnable HTML document for the
// live-demo iframe in CodePreview. Reuses each example's real
// sampleRoot + sampleCss so the demo never drifts from the code
// shown in the tabs.
//
// `extraStyles` fills gaps that normally come from a global
// stylesheet (e.g. heroMain, whose CSS leans on CodeStitch base
// classes not present in its sample).
// ─────────────────────────────────────────────────────────
export function buildDemoDocument(
  root: string,
  css: string,
  body: string,
  extraStyles = "",
): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>${root}\n${extraStyles}\n${css}</style>
</head>
<body>${body}</body>
</html>`;
}
