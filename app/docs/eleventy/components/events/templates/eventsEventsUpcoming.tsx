import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesEventsUpcoming";
import Image from "next/image";
import screenshotSrc from "../images/EleventyEventsUpcoming1.png";


export const eventsEventsUpcoming: Example = {
  title: "Events - Upcoming",
  description: "A modern “Upcoming Events” section with a clean split layout, combining a featured image and a list of event cards. It showcases dates, titles, and times in a sleek, responsive design enhanced with subtle animations and interactive hover effects for a dynamic user experience.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="EventsUpcoming"
      width={900}
      height={500}
      style={{ width: "auto", height: "auto", display: "block" }}
    />
  ),
};
