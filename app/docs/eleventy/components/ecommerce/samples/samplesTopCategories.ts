

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
<---         Collection         -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #collection {
    padding: var(--sectionPadding);
    position: relative;
    z-index: 1;
  }
  #collection .cs-container {
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 48px - 64px */
    gap: clamp(3rem, 6vw, 4rem);
  }
  #collection .cs-content {
    /* set text align to left if content needs to be left aligned */
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* centers content horizontally, set to flex-start to left align */
    align-items: center;
  }
  #collection .cs-title {
    margin: 0;
  }
  #collection .cs-topper {
    color: var(--secondary);
  }
  #collection .cs-card-group {
    list-style: none;
    width: 100%;
    /* changes to 1280px on tablet */
    max-width: 34.375rem;
    margin: auto;
    padding: 0;
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-auto-flow: row;
  }
  #collection .cs-item {
    max-width: 100%;
    grid-column: span 12;
    position: relative;
  }
  #collection .cs-item:hover .cs-background img {
    opacity: .5;
    transform: scale(1.4);
  }
  #collection .cs-link {
    text-decoration: none;
    /* changes at tablet */
    height: 60vw;
    max-height: 21.75rem;
    padding: 2.5rem 1.5rem;
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #collection .cs-background {
    width: 100%;
    height: 100%;
    background-color: #000;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    /* set to -2 so the gradient overlay (z-index: -1) appears in front of the images, but behind the text */
    z-index: -2;
  }
  #collection .cs-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .6s, opacity .3s;
  }
  #collection .cs-category {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.2em;
    text-align: center;
    text-decoration: none;
    width: fit-content;
    /* 12px - 20px top & bottom, 16px - 24px sides*/
    padding: clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 1.5rem);
    color: var(--main-white, #ffffff);
    position: relative;
    transition: color .3s;
    /* blurred background - done as a pseudo element so backdrop-filter won't distort the text */
  }
  #collection .cs-category:hover {
    color: var(--headerColor);
  }
  #collection .cs-category:hover:before {
    background-color: #ffffff;
  }
  #collection .cs-category:before {
    content: "";
    width: 100%;
    height: 100%;
    backdrop-filter: blur(8px);
    --webkit-backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: background-color 0.3s;
  }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #collection .cs-card-group {
    max-width: 80rem;
    grid-template-columns: repeat(12, 1fr);
  }
  #collection .cs-item {
    /* 180px - 348px */
    height: clamp(11.75rem, 25vw, 21.75rem);
    grid-column: span 3;
  }
}
/* Dark Mode */
@media only screen and (min-width: 0rem) {
  body.dark-mode #collection {
    background-color: var(--dark);
  }
  body.dark-mode #collection .cs-title {
    color: var(--bodyTextColorWhite);
  }
} 
                                                                                                            
`;

export const sampleHtml = `
   
 <!-- ============================================ -->
<!--                  Collection                  -->
<!-- ============================================ -->

<section id="collection">
  <div class="cs-container">
      <div class="cs-content">
          <span class="cs-topper">Shop by Collection</span>
          <h2 class="cs-title">Featured Collections</h2>
      </div>
      <ul class="cs-card-group">
          <li class="cs-item">
              <a href="" class="cs-link">
                  <span class="cs-category">Watches</span>
                  <picture class="cs-background" aria-hidden="true">
                      <source media="(max-width: 600px)"
                              srcset="https://loremflickr.com/365/201/watch?lock=11">
                      <source media="(min-width: 601px)"
                              srcset="https://loremflickr.com/730/402/watch?lock=11">
                      <img loading="lazy" decoding="async"
                              src="https://loremflickr.com/365/201/watch?lock=11"
                              width="365" height="201" alt="wristwatch">
                  </picture>
              </a>
          </li>
          <li class="cs-item">
              <a href="" class="cs-link">
                  <span class="cs-category">Sunglasses</span>
                  <picture class="cs-background" aria-hidden="true">
                      <source media="(max-width: 600px)"
                              srcset="https://loremflickr.com/365/201/sunglasses?lock=22">
                      <source media="(min-width: 601px)"
                              srcset="https://loremflickr.com/730/402/sunglasses?lock=22">
                      <img loading="lazy" decoding="async"
                              src="https://loremflickr.com/365/201/sunglasses?lock=22" width="365"
                              height="201" alt="sunglasses">
                  </picture>
              </a>
          </li>
          <li class="cs-item">
              <a href="" class="cs-link">
                  <span class="cs-category">Jackets</span>
                  <picture class="cs-background" aria-hidden="true">
                      <source media="(max-width: 600px)"
                              srcset="https://loremflickr.com/365/201/jacket?lock=33">
                      <source media="(min-width: 601px)"
                              srcset="https://loremflickr.com/730/402/jacket?lock=33">
                      <img loading="lazy" decoding="async"
                              src="https://loremflickr.com/365/201/jacket?lock=33"
                              width="365" height="201" alt="jacket">
                  </picture>
              </a>
          </li>
          <li class="cs-item">
              <a href="" class="cs-link">
                  <span class="cs-category">Sneakers</span>
                  <picture class="cs-background" aria-hidden="true">
                      <source media="(max-width: 600px)"
                              srcset="https://loremflickr.com/365/201/sneakers?lock=44">
                      <source media="(min-width: 601px)"
                              srcset="https://loremflickr.com/730/402/sneakers?lock=44">
                      <img loading="lazy" decoding="async"
                              src="https://loremflickr.com/365/201/sneakers?lock=44"
                              width="365" height="201" alt="sneakers">
                  </picture>
              </a>
          </li>
      </ul>
  </div>
</section>
                                              

`;

export const sampleJs = `

                                
`;

