
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

/*-- -------------------------- */
/*           Hero              */
/*---------------------------- */

/* Mobile - 360px */
@media only screen and (min-width: 0em) {
  #hero {
    font-family: "Roboto", "Arial", sans-serif;
    text-align: center;
    padding: 0 1rem;
    padding-bottom: 6.25rem;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  #hero .cs-picture {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
  }

  #hero .cs-picture::before {
    content: "";
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
  }

  #hero .cs-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  #hero .cs-container {
    width: 100%;
    max-width: 80em;
    margin: auto;
    padding: clamp(9em, 25.95vw, 17.5em) 0;
    position: relative;
  }

  #hero .cs-container::before {
    content: "";
    width: 1px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(250, 251, 252, 0.5) 0%,
      rgba(250, 251, 252, 0) 100%
    );
    position: absolute;
    top: 0;
    left: 0;
  }

  #hero .cs-flex-group {
    width: 80vw;
    max-width: clamp(29em, 60vw, 35.125em);
    margin: auto;
    margin-bottom: clamp(3.75em, 15.5vw, 13.75em);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  #hero .cs-topper {
    text-align: center;
    margin-bottom: 1rem;
    color: var(--primary);
  }

  #hero .cs-title {
    text-align: center;
    width: 100%;
    color: var(--bodyTextColorWhite);
  }

  #hero .cs-text {
    text-align: center;
    margin: 0 auto clamp(2rem, 4vw, 2.5rem) 0;
    margin-bottom: clamp(2.5rem, 4vw, 3rem);
    color: var(--bodyTextColorWhite);
  }

  #hero .cs-button-solid {
    line-height: clamp(2.875em, 5.5vw, 3.5em);
    height: initial;
    margin-bottom: 1rem;
  }

  #hero .cs-button-transparent {
    font-size: 1rem;
    font-weight: 700;
    line-height: clamp(2.875em, 5.5vw, 3.5em);
    text-decoration: none;
    width: 11.25rem;
    height: clamp(2.875em, 5.5vw, 3.5em);
    margin: 0 0.5rem;
    box-sizing: border-box;
    padding: 0;
    color: #fff;
    background-color: transparent;
    border: 1px solid var(--bodyTextColorWhite);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  #hero .cs-button-transparent::before {
    content: "";
    background: #000;
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    z-index: -1;
    transform: scaleX(0);
    transition: transform 0.3s;
    transform-origin: left;
  }

  #hero .cs-button-transparent:hover::before {
    transform: scaleX(1);
  }

  #hero .cs-button-transparent .cs-img {
    margin-right: 0.75rem;
    display: block;
  }
}

/* Tablet - 768px */
@media only screen and (min-width: 48em) {
  #hero {
    padding: 0 clamp(2em, 5vw, 2.5em);
  }

  #hero .cs-container {
    padding: clamp(7em, 27.95vw, 17.5em) 0 clamp(9em, 30.95vw, 23.5em) 0;
  }

  #hero .cs-container::after {
    content: "";
    width: 1px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(250, 251, 252, 0) 0%,
      rgba(250, 251, 252, 0.5) 100%
    );
    position: absolute;
    top: 0;
    right: 0;
  }

  #hero .cs-button-solid {
    margin-right: 1.25rem;
    margin-bottom: 0;
  }
}

/* Desktop - 1300px */
@media only screen and (min-width: 81.25em) {
  #hero {
    /* no extra styles */
  }
}

/* Dark Mode */
@media only screen and (min-width: 0em) {
  body.dark-mode #hero .cs-background::before {
    opacity: 0.8;
  }
}

`;

export const sampleHtml = `

<section id="hero">
	<div class="cs-container">
		<div class="cs-flex-group">
			<span class="cs-topper">Websitero presents</span>
			<h1 class="cs-title">Astro Starter <br /> Template</h1>
			<p class="cs-text">This starter kit gives you a ready-made website setup built with Astro, so you can reuse sections, manage your content in one place, and grow your site easily. It also includes a built-in blog with Decap CMS.</p>
			<a href="/about/" class="cs-button-solid">Explore More</a>
			<a href="/contact/" class="cs-button-transparent">
				<Icon name="play" class="cs-img" />
				Get in Touch
			</a>
		</div>
	</div>

	<!-- Using the preloaded image from the props -->
	<Picture src={image.src} alt="hero background img " width={image.attributes.width} height={image.attributes.height} formats={["avif", "webp"]} priority pictureAttributes={{ class: "cs-picture" }} />
</section>


`;

export const sampleJs = `



`;