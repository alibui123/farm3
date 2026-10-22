"use client";

import { motion } from "framer-motion";
import { MessageCircle, Package, Send, ThumbsUp } from "lucide-react";
import { SAMPLE_AFTER, SHOW_PENDING } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { PendingBadge } from "@/components/ui/Pending";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const ICONS = [Send, MessageCircle, Package, ThumbsUp];

export function AfterRequest() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="next" className="relative overflow-hidden bg-pasture text-milk">
      <MilkWaveDivider from="#FBF7EE" to="#2F5D3A" />
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text={SAMPLE_AFTER.heading}
          className="max-w-3xl font-display text-3xl font-semibold text-balance md:text-5xl"
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SAMPLE_AFTER.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <motion.li
                key={step.title}
                className="glass-dark relative flex flex-col rounded-3xl p-6"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber text-soil" aria-hidden>
                    <Icon size={20} />
                  </span>
                  <span className="font-display text-3xl text-milk/60" aria-hidden>
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl text-milk">{step.title}</h3>
                <p className="mt-1.5 text-sm text-milk/85">{step.body}</p>
                {step.pendingNote && SHOW_PENDING && (
                  <p className="mt-3 text-xs text-milk/85">
                    <PendingBadge className="mr-1.5" />
                    {step.pendingNote}
                  </p>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
