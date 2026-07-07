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
    letter-spacing: .1em;
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
  
`;

export const sampleHtml = `
<!-- ============================================ -->
<!--                   Contact                    -->
<!-- ============================================ -->

<section id="contact-24">
    <div class="cs-container">
        <div class="cs-content">
            <div class="cs-content-group">
                <span class="cs-topper">Get in Touch</span>
                <h2 class="cs-title">Book Your Yoga Session</h2>
                <p class="cs-text">
                    Ready to stretch and relax? Contact Yoga Studio today to reserve your spot and discover the benefits of mindfulness and movement.
                </p>
            </div>
            <ul class="cs-card-group">
                <li class="cs-item">
                    <img class="cs-icon" loading="lazy" decoding="async" src="https://nyc3.digitaloceanspaces.com/csimages2/Images/Icons/orange-phone.svg" alt="icon" width="120" height="120">
                    <div class="cs-flex-group">
                        <h3 class="cs-header">Phone</h3>
                        <a class="cs-link" href="tel:(345) 987-6543">
                            (555) 987-6543
                        </a>
                    </div>
                </li>
                <li class="cs-item">
                    <img class="cs-icon" loading="lazy" decoding="async" src="https://nyc3.digitaloceanspaces.com/csimages2/Images/Icons/orange-pin.svg" alt="icon" width="120" height="120">
                    <div class="cs-flex-group">
                        <h3 class="cs-header">Location</h3>
                        <a class="cs-link" href="" target="_blank">
                            Portland, OR
                        </a>
                    </div>
                </li>
                <li class="cs-item">
                    <img class="cs-icon" loading="lazy" decoding="async" src="https://nyc3.digitaloceanspaces.com/csimages2/Images/Icons/orange-message.svg" alt="icon" width="120" height="120">
                    <div class="cs-flex-group">
                        <h3 class="cs-header">Email</h3>
                        <a class="cs-link" href="mailto:info@yoga-studio.com">
                            info@yoga-studio.com
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="cs-group">
            <picture class="cs-picture">
                <!--Mobile Image-->
                <source media="(max-width: 600px)" srcset="./yoga.jpg">
                <!--Tablet and above Image-->
                <source media="(min-width: 601px)" srcset="./yoga.jpg">
                <img loading="lazy" decoding="async" src="./yoga.jpg" alt="yoga class" width="630" height="300">
            </picture>
            <!--Form-->
            <form class="cs-form" id="cs-form-5401" name="Yoga Contact Form" method="post">
                <label class="cs-label">
                    <input class="cs-input cs-name" required type="text" id="name-5401" name="name" placeholder="Full Name">
                </label>
                <label class="cs-label cs-email">
                    <input class="cs-input" required type="email" id="email-5401" name="email" placeholder="Email">
                </label>
                <label class="cs-label cs-phone">
                    <input class="cs-input" required type="number" id="phone-5401" name="phone" placeholder="Phone">
                </label>
                <label class="cs-label">
                    <select class="cs-input" required id="session-5401" name="session">
                        <option value="" disabled selected>Select Session</option>
                        <option value="morning">Morning Flow</option>
                        <option value="afternoon">Afternoon Stretch</option>
                        <option value="evening">Evening Relaxation</option>
                    </select>
                </label>
                <label class="cs-label">
                    <textarea class="cs-input cs-textarea" required name="message" id="message-5401" placeholder="Write any message..."></textarea>
                </label>
                <p class="cs-button-wrapper">
                    <button class="cs-button-solid cs-submit" type="submit">Book Now</button>
                </p>
            </form>
        </div>
    </div>
