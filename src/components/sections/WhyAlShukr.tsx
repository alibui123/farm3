"use client";

import { STATS, WHY_CARDS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { FlaskConical, Clock, ScanLine, Eye } from "lucide-react";

const ICONS = [FlaskConical, Clock, ScanLine, Eye];

export function WhyAlShukr() {
  return (
    <section id="why" className="relative bg-cream">
      <MilkWaveDivider from="#FFFFFF" to="#FBF7EE" />
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text="Why families choose Al-shukr."
          className="max-w-2xl font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />

        <div className="mt-12 grid auto-rows-fr gap-4 md:grid-cols-4 md:grid-rows-2">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICONS[i];
            const span =
              card.size === "large"
                ? "md:col-span-2 md:row-span-1"
                : "md:col-span-1";
            return (
              <GlassCard
                key={card.title}
                className={`${span} bg-milk/70 p-6 md:p-8`}
              >
                <Icon className="mb-4 h-7 w-7 text-pasture" strokeWidth={1.75} />
                <h3 className="font-display text-2xl text-soil">{card.title}</h3>
                <p className="mt-2 max-w-md text-soil-muted">{card.body}</p>
              </GlassCard>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-pasture/10 bg-pasture px-5 py-6 text-center text-milk"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display text-3xl font-semibold md:text-4xl"
              />
              <p className="mt-2 text-sm text-sage">{stat.label}</p>
              <p className="mt-1 text-[10px] tracking-wide text-milk/50 uppercase">
                Illustrative
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
