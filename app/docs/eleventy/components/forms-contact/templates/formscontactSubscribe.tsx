import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesSubscribe";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotSubscriu.png";


export const formscontactSubscribe: Example = {
  title: "Forms Contact Subscriu",
  description: "A responsive CTA section with a newsletter subscription form, background image, and bold call-to-action design.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="FormsContqct Subscriu"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
