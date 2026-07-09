import Hero from "@/components/ui/Hero";
import LogoMarquee from "@/components/ui/LogoMarquee";
import HowItWorks from "@/components/ui/HowItWorks";
import Features from "@/components/ui/Features";
import Comparison from "@/components/ui/Comparison";
import Testimonials from "@/components/ui/Testimonials";
import Pricing from "@/components/ui/Pricing";
import FAQ from "@/components/ui/FAQ";
import CTA from "@/components/ui/CTA";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Websitero",
};

// Preview of the redesigned (v5) landing-page sections.
// The global <Header /> from app/layout.tsx still renders above this content.
// To preview the v5 header (scroll progress + magnetic CTA), swap the import
// in app/layout.tsx:  import Header from "@/components/ui/v5/Header";
export default function Home() {
  return (
    <main className="pt-16 md:pt-16">
      <Hero />
      <LogoMarquee />
      <HowItWorks />
      <Features />
      <Comparison />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
