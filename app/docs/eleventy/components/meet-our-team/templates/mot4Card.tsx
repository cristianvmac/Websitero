import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples4Card";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotMot4Card.png";


export const mot4Card: Example = {
  title: "Meet Our Team - 4 Card",
  description: "A grid of team member cards displaying each person's photo, name, job title, and social media links.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Meet Our Team 4 Card"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
