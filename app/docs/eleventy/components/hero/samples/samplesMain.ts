

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
    --bodyFontSize: 1rem;
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
        font-size: 1rem;
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

/*-- -------------------------- */
/*           Hero              */
/*---------------------------- */

/* Mobile - 360px */
@media only screen and (min-width: 0em) {
  #hero {
    font-family: "Roboto", "Arial", sans-serif;
    text-align: center;
    padding: 0 1rem;
    padding-bottom: 1.25rem;
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
    max-width: 80rem;
    margin: auto;
    position: relative;
    padding: clamp(6em, 22vw, 9em) 0 clamp(11em, 30vw, 14em) 0; /* add this */
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
/*
  #hero .cs-button-solid {
    line-height: clamp(2.875em, 5.5vw, 3.5em);
    height: initial;
    margin-bottom: 1rem;
  }
*/
  #hero .cs-button-solid {
        font-size: 1rem;
        /* 46px - 56px */
        line-height: clamp(2.875rem, 5.5vw, 3.5rem);
        width: 11.25rem;
        text-decoration: none;
        font-weight: 700;
        margin: 0 1.25rem 1rem 0;
        color: #fff;
        padding: 0;
        background-color: var(--primary);
        display: inline-block;
        position: relative;
        z-index: 1;
    }
    #hero .cs-button-solid:before {
        content: "";
        position: absolute;
        display: block;
        height: 100%;
        width: 0%;
        background: #000;
        opacity: 1;
        top: 0;
        left: 0;
        z-index: -1;
        transition: width 0.3s;
  }
  #hero .cs-button-solid:hover:before {
        width: 100%;
  }
  #hero .cs-button-transparent {
        font-size: 1rem;
        /* 46px - 56px */
        line-height: clamp(2.875rem, 5.5vw, 3.5rem);
        width: 11.25rem;
        /* 46px - 56px */
        height: clamp(2.875rem, 5.5vw, 3.5rem);
        text-decoration: none;
        font-weight: 700;
        margin: 0;
        color: #fff;
        padding: 0;
        background-color: transparent;
        border: 1px solid var(--bodyTextColorWhite);
        box-sizing: border-box;
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
    padding: 0 clamp(1.5em, 4vw, 1.5em);
  }

  #hero .cs-container {
    padding: clamp(7em, 27.95vw, 17.5em) 0 clamp(4em, 17.0vw, 12.0em) 0;
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
  
  #hero .cs-container {
    padding-bottom: 14em;   /* down from 23.5em */
  }

  #hero .cs-flex-group {
    margin-bottom: 6em;     /* down from 13.75em */
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

<!-- ============================================ -->
<!--                    Hero                      -->
<!-- ============================================ -->

<section id="hero">
    <div class="cs-container">
		<div class="cs-flex-group">
			<span class="cs-topper">Websitero presents</span>
			<h1 class="cs-title">Eleventy Starter <br /> Template</h1>
			<p class="cs-text">This starter kit gives you a ready-made website setup built with Eleventy, so you can reuse sections, manage your content in one place, and grow your site easily. It also includes a built-in blog with Decap CMS.</p>
			<a href="/about/" class="cs-button-solid">Explore More</a>
			<a href="/contact/" class="cs-button-transparent">
          <img class="cs-img" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Hero/play.svg" alt="play icon" width="17" height="17" aria-hidden="true">
				Get in Touch
			</a>
		</div>
	</div>

    <!-- Background Image -->
    <picture class="cs-picture">
        <source media="(max-width: 600px)" srcset="/assets/images/hero/hero.webp">
        <source media="(min-width: 601px)" srcset="/assets/images/hero/hero.webp">
        <img decoding="async" src="/assets/images/hero/hero.webp" alt="hero image" width="2250" height="1500" aria-hidden="true">
    </picture>
</section>
                                
`;

export const sampleJs = `

`;
