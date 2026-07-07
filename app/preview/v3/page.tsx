import Hero from "@/components/ui/v3/Hero";
import Frameworks from "@/components/ui/v3/Frameworks";
import Comparison from "@/components/ui/v3/Comparison";
import Features from "@/components/ui/v3/Features";
import Performance from "@/components/ui/v3/Performance";
import Pricing from "@/components/ui/v3/Pricing";
import FAQ from "@/components/ui/v3/FAQ";
import CTA from "@/components/ui/v3/CTA";
import Footer from "@/components/ui/v3/Footer";

export const metadata = {
  title: "Websitero — UI v3 Preview",
};

// Preview of the redesigned (v3) landing-page sections.
// The global <Header /> from app/layout.tsx still renders above this content.
// To preview the redesigned v3 header (with announcement bar), swap the import
// in app/layout.tsx:  import Header from "@/components/ui/v3/Header";
export default function PreviewV3Page() {
  return (
    <main className="pt-24 md:pt-28">
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
