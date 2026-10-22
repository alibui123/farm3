"use client";

import { MessageCircle } from "lucide-react";
import {
  PRICE_TABLE,
  PRICES_UPDATED,
  PRODUCTS,
  SAMPLE_HREF,
  WHATSAPP,
} from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { Pending, PendingBadge } from "@/components/ui/Pending";

/** Answer block built from PRODUCTS so it always matches the table. */
function priceAnswer() {
  const priced = PRODUCTS.filter((p) => p.price);
  const unpriced = PRODUCTS.filter((p) => !p.price);
  const parts = priced.map((p) =>
    p.id === "mixed"
      ? `Mixed (cow and buffalo) milk from Al-Shukar Dairy Farms costs Rs ${p.price} per litre in Lahore.`
      : `${p.name} costs Rs ${p.price} per litre.`,
  );
  if (unpriced.length) {
    const names = unpriced.map((p) => p.label.toLowerCase()).join(" and ");
    parts.push(`Message us on WhatsApp for today's ${names} milk rates.`);
  }
  parts.push(`Prices last updated ${PRICES_UPDATED}.`);
  return parts.join(" ");
}

/** Confirmed price, or a WhatsApp link until the client confirms it. */
function Price({ price, className = "" }: { price: number | null; className?: string }) {
  return price ? (
    <span className="font-display text-2xl font-semibold text-pasture">Rs {price}</span>
  ) : (
    <span className={`flex flex-wrap items-center gap-2 ${className}`}>
      <a
        href={WHATSAPP.href}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring inline-flex items-center gap-1.5 font-medium text-pasture underline underline-offset-4"
      >
        <MessageCircle size={15} aria-hidden />
        Ask today&apos;s rate
      </a>
      <PendingBadge />
    </span>
  );
}

export function PriceTable() {
  return (
    <section id="prices" className="relative overflow-hidden bg-cream">
      <OrganicBlob
        className="pointer-events-none absolute top-10 -right-32 h-80 w-80 opacity-25"
        color="#A9C4A0"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-3 lg:grid-cols-[440px_1fr] lg:items-end lg:gap-12">
          <SplitHeading
            text={PRICE_TABLE.heading}
            className="font-display text-3xl leading-[1.15] font-semibold text-balance text-soil md:text-5xl"
          />
          <p className="text-soil-muted md:text-lg">{priceAnswer()}</p>
        </div>

        {/* Mobile: a menu-style list; packaging and delivery are the same for every milk, so they are stated once */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-pasture/10 bg-milk/70 shadow-[0_24px_60px_rgba(43,33,24,0.06)] md:hidden">
          <div className="flex items-center justify-between bg-pasture px-5 py-3 font-display text-base font-semibold text-milk">
            <span>Milk</span>
            <span>Per litre</span>
          </div>
          <ul>
            {PRODUCTS.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-4 border-t border-pasture/10 px-5 py-4 first:border-t-0"
              >
                <div>
                  <p className="font-display text-lg leading-snug font-medium text-soil">
                    {product.id === "mixed" ? "Fresh mixed milk" : product.name}
                  </p>
                  <p className="text-sm text-soil-muted italic">{product.localName}</p>
                </div>
                <div className="shrink-0 text-right">
                  <Price price={product.price} className="justify-end" />
                </div>
              </li>
            ))}
          </ul>
          <dl className="grid grid-cols-2 gap-3 border-t border-pasture/10 bg-pasture/[0.07] px-5 py-4 text-sm">
            <div>
              <dt className="text-xs font-semibold tracking-wider text-soil uppercase">Packaging</dt>
              <dd className="mt-0.5 text-soil-muted">{PRICE_TABLE.packaging}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wider text-soil uppercase">Delivery</dt>
              <dd className="mt-0.5 text-soil-muted">{PRICE_TABLE.delivery}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-12 hidden overflow-x-auto rounded-3xl border border-pasture/10 bg-milk/70 shadow-[0_24px_60px_rgba(43,33,24,0.06)] md:block">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm md:text-base">
            <caption className="sr-only">
              Al-Shukar fresh milk prices per litre in Lahore, last updated{" "}
              {PRICES_UPDATED}
            </caption>
            <thead>
              <tr className="bg-pasture text-milk">
                {["Milk", "Local name", "Price per litre (PKR)", "Packaging", "Delivery"].map(
                  (col) => (
                    <th key={col} scope="col" className="px-5 py-4 font-display text-lg font-semibold">
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="border-t border-pasture/10">
                  <th scope="row" className="px-5 py-5 font-display text-lg font-medium whitespace-nowrap text-soil">
                    {product.id === "mixed" ? "Fresh mixed milk (cow + buffalo)" : product.name}
                  </th>
                  <td className="px-5 py-5 text-soil-muted italic">{product.localName}</td>
                  <td className="bg-pasture/[0.07] px-5 py-5">
                    <Price price={product.price} />
                  </td>
                  <td className="px-5 py-5 text-soil-muted">{PRICE_TABLE.packaging}</td>
                  <td className="px-5 py-5 text-soil-muted">{PRICE_TABLE.delivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 text-sm text-soil-muted">
            <span className="h-2 w-2 rounded-full bg-amber" aria-hidden />
            Prices last updated: {PRICES_UPDATED}.
          </p>
          <a
            href={SAMPLE_HREF}
            className="focus-ring inline-flex items-center justify-center rounded-full bg-pasture px-6 py-3 text-sm font-medium text-milk transition hover:bg-pasture-deep"
          >
            Try 1 litre free first
          </a>
        </div>

        <Pending className="mt-6">{PRICE_TABLE.pendingTerms}</Pending>
      </div>
    </section>
  );
}
