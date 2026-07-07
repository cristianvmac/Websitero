import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples3Steps";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotSteps3Steps.png";


export const steps3Steps: Example = {
  title: "Steps - 3 Steps",
  description: "A side-by-side layout with a decorative image and a numbered list of steps walking users through a process or workflow.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Steps3Steps"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
