// Step 2 of the pipeline: compose a homepage that's unique to this customer.
//
// Instead of every tenant getting the kit's stock index.html, the composer
// picks one variant per homepage section from the docs component library
// (scripts/component-library.mjs ← app/docs/eleventy/components) and fills
// it with the brief's AI-written copy. The pick is seeded by the customer's
// slug: deterministic (rebuilds don't reshuffle their site) but different
// from customer to customer, so two briefs get visibly different homepages.
//
// CodeStitch blocks share a strict class contract (.cs-topper / .cs-title /
// .cs-text headers, .cs-item cards, /assets-independent CSS scoped under a
// unique section id, colors from the :root variables the kit's root.css +
// tenant brand override already define) — that contract is what makes blind
// mix-and-match safe.
//
// composeSite() returns { files, picks }: `files` maps workspace-relative
// paths (under src/) to contents — the homepage, the interior pages (about,
// faq, reviews, portfolio, the two service pages), and the shared
// sections.css / sections.js bundles.

import { parse } from "node-html-parser";
import { loadVariants } from "./component-library.mjs";

// Variants verified against the shared CodeStitch class contract. Add a new
// docs sample to a pool once its markup follows the same slots.
const POOLS = {
  hero: ["hero/LandingCenter", "hero/ContentLeft", "hero/RightAligned", "hero/LandingServices"],
  services: ["services/4Card", "why-choose-us/4CardH", "why-choose-us/6Card"],
  about: ["about/Main", "side-by-side/SbsCombo", "side-by-side/SbsStandard"],
  seo: ["side-by-side/Main", "side-by-side/SbsCombo", "side-by-side/SbsStandard"],
  gallery: ["gallery/Main", "gallery/Links", "gallery/Stats"],
  reviews: ["reviews/Main", "reviews/3Card", "reviews/3CardStars", "reviews/4Card"],
  faq: ["faq/Main", "faq/StandardCTA"],
  cta: ["cta/Main", "cta/Reverse"],
};

// Heroes that bundle their own services card strip (multi-section samples).
// When one is picked, the standalone services section is dropped and the
// strip's cards are filled with the services copy instead.
const COMBO_HEROES = new Set(["hero/LandingServices"]);

// Both faq variants toggle an `active` class per .cs-faq-item; their bundled
// docs JS drags in a whole nav script, so we ship this minimal toggle instead.
const ACCORDION_JS = `document.addEventListener('DOMContentLoaded', () => {
  for (const item of document.querySelectorAll('.cs-faq-item')) {
    item.addEventListener('click', () => item.classList.toggle('active'));
  }
});`;

// ---------- seeded picks ----------------------------------------------------

