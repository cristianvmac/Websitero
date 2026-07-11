// Per-customer branding: logos, favicon, web manifest, and the workspace
// patches that stitch them (plus the business's real names) into the kit's
// header / footer / base layout.
//
// Logos are generated SVGs — a rounded monogram mark in the brand color plus
// the business name — so every tenant ships branded from the first build
// without any design work. Owners can replace the files in their workspace
// later; rebuilds only regenerate them when --fresh recreated the workspace.
//
// The include patches (header nav labels, footer links, "Starter Kit"
// strings) replace the kit's pristine literals, so they apply on the first
// build of a workspace and are naturally skipped on rebuilds where the
// literal is already gone.

import fs from "node:fs";
import path from "node:path";

const escXml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Perceived luminance — pick white or near-black monogram text for contrast.
function onColor(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.6 ? "#1a1a1a" : "#ffffff";
}

function initials(name) {
  const words = name
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .split(/\s+/)
    .filter(Boolean);
  return (words.length >= 2 ? words[0][0] + words[1][0] : (words[0] ?? "W").slice(0, 1)).toUpperCase();
}

function markSvg(brief, size = 64) {
  const color = brief.style.brandColor;
  const letters = initials(brief.business.name);
  const fontSize = letters.length > 1 ? size * 0.42 : size * 0.52;
  return `<rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${color}"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="700" font-size="${fontSize}" fill="${onColor(color)}">${escXml(letters)}</text>`;
}

// Wordmark logo: monogram + business name. `textColor` flips between the
// header (dark text on light) and footer (white text on dark) variants.
function logoSvg(brief, textColor) {
  const name = brief.business.name;
  const fontSize = 30;
  const textWidth = Math.ceil(name.length * fontSize * 0.58);
  const width = 64 + 18 + textWidth + 6;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 64" width="${width}" height="64" role="img" aria-label="${escXml(name)}">
  ${markSvg(brief)}
  <text x="82" y="38" dominant-baseline="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="700" font-size="${fontSize}" fill="${textColor}">${escXml(name)}</text>
</svg>
`;
}

function faviconSvg(brief) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  ${markSvg(brief)}
</svg>
`;
}

function webmanifest(brief) {
  return JSON.stringify(
    {
      name: brief.business.name,
      short_name: brief.business.name.slice(0, 30),
      icons: [{ src: "/assets/favicons/favicon.svg", sizes: "any", type: "image/svg+xml" }],
      theme_color: brief.style.brandColor,
      background_color: "#ffffff",
      display: "standalone",
    },
    null,
    2,
  );
}

// Tolerant string patch: replaces when the pristine literal is still there,
// quietly does nothing on already-patched (or diverged) workspaces.
function patchFile(file, replacements) {
  if (!fs.existsSync(file)) return;
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [from, to] of replacements) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(file, text);
}

/** Write the generated brand assets + apply include patches to a workspace. */
export function applyBranding(workDir, { brief, copy, kit = "eleventy" }) {
  if (kit === "astro") return applyAstroBranding(workDir, { brief, copy });
  return applyEleventyBranding(workDir, { brief, copy });
}

function applyEleventyBranding(workDir, { brief, copy }) {
  const src = (...p) => path.join(workDir, "src", ...p);
  const name = brief.business.name;
  const services = copy.services;

  // Logos: header (dark text), footer (white text), plus the base layout's
  // preloaded copy under assets/svgs.
  fs.writeFileSync(src("assets", "images", "header", "logo-black.svg"), logoSvg(brief, "#1a1a1a"));
  fs.writeFileSync(src("assets", "svgs", "logo-black.svg"), logoSvg(brief, "#1a1a1a"));
  fs.writeFileSync(src("assets", "svgs", "logo-white.svg"), logoSvg(brief, "#ffffff"));
  fs.writeFileSync(src("assets", "images", "footer", "logo-white.svg"), logoSvg(brief, "#ffffff"));

  // Favicon + manifest. The PNG favicon links are dropped from base.html so
  // the generated SVG (which every modern browser accepts) always wins.
  fs.writeFileSync(src("assets", "favicons", "favicon.svg"), faviconSvg(brief));
  fs.writeFileSync(src("assets", "favicons", "site.webmanifest"), webmanifest(brief));

  // Patterns must not span line breaks — the kit checks out with CRLF here.
  patchFile(src("_includes", "layouts", "base.html"), [
    [`<link rel="icon" type="image/png" href="/assets/favicons/favicon-96x96.png" sizes="96x96"/>`, ""],
    [`<link rel="shortcut icon" href="/assets/favicons/favicon.ico"/>`, ""],
    [`<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png"/>`, ""],
    [`content="Starter Kit"`, `content="${escXml(name)}"`],
  ]);

  patchFile(src("_includes", "sections", "header.html"), [
    [`aria-label="Company Name Home page"`, `aria-label="${escXml(name)} home page"`],
    [`alt="Company Logo"`, `alt="${escXml(name)} logo"`],
    // Nav dropdown: the kit's two placeholder service pages get real names.
    // (Bare literals — the hrefs use "service-1", which these don't touch.)
    [`Service 1`, escXml(services[0]?.title ?? "Services")],
    [`Service 2`, escXml(services[1]?.title ?? "Services")],
  ]);

  patchFile(src("_includes", "sections", "footer.html"), [
    [
      `Extra content if you need it, if not you can delete this whole p tag. I usually do.`,
      escXml(copy.hero.text),
    ],
    [`href="/serviceone/">Service One`, `href="/services/service-1/">${escXml(services[0]?.title ?? "Service")}`],
    [`href="/servicetwo/">Service Two`, `href="/services/service-2/">${escXml(services[1]?.title ?? "Service")}`],
    [`href="/servicethree/">Service Three`, `href="/contact/">Get a Quote`],
  ]);

  // Contact page keeps its working form — just swap the kit's lorem intro
  // and stock front matter for the business's own words.
  patchFile(src("content", "pages", "contact.html"), [
    [`title: "Contact | Eleventy Starter Template"`, `title: "Contact | ${name.replace(/"/g, "'")}"`],
    [`description: "Contact Eleventy Starter Template"`, `description: "Get in touch with ${name.replace(/"/g, "'")}"`],
    [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ridiculus elementum ullamcorper ipsum porttitor aliquam. Id magna urna ultrices odio pulvinar. Sed ut.`,
      escXml(
        `Have a question or ready to get started? Send ${name} a message and we'll get back to you as soon as we can.`,
      ),
    ],
  ]);
}

