// Brief → preview site. Step 1 of the Stage 2 pipeline:
//
//   node scripts/build-site.mjs [briefIdOrPath] [--root] [--no-ai] [--fresh] [--refresh-kit]
//
// Takes a brief from briefs/ (newest one if no argument), maps it onto the
// parameterized Eleventy-Starter kit's tenant schema (client / brand / copy —
// see the kit's src/config/tenant.js), builds it, and copies the output to
// previews/<slug>/.
//
// The kit never comes from a developer's working checkout. It is cloned from
// GitHub (KIT_REPO @ KIT_REF) into .kit-cache/ — a pristine, read-only copy
// that every customer starts from. Each brief then gets its own full copy of
// the kit in workspaces/<slug>/, and the build (and any later per-customer
// edits) happen only inside that workspace, so one customer's changes never
// leak into the standard kit or into another customer's site.
//
//   .kit-cache/kit/      pristine kit + installed deps, cloned from GitHub
//   workspaces/<slug>/   this customer's copy: kit source + tenant.json
//   previews/<slug>/     built static site, served by app/previews/[...path]
//
// --fresh        recreate the workspace from the pristine kit (discards any
//                per-customer modifications)
// --refresh-kit  re-clone the kit cache from GitHub (picks up kit updates;
//                existing workspaces keep the version they were created from)
//
// By default the output's absolute URLs are rewritten to /previews/<slug>/…
// so the site is viewable through the Next app (app/previews/[...path]).
// Pass --root to skip that — e.g. when deploying to a real (sub)domain where
// the site lives at /.
//
// Copy comes from Claude (scripts/generate-copy.mjs) when an API key is
// available; otherwise — or with --no-ai — it falls back to `deriveCopy`,
// deterministic placeholder text derived from the brief.

import { execFileSync, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateCopy, generateBlogPosts } from "./generate-copy.mjs";
import { generateImages } from "./generate-images.mjs";
import { composeSite } from "./compose-home.mjs";
import { applyBranding } from "./generate-brand.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const KIT_REPO =
  process.env.KIT_REPO ?? "https://github.com/cristianvmac/Eleventy-Starter.git";
const KIT_REF = process.env.KIT_REF ?? "websitero";
const KIT_CACHE = path.join(repoRoot, ".kit-cache");
const KIT_SRC = path.join(KIT_CACHE, "kit");
const WORKSPACES_DIR = path.join(repoRoot, "workspaces");
const BRIEFS_DIR = path.join(repoRoot, "briefs");

// ---------- locate the brief ----------------------------------------------

function resolveBriefPath(arg) {
  if (arg) {
    const candidates = [arg, path.join(BRIEFS_DIR, arg), path.join(BRIEFS_DIR, `${arg}.json`)];
    const hit = candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
    if (!hit) throw new Error(`Brief not found: ${arg}`);
    return hit;
  }
  const newest = fs
    .readdirSync(BRIEFS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.join(BRIEFS_DIR, f))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
  if (!newest) throw new Error(`No briefs in ${BRIEFS_DIR} — submit one via /forme first.`);
  return newest;
}

// ---------- brief → tenant mapping -----------------------------------------

