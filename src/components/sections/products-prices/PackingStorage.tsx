"use client";

import { motion } from "framer-motion";
import { Clock, Flame, MapPin, PackageCheck, Refrigerator, Wind } from "lucide-react";
import { PACKING, SERVICE_AREAS, STORAGE } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { Pending } from "@/components/ui/Pending";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const STEP_ICONS = [Flame, Wind, Refrigerator];

export function PackingStorage() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="packing" className="relative bg-cream">
      <MilkWaveDivider from="#2F5D3A" to="#FBF7EE" />
      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <SplitHeading
            text={PACKING.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
          />
          <p className="mt-4 text-soil-muted md:text-lg">{PACKING.answer}</p>

          <ul className="mt-8 flex flex-wrap gap-3">
            <li className="inline-flex items-center gap-2 rounded-full bg-pasture/10 px-4 py-2 text-sm font-medium text-pasture">
              <PackageCheck size={16} aria-hidden />
              Sealed pouch, 1 L or 2 L
            </li>
            <li className="inline-flex items-center gap-2 rounded-full bg-amber/25 px-4 py-2 text-sm font-medium text-soil">
              <Clock size={16} aria-hidden />
              Daily, 1 to 7 pm
            </li>
          </ul>
          <ul className="mt-3 flex flex-wrap gap-3">
            {SERVICE_AREAS.map((area) => (
              <li
                key={area.name}
                className="inline-flex items-center gap-2 rounded-full border border-pasture/15 px-4 py-2 text-sm text-soil-muted"
              >
                <MapPin size={15} className="text-pasture" aria-hidden />
                {area.name}
              </li>
            ))}
          </ul>

          {PACKING.pendingNote && <Pending className="mt-6">{PACKING.pendingNote}</Pending>}
        </div>

        <div>
          <SplitHeading
            text={STORAGE.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
          />
          <p className="mt-4 text-soil-muted md:text-lg">{STORAGE.answer}</p>

          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {STORAGE.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <motion.li
                  key={step.title}
                  className="rounded-3xl border border-pasture/10 bg-milk p-5"
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-pasture" strokeWidth={1.75} aria-hidden />
                    <span className="font-display text-sm text-soil-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl text-soil">{step.title}</h3>
                  <p className="mt-1 text-sm text-soil-muted">{step.body}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
