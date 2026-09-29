import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/providers/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Farm-Fresh Milk Delivery`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} | Pure Milk, Farm to Door`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Sunrise pasture at Al-shukr Dairy Farm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-cream text-soil font-sans">
        {/*
          THESIS: Golden-hour farm-to-door milk for Al-shukr — cinematic day-on-the-farm story, not a generic dairy card grid.
          OWN-WORLD: Cream #FBF7EE field, pasture green glass, sunrise amber CTAs, milk-wave dividers, Fraunces + DM Sans.
          STORY: Trust the farm → watch sunrise-to-delivery → taste products → request a free sample via WhatsApp.
          FIRST VIEWPORT: Full-bleed sunrise pasture video, staggered serif headline, amber sample CTA + glass WhatsApp, floating glass chips.
          FORM: Brief-pinned "Golden hour on the farm" (user-specified; beats concept roll).
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <GrainOverlay />
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
