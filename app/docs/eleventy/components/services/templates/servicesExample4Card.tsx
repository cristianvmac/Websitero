import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples4Card";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotServices4Card.png";


export const servicesExample4Card: Example = {
  title: "Services 4 Card",
  description: "A two-column services section featuring a text/CTA block on the left and a 2×2 grid of icon cards on the right, with an orange accent color scheme and a light gray background.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Services 4 Card"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
