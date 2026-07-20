// Brief → preview site.
//
// INTERNAL TOOL — not wired into the product. Nothing in app/ calls this; the
// app never auto-builds. Run it by hand to scaffold a customer's workspace
// (branding, drafted copy, photos) as a starting point for hand-coding, then
// keep your edits with --code-only.
//
// The output stays reviewable: /admin/briefs links each built brief to
// /previews/<slug>/ (app/previews/[...path]) so the site can be checked before
// it goes to the owner. That loop is local-only — previews/ is gitignored and
// never exists on a deployed host.
//
//   node scripts/build-site.mjs [briefIdOrPath] [--kit eleventy|astro] [--root] [--no-ai] [--fresh] [--refresh-kit] [--code-only]
//
// Takes a brief from briefs/ (newest one if no argument), customizes the
// chosen starter kit with it (composed pages, copy, branding, photos), builds
// it, and copies the output to previews/<slug>/.
//
// Customer sites always build on the parameterized Eleventy-Starter. A second
// kit (Astro-Starter) remains wired up behind the developer-only `--kit astro`
// flag for experiments; briefs cannot select it. Each kit has its own docs
// component library (app/docs/<kit>/components) and its own pristine cache;
// the pipeline around them is identical.
//
// The kit never comes from a developer's working checkout. It is cloned from
// GitHub into .kit-cache/ — a pristine, read-only copy that every customer
// starts from. Each brief then gets its own full copy of the kit in
// workspaces/<slug>/, and the build (and any later per-customer edits)
// happen only inside that workspace, so one customer's changes never leak
// into the standard kit or into another customer's site.
//
//   .kit-cache/<kit>/    pristine kit + installed deps, cloned from GitHub
//   workspaces/<slug>/   this customer's copy of their kit
//   previews/<slug>/     built static site, served by app/previews/[...path]
//
// --fresh        recreate the workspace from the pristine kit (discards any
//                per-customer modifications)
// --refresh-kit  re-clone the kit cache from GitHub (picks up kit updates;
//                existing workspaces keep the version they were created from)
// --code-only    recompile the existing workspace as-is and refresh the
//                preview — skips copy/compose/branding/blog so hand edits made
//                in workspaces/<slug>/ survive (requires a prior full build)
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
import { composeSite } from "./compose-home.mjs";
import { applyBranding } from "./generate-brand.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const KIT_CACHE = path.join(repoRoot, ".kit-cache");
const WORKSPACES_DIR = path.join(repoRoot, "workspaces");
const BRIEFS_DIR = path.join(repoRoot, "briefs");

// Everything kit-specific lives here; the pipeline itself is kit-agnostic.
const KITS = {
  eleventy: {
    repo: process.env.KIT_REPO ?? "https://github.com/cristianvmac/Eleventy-Starter.git",
    ref: process.env.KIT_REF ?? "websitero",
    cacheDir: path.join(KIT_CACHE, "kit"), // legacy location, predates multi-kit
    metaFile: path.join(KIT_CACHE, "meta.json"),
    intactFile: ".eleventy.js",
    outputDir: "public",
    // Directories that are build output / installs, never source to copy.
    workspaceExcludes: [".git", "node_modules", "public"],
    // Where staged photos land (site URL is /assets/images/... for both kits).
    photoDirs: (workDir, sub) => [path.join(workDir, "src", "assets", "images", sub)],
    demoBlogPosts: ["acuti-modo.md", "canitiem-saxa.md", "sucos-creati.md"],
    build(workDir, { tenantFile }) {
      execSync("npx eleventy", {
        cwd: workDir,
        stdio: "inherit",
        env: { ...process.env, ELEVENTY_ENV: "PROD", TENANT_FILE: tenantFile },
      });
    },
  },
  astro: {
    repo: process.env.ASTRO_KIT_REPO ?? "https://github.com/cristianvmac/Astro-Starter.git",
    ref: process.env.ASTRO_KIT_REF ?? "main",
    cacheDir: path.join(KIT_CACHE, "astro"),
    metaFile: path.join(KIT_CACHE, "meta-astro.json"),
    intactFile: "astro.config.mjs",
    outputDir: "dist",
    workspaceExcludes: [".git", "node_modules", "dist", ".astro"],
    // Raw section HTML needs public/ URLs; blog front matter needs importable
    // src/assets copies — stage photos into both.
    photoDirs: (workDir, sub) => [
      path.join(workDir, "public", "assets", "images", sub),
      path.join(workDir, "src", "assets", "images", sub),
    ],
    demoBlogPosts: ["added-via-deployed-decap-dashboard.md", "images-in-markdown-posts.md"],
    build(workDir) {
      execSync("npx astro build", { cwd: workDir, stdio: "inherit" });
    },
  },
};

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

