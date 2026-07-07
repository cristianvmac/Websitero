import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples6CardDescriptionImages";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotServices6CardDescriptionImages2.png";


export const servicesExample6CardDI: Example = {
  title: "Services 6 Card Description + Images",
  description: "A centered header with a side-bordered description alongside a 3×2 grid of image cards, each featuring a hover zoom effect, title, text, and an orange 'Get Started' arrow link.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Services 6 Card Description and Images"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
