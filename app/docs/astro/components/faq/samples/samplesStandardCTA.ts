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
<section id="faq-443">
    <div class="cs-container">
        <div class="cs-content">
            <span class="cs-topper">FAQ</span>
            <h2 class="cs-title">Online Fitness Coaching FAQs</h2>

            <ul class="cs-faq-group">
                
                <li class="cs-faq-item active">
                    <button class="cs-button">
                        <span class="cs-button-text">
                            How do I get started with an online coaching program?
                        </span>
                    </button>
                    <p class="cs-item-p">
                        After signing up, you’ll complete a short fitness and lifestyle assessment. Based on your goals, we create a personalized workout and nutrition plan accessible through your dashboard.
                    </p>
                </li>

                <li class="cs-faq-item">
                    <button class="cs-button">
                        <span class="cs-button-text">
                            Do I need a gym membership to follow your programs?
                        </span>
                    </button>
                    <p class="cs-item-p">
                        Not necessarily. We offer home-based, gym-based, and hybrid training plans. Your program will be customized based on the equipment you have access to.
                    </p>
                </li>

                <li class="cs-faq-item">
                    <button class="cs-button">
                        <span class="cs-button-text">
                            How often will I communicate with my coach?
                        </span>
                    </button>
                    <p class="cs-item-p">
                        You’ll receive weekly check-ins, progress tracking, and direct messaging support. Premium members also get live monthly video consultations.
                    </p>
                </li>

                <li class="cs-faq-item">
                    <button class="cs-button">
                        <span class="cs-button-text">
                            Can beginners join the program?
                        </span>
                    </button>
                    <p class="cs-item-p">
                        Absolutely. Our programs are designed for all fitness levels, from complete beginners to advanced athletes. We adjust intensity and progression to match your experience.
                    </p>
                </li>

                <li class="cs-faq-item">
                    <button class="cs-button">
                        <span class="cs-button-text">
                            What if I’m not satisfied with the program?
                        </span>
                    </button>
                    <p class="cs-item-p">
                        We offer a 14-day satisfaction guarantee. If you’re not happy with your experience, contact our support team for assistance or a refund review.
                    </p>
                </li>

            </ul>
        </div>

        <div class="cs-floating-box" aria-hidden="true"></div>
    </div>

</section>

<!-- ============================================ -->
<!--                     CTA                      -->
<!-- ============================================ -->

