"use client";

import { motion } from "framer-motion";
import { MILK_CHOOSER, PRODUCTS, SAMPLE_HREF } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Pasture band: the three milks laid out on one light → creamy scale, so the
 * choice reads as a spectrum rather than three unrelated products.
 */
export function MilkChooser() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="choose" className="relative overflow-hidden bg-pasture text-milk">
      <MilkWaveDivider from="#FFFFFF" to="#2F5D3A" />
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text={MILK_CHOOSER.heading}
          className="max-w-3xl font-display text-3xl font-semibold text-balance md:text-5xl"
        />
        <p className="mt-4 max-w-2xl text-milk/85 md:text-lg">{MILK_CHOOSER.answer}</p>

        <div className="relative mt-14">
          {/* Scale bar spanning the three columns (desktop only). */}
          <motion.div
            className="absolute top-[19px] right-[16.66%] left-[16.66%] hidden h-1.5 origin-left rounded-full md:block"
            style={{ background: "linear-gradient(to right, var(--milk), #F6E3B4)" }}
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />

          <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
            {MILK_CHOOSER.items.map((item, i) => {
              const product = PRODUCTS.find((p) => p.id === item.id);
              return (
                <motion.li
                  key={item.id}
                  className="flex flex-col md:items-center md:text-center"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                >
                  <span className="relative z-10 hidden h-11 items-center rounded-full bg-amber px-4 text-[11px] font-semibold tracking-[0.2em] text-soil uppercase shadow-[0_6px_16px_rgba(242,169,59,0.35)] md:inline-flex">
                    {item.scale}
                  </span>
                  <div className="glass-dark mt-0 flex h-full w-full flex-col rounded-3xl p-6 md:mt-5 md:items-center md:p-8">
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-amber uppercase md:hidden">
                      {item.scale}
                    </p>
                    <h3 className="mt-1 font-display text-2xl text-milk md:mt-0">{item.title}</h3>
                    {product && (
                      <p className="mt-0.5 text-sm text-milk/80 italic">{product.localName}</p>
                    )}
                    <p className="mt-3 flex-1 text-milk/90">{item.body}</p>
                    <a
                      href={SAMPLE_HREF}
                      className="focus-ring mt-6 inline-flex w-fit items-center justify-center rounded-full border border-milk/40 px-5 py-2.5 text-sm font-medium text-milk transition hover:bg-milk/10"
                    >
                      Try {item.title.toLowerCase()} free
                    </a>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
