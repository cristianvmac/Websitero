import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples4CardH";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotWcu4CardH.png";


export const wcu4CardH: Example = {
  title: "Why Choose Us - 4 Card",
  description: "A responsive 4-card “Why Choose Us” horizontal section highlighting key strengths with icons, headlines, and a CTA.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Wcu 4Card"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
