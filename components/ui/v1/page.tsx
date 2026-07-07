import Hero from "@/components/ui/v2/Hero";
import Features from "@/components/ui/v2/Features";
import Comparison from "@/components/ui/v2/Comparison";
import Performance from "@/components/ui/v2/Performance";
import Pricing from "@/components/ui/v2/Pricing";
import FAQ from "@/components/ui/v2/FAQ";
import CTA from "@/components/ui/v2/CTA";
import Footer from "@/components/ui/v2/Footer";

// v1

export default function Home() {
  return (
    <main className="pt-28 md:pt-32">
      <Hero />
      <Features />
      <Comparison />
      <Performance />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
