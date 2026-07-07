import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMultiFAQs";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFaqMultiFAQs.png";


export const faqMultiFAQs: Example = {
  title: "FAQ - MultiFAQs",
  description: "An interactive FAQ section with category filtering and expandable answers. Helps users quickly find relevant information across multiple topics with smooth transitions and a clear, organized layout.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="MultiFAQs"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
