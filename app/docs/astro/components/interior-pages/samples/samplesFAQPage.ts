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
<!--                    FAQ                       -->
<!-- ============================================ -->

<section id="faq-17">
    <div class="cs-container">
        <div class="cs-content">
            <span class="cs-topper">Support</span>
            <h2 class="cs-title">Common Questions About Our Services</h2>
        </div>
        <div class="cs-flex-group">
            <div class="cs-button-group">
                <div class="cs-flex">
                    <button class="cs-option" data-filter="one">
                        <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/plus.svg" alt="plus graphic" width="12" height="12" decoding="async" aria-hidden="true">
                        Getting Started
                    </button>
                    <button class="cs-option" data-filter="two">
                        <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/plus.svg" alt="plus graphic" width="12" height="12" decoding="async" aria-hidden="true">
                        Scheduling & Availability
                    </button>
                    <button class="cs-option" data-filter="three">
                        <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/plus.svg" alt="plus graphic" width="12" height="12" decoding="async" aria-hidden="true">
                        Pricing & Payments
                    </button>
                    <button class="cs-option" data-filter="four">
                        <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/plus.svg" alt="plus graphic" width="12" height="12" decoding="async" aria-hidden="true">
                        Service Details
                    </button>
                    <button class="cs-option" data-filter="five">
                        <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Graphics/plus.svg" alt="plus graphic" width="12" height="12" decoding="async" aria-hidden="true">
                        Ongoing Support
                    </button>
                </div>
                <picture class="cs-picture">
                    <!--Mobile Image-->
                    <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=600&auto=format&fit=crop">
                    <!--Tablet and above Image-->
                    <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1000&auto=format&fit=crop">
                    <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1000&auto=format&fit=crop" alt="customer support representative assisting client" width="353" height="493">
                </picture>
            </div>

            <div class="cs-wrapper">

                <ul class="cs-faq-group" data-category="one">
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                How do I get started with your services?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            Getting started is simple. Schedule an initial consultation through our website, and we’ll discuss your goals, timeline, and specific needs. After that, we’ll provide a customized plan outlining the next steps.
                        </p>
                    </li>
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                Is there a minimum commitment required?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            We offer flexible options depending on the service you choose. Some programs are month-to-month, while others may offer discounted rates for longer commitments.
                        </p>
                    </li>
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                Do you offer consultations before signing up?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            Yes, we provide an introductory consultation so you can learn more about our approach and determine if we’re the right fit for your needs.
                        </p>
                    </li>
                </ul>

                <ul class="cs-faq-group cs-hidden" data-category="two">
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                What are your business hours?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            Our standard hours are Monday through Friday, 9 AM to 6 PM. Extended hours may be available upon request depending on availability.
                        </p>
                    </li>
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                Can I reschedule an appointment?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            Absolutely. We ask that you provide at least 24 hours’ notice to avoid cancellation fees and to allow us to accommodate other clients.
                        </p>
                    </li>
                </ul>

                <ul class="cs-faq-group cs-hidden" data-category="three">
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                What payment methods do you accept?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            We accept major credit cards, debit cards, and secure online payments. Invoices are sent electronically for your convenience.
                        </p>
                    </li>
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                Are there any hidden fees?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            No. We provide transparent pricing upfront so you know exactly what to expect before committing to any service.
                        </p>
                    </li>
                </ul>

                <ul class="cs-faq-group cs-hidden" data-category="four">
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                What makes your service different?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            Our approach is personalized and results-driven. We tailor every solution to your specific goals rather than using a one-size-fits-all model.
                        </p>
                    </li>
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                Do you customize plans for each client?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            Yes. Every client receives a strategy designed around their unique objectives, challenges, and timeline.
                        </p>
                    </li>
                </ul>

                <ul class="cs-faq-group cs-hidden" data-category="five">
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                Will I receive ongoing support?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            Yes, we provide continuous guidance, progress tracking, and regular check-ins to ensure you stay on track and achieve measurable results.
                        </p>
                    </li>
                    <li class="cs-faq-item">
                        <button class="cs-button">
                            <span class="cs-button-text">
                                How can I contact support?
                            </span>
                        </button>
                        <p class="cs-item-p">
                            You can reach our support team via email or through the contact form on our website. We strive to respond to all inquiries within one business day.
                        </p>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</section>       