const VIBE_TONE = {
  cozy: "warm and welcoming",
  modern: "clean and modern",
  bold: "bold and energetic",
  classic: "classic and trustworthy",
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function deriveCopy(brief) {
  const { name, type, location } = brief.business;
  const city = location.split(",")[0].trim();
  const tone = VIBE_TONE[brief.style.vibe] ?? "professional and friendly";
  const tagline = brief.prompt?.trim() || `${name} — your ${tone} ${type.toLowerCase()} in ${city}.`;

  return {
    meta: {
      title: `${name} | ${type} in ${city}`,
      description: tagline,
    },
    hero: {
      topper: `${type} · ${location}`,
      title: name,
      text: tagline,
    },
    services: [
      {
        title: `Quality ${type}`,
        text: `${tone.charAt(0).toUpperCase() + tone.slice(1)} ${type.toLowerCase()} services, done right the first time.`,
      },
      {
        title: "Local & Trusted",
        text: `Proudly serving ${city} and the surrounding area — a local team you can count on.`,
      },
      {
        title: "Easy to Reach",
        text: "Questions or special requests? Call, email, or stop by — we're happy to help.",
      },
    ],
    about: {
      topper: "About Us",
      title: `About ${name}`,
      paragraphs: [
        `${name} is a ${tone} ${type.toLowerCase()} based in ${location}. We built this business around one idea: treat every customer like a neighbor — because they are.`,
        `From your first visit to your hundredth, you'll get the same care, quality, and attention to detail that ${city} knows us for.`,
      ],
      quote: "Our customers' success is our success. We let our work speak for itself.",
      name: `The ${name} Team`,
      job: location,
    },
    seo: {
      topper: `${type} in ${city}`,
      title: `Your local ${type.toLowerCase()} in ${city}`,
      paragraphs: [
        `Looking for a ${type.toLowerCase()} in ${city}? ${name} combines local knowledge with real craftsmanship, so you get exactly what you need without the runaround.`,
        `We keep things simple: honest recommendations, clear communication, and work we stand behind. That's why locals in ${city} keep coming back — and keep sending their friends.`,
      ],
    },
    gallery: {
      topper: "Our Work",
      title: `A look at what ${name} does best`,
    },
    reviews: {
      topper: "Reviews",
      title: "What our customers say",
      text: `Don't take our word for it — here's what people around ${city} say about ${name}.`,
      items: [
        {
          text: `Fantastic experience with ${name} from start to finish. Friendly, professional, and the results speak for themselves. Highly recommended!`,
          name: "A happy customer",
          desc: city,
        },
        {
          text: `Exactly what we were looking for. Great communication, fair prices, and you can tell they genuinely care about their customers.`,
          name: "A local regular",
          desc: city,
        },
        {
          text: `Quick to respond, easy to work with, and the quality is consistently great. It's clear why they have such a loyal following in ${city}.`,
          name: "A longtime customer",
          desc: city,
        },
      ],
    },
    faq: {
      topper: name,
      title: "Frequently Asked Questions",
      text: "Have a question? Here are the ones we hear most often.",
      items: [
        {
          question: `What areas do you serve?`,
          answer: `We're based in ${location} and serve the whole surrounding area. Not sure if you're in range? Just ask — we'll let you know right away.`,
        },
        {
          question: "How do I get in touch?",
          answer: "Use the contact form on this site, call us, or send an email — whatever's easiest for you. We respond quickly.",
        },
        {
          question: "What makes you different?",
          answer: `We're local, we're ${tone}, and we treat every job like it's for a neighbor. No shortcuts, no surprises.`,
        },
      ],
    },
  };
}

function briefToTenant(brief, copy) {
  const [city = "", state = ""] = brief.business.location.split(",").map((s) => s.trim());
  const phone = brief.contact.phone?.trim();

  return {
    client: {
      name: brief.business.name,
      email: brief.contact.email,
      ...(phone && { phoneFormatted: phone, phoneForTel: phone.replace(/[^\d+]/g, "") }),
      address: { lineOne: "", lineTwo: "", city, state, zip: "" },
    },
    brand: { primary: brief.style.brandColor },
    copy,
  };
}

// ---------- subpath URL rewriting -------------------------------------------

// The kit emits root-absolute URLs (href="/about/", src="/assets/…"). To view
// a preview under /previews/<slug>/ those need the prefix baked in. Idempotent
// per build because we always rewrite fresh kit output.
function prefixUrls(dir, prefix) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      prefixUrls(file, prefix);
      continue;
    }
    const ext = path.extname(entry.name);
    if (ext === ".html") {
      let html = fs.readFileSync(file, "utf8");
      html = html
        .replace(/(href|src|content)="\/(?!\/)/g, `$1="${prefix}/`)
        .replace(/srcset="([^"]*)"/g, (_m, val) => {
          const rewritten = val
            .split(",")
            .map((part) => {
              const t = part.trim();
              return t.startsWith("/") && !t.startsWith("//") ? `${prefix}${t}` : t;
            })
            .join(", ");
          return `srcset="${rewritten}"`;
        });
      fs.writeFileSync(file, html);
    } else if (ext === ".css") {
      const css = fs
        .readFileSync(file, "utf8")
        .replace(/url\(\s*(['"]?)\/(?!\/)/g, `url($1${prefix}/`);
      fs.writeFileSync(file, css);
    }
  }
}

// ---------- kit cache & customer workspaces ---------------------------------

// Pristine kit, cloned from GitHub into .kit-cache/kit. Nothing ever builds
// or writes in here (aside from npm's own node_modules); it only changes when
// --refresh-kit re-clones it or KIT_REPO/KIT_REF change.
function ensureKitCache({ refresh = false } = {}) {
  const metaFile = path.join(KIT_CACHE, "meta.json");
  let meta = null;
  try {
    meta = JSON.parse(fs.readFileSync(metaFile, "utf8"));
  } catch {
    /* no cache yet */
  }
  const sourceChanged = meta && (meta.repo !== KIT_REPO || meta.ref !== KIT_REF);
  const intact = fs.existsSync(path.join(KIT_SRC, ".eleventy.js"));
  if (intact && !refresh && !sourceChanged) return;

  console.log(`→ Cloning kit: ${KIT_REPO} @ ${KIT_REF}`);
  fs.rmSync(KIT_SRC, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  fs.mkdirSync(KIT_CACHE, { recursive: true });
  execFileSync("git", ["clone", "--depth", "1", "--branch", KIT_REF, KIT_REPO, KIT_SRC], {
    stdio: "inherit",
  });
  console.log("→ Installing kit dependencies (one-time)…");
  execSync("npm ci --no-audit --no-fund", { cwd: KIT_SRC, stdio: "inherit" });
  fs.writeFileSync(
    metaFile,
    JSON.stringify({ repo: KIT_REPO, ref: KIT_REF, clonedAt: new Date().toISOString() }, null, 2),
  );
}

// Every customer starts from the same pristine kit: the first build copies it
// into workspaces/<slug>/ and all builds and later edits happen only there.
// Reused on rebuilds so per-customer modifications persist; --fresh resets it.
function ensureWorkspace(slug, { fresh = false } = {}) {
  const dir = path.join(WORKSPACES_DIR, slug);
  if (fresh) fs.rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  if (!fs.existsSync(dir)) {
    console.log(`→ Creating workspace from pristine kit…`);
    fs.cpSync(KIT_SRC, dir, {
      recursive: true,
      filter: (src) => {
        const top = path.relative(KIT_SRC, src).split(path.sep)[0];
        return ![".git", "node_modules", "public"].includes(top);
      },
    });
  }

  // Dependencies are read-only at build time, so workspaces share the cache's
  // node_modules via a link instead of paying a full install per customer.
  const nm = path.join(dir, "node_modules");
  const existing = fs.lstatSync(nm, { throwIfNoEntry: false });
  if (existing?.isSymbolicLink() && !fs.existsSync(nm)) fs.unlinkSync(nm); // stale link
  if (!fs.lstatSync(nm, { throwIfNoEntry: false })) {
    try {
      fs.symlinkSync(path.join(KIT_SRC, "node_modules"), nm, "junction");
    } catch {
      fs.cpSync(path.join(KIT_SRC, "node_modules"), nm, { recursive: true });
    }
  }
  return dir;
}

// ---------- starter blog posts -------------------------------------------------

// Deterministic fallback posts, same contract as generateBlogPosts().
function deriveBlogPosts(brief) {
  const { name, type, location } = brief.business;
  const city = location.split(",")[0].trim();
  const lowerType = type.toLowerCase();
  return [
    {
      title: `Welcome to the new ${name} website`,
      slug: "welcome",
      description: `${name} is now online — here's what you'll find on our new site and how to reach us.`,
      body: `We're excited to finally have a home on the web. Whether you found us through a neighbor's recommendation or a search for a ${lowerType} in ${city}, welcome!

## What you'll find here

Our new site has everything in one place: what we offer, photos of our work, answers to the questions we hear most, and an easy way to get in touch.

## Stay in the loop

We'll use this blog to share news, tips, and what's happening at ${name}. Have a question in the meantime? Head over to the contact page — we'd love to hear from you.`,
    },
    {
      title: `How to choose a ${lowerType} in ${city}`,
      slug: `choosing-a-${slugify(type)}`,
      description: `Not sure what to look for in a ${lowerType}? A few practical things worth checking before you decide.`,
      body: `Choosing a ${lowerType} shouldn't feel like a gamble. Here are the things we'd tell our own friends and family in ${city} to look for.

## Ask around locally

Word of mouth is still the best signal. Ask neighbors who they use and — just as important — who they'd avoid.

## Look for clear communication

A good ${lowerType} answers questions plainly, explains what you're getting, and doesn't make you chase them for a reply.

## Trust your first impression

How a business treats you before you're a customer says a lot about how they'll treat you after. We do our best to earn that trust from the first hello.`,
    },
    {
      title: `What to expect when you work with ${name}`,
      slug: "what-to-expect",
      description: `From first contact to the finished result — here's how working with ${name} goes, step by step.`,
      body: `New here? This is how it works when you get in touch with us.

## Getting started

Reach out through the contact page, by phone, or by email — whatever's easiest. Tell us what you need and we'll take it from there.

## While we work together

We keep things simple: honest recommendations, clear communication, and no surprises. If something changes, you'll hear it from us first.

## After that

We stand behind our work. If anything isn't right, tell us and we'll make it right — that's how ${name} has always done business in ${city}.`,
    },
  ];
}

