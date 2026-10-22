import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { PureAnswer } from "@/components/sections/quality/PureAnswer";
import { PracticesTable } from "@/components/sections/quality/PracticesTable";
import { ChecksAndCertificates } from "@/components/sections/quality/ChecksAndCertificates";
import { ChillingThermometer } from "@/components/sections/quality/ChillingThermometer";
import { Comparison } from "@/components/sections/Comparison";
import { ShelfLife } from "@/components/sections/quality/ShelfLife";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import {
  CERTIFICATES,
  CHILLING,
  QUALITY_CHECKS,
  QUALITY_COMPARISON,
  QUALITY_CTA,
  QUALITY_HERO,
  QUALITY_MEDIA,
  QUALITY_META,
  QUALITY_PURE,
  SHELF_LIFE,
} from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: QUALITY_META.title },
  description: QUALITY_META.description,
  alternates: { canonical: "/quality" },
  openGraph: {
    title: QUALITY_META.title,
    description: QUALITY_META.description,
    url: "/quality",
  },
};

/** Question headings on this page, answered with the exact on-page text. */
const faq: { q: string; a: string }[] = [
  { q: QUALITY_PURE.heading, a: `${QUALITY_PURE.verdict} ${QUALITY_PURE.answer}` },
  { q: QUALITY_CHECKS.heading, a: QUALITY_CHECKS.answer },
  { q: CERTIFICATES.heading, a: CERTIFICATES.answer },
  { q: CHILLING.heading, a: CHILLING.answer },
  { q: QUALITY_COMPARISON.heading, a: QUALITY_COMPARISON.answer },
  { q: SHELF_LIFE.heading, a: SHELF_LIFE.answer },
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
  breadcrumbJsonLd("Quality", "/quality"),
];

export default function QualityPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <Navbar delay={0.2} />
      <PageHero
        crumb="Quality"
        headline={QUALITY_HERO.headline}
        subtext={QUALITY_HERO.subtext}
        chips={QUALITY_HERO.chips}
        imageUrl={QUALITY_MEDIA.heroUrl}
        imageAlt={QUALITY_MEDIA.heroAlt}
      />
      <PureAnswer />
      <PracticesTable />
      <ChecksAndCertificates />
      <ChillingThermometer />
      <Comparison heading={QUALITY_COMPARISON.heading} answer={QUALITY_COMPARISON.answer} />
      <ShelfLife />
      <FinalCta
        headline={QUALITY_CTA.headline}
        text={QUALITY_CTA.text}
        secondary={QUALITY_CTA.secondary}
      />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
