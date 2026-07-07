import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesStandardCTA";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFaqStandardCTA.png";


export const faqStandardCTA: Example = {
  title: "FAQ - Standard CTA",
  description: "An interactive FAQ section for online fitness coaching, featuring expandable questions that provide clear answers to common client inquiries and guide users through the program.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Faq Standard"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
