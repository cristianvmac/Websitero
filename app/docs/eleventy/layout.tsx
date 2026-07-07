import DocsShell from "../DocsShell";

export default function DocsEleventyLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell framework="eleventy">{children}</DocsShell>;
}
