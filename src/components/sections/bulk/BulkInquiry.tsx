"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { BULK_FORM, SITE, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/constants";
import { isPkMobile } from "@/lib/phone";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider, OrganicBlob } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Fields = {
  business: string;
  contact: string;
  phone: string;
  businessType: string;
  milkType: string;
  quantity: string;
  area: string;
  message: string;
};
export type BulkInquiry = Fields;

const empty: Fields = {
  business: "",
  contact: "",
  phone: "",
  businessType: "",
  milkType: "",
  quantity: "",
  area: "",
  message: "",
};

/**
 * TODO: Wire this to Supabase (or your backend), e.g. a bulk_inquiries table,
 * and notify the team on WhatsApp.
 */
async function submitBulkInquiry(data: BulkInquiry) {
  console.info("[TODO] Bulk inquiry ready for backend insert:", data);
  await new Promise((r) => setTimeout(r, 700));
}

/*
 * Crate stack: more litres → more crates, up to a 3-2-1 pyramid. A crate is
 * not a fixed volume; the stack is a picture of "more", never a capacity promise.
 */
const SLOTS = [
  { x: 0, row: 0 },
  { x: -1, row: 0 },
  { x: 1, row: 0 },
  { x: -0.5, row: 1 },
  { x: 0.5, row: 1 },
  { x: 0, row: 2 },
];
const THRESHOLDS = [1, 26, 61, 121, 251, 501];
const crateCount = (litres: number) => THRESHOLDS.filter((t) => litres >= t).length;

