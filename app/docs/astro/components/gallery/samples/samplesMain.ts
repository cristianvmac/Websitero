export const sampleRoot = `
/*-- -------------------------- -->
<---         CSS Reset          -->
<--- -------------------------- -*/

/* Modern CSS Reset - Based on Josh Comeau's reset */
/* 1. Use a more-intuitive box-sizing model */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

/* 3. Enable keyword animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  /* 4. Add accessible line-height */
  line-height: 1.5;
  /* 5. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 6. Improve media defaults */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

/* 7. Inherit fonts for form controls */
input,
button,
textarea,
select {
  font: inherit;
}

/* 8. Avoid text overflows */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* 9. Improve line wrapping */
p {
  text-wrap: pretty;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

/* 10. Create a root stacking context */
#root,
#__next {
  isolation: isolate;
}

/*-- -------------------------- -->
<---       CSS Variables        -->
<--- -------------------------- -*/

@media only screen and (min-width: 0em) {
  :root {
    /* Website colors */
    --primary: #ff6a3e;
    --primaryLight: #ffba43;
    --secondary: #001f3f;
    --secondaryLight: #001f3f;
    --headerColor: #1a1a1a;
    --bodyTextColor: #4e4b66;
    --bodyTextColorWhite: #fafbfc;

    /* 13px - 16px */
    --topperFontSize: clamp(0.8125rem, 1.6vw, 1rem);
    /* 31px - 49px */
    --headerFontSize: clamp(1.9375rem, 3.9vw, 3.0625rem);
    --bodyFontSize: 1rem;

    /* 60px - 100px top and bottom */
    --sectionPadding: clamp(3.75rem, 7.82vw, 6.25rem) 1rem;
  }
}

/*-- -------------------------- -->
<---       Font Faces           -->
<--- -------------------------- -*/

/* roboto-regular - latin */
@font-face {
  font-style: normal;
  font-family: "Roboto";
  font-weight: 400;
  font-display: swap;
  src: local(""),
    url("/assets/fonts/roboto-v29-latin-regular.woff2") format("woff2"),
    url("/assets/fonts/roboto-v29-latin-regular.woff") format("woff");
}

/* roboto-700 - latin */
@font-face {
  font-style: normal;
  font-family: "Roboto";
  font-weight: 700;
  font-display: swap;
  src: local(""),
    url("/assets/fonts/roboto-v29-latin-700.woff2") format("woff2"),
    url("/assets/fonts/roboto-v29-latin-700.woff") format("woff");
}

/* roboto-900 - latin */
@font-face {
  font-style: normal;
  font-family: "Roboto";
  font-weight: 900;
  font-display: swap;
  src: local(""),
    url("/assets/fonts/roboto-v29-latin-900.woff2") format("woff2"),
    url("/assets/fonts/roboto-v29-latin-900.woff") format("woff");
}

/*-- -------------------------- -->
<---     Base Element Styles    -->
<--- -------------------------- -*/

body,
html {
  font-family: "Roboto", Arial, sans-serif;
  font-size: 100%;
  color: var(--bodyTextColor);

}

body {
  transition: background-color 0.3s;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--headerColor);
}

p,
li,
a {
  font-size: 1rem;
  line-height: 1.5em;
}

p,
li {
  color: var(--bodyTextColor);
}

a:hover,
button:hover {
  cursor: pointer;
}

/*-- -------------------------- -->
<---   Typography Helpers       -->
<--- -------------------------- -*/

.cs-topper {
  font-size: var(--topperFontSize);
  font-weight: 700;
  line-height: 1.2em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--primary);
  display: block;
}

.cs-title {
  font-size: var(--headerFontSize);
  font-weight: 900;
  line-height: 1.2em;
  margin: 0 auto 1rem;
  color: var(--headerColor);
  position: relative;
}

.cs-text {
  font-size: var(--bodyFontSize);
  line-height: 1.5em;
  width: 100%;
  margin: 0 auto;
  color: var(--bodyTextColor);
}

/*-- -------------------------- -->
<---    Component Classes       -->
<--- -------------------------- -*/

@media only screen and (min-width: 0em) {
  /* Button */
  .cs-button-solid {
    font-size: 1rem;
    font-weight: bold;
    line-height: 3.125em;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    width: auto;
    height: 3.125rem;
    padding: 0 1.875rem;
    color: #000;
    background-color: var(--primary);
    display: inline-block;
    position: relative;
    z-index: 1;
    transition: color 0.3s;
    transition-delay: 0.1s;
  }

  .cs-button-solid:hover {
    color: #fff;
  }

  .cs-button-solid:hover::before {
    width: 100%;
  }

  .cs-button-solid::before {
    content: "";
    width: 0;
    height: 100%;
    background-color: #000;
    opacity: 1;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: width 0.3s;
  }

  .container {
    width: 92%;
    margin: auto;
    position: relative;
  }

  /* Skip to main content link */
  .skip {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    z-index: 10001;
    opacity: 0;
    overflow: hidden;
    transition: transform 0.3s, opacity 0.3s;
  }

  .skip:focus {
    transform: translateY(0);
    opacity: 1;
    padding: 1rem 1.5rem;
    background-color: var(--primary);
    color: var(--headerColor);
    text-decoration: none;
    font-weight: 700;
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
}

/*-- -------------------------- -->
<---      Utility Classes       -->
<--- -------------------------- -*/

/* Prevents icons from shrinking in flex containers */
[data-icon] {
  flex-shrink: 0;
}

.cs-hide-on-mobile {
  display: none;
}

.cs-hide-on-desktop {
  display: block;
}

/*-- -------------------------- -->
<---   Responsive Adjustments   -->
<--- -------------------------- -*/

/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
  .cs-hide-on-mobile {
    display: block;
  }

  .cs-hide-on-desktop {
    display: none;
  }
}

/* Scale full website with the viewport width */
@media only screen and (min-width: 2000px) {
  body,
  html {
    font-size: 0.85vw;
  }
}

`;

