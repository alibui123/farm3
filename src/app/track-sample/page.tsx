import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { SampleTracker } from "@/components/sections/track-sample/SampleTracker";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import { TRACK_META } from "@/lib/constants";

/** Utility page: noindex, follow, and no schema or SEO targets. */
export const metadata: Metadata = {
  title: { absolute: TRACK_META.title },
  description: TRACK_META.description,
  alternates: { canonical: "/track-sample" },
  robots: { index: false, follow: true },
};

export default function TrackSamplePage() {
  return (
    <main>
      <Navbar delay={0.2} />
      <SampleTracker />
      <Footer />
      <WhatsAppFloat delay={0.8} />
    </main>
  );
}