// xmur3 hash + mulberry32 PRNG: tiny, deterministic per seed string.
function seededRandom(seedText) {
  let h = 1779033703 ^ seedText.length;
  for (let i = 0; i < seedText.length; i++) {
    h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = (h >>> 0) || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- fill helpers -----------------------------------------------------

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Titles may legitimately carry a single <br /> from the copywriter.
const escTitle = (s) => esc(s).replace(/&lt;br\s*\/?\s*&gt;/gi, "<br/>");

function firstIn(scope, selectors) {
  if (!scope) return null;
  for (const sel of selectors) {
    const hit = scope.querySelector(sel);
    if (hit) return hit;
  }
  return null;
}

function setText(el, text, { br = false } = {}) {
  if (!el || text == null) return;
  el.set_content(br ? escTitle(text) : esc(text));
}

// Replace only the text while keeping element children (icons, nested spans).
function setOwnText(el, text, { textFirst = true } = {}) {
  if (!el || text == null) return;
  const kids = el.childNodes.filter((n) => n.nodeType === 1).map((n) => n.toString());
  const parts = textFirst ? [esc(text), ...kids] : [...kids, " " + esc(text)];
  el.set_content(parts.join(""));
}

function setButtons(section, { href, label }) {
  for (const a of section.querySelectorAll("a.cs-button-solid")) {
    if (href) a.setAttribute("href", href);
    if (label) setText(a, label);
  }
  // Secondary/ghost buttons (icon + text): keep the icon, retarget the link.
  for (const a of section.querySelectorAll("a.cs-button-transparent")) {
    a.setAttribute("href", "/about/");
    setOwnText(a, "Learn More", { textFirst: false });
  }
}

function fillHeader(section, { topper, title, text }) {
  setText(section.querySelector(".cs-topper"), topper);
  setText(section.querySelector(".cs-title"), title, { br: true });
  if (text != null) setText(section.querySelector("p.cs-text"), text);
}

// Card grids (services / why-choose-us / reviews): fill up to copy length,
// drop surplus cards so no lorem or off-vertical demo text survives.
function fillItems(section, entries, fillOne) {
  const items = section.querySelectorAll("li.cs-item");
  items.forEach((item, i) => {
    if (i < entries.length) fillOne(item, entries[i]);
    else item.remove();
  });
}

// Swap demo photos for the owner's uploaded ones. Only structural <picture>
// blocks — never card icons or reviewer avatars (reviews/faq are skipped by
// the caller). Cycles when there are fewer uploads than slots.
function applyUploads(section, uploads, state) {
  for (const pic of section.querySelectorAll("picture")) {
    if (pic.getAttribute("class")?.includes("cs-icon")) continue; // card icons, not photos
    const img = pic.querySelector("img");
    // The samples' stock photos describe the demo business ("therapist") —
    // these pictures are decorative here, so silence their alt text even
    // when the photo itself stays.
    if (img) img.setAttribute("alt", "");
    if (!uploads.length) continue;
    const src = uploads[state.i++ % uploads.length];
    for (const source of pic.querySelectorAll("source")) source.setAttribute("srcset", src);
    if (img) img.setAttribute("src", src);
  }
}

// ---------- per-slot fillers --------------------------------------------------

const FILLERS = {
  hero(section, { copy }) {
    fillHeader(section, copy.hero);
    // Combo heroes ship their own services card strip — fill it like cards.
    fillItems(section, copy.services, (item, entry) => {
      setText(firstIn(item, [".cs-h3", "h3", "h2.cs-title", "h2"]), entry.title);
      setText(firstIn(item, [".cs-item-text", "p.cs-text", "p"]), entry.text);
    });
    setButtons(section, { href: "/contact/", label: "Get in Touch" });
  },

  services(section, { copy, brief }) {
    fillHeader(section, {
      topper: "Our Services",
      title: `What ${brief.business.name} Offers`,
      text: copy.meta.description,
    });
    fillItems(section, copy.services, (item, entry) => {
      setText(firstIn(item, [".cs-h3", "h3"]), entry.title);
      setText(firstIn(item, [".cs-item-text", "p.cs-text", "p"]), entry.text);
    });
    setButtons(section, { href: "/contact/", label: "Get a Free Quote" });
  },

  about(section, { copy }) {
    fillSbs(section, copy.about, copy);
    setButtons(section, { href: "/about/", label: "More About Us" });
  },

  seo(section, { copy }) {
    fillSbs(section, { ...copy.seo, quote: copy.meta.description }, copy);
    setButtons(section, { href: "/contact/", label: "Get in Touch" });
  },

  gallery(section, { copy, brief }) {
    fillHeader(section, { ...copy.gallery, text: copy.meta.description });
    // Variant-specific flair: tag/project labels (Stats), hover titles (Links)
    for (const tag of section.querySelectorAll(".cs-tag")) setText(tag, brief.business.type);
    for (const project of section.querySelectorAll(".cs-project")) setText(project, "Recent work");
    const hoverTitles = section.querySelectorAll(".cs-hover-box .cs-h3");
    hoverTitles.forEach((h, i) => setText(h, copy.services[i % copy.services.length].title));
    for (const link of section.querySelectorAll("a.cs-link")) link.setAttribute("href", "/portfolio/");
    for (const a of section.querySelectorAll("a.cs-image")) a.setAttribute("href", "/portfolio/");
    setButtons(section, { href: "/portfolio/", label: "View Full Gallery" });
  },

  reviews(section, { copy }) {
    fillHeader(section, copy.reviews);
    fillItems(section, copy.reviews.items, (item, entry) => {
      setText(firstIn(item, [".cs-item-p", ".cs-item-text"]), entry.text);
      const name = firstIn(item, [".cs-reviewer", ".cs-name"]);
      setOwnText(name, entry.name); // keeps the nested .cs-desc/.cs-job span
      setText(firstIn(item, [".cs-desc", ".cs-job"]), entry.desc);
    });
    setButtons(section, { href: "/reviews/", label: "Read More Reviews" });
  },

  faq(section, { copy }) {
    fillHeader(section, copy.faq);
    const items = section.querySelectorAll("li.cs-faq-item");
    items.forEach((item, i) => {
      if (i >= copy.faq.items.length) return item.remove();
      const button = item.querySelector("button.cs-button");
      const questionSlot = button?.querySelector(".cs-button-text") ?? button;
      setText(questionSlot, copy.faq.items[i].question);
      setText(firstIn(item, [".cs-item-p", "p"]), copy.faq.items[i].answer);
      item.classList.remove("active"); // start all collapsed
    });
    setButtons(section, { href: "/contact/", label: "Contact Us" });
  },

  cta(section, { copy, brief }) {
    fillHeader(section, {
      topper: "Get in Touch",
      title: `Ready to work with ${brief.business.name}?`,
      text: "Call, email, or send a message through the contact form — we'd love to hear from you.",
    });
    setButtons(section, { href: "/contact/", label: "Contact Us" });
  },
};

function fillSbs(section, { topper, title, paragraphs, quote, name, job }, copy) {
  setText(section.querySelector(".cs-topper"), topper);
  setText(section.querySelector(".cs-title"), title, { br: true });
  // Paragraph stack: fill what the variant has room for, drop the surplus.
  const ps = section.querySelectorAll("p.cs-text");
  ps.forEach((p, i) => {
    if (i < paragraphs.length) setText(p, paragraphs[i]);
    else p.remove();
  });
  // Optional slots, present on some variants only:
  setText(section.querySelector(".cs-flex-p"), quote); // pull-quote box
  setText(section.querySelector(".cs-name"), name);
  setText(section.querySelector(".cs-job"), job);
  setText(section.querySelector("p.cs-header"), quote); // decorative banner line
  // Checklist bullets → the business's actual services.
  const bullets = section.querySelectorAll("li.cs-li");
  bullets.forEach((li, i) =>
    setOwnText(li, copy.services[i % copy.services.length].title, { textFirst: false }),
  );
}

// Which slots get the owner's uploaded photos (never reviews/faq — those
// pictures are avatars and decorations, not business imagery).
const UPLOAD_SLOTS = new Set(["hero", "about", "seo", "gallery", "cta"]);

// ---------- compose -----------------------------------------------------------

// Interior pages reuse the kit's #banner (styled sitewide in root.css).
function bannerHtml(title, image = "/assets/images/banner.webp") {
  return `<div id="banner">
    <div class="cs-container">
        <span class="cs-int-title">${esc(title)}</span>
    </div>
    <picture class="cs-background">
        <source media="(max-width: 600px)" srcset="${image}">
        <source media="(min-width: 601px)" srcset="${image}">
        <img aria-hidden="true" loading="lazy" decoding="async" src="${image}" alt="" width="1920" height="375">
    </picture>
</div>`;
}

function pageShell({ title, description, permalink, tags, body, needsJs }) {
  const yaml = (s) => String(s).replace(/"/g, "'");
  return `---
title: "${yaml(title)}"
description: "${yaml(description)}"
permalink: "${permalink}"${tags ? `\ntags: "${tags}"` : ""}
lang: en
---

{% extends "layouts/base.html" %}

{% block head %}
    <link rel="stylesheet" href="/assets/css/sections.css"/>${
      needsJs ? `\n    <script defer src="/assets/js/sections.js"></script>` : ""
    }
{% endblock %}

{% block body %}
{% raw %}
${body}
{% endraw %}
{% endblock %}
`;
}

/**
 * Build the customer's whole site — homepage plus interior pages — from the
 * brief + generated copy. Every variant pick is seeded by `seed`, and pages
 * avoid reusing the homepage's variant of the same category, so the site
 * varies page to page as well as customer to customer.
 *
 * @returns {{ files: Record<string,string>, picks: Record<string,string> }}
 *          `files` keys are workspace paths relative to src/.
 */
export function composeSite({ brief, copy, seed, uploads = [] }) {
  const rand = seededRandom(seed);
  const pick = (pool, exclude = []) => {
    const options = pool.filter((id) => !exclude.includes(id));
    const from = options.length ? options : pool; // never exhaust a pool
    return from[Math.floor(rand() * from.length)];
  };

  const variantCache = new Map();
  const getVariant = (id) => {
    if (!variantCache.has(id)) variantCache.set(id, loadVariants([id])[0] ?? null);
    return variantCache.get(id);
  };

  // CSS is bundled once for the whole site, deduped by variant.
  const cssParts = new Map();
  let needsAccordion = false;

  // Render one library section: parse → trim companions → fill → photos.
  function renderSection({ id, slot, fill, uploadsAllowed, keepCompanions = false, uploadState }) {
    const variant = getVariant(id);
    if (!variant) return ""; // library moved — skip the slot, never fail the build
    const doc = parse(variant.html, { comment: true });
    // Companion <section>s (SbsCombo's card strip, StandardCTA's extra CTA)
    // would surface the docs' demo copy — only combo heroes keep theirs.
    if (!keepCompanions) {
      for (const extra of doc.querySelectorAll("section").slice(1)) extra.remove();
    }
    fill(doc, { copy, brief });
    if (uploadsAllowed) applyUploads(doc, uploads, uploadState ?? { i: 0 });
    cssParts.set(id, variant.css);
    if (id.startsWith("faq/")) needsAccordion = true;
    return `<!-- ==================== ${slot}: ${id} ==================== -->\n${doc.toString()}`;
  }

  // ----- homepage -----
  const features = new Set(brief.features ?? []);
  const slots = ["hero", "services", "about", "seo"];
  if (features.has("gallery")) slots.push("gallery");
  if (features.has("reviews")) slots.push("reviews");
  if (features.has("faq")) slots.push("faq");
  slots.push("cta");

  // Pick every slot's variant up front (about/seo must not repeat a block).
  const picks = {};
  for (const slot of slots) {
    picks[slot] = pick(POOLS[slot], slot === "seo" ? [picks.about] : []);
  }
  // A combo hero already includes a services strip — don't show services twice.
  if (COMBO_HEROES.has(picks.hero)) {
    delete picks.services;
    slots.splice(slots.indexOf("services"), 1);
  }

  // Home photos cycle continuously across sections (hero gets the first).
  const uploadState = { i: 0 };
  const homeBody = slots
    .map((slot) =>
      renderSection({
        id: picks[slot],
        slot,
        fill: FILLERS[slot],
        uploadsAllowed: UPLOAD_SLOTS.has(slot),
        keepCompanions: slot === "hero",
        uploadState,
      }),
    )
    .filter(Boolean)
    .join("\n\n");

  const files = {};
  const name = brief.business.name;
  const bannerImage = uploads[0] ?? "/assets/images/banner.webp";

  // The homepage keeps its tenant-driven title/description via eleventyComputed.
  files["index.html"] = `---
permalink: "/"
tags: "sitemap"
eleventyComputed:
  title: "{{ copy.meta.title | safe }}"
  description: "{{ copy.meta.description | safe }}"
---

{% extends "layouts/base.html" %}

{% block head %}
    <link rel="stylesheet" href="/assets/css/sections.css"/>
    <script defer src="/assets/js/sections.js"></script>
{% endblock %}

{% block body %}
{% raw %}
${homeBody}
{% endraw %}
{% endblock %}
`;

  // ----- interior pages -----
  // Each page: banner + a different variant of its category than the
  // homepage used + its own CTA. Replaces the kit's stock pages wholesale.
  const pageCta = () => ({
    id: pick(POOLS.cta, [picks.cta]),
    slot: "cta",
    fill: FILLERS.cta,
    uploadsAllowed: true,
  });

  const pageSpecs = [
    {
      file: "content/pages/about.html",
      permalink: "/about/",
      banner: "About Us",
      title: `About Us | ${name}`,
      sections: [
        {
          // Avoid both side-by-side blocks the homepage already used.
          id: pick(POOLS.about, [picks.about, picks.seo]),
          slot: "about",
          fill: FILLERS.about,
          uploadsAllowed: true,
        },
        pageCta(),
      ],
    },
    {
      file: "content/pages/faq.html",
      permalink: "/faq/",
      banner: "FAQ",
      title: `FAQ | ${name}`,
      sections: [
        { id: pick(POOLS.faq, [picks.faq]), slot: "faq", fill: FILLERS.faq },
        pageCta(),
      ],
    },
    {
      file: "content/pages/reviews.html",
      permalink: "/reviews/",
      banner: "Reviews",
      title: `Reviews | ${name}`,
      sections: [
        { id: pick(POOLS.reviews, [picks.reviews]), slot: "reviews", fill: FILLERS.reviews },
        pageCta(),
      ],
    },
    {
      file: "content/pages/portfolio.html",
      permalink: "/portfolio/",
      banner: "Our Work",
      title: `Our Work | ${name}`,
      sections: [
        { id: pick(POOLS.gallery, [picks.gallery]), slot: "gallery", fill: FILLERS.gallery, uploadsAllowed: true },
        pageCta(),
      ],
    },
  ];

  // The kit's two service pages, one per lead service from the copy.
  copy.services.slice(0, 2).forEach((service, i) => {
    const fillService = (doc) => {
      fillSbs(
        doc,
        {
          topper: "Our Services",
          title: service.title,
          paragraphs: [service.text, copy.about.paragraphs?.[1]].filter(Boolean),
          quote: copy.about.quote,
        },
        copy,
      );
      setButtons(doc, { href: "/contact/", label: "Get a Free Quote" });
    };
    pageSpecs.push({
      file: `content/pages/services/service-${i + 1}.html`,
      permalink: `/services/service-${i + 1}/`,
      banner: service.title,
      title: `${service.title} | ${name}`,
      sections: [
        { id: pick(POOLS.seo, [picks.about, picks.seo]), slot: `service-${i + 1}`, fill: fillService, uploadsAllowed: true },
        pageCta(),
      ],
    });
  });

  for (const spec of pageSpecs) {
    const body = [bannerHtml(spec.banner, bannerImage), ...spec.sections.map(renderSection)]
      .filter(Boolean)
      .join("\n\n");
    files[spec.file] = pageShell({
      title: spec.title,
      description: copy.meta.description,
      permalink: spec.permalink,
      body,
      needsJs: true,
    });
    // Record page picks for the build log.
    for (const s of spec.sections) picks[`${spec.permalink}${s.slot}`] = s.id;
  }

  // ----- shared assets -----
  files["assets/css/sections.css"] = [...cssParts.entries()]
    .map(([id, css]) => `/* ==== ${id} ==== */\n${css}`)
    .join("\n\n");
  files["assets/js/sections.js"] = needsAccordion ? ACCORDION_JS : "// no interactive sections";

  return { files, picks };
}
