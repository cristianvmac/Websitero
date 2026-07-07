export const sampleRoot = `
  
/*-- -------------------------- -->
<---        Core Styles         -->
<--- -------------------------- -*/

:root {
    /* Add these styles to your global stylesheet, which is used across all site pages. You only need to do this once. All elements in the library derive their variables and base styles from this central sheet, simplifying site-wide edits. For instance, if you want to modify how your h2's appear across the site, you just update it once in the global styles, and the changes apply everywhere. */
    --primary: #ff6a3e;
    --primaryLight: #ffba43;
    --secondary: #ffba43;
    --secondaryLight: #ffba43;
    --headerColor: #1a1a1a;
    --bodyTextColor: #4e4b66;
    --bodyTextColorWhite: #fafbfc;
    /* 13px - 16px */
    --topperFontSize: clamp(0.8125rem, 1.6vw, 1rem);
    /* 31px - 49px */
    --headerFontSize: clamp(1.9375rem, 3.9vw, 3.0625rem);
    --bodyFontSize: 1.2rem;
    /* 60px - 100px top and bottom */
    --sectionPadding: clamp(3.75rem, 7.82vw, 6.25rem) 1rem;
}

body {
    margin: 0;
    padding: 0;
}

*, *:before, *:after {
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
}
.cs-topper {
    font-size: var(--topperFontSize);
    line-height: 1.2em;
    text-transform: uppercase;
    text-align: inherit;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.25rem;
    display: block;
}

.cs-title {
    font-size: var(--headerFontSize);
    font-weight: 900;
    line-height: 1.2em;
    text-align: inherit;
    max-width: 43.75rem;
    margin: 0 0 1rem 0;
    color: var(--headerColor);
    position: relative;
   
}

.cs-text {
    font-size: var(--bodyFontSize);
    line-height: 1.5em;
    text-align: inherit;
    width: 100%;
    max-width: 40.625rem;
    margin: 0;
    color: var(--bodyTextColor);
}
                            

/*-- -------------------------- -->
<---    Components + Utilities  -->
<--- -------------------------- -*/

@media only screen and (min-width: 0px) {
    .skip {
        z-index: -1111111;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }

    .cs-button-solid {
        z-index: 1;
        position: relative;
        display: inline-block;
        background-color: var(--primary);
        width: auto;
        padding: 1rem 2rem;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1rem;
        line-height: 1em;
        font-weight: bold;
        border-radius: 0.25rem;
        overflow: hidden;
        color: var(--bodyTextColorWhite);
        transition: color 0.3s;
        transition-delay: 0.1s;
        text-align: center;
    }

    .cs-button-solid:hover {
        color: #fff;
    }

    .cs-button-solid:hover:before {
        width: 100%;
    }

    .cs-button-solid:before {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        opacity: 1;
        display: block;
        background-color: #000;
        height: 100%;
        width: 0;
        transition: width 0.3s;
    }

    .cs-button-outline {
        z-index: 1;
        position: relative;
        display: inline-block;
        width: auto;
        padding: 1rem 2rem;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1rem;
        line-height: 1em;
        font-weight: bold;
        border: 2px solid #000;
        color: #000;
        transition: color 0.3s;
        transition-delay: 0.1s;
        text-align: center;
    }

    .cs-button-outline:hover {
        color: #fff;
    }

    .cs-button-outline:hover:before {
        width: 100%;
    }

    .cs-button-outline:before {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        opacity: 1;
        display: block;
        background-color: #000;
        height: 100%;
        width: 0;
        transition: width 0.3s;
    }

    .cs-color {
        color: var(--primary);
    }

    .cs-bold {
        font-weight: 700;
    }

    .cs-hide-on-mobile {
        display: none !important;
    }

    .cs-dark,
    .dark {
        display: none !important;
    }

    body.dark-mode .cs-light,
    body.dark-mode .light {
        display: none !important;
    }

    body.dark-mode .cs-dark,
    body.dark-mode .dark {
        display: block !important;
    }

    body.dark-mode .cs-button-outline {
        border-color: #fff;
        color: #fff;
    }
}

/* Desktop Utilities */
@media only screen and (min-width: 64rem) {
    .cs-hide-on-mobile {
        display: block !important;
    }

    .cs-hide-on-desktop {
        display: none !important;
    }
}

/*-- -------------------------- -->
<---    Base Element Styles     -->
<--- -------------------------- -*/

@media only screen and (min-width: 0px) {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: var(--headerFont);
        line-height: 1.2em;
        color: var(--headerColor);
    }

    p,
    li,
    a {
       font-size: var(--bodyFontSize);
        line-height: 1.5em;
    }

    p,
    li {
        color: var(--bodyTextColor);
    }

    p a,
    li a {
        color: var(--primary);
    }

    a:hover,
    button:hover {
        cursor: pointer;
    }

    body.dark-mode {
        background-color: var(--dark);
    }

    body.dark-mode p,
    body.dark-mode li,
    body.dark-mode h1,
    body.dark-mode h2,
    body.dark-mode h3,
    body.dark-mode h4,
    body.dark-mode h5,
    body.dark-mode h6 {
        color: #fff;
    }
}

/*-- -------------------------- -->
<---          Fonts             -->
<--- -------------------------- -*/

@media only screen and (min-width: 0px) {
    @font-face {
        font-style: normal;
        font-family: "Roboto";
        font-weight: 400;
        font-display: swap;
        src: local(""),
            url("/assets/fonts/roboto-v29-latin-regular.woff2") format("woff2"),
            url("/assets/fonts/roboto-v29-latin-regular.woff") format("woff");
    }

    @font-face {
        font-style: normal;
        font-family: "Roboto";
        font-weight: 700;
        font-display: swap;
        src: local(""),
            url("/assets/fonts/roboto-v29-latin-700.woff2") format("woff2"),
            url("/assets/fonts/roboto-v29-latin-700.woff") format("woff");
    }

    @font-face {
        font-style: normal;
        font-family: "Roboto";
        font-weight: 900;
        font-display: swap;
        src: local(""),
            url("/assets/fonts/roboto-v29-latin-900.woff2") format("woff2"),
            url("/assets/fonts/roboto-v29-latin-900.woff") format("woff");
    }
}


/* Add this as it's own dark.css file and linked on all pages */
/*-- -------------------------- -->
<---      Core Dark Styles      -->
<--- -------------------------- -*/
/* Mobile */
@media only screen and (min-width: 0rem) {
  :root {
    --dark: #082032;
    --medium: #2c394b;
    --accent: #334756;
    --bodyTextColorWhite: #fafbfc;
  }
  body.dark-mode {
    background-color: var(--dark);
  }
  body.dark-mode p,
  body.dark-mode li,
  body.dark-mode h1,
  body.dark-mode h2,
  body.dark-mode h3,
  body.dark-mode h4,
  body.dark-mode h5,
  body.dark-mode h6,
  body.dark-mode .cs-title,
  body.dark-mode .cs-text,
  body.dark-mode .cs-li {
    color: var(--bodyTextColorWhite);
  }
  body.dark-mode .light {
    display: none;
  }
  body.dark-mode .dark {
    display: block !important;
  }
  .dark {
    /* class used to hide elements that only need to be seen when dark mode is enabled */
    display: none;
  }
}
/*-- -------------------------- -->
<---      Dark Mode Toggle      -->
<--- -------------------------- -*/
/* Mobile */
@media only screen and (min-width: 0rem) {
  body.dark-mode #dark-mode-toggle .cs-sun {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  body.dark-mode #dark-mode-toggle .cs-moon {
    transform: translate(-50%, -150%);
    opacity: 0;
  }
  #dark-mode-toggle {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3.75rem;
    width: 3rem;
    height: 3rem;
    background: transparent;
    border: none;
    overflow: hidden;
    padding: 0;
  }
  #dark-mode-toggle img,
  #dark-mode-toggle svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.5625rem;
    height: 1.5625rem;
    pointer-events: none;
  }
  #dark-mode-toggle .cs-moon {
    z-index: 2;
    transition: transform 0.3s,
                opacity 0.3s,
                fill 0.3s;
    fill: #000;
  }
  #dark-mode-toggle .cs-sun {
    z-index: 1;
    transform: translate(-50%, 100%);
    opacity: 0;
    transition: transform 0.3s,
                opacity 0.3s;
  }
}
/* Desktop */
@media only screen and (min-width: 64rem) {
  #dark-mode-toggle {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    margin-left: 1.875rem;
    margin-bottom: 0rem;
  }
  #dark-mode-toggle .moon {
    /* change to whatever you need */
    /* fill: #fff; */
  }
}

`;

