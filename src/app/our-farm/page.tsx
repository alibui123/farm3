import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { FarmOwners } from "@/components/sections/our-farm/FarmOwners";
import { AnimalCare } from "@/components/sections/our-farm/AnimalCare";
import { FarmToHome } from "@/components/sections/our-farm/FarmToHome";
import { FarmVisit } from "@/components/sections/our-farm/FarmVisit";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import {
  FARM_OWNERS,
  OUR_FARM_CTA,
  OUR_FARM_HERO,
  OUR_FARM_MEDIA,
  OUR_FARM_META,
  SITE,
} from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: OUR_FARM_META.title },
  description: OUR_FARM_META.description,
  alternates: { canonical: "/our-farm" },
  openGraph: {
    title: OUR_FARM_META.title,
    description: OUR_FARM_META.description,
    url: "/our-farm",
  },
};

/** Add a founder Person only if the client approves publishing a name. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE.url}/our-farm#page`,
    url: `${SITE.url}/our-farm`,
    name: OUR_FARM_META.title,
    description: FARM_OWNERS.answer,
    about: { "@id": `${SITE.url}/#business` },
  },
  breadcrumbJsonLd("Our Farm", "/our-farm"),
];

export default function OurFarmPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <Navbar delay={0.2} />
      <PageHero
        crumb="Our Farm"
        headline={OUR_FARM_HERO.headline}
        subtext={OUR_FARM_HERO.subtext}
        chips={OUR_FARM_HERO.chips}
        imageUrl={OUR_FARM_MEDIA.heroUrl}
        imageAlt={OUR_FARM_MEDIA.heroAlt}
      />
      <FarmOwners />
      <AnimalCare />
      <FarmToHome />
      <FarmVisit />
      <FinalCta headline={OUR_FARM_CTA.headline} text={OUR_FARM_CTA.text} />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
