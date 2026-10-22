"use client";

import { motion } from "framer-motion";
import {
  FAMILY_STORY,
  FARM_OWNERS,
  HERD_SNAPSHOT,
  SHOW_PENDING,
  SITE,
} from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { Pending, PendingBadge } from "@/components/ui/Pending";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Round "Est. 2023" stamp in the ledger's corner. */
function Stamp() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="absolute -top-6 -right-4 h-24 w-24 rotate-[-12deg] text-amber-deep md:-right-6 md:h-28 md:w-28"
      aria-hidden
    >
      <defs>
        <path id="stamp-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="var(--cream)" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      <text fill="currentColor" fontSize="10" fontWeight="600" letterSpacing="1.8">
        <textPath href="#stamp-ring">FAMILY OWNED · LAHORE · PUNJAB ·</textPath>
      </text>
      <text x="60" y="56" textAnchor="middle" fill="currentColor" fontSize="10" letterSpacing="2">
        EST.
      </text>
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fill="currentColor"
        fontSize="22"
        fontWeight="600"
        className="font-display"
      >
        {SITE.founded}
      </text>
    </svg>
  );
}

function HerdLedger() {
  const reduced = usePrefersReducedMotion();
  const rows = HERD_SNAPSHOT.rows.filter((row) => row.value || SHOW_PENDING);

  return (
    <div className="relative rounded-3xl border border-pasture/10 bg-milk p-6 shadow-[0_24px_60px_rgba(43,33,24,0.08)] md:p-9">
      <Stamp />
      <p className="text-[11px] font-medium tracking-[0.2em] text-soil-muted uppercase">
        Farm ledger
      </p>
      <h3 className="mt-1 font-display text-2xl text-soil md:text-3xl">
        {HERD_SNAPSHOT.heading}
      </h3>

      <dl className="mt-6">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            className="flex items-baseline gap-3 border-b border-pasture/10 py-3.5 last:border-b-0"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <dt className="shrink-0 text-sm text-soil-muted">{row.label}</dt>
            <span
              className="mb-1 min-w-4 flex-1 border-b border-dotted border-soil/25"
              aria-hidden
            />
            <dd className="text-right font-display text-lg text-soil">
              {row.value ?? <PendingBadge />}
            </dd>
          </motion.div>
        ))}
      </dl>

      {HERD_SNAPSHOT.countedOn ? (
        <p className="mt-4 text-xs text-soil-muted">
          Herd counted on {HERD_SNAPSHOT.countedOn}.
        </p>
      ) : (
        <Pending className="mt-4">
          Real herd, cow and buffalo counts, plus the date they were counted.
          Never a rounded-up figure.
        </Pending>
      )}
    </div>
  );
}

function FamilyStory() {
  const { paragraphs, quote } = FAMILY_STORY;
  if (!paragraphs && !SHOW_PENDING) return null;

  return (
    <div className="mt-20 grid gap-10 border-t border-pasture/10 pt-16 md:mt-28 md:pt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div>
        <SplitHeading
          text={FAMILY_STORY.heading}
          className="font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
        />
        {quote ? (
          <figure className="mt-8">
            <blockquote className="relative font-display text-2xl leading-snug text-pasture italic md:text-3xl">
              <span
                className="absolute -top-6 -left-2 font-display text-7xl leading-none text-amber/60 not-italic"
                aria-hidden
              >
                &ldquo;
              </span>
              {quote.text}
            </blockquote>
            <figcaption className="mt-4 text-sm text-soil-muted">
              {quote.name}, {SITE.name}
            </figcaption>
          </figure>
        ) : (
          <Pending className="mt-8">
            Pull quote: one sentence from the owner, with their name if they
            approve it.
          </Pending>
        )}
      </div>

      <div className="space-y-4 text-soil-muted md:text-lg">
        {paragraphs ? (
          paragraphs.map((p) => <p key={p.slice(0, 32)}>{p}</p>)
        ) : (
          <Pending>
            120 to 200 words from the Alvi Family: why they started in 2023,
            what problem they saw in the milk their own family was buying, what
            &ldquo;Shukar&rdquo; means to them, and who works on the farm each
            day.
          </Pending>
        )}
      </div>
    </div>
  );
}

export function FarmOwners() {
  return (
    <section id="family" className="relative overflow-hidden bg-cream">
      <OrganicBlob
        className="pointer-events-none absolute top-24 -left-32 h-80 w-80 opacity-25"
        color="#A9C4A0"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SplitHeading
              text={FARM_OWNERS.heading}
              className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
            />
            <p className="mt-5 text-soil-muted md:text-lg">
              {FARM_OWNERS.answer}
            </p>
            <p className="mt-6 font-display text-xl text-pasture italic">
              {SITE.tagline}
            </p>
          </div>
          <HerdLedger />
        </div>

        <FamilyStory />
      </div>
    </section>
  );
}
