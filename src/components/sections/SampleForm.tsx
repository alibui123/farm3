"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider, OrganicBlob } from "@/components/ui/MilkWave";

type FormState = {
  name: string;
  phone: string;
  address: string;
};

const empty: FormState = { name: "", phone: "", address: "" };

export function SampleForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[0-9+\s-]{10,}$/.test(values.phone.trim()))
      next.phone = "Enter a valid phone number.";
    if (values.address.trim().length < 8)
      next.address = "Add a delivery address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /**
   * TODO: Wire this to Supabase (or your backend) to insert sample requests.
   * Example shape: { name, phone, address, created_at }
   */
  async function handleSampleRequest(data: FormState) {
    // TODO: await supabase.from('sample_requests').insert(data)
    console.info("[TODO] Sample request ready for Supabase insert:", data);
    await new Promise((r) => setTimeout(r, 700));
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      await handleSampleRequest(values);
      setStatus("success");
      setValues(empty);
    } catch {
      setStatus("idle");
      setErrors({ name: "Something went wrong. Please try again." });
    }
  };

  return (
    <section id="sample" className="relative overflow-hidden bg-cream">
      <MilkWaveDivider from="#FFFFFF" to="#FBF7EE" />
      <OrganicBlob
        className="pointer-events-none absolute top-10 -left-20 h-64 w-64 opacity-40"
        color="#A9C4A0"
      />
      <OrganicBlob
        className="pointer-events-none absolute right-0 -bottom-16 h-72 w-72 opacity-30"
        color="#F2A93B"
      />

      <div className="relative mx-auto max-w-xl px-5 py-20 md:px-8 md:py-28">
        <SplitHeading
          text="Request your free morning sample."
          className="text-center font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
        />
        <p className="mx-auto mt-3 max-w-md text-center text-soil-muted">
          We&apos;ll bring a chilled bottle to your door so you can taste the
          difference yourself.
        </p>

        <div className="glass relative mt-10 overflow-hidden rounded-3xl bg-milk/60 p-6 shadow-[0_20px_60px_rgba(43,33,24,0.08)] md:p-8">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pasture text-milk"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  <Check size={32} />
                </motion.div>
                <h3 className="font-display text-2xl text-soil">
                  Sample requested
                </h3>
                <p className="mt-2 text-soil-muted">
                  We&apos;ll confirm on WhatsApp shortly. Expect a sunrise
                  delivery.
                </p>
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                  {Array.from({ length: 14 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute h-3 w-2 rounded-full bg-milk shadow-sm"
                      style={{
                        left: `${8 + (i * 7) % 84}%`,
                        top: "40%",
                      }}
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -120 - (i % 5) * 20, opacity: 0 }}
                      transition={{
                        duration: 1.2 + (i % 4) * 0.15,
                        delay: i * 0.04,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="focus-ring mt-6 rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-soil"
                >
                  Request another
                </button>
              </motion.div>
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
                    {
                      id: "name",
                      label: "Name",
                      type: "text",
                      autoComplete: "name",
                    },
                    {
                      id: "phone",
                      label: "Phone",
                      type: "tel",
                      autoComplete: "tel",
                    },
                    {
                      id: "address",
                      label: "Address",
                      type: "text",
                      autoComplete: "street-address",
                    },
                  ] as const
                ).map((field) => (
                  <label key={field.id} className="block">
                    <span className="mb-1.5 block text-sm font-medium text-soil">
                      {field.label}
                    </span>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      value={values[field.id]}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [field.id]: e.target.value }))
                      }
                      aria-invalid={Boolean(errors[field.id])}
                      aria-describedby={
                        errors[field.id] ? `${field.id}-error` : undefined
                      }
                      className="focus-ring w-full rounded-2xl border border-pasture/15 bg-milk px-4 py-3 text-soil transition-[box-shadow,border-color] outline-none focus:border-amber focus:shadow-[0_0_0_4px_rgba(242,169,59,0.25)]"
                    />
                    {errors[field.id] && (
                      <span
                        id={`${field.id}-error`}
                        className="mt-1.5 block text-sm text-red-700"
                      >
                        {errors[field.id]}
                      </span>
                    )}
                  </label>
                ))}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="focus-ring magnetic inline-flex w-full items-center justify-center rounded-full bg-amber px-6 py-3.5 font-medium text-soil shadow-[0_10px_28px_rgba(242,169,59,0.35)] transition hover:bg-amber-deep disabled:opacity-70"
                >
                  {status === "submitting" ? "Sending…" : "Get Free Sample"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
