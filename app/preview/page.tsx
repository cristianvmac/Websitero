import Hero from "@/components/ui/v2/Hero";
import Comparison from "@/components/ui/v2/Comparison";
import Features from "@/components/ui/v2/Features";
import Performance from "@/components/ui/v2/Performance";
import Pricing from "@/components/ui/v2/Pricing";
import FAQ from "@/components/ui/v2/FAQ";
import CTA from "@/components/ui/v2/CTA";
import Footer from "@/components/ui/v2/Footer";

export const metadata = {
  title: "Websitero — UI v2 Preview",
};

// Preview of the redesigned (v2) landing-page sections.
// The global <Header /> from app/layout.tsx still renders above this content.
// To preview the redesigned header too, swap the import in app/layout.tsx:
//   import Header from "@/components/ui/v2/Header";
export default function PreviewPage() {
  return (
    <main className="pt-20 md:pt-24">
      <Hero />
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
