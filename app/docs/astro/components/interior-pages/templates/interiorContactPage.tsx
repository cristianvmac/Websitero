import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContactPages";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotContactPages.png";


export const interiorContactPage: Example = {
  title: "Interior Pages - Contact Pages",
  description: "A clean and responsive contact page layout featuring a bold hero banner with breadcrumbs, a structured contact section with details and a user-friendly form, an embedded Google Map for location visibility, and a testimonial section to build trust. Designed for clarity, accessibility, and seamless user interaction.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Interior Pages - Contact Pages"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