// Pristine kit, cloned from GitHub into .kit-cache/<kit>. Nothing ever builds
// or writes in here (aside from npm's own node_modules); it only changes when
// --refresh-kit re-clones it or the kit's repo/ref env overrides change.
function ensureKitCache(kit, { refresh = false } = {}) {
  let meta = null;
  try {
    meta = JSON.parse(fs.readFileSync(kit.metaFile, "utf8"));
  } catch {
    /* no cache yet */
  }
  const sourceChanged = meta && (meta.repo !== kit.repo || meta.ref !== kit.ref);
  const intact = fs.existsSync(path.join(kit.cacheDir, kit.intactFile));
  if (intact && !refresh && !sourceChanged) return;

  console.log(`→ Cloning kit: ${kit.repo} @ ${kit.ref}`);
  fs.rmSync(kit.cacheDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  fs.mkdirSync(KIT_CACHE, { recursive: true });
  execFileSync("git", ["clone", "--depth", "1", "--branch", kit.ref, kit.repo, kit.cacheDir], {
    stdio: "inherit",
  });
  console.log("→ Installing kit dependencies (one-time)…");
  execSync("npm ci --no-audit --no-fund", { cwd: kit.cacheDir, stdio: "inherit" });
  fs.writeFileSync(
    kit.metaFile,
    JSON.stringify({ repo: kit.repo, ref: kit.ref, clonedAt: new Date().toISOString() }, null, 2),
  );
}

// Every customer starts from the same pristine kit: the first build copies it
// into workspaces/<slug>/ and all builds and later edits happen only there.
// Reused on rebuilds so per-customer modifications persist; --fresh resets it.
function ensureWorkspace(slug, kit, { fresh = false } = {}) {
  const dir = path.join(WORKSPACES_DIR, slug);
  if (fresh) fs.rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  if (!fs.existsSync(dir)) {
    console.log(`→ Creating workspace from pristine kit…`);
    fs.cpSync(kit.cacheDir, dir, {
      recursive: true,
      filter: (src) => {
        const top = path.relative(kit.cacheDir, src).split(path.sep)[0];
        return !kit.workspaceExcludes.includes(top);
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
      fs.symlinkSync(path.join(kit.cacheDir, "node_modules"), nm, "junction");
    } catch {
      fs.cpSync(path.join(kit.cacheDir, "node_modules"), nm, { recursive: true });
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
function blogNeedsSeeding(workDir, kit) {
  const blogDir = path.join(workDir, "src", "content", "blog");
  const existing = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
  return existing.length === 0 || existing.some((f) => kit.demoBlogPosts.includes(f));
}

function writeBlogPosts(workDir, brief, posts, photos = [], kitName = "eleventy") {
  const blogDir = path.join(workDir, "src", "content", "blog");
  for (const f of fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"))) {
    fs.rmSync(path.join(blogDir, f));
  }
  const KIT_BLOG_IMAGES = ["/assets/images/blog/blog.jpg", "/assets/images/blog/blog2.jpg"];
  posts.forEach((post, i) => {
    const slug = slugify(post.slug || post.title) || `post-${i + 1}`;
    // Posts staggered a few days apart so the blog doesn't look bulk-filled.
    const date = new Date(Date.now() - i * 6 * 86_400_000).toISOString();
    // JSON.stringify => valid YAML double-quoted scalars, quotes/colons safe.
    let frontMatter;
    if (kitName === "astro") {
      // The astro content collection validates image() — it must be an
      // importable src/assets path, so photos use their src-side copies.
      const image = photos.length
        ? `"@assets/images${photos[i % photos.length].replace("/assets/images", "")}"`
        : `"@assets/images/blog/placeholder.jpg"`;
      frontMatter = [
        "---",
        `title: ${JSON.stringify(post.title)}`,
        `description: ${JSON.stringify(post.description)}`,
        `author: ${JSON.stringify(brief.business.name)}`,
        `date: ${date}`,
        `image: ${image}`,
        `imageAlt: ${JSON.stringify(post.title)}`,
        `isFeatured: ${i === 0}`,
        "---",
      ].join("\n");
    } else {
      const image = photos.length ? photos[i % photos.length] : KIT_BLOG_IMAGES[i % 2];
      frontMatter = [
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
    }
    fs.writeFileSync(path.join(blogDir, `${slug}.md`), `${frontMatter}\n\n${post.body.trim()}\n`);
  });
}

// ---------- owner photos ------------------------------------------------------

// Copy a photo set into the workspace's asset dir(s) for its kit and return
// the site-absolute URLs the composer injects.
function stagePhotos(files, workDir, kit, sub) {
  const dests = kit.photoDirs(workDir, sub);
  for (const destDir of dests) {
    fs.rmSync(destDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
    fs.mkdirSync(destDir, { recursive: true });
    for (const f of files) fs.copyFileSync(f, path.join(destDir, path.basename(f)));
  }
  return files.map((f) => `/assets/images/${sub}/${path.basename(f)}`);
}

// The wizard stores uploaded photos in briefs/uploads/<id>/. When the owner
// added their own photos, stage them into the workspace's assets and hand the
// composer their site-absolute URLs so sections swap their demo imagery.
// Without uploads the site keeps each component's professional stock photos.
function stageUploads(id, brief, workDir, kit) {
  const mode = brief.images?.mode ?? "stock";
  const srcDir = path.join(BRIEFS_DIR, "uploads", String(id));
  if (mode !== "upload") return [];
  if (!fs.existsSync(srcDir)) {
    console.warn("⚠ images.mode=upload but no uploaded photos found — keeping stock imagery");
    return [];
  }
  const files = fs
    .readdirSync(srcDir)
    .filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f))
    .map((f) => path.join(srcDir, f));
  return stagePhotos(files, workDir, kit, "uploads");
}

// The astro kit serves no images from public/ out of the box, but the raw
// composed sections need resolvable URLs when no photo set exists — stage a
// rotation of the kit's own stock photography into public/assets/images/stock.
function stageAstroStock(workDir) {
  const KIT_STOCK = [
    "hero/hero.jpg",
    "services/sbs.jpg",
    "services/sbsreverse.jpg",
    "portfolio/port1.jpg",
    "portfolio/port2.jpg",
    "portfolio/port3.jpg",
    "CTA/cta.jpg",
    "banner.jpg",
  ];
  const destDir = path.join(workDir, "public", "assets", "images", "stock");
  fs.mkdirSync(destDir, { recursive: true });
  const urls = [];
  for (const rel of KIT_STOCK) {
    const src = path.join(workDir, "src", "assets", "images", rel);
    if (!fs.existsSync(src)) continue;
    const name = rel.replace(/[\\/]/g, "-").toLowerCase();
    fs.copyFileSync(src, path.join(destDir, name));
    urls.push(`/assets/images/stock/${name}`);
  }
  return urls;
}

// ---------- build -----------------------------------------------------------

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const serveAtRoot = process.argv.includes("--root");
const useAi = !process.argv.includes("--no-ai");
// Recompile the workspace as the developer left it — no regeneration. Lets
// hand edits under workspaces/<slug>/ survive a rebuild.
const codeOnly = process.argv.includes("--code-only");
const briefPath = resolveBriefPath(args[0]);
const record = JSON.parse(fs.readFileSync(briefPath, "utf8"));
const brief = record.brief ?? record; // accept both the API record and a bare brief
const id = record.id ?? path.basename(briefPath, ".json");

// Which kit: customer briefs always build with the default (Eleventy);
// --kit is a developer-only escape hatch for experiments.
const kitFlag = process.argv.find((a, i) => process.argv[i - 1] === "--kit") ??
  process.argv.find((a) => a.startsWith("--kit="))?.split("=")[1];
const kitName = kitFlag ?? "eleventy";
const kit = KITS[kitName];
if (!kit) throw new Error(`Unknown kit "${kitName}" — expected one of: ${Object.keys(KITS).join(", ")}`);

// Non-default kits get their own workspace/preview namespace so the same
// brief can be built with both kits side by side.
const slug =
  `${slugify(brief.business.name)}-${String(id).slice(0, 8)}` +
  (kitName === "eleventy" ? "" : `-${kitName}`);

console.log(`→ Brief:   ${briefPath}`);
console.log(`→ Kit:     ${kitName}`);

// 1. Make sure the pristine kit exists, then give this customer their own
//    copy of it (created once; rebuilds reuse it so their changes persist)
ensureKitCache(kit, { refresh: process.argv.includes("--refresh-kit") });
// A code-only rebuild recompiles an existing workspace — it must never fall
// back to creating a pristine one (that would silently discard the edits it's
// meant to preserve and build a generic kit site instead).
if (codeOnly && !fs.existsSync(path.join(WORKSPACES_DIR, slug))) {
  throw new Error(`No workspace for "${slug}" yet — run a full build before a code-only rebuild.`);
}
const workDir = ensureWorkspace(slug, kit, { fresh: process.argv.includes("--fresh") });
console.log(`→ Workspace: ${workDir}`);

// The Eleventy kit reads a tenant file at build time (the Astro kit's
// equivalent, src/data/client.ts, is written by applyBranding instead).
let tenantFile;
if (kitName === "eleventy") tenantFile = path.join(workDir, "tenant.json");

// 2–2d. Regenerate the site from the brief: copy + tenant, composed pages,
//    branding, and starter blog posts. A --code-only rebuild skips all of it
//    and recompiles whatever the developer left in the workspace, so hand
//    edits under workspaces/<slug>/ survive the rebuild.
if (codeOnly) {
  if (tenantFile && !fs.existsSync(tenantFile)) {
    throw new Error("Code-only rebuild needs a prior full build — no tenant.json in the workspace.");
  }
  console.log("→ Code-only: recompiling the workspace as-is (skipping copy, compose, branding, blog)");
} else {
  // 2. Write the copy: Claude when an API key is available, deterministic
  //    placeholder text otherwise — a build never fails because AI couldn't run
  const copy = (useAi ? await generateCopy(brief) : null) ?? deriveCopy(brief);
  if (tenantFile) {
    fs.writeFileSync(tenantFile, JSON.stringify(briefToTenant(brief, copy), null, 2));
    console.log(`→ Tenant:  ${tenantFile}`);
  }

  // 2b. Compose this customer's pages from the docs component library:
  //     seeded by the slug, so every customer gets a different mix of section
  //     variants — homepage and interior pages — filled with their copy (and
  //     their photos, if uploaded). If composition fails we keep the kit's
  //     stock pages — never no site.
  const photos = stageUploads(id, brief, workDir, kit);
  const stock = kitName === "astro" ? stageAstroStock(workDir) : [];
  try {
    const site = composeSite({ brief, copy, seed: slug, uploads: photos, kit: kitName, stock });
    for (const [rel, content] of Object.entries(site.files)) {
      const target = path.join(workDir, "src", ...rel.split("/"));
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, content);
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
    applyBranding(workDir, { brief, copy, kit: kitName });
    console.log(`→ Branding: logo + favicon generated for "${brief.business.name}"`);
  } catch (err) {
    console.warn(`⚠ Branding failed — keeping the kit's stock logo/favicon: ${err.message}`);
  }

  // 2d. Starter blog posts replace the kit's lorem demos (first build only —
  //     rebuilds keep whatever posts the workspace already has)
  if (blogNeedsSeeding(workDir, kit)) {
    const posts = (useAi ? await generateBlogPosts(brief) : null) ?? deriveBlogPosts(brief);
    writeBlogPosts(workDir, brief, posts, photos, kitName);
    console.log(`→ Blog: ${posts.length} starter posts written`);
  }
}

// 3. Build the workspace (clean its output first — the generators don't
//    clear their own output dirs between builds)
fs.rmSync(path.join(workDir, kit.outputDir), { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
kit.build(workDir, { tenantFile });

// 4. Copy the output into previews/<slug>
const previewDir = path.join(repoRoot, "previews", slug);
fs.rmSync(previewDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
fs.cpSync(path.join(workDir, kit.outputDir), previewDir, { recursive: true });

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
// Keyed by brief id + kit so one brief can hold a preview per kit.
manifest[kitName === "eleventy" ? id : `${id}-${kitName}`] = {
  slug,
  kit: kitName,
  builtAt: new Date().toISOString(),
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`\n✓ Preview built: ${previewDir}`);
if (serveAtRoot) {
  console.log(`  Serve it with: npx serve "${path.relative(repoRoot, previewDir)}"`);
} else {
  console.log(`  View it at: https://websitero.vercel.app/previews/${slug}/`);
}
