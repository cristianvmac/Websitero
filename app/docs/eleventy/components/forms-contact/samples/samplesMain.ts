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

/* PAGE-SPECIFIC STYLES FOR THE CONTACT PAGE */

/*-- -------------------------- -->
<---          Contact           -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0em) {
    #cs-contact {
        padding: var(--sectionPadding);
    }

    #cs-contact .cs-container {
        width: 100%;
        max-width: 50rem;
        margin: auto;
    }

    #cs-contact .cs-content {
        width: 100%;
    }

    #cs-contact .cs-topper {
        text-align: left;
        margin-bottom: clamp(0.5rem, 1.4vw, 0.75rem);
    }

    #cs-contact .cs-title {
        text-align: left;
        max-width: 50rem;
    }

    #cs-contact .cs-text {
        text-align: left;
        max-width: clamp(25.25rem, 30vw, 32.625rem);
        margin: 0 auto 0 0;
        margin-bottom: clamp(2.5rem, 6.3vw, 3rem);
    }

    #cs-contact #cs-form {
        margin-bottom: 1.5rem;
    }

    #cs-contact #cs-form label {
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.5em;
        margin-bottom: clamp(0.75rem, 1.3em, 1.25rem);
        color: var(--headerColor);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    #cs-contact #cs-form .cs-label-message {
        margin-bottom: clamp(2rem, 6.3vw, 3rem);
    }

    #cs-contact #cs-form input,
    #cs-contact #cs-form textarea {
        font-size: 1rem;
        width: 100%;
        height: 4rem;
        margin-top: 0.25rem;
        box-sizing: border-box;
        padding-left: 1.25rem;
        border: 1px solid #b4b2c7;
        border-radius: 0.5rem;
        transition: border 0.3s;
    }

    #cs-contact #cs-form input:hover,
    #cs-contact #cs-form textarea:hover {
        border: 1px solid var(--primary);
    }

    #cs-contact #cs-form textarea {
        font-family: inherit;
        min-height: 7.5rem;
        padding-top: 1.25rem;
    }

    #cs-contact #cs-form .cs-button-solid {
        width: 100%;
        border: none;
    }

    #cs-contact .cs-right-section {
        height: 20rem;
        padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 3vw, 2.5rem);
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        position: relative;
        overflow: hidden;
       
    }

    #cs-contact .cs-header {
        font-size: clamp(1rem, 3vw, 1.25rem);
        font-weight: 700;
        line-height: 1.2em;
        margin-bottom: 0.5rem;
        color: var(--bodyTextColorWhite);
        display: block;
    }

    #cs-contact .cs-link {
        font-size: clamp(1rem, 3vw, 1.25rem);
        line-height: 1.2em;
        text-decoration: none;
        margin-bottom: 1.25rem;
        color: var(--bodyTextColorWhite);
        display: block;
        position: relative;
    }

    #cs-contact .cs-link:before {
        content: "";
        width: 0%;
        height: 2px;
        background: currentColor;
        opacity: 1;
        display: block;
        position: absolute;
        bottom: -0.125rem;
        left: 0;
        transition: width 0.3s;
    }

    #cs-contact .cs-link:hover:before {
        width: 100%;
    }

    #cs-contact .cs-link:last-of-type {
        margin-bottom: 0;
    }

    #cs-contact .cs-block {
        display: block;
    }

    #cs-contact .cs-bg-picture {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: transform 0.6s;
        
    }

    #cs-contact .cs-bg-picture:before {
        content: "";
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    #cs-contact .cs-bg-picture img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        /*transform: translateY(1rem); */
    }
}

/* Tablet - 700px */
@media only screen and (min-width: 43.75em) {
    #cs-contact #cs-form {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    #cs-contact #cs-form label {
        width: 48%;
    }

    #cs-contact #cs-form .cs-label-message {
        width: 100%;
    }
}

