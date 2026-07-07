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
<---          Footer            -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0px) {

  #cs-footer {
   /* padding: var(--sectionPadding);*/
    /*padding: 0.2rem 1rem;*/
    background-color: #1a1a1a;

    padding: 2rem 2rem;
  

  .cs-container {
    width: 100%;
    max-width: 34.375rem; /* 550/16 */
    margin: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    column-gap: 5.5rem; /* 88/16 */
    row-gap: 2rem; /* 32/16 */

    padding: 0 1rem; /* add this */
  }

  .cs-logo-group {
    width: 100%;
    position: relative;
  }

  .cs-logo {
    width: clamp(13.125rem, 8vw, 15rem);
   /* height: auto;*/
    height: 5rem;
    display: block;
    margin-bottom: clamp(1.75rem, 4.17vw, 2.75rem);
  }

  .cs-logo-img {
    width: 100%;
    height: auto;
  }

  .cs-logo-img.dark {
    display: none;
  }

  .cs-text {
    color: var(--bodyTextColorWhite);
    margin-bottom: 1rem; /* 16/16 */
   
  }

 .cs-social {
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.75rem; /* 12/16 */
    position: absolute;
    top: 0;
    right: 0;
  }

 .cs-social-link {
    width: 1.5rem; /* 24/16 */
    height: 1.5rem;
    background-color: #4e4b66;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    transition: transform 0.3s, background-color 0.3s;
  }

  .cs-social-link:hover {
    background-color: #1a1a1a;
    transform: translateY(-0.1875rem);
  }

  .cs-social-img {
    height: 0.8125rem; /* 13/16 */
    width: auto;
    display: block;
  }

  /* Navigation */
 .cs-nav {
    padding: 0;
    margin: 0;
  }

  .cs-nav-li {
    list-style: none;
    margin-bottom: 1rem;
  }

  .cs-nav-li:last-of-type {
    margin-bottom: 0;
  }

  .cs-header {
    font-size: 1rem;
    line-height: 1.5em;
    font-weight: 700;
    color: var(--bodyTextColorWhite);
    position: relative;
  }

  .cs-header:after {
    content: "";
    width: 2rem; /* 32/16 */
    height: 0.25rem; /* 4/16 */
    margin: 1rem auto 1.5rem 0; /* 16 / 24 */
    background: var(--primary);
    display: block;
  }

  .cs-nav-link {
    font-size: 1rem;
    text-decoration: none;
    line-height: 1.5em;
    color: var(--bodyTextColorWhite);
    position: relative;
  }

  .cs-nav-link:before {
    content: "";
    width: 0%;
    height: 0.125rem; /* 2/16 */
    background: var(--bodyTextColorWhite);
    position: absolute;
    bottom: -0.125rem;
    left: 0;
    transition: width 0.3s;
  }

  .cs-nav-link:hover:before {
    width: 100%;
  }

  /* Contact */
  .cs-contact {
    margin: 0;
    padding: 0;
    width: 35%;
  }

  .cs-contact-li {
    list-style: none;
    margin-bottom: 0;
  }

  .cs-contact-li:last-of-type {
    margin-bottom: 0;
  }

 .cs-contact-link {
    font-size: 1rem;
    text-decoration: none;
    line-height: 1.5em;
    text-align: left;
    color: var(--bodyTextColorWhite);
    display: inline-block;
  }

  .cs-contact-link:hover {
    text-decoration: underline;
  }

  .cs-address {
    font-size: 1rem;
    margin-bottom: 1.25rem; /* 20/16 */
  }
  }
}

/* Tablet - 768px */
@media only screen and (min-width: 48rem) {

  #cs-footer {
    .cs-container {
      max-width: 80rem; /* 1280/16 */
      row-gap: 0;
    }
    .cs-contact {
      flex-direction: row;
      justify-content: space-between;
      border-top: none;
    }
    .cs-contact-li {
      margin: 0;
    }
  }
}

/* Small Desktop - 1024px */
@media only screen and (min-width: 64rem) {

  #cs-footer {
    .cs-container {
      align-items: flex-start;
      justify-content: flex-end;
    }
    .cs-logo-group {
      margin-right: auto;
      width: auto;
      max-width: 19.0625rem; /* 305/16 */
    }
    .cs-text {
      width: 100%;
    }
    .cs-social {
      flex-direction: row;
      position: relative;
      top: auto;
      right: auto;
    }
    .cs-contact {
      width: auto;
    }
  } 
}

`;

export const sampleHtml = `


<!-- ============================================ -->
<!--                   Footer                     -->
<!-- ============================================ -->

<footer id="cs-footer">
    <div class="cs-container">
        <!-- Logo Group -->
        <div class="cs-logo-group">
           <!--  <a aria-label="go back to home" class="cs-logo" href="/">
                <img class="cs-logo-img" loading="lazy" decoding="async" src="/assets/images/footer/logo-white.svg" alt="logo" width="240" height="32">
            </a> -->
            <a href="/" class="cs-logo" aria-label="Return to Home">
  			      <Image src={logo} alt="Company Logo" width={260} height={135} />
		        </a>
            <p class="cs-text">
                Extra content if you need it, if not you can delete this whole p tag. I usually do.
            </p>
            <div class="cs-social">
                <a class="cs-social-link" aria-label="visit google profile" href="" target="_blank" rel="noopener">
                    <Image src={googleIcon} alt="Google" width={11} height={11} />
                </a>
                <a class="cs-social-link" aria-label="visit facebook profile" href="" target="_blank" rel="noopener">
                    <Image src={facebookIcon} alt="Google" width={11} height={11} />
                </a>
                <a class="cs-social-link" aria-label="visit instagram profile" href="" target="_blank" rel="noopener">
                    <Image src={instagramIcon} alt="Google" width={11} height={11} />
                </a>
            </div>
        </div>
        <!-- Links -->
        <ul class="cs-nav">
            <li class="cs-nav-li">
                <span class="cs-header">Information</span>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/">Home</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/about/">About</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/portfolio/">Portfolio</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/reviews/">Reviews</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/contact/">Contact</a>
            </li>
        </ul>
        <ul class="cs-nav">
            <li class="cs-nav-li">
                <span class="cs-header">Services</span>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/serviceone/">Service One</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/servicetwo/">Service Two</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/servicethree/">Service Three</a>
            </li>
        </ul>
        <!-- Contact Info -->
        <ul class="cs-contact">
            <li class="cs-nav-li">
                <span class="cs-header">Contact</span>
            </li>
            <li class="cs-contact-li">
                <a class="cs-contact-link cs-address" href="{{ BUSINESS.address.mapLink }}" target="_blank" rel="noopener">
                    { BUSINESS.address.lineOne }, <br>
                    { BUSINESS.address.lineTwo }, <br>
                    { BUSINESS.address.city }, { BUSINESS.address.state }, { BUSINESS.address.zip }
                </a>
            </li>
            <li class="cs-contact-li">
                <a class="cs-contact-link" href="tel:{{ BUSINESS.phoneForTel }}">{ BUSINESS.phoneFormatted }</a>
            </li>
            <li class="cs-contact-li">
                <a class="cs-contact-link" href="mailto:{{ BUSINESS.email }}">{ BUSINESS.email }</a>
            </li>
        </ul>
    </div>
</footer>

`;

export const sampleJs = `
 
`;