import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContentPageLeftSide";
import Image from "next/image";
import screenshotSrc from "../images/EleventyInteriorContentLeftSide1.png";


export const interiorContentPageLeftSide: Example = {
  title: "Interior Pages - Content Page",
  description: "It features a two-column layout with a headline, descriptive copy about personalized programs, a 3-step process list, and an 'expect' checklist, paired with two stacked images in a wave-shaped rounded frame.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt=""
      width={900}
      height={500}
      style={{ width: "auto", height: "auto", display: "block" }}
    />
  ),
};