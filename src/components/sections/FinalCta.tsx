"use client";

import { motion } from "framer-motion";
import { FINAL_CTA } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { MilkWaveDivider } from "@/components/ui/MilkWave";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-pasture text-milk">
      <MilkWaveDivider from="#FFFFFF" to="#2F5D3A" />
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute h-4 w-3 rounded-full bg-milk/25"
          style={{
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 22}%`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{
            duration: 3.5 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center md:px-8 md:py-32">
        <SplitHeading
          text={FINAL_CTA.headline}
          className="font-display text-4xl font-semibold text-balance md:text-6xl"
        />
        <MagneticLink
          href="#sample"
          className="mt-10 bg-amber px-10 py-4 text-lg text-soil shadow-[0_16px_40px_rgba(242,169,59,0.45)] hover:bg-amber-deep"
        >
          {FINAL_CTA.button}
        </MagneticLink>
      </div>
    </section>
  );
}
