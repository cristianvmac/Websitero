// Stage 3 of the pipeline: Claude writes the site copy from the owner's brief.
// Returns an object matching the kit's copy schema exactly (structured outputs
// guarantee the shape), or null when generation isn't possible — the build
// script then falls back to deterministic placeholder copy.
//
// Also exports generateBlogPosts(): three starter blog posts that replace the
// kit's lorem demo posts (same null-on-failure contract).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Mirrors the kit's src/_data/copy.js shape — keep the two in sync.
const SiteCopy = z.object({
  meta: z.object({
    title: z.string().describe("SEO page title, under 60 chars: business | type in city"),
    description: z.string().describe("Meta description, under 160 chars, plain and inviting"),
  }),
  hero: z.object({
    topper: z.string().describe("Short eyebrow line above the headline"),
    title: z.string().describe("Headline; may contain one <br /> for a line break"),
    text: z.string().describe("1-2 sentence subheadline selling the outcome"),
  }),
  services: z
    .array(z.object({ title: z.string(), text: z.string().describe("1-2 sentences") }))
    .describe("Exactly 3 cards for the business's actual core services"),
  about: z.object({
    topper: z.string(),
    title: z.string(),
    paragraphs: z.array(z.string()).describe("Exactly 2 paragraphs, 2-3 sentences each"),
    quote: z.string().describe("Short owner's-promise pull quote"),
    name: z.string().describe("Signature line, e.g. 'The <business> Team'"),
    job: z.string().describe("Signature subline, e.g. the location"),
  }),
  seo: z.object({
    topper: z.string(),
    title: z.string().describe("H2 targeting the main local search term"),
    paragraphs: z.array(z.string()).describe("Exactly 2 paragraphs weaving in the city naturally"),
  }),
  gallery: z.object({ topper: z.string(), title: z.string() }),
  reviews: z.object({
    topper: z.string(),
    title: z.string(),
    text: z.string(),
    items: z
      .array(z.object({ text: z.string(), name: z.string(), desc: z.string() }))
      .describe("Exactly 3 placeholder reviews"),
  }),
  faq: z.object({
    topper: z.string(),
    title: z.string(),
    text: z.string(),
    items: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .describe("3-4 questions a real customer of this business type would ask"),
  }),
});

// Starter blog posts — the kit's blog nav link should never lead to lorem.
const BlogPosts = z.object({
  posts: z
    .array(
      z.object({
        title: z.string().describe("Post title, under 60 chars, plain and useful — no clickbait"),
        slug: z.string().describe("kebab-case URL slug derived from the title"),
        description: z.string().describe("Meta description, under 160 chars"),
        body: z
          .string()
          .describe(
            "Post body in markdown: 300-450 words, 2-3 '##' sections, no H1 (the layout renders the title). Genuinely useful for this business's customers, locally relevant, written by the owner's voice.",
          ),
      }),
    )
    .describe("Exactly 3 posts: one welcome/behind-the-scenes, two practical customer guides"),
});

const BLOG_SYSTEM = `You write starter blog posts for a local small business's new website. The reader is a potential customer in the business's city.

Rules:
- Plain, warm, concrete language. No jargon, no hype words.
- Local SEO aware: weave the city and business type into headings and text naturally — never keyword-stuff.
- Posts must be genuinely useful (tips, how-to-choose guides, what-to-expect walkthroughs) — not ads.
- Write as the business owner ("we"), matching the requested tone/vibe.
- No invented facts: no specific prices, dates, awards, staff names, or years in business.`;

const SYSTEM = `You write website copy for local small businesses. The reader is a potential customer, not a marketer.

Rules:
- Plain, warm, concrete language. No jargon, no hype words ("unleash", "elevate", "solutions").
- Local SEO aware: weave the city and business type into headings and text naturally — never keyword-stuff.
- Match the requested tone/vibe throughout.
- The owner's own description is the source of truth for what the business offers; build the services cards around it and the business type.
- Reviews are illustrative placeholders the owner will replace with real ones: keep them plausible but generic, signed like "A happy customer" or "Local regular" — never invent real-sounding full names.
- FAQ answers should be genuinely useful for this business type (service area, how to order/book, what makes them different, etc.).`;