// Replace the kit's lorem demo posts with the customer's starter posts.
// One-shot per workspace: once real posts exist, rebuilds leave them alone
// (so later per-customer edits persist) — --fresh resets and reseeds.
function blogNeedsSeeding(workDir) {
  const blogDir = path.join(workDir, "src", "content", "blog");
  const existing = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  const DEMO_POSTS = ["acuti-modo.md", "canitiem-saxa.md", "sucos-creati.md"];
  return existing.length === 0 || existing.some((f) => DEMO_POSTS.includes(f));
}

function writeBlogPosts(workDir, brief, posts, photos = []) {
  const blogDir = path.join(workDir, "src", "content", "blog");
  for (const f of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
    fs.rmSync(path.join(blogDir, f));
  }
  const KIT_BLOG_IMAGES = ["/assets/images/blog/blog.jpg", "/assets/images/blog/blog2.jpg"];
  posts.forEach((post, i) => {
    const slug = slugify(post.slug || post.title) || `post-${i + 1}`;
    const image = photos.length ? photos[i % photos.length] : KIT_BLOG_IMAGES[i % 2];
    // Posts staggered a few days apart so the blog doesn't look bulk-filled.
    const date = new Date(Date.now() - i * 6 * 86_400_000).toISOString();
    // JSON.stringify => valid YAML double-quoted scalars, quotes/colons safe.
    const frontMatter = [
      "---",
      `title: ${JSON.stringify(post.title)}`,
      `url: ${slug}`,
      `description: ${JSON.stringify(post.description)}`,
      `author: ${JSON.stringify(brief.business.name)}`,
      `date: ${date}`,
      "tags:",
      "    - post",
      `image: ${image}`,
      `imageAlt: ${JSON.stringify(post.title)}`,
      "---",
    ].join("\n");
    fs.writeFileSync(path.join(blogDir, `${slug}.md`), `${frontMatter}\n\n${post.body.trim()}\n`);
  });
}

