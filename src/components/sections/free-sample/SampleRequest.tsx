"use client";

import { FREE_SAMPLE_HOW, SAMPLE, SAMPLE_RULES, SHOW_PENDING } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { PendingBadge } from "@/components/ui/Pending";
import { SampleRequestForm } from "@/components/ui/SampleRequestForm";

/** Sample rules as a tear-off ticket: "1 L free" stub, perforation, then the rules. */
function RulesTicket() {
  const rules = SAMPLE_RULES.filter((rule) => rule.value || SHOW_PENDING);

  return (
    <div className="relative mt-10 rounded-3xl border border-pasture/10 bg-milk shadow-[0_24px_60px_rgba(43,33,24,0.07)]">
      <div className="flex items-end justify-between gap-4 px-6 pt-6 pb-5 md:px-8">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-soil-muted uppercase">
            Sample rules
          </p>
          <p className="mt-1 font-display text-4xl font-semibold text-pasture md:text-5xl">
            1 L <span className="text-soil">free</span>
          </p>
        </div>
        <span className="rounded-full bg-amber px-3 py-1 text-xs font-semibold tracking-[0.12em] text-soil uppercase">
          One per home
        </span>
      </div>

      {/* Perforation with half-circle notches cut from the page background. */}
      <div className="relative h-0" aria-hidden>
        <span className="absolute top-1/2 -left-3 h-6 w-6 -translate-y-1/2 rounded-full border-r border-pasture/10 bg-cream" />
        <span className="absolute top-1/2 -right-3 h-6 w-6 -translate-y-1/2 rounded-full border-l border-pasture/10 bg-cream" />
        <span className="absolute inset-x-6 top-0 border-t-2 border-dashed border-pasture/15" />
      </div>

      <dl className="px-6 pt-3 pb-4 md:px-8">
        {rules.map((rule) => (
          <div
            key={rule.label}
            className="grid gap-1 border-b border-pasture/10 py-3.5 last:border-b-0 sm:grid-cols-[120px_1fr] sm:gap-4"
          >
            <dt className="text-sm font-medium text-soil">{rule.label}</dt>
            <dd className="text-sm text-soil-muted">
              {rule.value ?? (
                <>
                  <PendingBadge className="mr-2" />
                  {rule.pendingNote}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function SampleRequest() {
  return (
    <section id="request" className="relative scroll-mt-24 overflow-hidden bg-cream">
      <OrganicBlob
        className="pointer-events-none absolute top-1/3 -left-32 h-80 w-80 opacity-25"
        color="#A9C4A0"
      />
      <OrganicBlob
        className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 opacity-20"
        color="#F2A93B"
      />
      <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_460px] lg:gap-16">
        <div>
          <SplitHeading
            text={FREE_SAMPLE_HOW.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
          />
          <p className="mt-4 text-soil-muted md:text-lg">{FREE_SAMPLE_HOW.answer}</p>
          <RulesTicket />
        </div>

        <div className="lg:sticky lg:top-28">
          <h2 className="mb-5 font-display text-2xl font-semibold text-soil md:text-3xl">
            {SAMPLE.heading}
          </h2>
          <SampleRequestForm />
        </div>
      </div>
    </section>
  );
}
