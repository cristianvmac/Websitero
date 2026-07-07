import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMain";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotDarkModeMain.png";


export const darkmodeMain: Example = {
  title: "Dark Mode",
  description: "",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic DarkMode"
      width={400}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
