import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesSbsStandard";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotSbsStandard.png";


export const sbsStandard: Example = {
  title: "Side by Side Standard",
  description: "A responsive side-by-side section combining a large feature image with a content block, including a headline, description, feature list, and CTA for clear storytelling and conversion focus.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Sbs Standard"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
