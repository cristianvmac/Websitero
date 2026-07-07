
import Link from 'next/link';

const CTA = () => {
  return (
    <section id="cta" className="py-24 bg-base-200">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Boost your website, launch, earn
        </h2>
        <p className="text-lg md:text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
          Don&apos;t waste time on WordPress or page builder subscriptions
        </p>
        <Link
          href="/contact"
          className="inline-block bg-primary text-primary-content px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
        >
          Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default CTA;