// The Next dev server loads .env.local itself; direct CLI runs of the build
// script don't — so pick the key up from .env.local as a convenience.
function resolveApiKey() {
  const key = process.env.ANTHROPIC_API_KEY ?? keyFromEnvLocal();
  if (!key) return undefined;
  // A truncated paste like "sk-ant-…" would otherwise surface as a cryptic
  // fetch ByteString error deep inside the SDK.
  if (key.length < 20 || [...key].some((c) => c.charCodeAt(0) > 127)) {
    console.warn(
      "→ AI: ANTHROPIC_API_KEY looks like a placeholder (too short or contains “…”) — paste the full key into .env.local",
    );
    return undefined;
  }
  return key;
}

function keyFromEnvLocal() {
  try {
    const env = fs.readFileSync(path.join(repoRoot, ".env.local"), "utf8");
    return env.match(/^ANTHROPIC_API_KEY\s*=\s*"?([^"\r\n]+)"?\s*$/m)?.[1];
  } catch {
    return undefined;
  }
}

export async function generateCopy(brief) {
  const apiKey = resolveApiKey();
  if (!apiKey) {
    console.warn("→ AI copy: skipped (no ANTHROPIC_API_KEY in env or .env.local)");
    return null;
  }

  const client = new Anthropic({ apiKey });
  const request = {
    business: brief.business,
    vibe: brief.style.vibe || "professional and friendly",
    features: brief.features,
    ownerDescription: brief.prompt || "(none provided)",
  };

  try {
    const response = await client.messages.parse({
      model: "claude-opus-4-8",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `Write the complete home-page copy for this business:\n\n${JSON.stringify(request, null, 2)}`,
        },
      ],
      output_config: { format: zodOutputFormat(SiteCopy, "site_copy") },
    });

    if (!response.parsed_output) {
      console.warn(`→ AI copy: no parsed output (stop_reason: ${response.stop_reason})`);
      return null;
    }
    console.log(
      `→ AI copy: generated by ${response.model} (${response.usage.output_tokens} output tokens)`,
    );
    return response.parsed_output;
  } catch (err) {
    console.warn(`→ AI copy: failed (${err.message ?? err}) — using placeholder copy`);
    return null;
  }
}

/** Three starter blog posts, or null → caller falls back to deriveBlogPosts. */
export async function generateBlogPosts(brief) {
  const apiKey = resolveApiKey();
  if (!apiKey) {
    console.warn("→ AI blog: skipped (no ANTHROPIC_API_KEY in env or .env.local)");
    return null;
  }

  const client = new Anthropic({ apiKey });
  const request = {
    business: brief.business,
    vibe: brief.style.vibe || "professional and friendly",
    ownerDescription: brief.prompt || "(none provided)",
  };

  try {
    const response = await client.messages.parse({
      model: "claude-opus-4-8",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: BLOG_SYSTEM,
      messages: [
        {
          role: "user",
          content: `Write the three starter blog posts for this business:\n\n${JSON.stringify(request, null, 2)}`,
        },
      ],
      output_config: { format: zodOutputFormat(BlogPosts, "blog_posts") },
    });

    if (!response.parsed_output) {
      console.warn(`→ AI blog: no parsed output (stop_reason: ${response.stop_reason})`);
      return null;
    }
    console.log(
      `→ AI blog: generated by ${response.model} (${response.usage.output_tokens} output tokens)`,
    );
    return response.parsed_output.posts;
  } catch (err) {
    console.warn(`→ AI blog: failed (${err.message ?? err}) — using placeholder posts`);
    return null;
  }
}
