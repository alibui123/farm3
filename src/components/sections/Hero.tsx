"use client";

import { motion } from "framer-motion";
import { HERO, HERO_MEDIA, WHATSAPP } from "@/lib/constants";

export function Hero() {
  const words = HERO.headline.split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden pb-16 md:items-center md:pb-0"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_MEDIA.posterUrl}
        aria-hidden
      >
        <source src={HERO_MEDIA.videoUrl} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-t from-soil/80 via-soil/35 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-soil/40 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 md:px-8 md:pt-20">
        <h1 className="max-w-4xl font-display text-[clamp(2.4rem,7vw,4.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-milk">
          <span className="sr-only">{HERO.headline}</span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.28em]">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "130%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 1.55 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-5 max-w-xl text-base text-milk/85 md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7 }}
        >
          {HERO.subtext}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 0.7 }}
        >
          <a
            href="#sample"
            className="focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors bg-amber px-7 py-3.5 text-base text-soil shadow-[0_10px_30px_rgba(242,169,59,0.4)] hover:bg-amber-deep"
          >
            {HERO.primaryCta}
          </a>
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors glass-dark px-7 py-3.5 text-base text-milk"
          >
            {HERO.secondaryCta}
          </a>
        </motion.div>

        {/* Kept in the markup for SEO and screen readers, hidden visually */}
        <ul className="sr-only">
          {HERO.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
