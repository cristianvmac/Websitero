import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesSbsConstruct";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFormsContactMain.png";


export const formscontactContactSbsConstruct: Example = {
  title: "Forms Contact",
  description: "desc",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Forms Contact"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};