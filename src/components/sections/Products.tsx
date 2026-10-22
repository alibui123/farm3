"use client";

import { motion } from "framer-motion";
import {
  PRICES_UPDATED,
  PRODUCTS,
  PRODUCTS_INTRO,
  WHATSAPP,
} from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider, OrganicBlob } from "@/components/ui/MilkWave";
import { MilkBottle } from "@/components/ui/MilkBottle";

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
          text={PRODUCTS_INTRO.heading}
          className="max-w-3xl font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />
        <p className="mt-4 max-w-xl text-soil-muted">{PRODUCTS_INTRO.answer}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <GlassCard key={product.id} className="flex flex-col p-6 md:p-7">
              <div className="mb-5 flex items-start justify-between">
                <MilkBottle delay={i * 0.15} label={product.label} />
                <span className="rounded-full bg-pasture/10 px-3 py-1 text-xs font-medium text-pasture">
                  {product.label}
                </span>
              </div>
              <h3 className="font-display text-2xl text-soil">{product.name}</h3>
              <p className="mt-0.5 text-sm text-soil-muted italic">
                {product.localName}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-soil-muted">
                {product.description}
              </p>
              <div className="mt-5 border-t border-pasture/10 pt-4">
                {product.price ? (
                  <p className="font-display text-2xl text-soil">
                    Rs {product.price}
                    <span className="ml-1 font-sans text-sm text-soil-muted">
                      per litre
                    </span>
                  </p>
                ) : (
                  <a
                    href={WHATSAPP.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-sm font-medium text-pasture underline-offset-4 hover:underline"
                  >
                    Ask for today&apos;s rate on WhatsApp
                  </a>
                )}
              </div>
              <motion.a
                href="#sample"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="focus-ring mt-5 inline-flex items-center justify-center rounded-full bg-pasture px-5 py-3 text-sm font-medium text-milk"
              >
                Try 1 litre free
              </motion.a>
            </GlassCard>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-2 text-sm text-soil-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            Prices last updated: {PRICES_UPDATED}.{" "}
            <a
              href="/products-prices"
              className="focus-ring font-medium text-pasture underline underline-offset-4"
            >
              See full prices
            </a>
          </p>
          <p>
            Need milk in bulk for a shop, restaurant or distributor?{" "}
            <a
              href="/bulk-milk-supply"
              className="focus-ring font-medium text-pasture underline underline-offset-4"
            >
              See bulk milk supply
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
