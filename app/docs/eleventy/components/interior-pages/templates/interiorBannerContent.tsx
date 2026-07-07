import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesBannerContent";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotBannerContent.png";


export const interiorBannerContent: Example = {
  title: "Interior Pages - Banner & Content",
  description: "A modern, responsive content page layout featuring a bold hero banner and a structured text section designed for service or informational pages. It includes clear typography hierarchy, rich text elements, and a side image composition, making it ideal for presenting detailed content, storytelling, and business insights in a clean, professional format.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Banner + Content"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
