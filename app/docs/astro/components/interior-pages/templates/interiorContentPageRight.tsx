import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContentPageRight";
import Image from "next/image";
import screenshotSrc from "../images/AstroInteriorContentRightSide1.png";


export const interiorContentPageRight: Example = {
  title: "Interior Pages - Content Page",
  description: "Two-column content-page layout: left text block (h1 title w/ accent span, descending h2–h4 headings, body paragraphs, ordered step-list, unordered bullet-list) + right image block (responsive <picture> with rounded/wave-clipped container), built mobile-first with flexbox reordering, CSS custom-property theming, and clamp()-based fluid typography/spacing.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt=""
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};