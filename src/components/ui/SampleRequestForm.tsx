"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, LocateFixed, MessageCircle, X } from "lucide-react";
import {
  SAMPLE,
  SAMPLE_FORM,
  SAMPLE_RESULTS,
  SITE,
  WHATSAPP,
  type SampleResult,
} from "@/lib/constants";
import { Pending } from "@/components/ui/Pending";
import { isPkMobile } from "@/lib/phone";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Fields = { name: string; phone: string; address: string };
type Location = { lat: number; lng: number; accuracy: number };
export type SampleRequest = Fields & { location: Location | null; consent: boolean };

const empty: Fields = { name: "", phone: "", address: "" };

/**
 * TODO: Wire this to Supabase (or your backend). The backend checks the
 * delivery area and duplicates, and returns one of the SAMPLE_RESULTS codes.
 * Example shape: { name, phone, address, location, consent, created_at }
 */
async function submitSampleRequest(data: SampleRequest): Promise<SampleResult> {
  // TODO: const { error } = await supabase.from('sample_requests').insert(data)
  console.info("[TODO] Sample request ready for backend insert:", data);
  await new Promise((r) => setTimeout(r, 700));
  return "success";
}

/** The sealed pouch drops into the card and gets its "1 L · FREE" tag. */
function PouchDrop({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto mb-6 h-[108px] w-[76px]" aria-hidden>
      <motion.div
        className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-t-md rounded-b-[26px] border border-soil/15 bg-milk shadow-[0_10px_24px_rgba(43,33,24,0.12)]"
        initial={reduced ? false : { y: -220, rotate: -8 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, mass: 0.9 }}
      >
        <div className="absolute inset-x-0 top-0 h-3 bg-pasture" />
        <span className="font-display text-[11px] font-semibold text-pasture">{SITE.shortName}</span>
      </motion.div>
      <motion.span
        className="absolute -top-3 -right-10 rounded-full bg-amber px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-soil shadow-[0_4px_12px_rgba(242,169,59,0.4)]"
        initial={reduced ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.55, duration: 0.35, ease: [0.34, 1.8, 0.64, 1] }}
      >
        1 L · FREE
      </motion.span>
      <motion.div
        className="absolute -bottom-3 left-1/2 h-2 w-28 -translate-x-1/2 rounded-full bg-soil/15"
        initial={reduced ? false : { scaleX: 0.3, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      />
    </div>
  );
}

function ResultPanel({
  result,
  name,
  onReset,
}: {
  result: SampleResult;
  name: string;
  onReset: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const copy = SAMPLE_RESULTS[result];
  const ok = result === "success";

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center py-8 text-center"
      role="status"
    >
      {ok ? (
        <PouchDrop reduced={reduced} />
      ) : (
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber/20 text-soil" aria-hidden>
          <AlertCircle size={28} />
        </span>
      )}
      <motion.h3
        className="font-display text-2xl text-soil"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: ok ? 0.7 : 0 }}
      >
        {copy.title.replace("[Name]", name)}
      </motion.h3>
      <motion.p
        className="mt-2 max-w-sm text-soil-muted"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: ok ? 0.8 : 0.05 }}
      >
        {copy.body}
      </motion.p>
      {ok && (
        <motion.a
          href="/track-sample"
          className="focus-ring mt-4 text-sm font-medium text-pasture underline underline-offset-4"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Track your request
        </motion.a>
      )}
      {!ok && (
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-pasture px-5 py-2.5 text-sm font-medium text-milk hover:bg-pasture-deep"
          >
            <MessageCircle size={16} aria-hidden />
            Message us on WhatsApp
          </a>
          {result === "duplicate" && (
            <a
              href="/track-sample"
              className="focus-ring rounded-full px-4 py-2.5 text-sm font-medium text-pasture underline underline-offset-4"
            >
              Track your request
            </a>
          )}
          <button
            type="button"
            onClick={onReset}
            className="focus-ring rounded-full px-4 py-2.5 text-sm font-medium text-pasture underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      )}
    </motion.div>
  );
}

