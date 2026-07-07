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

export const metadata = {
  title: "Websitero — UI v4 Preview",
};

// Preview of the redesigned (v4) landing-page sections.
// The global <Header /> from app/layout.tsx still renders above this content.
// To preview the redesigned v4 header (scroll progress + glass nav), swap the
// import in app/layout.tsx:  import Header from "@/components/ui/v4/Header";
export default function PreviewV4Page() {
  return (
    <main className="pt-24 md:pt-28">
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
