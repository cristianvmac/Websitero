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
<---            FAQ             -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0em) {
    #faq {
        padding: var(--sectionPadding);
        background: #fafbfc;
    

    .cs-container {
        width: 100%;
        max-width: 34.375rem; /* 550/16rem */
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: clamp(3rem, 6vw, 4rem);
    }

    .cs-content {
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cs-faq-group {
        padding: 0;
        margin: 0;
        margin-bottom: 3rem; /* 48/16rem */
    }

    .cs-faq-item {
        list-style: none;
        border-bottom: 1px solid #dad9e3;
        transition: border-bottom 0.3s;
    }

    .cs-faq-item.active {
        border-bottom: 1px solid var(--primary);
    }

    .cs-faq-item.active .cs-button:before {
        transform: rotate(180deg);
    }

    .cs-faq-item.active .cs-button:after {
        opacity: 0;
        transform: rotate(360deg);
    }

    .cs-faq-item.active .cs-item-p {
        height: auto;
        margin-bottom: clamp(0.75rem, 1.3vw, 1rem);
        opacity: 1;
    }

    .cs-button {
        font-size: clamp(1rem, 2vw, 1.25rem);
        line-height: 1.2em;
        text-align: left;
        font-weight: bold;
        padding: clamp(0.75rem, 1.3vw, 1rem) 0;
        background: transparent;
        border: none;
        color: var(--headerColor);
        display: block;
        width: 100%;
        position: relative;
    }

    .cs-button:hover {
        cursor: pointer;
    }

    .cs-button:before {
        content: "";
        width: 0.75rem; /* 12/16rem */
        height: 0.125rem; /* 2/16rem */
        background: var(--headerColor);
        opacity: 1;
        position: absolute;
        display: block;
        top: 50%;
        right: 0.25rem; /* 4/16rem */
        transition: transform 0.3s;
    }

    .cs-button:after {
        content: "";
        width: 0.75rem; /* 12/16rem */
        height: 0.125rem; /* 2/16rem */
        background: var(--headerColor);
        opacity: 1;
        position: absolute;
        display: block;
        top: 50%;
        right: 0.25rem; /* 4/16rem */
        transform: rotate(90deg);
        transform-origin: center;
        transition: opacity 0.5s, transform 0.3s;
    }

    .cs-item-p {
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.5em;
        width: 90%;
        height: 0;
        margin: 0;
        opacity: 0;
        color: var(--bodyTextColor);
        overflow: hidden;
        transition: opacity 0.3s, margin-bottom 0.3s;
    }

    .cs-cta {
        text-align: center;
        padding: clamp(3rem, 4.9vw, 4rem) clamp(2.5rem, 4vw, 3.5rem);
        background: var(--primaryLight);
        border-radius: 1rem; /* 16/16rem */
        box-sizing: border-box;
    }

    .cs-h3 {
        font-size: clamp(1.5625rem, 3vw, 1.9375rem);
        line-height: 1.2em;
        font-weight: bold;
        text-align: center;
        margin: 0;
        margin-bottom: 1rem; /* 16/16rem */
        color: var(--headerColor);
    }

    .cs-cta-p {
        font-size: clamp(1rem, 2vw, 1.25rem);
        text-align: center;
        line-height: 1.5em;
        margin: 0;
        margin-bottom: clamp(2rem, 3.9vw, 3rem);
    }

    .cs-button-solid {
        font-size: 1rem;
        line-height: clamp(2.875rem, 5.5vw, 3.5rem);
        text-decoration: none;
        font-weight: 700;
        text-align: center;
        margin: 0;
        color: #fff;
        min-width: 9.375rem; /* 150/16rem */
        padding: 0 1.5rem; /* 24/16rem */
        background-color: var(--primary);
        border-radius: 0.25rem; /* 4/16rem */
        display: inline-block;
        position: relative;
        z-index: 1;
        box-sizing: border-box;
    }

    .cs-button-solid:before {
        content: "";
        position: absolute;
        height: 100%;
        width: 0%;
        background: #000;
        opacity: 1;
        top: 0;
        left: 0;
        z-index: -1;
        border-radius: 0.25rem;
        transition: width 0.3s;
    }

    .cs-button-solid:hover:before {
        width: 100%;
    }
    }
}

/* Tablet - 768px */
@media only screen and (min-width: 48em) {
    #faq .cs-container {
        max-width: 67.5rem; /* 1080/16rem */
    }

    #faq .cs-flex-group {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: clamp(1rem, 3.5vw, 3rem);
    }

    #faq .cs-faq-group {
        margin: 0;
    }

    #faq .cs-cta {
        width: 38.5%;
        max-width: 25.8125rem; /* 413/16rem */
        flex: none;
    }
}

