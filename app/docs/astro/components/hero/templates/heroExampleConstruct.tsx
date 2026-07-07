import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesExampleConstruct";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotHero-ExampleConstruct.png";


export const heroExampleConstruct: Example = {
  title: "Content Center + Services",
  description: "Full-width hero with centered content and a featured services panel that creates a seamless transition into the site's offerings.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic Hero Content Center + Services"
      width={400}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};