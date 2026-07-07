import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesHeroForm";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotHeroForm.png";


export const heroHeroForm: Example = {
  title: "Hero + Form",
  description: "Full-width hero with customer reviews, offer highlights, and an integrated lead generation form for service-based businesses.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic Hero Form"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
