import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples3StepsHorizontal";
import Image from "next/image";
import screenshotSrc from "../images/Astro3StepsHorizontal3.png";


export const steps3StepsHorizontal: Example = {
  title: "Steps - 3 Steps",
  description: "A horizontal row of labeled step cards breaking down a process into clear, sequential stages with a title and brief description each.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="3 Steps Horizontal"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
