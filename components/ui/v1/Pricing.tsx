import Link from "next/link";

const Pricing = () => {
  const pricingData = {
    topper: "Save hours of repetitive code, ship fast, get profitable!",
    discount: "$50 off for early adopters",
    remaining: "20 spots left",
    plans: [
      {
        name: "Starter",
        price: "$149",
        originalPrice: "$199",
        currency: "USD",
        popular: false,
        features: [
          "HTML/CSS/JS boilerplate",
          "5 pre-built page templates",
          "Responsive components library",
          "Contact form with validation",
          "SEO-optimized structure",
          "Cross-browser compatible",
          "Tailwind CSS integration",
          "ChatGPT prompts for content",
          "Discord community access",
          "Lifetime updates"
        ],
        cta: "Get Started",
        note: "Pay once. Build unlimited projects!"
      },
      {
        name: "All-in",
        price: "$199",
        originalPrice: "$299",
        currency: "USD",
        popular: true,
        features: [
          "Everything in Starter, plus...",
          "10+ page templates",
          "Advanced animations & effects",
          "Form integrations (Formspree)",
          "Email templates",
          "Analytics setup (Google)",
          "Performance optimizations",
          "Accessibility features",
          "Deployment guides",
          "Priority support",
          "Lifetime updates"
        ],
        cta: "Get Started",
        note: "Pay once. Build unlimited projects!"
      },
      {
        name: "Pro Bundle",
        price: "$349",
        originalPrice: "$499",
        currency: "USD",
        popular: false,
        badge: "BEST VALUE",
        features: [
          "Everything in All-in, plus...",
          "JavaScript Course ($150 value)",
          "20+ interactive components",
          "E-commerce templates",
          "Payment integration guides",
          "Advanced SEO techniques",
          "10 hours of video tutorials",
          "1-on-1 setup call",
          "Custom component requests",
          "Lifetime updates"
        ],
        cta: "Get Started",
        note: "Pay once. Build unlimited projects!"
      }
    ]
  };

  return (
    <section  id="pricing" className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2">
            {pricingData.topper}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple & Transparent Pricing
          </h2>
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <span>{pricingData.discount}</span>
            <span className="opacity-70">({pricingData.remaining})</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingData.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-8 ${
                plan.popular
                  ? 'border-primary bg-base-200 shadow-xl scale-105'
                  : 'border-base-300 bg-base-100'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-content px-4 py-1 rounded-full text-xs font-bold">
                    {plan.badge}
                  </span>
                </div>
              )}
              {plan.popular && !plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-content px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-base-content/60 line-through">
                    {plan.originalPrice}
                  </span>
                </div>
                <p className="text-sm text-base-content/60 mt-1">
                  {plan.currency}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-success shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-base-content/80">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/contact"
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-primary text-primary-content hover:bg-primary/90'
                    : 'bg-base-200 text-base-content hover:bg-base-300'
                }`}
              >
                {plan.cta}
              </Link>

              {/* Note */}
              <p className="text-xs text-center text-base-content/60 mt-4">
                {plan.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;