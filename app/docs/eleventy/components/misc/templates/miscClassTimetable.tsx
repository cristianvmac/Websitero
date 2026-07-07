import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesClassTimetable";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotClassTimetable.png";


export const miscClassTimetable: Example = {
  title: "Misc - Class Timetable",
  description: "A responsive timetable section displaying structured weekly schedules in a clean, easy-to-scan layout. Adapts across devices and highlights daily activities with organized tables.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Misc Class Timetable"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
