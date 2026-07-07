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
<---          Events            -->
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
  #events {
    padding: var(--sectionPadding);
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  #events .cs-container {
    width: 100%;
    /* changes to 1280px at desktop */
    max-width: 44rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 48px - 64px */
    gap: clamp(3rem, 6vw, 4rem);
  }
  #events .cs-content {
    /* set text align to left if content needs to be left aligned */
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* centers content horizontally, set to flex-start to left align */
    align-items: center;
  }
  #events .cs-title {
    max-width: 24ch;
  }
  #events .cs-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* 16px - 20px */
    gap: clamp(1rem, 3vw, 1.25rem);
  }
  #events .cs-picture {
    width: 100%;
    /* 200px - 300px */
    min-height: clamp(12.5rem, 40vw, 18.75rem);
    border-radius: 1.5rem;
    /* clips the corners of the img tags */
    overflow: hidden;
    display: block;
    position: relative;
    z-index: 1;
  }
  #events .cs-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  #events .cs-card-group {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    /* 16px - 20px */
    gap: clamp(1rem, 3vw, 1.25rem);
  }
  #events .cs-item {
    list-style: none;
    border: 1px solid #E8E8E8;
    background-color: #fff;
    overflow: hidden;
    /* 24px - 40px */
    border-radius: clamp(1.5rem, 4vw, 2.5rem);
    position: relative;
    z-index: 1;
  }
  #events .cs-item:before {
    /* background color overlay for dark mode*/
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    z-index: -1;
  }
  #events .cs-item:hover .cs-date {
    border-color: var(--secondary);
  }
  #events .cs-item:hover .cs-date:before {
    background-color: var(--secondary);
  }
  #events .cs-link {
    text-decoration: none;
    width: 100%;
    /* 16px - 24px */
    padding: clamp(1rem, 3vw, 1.5rem);
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* 16px - 24px */
    gap: clamp(1rem, 3vw, 1.5rem);
  }
  #events .cs-date {
    font-size: 1rem;
    line-height: 1.5em;
    /* 56px - 80px */
    width: clamp(3.5rem, 7vw, 5rem);
    height: clamp(3.5rem, 7vw, 5rem);
    margin: 0;
    color: var(--headerColor);
    border: 1px solid #bababa;
    /* clips the pseudo to remove the corners */
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 1;
    transition: border-color 0.3s;
  }
  #events .cs-date:before {
    /* background color */
    content: '';
    width: 100%;
    height: 100%;
    background-color: #bababa;
    opacity: .1;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: -1;
    transition: background-color 0.3s;
  }
  #events .cs-date strong {
    line-height: 1.2em;
    font-weight: 700;
    color: #000;
  }
  #events .cs-h3 {
    /* 20px - 25px */
    font-size: clamp(1.25rem, 4vw, 1.5625rem);
    line-height: 1.2em;
    font-weight: 700;
    /* 4px - 16px */
    margin: 0 0 clamp(0.25rem, 1vw, 0.5rem);
    color: var(--headerColor);
  }
  #events .cs-time {
    font-size: 1rem;
    line-height: 1.5em;
    margin: 0;
    color: var(--bodyTextColor);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;
  }

}
/* Small Desktop - 1024px */
@media only screen and (min-width: 64rem) {
  #events .cs-container {
    max-width: 80rem;
  }
  #events .cs-wrapper {
    flex-direction: row;
  }
  #events .cs-picture {
    height: auto;
    width: 60%;
  }
  #events .cs-card-group {
    width: 50%;
    max-width: 33.875rem;
    /* prevents flexbox from squishing it */
    flex: none;
  }
}

`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                   Events                     -->
<!-- ============================================ -->

<section id="events">
    <div class="cs-container">
        <div class="cs-content">
            <span class="cs-topper">Upcoming Events</span>
            <h2 class="cs-title">Tech & Innovation Event Schedule 2025</h2>
            <p class="cs-text">
                Join industry leaders, innovative startups, and forward-thinking developers for immersive sessions, networking opportunities, and live product launches shaping the future of technology.
            </p>
        </div>
        <div class="cs-wrapper">
            <!-- Astro <Picture /> generates the responsive avif/webp sources automatically -->
            <Picture src={eventsImage} alt="tech conference audience" width={522} height={609} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
            <ul class="cs-card-group">
                <li class="cs-item">
                    <a href="" class="cs-link">
                        <span class="cs-date">
                            <strong>14</strong>
                            Mar
                        </span>
                        <div class="cs-info">
                            <h3 class="cs-h3">AI & Machine Learning Summit</h3>
                            <span class="cs-time">
                                <Image class="cs-icon" src={clockIcon} alt="icon" width={24} height={24} />
                                09:00am - 04:30pm
                            </span>
                        </div>
                    </a>
                </li>
                <li class="cs-item">
                    <a href="" class="cs-link">
                        <span class="cs-date">
                            <strong>18</strong>
                            Mar
                        </span>
                        <div class="cs-info">
                            <h3 class="cs-h3">Startup Pitch Competition</h3>
                            <span class="cs-time">
                                <Image class="cs-icon" src={clockIcon} alt="icon" width={24} height={24} />
                                01:00pm - 06:00pm
                            </span>
                        </div>
                    </a>
                </li>
                <li class="cs-item">
                    <a href="" class="cs-link">
                        <span class="cs-date">
                            <strong>22</strong>
                            Mar
                        </span>
                        <div class="cs-info">
                            <h3 class="cs-h3">Cybersecurity & Data Privacy Forum</h3>
                            <span class="cs-time">
                                <Image class="cs-icon" src={clockIcon} alt="icon" width={24} height={24} />
                                10:00am - 03:00pm
                            </span>
                        </div>
                    </a>
                </li>
                <li class="cs-item">
                    <a href="" class="cs-link">
                        <span class="cs-date">
                            <strong>28</strong>
                            Mar
                        </span>
                        <div class="cs-info">
                            <h3 class="cs-h3">Web3 & Blockchain Workshop</h3>
                            <span class="cs-time">
                                <Image class="cs-icon" src={clockIcon} alt="icon" width={24} height={24} />
                                11:00am - 05:00pm
                            </span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div> 
</section>
              

`;

export const sampleJs = `

`;