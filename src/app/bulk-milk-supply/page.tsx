import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { BulkIntro } from "@/components/sections/bulk/BulkIntro";
import { BulkTerms } from "@/components/sections/bulk/BulkTerms";
import { BulkInquiry } from "@/components/sections/bulk/BulkInquiry";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import { BULK_CTA, BULK_HERO, BULK_MEDIA, BULK_META, BULK_WHO, SITE } from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: BULK_META.title },
  description: BULK_META.description,
  alternates: { canonical: "/bulk-milk-supply" },
  openGraph: {
    title: BULK_META.title,
    description: BULK_META.description,
    url: "/bulk-milk-supply",
  },
};

/** No price, capacity or delivery-area claims for business orders until confirmed. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Bulk fresh milk supply",
    name: "Bulk Fresh Milk Supply in Lahore",
    description: BULK_WHO.answer,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "City", name: "Lahore" },
    audience: { "@type": "BusinessAudience", name: "Shops, restaurants and distributors" },
  },
  breadcrumbJsonLd("Bulk Milk Supply", "/bulk-milk-supply"),
];

export default function BulkMilkSupplyPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <Navbar delay={0.2} />
      <PageHero
        compact
        crumb="Bulk Milk Supply"
        headline={BULK_HERO.headline}
        subtext={BULK_HERO.subtext}
        chips={BULK_HERO.chips}
        imageUrl={BULK_MEDIA.heroUrl}
        imageAlt={BULK_MEDIA.heroAlt}
        primaryHref="#inquiry"
        primaryLabel={BULK_HERO.cta}
      />
      <BulkIntro />
      <BulkTerms />
      <BulkInquiry />
      <FinalCta
        headline={BULK_CTA.headline}
        text={BULK_CTA.text}
        button={BULK_CTA.button}
        buttonHref="#inquiry"
        secondary={BULK_CTA.secondary}
      />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