/* Small Desktop - 1024px */
@media only screen and (min-width: 64em) {
    #cs-contact .cs-container {
        max-width: 80rem;
        display: flex;
        justify-content: flex-end;
        align-items: stretch;
        gap: 5rem;
    }

    #cs-contact #cs-form {
        max-width: 39.375rem;
        margin-bottom: 0;
    }

    #cs-contact #cs-form label {
        width: 100%;
    }

    #cs-contact .cs-right-section {
        width: 40%;
        max-width: 33.875rem;
        height: auto;
        min-height: 42.875rem;
        flex: none;
    }

    #cs-contact .cs-right-section:hover .cs-bg-picture {
        transform: scale(1.1);
    }

    #cs-contact .cs-block {
        display: inline-block;
    }
}

/* Small Desktop - 1300px */
@media only screen and (min-width: 81.25em) {
    #cs-contact #cs-form {
        column-gap: 0;
    }

    #cs-contact #cs-form label {
        width: 48%;
        max-width: 19.0625rem;
    }

    #cs-contact #cs-form .cs-label-message {
        max-width: 100%;
    }

    #cs-contact .cs-right-section {
        min-height: 36.125rem;
    }
}

/* Dark Mode */
@media only screen and (min-width: 0em) {
    body.dark-mode #cs-contact .cs-text,
    body.dark-mode #cs-contact .cs-title {
        color: var(--bodyTextColorWhite);
    }

    body.dark-mode #cs-contact .cs-topper {
        color: var(--primaryLight);
    }

    body.dark-mode #cs-contact #cs-form label,
    body.dark-mode #cs-contact #cs-form input,
    body.dark-mode #cs-contact #cs-form textarea {
        color: var(--bodyTextColorWhite);
        background-color: transparent;
    }

    body.dark-mode #cs-contact #cs-form label::placeholder,
    body.dark-mode #cs-contact #cs-form input::placeholder,
    body.dark-mode #cs-contact #cs-form textarea::placeholder {
        filter: brightness(1.4);
    }

    body.dark-mode #cs-contact .cs-bg-picture {
        background-color: #000;
    }

    body.dark-mode #cs-contact .cs-bg-picture img {
        opacity: 0.5;
    }
}

`;

export const sampleHtml = `


<!-- ============================================ -->
<!--                   Contact                    -->
<!-- ============================================ -->

<section id="cs-contact">
		<div class="cs-container">
			<form id="cs-form" name="Contact Form" method="post">
				<div class="cs-content">
					<span class="cs-topper">Contact</span>
					<h2 class="cs-title">Get in Touch</h2>
					<p class="cs-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ridiculus elementum ullamcorper ipsum porttitor aliquam. Id magna urna ultrices odio pulvinar. Sed ut.</p>
				</div>
				<label>
					Name
					<input required type="text" id="name" name="name" placeholder="Name" />
				</label>
				<label>
					Email
					<input required type="text" id="email" name="email" placeholder="Email" />
				</label>
				<label>
					Phone
					<input required type="text" id="phone" name="phone" placeholder="Phone" />
				</label>
				<label>
					How Did You Find Us
					<input type="text" id="find" name="find-us" placeholder="How did you find us?" />
				</label>
				<label class="cs-label-message">
					Message
					<textarea required name="Message" id="message" placeholder="Write message..."></textarea>
				</label>
				<button class="cs-button-solid" type="submit">Submit Message</button>
			</form>
			<div class="cs-right-section">
				<!--Email-->
				<span class="cs-header">Email</span>
				<a class="cs-link" href="mailto:{{ client.email }}">{{ client.email }}</a>
				<!--Phone-->
				<span class="cs-header">Phone</span>
				<a class="cs-link" href="tel:{{ client.phoneForTel }}">{{ client.phoneFormatted }}</a>
				<!--Address-->
				<span class="cs-header">Address</span>
				<a class="cs-link" href="{{ client.address.mapLink }}">
					 {{ client.address.lineOne }},
					<br />
					  {{ client.address.lineTwo }},
					<br />
					<span class="cs-block">
						{{ client.address.city }}
						{{ client.address.state }}
						{{ client.address.zip }}
					</span>
				</a>

				<!-- Background Image-->
                <picture class="cs-bg-picture">
          		    <source media="(max-width: 600px)" srcset="/assets/images/contact/contact.webp">
          		    <source media="(min-width: 601px)" srcset="/assets/images/contact/contact.webp">
          		    <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/contact/contact.webp" alt="commercial fit-out" width="275" height="132">
      		    </picture>
			</div>
		</div>
	</section>

`;

export const sampleJs = `

`;