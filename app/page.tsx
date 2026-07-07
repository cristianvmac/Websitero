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

export const metadata = {
  title: "Websitero — UI v5 Preview",
};

// Preview of the redesigned (v5) landing-page sections.
// The global <Header /> from app/layout.tsx still renders above this content.
// To preview the v5 header (scroll progress + magnetic CTA), swap the import
// in app/layout.tsx:  import Header from "@/components/ui/v5/Header";
export default function PreviewV5Page() {
  return (
    <main className="pt-24 md:pt-28">
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
