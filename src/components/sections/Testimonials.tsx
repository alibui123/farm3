"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  animate,
  useAnimationFrame,
} from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export function Testimonials() {
  const x = useMotionValue(0);
  const dragging = useRef(false);
  const widthRef = useRef(0);

  useAnimationFrame((_, delta) => {
    if (dragging.current) return;
    const w = widthRef.current || 1;
    const next = x.get() - delta * 0.035;
    x.set(next <= -w / 2 ? 0 : next);
  });

  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="overflow-hidden bg-milk py-20 md:py-28" aria-label="Testimonials">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SplitHeading
          text="Morning glasses, honest reviews."
          className="max-w-2xl font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />
        <p className="mt-3 text-sm text-soil-muted">
          Placeholder quotes — replace with real customer voices in{" "}
          <code className="rounded bg-cream px-1">constants.ts</code>.
        </p>
      </div>

      <motion.div
        className="mt-10 flex cursor-grab gap-5 px-5 active:cursor-grabbing md:px-8"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -2000, right: 0 }}
        onDragStart={() => {
          dragging.current = true;
        }}
        onDragEnd={() => {
          dragging.current = false;
          animate(x, x.get(), { type: "spring", stiffness: 120, damping: 20 });
        }}
        ref={(el) => {
          if (el) widthRef.current = el.scrollWidth;
        }}
      >
        {loop.map((t, i) => (
          <GlassCard
            key={`${t.name}-${i}`}
            className="w-[min(85vw,360px)] shrink-0 bg-cream/80 p-6 md:p-7"
          >
            <p className="font-display text-xl leading-snug text-soil">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 border-t border-pasture/10 pt-4">
              <p className="font-medium text-soil">{t.name}</p>
              <p className="text-sm text-soil-muted">{t.role}</p>
            </div>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}