export const sampleCss = `
 
/*-- -------------------------- -->
<---        Content Page        -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  @keyframes floatAnimation {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2rem);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes floatAnimation2 {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3rem);
    }
    100% {
      transform: translateY(0);
    }
  }
  #content-page {
    padding: var(--sectionPadding);
    background-color: #fff;
    /* clips the wave background from causing overflow issues when it goes off screen */
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  #content-page .cs-container {
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 40px - 64px */
    gap: clamp(2.5rem, 4vw, 4rem);
    position: relative;
  }
  #content-page .cs-content {
    /* set text align to left if content needs to be left aligned */
    text-align: left;
    width: 100%;
    max-width: 46.125rem;
    display: flex;
    flex-direction: column;
    /* centers content horizontally, set to flex-start to left align */
    align-items: flex-start;
  }
  #content-page .cs-title {
    /* larger on mobile (min ~39px), still caps at the same desktop max */
    font-size: clamp(2.4375rem, 7vw, 3.0625rem);
    font-weight: 900;
    line-height: 1.2em;
    text-align: inherit;
    width: 100%;
    max-width: 100%;
    margin: 0 0 1rem 0;
    color: var(--headerColor);
    position: relative;
  }
  #content-page h2,
  #content-page h3,
  #content-page h4,
  #content-page h5,
  #content-page h6 {
    font-weight: 700;
    text-align: inherit;
    margin: 0 0 1rem 0;
    color: var(--headerColor);
  }
  #content-page h2 {
    font-size: 2rem;
    margin-top: 2rem;
  }
  #content-page h3 {
    font-size: 1.5rem;
    color: var(--primary);
  }
  #content-page h4,
  #content-page h5,
  #content-page h6 {
    font-size: 1.25rem;
  }
  #content-page .cs-button-solid {
    margin-bottom: 2rem;
  }
  #content-page .cs-no-margin {
    margin: 0;
  }
  #content-page .cs-color {
    color: var(--primary);
  }
  #content-page p {
    font-size: var(--bodyFontSize);
    line-height: 1.5em;
    text-align: inherit;
    width: 100%;
    margin: 0 0 1rem 0;
    color: var(--bodyTextColor);
  }
  #content-page p:last-of-type {
    margin-bottom: 2rem;
  }
  #content-page p a {
    font-size: inherit;
    line-height: inherit;
    text-decoration: underline;
    color: var(--primary);
    filter: brightness(120%);
  }
  #content-page ol,
  #content-page ul {
    padding-left: 1.5rem;
    margin: 0 0 2rem 0;
    color: var(--bodyTextColor);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  #content-page-15 ul li {
    list-style: none;
    color: inherit;
    position: relative;
  }
  #content-page ul li:before {
    /* custom list bullet */
    content: '';
    width: 3px;
    height: 3px;
    background: currentColor;
    opacity: 1;
    border-radius: 50%;
    position: absolute;
    display: block;
    top: 0.625rem;
    left: -0.75rem;
  }
  #content-page img {
    width: 100%;
    height: auto;
    display: block;
  }
  #content-page .cs-image-group {
    width: 100%;
    max-width: 32.625em;
    height: auto;
    aspect-ratio: 522 / 540;
    /* shows the image on mobile and sends it below the content */
    display: block;
    order: 2;
    position: relative;
    z-index: 1;
  }
  #content-page .cs-background {
    width: 100%;
    height: 100%;
    border-radius: 2.5em;
    /* clips the corners of the children around the border radius */
    overflow: hidden;
    /* makes it cover the parent dimensions */
    object-fit: cover;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  #content-page .cs-background img {
    width: 100%;
    height: 100%;
    /* makes it cover the parent like a backgorund image */
    object-fit: cover;
    display: block;
  }
  #content-page .cs-flower {
    width: 9.5625em;
    height: auto;
    position: absolute;
    right: -2em;
    top: -2.25em;
    z-index: 10;
  }
  #content-page .cs-floater {
    width: 44.375em;
    height: auto;
    position: absolute;
    left: 9.375em;
    top: 25em;
    z-index: -1;
    animation-name: floatAnimation2;
    animation-duration: 14s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #content-page .cs-container {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
  #content-page .cs-content {
    width: 60%;
    max-width: 43.375rem;
    /* prevents flexbox from squishing it */
    flex: none;
  }
  #content-page .cs-image-group {
    font-size: min(1.3vw, 1em);
    width: 32.625em;
    height: 33.75em;
    max-width: none;
    aspect-ratio: auto;
    display: block;
    /* sends it to the right in the 2nd position */
    order: 2;
  }
}
/* Desktop - 1200px */
@media only screen and (min-width: 75rem) {
  #content-page .cs-content {
    width: 53%;
  }
}
                          
`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                 Content Page                 -->
<!-- ============================================ -->

