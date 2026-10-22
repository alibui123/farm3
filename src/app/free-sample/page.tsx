import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { SampleRequest } from "@/components/sections/free-sample/SampleRequest";
import { AfterRequest } from "@/components/sections/free-sample/AfterRequest";
import { SampleQuestions } from "@/components/sections/free-sample/SampleQuestions";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import {
  FREE_SAMPLE_CTA,
  FREE_SAMPLE_HERO,
  FREE_SAMPLE_HOW,
  FREE_SAMPLE_MEDIA,
  FREE_SAMPLE_META,
  SAMPLE_QUESTIONS,
} from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: FREE_SAMPLE_META.title },
  description: FREE_SAMPLE_META.description,
  alternates: { canonical: "/free-sample" },
  openGraph: {
    title: FREE_SAMPLE_META.title,
    description: FREE_SAMPLE_META.description,
    url: "/free-sample",
  },
};

const faq = [
  { q: FREE_SAMPLE_HOW.heading, a: FREE_SAMPLE_HOW.answer },
  ...SAMPLE_QUESTIONS.items,
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
  breadcrumbJsonLd("Free Sample", "/free-sample"),
];

export default function FreeSamplePage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <Navbar delay={0.2} />
      <PageHero
        compact
        crumb="Free Sample"
        headline={FREE_SAMPLE_HERO.headline}
        subtext={FREE_SAMPLE_HERO.subtext}
        chips={FREE_SAMPLE_HERO.chips}
        imageUrl={FREE_SAMPLE_MEDIA.heroUrl}
        imageAlt={FREE_SAMPLE_MEDIA.heroAlt}
        primaryHref="#request"
        primaryLabel={FREE_SAMPLE_HERO.cta}
      />
      <SampleRequest />
      <AfterRequest />
      <SampleQuestions />
      <FinalCta
        headline={FREE_SAMPLE_CTA.headline}
        text={FREE_SAMPLE_CTA.text}
        button={FREE_SAMPLE_CTA.button}
        buttonHref="#request"
      />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
