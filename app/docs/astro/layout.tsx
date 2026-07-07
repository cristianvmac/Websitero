import DocsShell from "../DocsShell";

export default function DocsAstroLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell framework="astro">{children}</DocsShell>;
}
