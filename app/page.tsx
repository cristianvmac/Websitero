import Hero from "@/components/ui/Hero";
import LogoMarquee from "@/components/ui/LogoMarquee";
import HowItWorks from "@/components/ui/HowItWorks";
import Frameworks from "@/components/ui/Frameworks";
import Features from "@/components/ui/Features";
import Stats from "@/components/ui/Stats";
import Comparison from "@/components/ui/Comparison";
import Testimonials from "@/components/ui/Testimonials";
import Pricing from "@/components/ui/Pricing";
import FAQ from "@/components/ui/FAQ";
import CTA from "@/components/ui/CTA";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Websitero — UI v5 Preview",
};

// Preview of the redesigned (v5) landing-page sections.
// The global <Header /> from app/layout.tsx still renders above this content.
// To preview the v5 header (scroll progress + magnetic CTA), swap the import
// in app/layout.tsx:  import Header from "@/components/ui/v5/Header";
export default function Home() {
  return (
    <main className="pt-20 md:pt-22">
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
