"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, MessageCircle, Plus, Search, X } from "lucide-react";
import { FAQ_CATEGORIES, FAQ_PAGE, SHOW_PENDING, WHATSAPP, type FaqItem } from "@/lib/constants";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { KeepBrand } from "@/components/ui/Brand";
import { Pending, PendingBadge } from "@/components/ui/Pending";

const normalise = (s: string) => s.toLowerCase().normalize("NFKD");

/** Published items always; pending ones only in development. */
const visible = (item: FaqItem) => item.a !== null || SHOW_PENDING;

function FaqEntry({ item, open }: { item: FaqItem; open: boolean }) {
  return (
    <details
      open={open || undefined}
      className="group rounded-2xl border border-pasture/10 bg-milk transition-[border-color,box-shadow] open:border-pasture/25 open:shadow-[0_12px_32px_rgba(43,33,24,0.06)]"
    >
      <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-4 rounded-2xl px-5 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
        <span className="font-display text-lg leading-snug text-soil md:text-xl">
          {item.q}
          {item.a === null && <PendingBadge className="ml-2" />}
        </span>
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pasture/10 text-pasture transition-transform duration-300 group-open:rotate-45"
          aria-hidden
        >
          <Plus size={16} />
        </span>
      </summary>
      <div className="px-5 pb-5 md:px-6">
        {item.a && <p className="max-w-2xl text-soil-muted">{item.a}</p>}
        {item.pendingNote && <Pending className="mt-3">{item.pendingNote}</Pending>}
        {item.link && item.a && (
          <Link
            href={item.link.href}
            className="focus-ring mt-3 inline-flex items-center gap-1 text-sm font-medium text-pasture underline underline-offset-4"
          >
            {item.link.label}
            <ArrowRight size={14} aria-hidden />
          </Link>
        )}
      </div>
    </details>
  );
}

export function FaqBrowser() {
  const [query, setQuery] = useState("");
  const q = normalise(query.trim());

  const categories = useMemo(
    () =>
      FAQ_CATEGORIES.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            visible(item) &&
            (!q || normalise(`${item.q} ${item.a ?? ""} ${cat.title}`).includes(q)),
        ),
      })).filter((cat) => cat.items.length > 0),
    [q],
  );
  const total = categories.reduce((n, cat) => n + cat.items.length, 0);

  return (
    <section className="relative overflow-hidden bg-cream">
      <OrganicBlob
        className="pointer-events-none absolute top-20 -right-28 h-80 w-80 opacity-25"
        color="#A9C4A0"
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28">
        <nav aria-label="Breadcrumb">
          <ol className="inline-flex items-center gap-1.5 text-sm text-soil-muted">
            <li>
              <Link href="/" className="focus-ring rounded hover:text-pasture">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="font-medium text-soil">
              FAQ
            </li>
          </ol>
        </nav>

        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-balance text-soil">
          <KeepBrand text={FAQ_PAGE.heading} />
        </h1>
        <p className="mt-4 max-w-2xl text-soil-muted md:text-lg">{FAQ_PAGE.intro}</p>

        <div className="relative mt-8 max-w-xl">
          <label htmlFor="faq-search" className="sr-only">
            {FAQ_PAGE.searchLabel}
          </label>
          <Search
            size={19}
            className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-soil-muted"
            aria-hidden
          />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={FAQ_PAGE.searchPlaceholder}
            aria-describedby="faq-count"
            className="focus-ring w-full rounded-full border border-pasture/15 bg-milk py-4 pr-12 pl-13 text-soil shadow-[0_12px_32px_rgba(43,33,24,0.06)] transition-[box-shadow,border-color] outline-none placeholder:text-soil-muted/70 focus:border-amber focus:shadow-[0_0_0_4px_rgba(242,169,59,0.25)] [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="focus-ring absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-soil-muted hover:bg-pasture/10 hover:text-soil"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p id="faq-count" className="mt-3 text-sm text-soil-muted" aria-live="polite">
          {q ? `${total} ${total === 1 ? "answer" : "answers"} for “${query.trim()}”` : `${total} answers`}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[230px_1fr] lg:gap-14">
          <nav aria-label="FAQ topics" className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 border-l border-pasture/15">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="focus-ring -ml-px flex items-center justify-between gap-3 border-l-2 border-transparent py-1.5 pr-2 pl-4 text-sm text-soil-muted transition-colors hover:border-pasture hover:text-pasture"
                  >
                    {cat.title}
                    <span className="text-xs text-soil-muted/80">{cat.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14">
            {categories.length === 0 && (
              <div className="rounded-3xl border border-pasture/10 bg-milk p-8 text-center">
                <p className="text-soil-muted">{FAQ_PAGE.noResults}</p>
                <a
                  href={WHATSAPP.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-pasture px-5 py-2.5 text-sm font-medium text-milk hover:bg-pasture-deep"
                >
                  <MessageCircle size={16} aria-hidden />
                  Ask on WhatsApp
                </a>
              </div>
            )}
            {categories.map((cat) => (
              <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-title`} className="scroll-mt-28">
                <h2
                  id={`${cat.id}-title`}
                  className="font-display text-2xl font-semibold text-soil md:text-3xl"
                >
                  {cat.title}
                </h2>
                {/* Remount on search so matches open; otherwise the reader controls each one. */}
                <div key={q ? "search" : "browse"} className="mt-5 space-y-3">
                  {cat.items.map((item) => (
                    <FaqEntry key={item.q} item={item} open={Boolean(q)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