`;

export const sampleCss = `
       /*-- -------------------------- -->
<---            FAQ             -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #faq-17 {
    padding: var(--sectionPadding);
    position: relative;
  }
  #faq-17 .cs-container {
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
  #faq-17 .cs-content {
    /* set text align to left if content needs to be left aligned */
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* centers content horizontally, set to flex-start to left align */
    align-items: flex-start;
  }
  #faq-17 .cs-title {
    margin: 0;
  }
  #faq-17 .cs-flex-group {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    /* 16px - 20px */
    gap: clamp(1rem, 2.3vw, 1.25rem);
    position: relative;
  }
  #faq-17 .cs-wrapper {
    width: 100%;
    position: relative;
  }
  #faq-17 .cs-button-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* 16px - 20px */
    gap: clamp(1rem, 2.5vw, 1.25rem);
    /* prevents flexbox from squishing it */
    flex: none;
  }
  #faq-17 .cs-flex {
    width: 100%;
    /* 24px - 32px */
    padding: clamp(1.5rem, 3vw, 2rem);
    background-color: #F7F7F7;
    display: flex;
    flex-direction: column;
    order: 3;
    gap: 1.25rem;
  }
  #faq-17 .cs-option {
    /* 16px - 20px */
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.2em;
    font-weight: 700;
    padding: 0;
    color: var(--bodyTextColor);
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    z-index: 1;
    transition: color .3s;
  }
  #faq-17 .cs-option:hover {
    color: var(--primary);
    cursor: pointer;
  }
  #faq-17 .cs-option.cs-active {
    color: var(--primary);
  }
  #faq-17 .cs-picture {
    width: 100%;
    /* 328px - 450px */
    height: clamp(20.5rem, 30vw, 28.125rem);
    /* 16px - 20px */
    margin: 0 0 clamp(1rem, 2.4vw, 1.25rem);
    order: 2;
    position: relative;
    z-index: 1;
  }
  #faq-17 .cs-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  #faq-17 .cs-faq-group {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    order: 3;
    gap: 0.5rem;
    transition: transform 0.7s,
                opacity 0.3s,
                visibility 0.5s,
                top 0.3s,
                left 0.3s;
    /* makes the transfrom scaling orgin the top left corner, dictates the direction by which the scale transforms animate towards */
    transform-origin: top;
    transform-style: preserve-3d;
    perspective: 900px;
  }
  #faq-17 .cs-faq-group.cs-hidden {
    /* by using visibility:hidden instead of display:none, we can see the animations from the opacity and transforms, display:none won't render animations. */
    visibility: hidden;
    /* prevents the mouse from interacting with it */
    pointer-events: none;
    /* hidden galleries have a 0 opacity, and we animate the opacity to 1 when they become active */
    opacity: 0;
    /* this top and left value help control the animation, by setting it to position absolute and left 0, the FAQ won't fly off screen to the left, it will stop its position to be at the left edge of the .cs-flex-group (left: 0). Same for the bottom:0 value, the FAQ won't go past that position when it animates */
    top: 0;
    left: 0;
    position: absolute;
    /* prevents the hidden galleries from overflowing the section, and makes a nice animations to transition to and from */
    transform: scaleY(0);
  }
  #faq-17 .cs-faq-group.cs-hidden .cs-faq-item {
    transform: rotateX(270deg);
    opacity: 0;
  }
  #faq-17 .cs-faq-item {
    list-style: none;
    width: 100%;
    /* clips all corners of the button that overlap the rounded border */
    overflow: hidden;
    opacity: 1;
    top: 0;
    transform: rotateX(0deg);
    transition: transform 0.6s,
                opacity 0.3s;
  }
  #faq-17 .cs-faq-item:nth-of-type(2) {
    transition-delay: 0.1s;
  }
  #faq-17 .cs-faq-item:nth-of-type(3) {
    transition-delay: 0.2s;
  }
  #faq-17 .cs-faq-item:nth-of-type(4) {
    transition-delay: 0.3s;
  }
  #faq-17 .cs-faq-item:nth-of-type(5) {
    transition-delay: 0.4s;
  }
  #faq-17 .cs-faq-item:nth-of-type(6) {
    transition-delay: 0.5s;
  }
  #faq-17 .cs-faq-item:nth-of-type(7) {
    transition-delay: 0.6s;
  }
  #faq-17 .cs-faq-item:nth-of-type(8) {
    transition-delay: 0.7s;
  }
  #faq-17 .cs-faq-item:nth-of-type(9) {
    transition-delay: 0.8s;
  }
  #faq-17 .cs-faq-item:nth-of-type(10) {
    transition-delay: 0.9s;
  }
  #faq-17 .cs-faq-item.active .cs-button {
    color: var(--primary);
  }
  #faq-17 .cs-faq-item.active .cs-button:before {
    background-color: var(--primary);
    transform: rotate(315deg);
  }
  #faq-17 .cs-faq-item.active .cs-button:after {
    background-color: var(--primary);
    transform: rotate(-315deg);
  }
  #faq-17 .cs-faq-item.active .cs-item-p {
    height: auto;
    /* 20px - 24px bottom */
    /* 16px - 24px left & right */
    padding: 0 clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 1.3vw, 1.5rem);
    opacity: 1;
  }
  #faq-17 .cs-button {
    /* 16px - 20px */
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.2em;
    text-align: left;
    font-weight: bold;
    /* 16px - 24px top & bottom */
    /* 16px - 20px left & right */
    padding: clamp(1rem, 2vw, 1.5rem) clamp(1rem, 2vw, 1.25rem);
    background-color: #f7f7f7;
    border: none;
    color: var(--headerColor);
    display: block;
    width: 100%;
    position: relative;
    transition: background-color 0.3s, color 0.3s;
  }
  #faq-17 .cs-button:hover {
    cursor: pointer;
  }
  #faq-17 .cs-button:before {
    /* left line */
    content: "";
    width: 0.5rem;
    height: 0.125rem;
    background-color: var(--headerColor);
    opacity: 1;
    border-radius: 50%;
    position: absolute;
    display: block;
    top: 50%;
    right: 1.5rem;
    transform: rotate(45deg);
    /* animate the transform from the left side of the x axis, and the center of the y */
    transform-origin: left center;
    transition: transform 0.5s;
  }
  #faq-17 .cs-button:after {
    /* right line */
    content: "";
    width: 0.5rem;
    height: 0.125rem;
    background-color: var(--headerColor);
    opacity: 1;
    border-radius: 50%;
    position: absolute;
    display: block;
    top: 50%;
    right: 1.3125rem;
    transform: rotate(-45deg);
    /* animate the transform from the right side of the x axis, and the center of the y */
    transform-origin: right center;
    transition: transform 0.5s;
  }
  #faq-17 .cs-button-text {
    width: 80%;
    display: block;
  }
  #faq-17 .cs-item-p {
    /* 14px - 16px */
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    line-height: 1.5em;
    width: 100%;
    height: 0;
    margin: 0;
    /* 16px - 24px */
    padding: 0 clamp(1rem, 2vw, 1.5rem);
    opacity: 0;
    background-color: #f7f7f7;
    color: var(--bodyTextColor);
    /* clips the text so it doesn't show up */
    overflow: hidden;
    transition: opacity 0.3s, padding-bottom 0.3s;
  }
}
/* Inbetween - 600px */
@media only screen and (min-width: 37.5rem) {
  #faq-17 .cs-button-group {
    width: 80%;
    max-width: 22.0625rem;
    flex-direction: row;
    align-items: stretch;
    flex: none;
  }
  #faq-17 .cs-content {
    width: 100%;
  }
  #faq-17 .cs-picture {
    /* 300px - 493px */
    min-height: clamp(18.75rem, 30vw, 30.8125rem);
    margin: 0;
    height: 100%;
    flex: none;
    order: 3;
  }
}
/* Desktop - 1024px */
@media only screen and (min-width: 48rem) {
  #faq-17 .cs-flex-group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    /* 20px - 80px */
    column-gap: clamp(1.25rem, 3vw, 5rem);
  }
  #faq-17 .cs-button-group {
    flex-direction: column;
    flex: auto;
  }
  #faq-17 .cs-picture {
    max-height: 31.25rem;
  }
}
                   
