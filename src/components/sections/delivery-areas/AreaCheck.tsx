"use client";

import { motion } from "framer-motion";
import { AREA_CHECK, SAMPLE_HREF, WHATSAPP } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Pasture band: three numbered steps from request to first litre, plus both CTAs. */
export function AreaCheck() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="check" className="relative overflow-hidden bg-pasture text-milk">
      <MilkWaveDivider from="#FFFFFF" to="#2F5D3A" />
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text={AREA_CHECK.heading}
          className="max-w-3xl font-display text-3xl font-semibold text-balance md:text-5xl"
        />
        <p className="mt-4 max-w-2xl text-milk/85 md:text-lg">{AREA_CHECK.answer}</p>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {AREA_CHECK.steps.map((step, i) => (
            <motion.li
              key={step.title}
              className="glass-dark rounded-3xl p-6 md:p-7"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber font-display text-lg font-semibold text-soil">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-2xl text-milk">{step.title}</h3>
              <p className="mt-1.5 text-milk/85">{step.body}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={SAMPLE_HREF}
            className="focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors bg-amber px-7 py-3.5 text-base text-soil shadow-[0_10px_30px_rgba(242,169,59,0.4)] hover:bg-amber-deep"
          >
            {AREA_CHECK.primary}
          </a>
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors border border-milk/40 px-7 py-3.5 text-base text-milk hover:bg-milk/10"
          >
            {AREA_CHECK.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
