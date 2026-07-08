import Hero from "@/components/ui/v5/Hero";
import LogoMarquee from "@/components/ui/v5/LogoMarquee";
import HowItWorks from "@/components/ui/v5/HowItWorks";
import Frameworks from "@/components/ui/v5/Frameworks";
import Features from "@/components/ui/v5/Features";
import Stats from "@/components/ui/v5/Stats";
import Comparison from "@/components/ui/v5/Comparison";
import Testimonials from "@/components/ui/v5/Testimonials";
import Pricing from "@/components/ui/v5/Pricing";
import FAQ from "@/components/ui/v5/FAQ";
import CTA from "@/components/ui/v5/CTA";
import Footer from "@/components/ui/v5/Footer";

// v5
export default function Home() {
  return (
    <main className="pt-28 md:pt-32">
      <Hero />
      <LogoMarquee />
      <HowItWorks />
      <Frameworks />
      <Features />
      <Stats />
      <Comparison />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
