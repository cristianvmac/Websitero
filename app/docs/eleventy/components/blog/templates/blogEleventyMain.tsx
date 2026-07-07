import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesEleventyMain";
import Image from "next/image";
import screenshotSrc from "../images/EleventyBlog.png";


export const blogEleventyMain: Example = {
  title: "Blog",
  description: "A responsive blog listing page template with featured posts sidebar, built with mobile-first CSS, dark mode support, and reusable design-token-based core styles.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic Blog"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
