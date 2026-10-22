"use client";

import { ArrowRight, Info } from "lucide-react";
import { SHELF_LIFE } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";

/** The honest limit, stated plainly: fresh milk keeps for less time. */
export function ShelfLife() {
  return (
    <section id="shelf-life" className="relative bg-cream">
      <MilkWaveDivider from="#FFFFFF" to="#FBF7EE" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 rounded-3xl border border-amber/40 bg-amber/10 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber text-soil" aria-hidden>
            <Info size={26} />
          </span>
          <div>
            <SplitHeading
              text={SHELF_LIFE.heading}
              className="font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
            />
            <p className="mt-4 max-w-3xl text-soil-muted md:text-lg">{SHELF_LIFE.answer}</p>
            <a
              href="/products-prices#packing"
              className="focus-ring mt-6 inline-flex items-center gap-1.5 font-medium text-pasture underline underline-offset-4"
            >
              How to store fresh milk
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
