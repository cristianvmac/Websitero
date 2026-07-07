

export const sampleRoot = `

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
<---        Collection          -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #collection {
    padding: var(--sectionPadding);
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
    position: relative;
    z-index: 1;
  }
  #collection .cs-content {
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  #collection .cs-title {
    margin: 0;
  }
  #collection .cs-button-group {
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* 16px - 32px */
    gap: clamp(1rem, 4vw, 2rem);
  }
  #collection .cs-button {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.2em;
    text-transform: uppercase;
    padding: 0;
    color: var(--bodyTextColor);
    background-color: transparent;
    border: none;
    position: relative;
    transition: color 0.3s;
  }
  #collection .cs-button:before {
    content: "";
    width: 0;
    height: 1px;
    background: var(--primary);
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: width 0.3s;
  }
  #collection .cs-button:hover {
    color: var(--primary);
    cursor: pointer;
  }
  #collection .cs-button:hover:before {
    width: 100%;
  }
  #collection .cs-button.cs-active {
    color: var(--primary);
  }
  #collection .cs-button.cs-active:before {
    width: 100%;
  }
  #collection .cs-listing-wrapper {
    width: 100%;
    position: relative;
    z-index: 1;
  }
  #collection .cs-listing {
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    justify-items: center;
    grid-auto-flow: row;
    /* 16px - 20px */
    gap: clamp(1rem, 1.5vw, 1.25rem);
    position: relative;
    transform-style: preserve-3d;
    perspective: 700px;
    transition: transform 0.7s, opacity 0.3s, visibility 0.5s, top 0.3s, left 0.3s;
    /* makes the transform scaling origin the top left corner, dictates the direction by which the scale transforms animate towards */
    transform-origin: left top;
  }
  #collection .cs-listing.cs-hidden {
    /* hidden galleries have a 0 opacity, and we animate the opacity to 1 when they become active */
    opacity: 0;
    /* by using visibility:hidden instead of display:none, we can see the animations from the opacity and transforms, display:none won't render animations. */
    visibility: hidden;
    position: absolute;
    /* this top and left value help control the animation, by setting it to position absolute and left 0, the gallery won't fly off screen to the left, it will stop its position to be at the left edge of the .cs-container (left: 0). Same for the top:0 value, the gallery won't go past that position when it animates */
    top: 0;
    left: 0;
    /* prevents the hidden galleries from overflowing the section, and makes a nice animations to transition to and from */
    transform: scaleY(0) scaleX(0);
    /* prevents the mouse from interacting with it */
    pointer-events: none;
  }
  #collection .cs-listing.cs-hidden .cs-image {
    opacity: 0;
    /* when gallery is hidden, add these styles to the cs-image to animate from when cs-hidden is removed from the .cs-gallery */
    transform: translateY(2.1875rem) rotateX(90deg);
  }
  #collection .cs-listing.cs-hidden .cs-item {
    transform: rotateY(180deg);
    opacity: 0;
  }
  #collection .cs-item {
    width: 100%;
    max-width: 23.4375rem;
    /* overwrites the default 'min-width: auto' value, keeping all grid items the same width no matter what*/
    min-width: 0;
    opacity: 1;
    padding: 1rem;
    border: 1px solid #e8e8e8;
    transform: rotateY(0);
    transition: transform 0.7s, opacity 0.3s;
  }
  #collection .cs-item:nth-of-type(1) {
    transition-delay: 0.1s;
  }
  #collection .cs-item:nth-of-type(2) {
    transition-delay: 0.2s;
  }
  #collection .cs-item:nth-of-type(3) {
    transition-delay: 0.3s;
  }
  #collection .cs-item:nth-of-type(4) {
    transition-delay: 0.4s;
  }
  #collection .cs-item:nth-of-type(5) {
    transition-delay: 0.5s;
  }
  #collection .cs-item:nth-of-type(6) {
    transition-delay: 0.6s;
  }
  #collection .cs-item:nth-of-type(7) {
    transition-delay: 0.7s;
  }
  #collection .cs-item:nth-of-type(8) {
    transition-delay: 0.8s;
  }
  #collection .cs-item:nth-of-type(9) {
    transition-delay: 0.1s;
  }
  #collection .cs-item:nth-of-type(10) {
    transition-delay: 0.1s;
  }
  #collection .cs-item:nth-of-type(11) {
    transition-delay: 0.1s;
  }
  #collection .cs-item:nth-of-type(12) {
    transition-delay: 0.1s;
  }
  #collection .cs-link {
    text-decoration: none;
  }
  #collection .cs-link:hover .cs-picture img {
    transform: scale(1.1);
  }
  #collection .cs-picture-group {
    width: auto;
    height: 18.75rem;
    margin-bottom: 1.25rem;
    position: relative;
  }
  #collection .cs-picture {
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
    overflow: hidden;
    display: block;
  }
  #collection .cs-picture img {
    width: 100%;
    height: 100%;
    /* using object-fit contain to keep the entirety of the product image in the frame */
    /* feel free to change this to 'cover', or adjust the background-color above if you have consistent backgrounds on your products */
    object-fit: contain;
    transition: transform 0.6s;
  }
  #collection .cs-offer {
    font-size: 0.8125rem;
    font-weight: 700;
    line-height: 1.2em;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    padding: 0.375rem;
    color: #fff;
    background: #ff4747;
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  }
  #collection .cs-category {
    font-size: 1rem;
    line-height: 1.5em;
    color: #767676;
  }
  #collection .cs-name {
    /* 20px - 25px */
    font-size: clamp(1.25rem, 1vw, 1.5625rem);
    font-weight: 700;
    line-height: 1.2em;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    margin: 0;
    color: var(--headerColor);
    overflow: hidden;
  }
  #collection .cs-actions {
    margin-top: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #collection .cs-price {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.2em;
    color: var(--secondary);
  }
  #collection .cs-was-price {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.2em;
    text-decoration: line-through;
    color: #767676;
  }
  #collection .cs-stars {
    margin-top: 0.25rem;
    display: flex;
  }
  #collection .cs-star {
    width: 1.25rem;
    height: 1.25rem;
  }
  #collection .cs-buy {
    max-height: 2.5rem;
    padding: 0.5rem;
    background: none;
    border: 2px solid var(--primary);
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #collection .cs-basket {
    width: 1.5rem;
    height: auto;
  }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #collection .cs-content {
    flex-direction: row;
    justify-content: space-between;
  }
  #collection .cs-listing {
    grid-template-columns: repeat(3, 1fr);
  }
  #collection .cs-item {
    max-width: none;
  }
  #collection .cs-picture-group {
    /* 200px - 320px */
    height: clamp(12.5rem, 23vw, 20rem);
  }
}
/* Dark Mode */
@media only screen and (min-width: 0rem) {
  body.dark-mode #collection .cs-title,
  body.dark-mode #collection .cs-button,
  body.dark-mode #collection .cs-category,
  body.dark-mode #collection .cs-was-price,
  body.dark-mode #collection .cs-name {
    color: var(--bodyTextColorWhite);
  }
  body.dark-mode #collection .cs-active {
    color: var(--primary);
  }
  body.dark-mode #collection .cs-category,
  body.dark-mode #collection .cs-was-price {
    opacity: 0.8;
  }
  body.dark-mode #collection .cs-item {
    background-color: var(--medium);
    border-color: var(--accent);
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
          <h2 class="cs-title">Gallery Wall Art</h2>
          <div class="cs-button-group">
              <button class="cs-button" data-filter="one">
                  New Arrivals
              </button>
              <button class="cs-button" data-filter="two">
                  Top Rated
              </button>
              <button class="cs-button" data-filter="three">
                  Best Sellers
              </button>
          </div>
      </div>
      <div class="cs-listing-wrapper">
          <!-- Product images use the Astro <Picture /> component, icons use <Image /> -->
          <!--Listing 1-->
          <div class="cs-listing" data-category="one">
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={goldenHorizonImage} alt="Golden Horizon" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Abstract, Framed</span>
                          <h3 class="cs-name">Golden Horizon</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$48.00</span>
                                  <span class="cs-was-price">$60.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={coralDriftImage} alt="Coral Drift" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Abstract, Canvas</span>
                          <h3 class="cs-name">Coral Drift</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$52.00</span>
                                  <span class="cs-was-price">$65.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={marbleFlowImage} alt="Marble Flow" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">Sale</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Abstract, Print</span>
                          <h3 class="cs-name">Marble Flow</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$39.00</span>
                                  <span class="cs-was-price">$49.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={sunsetGradientImage} alt="Sunset Gradient" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Abstract, Framed</span>
                          <h3 class="cs-name">Sunset Gradient</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$44.00</span>
                                  <span class="cs-was-price">$55.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={indigoWavesImage} alt="Indigo Waves" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">New</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Abstract, Canvas</span>
                          <h3 class="cs-name">Indigo Waves</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$58.00</span>
                                  <span class="cs-was-price">$72.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={amberFieldsImage} alt="Amber Fields" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Abstract, Print</span>
                          <h3 class="cs-name">Amber Fields</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$41.00</span>
                                  <span class="cs-was-price">$51.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
          </div>
          <!--Listing 2-->
          <div class="cs-listing cs-hidden" data-category="two">
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={mistyPinesImage} alt="Misty Pines" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Nature, Framed</span>
                          <h3 class="cs-name">Misty Pines</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$46.00</span>
                                  <span class="cs-was-price">$58.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={oceanCalmImage} alt="Ocean Calm" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Nature, Canvas</span>
                          <h3 class="cs-name">Ocean Calm</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$54.00</span>
                                  <span class="cs-was-price">$68.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={desertDunesImage} alt="Desert Dunes" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">Sale</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Nature, Print</span>
                          <h3 class="cs-name">Desert Dunes</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$42.00</span>
                                  <span class="cs-was-price">$53.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={forestLightImage} alt="Forest Light" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Nature, Framed</span>
                          <h3 class="cs-name">Forest Light</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$49.00</span>
                                  <span class="cs-was-price">$62.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={alpineLakeImage} alt="Alpine Lake" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Nature, Canvas</span>
                          <h3 class="cs-name">Alpine Lake</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$57.00</span>
                                  <span class="cs-was-price">$71.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={wildflowerMeadowImage} alt="Wildflower Meadow" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">New</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Nature, Print</span>
                          <h3 class="cs-name">Wildflower Meadow</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$38.00</span>
                                  <span class="cs-was-price">$47.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
          </div>
          <!--Listing 3-->
          <div class="cs-listing cs-hidden" data-category="three">
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={cityLightsImage} alt="City Lights" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Urban, Framed</span>
                          <h3 class="cs-name">City Lights</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$50.00</span>
                                  <span class="cs-was-price">$63.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={bridgeDuskImage} alt="Bridge at Dusk" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Urban, Canvas</span>
                          <h3 class="cs-name">Bridge at Dusk</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$47.00</span>
                                  <span class="cs-was-price">$59.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={neonDistrictImage} alt="Neon District" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">Hot</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Urban, Print</span>
                          <h3 class="cs-name">Neon District</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$55.00</span>
                                  <span class="cs-was-price">$69.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={skylineFogImage} alt="Skyline Fog" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Urban, Framed</span>
                          <h3 class="cs-name">Skyline Fog</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$43.00</span>
                                  <span class="cs-was-price">$54.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={rooftopViewImage} alt="Rooftop View" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">-20%</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Urban, Canvas</span>
                          <h3 class="cs-name">Rooftop View</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$52.00</span>
                                  <span class="cs-was-price">$66.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
              <div class="cs-item">
                  <a href="" class="cs-link">
                      <div class="cs-picture-group">
                          <Picture src={midnightMetroImage} alt="Midnight Metro" width={305} height={400} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
                          <span class="cs-offer">Sale</span>
                      </div>
                      <div class="cs-details">
                          <span class="cs-category">Urban, Print</span>
                          <h3 class="cs-name">Midnight Metro</h3>
                          <div class="cs-actions">
                              <div class="cs-flex">
                                  <span class="cs-price">$45.00</span>
                                  <span class="cs-was-price">$56.00</span>
                                  <div class="cs-stars">
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                      <Image class="cs-star" src={starIcon} alt="star" height={24} width={24} />
                                  </div>
                              </div>
                              <button class="cs-buy">
                                  <Image class="cs-basket" src={basketIcon} alt="buy" height={24} width={24} />
                              </button>
                          </div>
                      </div>
                  </a>
              </div>
          </div>
      </div>
  </div>
</section>
                              
                                    

`;

export const sampleJs = `

document.addEventListener('DOMContentLoaded', function () {

    class GalleryFilter {
        filtersSelector = ".cs-button";
        imagesSelector = ".cs-listing";
        activeClass = "cs-active";
        hiddenClass = "cs-hidden";

        constructor() {
            const $filters = document.querySelectorAll(this.filtersSelector);
            this.$activeFilter = $filters[0];
            this.$images = document.querySelectorAll(this.imagesSelector);

            this.$activeFilter.classList.add(this.activeClass);

            for (const $filter of $filters) {
                $filter.addEventListener("click", () => this.onClick($filter));
            }
        }

        onClick($filter) {
            this.filter($filter.dataset.filter);

            const { activeClass } = this;

            this.$activeFilter.classList.remove(activeClass);
            $filter.classList.add(activeClass);

            this.$activeFilter = $filter;
        }

        filter(filter) {
            const showAll = filter == "all";
            const { hiddenClass } = this;

            for (const $image of this.$images) {
                const show = showAll || $image.dataset.category == filter;
                $image.classList.toggle(hiddenClass, !show);
            }
        }
    }

    new GalleryFilter();
  });                   
                                
`;