export const sampleCss = `

/*-- Gallery --*/

/* Mobile - base styles */
@media only screen and (min-width: 0em) {
  #gallery {
    text-align: center;
    padding: var(--sectionPadding);
    position: relative;
    overflow: hidden;
  }

  #gallery .cs-container {
    width: 100%;
    max-width: 82.625rem; /* 1322px */
    margin: auto;
  }

  #gallery .cs-topper {
    text-align: center;
    margin-bottom: 1rem;
  }

  #gallery .cs-title {
    text-align: center;
    max-width: 38.8125rem; /* 621px */
    margin-bottom: 2.5rem;
  }

  #gallery .cs-image-group {
    font-size: min(1.1vw, 1em);
    width: 100%;
    max-width: 82.625rem;
    margin: 0 auto 3.75rem;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 1.875rem;
  }

  #gallery .cs-row {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1.875rem;
  }

  #gallery .cs-picture {
    display: block;
    position: relative;
  }

  #gallery .cs-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Row 1 */
  #gallery .cs-row-1 .cs-picture1 {
    width: 26.25rem;
    height: 35.4375rem;
  }

  #gallery .cs-row-1 .cs-picture2 {
    width: 26.25rem;
    height: 39.3125rem;
  }

  #gallery .cs-row-1 .cs-picture3 {
    width: 26.25rem;
    height: 32rem;
  }

  /* Row 2 */
  #gallery .cs-row-2 .cs-picture1 {
    width: 26.25rem;
    height: 30.75rem;
  }

  #gallery .cs-row-2 .cs-picture2 {
    width: 26.25rem;
    height: 32.3125rem;
  }

  #gallery .cs-row-2 .cs-picture3 {
    width: 26.25rem;
    height: 39.3125rem;
  }

  /* Row 3 */
  #gallery .cs-row-3 .cs-picture1 {
    width: 26.25rem;
    height: 39.0625rem;
  }

  #gallery .cs-row-3 .cs-picture2 {
    width: 26.25rem;
    height: 28.25rem;
  }

  #gallery .cs-row-3 .cs-picture3 {
    width: 26.25rem;
    height: 39.3125rem;
  }
}

/* Dark mode */
@media only screen and (min-width: 0em) {
  body.dark-mode #gallery .cs-title {
    color: var(--bodyTextColorWhite);
  }
}
  
`;

export const sampleHtml = `

<section id="gallery">
  <div class="cs-container">
    <span class="cs-topper">Our Portfolio</span>
    <h2 class="cs-title">
      Expert Backup Generator Installation Services
    </h2>
    <div class="cs-image-group">
      <!-- Row 1-->
      <div class="cs-row cs-row-1">
        <!-- To add more images, copy and paste this row's picture tags here in order from cs-picture-1 to cs-picture-3 and they will maintain the same layout-->
        <Picture
          src={port1}
          alt="new hallway"
          width={400}
          height={560}
          formats={['avif', 'webp']}
          pictureAttributes={{ class: "cs-picture cs-picture1" }}
        />
        <Picture
          src={port4}
          alt="new home construction"
          width={400}
          height={560}
          formats={['avif', 'webp']}
          pictureAttributes={{ class: "cs-picture cs-picture2" }}
        />
        <Picture
          src={port7}
          alt="building a new wall"
          width={400}
          height={560}
          formats={['avif', 'webp']}
          pictureAttributes={{ class: "cs-picture cs-picture3" }}
        />
      </div>
      <!-- Row 2 -->
      <div class="cs-row cs-row-2">
        <!-- To add more images, copy and paste this row's picture tags here in order from cs-picture-1 to cs-picture-3 and they will maintain the same layout-->
        <Picture
          src={port2}
          alt="new kitchen"
          width={400}
          height={560}
          formats={['avif', 'webp']}
          pictureAttributes={{ class: "cs-picture cs-picture1" }}
        />
        <Picture
          src={port5}
          alt="apartment addition"
          width={400}
          height={560}
          formats={['avif', 'webp']}
          pictureAttributes={{ class: "cs-picture cs-picture2" }}
        />
        <Picture
          src={port8}
          alt="new kitchen cabinets"
          width={400}
          height={560}
          formats={['avif', 'webp']}
          pictureAttributes={{ class: "cs-picture cs-picture3" }}
        />
      </div>
      <!-- Row 3 -->
      <div class="cs-row cs-row-3">
        <!-- To add more images, copy and paste this row's picture tags here in order from cs-picture-1 to cs-picture-3 and they will maintain the same layout-->
        <Picture
          src={port3}
          alt="new kitchen"
          width={400}
          height={560}
          formats={['avif', 'webp']}
          pictureAttributes={{ class: "cs-picture cs-picture1" }}
        />
        <Picture
          src={port6}
          alt="apartment addition"
          width={400}
          height={560}
          formats={['avif', 'webp']}
          pictureAttributes={{ class: "cs-picture cs-picture2" }}
        />
        <Picture
          src={port9}
          alt="new kitchen cabinets"
          width={400}
          height={560}
          formats={['avif', 'webp']}
          pictureAttributes={{ class: "cs-picture cs-picture3" }}
        />
      </div>
    </div>
    <a href="/projects/" class="cs-button-solid">View all projects</a>
  </div>
</section>

`;

export const sampleJs = `

`;