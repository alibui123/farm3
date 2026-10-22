"use client";

import { STATS, WHY_CARDS, WHY_INTRO } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { MapPin, Ban, Snowflake, PackageCheck, Gift } from "lucide-react";

const ICONS = [MapPin, Ban, Snowflake, PackageCheck, Gift];

export function WhyAlShukr() {
  return (
    <section id="why" className="relative bg-cream">
      <MilkWaveDivider from="#FFFFFF" to="#FBF7EE" />
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text={WHY_INTRO.heading}
          className="max-w-3xl font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />
        <p className="mt-4 max-w-2xl text-soil-muted">
          {WHY_INTRO.answer}{" "}
          <a
            href="/quality"
            className="focus-ring font-medium text-pasture underline underline-offset-4"
          >
            How we keep milk pure
          </a>
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICONS[i];
            const span = card.size === "large" ? "md:col-span-3" : "md:col-span-2";
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
              <span className="sr-only">
                {stat.value}
                {stat.suffix}
              </span>
              <span aria-hidden>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-3xl font-semibold md:text-4xl"
                />
              </span>
              <p className="mt-2 text-sm text-sage">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
