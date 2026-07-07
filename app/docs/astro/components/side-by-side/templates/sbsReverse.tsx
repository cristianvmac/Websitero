import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesSbsReverse";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotSbsReverse.png";


export const sbsReverse: Example = {
  title: "Side by Side Reverse",
  description: "A responsive side-by-side section with a staggered image collage and a text block featuring a headline, description, and bold stat highlights for credibility and visual impact.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Side by Side Reverse"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
