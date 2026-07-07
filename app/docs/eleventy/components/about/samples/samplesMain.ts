

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


/*-- -------------------------- -->
<---       Side By Side         -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0em) {
    #sbs {
        padding: var(--sectionPadding);
    }

    #sbs .cs-container {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 2.5rem;
    }

    #sbs .cs-left {
        font-size: min(2.31vw, 0.7em);
        width: 39.4375em;
        height: 39.75em;
        position: relative;
    }

    #sbs .cs-picture {
        border-radius: 1.5em;
        display: block;
        position: absolute;
        overflow: hidden;
    }

    #sbs .cs-picture img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    #sbs .cs-picture1 {
        width: 39.625em;
        height: 35.3125em;
        top: 0;
        left: 0;
      /*  margin-left: 1rem;*/
    }

    #sbs .cs-picture2 {
        width: 25.875em;
        height: 25em;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 40px;
        border: clamp(0.375em, 1.5vw, 0.75em) solid #fff;
        right: 0;
        bottom: 0;
    }

    #sbs .cs-right {
        max-width: 39.4375rem;
        height: 39.75em;
        margin: auto;
        padding-top: 1rem;
    }

    #sbs .cs-topper {
        text-align: left;
        margin-bottom: 0.25rem;
    }

    #sbs .cs-title {
        text-align: left;
        max-width: 50rem;
    }

    #sbs .cs-text {
        text-align: left;
        max-width: 46.875rem;
        margin-bottom: 1rem;
    }

    #sbs .cs-text:last-of-type {
        margin-bottom: 2rem;
    }

    #sbs .cs-flex-group {
        padding: clamp(1rem, 3vw, 2rem);
        background-color: #f7f7f7;
        border-radius: 1rem;
        position: relative;
    }

    #sbs .cs-flex-p {
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.5em;
        margin: 0 0 1rem;
        color: #353535;
    }

    #sbs .cs-name {
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.2em;
        text-transform: uppercase;
        margin: 0 0 0.25rem;
        color: var(--headerColor);
        display: block;
    }

    #sbs .cs-job {
        font-size: 0.875rem;
        line-height: 1.5em;
        color: #353535;
        display: block;
    }

    #sbs .cs-quote-icon {
        width: clamp(3.75rem, 10vw, 8.5rem);
        height: auto;
        position: absolute;
        right: clamp(1rem, 4vw, 2rem);
        bottom: 0;
    }

    #sbs .cs-button-solid {
        margin-top: 2rem;
    }
}

/* Desktop - 1024px */
@media only screen and (min-width: 64em) {
    #sbs .cs-container {
        flex-flow: row;
        justify-content: space-between;
        gap: 3.25rem;
    }

    #sbs .cs-left {
        font-size: min(1.2vw, 1em);
        flex: none;
    }

    #sbs .cs-right {
        margin: 0;
    }
}

/* Dark Mode */
@media only screen and (min-width: 0em) {
    body.dark-mode #sbs .cs-left:before,
    body.dark-mode #sbs .cs-left:after {
        background: var(--accent);
    }

    body.dark-mode #sbs .cs-picture2 {
        background-color: var(--dark);
        border: clamp(0.375em, 1.5vw, 0.75em) solid var(--dark);
    }

    body.dark-mode #sbs .cs-topper {
        color: var(--primaryLight);
    }

    body.dark-mode #sbs .cs-title,
    body.dark-mode #sbs .cs-text,
    body.dark-mode #sbs .cs-h3,
    body.dark-mode #sbs .cs-flex-p,
    body.dark-mode #sbs .cs-name {
        color: var(--bodyTextColorWhite);
    }

    body.dark-mode #sbs .cs-flex-group {
        background-color: var(--accent);
    }

    body.dark-mode #sbs .cs-job {
        color: var(--bodyTextColorWhite);
        opacity: 0.8;
    }

    body.dark-mode #sbs .cs-quote-icon {
        opacity: 0.2;
    }
}                   
                                           
                                
`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                  Side By Side                -->
<!-- ============================================ -->

<section id="sbs">
	<div class="cs-container">
		<!-- Left Image Section -->
		<div class="cs-left">
		    <picture class="cs-picture cs-picture1">
                <source media="(max-width: 600px)" srcset="/assets/images/services/sbs.webp">
                <source media="(min-width: 601px)" srcset="/assets/images/services/sbs.webp">
                <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/services/sbs.webp" alt="commercial fit-out" width="275" height="132">
            </picture>
		</div>
		<!-- Right Content Section-->
		<div class="cs-right">
			<span class="cs-topper">About Us</span>
			<h2 class="cs-title">About Company Title</h2>
			<p class="cs-text">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<p class="cs-text">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.			
			</p>
			<div class="cs-flex-group">
				<p class="cs-flex-p">Successus clientium nostrorum successus noster est. Dediti sumus eventibus qui per se loquuntur.</p>
				<span class="cs-name">John Doe</span>
				<span class="cs-job">CEO & Founder</span>
			</div>
			<a href="/about/" class="cs-button-solid">More About Us</a>
		</div>
	</div>
</section>

`;

export const sampleJs = `

`;