// ---------- owner photos ------------------------------------------------------

// The wizard stores uploaded photos in briefs/uploads/<id>/. When the owner
// chose "use my photos", stage them into the workspace's assets and hand the
// composer their site-absolute URLs so sections swap their demo imagery.
// "ai" mode is the default: AI-sourced imagery will plug in here later — for
// now those sites keep each component's professional stock photography.
function stageUploads(id, brief, workDir) {
  const mode = brief.images?.mode ?? "ai";
  const srcDir = path.join(BRIEFS_DIR, "uploads", String(id));
  if (mode !== "upload") return [];
  if (!fs.existsSync(srcDir)) {
    console.warn("⚠ images.mode=upload but no uploaded photos found — keeping stock imagery");
    return [];
  }
  const destDir = path.join(workDir, "src", "assets", "images", "uploads");
  fs.rmSync(destDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  fs.mkdirSync(destDir, { recursive: true });
  const files = fs
    .readdirSync(srcDir)
    .filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f));
  for (const f of files) fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  return files.map((f) => `/assets/images/uploads/${f}`);
}

// "Pick them for me" mode: AI-generated photos, cached per brief in
// briefs/generated/<id>/ and staged into the workspace like uploads are.
// Empty result (no provider key, provider errors, --no-ai) keeps stock photos.
async function stageAiImages(id, brief, workDir, { ai }) {
  if (!ai || (brief.images?.mode ?? "ai") !== "ai") return [];
  const cacheDir = path.join(BRIEFS_DIR, "generated", String(id));
  const files = await generateImages(brief, { cacheDir });
  if (!files.length) return [];
  const destDir = path.join(workDir, "src", "assets", "images", "generated");
  fs.rmSync(destDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  fs.mkdirSync(destDir, { recursive: true });
  for (const f of files) fs.copyFileSync(f, path.join(destDir, path.basename(f)));
  return files.map((f) => `/assets/images/generated/${path.basename(f)}`);
}

// ---------- build -----------------------------------------------------------

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const serveAtRoot = process.argv.includes("--root");
const useAi = !process.argv.includes("--no-ai");
const briefPath = resolveBriefPath(args[0]);
const record = JSON.parse(fs.readFileSync(briefPath, "utf8"));
const brief = record.brief ?? record; // accept both the API record and a bare brief
const id = record.id ?? path.basename(briefPath, ".json");
const slug = `${slugify(brief.business.name)}-${String(id).slice(0, 8)}`;

console.log(`→ Brief:   ${briefPath}`);

// 1. Make sure the pristine kit exists, then give this customer their own
//    copy of it (created once; rebuilds reuse it so their changes persist)
ensureKitCache({ refresh: process.argv.includes("--refresh-kit") });
const workDir = ensureWorkspace(slug, { fresh: process.argv.includes("--fresh") });
console.log(`→ Workspace: ${workDir}`);

// 2. Write the copy: Claude when an API key is available, deterministic
//    placeholder text otherwise — a build never fails because AI couldn't run
const copy = (useAi ? await generateCopy(brief) : null) ?? deriveCopy(brief);
const tenantFile = path.join(workDir, "tenant.json");
fs.writeFileSync(tenantFile, JSON.stringify(briefToTenant(brief, copy), null, 2));
console.log(`→ Tenant:  ${tenantFile}`);

// 2b. Compose this customer's pages from the docs component library:
//     seeded by the slug, so every customer gets a different mix of section
//     variants — homepage and interior pages — filled with their copy (and
//     their photos, if uploaded). If composition fails we keep the kit's
//     stock pages — never no site.
const uploads = stageUploads(id, brief, workDir);
const photos = uploads.length ? uploads : await stageAiImages(id, brief, workDir, { ai: useAi });
try {
  const site = composeSite({ brief, copy, seed: slug, uploads: photos });
  for (const [rel, content] of Object.entries(site.files)) {
    fs.writeFileSync(path.join(workDir, "src", ...rel.split("/")), content);
  }
  const summary = Object.entries(site.picks)
    .filter(([slot]) => !slot.startsWith("/")) // homepage slots only — pages log too much
    .map(([slot, id]) => `${slot}=${id.split("/")[1]}`)
    .join(" ");
  console.log(`→ Sections: ${summary} (+${Object.keys(site.files).length - 3} interior pages)`);
} catch (err) {
  console.warn(`⚠ Site composition failed — keeping the kit's stock pages: ${err.message}`);
}

// 2c. Brand it: generated SVG logos (header/footer), favicon, web manifest,
//     and the include patches that put the business's real names in the nav.
try {
  applyBranding(workDir, { brief, copy });
  console.log(`→ Branding: logo + favicon generated for "${brief.business.name}"`);
} catch (err) {
  console.warn(`⚠ Branding failed — keeping the kit's stock logo/favicon: ${err.message}`);
}

// 2d. Starter blog posts replace the kit's lorem demos (first build only —
//     rebuilds keep whatever posts the workspace already has)
if (blogNeedsSeeding(workDir)) {
  const posts = (useAi ? await generateBlogPosts(brief) : null) ?? deriveBlogPosts(brief);
  writeBlogPosts(workDir, brief, posts, photos);
  console.log(`→ Blog: ${posts.length} starter posts written`);
}

// 3. Build the workspace with the tenant injected (clean its output first —
//    Eleventy doesn't clear its own output dir between builds)
fs.rmSync(path.join(workDir, "public"), { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
execSync("npx eleventy", {
  cwd: workDir,
  stdio: "inherit",
  env: { ...process.env, ELEVENTY_ENV: "PROD", TENANT_FILE: tenantFile },
});

// 4. Copy the output into previews/<slug>
const previewDir = path.join(repoRoot, "previews", slug);
fs.rmSync(previewDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
fs.cpSync(path.join(workDir, "public"), previewDir, { recursive: true });

// 5. Rewrite URLs for subpath serving (unless building for a real domain)
if (!serveAtRoot) prefixUrls(previewDir, `/previews/${slug}`);

// 6. Record the build so the admin page / build API can find it
const manifestPath = path.join(repoRoot, "previews", "manifest.json");
let manifest = {};
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch {
  /* first build — start fresh */
}
manifest[id] = { slug, builtAt: new Date().toISOString() };
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`\n✓ Preview built: ${previewDir}`);
if (serveAtRoot) {
  console.log(`  Serve it with: npx serve "${path.relative(repoRoot, previewDir)}"`);
} else {
  console.log(`  View it at: http://localhost:3000/previews/${slug}/`);
}
