import GenerateClient from "./generate-client";

/* Websitero "Build it from a prompt" — the owner describes their business in
   a line and we generate the site from it. Same Brief contract and /api/forme
   endpoint as the other two modes; the difference is the input, not the
   output: pages are composed from our docs-library variants and CodeStitch
   components, so what ships is pure HTML/CSS/JS the owner owns.

   The prompt arrives from the hero on /startyourwebsite (?prompt=…). */

export default async function Generate({
  searchParams,
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const { prompt } = await searchParams;
  return <GenerateClient initialPrompt={prompt ?? ""} />;
}
