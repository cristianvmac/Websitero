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
<---          Services          -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #services {
    padding: var(--sectionPadding);
    background-color: #f7f7f7;
    position: relative;
    z-index: 1;
  }
  #services .cs-container {
    width: 100%;
    /* changes to 1280px at tablet */
    max-width: 34.375rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 48px - 64px */
    gap: clamp(3rem, 6vw, 4rem);
  }
  #services .cs-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* centers content horizontally, set to flex-start to left align */
    align-items: center;
    /* set text align to left if content needs to be left aligned */
    text-align: center;
  }
  #services .cs-flex-group {
    /* prevents flexbox from squishing it */
    flex: none;
  }
  #services .cs-card-group {
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    row-gap: 1rem;
  }
  #services .cs-item {
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    /* 40px - 60px top & bottom,  20px - 48px left & right, */
    padding: clamp(2.5rem, 4.1vw, 3.75rem) clamp(1.25rem, 3.4vw, 3rem);
    background-color: #fff;
    grid-column: span 12;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  #services .cs-item:hover {
    transform: translateY(-1rem);
    box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  }
  #services .cs-link {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* set text align to center if content needs to be centrally aligned */
    text-align: left;
  }
  #services .cs-step {
    font-size: var(--topperFontSize);
    line-height: 1.2em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    /* 48px - 100px */
    margin-bottom: clamp(3rem, 7.8vw, 6.25rem);
    color: var(--primary);
    display: block;
    text-align: inherit;
  }
  #services .cs-h3 {
    font-size: 1.25rem;
    line-height: 1.2em;
    font-weight: 900;
    margin: 0;
    margin-bottom: 0.75rem;
    color: var(--headerColor);
    transition: color 0.3s;
    text-align: inherit;
  }
  #services .cs-item-text {
    /* 14px - 16px */
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    line-height: 1.5em;
    margin: 0;
    color: var(--bodyTextColor);
    transition: color 0.3s;
    text-align: inherit;
  }
  #services .cs-background {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -2;
  }
  #services .cs-background img {
    width: 100%;
    height: 100%;
    opacity: 0.06;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
}

/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #services .cs-container {
    max-width: 80rem;
  }
  #services .cs-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    /* 48px - 80px */
    gap: clamp(3rem, 6vw, 5rem);
    text-align: left;
  }
  #services .cs-title {
    margin: 0;
  }
  #services .cs-flex-group {
    width: 50%;
  }
  #services .cs-card-group {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    column-gap: 1rem;
  }
  #services .cs-item {
    grid-column: span 4;
  }
}
                                 
`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                  Services                    -->
<!-- ============================================ -->

  <section id="services">
    <div class="cs-container">
        <div class="cs-content">
            <div class="cs-flex-group">
                <span class="cs-topper">Our Process</span>
                <h2 class="cs-title">A Proven Approach to Delivering Results</h2>
            </div>
            <p class="cs-text">
                We combine strategy, creativity, and data-driven insights to build solutions that move your business forward. Our streamlined process ensures clarity, efficiency, and measurable outcomes at every stage of the journey.
            </p>
        </div>
        <ul class="cs-card-group">
            <li class="cs-item">
                <a href="" class="cs-link">
                    <span class="cs-step">Step 1</span>
                    <h3 class="cs-h3">Discovery & Strategy</h3>
                    <p class="cs-item-text">
                        We begin by understanding your goals, audience, and competitive landscape. Through research and consultation, we define a clear roadmap tailored to your objectives.
                    </p>
                </a>
            </li>
            <li class="cs-item">
                <a href="" class="cs-link">
                    <span class="cs-step">Step 2</span>
                    <h3 class="cs-h3">Design & Development</h3>
                    <p class="cs-item-text">
                        Our team transforms strategy into action by crafting engaging designs and building high-performance solutions that reflect your brand and drive conversions.
                    </p>
                </a>
            </li>
            <li class="cs-item">
                <a href="" class="cs-link">
                    <span class="cs-step">Step 3</span>
                    <h3 class="cs-h3">Launch & Optimization</h3>
                    <p class="cs-item-text">
                        After launch, we continuously monitor performance, analyze data, and refine strategies to ensure sustainable growth and long-term success.
                    </p>
                </a>
            </li>
        </ul>
    </div>
    <picture class="cs-background">
        <!--Mobile Image-->
        <source media="(max-width: 600px)"
                srcset="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/building-white.jpg">
        <!--Tablet and above Image-->
        <source media="(min-width: 601px)"
                srcset="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/building-white.jpg">
        <img src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/building-white.jpg" alt="building"
                width="1920" height="700" decoding="async" loading="lazy">
    </picture>
</section>  
                                
`;

export const sampleJs = `

`;