<section id="cta-443">
    <div class="cs-wrapper">
        <div class="cs-container">
            <div class="cs-content">
                <span class="cs-topper">Get Quote</span>
                <h2 class="cs-title">Start Your Training Today</h2>
                <p class="cs-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                </p>
            </div>
            <a href="" class="cs-cta">
                <!--Arrow Right-->
                <svg class="cs-arrow" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none"><path fill="#FAFBFC" d="M24.55 31.367c-.317 0-.633-.117-.883-.367a1.258 1.258 0 0 1 0-1.767L32.9 20l-9.233-9.233a1.258 1.258 0 0 1 0-1.767 1.258 1.258 0 0 1 1.766 0L35.55 19.117a1.258 1.258 0 0 1 0 1.766L25.433 31c-.25.25-.566.367-.883.367Z"/><path fill="#FAFBFC" d="M34.383 21.25H6.333A1.26 1.26 0 0 1 5.083 20c0-.683.567-1.25 1.25-1.25h28.05c.684 0 1.25.567 1.25 1.25a1.26 1.26 0 0 1-1.25 1.25Z"/></svg>
                <!--Wrapped in a span so it can be animated-->
                <span class="cs-cta-text">Get Free<br> Quote</span>
            </a>
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
    #faq-443 {
        background: #14142b;
    }
    #faq-443 .cs-container {
        width: 100%;
        /* changes to 1312px at tablet (1280px + 32px padding) */
        max-width: 34.375em;
        margin: auto;
        padding: var(--sectionPadding);
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* 40px - 48px */
        gap: clamp(2.5rem, 5vw, 3rem);
    }
    #faq-443 .cs-picture {
        display: none;
    }
    #faq-443 .cs-content {
        text-align: left;
        max-width: 52.5rem;
    }

    #faq-443 .cs-title {
        /* 40px - 60px */
        margin: 0 0 clamp(2.5rem, 1vw, 3.75rem) 0;
        color: var(--bodyTextColorWhite);
    }
    #faq-443 .cs-faq-group {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
    }
    #faq-443 .cs-faq-item {
        list-style: none;
        width: 100%;
        border-radius: 0.5rem;
        background-color: rgba(250, 251, 252, 0.1);
        border-bottom: 0px solid var(--primary);
        transition: border 0.1s;
    }
    #faq-443 .cs-faq-item.active {
        border-bottom: 4px solid var(--primary);
    }
    #faq-443 .cs-faq-item.active .cs-button:before {
        transform: translateY(-50%) rotate(180deg);
        opacity: 0;
    }
    #faq-443 .cs-faq-item.active .cs-button:after {
        transform: translateY(-50%) rotate(360deg);
    }
    #faq-443 .cs-faq-item.active .cs-item-p {
        height: auto;
        /* 20px - 24px bottom */
        /* 16px - 24px left & right */
        padding: 0 clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 1.3vw, 1.5rem);
        opacity: 1;
    }
    #faq-443 .cs-button {
        /* 16px - 20px */
        font-size: clamp(1rem, 1.8vw, 1.25rem);
        line-height: 1.2em;
        text-align: left;
        font-weight: bold;
        /* 12px - 24px top & bottom */
        /* 16px - 24px top & bottom */
        padding: clamp(0.75rem, 1.9vw, 1.5rem) clamp(1rem, 1.9vw, 1.5rem);
        border: none;
        background: transparent;
        color: var(--bodyTextColorWhite);
        display: block;
        width: 100%;
        position: relative;
        transition:
            background-color 0.3s,
            color 0.3s;
    }
    #faq-443 .cs-button:hover {
        cursor: pointer;
    }
    #faq-443 .cs-button:before {
        /* horizontal line */
        content: "";
        width: 0.75rem;
        height: 0.1875rem;
        background-color: #fff;
        opacity: 1;
        border-radius: 3px;
        position: absolute;
        display: block;
        top: 50%;
        right: 1.5rem;
        transform: translateY(-50%);
        transition:
            transform 0.5s,
            opacity 0.3s;
    }
    #faq-443 .cs-button:after {
        /* vertical line */
        content: "";
        width: 0.75rem;
        height: 0.1875rem;
        background-color: #fff;
        opacity: 1;
        border-radius: 3px;
        position: absolute;
        display: block;
        top: 50%;
        right: 1.5rem;
        transform: translateY(-50%) rotate(90deg);
        transform-origin: center;
        transition: transform 0.5s;
    }
    #faq-443 .cs-button-text {
        width: 90%;
        display: block;
    }
    #faq-443 .cs-item-p {
        /* 14px - 16px */
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.5em;
        width: 85%;
        max-width: 37.5rem;
        height: 0;
        margin: 0;
        /* 16px - 24px */
        padding: 0 clamp(1rem, 2vw, 1.5rem);
        opacity: 0;
        color: #b4b2c7;
        /* clips the text so it doesn't show up */
        overflow: hidden;
        transition:
            opacity 0.3s,
            padding-bottom 0.3s;
    }
    #faq-443 .cs-floating-box {
        display: none;
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
    #faq-443 {
        position: relative;
        /* clips the image and grey box so it doesn't cause overflow issues */
        overflow: hidden;
    }
    #faq-443 .cs-container {
        max-width: 82rem;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        position: relative;
    }
    #faq-443 .cs-content {
        /* changes at desktop */
        width: 60vw;
    }
    #faq-443 .cs-picture {
        width: auto;
        height: auto;
        display: flex;
        justify-content: center;
        /* makes sure image is always set to the bottom of the picture element */
        align-items: flex-end;
        position: absolute;
        bottom: 0;
        /* -64px - -164px, wrapped in calc function to multiply clamp value by -1 */
        right: calc(clamp(4rem, 7vw, 10.25rem) * -1);
        /* places it in a 100 layers above the grey box, for good measure */
        z-index: 100;
    }
    #faq-443 .cs-picture img {
        /* 313px - 735px */
        width: clamp(19.5625rem, 40vw, 45.9375rem);
        height: auto;
    }
    #faq-443 .cs-floating-box {
        /* the only way to make this work the way we need it to, is to make this div that matches the width of the .cs-container in the #cta, so we can place the :before on the outside of the box on the right and look like it's checkered with the .cs-container below in the #cta. */
        width: 67vw;
        max-width: 80rem;
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    #faq-443 .cs-floating-box:before {
        /* grey box behind plant picture */
        content: "";
        width: 100%;
        /* 165px - 388px */
        height: clamp(10.3125rem, 30vw, 24.25rem);
        border-radius: 6.25rem 0 0 0;
        background-color: #333142;
        opacity: 1;
        position: absolute;
        display: block;
        /* wrapped in a calc function to make clamp value negative, and made the top value match the exact same value as the height */
        top: calc(clamp(10.3125rem, 30vw, 24.25rem) * -1);
        /* pushes the left edge 100% of the width of the parent to the left, which makes the left edge of the box sit flush on the right edge of the container */
        left: 100%;
    }
}
/* Large Desktop - 2000px */
@media only screen and (min-width: 125rem) {
    #faq-443 .cs-picture {
        /* reset right value */
        right: auto;
        /* places the left edge of the element to the center line of the parent container */
        left: 50%;
        /* push it 400px to the right of the center line, this maintains it's position in the container no matter how wide it gets */
        margin-left: 25rem;
    }
}

