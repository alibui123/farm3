"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Lock, MessageCircle } from "lucide-react";
import {
  SAMPLE_HREF,
  SHOW_PENDING,
  TRACK,
  TRACK_STATUSES,
  WHATSAPP,
  whatsappLink,
  type TrackStatus,
} from "@/lib/constants";
import { isPkMobile } from "@/lib/phone";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { Pending } from "@/components/ui/Pending";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * TODO: Look the number up in the sample_requests table (the backend also
 * rate-limits and returns "too_many"). Until that exists this returns
 * "unavailable", so the page never shows a status it does not know.
 */
async function lookupSampleStatus(phone: string): Promise<TrackStatus> {
  console.info("[TODO] Sample status lookup for:", phone);
  await new Promise((r) => setTimeout(r, 600));
  return "unavailable";
}

/** Four-stop rail; a small sealed pouch slides to the current stop. */
function Tracker({ step, reduced }: { step: number; reduced: boolean }) {
  const last = TRACK.steps.length - 1;
  return (
    <ol className="relative mt-8 grid grid-cols-4" aria-label="Sample progress">
      <div className="absolute top-[22px] right-[12.5%] left-[12.5%] h-1 rounded-full bg-pasture/10" aria-hidden>
        <motion.div
          className="h-full origin-left rounded-full bg-pasture"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: step / last }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <motion.div
        className="absolute top-0 z-20 -ml-[16px] flex h-[44px] w-8 items-end"
        initial={reduced ? false : { left: "12.5%" }}
        animate={{ left: `${12.5 + step * 25}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 16, delay: reduced ? 0 : 0.15 }}
        aria-hidden
      >
        <span className="relative mb-[12px] flex h-[30px] w-8 items-center justify-center overflow-hidden rounded-t-[4px] rounded-b-[12px] border border-soil/15 bg-milk shadow-[0_6px_14px_rgba(43,33,24,0.15)]">
          <span className="absolute inset-x-0 top-0 h-1.5 bg-pasture" />
          <span className="mt-1 h-1 w-3 rounded-full bg-pasture/30" />
        </span>
      </motion.div>
      {TRACK.steps.map((label, i) => {
        const reached = i <= step;
        return (
          <li
            key={label}
            aria-current={i === step ? "step" : undefined}
            className="relative flex flex-col items-center pt-[52px] text-center"
          >
            <span
              className={`absolute top-[15px] z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-pasture transition-colors duration-500 ${
                reached ? "bg-pasture" : "bg-milk"
              }`}
              aria-hidden
            />
            <span className={`text-xs font-medium md:text-sm ${reached ? "text-soil" : "text-soil-muted"}`}>
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StatusPanel({ status }: { status: TrackStatus }) {
  const reduced = usePrefersReducedMotion();
  const copy = TRACK_STATUSES[status];
  const tracked = copy.step !== null;

  return (
    <motion.div
      key={status}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mt-6 rounded-3xl border border-pasture/10 bg-milk p-6 md:p-7"
      role="status"
    >
      {tracked ? (
        <Tracker step={copy.step!} reduced={reduced} />
      ) : (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber/20 text-soil" aria-hidden>
          <AlertCircle size={24} />
        </span>
      )}
      <p className={`text-soil md:text-lg ${tracked ? "mt-6 text-center" : "mt-4"}`}>{copy.message}</p>
      {copy.pendingNote && <Pending className="mt-4">{copy.pendingNote}</Pending>}

      <div className={`mt-5 flex flex-wrap gap-3 ${tracked ? "justify-center" : ""}`}>
        {copy.cta && (
          <a
            href={whatsappLink(copy.cta.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-pasture px-5 py-2.5 text-sm font-medium text-milk hover:bg-pasture-deep"
          >
            {copy.cta.label}
          </a>
        )}
        {status === "not_found" && (
          <a
            href={SAMPLE_HREF}
            className="focus-ring inline-flex items-center rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-soil hover:bg-amber-deep"
          >
            Get a Free Sample
          </a>
        )}
        {!tracked && (
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-pasture/25 px-5 py-2.5 text-sm font-medium text-pasture hover:bg-pasture/5"
          >
            <MessageCircle size={16} aria-hidden />
            Message us on WhatsApp
          </a>
        )}
      </div>
    </motion.div>
  );
}

/** Dev-only: preview every status design without a backend. */
function StatusPreview({ onPick }: { onPick: (s: TrackStatus) => void }) {
  if (!SHOW_PENDING) return null;
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-amber-deep/60 bg-amber/10 p-4">
      <p className="text-xs font-semibold tracking-[0.12em] text-soil uppercase">Dev preview</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(Object.keys(TRACK_STATUSES) as TrackStatus[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onPick(s)}
            className="focus-ring rounded-full bg-milk px-3 py-1 text-xs text-soil ring-1 ring-soil/10 hover:ring-pasture/40"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SampleTracker() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<TrackStatus | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isPkMobile(phone)) {
      setError("Enter the Pakistani mobile number you used, for example 0300 1234567.");
      return;
    }
    setError("");
    setChecking(true);
    let next: TrackStatus;
    try {
      next = await lookupSampleStatus(phone);
    } catch {
      next = "unavailable";
    }
    setChecking(false);
    setStatus(next);
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-cream">
      <OrganicBlob
        className="pointer-events-none absolute top-24 -left-28 h-80 w-80 opacity-30"
        color="#A9C4A0"
      />
      <OrganicBlob
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 opacity-25"
        color="#F2A93B"
      />

      <div className="relative mx-auto max-w-xl px-5 pt-32 pb-24 md:px-8 md:pt-40">
        <h1 className="font-display text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance text-soil">
          {TRACK.heading}
        </h1>
        <p className="mt-4 text-soil-muted md:text-lg">{TRACK.intro}</p>

        <form
          onSubmit={onSubmit}
          noValidate
          className="glass mt-8 rounded-3xl bg-milk/60 p-5 shadow-[0_20px_60px_rgba(43,33,24,0.08)] md:p-6"
        >
          <label htmlFor="track-phone" className="mb-1.5 block text-sm font-medium text-soil">
            {TRACK.fieldLabel}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="track-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="0300 1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "track-error" : "track-privacy"}
              className="focus-ring min-w-0 flex-1 rounded-2xl border border-pasture/15 bg-milk px-4 py-3 text-soil transition-[box-shadow,border-color] outline-none placeholder:text-soil-muted/70 focus:border-amber focus:shadow-[0_0_0_4px_rgba(242,169,59,0.25)]"
            />
            <button
              type="submit"
              disabled={checking}
              className="focus-ring inline-flex items-center justify-center rounded-full bg-amber px-6 py-3 font-medium whitespace-nowrap text-soil shadow-[0_10px_28px_rgba(242,169,59,0.35)] transition hover:bg-amber-deep disabled:opacity-70"
            >
              {checking ? TRACK.loading : TRACK.button}
            </button>
          </div>
          {error && (
            <p id="track-error" className="mt-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <p id="track-privacy" className="mt-3 inline-flex items-start gap-2 text-xs text-soil-muted">
            <Lock size={13} className="mt-px shrink-0" aria-hidden />
            {TRACK.privacy}
          </p>
        </form>

        <AnimatePresence mode="wait">{status && <StatusPanel key={status} status={status} />}</AnimatePresence>

        <StatusPreview onPick={setStatus} />

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-pasture/10 pt-6 text-sm text-soil-muted">
          <span>{TRACK.support}</span>
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-1.5 font-medium text-pasture underline underline-offset-4"
          >
            <MessageCircle size={15} aria-hidden />
            Chat on WhatsApp
          </a>
          <a
            href={SAMPLE_HREF}
            className="focus-ring inline-flex items-center gap-1.5 font-medium text-pasture underline underline-offset-4"
          >
            <Check size={15} aria-hidden />
            Get a Free Sample
          </a>
        </div>
      </div>
    </section>
  );
}
