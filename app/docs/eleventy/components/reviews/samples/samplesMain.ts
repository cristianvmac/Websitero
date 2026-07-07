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
<---          Reviews           -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0em) {
    #reviews {
        text-align: center;
        padding: var(--sectionPadding);
    }

    #reviews .cs-container {
        width: 100%;
        max-width: 69rem;
        margin: auto;
    }

    #reviews .cs-topper {
        text-align: center;
        margin-bottom: 1rem;
    }

    #reviews .cs-title {
        text-align: center;
        max-width: 43.75rem;
        margin: 0 auto 1rem;
    }

    #reviews .cs-text {
        text-align: center;
        max-width: 40.625rem;
        margin: 0 auto clamp(5.5em, 10.2vw, 6.5em);
    }

    #reviews .cs-card-group {
        margin: 0 auto clamp(3rem, 5vw, 4rem);
        padding: 0;
    }

    #reviews .cs-item {
        text-align: left;
        list-style: none;
        width: 100%;
        max-width: 33.875rem;
        margin: 0 auto 4rem;
        box-sizing: border-box;
        padding: 3.75rem clamp(1rem, 3.2vw, 2rem) 0;
        padding-bottom: clamp(2rem, 5.4vw, 2.5rem);
        background: #fff;
        box-shadow: 0px 20px 39px 0px rgba(0, 0, 0, 0.05);
        border-radius: 0.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        position: relative;
    }

    #reviews .cs-item:last-of-type {
        margin-bottom: 0;
    }

    #reviews .cs-item-img {
        width: 5rem;
        height: 5rem;
        position: absolute;
        top: -2.5rem;
    }

    #reviews .cs-item-p {
        font-size: 1rem;
        line-height: 1.5em;
        margin: 0 0 1.25rem;
        padding-bottom: 1.25rem;
        color: var(--bodyTextColor);
        border-bottom: 1px solid #e8e9ec;
    }

    #reviews .cs-reviewer {
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.5em;
        width: 40%;
        margin: 0 auto 0 0;
        color: var(--headerColor);
        display: block;
    }

    #reviews .cs-desc {
        font-size: 0.875rem;
        font-weight: 400;
        color: #353535;
        display: block;
    }

    #reviews .cs-item-stars {
        width: 6rem;
        height: 1rem;
    }
}

/* Tablet - 768px */
@media only screen and (min-width: 48em) {
    #reviews .cs-card-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    #reviews .cs-item {
        margin: 0;
    }
}

/* Dark Mode */
@media only screen and (min-width: 0em) {
    body.dark-mode #reviews .cs-title,
    body.dark-mode #reviews .cs-text,
    body.dark-mode #reviews .cs-item-p,
    body.dark-mode #reviews .cs-reviewer {
        color: var(--bodyTextColorWhite);
    }

    body.dark-mode #reviews .cs-item {
        background: var(--medium);
    }

    body.dark-mode #reviews .cs-desc {
        color: var(--primaryLight);
    }
}

`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                   Reviews                    -->
<!-- ============================================ -->

<section id="reviews">
	<div class="cs-container">
		<span class="cs-topper">Our Reviews</span>
		<h2 class="cs-title">Words From Our Customers</h2>
		<p class="cs-text">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit dolor volutpat porttitor sagittis nunc nisl. Sagittis sit pellentesque gravida viverra. Leo ut sed euismod tortor risus et. Ornare non neque, leo, ornare. Lorem ipsum dolor sit amet.
		</p>
		<ul class="cs-card-group">
			<!-- Review 1 -->
			<li class="cs-item">
				<img class="cs-item-img" loading="lazy" decoding="async" src="/assets/images/testimonials/profile5.jpg" alt="icon" width="80" height="80" aria-hidden="true">
        <p class="cs-item-p">
					Dictum dolor, nullam morbi sem in auctor proin. Consequat dolor habitasse nam sed tempor. Viverra magna pharetra rhoncus, nec sed ullamcorper lectus et. Auctor velit diam fermentum consequat. Feugiat viverra massa urna, volutpat orci
					imperdiet eget eget.
				</p>
				<span class="cs-reviewer">
					John Doe
					<span class="cs-desc">Homeowner</span>
				</span>
				<Icon name="stars-yellow" class="cs-item-stars" />
			</li>
			<!-- Review 2 -->
			<li class="cs-item">
				<img class="cs-item-img" loading="lazy" decoding="async" src="/assets/images/testimonials/profile-4.jpg" alt="icon" width="80" height="80" aria-hidden="true">
				<p class="cs-item-p">
					Dictum dolor, nullam morbi sem in auctor proin. Consequat dolor habitasse nam sed tempor. Viverra magna pharetra rhoncus, nec sed ullamcorper lectus et. Auctor velit diam fermentum consequat. Feugiat viverra massa urna, volutpat orci
					imperdiet eget eget.
				</p>
				<span class="cs-reviewer">
					Jane Doe
					<span class="cs-desc">Homeowner</span>
				</span>
				<Icon name="stars-yellow" class="cs-item-stars" />
			</li>
		</ul>
		<a aria-label="read more reviews" href="/reviews/" class="cs-button-solid">Our Reviews</a>
	</div>
</section>

`;

export const sampleJs = `

`;