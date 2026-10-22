import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { PageHero } from "@/components/sections/PageHero";
import { PriceTable } from "@/components/sections/products-prices/PriceTable";
import { MilkTypes } from "@/components/sections/products-prices/MilkTypes";
import { MilkChooser } from "@/components/sections/products-prices/MilkChooser";
import { PackingStorage } from "@/components/sections/products-prices/PackingStorage";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import {
  PRODUCTS,
  PRODUCTS_PAGE_CTA,
  PRODUCTS_PAGE_HERO,
  PRODUCTS_PAGE_MEDIA,
  PRODUCTS_PAGE_META,
  SITE,
} from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: PRODUCTS_PAGE_META.title },
  description: PRODUCTS_PAGE_META.description,
  alternates: { canonical: "/products-prices" },
  openGraph: {
    title: PRODUCTS_PAGE_META.title,
    description: PRODUCTS_PAGE_META.description,
    url: "/products-prices",
  },
};

/** Product + Offer only for milks with a confirmed price; the others are added when priced. */
const productJsonLd = PRODUCTS.filter((p) => p.price).map((p) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.id === "mixed" ? "Fresh Mixed Milk (Cow + Buffalo)" : p.name,
  description: `${p.id === "mixed" ? "Fresh mixed cow and buffalo milk" : p.name} from ${SITE.name}, machine milked, chilled immediately and delivered in a sealed pouch.`,
  brand: { "@type": "Brand", name: SITE.name },
  offers: {
    "@type": "Offer",
    priceCurrency: "PKR",
    price: String(p.price),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(p.price),
      priceCurrency: "PKR",
      referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitCode: "LTR" },
    },
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE.url}/#business` },
  },
}));

const jsonLd = [...productJsonLd, breadcrumbJsonLd("Products & Prices", "/products-prices")];

export default function ProductsPricesPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <Navbar delay={0.2} />
      <PageHero
        crumb="Products & Prices"
        headline={PRODUCTS_PAGE_HERO.headline}
        subtext={PRODUCTS_PAGE_HERO.subtext}
        chips={PRODUCTS_PAGE_HERO.chips}
        imageUrl={PRODUCTS_PAGE_MEDIA.heroUrl}
        imageAlt={PRODUCTS_PAGE_MEDIA.heroAlt}
      />
      <PriceTable />
      <MilkTypes />
      <MilkChooser />
      <PackingStorage />
      <FinalCta
        headline={PRODUCTS_PAGE_CTA.headline}
        text={PRODUCTS_PAGE_CTA.text}
        secondary={PRODUCTS_PAGE_CTA.secondary}
      />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
