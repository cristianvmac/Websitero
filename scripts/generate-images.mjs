// AI imagery for the wizard's "Pick them for me" photo mode.
//
// Providers, tried in order of configured key: Gemini image generation
// (GEMINI_API_KEY or GOOGLE_API_KEY), then OpenAI gpt-image-1
// (OPENAI_API_KEY). Keys come from the environment or .env.local, same
// convention as generate-copy.mjs.
//
// Results are cached in briefs/generated/<id>/ — rebuilds reuse the cached
// set instead of re-billing the provider (delete the folder to regenerate).
// Returns [] whenever generation isn't possible (no key, provider errors):
// the build then keeps each component's stock photography, so image
// generation can never fail a build.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const GEMINI_MODEL = process.env.GEMINI_IMAGE_MODEL ?? "gemini-2.5-flash-image";
const OPENAI_MODEL = process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1";
const REQUEST_TIMEOUT_MS = 120_000;

function resolveKey(...names) {
  for (const name of names) if (process.env[name]) return process.env[name];
  try {
    const env = fs.readFileSync(path.join(repoRoot, ".env.local"), "utf8");
    for (const name of names) {
      const match = env.match(new RegExp(`^${name}\\s*=\\s*"?([^"\\r\\n]+)"?\\s*$`, "m"));
      if (match) return match[1];
    }
  } catch {
    /* no .env.local */
  }
  return undefined;
}

// One prompt per photo slot the composer/blog actually use. Shared style
// tail keeps the set looking like one photographer shot it.
function buildPrompts(brief) {
  const { name, type, location } = brief.business;
  const city = location.split(",")[0].trim();
  const vibe =
    {
      cozy: "warm, inviting, soft natural light",
      modern: "clean, minimal, bright daylight",
      bold: "vibrant, high-contrast, energetic",
      classic: "timeless, refined, warm tones",
    }[brief.style.vibe] ?? "professional, welcoming, natural light";
  const style = `${vibe}. Photorealistic professional photograph, shallow depth of field, no text, no logos, no watermarks, no people looking at the camera.`;
  const business = `a local ${type.toLowerCase()} business like "${name}" in ${city}`;

  return [
    `Wide establishing photo for the website hero of ${business}: the storefront or main space at its best. ${style}`,
    `Interior photo for the about section of ${business}: the workspace where the work happens, welcoming and authentic. ${style}`,
    `Close-up detail photo of the products or craftsmanship of ${business}: the work itself, appetizing and tangible. ${style}`,
    `Atmosphere photo of ${business}: hands at work or the finished result in context, candid documentary feel. ${style}`,
  ];
}

async function geminiImage(prompt, key) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "x-goog-api-key": key, "content-type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  if (!part) throw new Error("Gemini returned no image data");
  return {
    buffer: Buffer.from(part.inlineData.data, "base64"),
    ext: part.inlineData.mimeType?.includes("jpeg") ? ".jpg" : ".png",
  };
}

async function openaiImage(prompt, key) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ model: OPENAI_MODEL, prompt, size: "1536x1024", quality: "medium" }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error("OpenAI returned no image data");
  return { buffer: Buffer.from(b64, "base64"), ext: ".png" };
}

function pickProvider() {
  const geminiKey = resolveKey("GEMINI_API_KEY", "GOOGLE_API_KEY");
  if (geminiKey) return { name: "gemini", generate: (p) => geminiImage(p, geminiKey) };
  const openaiKey = resolveKey("OPENAI_API_KEY");
  if (openaiKey) return { name: "openai", generate: (p) => openaiImage(p, openaiKey) };
  return null;
}

function cachedImages(cacheDir) {
  if (!fs.existsSync(cacheDir)) return [];
  return fs
    .readdirSync(cacheDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => path.join(cacheDir, f));
}

/**
 * Generate (or reuse) the brief's photo set.
 * @returns {Promise<string[]>} absolute paths of the cached images; [] when
 *   generation isn't possible — caller keeps stock photography.
 */
export async function generateImages(brief, { cacheDir }) {
  const cached = cachedImages(cacheDir);
  if (cached.length) {
    console.log(`→ AI images: reusing ${cached.length} cached (${cacheDir})`);
    return cached;
  }

  const provider = pickProvider();
  if (!provider) {
    console.warn("→ AI images: skipped (no GEMINI_API_KEY/GOOGLE_API_KEY or OPENAI_API_KEY)");
    return [];
  }

  fs.mkdirSync(cacheDir, { recursive: true });
  const prompts = buildPrompts(brief);
  const saved = [];
  for (const [i, prompt] of prompts.entries()) {
    try {
      const { buffer, ext } = await provider.generate(prompt);
      const file = path.join(cacheDir, `photo-${i + 1}${ext}`);
      fs.writeFileSync(file, buffer);
      saved.push(file);
      console.log(`→ AI images: ${provider.name} generated photo-${i + 1}${ext}`);
    } catch (err) {
      console.warn(`⚠ AI images: photo-${i + 1} failed (${err.message ?? err})`);
    }
  }
  if (!saved.length) console.warn("→ AI images: none generated — keeping stock photography");
  return saved;
}
