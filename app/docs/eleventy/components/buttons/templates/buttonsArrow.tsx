import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesArrow";
import Image from "next/image";
import screenshotSrc from "../images/EleventyButtonArrow.png";


export const buttonsArrow: Example = {
  title: "Button +Arrow",
  description: "A stylish button component with an integrated arrow icon, featuring smooth hover animations and layered transitions. Designed to draw attention and enhance user interaction with a clean, modern look.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Button+Arrow"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
