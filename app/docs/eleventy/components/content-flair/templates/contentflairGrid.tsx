import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContentGrid";
import Image from "next/image";
import screenshotSrc from "../images/EleventyContentListGrid.png";


export const contentflairGrid: Example = {
  title: "List Grid",
  description: "A 2×2 numbered list grid with orange step numbers beside bold titles and short descriptions beneath each item.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Content Flair List"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
