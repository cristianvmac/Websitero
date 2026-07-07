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

/*-- -------------------------- -->
<---       Side By Side  reverse       -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0em) {
    #sbs-r {
        padding: var(--sectionPadding);
    }

    #sbs-r .cs-container {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 2.5rem;
    }

    #sbs-r .cs-left {
        font-size: min(2.31vw, 0.7em);
        width: 39.4375em;
        height: 39.75em;
        position: relative;
    }

    #sbs-r .cs-picture {
        border-radius: 1.5em;
        display: block;
        position: absolute;
        overflow: hidden;
    }

    #sbs-r .cs-picture img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    #sbs-r .cs-picture1 {
        width: 39.625em;
        height: 36.3125em;
        top: 0;
        right: 0;
    }

    #sbs-r .cs-picture2 {
        width: 25.875em;
        height: 25em;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 40px;
        border: clamp(0.375em, 1.5vw, 0.75em) solid #fff;
        bottom: 0;
        left: 0;
    }

    #sbs-r .cs-right {
        max-width: 33.875rem;
        margin: auto;
    }

    #sbs-r .cs-topper {
        text-align: left;
        margin-bottom: 0.25rem;
    }

    #sbs-r .cs-title {
        text-align: left;
        max-width: 50rem;
    }

    #sbs-r .cs-text {
        text-align: left;
        max-width: 46.875rem;
        margin-bottom: 1rem;
    }

    #sbs-r .cs-text:last-of-type {
        margin-bottom: 2rem;
    }

    #sbs-r .cs-flex-group {
        padding: clamp(1rem, 3vw, 2rem);
        background-color: #f7f7f7;
        border-radius: 1rem;
        position: relative;
    }

    #sbs-r .cs-flex-p {
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.5em;
        margin: 0 0 1rem;
        color: #353535;
    }

    #sbs-r .cs-name {
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.2em;
        text-transform: uppercase;
        margin: 0 0 0.25rem;
        color: var(--headerColor);
        display: block;
    }

    #sbs-r .cs-job {
        font-size: 0.875rem;
        line-height: 1.5em;
        color: #353535;
        display: block;
    }

    #sbs-r .cs-quote-icon {
        width: clamp(3.75rem, 10vw, 8.5rem);
        height: auto;
        position: absolute;
        right: clamp(1rem, 4vw, 2rem);
        bottom: 0;
    }
}

/* Desktop - 1024px */
@media only screen and (min-width: 64em) {
    #sbs-r .cs-container {
        flex-flow: row;
        justify-content: space-between;
        gap: 3.25rem;
    }

    #sbs-r .cs-left {
        font-size: min(1.2vw, 1em);
        order: 2;
        flex: none;
    }

    #sbs-r .cs-right {
        margin: 0;
    }
}

/* Dark Mode */
@media only screen and (min-width: 0em) {
    body.dark-mode #sbs-r .cs-left:before,
    body.dark-mode #sbs-r .cs-left:after {
        background: var(--accent);
    }

    body.dark-mode #sbs-r .cs-picture2 {
        background-color: var(--dark);
        border: clamp(0.375em, 1.5vw, 0.75em) solid var(--dark);
    }

    body.dark-mode #sbs-r .cs-topper {
        color: var(--primaryLight);
    }

    body.dark-mode #sbs-r .cs-title,
    body.dark-mode #sbs-r .cs-text,
    body.dark-mode #sbs-r .cs-h3,
    body.dark-mode #sbs-r .cs-flex-p,
    body.dark-mode #sbs-r .cs-name {
        color: var(--bodyTextColorWhite);
    }

    body.dark-mode #sbs-r .cs-flex-group {
        background-color: var(--accent);
    }

    body.dark-mode #sbs-r .cs-job {
        color: var(--bodyTextColorWhite);
        opacity: 0.8;
    }

    body.dark-mode #sbs-r .cs-quote-icon {
        opacity: 0.2;
    }
}

`;

export const sampleHtml = `


<section id="sbs-r">
  <div class="cs-container">
    <!-- Left Image Section -->
    <div class="cs-left">
      <Picture
        src={sbsreverse}
        alt="sbs reverse img"
        width={400}
        height={560}
        formats={['avif', 'webp']}
        pictureAttributes={{ class: "cs-picture cs-picture1" }}
      />
    </div>
    <!-- Right Content Section-->
    <div class="cs-right">
      <span class="cs-topper">SEO Ranking</span>
      <h2 class="cs-title">Highlight a primary service keyword</h2>
      <p class="cs-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
        Curabitur blandit tempus porttitor. Donec id elit non mi porta gravida at eget metus.
      </p>
      <p class="cs-text">
        Vestibulum id ligula porta felis euismod semper. Non tenetur,
        iure nihil ipsam qui atque commodi id voluptatem nesciunt, quis animi
        fuga cum doloribus! Eaque laboriosam, unde consectetur iure asperiores
        ullam. Consequuntur debitis a voluptatibus vitae optio autem explicabo
        quia neque est quas, in placeat. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Doloribus modi laudantium voluptatibus
        rem libero error minus quia eligendi sapiente eos.
      </p>
    </div>
  </div>
</section>

`;

export const sampleJs = `

`;