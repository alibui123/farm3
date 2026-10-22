import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { WhereWeDeliver } from "@/components/sections/delivery-areas/WhereWeDeliver";
import { AreasTable } from "@/components/sections/delivery-areas/AreasTable";
import { AreaCheck } from "@/components/sections/delivery-areas/AreaCheck";
import { TimesAndCoverage } from "@/components/sections/delivery-areas/TimesAndCoverage";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import {
  AREAS_CTA,
  AREAS_HERO,
  AREAS_MEDIA,
  AREAS_META,
  SERVICE_AREAS,
  SITE,
} from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: AREAS_META.title },
  description: AREAS_META.description,
  alternates: { canonical: "/delivery-areas" },
  openGraph: {
    title: AREAS_META.title,
    description: AREAS_META.description,
    url: "/delivery-areas",
  },
};

/** Confirmed areas only. serviceUrl moves to /free-sample once that page exists. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Fresh milk home delivery",
    name: "Fresh Milk Delivery in DHA and Askari, Lahore",
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "Place",
      name: `${area.name}, Lahore`,
    })),
  },
  breadcrumbJsonLd("Delivery Areas", "/delivery-areas"),
];

export default function DeliveryAreasPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <Navbar delay={0.2} />
      <PageHero
        crumb="Delivery Areas"
        headline={AREAS_HERO.headline}
        subtext={AREAS_HERO.subtext}
        chips={AREAS_HERO.chips}
        imageUrl={AREAS_MEDIA.heroUrl}
        imageAlt={AREAS_MEDIA.heroAlt}
      />
      <WhereWeDeliver />
      <AreasTable />
      <AreaCheck />
      <TimesAndCoverage />
      <FinalCta headline={AREAS_CTA.headline} text={AREAS_CTA.text} />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
