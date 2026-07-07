import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContentPage";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotContentPage.png";


export const interiorContentPage: Example = {
  title: "Interior Pages - Content Page",
  description: "A clean and responsive content page layout designed for storytelling and informational content, featuring a strong typography hierarchy, structured text sections, and a complementary image group. Ideal for showcasing services, wellness topics, or in-depth content with a balanced, modern design that enhances readability and engagement.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Interior Pages - Content Page"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
