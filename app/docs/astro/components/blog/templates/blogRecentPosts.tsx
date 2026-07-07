import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesRecentPosts";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotLandingCenter.png";


export const blogRecentPosts: Example = {
  title: "Blog Recent Posts",
  description: "...",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Blog Recent Posts"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
