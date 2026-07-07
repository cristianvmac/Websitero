import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesFAQPage";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFAQPage.png";


export const interiorFAQPage: Example = {
  title: "Interior Pages - FAQ Pages",
  description: "A responsive and interactive FAQ section featuring categorized questions, expandable answers, and smooth filtering between topics. Designed to improve user experience by making information easy to navigate, with clean styling and dynamic JavaScript-powered interactions.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Interior Pages - FAQ Pages"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
