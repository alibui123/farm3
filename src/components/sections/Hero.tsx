"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HERO, HERO_MEDIA, WHATSAPP } from "@/lib/constants";
import { MagneticLink } from "@/components/ui/MagneticButton";

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
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1">
                <motion.span
                  className="inline-block"
                  initial={{ y: "115%", opacity: 0 }}
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
          <MagneticLink
            href="#sample"
            className="bg-amber px-7 py-3.5 text-base text-soil shadow-[0_10px_30px_rgba(242,169,59,0.4)] hover:bg-amber-deep"
          >
            {HERO.primaryCta}
          </MagneticLink>
          <MagneticLink
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-dark px-7 py-3.5 text-base text-milk"
          >
            {HERO.secondaryCta}
          </MagneticLink>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-3">
          {HERO.chips.map((chip, i) => (
            <motion.div
              key={chip}
              className="glass-dark cursor-grow rounded-full px-4 py-2 text-sm text-milk/95"
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: 1,
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { delay: 2.5 + i * 0.1, duration: 0.5 },
                y: {
                  delay: 2.8 + i * 0.2,
                  duration: 4 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              {chip}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.a
        href="#trust"
        className="focus-ring absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-milk/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 2.8 },
          y: { delay: 3, duration: 1.6, repeat: Infinity },
        }}
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.a>
    </section>
  );
}
