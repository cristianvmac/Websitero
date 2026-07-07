import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesLeftSlideIn";
import Image from "next/image";
import screenshotSrc from "../images/AstroButtonLeftSlideIn1.png";


export const buttonsLeftSlideIn: Example = {
  title: "Buttons - LeftSlideIn",
  description: "A clean, modern call-to-action button with a smooth left-to-right slide-in hover effect. It uses CSS variables for easy global styling and features a bold design where a dark overlay expands on hover, creating a sleek interactive experience.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Buttons LeftSlideIn"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