`;

export const sampleJs = `
  document.addEventListener('DOMContentLoaded', function () {
            const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
        for (const item of faqItems) {
            const onClick = () => {
            item.classList.toggle('active')
        }
        item.addEventListener('click', onClick)
        }

        class FAQFilter {
        filtersSelector = '.cs-option'
        FAQselector = '.cs-faq-group'
        activeClass = 'cs-active'
        hiddenClass = 'cs-hidden'

        constructor() {
            const $filters = document.querySelectorAll(this.filtersSelector)
            this.$activeFilter = $filters[0]
            this.$images = document.querySelectorAll(this.FAQselector)

            this.$activeFilter.classList.add(this.activeClass)

            for (const $filter of $filters) {
            $filter.addEventListener('click', () => this.onClick($filter))
            }
        }

        onClick($filter) {
            this.filter($filter.dataset.filter)

            const { activeClass } = this

            this.$activeFilter.classList.remove(activeClass)
            $filter.classList.add(activeClass)

            this.$activeFilter = $filter
        }

        filter(filter) {
            const showAll = filter == 'all'
            const { hiddenClass } = this

            for (const $image of this.$images) {
            const show = showAll || $image.dataset.category == filter
            $image.classList.toggle(hiddenClass, !show)
            }
        }
        }

        new FAQFilter()
                                
        });
`;