<section id="content-page">
    <div class="cs-container">
        <div class="cs-image-group">
            <!-- Astro <Picture /> generates the responsive avif/webp sources automatically -->
            <Picture src={classroomImage} alt="teacher reading to children in classroom" width={522} height={540} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            <!--Floating Blob-->
        </div>
        <div class="cs-content">
            <h1 class="cs-title">Inspiring Young Minds Through <span class="cs-color">Creative Learning</span></h1>
            <h2>A Safe & Nurturing Environment</h2>
            <h3>Building Confidence Every Day</h3>
            <h4>Where Curiosity Comes First</h4>
            <p>
                Our early learning program is designed to encourage exploration, creativity, and social growth in a supportive setting. We believe children learn best through hands-on experiences that spark imagination and build confidence. Through guided play, interactive storytelling, and collaborative activities, we help each child develop essential skills for lifelong success. Discover more about our <a href="">enrollment process</a> and how we create meaningful learning experiences every day.
            </p>
            <p>
                With dedicated educators and thoughtfully designed classrooms, we focus on fostering independence, empathy, and communication skills. Our approach blends structured learning with play-based discovery to ensure children thrive academically and socially in a joyful environment.
            </p>
            <h3>How We Support Growth</h3>
            <ol>
                <li>Encourage creativity through art, music, and imaginative play.</li>
                <li>Promote early literacy and foundational math skills.</li>
                <li>Develop social skills through teamwork and guided interaction.</li>
            </ol>
            <h4>What Families Appreciate</h4>
            <ul>
                <li>Qualified and caring teaching staff.</li>
                <li>Safe, clean, and engaging classrooms.</li>
                <li>Consistent communication and progress updates.</li>
            </ul>
        </div>
    </div>
    <div class="cs-bubbles" aria-hidden="true"></div>
</section>               
      
`;

export const sampleJs = `

`;