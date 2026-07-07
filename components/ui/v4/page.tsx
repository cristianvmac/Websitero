import Hero from "@/components/ui/v4/Hero";
import LogoMarquee from "@/components/ui/v4/LogoMarquee";
import Frameworks from "@/components/ui/v4/Frameworks";
import Features from "@/components/ui/v4/Features";
import Stats from "@/components/ui/v4/Stats";
import Comparison from "@/components/ui/v4/Comparison";
import Testimonials from "@/components/ui/v4/Testimonials";
import Pricing from "@/components/ui/v4/Pricing";
import FAQ from "@/components/ui/v4/FAQ";
import CTA from "@/components/ui/v4/CTA";
import Footer from "@/components/ui/v4/Footer";


// v4
export default function Home() {
  return (
    <main className="pt-28 md:pt-32">
      <Hero />
      <LogoMarquee />
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
