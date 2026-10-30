import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { PrivacyPolicy } from "@/components/sections/privacy/PrivacyPolicy";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import { PRIVACY_META } from "@/lib/constants";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: PRIVACY_META.title },
  description: PRIVACY_META.description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: PRIVACY_META.title,
    description: PRIVACY_META.description,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd("Privacy Policy", "/privacy")} />
      <Navbar delay={0.2} />
      <PrivacyPolicy />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
