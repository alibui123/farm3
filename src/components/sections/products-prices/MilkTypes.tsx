"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  MILK_DETAILS,
  PRICE_TABLE,
  PRODUCTS,
  SAMPLE_HREF,
  SITE,
  WHATSAPP,
} from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { Pending } from "@/components/ui/Pending";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Pouch fill tint: white for the lightest milk, warm cream for the creamiest. */
const tint = (texture: number) =>
  `color-mix(in srgb, #F6E3B4 ${Math.round(texture * 70)}%, var(--milk))`;

/**
 * Large sealed pouch. When it scrolls into view the milk rises to 82% with a
 * gently moving surface, then the price tag swings in.
 */
function Pouch({
  texture,
  localName,
  price,
  on,
  reduced,
}: {
  texture: number;
  localName: string;
  price: number | null;
  on: boolean;
  reduced: boolean;
}) {
  return (
    <div className="relative h-[300px] w-[210px]" aria-hidden>
      <div className="absolute inset-0 overflow-hidden rounded-t-2xl rounded-b-[64px] border border-soil/15 bg-[color-mix(in_srgb,var(--soil)_6%,var(--milk))] shadow-[0_30px_60px_rgba(43,33,24,0.12)]">
        <motion.div
          className="absolute inset-x-0 bottom-0"
          style={{ background: tint(texture) }}
          initial={false}
          animate={{ height: on ? "82%" : "6%" }}
          transition={{ duration: reduced ? 0 : 1.6, ease: EASE }}
        >
          {/* Two wave periods, 200% wide; sliding by -50% loops seamlessly (CSS, compositor). */}
          <svg viewBox="0 0 420 24" preserveAspectRatio="none" className="animate-drift absolute -top-[11px] left-0 h-3 w-[200%]">
            <path
              d="M0,12 C35,0 70,24 105,12 C140,0 175,24 210,12 C245,0 280,24 315,12 C350,0 385,24 420,12 L420,24 L0,24 Z"
              fill={tint(texture)}
            />
          </svg>
        </motion.div>

        {/* Volume ticks */}
        <div className="absolute top-16 bottom-14 left-4 flex flex-col justify-between">
          {[0, 1, 2, 3].map((t) => (
            <span key={t} className="h-px w-3 bg-soil/20" />
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 h-6 bg-pasture" />
        <div className="absolute inset-x-0 top-6 h-1.5 bg-pasture-deep/40" />

        <div className="absolute inset-x-7 top-[38%] rounded-2xl bg-milk/90 px-3 py-3 text-center shadow-[0_6px_16px_rgba(43,33,24,0.08)]">
          <p className="font-display text-base font-semibold text-pasture">{SITE.shortName}</p>
          <p className="mt-0.5 font-display text-sm text-soil-muted italic">{localName}</p>
        </div>
      </div>

      <motion.div
        className="absolute top-14 -right-10 origin-top-left"
        initial={false}
        animate={{ rotate: on ? -6 : -40, opacity: on ? 1 : 0, scale: on ? 1 : 0.8 }}
        transition={{
          delay: reduced ? 0 : 1.1,
          duration: reduced ? 0 : 0.6,
          ease: [0.34, 1.8, 0.64, 1],
        }}
      >
        <span
          className={`block rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap shadow-[0_8px_20px_rgba(242,169,59,0.4)] ${
            price ? "bg-amber text-soil" : "bg-milk text-pasture ring-1 ring-pasture/20"
          }`}
        >
          {price ? `Rs ${price} / litre` : "Rate on WhatsApp"}
        </span>
      </motion.div>
    </div>
  );
}

/** Light ↔ creamy scale, decorative; the answer text states the difference. */
function TextureMeter({ texture, on, reduced }: { texture: number; on: boolean; reduced: boolean }) {
  return (
    <div className="mt-8 w-full max-w-[240px]" aria-hidden>
      <div
        className="relative h-2 rounded-full"
        style={{ background: `linear-gradient(to right, var(--milk), #F6E3B4)` }}
      >
        <div className="absolute inset-0 rounded-full ring-1 ring-soil/10" />
        <motion.span
          className="absolute top-1/2 -mt-2.5 -ml-2.5 h-5 w-5 rounded-full border-[3px] border-milk bg-pasture shadow-[0_2px_8px_rgba(43,33,24,0.25)]"
          initial={false}
          animate={{ left: on ? `${texture * 100}%` : "0%" }}
          transition={{ delay: reduced ? 0 : 0.5, duration: reduced ? 0 : 1.1, ease: EASE }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-medium tracking-[0.2em] text-soil-muted uppercase">
        <span>Light</span>
        <span>Creamy</span>
      </div>
    </div>
  );
}

function MilkRow({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  const detail = MILK_DETAILS[product.id];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const reduced = usePrefersReducedMotion();
  const on = reduced || inView;
  const answer = product.price
    ? `${detail.answer} It costs Rs ${product.price} per litre.`
    : detail.answer;

  return (
    <article
      ref={ref}
      id={product.id}
      className="grid items-center gap-12 border-t border-pasture/10 py-16 first:border-t-0 first:pt-0 md:py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-20"
    >
      <div className={`flex flex-col items-center ${index % 2 ? "lg:order-2" : ""}`}>
        <div className="relative flex w-full justify-center py-6">
          <span
            className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
            style={{ background: `radial-gradient(circle, ${tint(detail.texture)}, transparent 70%)` }}
            aria-hidden
          />
          <Pouch
            texture={detail.texture}
            localName={product.localName}
            price={product.price}
            on={on}
            reduced={reduced}
          />
        </div>
        <TextureMeter texture={detail.texture} on={on} reduced={reduced} />
      </div>

      <div>
        <p className="text-[11px] font-medium tracking-[0.2em] text-soil-muted uppercase">
          {product.label} · {product.localName}
        </p>
        <SplitHeading
          text={detail.heading}
          className="mt-2 font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
        />
        <p className="mt-4 text-soil-muted md:text-lg">{answer}</p>

        <dl className="mt-8 grid grid-cols-3 divide-x divide-pasture/10 rounded-2xl border border-pasture/10 bg-cream/60">
          {[
            { label: "Price", value: product.price ? `Rs ${product.price} / litre` : "Ask on WhatsApp" },
            { label: "Delivery", value: PRICE_TABLE.delivery },
            { label: "Packaging", value: PRICE_TABLE.packaging },
          ].map((fact) => (
            <div key={fact.label} className="px-4 py-4">
              <dt className="text-[11px] font-medium tracking-[0.2em] text-soil-muted uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1 font-display text-base text-soil md:text-lg">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {detail.pendingNote && <Pending className="mt-4">{detail.pendingNote}</Pending>}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={SAMPLE_HREF}
            className="focus-ring inline-flex items-center justify-center rounded-full bg-pasture px-6 py-3 text-sm font-medium text-milk transition hover:bg-pasture-deep"
          >
            Order a free sample
          </a>
          {!product.price && (
            <a
              href={WHATSAPP.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-pasture underline underline-offset-4"
            >
              <MessageCircle size={15} aria-hidden />
              Ask today&apos;s {product.label.toLowerCase()} milk rate
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function MilkTypes() {
  return (
    <section id="milk-types" className="relative bg-milk">
      <MilkWaveDivider from="#FBF7EE" to="#FFFFFF" />
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-8 md:px-8 md:pt-16">
        {PRODUCTS.map((product, i) => (
          <MilkRow key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
