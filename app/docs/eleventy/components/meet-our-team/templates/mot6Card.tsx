import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples6Card";
import Image from "next/image";
import screenshotSrc from "../images/EleventyMot6Card.png";


export const mot6Card: Example = {
  title: "Meet Our Team - 6 Card",
  description: "A section showcasing team members with their roles.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="MeetOurTeam 6 Card"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
