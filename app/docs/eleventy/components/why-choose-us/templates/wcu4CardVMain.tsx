import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples4CardVMain";
import Image from "next/image";
import screenshotSrc from "../images/EleventyWcu4.png";


export const wcu4CardVMain: Example = {
  title: "Why Choose Us - 4 Card",
  description: "A responsive “Why Choose Us” section with image, headline, supporting text, CTA, and four feature cards highlighting key services.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Wcu 4 Card"
      width={900}
      height={600}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
