import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples4Steps";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotSteps4Steps.png";


export const steps4Steps: Example = {
  title: "Steps - 4 Steps",
  description: "A step-by-step overview of the service process.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Steps4Steps"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
