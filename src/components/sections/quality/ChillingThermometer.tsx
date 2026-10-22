"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Snowflake } from "lucide-react";
import { CHILLING } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;
// Hex, not var(): Framer can't interpolate CSS variables. Warm = amber, cold = --chill.
const WARM = "#F2A93B";
const COLD = "#C2D9CD";
/** Seconds: the mercury falls over DROP, and each stage lights at its offset. */
const DROP = 1.8;
const STAGE_AT = [0, 1.1, 2.1];

/** Thermometer with no numbers on it: temperatures stay off the page until confirmed. */
function Thermometer({ on, reduced }: { on: boolean; reduced: boolean }) {
  const t = (delay: number, duration: number) =>
    reduced ? { duration: 0 } : { delay, duration, ease: EASE };

  return (
    <div className="relative flex items-end gap-6" aria-hidden>
      <div className="flex h-[300px] flex-col justify-between py-2 text-right">
        <span className="text-[11px] font-medium tracking-[0.2em] text-milk/80 uppercase">
          Warm from
          <br />
          milking
        </span>
        <span className="text-[11px] font-medium tracking-[0.2em] text-milk/80 uppercase">
          Chilled
        </span>
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative h-[260px] w-9 overflow-hidden rounded-t-full border-2 border-milk/30 bg-milk/10">
          {[20, 40, 60, 80].map((y) => (
            <span key={y} className="absolute right-0 h-px w-3 bg-milk/30" style={{ top: `${y}%` }} />
          ))}
          <motion.div
            className="absolute inset-x-1.5 bottom-0 rounded-t-full"
            initial={false}
            animate={{ height: on ? "22%" : "88%", backgroundColor: on ? COLD : WARM }}
            transition={t(0.3, DROP)}
          />
        </div>
        <motion.div
          className="-mt-3 h-20 w-20 rounded-full border-2 border-milk/30"
          initial={false}
          animate={{
            backgroundColor: on ? COLD : WARM,
            boxShadow: on ? "0 0 0 14px rgba(194,217,205,0.25)" : "0 0 0 0px rgba(194,217,205,0)",
          }}
          transition={t(0.3, DROP)}
        />
      </div>

      {[
        { top: "8%", left: "112%", size: 22, delay: 1.2 },
        { top: "38%", left: "128%", size: 16, delay: 1.5 },
        { top: "64%", left: "108%", size: 26, delay: 1.8 },
      ].map((flake) => (
        <motion.span
          key={flake.top}
          className="absolute text-[#C2D9CD]"
          style={{ top: flake.top, left: flake.left }}
          initial={false}
          animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4, rotate: on ? 0 : -60 }}
          transition={t(flake.delay, 0.6)}
        >
          <Snowflake size={flake.size} />
        </motion.span>
      ))}
    </div>
  );
}

export function ChillingThermometer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const reduced = usePrefersReducedMotion();
  const on = reduced || inView;

  return (
    <section id="chilling" className="relative overflow-hidden bg-pasture text-milk">
      <MilkWaveDivider from="#FBF7EE" to="#2F5D3A" />
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-20"
      >
        <div>
          <SplitHeading
            text={CHILLING.heading}
            className="font-display text-3xl font-semibold text-balance md:text-5xl"
          />
          <p className="mt-4 max-w-xl text-milk/85 md:text-lg">{CHILLING.answer}</p>

          <ol className="mt-10 flex flex-wrap items-center gap-2">
            {CHILLING.stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2">
                <motion.span
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  initial={false}
                  animate={{
                    backgroundColor: on ? "#F2A93B" : "rgba(255,255,255,0.1)",
                    color: on ? "#2B2118" : "#FFFFFF",
                  }}
                  transition={reduced ? { duration: 0 } : { delay: 0.3 + STAGE_AT[i], duration: 0.4 }}
                >
                  {stage}
                </motion.span>
                {i < CHILLING.stages.length - 1 && (
                  <span className="h-px w-5 bg-milk/30" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="glass-dark flex justify-center rounded-3xl px-8 py-12 pr-20">
          <Thermometer on={on} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
