import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { MessageComposer } from "@/components/sections/contact/MessageComposer";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import {
  CONTACT,
  CONTACT_META,
  CONTACT_PAGE,
  CONTACT_STATUS,
  SERVICE_AREAS,
  SITE,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: CONTACT_META.title },
  description: CONTACT_META.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: CONTACT_META.title,
    description: CONTACT_META.description,
    url: "/contact",
  },
};

/** ContactPoint only once the real numbers are confirmed (SEO notes). */
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE.url}/contact`,
    name: CONTACT_PAGE.heading,
    about: {
      "@id": `${SITE.url}/#business`,
      ...(CONTACT_STATUS.channelsConfirmed
        ? {
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer service",
                telephone: CONTACT.phone,
                ...(CONTACT.email ? { email: CONTACT.email } : {}),
                areaServed: SERVICE_AREAS.map((a) => `${a.name}, Lahore`),
                availableLanguage: ["English", "Urdu"],
              },
              {
                "@type": "ContactPoint",
                contactType: "WhatsApp",
                telephone: WHATSAPP_DISPLAY,
              },
            ],
          }
        : {}),
    },
  },
  breadcrumbJsonLd("Contact", "/contact"),
];

export default function ContactPage() {
  return (
    <main>
      <JsonLd data={jsonLd} />
      <Navbar delay={0.2} />
      <ContactHero />
      <MessageComposer />
      <ContactDetails />
      <FinalCta />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
