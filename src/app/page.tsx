import { PageIntro } from "@/components/providers/PageIntro";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { OurStory } from "@/components/sections/OurStory";
import { Products } from "@/components/sections/Products";
import { WhyAlShukr } from "@/components/sections/WhyAlShukr";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SampleForm } from "@/components/sections/SampleForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";

export default function HomePage() {
  return (
    <main>
      <PageIntro />
      <Navbar />
      <Hero />
      <TrustMarquee />
      <OurStory />
      <Products />
      <WhyAlShukr />
      <HowItWorks />
      <SampleForm />
      <Testimonials />
      <FinalCta />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
