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
<---            FAQ             -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0em) {
    #faq {
        padding: var(--sectionPadding);
        background: #fafbfc;
    }
    #faq .cs-container {
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
    #faq .cs-content {
        /* set text align to left if content needs to be left aligned */
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: column;
        /* centers content horizontally, set to flex-start to left align */
        align-items: center;
    }

    #faq .cs-faq-group {
        padding: 0;
        margin: 0;
        margin-bottom: 3rem;
    }
    #faq .cs-faq-item {
        list-style: none;
        border-bottom: 1px solid #dad9e3;
        transition: border-bottom 0.3s;
    }
    #faq .cs-faq-item.active {
        border-bottom: 1px solid var(--primary);
    }
    #faq .cs-faq-item.active .cs-button:before {
        transform: rotate(180deg);
    }
    #faq .cs-faq-item.active .cs-button:after {
        opacity: 0;
        transform: rotate(360deg);
    }
    #faq .cs-faq-item.active .cs-item-p {
        height: auto;
        /* 12px - 16px */
        margin-bottom: clamp(0.75rem, 1.3vw, 1rem);
        opacity: 1;
    }
    #faq .cs-button {
        /* 16px - 20px */
        font-size: clamp(1rem, 2vw, 1.25rem);
        line-height: 1.2em;
        text-align: left;
        font-weight: bold;
        /* 12px - 16px */
        padding: clamp(0.75rem, 1.3vw, 1rem) 0;
        background: transparent;
        border: none;
        color: var(--headerColor);
        display: block;
        width: 100%;
        position: relative;
    }
    #faq .cs-button:hover {
        cursor: pointer;
    }
    #faq .cs-button:before {
        /* plus sign */
        content: "";
        width: 0.75rem;
        height: 0.125rem;
        background: var(--headerColor);
        opacity: 1;
        position: absolute;
        display: block;
        top: 50%;
        right: 0.25rem;
        transition: transform 0.3s;
    }
    #faq .cs-button:after {
        /* plus sign */
        content: "";
        width: 0.75rem;
        height: 0.125rem;
        background: var(--headerColor);
        opacity: 1;
        position: absolute;
        display: block;
        top: 50%;
        right: 0.25rem;
        transform: rotate(90deg);
        transform-origin: center;
        transition:
            opacity 0.5s,
            transform 0.3s;
    }
    #faq .cs-item-p {
        /* 14px - 16px */
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.5em;
        width: 90%;
        height: 0;
        margin: 0;
        opacity: 0;
        color: var(--bodyTextColor);
        /* clips the text so it doesn't show up */
        overflow: hidden;
        transition:
            opacity 0.3s,
            margin-bottom 0.3s;
    }
    #faq .cs-cta {
        text-align: center;
        /* 48px - 64px top & bottom */
        /* 40px - 56px left & right */
        padding: clamp(3rem, 4.9vw, 4rem) clamp(2.5rem, 4vw, 3.5rem);
        background: var(--primaryLight);
        border-radius: 1rem;
        /* prevents padding from adding to width and height */
        box-sizing: border-box;
    }
    #faq .cs-h3 {
        /* 25px - 31px */
        font-size: clamp(1.5625rem, 3vw, 1.9375rem);
        line-height: 1.2em;
        font-weight: bold;
        text-align: center;
        margin: 0;
        margin-bottom: 1rem;
        color: var(--headerColor);
    }
    #faq .cs-cta-p {
        /* 16px - 20px */
        font-size: clamp(1rem, 2vw, 1.25rem);
        text-align: center;
        line-height: 1.5em;
        margin: 0;
        /* 32px - 48px */
        margin-bottom: clamp(2rem, 3.9vw, 3rem);
    }
    #faq .cs-button-solid {
        font-size: 1rem;
        /* 46px - 56px */
        line-height: clamp(2.875rem, 5.5vw, 3.5rem);
        text-decoration: none;
        font-weight: 700;
        text-align: center;
        margin: 0;
        color: #fff;
        min-width: 9.375rem;
        padding: 0 1.5rem;
        background-color: var(--primary);
        border-radius: 0.25rem;
        display: inline-block;
        position: relative;
        z-index: 1;
        /* prevents padding from adding to the width */
        box-sizing: border-box;
    }
    #faq .cs-button-solid:before {
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
    #faq .cs-button-solid:hover:before {
        width: 100%;
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48em) {
    #faq .cs-container {
        max-width: 67.5rem;
    }
    #faq .cs-flex-group {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        /* 16px - 48px */
        gap: clamp(1rem, 3.5vw, 3rem);
    }
    #faq .cs-faq-group {
        margin: 0;
    }
    #faq .cs-cta {
        width: 38.5%;
        max-width: 25.8125rem;
        /* prevents flexbox from squishing it */
        flex: none;
    }
}
/* Dark Mode */
@media only screen and (min-width: 0em) {
    body.dark-mode #faq {
        background-color: transparent;
    }
    body.dark-mode #faq .cs-topper {
        color: var(--primaryLight);
    }
    body.dark-mode #faq .cs-title,
    body.dark-mode #faq .cs-text {
        color: var(--bodyTextColorWhite);
    }
    body.dark-mode #faq .cs-button {
        color: var(--bodyTextColorWhite);
    }
    body.dark-mode #faq .cs-button:before,
    body.dark-mode #faq .cs-button:after {
        background: var(--bodyTextColorWhite);
    }
    body.dark-mode #faq .cs-h3,
    body.dark-mode #faq .cs-item-p {
        color: var(--bodyTextColorWhite);
    }
    body.dark-mode #faq .cs-cta {
        background: var(--medium);
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
document.addEventListener('DOMContentLoaded', function () {
(() => {
	// Configuration
	const CONFIG = {
		BREAKPOINTS: {
			MOBILE: 1023.5,
		},
		SELECTORS: {
			body: "body",
			navigation: "#cs-navigation",
			hamburger: "#cs-navigation .cs-toggle",
			menuWrapper: "#cs-ul-wrapper",
			dropdownToggle: ".cs-dropdown-toggle",
			dropdown: ".cs-dropdown",
			dropdownMenu: ".cs-drop-ul",
			navButton: ".cs-nav-button",
			darkModeToggle: "#dark-mode-toggle",
		},
		CLASSES: {
			active: "cs-active",
			menuOpen: "cs-open",
		},
	};

	// DOM Elements
	const elements = {
		body: document.querySelector(CONFIG.SELECTORS.body),
		navigation: document.querySelector(CONFIG.SELECTORS.navigation),
		hamburger: document.querySelector(CONFIG.SELECTORS.hamburger),
		menuWrapper: document.querySelector(CONFIG.SELECTORS.menuWrapper),
		navButton: document.querySelector(CONFIG.SELECTORS.navButton),
		darkModeToggle: document.querySelector(CONFIG.SELECTORS.darkModeToggle),
	};

	// Utilities
	const isMobile = () => window.matchMedia(\`(max-width: \${CONFIG.BREAKPOINTS.MOBILE}px)\`).matches;

	const toggleAttribute = (element, attribute, value1 = "true", value2 = "false") => {
		if (!element) return;
		const current = element.getAttribute(attribute);
		element.setAttribute(attribute, current === value1 ? value2 : value1);
	};

	const toggleInert = (element) => element && (element.inert = !element.inert);

	// Dropdown Management
	const dropdownManager = {
		close(dropdown, shouldFocus = false) {
			if (!dropdown || !dropdown.classList.contains(CONFIG.CLASSES.active)) return false;

			dropdown.classList.remove(CONFIG.CLASSES.active);
			const button = dropdown.querySelector(CONFIG.SELECTORS.dropdownToggle);
			const menu = dropdown.querySelector(CONFIG.SELECTORS.dropdownMenu);

			if (button) {
				button.setAttribute("aria-expanded", "false");
				shouldFocus && button.focus();
			}

			if (menu) {
				menu.inert = true;
			}

			return true;
		},

		toggle(element) {
			element.classList.toggle(CONFIG.CLASSES.active);
			const button = element.querySelector(CONFIG.SELECTORS.dropdownToggle);
			const menu = element.querySelector(CONFIG.SELECTORS.dropdownMenu);

			button && toggleAttribute(button, "aria-expanded");
			menu && toggleInert(menu);
		},

		closeAll() {
			if (!elements.navigation) return false;
			let closed = false;

			elements.navigation.querySelectorAll(\`\${CONFIG.SELECTORS.dropdown}.\${CONFIG.CLASSES.active}\`).forEach((dropdown) => {
				this.close(dropdown, true);
				closed = true;
			});

			return closed;
		},
	};

	// Menu Management
	const menuManager = {
		toggle() {
			if (!elements.hamburger || !elements.navigation) return;

			const isClosing = elements.navigation.classList.contains(CONFIG.CLASSES.active);

			[elements.hamburger, elements.navigation].forEach((el) => el.classList.toggle(CONFIG.CLASSES.active));
			elements.body.classList.toggle(CONFIG.CLASSES.menuOpen);
			toggleAttribute(elements.hamburger, "aria-expanded");

			// Only manage inert state on mobile devices
			if (elements.menuWrapper && isMobile()) {
				toggleInert(elements.menuWrapper);
			}

			// When closing the mobile menu, also close any open dropdowns
			isClosing && dropdownManager.closeAll();
		},
	};

	// Keyboard Management
	const keyboardManager = {
		handleEscape() {
			if (!elements.navigation) return;

			// Close any open dropdown menus first
			const dropdownsClosed = dropdownManager.closeAll();
			if (dropdownsClosed) return;

			// Then close hamburger menu if open
			if (elements.hamburger && elements.hamburger.classList.contains(CONFIG.CLASSES.active)) {
				menuManager.toggle();
				elements.hamburger.focus();
			}
		},
	};

	// Event Management
	const eventManager = {
		handleDropdownClick(event) {
			if (!isMobile()) return;

			const button = event.target.closest(CONFIG.SELECTORS.dropdownToggle);
			if (!button) return;

			event.preventDefault();
			const dropdown = button.closest(CONFIG.SELECTORS.dropdown);
			if (dropdown) {
				dropdownManager.toggle(dropdown);
			}
		},

		handleDropdownKeydown(event) {
			if (event.key !== "Enter" && event.key !== " ") return;

			const button = event.target.closest(CONFIG.SELECTORS.dropdownToggle);
			if (!button) return;

			event.preventDefault();
			const dropdown = button.closest(CONFIG.SELECTORS.dropdown);
			if (dropdown) {
				dropdownManager.toggle(dropdown);
			}
		},

		handleFocusOut(event) {
			setTimeout(() => {
				if (!event.relatedTarget) return;

				const dropdown = event.target.closest(CONFIG.SELECTORS.dropdown);
				if (dropdown?.classList.contains(CONFIG.CLASSES.active) && !dropdown.contains(event.relatedTarget)) {
					dropdownManager.close(dropdown);
				}
			}, 10);
		},

		handleMobileFocus(event) {
			if (!isMobile() || !elements.navigation.classList.contains(CONFIG.CLASSES.active)) return;
			if (elements.menuWrapper.contains(event.target) || elements.hamburger.contains(event.target)) return;

			menuManager.toggle();
		},

		handleDropdownHover(event) {
			if (isMobile()) return; // Only apply hover behavior on desktop

			const dropdown = event.target.closest(CONFIG.SELECTORS.dropdown);
			if (!dropdown) return;

			const menu = dropdown.querySelector(CONFIG.SELECTORS.dropdownMenu);
			if (!menu) return;

			if (event.type === "mouseenter") {
				menu.inert = false;
			} else if (event.type === "mouseleave") {
				// Only set inert=true if mouse is leaving the entire dropdown area
				// Use setTimeout to allow mouseleave/mouseenter events to complete
				setTimeout(() => {
					// Check if mouse is still over the dropdown or its menu
					if (!dropdown.matches(":hover")) {
						menu.inert = true;
					}
				}, 1);
			}
		},
	};

	// Initialization & Setup
	const init = {
		inertState() {
			if (!elements.menuWrapper) return;

			// On mobile, menu starts closed, so set inert=true
			// On desktop, menu is always visible, so set inert=false
			elements.menuWrapper.inert = isMobile();

			// Initialize dropdown menus - they start closed, so inert=true on all devices
			if (elements.navigation) {
				const dropdownMenus = elements.navigation.querySelectorAll(CONFIG.SELECTORS.dropdownMenu);
				dropdownMenus.forEach((dropdown) => {
					dropdown.inert = true;
				});
			}
		},

		eventListeners() {
			if (!elements.hamburger || !elements.navigation) return;

			// Hamburger menu
			elements.hamburger.addEventListener("click", menuManager.toggle);
			elements.navigation.addEventListener("click", (e) => {
				if (e.target === elements.navigation && elements.navigation.classList.contains(CONFIG.CLASSES.active)) {
					menuManager.toggle();
				}
			});

			// Dropdown delegation
			elements.navigation.addEventListener("click", eventManager.handleDropdownClick);
			elements.navigation.addEventListener("keydown", eventManager.handleDropdownKeydown);
			elements.navigation.addEventListener("focusout", eventManager.handleFocusOut);

			// Desktop hover listeners for inert management
			elements.navigation.addEventListener("mouseenter", eventManager.handleDropdownHover, true);
			elements.navigation.addEventListener("mouseleave", eventManager.handleDropdownHover, true);

			// Global events
			document.addEventListener("keydown", (e) => e.key === "Escape" && keyboardManager.handleEscape());
			document.addEventListener("focusin", eventManager.handleMobileFocus);

			// Resize handling
			window.addEventListener("resize", () => {
				this.inertState();
				if (!isMobile() && elements.navigation.classList.contains(CONFIG.CLASSES.active)) {
					menuManager.toggle();
				}
			});
		},
	};

	// Initialize navigation system
	init.inertState();
	init.eventListeners();
})();

    // faq
    const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
        for (const item of faqItems) {
            const onClick = () => {
            item.classList.toggle('active')
        }
        	item.addEventListener('click', onClick)
        }

}
`;