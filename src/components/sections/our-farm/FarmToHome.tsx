"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bike, Check, ClipboardCheck, Milk, PackageCheck, Snowflake } from "lucide-react";
import { FARM_TO_HOME } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const ICONS = [Milk, Snowflake, ClipboardCheck, PackageCheck, Bike];
/** Seconds between one step lighting up and the next; the rail fill matches. */
const STEP = 0.35;

/**
 * Five-step chain on the pasture band. When it scrolls into view an amber rail
 * draws through the nodes (horizontal on desktop, vertical on mobile) and each
 * step lights up as the rail reaches it.
 */
export function FarmToHome() {
  const list = useRef<HTMLOListElement>(null);
  const inView = useInView(list, { once: true, margin: "-20% 0px" });
  const reduced = usePrefersReducedMotion();
  const on = reduced || inView;
  const steps = FARM_TO_HOME.steps;
  const railTime = STEP * (steps.length - 1);

  return (
    <section id="farm-to-home" className="relative overflow-hidden bg-pasture text-milk">
      <MilkWaveDivider from="#FFFFFF" to="#2F5D3A" />
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text={FARM_TO_HOME.heading}
          className="max-w-3xl font-display text-3xl font-semibold text-balance md:text-5xl"
        />
        <p className="mt-4 max-w-2xl text-milk/85 md:text-lg">{FARM_TO_HOME.answer}</p>

        <ol ref={list} className="relative mt-14 grid gap-10 lg:grid-cols-5 lg:gap-0">
          {/* Rails run between the first and last node centres (nodes are 56px). */}
          <div className="absolute top-7 bottom-7 left-7 w-0.5 -translate-x-1/2 bg-milk/15 lg:hidden" aria-hidden>
            <motion.div
              className="h-full w-full origin-top bg-amber"
              initial={false}
              animate={{ scaleY: on ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : railTime, ease: "linear" }}
            />
          </div>
          <div className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 -translate-y-1/2 bg-milk/15 lg:block" aria-hidden>
            <motion.div
              className="h-full w-full origin-left bg-amber"
              initial={false}
              animate={{ scaleX: on ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : railTime, ease: "linear" }}
            />
          </div>

          {steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <li
                key={step.title}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:px-3 lg:text-center"
              >
                <motion.span
                  className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-milk/20 bg-pasture-deep"
                  initial={false}
                  animate={{
                    scale: on ? 1 : 0.8,
                    // Hex, not var(): Framer can't interpolate CSS variables (amber / pasture-deep, soil / sage).
                    backgroundColor: on ? "#F2A93B" : "#23462C",
                    color: on ? "#2B2118" : "#A9C4A0",
                  }}
                  transition={{
                    delay: reduced ? 0 : i * STEP,
                    duration: reduced ? 0 : 0.4,
                    ease: [0.34, 1.8, 0.64, 1],
                  }}
                  aria-hidden
                >
                  <Icon size={24} strokeWidth={1.75} />
                </motion.span>
                <motion.div
                  className="pt-1 lg:pt-5"
                  initial={false}
                  animate={{ opacity: on ? 1 : 0.35, y: on ? 0 : 8 }}
                  transition={{ delay: reduced ? 0 : i * STEP, duration: reduced ? 0 : 0.5 }}
                >
                  <p className="text-[11px] font-medium tracking-[0.2em] text-milk/80 uppercase">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 font-display text-xl text-milk">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-milk/85 lg:mx-auto lg:max-w-[190px]">
                    {step.body}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>

        <motion.p
          className="glass-dark mt-14 inline-flex items-center gap-3 rounded-full py-2.5 pr-5 pl-2.5 text-sm text-milk md:text-base"
          initial={false}
          animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12 }}
          transition={{ delay: reduced ? 0 : railTime + 0.3, duration: reduced ? 0 : 0.6 }}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber text-soil" aria-hidden>
            <Check size={16} strokeWidth={3} />
          </span>
          {FARM_TO_HOME.promise}
        </motion.p>
      </div>
    </section>
  );
}