// The Astro kit reads business data from src/data/client.ts and its nav from
// src/data/navData.json — both are rewritten wholesale from the brief, so no
// literal-patching is needed for names/contact. Logos/favicons follow the
// kit's asset layout (src/assets images, public/ favicons); the remaining
// patches swap the kit's stock literals in the header/footer/contact/meta.
function applyAstroBranding(workDir, { brief, copy }) {
  const src = (...p) => path.join(workDir, "src", ...p);
  const pub = (...p) => path.join(workDir, "public", ...p);
  const name = brief.business.name;
  const services = copy.services;
  const [city = "", state = ""] = brief.business.location.split(",").map((s) => s.trim());
  const phone = brief.contact.phone?.trim() ?? "";

  // Logos (header dark-text, footer white-text) + the icon copies some
  // components load via astro-icon.
  fs.writeFileSync(src("assets", "images", "header", "logo-black.svg"), logoSvg(brief, "#1a1a1a"));
  fs.writeFileSync(src("assets", "images", "footer", "logo-white.svg"), logoSvg(brief, "#ffffff"));
  fs.writeFileSync(src("icons", "logo-black.svg"), logoSvg(brief, "#1a1a1a"));
  fs.writeFileSync(src("icons", "logo-white.svg"), logoSvg(brief, "#ffffff"));

  // Favicon + manifest live in public/ for the Astro kit.
  fs.writeFileSync(pub("assets", "favicons", "favicon.svg"), faviconSvg(brief));
  fs.writeFileSync(pub("assets", "favicons", "site.webmanifest"), webmanifest(brief));

  // Point the head at the generated SVG favicon instead of the kit's PNGs.
  patchFile(src("components", "Meta", "Meta.astro"), [
    [
      `<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png?v1" />`,
      `<link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg" />`,
    ],
    [`<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />`, ""],
    [`<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png" />`, ""],
  ]);

  // Business data: rewrite client.ts with the brief (same exported shape).
  const j = JSON.stringify;
  fs.writeFileSync(
    src("data", "client.ts"),
    `// ===== SITE CONSTANTS ===== (generated per tenant by scripts/generate-brand.mjs)
export const SITE = {
	title: ${j(name)},
	tagline: ${j(`${brief.business.type} in ${city}`)},
	description: ${j(copy.meta.description)},
	url: "https://www.yourwebsite.com",
	author: ${j(name)},
	locale: "en",
};

// ===== BUSINESS INFO =====
export const BUSINESS = {
	name: SITE.title,
	email: ${j(brief.contact.email ?? "")},
	phoneForTel: ${j(phone.replace(/[^\d+]/g, ""))},
	phoneFormatted: ${j(phone)},
	logo: "/assets/favicons/favicon.svg",
	address: {
		lineOne: "",
		lineTwo: "",
		city: ${j(city)},
		state: ${j(state)},
		zip: "",
		mapLink: "",
	},
	socials: {
		facebook: "https://www.facebook.com/",
		instagram: "https://www.instagram.com/",
	},
};

// ===== SEO DEFAULTS =====
export const SEO = {
	title: ${j(copy.meta.title)},
	description: ${j(copy.meta.description)},
};

// ===== OPEN GRAPH DEFAULTS =====
export const OG = {
	locale: "en_US",
	image: "/assets/social.jpg",
};
`,
  );

  // The kit's header hardcodes its nav ("no navData.json dependency") — patch
  // the placeholder service labels to the business's real lead services.
  patchFile(src("components", "Header", "StaticHeader.astro"), [
    [`alt="Company Logo"`, `alt="${escXml(name)} logo"`],
    [`>Service 1</a>`, `>${escXml(services[0]?.title ?? "Services")}</a>`],
    [`>Service 2</a>`, `>${escXml(services[1]?.title ?? "Services")}</a>`],
  ]);

  patchFile(src("components", "Footer", "Footer.astro"), [
    [`alt="Company Logo"`, `alt="${escXml(name)} logo"`],
    [
      `Extra content if you need it, if not you can delete this whole p tag. I usually do.`,
      escXml(copy.hero.text),
    ],
    [`href="/serviceone/">Service One`, `href="/services/service-1/">${escXml(services[0]?.title ?? "Service")}`],
    [`href="/servicetwo/">Service Two`, `href="/services/service-2/">${escXml(services[1]?.title ?? "Service")}`],
    [`href="/servicethree/">Service Three`, `href="/contact/">Get a Quote`],
  ]);

  // Contact page keeps its working form — swap the stock title and lorem.
  patchFile(src("pages", "contact.astro"), [
    [`title="Contact" description="Meta description for the page"`, `title=${j(`Contact | ${name}`)} description=${j(`Get in touch with ${name}`)}`],
    [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ridiculus elementum ullamcorper ipsum porttitor aliquam. Id magna urna ultrices odio pulvinar. Sed ut.`,
      escXml(
        `Have a question or ready to get started? Send ${name} a message and we'll get back to you as soon as we can.`,
      ),
    ],
  ]);
}
