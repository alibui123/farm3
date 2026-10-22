"use client";

import { motion } from "framer-motion";
import { CalendarCheck, MapPin, MessageCircle } from "lucide-react";
import { FARM_VISIT, whatsappLink } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Golden-hour scene: the sun rises behind the pasture as the card comes into view. */
function SunriseScene() {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl border border-pasture/10"
      style={{
        background:
          "linear-gradient(to bottom, color-mix(in srgb, var(--amber) 42%, var(--cream)), var(--cream) 72%)",
      }}
      aria-hidden
    >
      <motion.div
        className="absolute top-[22%] left-[58%] h-32 w-32 -translate-x-1/2 rounded-full bg-amber shadow-[0_0_80px_30px_rgba(242,169,59,0.45)] md:h-40 md:w-40"
        initial={reduced ? false : { y: 90, opacity: 0.6 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <svg viewBox="0 0 500 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,250 C90,215 170,235 260,222 C350,209 430,190 500,205 L500,400 L0,400 Z" fill="var(--sage)" />
        <path d="M0,300 C110,270 210,292 300,280 C380,270 450,255 500,262 L500,400 L0,400 Z" fill="var(--pasture)" />
        {/* Shed on the far hill */}
        <path d="M92,236 L120,214 L148,236 L148,262 L92,262 Z" fill="var(--pasture-deep)" />
        <rect x="112" y="242" width="16" height="20" fill="var(--amber)" fillOpacity="0.7" />
        {/* Fence along the near pasture */}
        <g stroke="var(--cream)" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round">
          <path d="M20,330 L480,312" />
          <path d="M20,346 L480,328" />
          {[40, 110, 180, 250, 320, 390, 460].map((x, i) => (
            <path key={x} d={`M${x},${326 - i * 2.6} L${x},${356 - i * 2.6}`} />
          ))}
        </g>
      </svg>

      <span className="glass absolute top-4 right-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-soil">
        <CalendarCheck size={15} className="text-pasture" />
        Visits on request
      </span>
      <span className="glass-dark absolute bottom-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-milk">
        <MapPin size={15} className="shrink-0 text-amber" />
        Location shared once your visit is confirmed
      </span>
    </div>
  );
}

export function FarmVisit() {
  return (
    <section id="visit" className="relative bg-cream">
      <MilkWaveDivider from="#2F5D3A" to="#FBF7EE" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SplitHeading
            text={FARM_VISIT.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
          />
          <p className="mt-4 max-w-lg text-soil-muted md:text-lg">{FARM_VISIT.answer}</p>
          <a
            href={whatsappLink(FARM_VISIT.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-pasture px-6 py-3 text-sm font-medium text-milk transition hover:bg-pasture-deep"
          >
            <MessageCircle size={18} aria-hidden />
            {FARM_VISIT.cta}
          </a>
        </div>
        <SunriseScene />
      </div>
    </section>
  );
}
