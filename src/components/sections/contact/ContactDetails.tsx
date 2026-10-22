"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  CONTACT,
  CONTACT_FORM,
  CONTACT_PAGE,
  CONTACT_STATUS,
  SERVICE_AREAS,
  SHOW_PENDING,
  SOCIAL,
  WHATSAPP,
  WHATSAPP_DISPLAY,
} from "@/lib/constants";
import { isPkMobile } from "@/lib/phone";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { PendingBadge } from "@/components/ui/Pending";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Row = { channel: string; value: React.ReactNode; pending?: boolean; hidden?: boolean };

/** TODO: Wire this to Supabase (or your backend), e.g. a contact_messages table. */
async function submitContactMessage(data: { name: string; phone: string; message: string }) {
  console.info("[TODO] Contact message ready for backend insert:", data);
  await new Promise((r) => setTimeout(r, 700));
}

const inputClass =
  "focus-ring w-full rounded-2xl border border-pasture/15 bg-milk px-4 py-3 text-soil transition-[box-shadow,border-color] outline-none focus:border-amber focus:shadow-[0_0_0_4px_rgba(242,169,59,0.25)]";

function ContactForm() {
  const reduced = usePrefersReducedMotion();
  const [values, setValues] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (key: keyof typeof values) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = CONTACT_FORM.errors.name;
    if (!isPkMobile(values.phone)) next.phone = CONTACT_FORM.errors.phone;
    if (values.message.trim().length < 5) next.message = CONTACT_FORM.errors.message;
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    try {
      await submitContactMessage(values);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field = (key: keyof typeof values, type: string, autoComplete?: string) => {
    const props = {
      value: values[key],
      autoComplete,
      "aria-invalid": Boolean(errors[key]),
      "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
      className: inputClass,
    };
    return (
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-soil">{CONTACT_FORM.fields[key]}</span>
        {type === "textarea" ? (
          <textarea rows={4} {...props} className={`${inputClass} resize-y`} onChange={(e) => set(key)(e.target.value)} />
        ) : (
          <input type={type} {...props} onChange={(e) => set(key)(e.target.value)} />
        )}
        {errors[key] && (
          <span id={`contact-${key}-error`} className="mt-1.5 block text-sm text-red-700">
            {errors[key]}
          </span>
        )}
      </label>
    );
  };

  return (
    <div className="glass rounded-3xl bg-milk/60 p-6 shadow-[0_20px_60px_rgba(43,33,24,0.08)] md:p-8">
      <h2 className="font-display text-2xl font-semibold text-soil md:text-3xl">{CONTACT_FORM.heading}</h2>
      <p className="mt-2 text-sm text-soil-muted">{CONTACT_FORM.intro}</p>
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={reduced ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
            role="status"
          >
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pasture text-milk" aria-hidden>
              <Check size={26} />
            </span>
            <p className="font-display text-xl text-soil">{CONTACT_FORM.success}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate className="mt-6 space-y-5" exit={{ opacity: 0 }}>
            {field("name", "text", "name")}
            {field("phone", "tel", "tel")}
            {field("message", "textarea")}
            {status === "error" && (
              <p className="text-sm text-red-700" role="alert">
                {CONTACT_FORM.error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-amber px-6 py-3.5 font-medium text-soil shadow-[0_10px_28px_rgba(242,169,59,0.35)] transition hover:bg-amber-deep disabled:opacity-70"
            >
              {status === "sending" ? CONTACT_FORM.loading : CONTACT_FORM.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactDetails() {
  const pending = !CONTACT_STATUS.channelsConfirmed;
  const link = "focus-ring font-medium text-pasture underline-offset-4 hover:underline";
  const rows: Row[] = [
    {
      channel: "WhatsApp",
      value: (
        <a href={WHATSAPP.href} target="_blank" rel="noopener noreferrer" className={link}>
          {WHATSAPP_DISPLAY}
        </a>
      ),
      pending,
    },
    {
      channel: "Phone",
      value: (
        <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className={link}>
          {CONTACT.phone}
        </a>
      ),
      pending,
    },
    {
      channel: "Email",
      value: (
        <a href={`mailto:${CONTACT.email}`} className={link}>
          {CONTACT.email}
        </a>
      ),
      pending,
    },
    {
      channel: "Business hours",
      value: CONTACT_STATUS.businessHours,
      pending: !CONTACT_STATUS.businessHours,
      hidden: !CONTACT_STATUS.businessHours && !SHOW_PENDING,
    },
    {
      channel: "Service areas",
      value: `${SERVICE_AREAS.map((a) => a.name).join(", ")} and surrounding areas, Lahore`,
    },
    { channel: "Farm visits", value: "On request, by WhatsApp" },
    ...SOCIAL.map((s) => ({
      channel: s.label,
      value: CONTACT_STATUS.socialConfirmed ? (
        <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
          {s.href.replace(/^https?:\/\/(www\.)?/, "")}
        </a>
      ) : null,
      pending: !CONTACT_STATUS.socialConfirmed,
      hidden: !CONTACT_STATUS.socialConfirmed && !SHOW_PENDING,
    })),
  ];

  return (
    <section id="details" className="relative bg-cream">
      <MilkWaveDivider from="#FFFFFF" to="#FBF7EE" />
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SplitHeading
            text={CONTACT_PAGE.detailsHeading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
          />
          <dl className="mt-8 rounded-3xl border border-pasture/10 bg-milk px-6 md:px-8">
            {rows
              .filter((row) => !row.hidden)
              .map((row) => (
                <div
                  key={row.channel}
                  className="grid gap-1 border-b border-pasture/10 py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-medium text-soil">{row.channel}</dt>
                  <dd className="flex flex-wrap items-center gap-2 text-soil-muted">
                    {row.value}
                    {row.pending && <PendingBadge />}
                  </dd>
                </div>
              ))}
          </dl>
          <p className="mt-4 text-sm text-soil-muted">{CONTACT_PAGE.noAddress}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
