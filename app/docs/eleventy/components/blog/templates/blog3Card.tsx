import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples3Card";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotHeroForm.png";


export const blog3Card: Example = {
  title: "Blog 3 Card",
  description: "...",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Blog 3 Card"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
