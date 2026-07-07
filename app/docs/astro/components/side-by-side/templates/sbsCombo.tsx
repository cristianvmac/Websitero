import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesSbsCombo";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotSbsCombo.png";


export const sbsCombo: Example = {
  title: "Side By Side Combo",
  description: "A split image-and-text section with a CTA, followed directly by a 4-column icon card row sharing the same background.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Sbs Combo"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
