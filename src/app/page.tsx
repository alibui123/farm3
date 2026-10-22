import type { Metadata } from "next";
import { PageIntro } from "@/components/providers/PageIntro";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { OurStory } from "@/components/sections/OurStory";
import { Products } from "@/components/sections/Products";
import { WhyAlShukr } from "@/components/sections/WhyAlShukr";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { SampleForm } from "@/components/sections/SampleForm";
import { Testimonials } from "@/components/sections/Testimonials";
import { DeliveryAreas } from "@/components/sections/DeliveryAreas";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import {
  HOME_META,
  QUICK_ANSWERS,
  SERVICE_AREAS,
  SITE,
  TESTIMONIALS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: HOME_META.title },
  description: HOME_META.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_META.title,
    description: HOME_META.description,
  },
};

/** Only confirmed facts — add telephone, sameAs and Offer prices once the client confirms them. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    slogan: SITE.tagline,
    description: SITE.description,
    url: `${SITE.url}/`,
    foundingDate: SITE.founded,
    priceRange: "Rs 250 per litre (mixed milk)",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "Place",
      name: `${area.name}, Lahore`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QUICK_ANSWERS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
];

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro />
      <Navbar />
      <Hero />
      <TrustMarquee />
      <OurStory />
      <Products />
      <WhyAlShukr />
      <HowItWorks />
      <Comparison />
      <SampleForm />
      {/* Hidden until real, consented testimonials are added in constants.ts */}
      {TESTIMONIALS.length > 0 && <Testimonials />}
      <DeliveryAreas />
      <FinalCta />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