function CrateStack({ litres, milkType }: { litres: number; milkType: string }) {
  const reduced = usePrefersReducedMotion();
  const count = crateCount(litres);

  return (
    <div className="rounded-3xl border border-pasture/10 bg-milk p-6" aria-hidden>
      <div className="relative mx-auto h-[230px] w-full max-w-[340px]">
        <AnimatePresence>
          {SLOTS.slice(0, count).map((slot, i) => (
            <motion.div
              key={i}
              className="absolute bottom-[18px] left-1/2 h-[62px] w-[100px]"
              style={{ marginLeft: slot.x * 104 - 50, marginBottom: slot.row * 66 }}
              initial={reduced ? false : { y: -160, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduced ? undefined : { y: -40, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-pasture shadow-[0_10px_22px_rgba(47,93,58,0.25)]">
                <span className="absolute inset-x-3 top-2.5 h-px bg-milk/25" />
                <span className="absolute inset-x-3 bottom-2.5 h-px bg-milk/25" />
                <span className="font-display text-sm font-semibold text-milk">{SITE.shortName}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {/* Pallet */}
        <div className="absolute inset-x-6 bottom-0 h-[18px] rounded-md bg-[var(--steel-edge)]">
          <span className="absolute inset-x-4 top-1/2 h-px bg-soil/15" />
        </div>
        {count === 0 && (
          <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-sm text-soil-muted">
            Enter your litres per day
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-pasture/10 pt-4">
        <p className="font-display text-2xl text-soil">
          {litres > 0 ? `${litres.toLocaleString("en-PK")} L` : "— L"}
          <span className="ml-1 font-sans text-sm text-soil-muted">a day</span>
        </p>
        {milkType && (
          <span className="rounded-full bg-amber px-3 py-1 text-xs font-semibold tracking-[0.12em] text-soil uppercase">
            {milkType}
          </span>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "focus-ring w-full rounded-2xl border border-pasture/15 bg-milk px-4 py-3 text-soil transition-[box-shadow,border-color] outline-none focus:border-amber focus:shadow-[0_0_0_4px_rgba(242,169,59,0.25)]";

function ChoiceGroup({
  name,
  legend,
  options,
  value,
  error,
  onChange,
}: {
  name: keyof Fields;
  legend: string;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-2 text-sm font-medium text-soil">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
            <span className="inline-flex rounded-full border border-pasture/20 bg-milk px-4 py-2 text-sm text-soil transition-colors peer-checked:border-pasture peer-checked:bg-pasture peer-checked:text-milk peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber hover:border-pasture/50">
              {option}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <span id={`${name}-error`} className="mt-1.5 block text-sm text-red-700">
          {error}
        </span>
      )}
    </fieldset>
  );
}

export function BulkInquiry() {
  const reduced = usePrefersReducedMotion();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const litres = Math.max(0, Math.floor(Number(values.quantity) || 0));
  /** Update a field and clear its error, so fixed fields stop showing a message. */
  const set = (key: keyof Fields) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e = BULK_FORM.errors;
    const next: typeof errors = {};
    if (!values.business.trim()) next.business = e.business;
    if (!values.contact.trim()) next.contact = e.contact;
    if (!isPkMobile(values.phone)) next.phone = e.phone;
    if (!values.businessType) next.businessType = e.businessType;
    if (!values.milkType) next.milkType = e.milkType;
    if (litres < 1) next.quantity = e.quantity;
    if (values.area.trim().length < 3) next.area = e.area;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await submitBulkInquiry({ ...values, quantity: String(litres) });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const text = (key: "business" | "contact" | "phone" | "area", type = "text", autoComplete?: string) => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-soil">{BULK_FORM.fields[key]}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        value={values[key]}
        onChange={(e) => set(key)(e.target.value)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        className={inputClass}
      />
      {errors[key] && (
        <span id={`${key}-error`} className="mt-1.5 block text-sm text-red-700">
          {errors[key]}
        </span>
      )}
    </label>
  );

  return (
    <section id="inquiry" className="relative scroll-mt-24 overflow-hidden bg-cream">
      <MilkWaveDivider from="#FFFFFF" to="#FBF7EE" />
      <OrganicBlob
        className="pointer-events-none absolute -right-28 bottom-24 h-80 w-80 opacity-20"
        color="#F2A93B"
      />
      <div className="relative mx-auto grid max-w-6xl items-start gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SplitHeading
            text={BULK_FORM.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
          />
          <p className="mt-4 text-soil-muted md:text-lg">{BULK_FORM.intro}</p>
          <div className="mt-8">
            <CrateStack litres={litres} milkType={values.milkType} />
            <p className="mt-3 text-xs text-soil-muted">{BULK_FORM.visualCaption}</p>
          </div>
          <a
            href={whatsappLink(BULK_FORM.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-8 flex items-center gap-4 rounded-3xl border border-pasture/10 bg-milk p-5 transition hover:border-pasture/30"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white" aria-hidden>
              <MessageCircle size={22} />
            </span>
            <span>
              <span className="block text-sm text-soil-muted">{BULK_FORM.direct}</span>
              <span className="font-display text-xl text-soil">{WHATSAPP_DISPLAY}</span>
            </span>
          </a>
        </div>

        <div className="glass rounded-3xl bg-milk/60 p-6 shadow-[0_20px_60px_rgba(43,33,24,0.08)] md:p-8">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-12 text-center"
                role="status"
              >
                <motion.span
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pasture text-milk"
                  initial={reduced ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  aria-hidden
                >
                  <Check size={30} />
                </motion.span>
                <p className="max-w-sm font-display text-2xl text-soil">{BULK_FORM.success}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {text("business", "text", "organization")}
                  {text("contact", "text", "name")}
                </div>
                {text("phone", "tel", "tel")}
                <ChoiceGroup
                  name="businessType"
                  legend={BULK_FORM.fields.businessType}
                  options={BULK_FORM.businessTypes}
                  value={values.businessType}
                  error={errors.businessType}
                  onChange={set("businessType")}
                />
                <ChoiceGroup
                  name="milkType"
                  legend={BULK_FORM.fields.milkType}
                  options={BULK_FORM.milkTypes}
                  value={values.milkType}
                  error={errors.milkType}
                  onChange={set("milkType")}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-soil">{BULK_FORM.fields.quantity}</span>
                    <input
                      type="number"
                      min={1}
                      inputMode="numeric"
                      value={values.quantity}
                      onChange={(e) => set("quantity")(e.target.value)}
                      aria-invalid={Boolean(errors.quantity)}
                      aria-describedby={errors.quantity ? "quantity-error" : undefined}
                      className={inputClass}
                    />
                    {errors.quantity && (
                      <span id="quantity-error" className="mt-1.5 block text-sm text-red-700">
                        {errors.quantity}
                      </span>
                    )}
                  </label>
                  {text("area")}
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-soil">{BULK_FORM.fields.message}</span>
                  <textarea
                    rows={3}
                    value={values.message}
                    onChange={(e) => set("message")(e.target.value)}
                    className={`${inputClass} resize-y`}
                  />
                </label>
                {status === "error" && (
                  <p className="text-sm text-red-700" role="alert">
                    {BULK_FORM.error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-amber px-6 py-3.5 font-medium text-soil shadow-[0_10px_28px_rgba(242,169,59,0.35)] transition hover:bg-amber-deep disabled:opacity-70"
                >
                  {status === "sending" ? BULK_FORM.loading : BULK_FORM.submit}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