/** Free-sample request form, shared by the home page and /free-sample. */
export function SampleRequestForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [location, setLocation] = useState<Location | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "consent", string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SampleResult | null>(null);
  const [firstName, setFirstName] = useState("");

  const validate = () => {
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = SAMPLE_FORM.errors.name;
    if (!isPkMobile(values.phone)) next.phone = SAMPLE_FORM.errors.phone;
    if (values.address.trim().length < 8) next.address = SAMPLE_FORM.errors.address;
    if (!consent) next.consent = SAMPLE_FORM.errors.consent;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setLocationError(true);
      return;
    }
    setLocating(true);
    setLocationError(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
        });
        setLocating(false);
      },
      () => {
        setLocationError(true);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    let code: SampleResult;
    try {
      code = await submitSampleRequest({ ...values, location, consent });
    } catch {
      code = "error";
    }
    setSubmitting(false);
    setFirstName(values.name.trim().split(" ")[0]);
    setResult(code);
    if (code === "success") {
      setValues(empty);
      setLocation(null);
      setConsent(false);
    }
  };

  const describedBy = (id: string, hint: boolean) =>
    [hint && `${id}-hint`, errors[id as keyof typeof errors] && `${id}-error`]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="glass relative overflow-hidden rounded-3xl bg-milk/60 p-6 shadow-[0_20px_60px_rgba(43,33,24,0.08)] md:p-8">
      <AnimatePresence mode="wait">
        {result ? (
          <ResultPanel
            key="result"
            result={result}
            name={firstName}
            onReset={() => setResult(null)}
          />
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
            noValidate
          >
            {(
              [
                { id: "name", type: "text", autoComplete: "name" },
                { id: "phone", type: "tel", autoComplete: "tel" },
                { id: "address", type: "text", autoComplete: "street-address" },
              ] as const
            ).map((field) => {
              const copy = SAMPLE_FORM.fields[field.id];
              return (
                <label key={field.id} className="block">
                  <span className="mb-1.5 block text-sm font-medium text-soil">{copy.label}</span>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    value={values[field.id]}
                    onChange={(e) => {
                      setValues((v) => ({ ...v, [field.id]: e.target.value }));
                      setErrors((prev) => ({ ...prev, [field.id]: undefined }));
                    }}
                    aria-invalid={Boolean(errors[field.id])}
                    aria-describedby={describedBy(field.id, Boolean(copy.hint))}
                    className="focus-ring w-full rounded-2xl border border-pasture/15 bg-milk px-4 py-3 text-soil transition-[box-shadow,border-color] outline-none focus:border-amber focus:shadow-[0_0_0_4px_rgba(242,169,59,0.25)]"
                  />
                  {copy.hint && (
                    <span id={`${field.id}-hint`} className="mt-1.5 block text-xs text-soil-muted">
                      {copy.hint}
                    </span>
                  )}
                  {errors[field.id] && (
                    <span id={`${field.id}-error`} className="mt-1.5 block text-sm text-red-700">
                      {errors[field.id]}
                    </span>
                  )}
                </label>
              );
            })}

            <div>
              <p className="mb-1.5 text-sm font-medium text-soil">{SAMPLE_FORM.location.label}</p>
              {location ? (
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-pasture/20 bg-pasture/[0.07] px-4 py-3">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-pasture">
                    <Check size={16} strokeWidth={3} aria-hidden />
                    {SAMPLE_FORM.location.added}
                    <span className="font-normal text-soil-muted">(within about {location.accuracy} m)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setLocation(null)}
                    className="focus-ring inline-flex items-center gap-1 rounded-full text-sm text-soil-muted hover:text-soil"
                  >
                    <X size={14} aria-hidden />
                    {SAMPLE_FORM.location.remove}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={locate}
                  disabled={locating}
                  aria-describedby="location-hint"
                  className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-pasture/30 bg-milk px-4 py-3 text-sm font-medium text-pasture transition hover:border-pasture/60 disabled:opacity-70"
                >
                  <LocateFixed size={17} aria-hidden />
                  {locating ? "Finding your location..." : SAMPLE_FORM.location.button}
                </button>
              )}
              <p id="location-hint" className="mt-1.5 text-xs text-soil-muted" aria-live="polite">
                {locationError ? SAMPLE_FORM.location.denied : SAMPLE_FORM.location.hint}
              </p>
            </div>

            <div>
              <label className="flex items-start gap-3 text-sm text-soil">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    setErrors((prev) => ({ ...prev, consent: undefined }));
                  }}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  className="focus-ring mt-0.5 h-5 w-5 shrink-0 accent-[var(--pasture)]"
                />
                {SAMPLE_FORM.consent}
              </label>
              {errors.consent && (
                <span id="consent-error" className="mt-1.5 block text-sm text-red-700">
                  {errors.consent}
                </span>
              )}
              <Pending className="mt-3">{SAMPLE_FORM.privacyPending}</Pending>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-amber px-6 py-3.5 font-medium text-soil shadow-[0_10px_28px_rgba(242,169,59,0.35)] transition hover:bg-amber-deep disabled:opacity-70"
            >
              {submitting ? SAMPLE.loading : SAMPLE.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
