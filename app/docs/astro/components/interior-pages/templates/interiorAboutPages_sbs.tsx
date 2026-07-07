import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesAboutPages_sbs";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotAboutPages_sbs.png";


export const interiorAboutPages_sbs: Example = {
  title: "Interior Pages - About Pages sbs",
  description: "A modern, responsive “About” page layout for a café or restaurant, featuring a visually striking hero banner, a side-by-side story section with imagery and testimonials, and a call-to-action area for reservations. Designed with clean styling, flexible layouts, and reusable global variables, it highlights brand storytelling, atmosphere, and customer engagement.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Interior Pages - About Pages sbs"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
