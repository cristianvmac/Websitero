import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContentList";
import Image from "next/image";
import screenshotSrc from "../images/EleventyContentList2.png";


export const contentflairContentList: Example = {
  title: "Content List",
  description: "A vertical list of icon + text rows, each with a circular icon badge on the left and a bold title with description on the right.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Content Flair Content List"
      width={900}
      height={500}
      style={{ width: "auto", height: "auto", display: "block" }}
    />
  ),
};