/*-- -------------------------- -->
<---            CTA             -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #cta-443 {
        /* 40px 0 100px top & bottom, moves to .cs-container at tablet */
        padding: clamp(2.5rem, 6vw, 6.25rem) 1rem;
        border-radius: 0 0 6.25rem 0;
        background-color: #333142;
    }
    #cta-443 .cs-container {
        /* changes to 1312px at tablet (1280px + 32px padding) */
        max-width: 34.375em;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* 40px - 60px */
        gap: clamp(2.5rem, 7vw, 3.75rem);
    }
    #cta-443 .cs-content {
        text-align: left;
        max-width: 39.375rem;
        position: relative;
        /* place it higher on the z index to be on top of the glowing ball effects */
        z-index: 10;
    }
    #cta-443 .cs-topper {
        font-size: var(--topperFontSize);
        line-height: 1.2em;
        text-transform: uppercase;
        text-align: inherit;
        letter-spacing: 0.1em;
        font-weight: 700;
        color: var(--primaryLight);
        margin-bottom: 0.25rem;
        display: block;
    }
    #cta-443 .cs-title {
        font-size: var(--headerFontSize);
        font-weight: 900;
        line-height: 1.2em;
        text-align: inherit;
        max-width: 43.75rem;
        margin: 0 0 1rem 0;
        color: var(--headerColor);
        position: relative;
    }

    #cta-443 .cs-title {
        color: var(--bodyTextColorWhite);
    }
    #cta-443 .cs-text {
        color: var(--bodyTextColorWhite);
    }
    #cta-443 .cs-cta {
        /* 14px - 16px */
        font-size: clamp(0.875rem, 1.5vw, 1.25rem);
        text-decoration: none;
        text-align: center;
        /* 141px - 200px */
        width: clamp(8.8125rem, 17vw, 12.25rem);
        height: clamp(8.8125rem, 17vw, 12.25rem);
        /* 44px - 108px */
        margin-right: clamp(2.75rem, 5vw, 6.75rem);
        background-color: var(--primary);
        color: var(--bodyTextColorWhite);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        align-self: flex-end;
        position: relative;
        /* place it higher on the z index to be on top of the glowing ball effects */
        z-index: 10;
        transition: background-color 0.3s;
    }
    #cta-443 .cs-cta:hover {
        background-color: #14142b;
    }
    #cta-443 .cs-cta:hover .cs-arrow {
        transform: translateX(3.75rem);
        opacity: 0;
    }
    #cta-443 .cs-cta:hover .cs-cta-text {
        transform: translateY(-0.9375rem);
    }
    #cta-443 .cs-arrow {
        width: 2.5rem;
        height: auto;
        transition:
            transform 0.3s,
            opacity 0.3s;
    }
    #cta-443 .cs-cta-text {
        transition: transform 0.3s;
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
    #cta-443 {
        margin: auto;
        padding: 0;
        border-radius: 0;
        /* clips glowing ball effects from overflowing */
        overflow: hidden;
        background-color: transparent;
        position: relative;
    }
    #cta-443:before {
        /* Extended grey background to the left */
        content: "";
        width: 50%;
        height: 100%;
        background-color: #333142;
        opacity: 1;
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        z-index: -1;
    }
    #cta-443:after {
        /* faded glowing ball effect (left) */
        content: "";
        width: 28.3125rem;
        height: 28.3125rem;
        /* pushes 508px left of the center line */
        margin-right: 31.75rem;
        background: #f1f1f4;
        opacity: 0.24;
        -webkit-filter: blur(182px);
        filter: blur(182px);
        position: absolute;
        display: block;
        top: 10.0625rem;
        /* pushes right edge to the center line of the container */
        right: 50%;
    }
    #cta-443 .cs-wrapper {
        max-width: 82rem;
        margin: auto;
    }
    #cta-443 .cs-container {
        width: 67vw;
        max-width: 80rem;
        margin-left: 0;
        /* 40px 0 100px top & bottom */
        padding: clamp(2.5rem, 6vw, 6.25rem) 1rem;
        border-radius: 0 0 6.25rem 0;
        overflow: hidden;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        background-color: #333142;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
    }
    #cta-443 .cs-container:after {
        /* faded glowing ball effect (right) */
        content: "";
        width: 28.3125rem;
        height: 28.3125rem;
        background: #f1f1f4;
        opacity: 0.24;
        -webkit-filter: blur(182px);
        filter: blur(182px);
        position: absolute;
        display: block;
        top: -13.25rem;
        right: -7.375rem;
    }
    #cta-443 .cs-cta {
        /* prevents flexbox from squishing it */
        flex: none;
        position: relative;
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
  
    });
`;