import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples3Card";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotEvents3Card.png";


export const events3Card: Example = {
  title: "Events - 3 Card",
  description: "A responsive “Events” section featuring a clean timeline-style layout for a photography workshop. It highlights multiple sessions with dates, descriptions, and images, using modern CSS, flexible grid design, and smooth hover effects to create an engaging and visually structured event overview.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Events 3Card"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
