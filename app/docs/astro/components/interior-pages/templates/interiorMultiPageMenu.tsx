import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMultiPageMenu";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotMultiPageMenu.png";


export const interiorMultiPageMenu: Example = {
  title: "Interior Pages - MultiPage Menu",
  description: "This is a fully responsive, modern coffee shop menu webpage built with clean HTML and CSS. It features a stunning hero banner with an appetizing food background and an interactive, filterable menu divided into five categories: Hot Coffee, Iced Drinks, Teas & Matcha, Pastries, and Breakfast Bites.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Interior Pages - MultiPage Menu"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
