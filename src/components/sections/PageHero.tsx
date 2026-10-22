"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HERO, SAMPLE_HREF, WHATSAPP } from "@/lib/constants";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Inner-page hero: full-bleed photo under the home hero's soil gradients,
 * breadcrumb chip, word-rise H1, the two standard CTAs, and a milk wave into
 * the cream page below. No PageIntro on inner pages, so delays are short.
 */
export function PageHero({
  crumb,
  headline,
  subtext,
  chips,
  imageUrl,
  imageAlt,
  primaryHref = SAMPLE_HREF,
  primaryLabel = HERO.primaryCta,
  compact = false,
}: {
  crumb: string;
  headline: string;
  subtext: string;
  chips: readonly string[];
  imageUrl: string;
  imageAlt: string;
  /** e.g. "#request" when the form is on the same page. */
  primaryHref?: string;
  primaryLabel?: string;
  /** Shorter hero for conversion pages, so the form sits closer to the top. */
  compact?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const words = headline.split(" ");
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.7, ease: EASE },
        };

  return (
    <section
      id="top"
      className={`relative flex w-full items-end overflow-hidden bg-soil pb-28 md:pb-36 ${
        compact ? "min-h-[72svh]" : "min-h-[88svh]"
      }`}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-soil/80 via-soil/35 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-soil/40 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 md:px-8">
        <motion.nav aria-label="Breadcrumb" {...rise(0.1)}>
          <ol className="glass-dark inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm text-milk/80">
            <li>
              <Link href="/" className="focus-ring rounded-full hover:text-amber">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="font-medium text-milk">
              {crumb}
            </li>
          </ol>
        </motion.nav>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,7vw,4.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-milk">
          <span className="sr-only">{headline}</span>
          {/* Inline words (not flex) so text-wrap: balance can even out the lines. */}
          <span aria-hidden className="[text-wrap:balance]">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduced ? false : { y: "130%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.2 + i * 0.06, ease: EASE }}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-5 max-w-xl text-base text-milk/85 md:text-lg"
          {...rise(0.75)}
        >
          {subtext}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          {...rise(0.9)}
        >
          <a
            href={primaryHref}
            className="focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors bg-amber px-7 py-3.5 text-base text-soil shadow-[0_10px_30px_rgba(242,169,59,0.4)] hover:bg-amber-deep"
          >
            {primaryLabel}
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
          {chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <MilkWaveDivider from="#FBF7EE" to="#FBF7EE" />
      </div>
    </section>
  );
}
