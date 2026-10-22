"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { HERO, QUALITY_PURE } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** The page's one-word verdict, underlined by an amber stroke that draws in. */
export function PureAnswer() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="pure" className="relative overflow-hidden bg-cream">
      <OrganicBlob
        className="pointer-events-none absolute -top-10 -right-28 h-80 w-80 opacity-25"
        color="#A9C4A0"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text={QUALITY_PURE.heading}
          className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />

        <div className="mt-10 grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-14">
          <p className="relative w-fit font-display text-[clamp(5rem,14vw,9rem)] leading-none font-semibold tracking-[-0.04em] text-pasture">
            {QUALITY_PURE.verdict}
            <svg
              viewBox="0 0 300 30"
              preserveAspectRatio="none"
              className="absolute -bottom-3 left-0 h-5 w-full"
              aria-hidden
            >
              <motion.path
                d="M4,20 C70,6 150,4 296,14"
                fill="none"
                stroke="var(--amber)"
                strokeWidth="8"
                strokeLinecap="round"
                initial={reduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </p>
          <p className="max-w-2xl text-soil-muted md:text-xl md:leading-relaxed">
            {QUALITY_PURE.answer}
          </p>
        </div>

        <ul className="mt-12 flex flex-wrap gap-3">
          {HERO.chips.map((chip, i) => (
            <motion.li
              key={chip}
              className="inline-flex items-center gap-2 rounded-full bg-pasture/10 px-4 py-2 text-sm font-medium text-pasture"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
            >
              <Check size={15} strokeWidth={3} aria-hidden />
              {chip}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
