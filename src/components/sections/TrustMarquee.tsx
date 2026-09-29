"use client";

import { TRUST_ITEMS } from "@/lib/constants";

export function TrustMarquee() {
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <section
      id="trust"
      className="relative overflow-hidden border-y border-pasture/10 bg-pasture py-4 text-milk"
      aria-label="Trust signals"
    >
      <div className="animate-marquee flex w-max gap-0 will-change-transform">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-4 px-6 text-sm font-medium tracking-wide whitespace-nowrap md:text-base"
          >
            {item}
            <span className="text-amber" aria-hidden>
              •
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
