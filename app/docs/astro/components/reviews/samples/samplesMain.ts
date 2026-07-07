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

/* PAGE-SPECIFIC STYLES FOR THE REVIEWS PAGE */

/*-- -------------------------- -->
<---           Reviews          -->
<--- -------------------------- -*/

/* Mobile */
@media only screen and (min-width: 0em) {
  #reviews {
    margin: auto;
    padding-top: 7.5rem;
    padding-bottom: 3.125rem;
  }

  #reviews .container {
    width: 96%;
    max-width: 82.5rem;
  }

  #reviews .review {
    width: 100%;
    max-width: 25.625rem;
    margin: auto;
    margin-bottom: 6.25rem;
    padding: 4rem 1.875rem 1.125rem 1.875rem;
    background: #fff;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.05);
    border-radius: 0.3125rem;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  #reviews .review:last-of-type {
    margin-bottom: 0;
  }

  #reviews .review .profile {
    width: 6.1875rem;
    height: 6.1875rem;
    margin-bottom: 1rem;
    margin-left: 0;
    border-radius: 50%;
    display: block;
    position: absolute;
    top: -3.1875rem;
    left: 1.875rem;
  }

  #reviews .review p {
    line-height: 1.5em;
    text-align: left;
    margin-bottom: 1.75rem;
  }

  #reviews .review .star-group {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid #e7e7e7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }

  #reviews .review .star-group .name {
    font-weight: bold;
    line-height: 1.5rem;
    text-align: left;
    color: #1a1a1a;
    display: block;
  }

  #reviews .review .star-group .desc {
    font-weight: 400;
    color: #575757;
    display: block;
  }

  #reviews .review .star-group img {
    width: 5.6875rem;
    height: 0.9375rem;
    margin: 0;
    display: block;
  }
}

/* Tablet */
@media only screen and (min-width: 48em) {
  #reviews {
    padding-top: 9.375rem;
    padding-bottom: 3.125rem;
  }

  #reviews .container {
    font-size: min(1.4vw, 1em);
    padding: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 1.875rem;
  }

  #reviews .review {
    margin: 0;
    margin-bottom: 9.375rem;
  }

  #reviews .review:last-of-type {
    margin-bottom: 9.375rem;
  }
}

/* Dark Mode */
@media only screen and (min-width: 0em) {
  body.dark-mode #reviews .review {
    background: var(--medium);
  }

  body.dark-mode #reviews .review .star-group .name {
    color: #fff;
  }

  body.dark-mode #reviews .review .star-group .desc {
    color: #fff;
    opacity: 0.7;
  }
}

`;

// take in consideration to change Icon to img, more simplicity
export const sampleHtml = `

<section id="reviews">
	<div class="container">
		<div class="review">
			<picture>
				<Icon name="profile" class="profile" width="99" height="99" />
			</picture>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed recusandae rerum unde similique ratione sapiente necessitatibus natus mollitia nam iusto.</p>
			<div class="star-group">
				<span class="name">Bill Miller<span class="desc">Homeowner</span></span>
				<picture>
					<Icon name="stars" width="91" height="15" aria-hidden="true" />
				</picture>
			</div>
		</div>
		<div class="review">
			<picture>
				<Icon name="profile" class="profile" width="99" height="99" />
			</picture>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed recusandae rerum unde similique ratione sapiente necessitatibus natus mollitia nam iusto.</p>
			<div class="star-group">
				<span class="name">Roberta Cornier<span class="desc">Homeowner</span></span>
				<picture>
					<Icon name="stars" width="91" height="15" aria-hidden="true" />
				</picture>
			</div>
		</div>
		<div class="review">
			<picture>
				<Icon name="profile" class="profile" width="99" height="99" />
			</picture>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed recusandae rerum unde similique ratione sapiente necessitatibus natus mollitia nam iusto.</p>
			<div class="star-group">
				<span class="name">Jack Stilger<span class="desc">Homeowner</span></span>
				<picture>
					<Icon name="stars" width="91" height="15" aria-hidden="true" />
				</picture>
			</div>
		</div>
		<div class="review">
			<picture>
				<Icon name="profile" class="profile" width="99" height="99" />
			</picture>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed recusandae rerum unde similique ratione sapiente necessitatibus natus mollitia nam iusto.</p>
			<div class="star-group">
				<span class="name">Ellen Williams<span class="desc">Homeowner</span></span>
				<picture>
					<Icon name="stars" width="91" height="15" aria-hidden="true" />
				</picture>
			</div>
		</div>
		<div class="review">
			<picture>
				<Icon name="profile" class="profile" width="99" height="99" />
			</picture>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed recusandae rerum unde similique ratione sapiente necessitatibus natus mollitia nam iusto.</p>
			<div class="star-group">
				<span class="name">Alex Jones<span class="desc">Homeowner</span></span>
				<picture>
					<Icon name="stars" width="91" height="15" aria-hidden="true" />
				</picture>
			</div>
		</div>
		<div class="review">
			<picture>
				<Icon name="profile" class="profile" width="99" height="99" />
			</picture>
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed recusandae rerum unde similique ratione sapiente necessitatibus natus mollitia nam iusto.</p>
			<div class="star-group">
				<span class="name">Jon Forge<span class="desc">Homeowner</span></span>
				<picture>
					<Icon name="stars" width="91" height="15" aria-hidden="true" />
				</picture>
			</div>
		</div>
	</div>
</section>

`;

export const sampleJs = `

`;