/* Dark Mode */
@media only screen and (min-width: 0em) {
    body.dark-mode #faq {
        background-color: transparent;
    

       .cs-topper {
            color: var(--primaryLight);
        }

        .cs-title,
        .cs-text {
            color: var(--bodyTextColorWhite);
        }

        .cs-button {
            color: var(--bodyTextColorWhite);
        }

    .cs-button:before,
    .cs-button:after {
        background: var(--bodyTextColorWhite);
    }

     .cs-h3,
    .cs-item-p {
        color: var(--bodyTextColorWhite);
    }

   .cs-cta {
        background: var(--medium);
    }
}
}

`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                    FAQ                       -->
<!-- ============================================ -->

<section id="faq">
  <div class="cs-container">
    <div class="cs-content">
      <span class="cs-topper">Company Name Ltd.</span>
      <h2 class="cs-title">Frequently Asked Questions</h2>
      <p class="cs-text">Have some questions? Check out our FAQ, where we answer our most common questions.</p>
    </div>

    <div class="cs-flex-group">
      <ul class="cs-faq-group">
        <li class="cs-faq-item active">
          <button class="cs-button">A euismod, tincidunt molestie suscipit?</button>
          <p class="cs-item-p">
            Dictumst lorem ullamcorper rutrum, dolor nam luctus, a viverra nulla ultricies suscipit interdum posuere.
            Gravida rhoncus libero ultricies, bibendum ut ante rutrum neque.
            Luctus felis vel velit, justo molestie quis, a cras integer porta orci arcu. 
          </p>
        </li>
        <li class="cs-faq-item">
          <button class="cs-button">Velit platea, ipsum curabitur leo?</button>
          <p class="cs-item-p">
            Dui sem condimentum, placerat velit, orci cubilia venenatis duis semper. 
            Vehicula rutrum, amet curae varius.
            Fermentum laoreet conubia, platea elit inceptos senectus posuere. 
          </p>
        </li>
        <li class="cs-faq-item">
          <button class="cs-button">Porta praesent id pharetra lacinia egestas dictumst? </button>
          <p class="cs-item-p">
            Nunc orci gravidus, nec tortor sed pharetra.
            Nibh ac nulla non, mauris fusce facilisis, at etiam eget posuere dolor vitae. 
            Etiam curae, curabitur inceptos nisl.
          </p>
        </li>
        <li class="cs-faq-item">
          <button class="cs-button">Erat elementum rutrum convallis, habitant massa ut fermentum imperdiet?</button>
          <p class="cs-item-p">
            Elit morbi curae litora, gravida aliquam tincidunt metus himenaeos. 
            Neque curabitur quisque, sodales sapien, habitasse leo sem lectus torquent interdum eget. 
          </p>
        </li>
        <li class="cs-faq-item">
          <button class="cs-button">Faucibus sagittis turpis fames?</button>
          <p class="cs-item-p">
            Fringilla erat tristique, ac lobortis, sagittis sed viverra nec urna. 
            Luctus porta donec augue, conubia sollicitudin himenaeos, eros non adipiscing commodo mauris molestie odio
          </p>
        </li>
        <li class="cs-faq-item">
          <button class="cs-button">Donec porttitor imperdiet, commodo turpis, quisque mi consectetur ut ligula?</button>
          <p class="cs-item-p">
              Quam cursus, id taciti consequat. 
              Sociosqu vel, in porttitor suspendisse. Suscipit nisl nostra, magna ac odio nunc sit.
          </p>
        </li>
        <li class="cs-faq-item">
          <button class="cs-button">Aenean leo arcu, risus sem mauris libero?</button>
          <p class="cs-item-p">
            Taciti consectetur, donec consequat in aliquam.
            Dapibus non suspendisse senectus, erat litora ultrices blandit elementum. 
            Curae varius purus, quisque venenatis feugiat dictumst. 
          </p>
        </li>
        <li class="cs-faq-item">
          <button class="cs-button">Varius mauris aenean, eleifend quam?</button>
          <p class="cs-item-p">
             Sodales felis risus, fusce curae eget integer. 
             Primis in facilisis, erat litora, quisque euismod hac proin fermentum praesent. 
             Nibh phasellus et, varius cursus, nam accumsan euismod faucibus vel donec.
          </p>
        </li>
      </ul>

      <div class="cs-cta">
        <h3 class="cs-h3">Don’t see the answer you need?</h3>
        <p class="cs-cta-p">That’s ok. Just drop a message and we will get back to you ASAP.</p>
        <a href="/contact/" class="cs-button-solid">Contact Us!</a>
      </div>
    </div>
  </div>
</section> 

`;

export const sampleJs = `

	// Paste the JS inside Astro:page-load wrapper for View Transitions purposes
	document.addEventListener("astro:page-load", () => {
		const faqItems = Array.from(document.querySelectorAll(".cs-faq-item"));
		for (const item of faqItems) {
			const onClick = () => {
				item.classList.toggle("active");
			};
			item.addEventListener("click", onClick);
		}
	});

`;