</section>    
`;

export const sampleCss = `
       /*-- -------------------------- -->
<---          Contact           -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #contact-24 {
    padding: var(--sectionPadding);
    position: relative;
    z-index: 1;
  }
  #contact-24 .cs-container {
    width: 100%;
    /* changes to 1280px at desktop */
    max-width: 44rem;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    column-gap: 1rem;
    /* chnages to 64px at desktop */
    row-gap: 1rem;
    position: relative;
  }
  #contact-24 .cs-content {
    text-align: left;
    width: 100%;
    display: contents;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 3rem;
  }
  #contact-24 .cs-group {
    display: contents;
  }
  #contact-24 .cs-topper {
    color: var(--secondary);
  }
  #contact-24 .cs-title {
    max-width: 12ch;
  }
  #contact-24 .cs-text {
    margin-bottom: 1rem;
  }
  #contact-24 .cs-text:last-of-type {
    margin-bottom: 0;
  }
  #contact-24 .cs-content-group,
  #contact-24 .cs-card-group,
  #contact-24 .cs-picture,
  #contact-24 .cs-form {
    grid-column: span 12;
  }
  #contact-24 .cs-picture {
    width: 100%;
    height: 100vw;
    /* temporary margin, removing at tablet */
    margin: 2rem 0;
    border-radius: 1rem;
    /* clips image corners */
    overflow: hidden;
    display: block;
    position: relative;
  }
  #contact-24 .cs-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  #contact-24 .cs-contact-text {
    font-size: 1rem;
    line-height: 1.5em;
    text-align: left;
    margin: 0 0 1.5rem;
    color: var(--bodyTextColor);
  }
  #contact-24 .cs-card-group {
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
  }
  #contact-24 .cs-item {
    width: 100%;
    text-align: center;
    list-style: none;
    margin: 0;
    /* 16px - 20px */
    padding: clamp(1rem, 3vw, 1.25rem);
    border-radius: 1rem;
    gap: 1.5rem;
    background-color: #fdf9f4;
    /* prevents padding and border from affecting height and width */
    box-sizing: border-box;
    grid-column: span 12;
    grid-row: span 1;
    display: flex;
    row-gap: 2.875rem;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    z-index: 1;
  }
  #contact-24 .cs-icon {
    /* 48px - 72px */
    height: clamp(3rem, 6vw, 4.5rem);
    width: auto;
    display: block;
  }
  #contact-24 .cs-flex-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  #contact-24 .cs-header {
    font-weight: bold;
    color: var(--headerColor);
    margin: 0;
  }
  #contact-24 .cs-link {
    font-size: var(--bodyFontSize);
    line-height: 1.5em;
    max-width: 28.125rem;
    margin: 0;
    padding: 0;
    color: var(--bodyTextColor);
    text-decoration: none;
  }
  #contact-24 .cs-form {
    width: 100%;
    /* 24px - 48px top and bottom */
    /* 16px - 32px left and right */
    padding: clamp(1.5rem, 5.18vw, 3rem) clamp(1rem, 4vw, 2rem);
    /* prevents flexbox from affecting height and width */
    box-sizing: border-box;
    background-color: #fdf9f4;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
  }
  #contact-24 .cs-label {
    /* 14px - 16px */
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    width: 100%;
    color: var(--headerColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    grid-column: span 12;
    gap: 0.25rem;
  }
  #contact-24 .cs-input {
    font-size: 1rem;
    width: 100%;
    height: 3.5rem;
    padding: 0;
    padding-left: 1.5rem;
    color: var(--headerColor);
    background-color: #faf2e9;
    border-radius: 0.5rem;
    border: none;
    /* prevents padding from adding to height and width */
    box-sizing: border-box;
  }
  #contact-24 .cs-input::placeholder {
    color: #4c4a48;
  }
  #contact-24 .cs-textarea {
    min-height: 7.5rem;
    padding-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-family: inherit;
  }
  #contact-24 .cs-button-wrapper {
    margin: 0;
    grid-column: span 12;
  }
  #contact-24 .cs-button-solid {
    font-size: 1rem;
    /* 46px - 56px */
    line-height: clamp(2.875em, 5.5vw, 3.5em);
    text-decoration: none;
    font-weight: 700;
    text-align: center;
    margin: 0;
    color: #1a1a1a;
    border: none;
    min-width: 9.375rem;
    padding: 0 1.5rem;
    background-color: var(--secondary);
    border-radius: 0.25rem;
    overflow: hidden;
    display: inline-block;
    position: relative;
    z-index: 1;
    /* prevents padding from adding to the width */
    box-sizing: border-box;
    transition: color 0.3s;
  }
  #contact-24 .cs-button-solid:before {
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
  #contact-24 .cs-button-solid:hover {
    color: #fff;
  }
  #contact-24 .cs-button-solid:hover:before {
    width: 100%;
  }
  #contact-24 .cs-submit {
    width: auto;
    border-radius: 0.5rem;
  }
  #contact-24 .cs-submit:hover {
    cursor: pointer;
  }
}

/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #contact-24 .cs-content {
    flex-direction: row;
    align-items: stretch;
  }
  #contact-24 .cs-content-group {
    /* temporary padding bottom for tablet */
    padding-bottom: 4.875rem;
    align-self: flex-start;
    grid-column: span 6;
  }
  #contact-24 .cs-card-group {
    margin-top: 2rem;
  }
  #contact-24 .cs-item {
    flex-direction: row;
    grid-column: span 6;
  }
  #contact-24 .cs-item:last-of-type {
    grid-column: span 12;
  }
  #contact-24 .cs-label {
    grid-column: span 6;
  }
  #contact-24 .cs-label:last-of-type {
    grid-column: span 12;
  }
  #contact-24 .cs-picture {
    max-width: 32.625rem;
    min-height: 16.25rem;
    height: auto;
    max-height: 100%;
    margin: 0;
    flex: none;
    grid-column: 7 / span 6;
    grid-row: 1;
  }
}

/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
  #contact-24 .cs-container {
    max-width: 80rem;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 4rem;
  }
  #contact-24 .cs-content {
    width: 100%;
    flex-direction: row;
    height: auto;
    display: flex;
    justify-content: space-between;
    /* 40px - 64px */
    gap: clamp(2.5rem, 5vw, 4rem);
  }
  #contact-24 .cs-content-group {
    width: 100%;
    max-width: 32.625rem;
    padding-bottom: 0;
  }
  #contact-24 .cs-group {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    /* 40px - 64px */
    gap: clamp(2.5rem, 5vw, 4rem);
  }
  #contact-24 .cs-card-group {
    width: 49vw;
    max-width: 43.375rem;
    margin: 0;
    flex: none;
  }
  #contact-24 .cs-form {
    width: 49vw;
    max-width: 43.375rem;
    flex: none;
  }
  #contact-24 .cs-label {
    grid-column: span 6;
  }
  #contact-24 .cs-label:last-of-type {
    grid-column: span 12;
  }
  #contact-24 .cs-submit {
    width: auto;
    grid-column: span 6;
  }
  #contact-24 .cs-picture {
    width: 100%;
    max-width: 32.625rem;
    height: auto;
    flex: auto;
  }
}

/* Large Desktop - 1300px */
@media only screen and (min-width: 81.25rem) {
  #contact-24 .cs-card-group {
    align-self: flex-end;
  }
  #contact-24 .cs-item {
    grid-column: span 4;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  #contact-24 .cs-item:last-of-type {
    grid-column: span 4;
  }
}
   
`;

export const sampleJs = `

`;