"use client";

import { motion } from "framer-motion";
import { Droplet, Fan, Stethoscope, Tag, Wheat } from "lucide-react";
import { ANIMAL_CARE, SHOW_PENDING, SITE } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider, OrganicBlob } from "@/components/ui/MilkWave";
import { PendingBadge } from "@/components/ui/Pending";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const ICONS: Record<string, typeof Tag> = {
  tag: Tag,
  fodder: Wheat,
  water: Droplet,
  cooling: Fan,
  vet: Stethoscope,
};

const TRACE = ["Ear tag", "Cow or buffalo", "Your litre"];

/** Amber ear tag hanging from a cord; swings gently unless motion is reduced. */
function EarTag() {
  return (
    <div className="relative flex h-[260px] w-[200px] justify-center" aria-hidden>
      <span className="absolute top-0 h-12 w-px bg-soil/30" />
      <div className="animate-swing mt-10">
        <svg viewBox="0 0 160 200" className="h-[200px] w-[160px] drop-shadow-[0_18px_28px_rgba(216,144,32,0.35)]">
          <rect x="58" y="0" width="44" height="46" rx="14" fill="var(--amber-deep)" />
          <circle cx="80" cy="16" r="7" fill="var(--milk)" />
          <rect x="10" y="34" width="140" height="162" rx="36" fill="var(--amber)" />
          <rect x="22" y="46" width="116" height="138" rx="26" fill="none" stroke="var(--soil)" strokeOpacity="0.12" strokeWidth="2" />
          <text x="80" y="84" textAnchor="middle" fill="var(--soil)" fontSize="11" fontWeight="600" letterSpacing="2.5">
            {SITE.shortName.toUpperCase()}
          </text>
          <text x="80" y="146" textAnchor="middle" fill="var(--soil)" fontSize="52" fontWeight="600" className="font-display">
            042
          </text>
          <rect x="52" y="160" width="56" height="3" rx="1.5" fill="var(--soil)" fillOpacity="0.25" />
        </svg>
      </div>
    </div>
  );
}

function TagFeature({ title, body }: { title: string; body: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <GlassCard className="bg-milk/70 p-6 md:col-span-6 md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-soil-muted uppercase">
            Traceable by design
          </p>
          <h3 className="mt-2 font-display text-2xl text-soil md:text-4xl">
            {title}
          </h3>
          <p className="mt-3 max-w-lg text-soil-muted md:text-lg">{body}</p>

          <ol className="mt-8 flex flex-wrap items-center gap-2" aria-label="How a litre is traced">
            {TRACE.map((step, i) => (
              <motion.li
                key={step}
                className="flex items-center gap-2"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ delay: 0.2 + i * 0.25, duration: 0.5 }}
              >
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    i === TRACE.length - 1
                      ? "bg-pasture text-milk"
                      : "bg-pasture/10 text-pasture"
                  }`}
                >
                  {step}
                </span>
                {i < TRACE.length - 1 && (
                  <span className="h-px w-5 bg-pasture/40" aria-hidden />
                )}
              </motion.li>
            ))}
          </ol>
        </div>
        <div className="flex justify-center">
          <EarTag />
        </div>
      </div>
    </GlassCard>
  );
}

export function AnimalCare() {
  const [tag, ...rest] = ANIMAL_CARE.practices;
  const others = rest.filter((p) => p.confirmed || SHOW_PENDING);
  const span = others.length === 3 ? "md:col-span-2" : "md:col-span-3";

  return (
    <section id="care" className="relative overflow-hidden bg-milk">
      <MilkWaveDivider from="#FBF7EE" to="#FFFFFF" />
      <OrganicBlob
        className="pointer-events-none absolute -right-28 bottom-16 h-80 w-80 opacity-25"
        color="#F2A93B"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text={ANIMAL_CARE.heading}
          className="max-w-3xl font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />
        <p className="mt-4 max-w-2xl text-soil-muted">{ANIMAL_CARE.answer}</p>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          <TagFeature title={tag.title} body={tag.body ?? ""} />

          {others.map((practice) => {
            const Icon = ICONS[practice.id] ?? Tag;
            const pending = !practice.confirmed;
            return (
              <GlassCard
                key={practice.id}
                className={`${span} p-6 md:p-8 ${
                  pending
                    ? "border-dashed! border-amber-deep/50!"
                    : "bg-milk/70"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <Icon className="h-7 w-7 text-pasture" strokeWidth={1.75} aria-hidden />
                  {pending && <PendingBadge />}
                </div>
                <h3 className="font-display text-2xl text-soil">{practice.title}</h3>
                {practice.body && (
                  <p className={`mt-2 max-w-md ${pending ? "text-soil-muted/80" : "text-soil-muted"}`}>
                    {practice.body}
                  </p>
                )}
                {pending && practice.pendingNote && (
                  <p className="mt-3 text-sm text-soil">
                    <span className="font-medium">Needs:</span> {practice.pendingNote}
                  </p>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
