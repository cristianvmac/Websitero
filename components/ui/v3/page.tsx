import Hero from "@/components/ui/v3/Hero";
import Frameworks from "@/components/ui/v3/Frameworks";
import Features from "@/components/ui/v3/Features";

import Comparison from "@/components/ui/v3/Comparison";
import Performance from "@/components/ui/v3/Performance";
import Pricing from "@/components/ui/v3/Pricing";
import FAQ from "@/components/ui/v3/FAQ";
import CTA from "@/components/ui/v3/CTA";
import Footer from "@/components/ui/v3/Footer";

// v3

export default function Home() {
  return (
    <main className="pt-28 md:pt-32">
      <Hero />
      <Frameworks />
      <Comparison />
      <Features />
      <Performance />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

