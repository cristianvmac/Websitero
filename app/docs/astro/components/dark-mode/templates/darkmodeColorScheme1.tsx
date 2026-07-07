import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesColorScheme1";
import Image from "next/image";
import screenshotSrc from "../images/AstroDarkModeColorScheme1.png";


export const darkmodeColorScheme1: Example = {
  title: "Dark Mode Color Scheme1",
  description: "A reusable light/dark theme switcher with CSS custom properties for color variables, an animated sun/moon SVG toggle button, and JavaScript that persists the user's preference via localStorage (respecting system color-scheme on first visit).",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Dark Mode Color Scheme1 alt img"
      width={900}
      height={500}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  ),
};
