import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { FaqBrowser } from "@/components/sections/faq/FaqBrowser";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import { FAQ_CATEGORIES, FAQ_CTA, FAQ_META } from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: FAQ_META.title },
  description: FAQ_META.description,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: FAQ_META.title,
    description: FAQ_META.description,
    url: "/faq",
  },
};

/** Every published question, with the exact answer text shown on the page. */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) => cat.items)
      .filter((item) => item.a !== null)
      .map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
  },
  breadcrumbJsonLd("FAQ", "/faq"),
];

export default function FaqPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <Navbar delay={0.2} />
      <FaqBrowser />
      <FinalCta
        headline={FAQ_CTA.headline}
        text={FAQ_CTA.text}
        button={FAQ_CTA.button}
        secondary={FAQ_CTA.secondary}
      />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
