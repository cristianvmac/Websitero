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
<---        Why Choose          -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #why {
    padding: var(--sectionPadding);
    /* 48px - 64px */
    padding-bottom: clamp(2.5rem, 6vw, 4rem);
    background-color: #fbf9f5;
    position: relative;
    z-index: 1;
  }
  #why .cs-container {
    width: 100%;
    /* changes to 1280px at tablet */
    max-width: 44rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* 48px - 64px */
    gap: clamp(3rem, 7vw, 4rem);
  }
  #why .cs-content {
    /* set text align to center if content needs to be center aligned */
    text-align: left;
    width: 100%;
    max-width: 39.375rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  #why .cs-title {
    max-width: 20ch;
    margin: 0;
    margin-bottom: 2rem;
    /* 48px - 64px */
    padding-bottom: clamp(3rem, 7vw, 4rem);
    position: relative;
    z-index: 1;
  }
  #why .cs-title:before {
    content: "";
    width: 100vw;
    height: 1px;
    background: #d2d8df;
    opacity: 1;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  #why .cs-text {
    margin-bottom: 1rem;
  }
  #why .cs-text:last-of-type {
    margin-bottom: 2rem;
  }
  #why .cs-button-solid {
    font-size: 1rem;
    line-height: 3.5em;
    text-decoration: none;
    font-weight: 700;
    width: auto;
    margin: 0;
    color: #fff;
    padding: 0 3rem;
    border-radius: 6.25rem;
    overflow: hidden;
    background-color: var(--primary);
    display: inline-block;
    position: relative;
    z-index: 1;
    transition: color 0.3s;
  }
  #why .cs-button-solid:before {
    content: "";
    position: absolute;
    display: block;
    height: 100%;
    width: 0%;
    background: #1a1a1a;
    opacity: 1;
    top: 0;
    left: 0;
    z-index: -1;
    transition: width 0.3s;
  }
  #why .cs-button-solid:hover {
    color: var(--primary);
  }
  #why .cs-button-solid:hover:before {
    width: 100%;
  }
  #why .cs-wrapper {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  #why .cs-card-group {
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1.25rem;
  }
  #why .cs-item {
    width: 100%;
    text-align: left;
    list-style: none;
    margin: 0;
    /* 24px - 32px */
    padding: clamp(1.5rem, 3vw, 2rem);
    border-radius: 1rem;
    background-color: #fff;
    /* prevents padding and border from affecting height and width */
    box-sizing: border-box;
    grid-column: span 12;
    grid-row: span 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    gap: 2rem;
  }
  #why .cs-icon {
    height: 7.5rem;
    width: auto;
    display: block;
  }
  #why .cs-h3 {
    /* 20px - 25px */
    font-size: clamp(1.25rem, 2.5vw, 1.5625rem);
    line-height: 1.2em;
    font-weight: bold;
    text-align: inherit;
    margin: 0 0 0.75rem 0;
    color: var(--headerColor);
  }
  #why .cs-item-text {
    line-height: 1.5em;
    max-width: 28.125rem;
    margin: 0;
    padding: 0;
    color: var(--bodyTextColor);
  }
  #why .cs-picture {
    width: 100%;
    /* 310px - 356px */
    height: clamp(19.375rem, 30vw, 22.25rem);
    border-radius: 1rem;
    /* clips the corners of the img tag */
    overflow: hidden;
    display: block;
    position: relative;
  }
  #why .cs-picture img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #why .cs-item {
    flex-direction: row;
    align-items: center;
  }
}
/* Small Desktop - 1024px */
@media only screen and (min-width: 64rem) {
  #why .cs-container {
    max-width: 80rem;
    flex-direction: row;
    align-items: stretch;
  }
  #why .cs-content {
    flex: none;
  }
  #why .cs-card-group {
    width: 55%;
    max-width: 36.625rem;
    /* prevents flexbox from squishing it */
    flex: none;
  }
  #why .cs-picture {
    height: 100%;
    min-height: 22.25rem;
  }
}
                 
`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                  Why Choose Us               -->
<!-- ============================================ -->

<section id="why">
	<div class="cs-container">
		<div class="cs-wrapper">
			<!-- Astro <Picture /> generates the responsive avif/webp sources automatically -->
			<Picture src={whyImage} alt="team collaborating in modern workspace" width={586} height={690} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
			<div class="cs-content">
				<span class="cs-topper">Why Partner With Us</span>
				<h2 class="cs-title">Innovative Solutions Designed for Sustainable Growth</h2>
				<p class="cs-text">
					We help organizations transform ideas into impactful digital experiences. By combining strategy, creativity, and technology, we deliver scalable solutions that strengthen your brand, streamline operations, and accelerate long-term success.
				</p>
				<a href="" class="cs-button-solid">Let’s Build Together</a>
			</div>
		</div>
		<ul class="cs-card-group">
			<li class="cs-item">
				<Image class="cs-icon" src={strategyIcon} alt="icon" width={120} height={120} />
				<div class="cs-flex">
					<h3 class="cs-h3">Strategic Planning</h3>
					<p class="cs-item-text">
						We begin every project with in-depth research and analysis, ensuring each decision is aligned with your business objectives and market opportunities.
					</p>
				</div>
			</li>
			<li class="cs-item">
				<Image class="cs-icon" src={agileIcon} alt="icon" width={120} height={120} />
				<div class="cs-flex">
					<h3 class="cs-h3">Agile Execution</h3>
					<p class="cs-item-text">
						Our flexible workflow allows us to adapt quickly, maintain transparency, and deliver high-quality results efficiently at every stage of development.
					</p>
				</div>
			</li>
			<li class="cs-item">
				<Image class="cs-icon" src={performanceIcon} alt="icon" width={120} height={120} />
				<div class="cs-flex">
					<h3 class="cs-h3">Performance Optimization</h3>
					<p class="cs-item-text">
						We continuously monitor, test, and refine your digital assets to ensure peak performance, improved user engagement, and measurable ROI.
					</p>
				</div>
			</li>
			<li class="cs-item">
				<Image class="cs-icon" src={partnershipIcon} alt="icon" width={120} height={120} />
				<div class="cs-flex">
					<h3 class="cs-h3">Long-Term Partnership</h3>
					<p class="cs-item-text">
						We don’t just complete projects—we build lasting relationships, providing ongoing support and strategic guidance as your business evolves.
					</p>
				</div>
			</li>
		</ul>
	</div>
</section>                                                      


`;

export const sampleJs = `

`;