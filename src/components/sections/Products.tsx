"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider, OrganicBlob } from "@/components/ui/MilkWave";
import { MilkBottle } from "@/components/ui/MilkBottle";

const LABELS: Record<(typeof PRODUCTS)[number]["icon"], string> = {
  cow: "Cow",
  buffalo: "Buffalo",
  bulk: "Bulk",
};

export function Products() {
  return (
    <section id="products" className="relative overflow-hidden bg-milk">
      <MilkWaveDivider from="#E8F0E4" to="#FFFFFF" />
      <OrganicBlob
        className="pointer-events-none absolute -top-20 -right-24 h-72 w-72 opacity-30"
        color="#A9C4A0"
      />
      <OrganicBlob
        className="pointer-events-none absolute bottom-10 -left-28 h-80 w-80 opacity-25"
        color="#F2A93B"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text="Milk the way it should taste."
          className="max-w-2xl font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />
        <p className="mt-4 max-w-xl text-soil-muted">
          Household bottles and distributor volumes — same farm, same chill
          chain, same honesty.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <GlassCard key={product.id} tilt className="flex flex-col p-6 md:p-7">
              <div className="mb-5 flex items-start justify-between">
                <MilkBottle delay={i * 0.15} label={LABELS[product.icon]} />
                <span className="rounded-full bg-pasture/10 px-3 py-1 text-xs font-medium text-pasture">
                  {LABELS[product.icon]}
                </span>
              </div>
              <h3 className="font-display text-2xl text-soil">{product.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-soil-muted">
                {product.description}
              </p>
              <motion.a
                href="#sample"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="focus-ring mt-6 inline-flex items-center justify-center rounded-full bg-pasture px-5 py-3 text-sm font-medium text-milk"
              >
                Request Sample
              </motion.a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
