import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples6Card";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotWcu6Card1.png";


export const wcu6Card: Example = {
  title: "Why Choose Us - 6 Card",
  description: "A responsive “Why Choose Us” section with image, headline, CTA, and six cards showcasing specialized professional photography services.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Wcu 6Card"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
