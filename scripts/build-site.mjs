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
import { generateCopy } from "./generate-copy.mjs";
import { composeHome } from "./compose-home.mjs";

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
  fs.rmSync(KIT_SRC, { recursive: true, force: true });
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
  if (fresh) fs.rmSync(dir, { recursive: true, force: true });
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
  fs.rmSync(destDir, { recursive: true, force: true });
  fs.mkdirSync(destDir, { recursive: true });
  const files = fs
    .readdirSync(srcDir)
    .filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f));
  for (const f of files) fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  return files.map((f) => `/assets/images/uploads/${f}`);
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

// 2b. Compose this customer's homepage from the docs component library:
//     seeded by the slug, so every customer gets a different mix of section
//     variants, filled with their copy (and their photos, if uploaded).
//     If composition fails we keep the kit's stock homepage — never no site.
const uploads = stageUploads(id, brief, workDir);
try {
  const home = composeHome({ brief, copy, seed: slug, uploads });
  fs.writeFileSync(path.join(workDir, "src", "index.html"), home.html);
  fs.writeFileSync(path.join(workDir, "src", "assets", "css", "sections.css"), home.css);
  if (home.js) fs.writeFileSync(path.join(workDir, "src", "assets", "js", "sections.js"), home.js);
  const summary = Object.entries(home.picks)
    .map(([slot, id]) => `${slot}=${id.split("/")[1]}`)
    .join(" ");
  console.log(`→ Sections: ${summary}`);
} catch (err) {
  console.warn(`⚠ Homepage composition failed — keeping the kit's stock homepage: ${err.message}`);
}

// 3. Build the workspace with the tenant injected (clean its output first —
//    Eleventy doesn't clear its own output dir between builds)
fs.rmSync(path.join(workDir, "public"), { recursive: true, force: true });
execSync("npx eleventy", {
  cwd: workDir,
  stdio: "inherit",
  env: { ...process.env, ELEVENTY_ENV: "PROD", TENANT_FILE: tenantFile },
});

// 4. Copy the output into previews/<slug>
const previewDir = path.join(repoRoot, "previews", slug);
fs.rmSync(previewDir, { recursive: true, force: true });
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
