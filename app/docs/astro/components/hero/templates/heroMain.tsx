import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMain";
import Image from "next/image";
import screenshotSrc from "../images/AstroHero8.png";


export const heroMain: Example = {
  title: "Centered Hero",
  description: "Full-width hero section with centered headline, supporting text, primary and secondary CTAs, and a darkened background image for strong visual impact.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic Hero Center"
      width={900}
      height={400}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
