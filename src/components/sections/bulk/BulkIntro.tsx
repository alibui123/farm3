"use client";

import { motion } from "framer-motion";
import { Check, Store, Truck, UtensilsCrossed } from "lucide-react";
import { BULK_WHO, BULK_WHY } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MilkWaveDivider, OrganicBlob } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const ICONS = { shop: Store, restaurant: UtensilsCrossed, distributor: Truck } as const;

export function BulkIntro() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <section id="who" className="relative overflow-hidden bg-cream">
        <OrganicBlob
          className="pointer-events-none absolute top-16 -left-32 h-80 w-80 opacity-25"
          color="#A9C4A0"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-3 lg:grid-cols-[380px_1fr] lg:items-end lg:gap-12">
            <SplitHeading
              text={BULK_WHO.heading}
              className="font-display text-3xl leading-[1.15] font-semibold text-balance text-soil md:text-5xl"
            />
            <p className="text-soil-muted md:text-lg">{BULK_WHO.answer}</p>
          </div>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {BULK_WHO.types.map((type) => {
              const Icon = ICONS[type.id as keyof typeof ICONS];
              return (
                <li key={type.id}>
                  <GlassCard className="h-full bg-milk/70 p-6 md:p-8">
                    <Icon className="mb-4 h-8 w-8 text-pasture" strokeWidth={1.6} aria-hidden />
                    <h3 className="font-display text-2xl text-soil">{type.title}</h3>
                    <p className="mt-2 text-soil-muted">{type.body}</p>
                  </GlassCard>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="why-bulk" className="relative overflow-hidden bg-pasture text-milk">
        <MilkWaveDivider from="#FBF7EE" to="#2F5D3A" />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SplitHeading
            text={BULK_WHY.heading}
            className="font-display text-3xl font-semibold text-balance md:text-5xl"
          />
          <ul className="divide-y divide-milk/15 border-y border-milk/15">
            {BULK_WHY.points.map((point, i) => (
              <motion.li
                key={point.title}
                className="flex gap-4 py-5"
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber text-soil" aria-hidden>
                  <Check size={15} strokeWidth={3} />
                </span>
                <p className="text-milk/85 md:text-lg">
                  <span className="font-display text-xl text-milk">{point.title}</span>
                  {point.body && <> {point.body}</>}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
