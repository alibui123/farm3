"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCheck, Send } from "lucide-react";
import { CONTACT_PAGE, CONTACT_TOPICS, SITE, whatsappLink } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type TopicId = (typeof CONTACT_TOPICS)[number]["id"];

/** Types `text` out a few characters per frame; shows it whole for reduced motion. */
function useTypewriter(text: string, enabled: boolean) {
  const [count, setCount] = useState(text.length);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let n = 0;
    const tick = () => {
      n = Math.min(text.length, n + 2);
      setCount(n);
      if (n < text.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, enabled]);
  return enabled ? text.slice(0, count) : text;
}

/**
 * Pick a topic and its pre-filled WhatsApp message types into the draft
 * bubble; "Send on WhatsApp" opens wa.me with exactly that message, so the
 * team knows what each customer wants.
 */
export function MessageComposer() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<TopicId>(CONTACT_TOPICS[0].id);
  const topic = CONTACT_TOPICS.find((t) => t.id === active)!;
  const typed = useTypewriter(topic.message, !reduced);
  const typing = typed.length < topic.message.length;

  return (
    <section id="topics" className="relative bg-milk">
      <MilkWaveDivider from="#FBF7EE" to="#FFFFFF" />
      <div className="mx-auto grid max-w-6xl items-start gap-6 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_420px] lg:gap-16">
        <div>
          <SplitHeading
            text={CONTACT_PAGE.topicsHeading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
          />
          <ul className="mt-8 hidden space-y-3 lg:block" role="list">
            {CONTACT_TOPICS.map((t) => {
              const on = t.id === active;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(t.id)}
                    className={`focus-ring flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-[border-color,background-color] duration-300 md:p-5 ${
                      on ? "border-pasture bg-pasture/[0.06]" : "border-pasture/10 bg-cream/60 hover:border-pasture/30"
                    }`}
                  >
                    <span
                      className={`mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-pasture transition-colors ${on ? "bg-pasture" : "bg-transparent"}`}
                      aria-hidden
                    />
                    <span>
                      <span className="block font-display text-xl text-soil">{t.label}</span>
                      <span className="mt-0.5 block text-sm text-soil-muted">{t.body}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile: compact topic chips sit right above the chat preview, so each tap visibly changes the message */}
          <div className="mt-6 lg:hidden">
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Choose a topic">
              {CONTACT_TOPICS.map((t, i) => {
                const on = t.id === active;
                /* An odd last chip spans both columns so the grid ends flush */
                const last = i === CONTACT_TOPICS.length - 1 && CONTACT_TOPICS.length % 2 === 1;
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(t.id)}
                    className={`focus-ring flex min-h-11 items-center justify-center rounded-xl border px-3 py-2 text-center text-sm leading-tight font-medium transition-colors ${last ? "col-span-2" : ""} ${
                      on ? "border-pasture bg-pasture text-milk" : "border-pasture/20 bg-cream/60 text-soil"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-soil-muted">{topic.body}</p>
          </div>
        </div>

        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[32px] border border-soil/10 bg-cream shadow-[0_30px_60px_rgba(43,33,24,0.14)]">
            <div className="flex items-center gap-3 bg-pasture px-5 py-4 text-milk">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-milk/20 font-display" aria-hidden>
                A
              </span>
              <div>
                <p className="text-sm font-medium">{SITE.name}</p>
                <p className="text-xs text-milk/80">WhatsApp</p>
              </div>
            </div>

            <div
              className="flex min-h-[150px] flex-col lg:min-h-[220px] justify-end gap-3 p-4"
              style={{
                backgroundImage:
                  "radial-gradient(color-mix(in srgb, var(--pasture) 7%, transparent) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            >
              <p className="sr-only" aria-live="polite">
                Message ready to send: {topic.message}
              </p>
              <div
                className="max-w-[88%] self-end rounded-2xl rounded-tr-sm bg-[color-mix(in_srgb,var(--pasture)_14%,var(--milk))] px-4 py-3 text-sm leading-relaxed text-soil shadow-[0_1px_2px_rgba(43,33,24,0.1)]"
                aria-hidden
              >
                {typed}
                {typing && <span className="ml-px inline-block h-4 w-px animate-pulse bg-pasture align-[-3px]" />}
                <span className="mt-1 flex justify-end text-pasture/70">
                  <CheckCheck size={14} />
                </span>
              </div>
            </div>

            <div className="border-t border-soil/10 bg-milk p-4">
              <a
                href={whatsappLink(topic.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-medium text-soil transition hover:brightness-95"
              >
                <Send size={17} aria-hidden />
                {CONTACT_PAGE.send}
              </a>
              {topic.link && (
                <Link
                  href={topic.link.href}
                  className="focus-ring mt-3 flex items-center justify-center gap-1 text-sm font-medium text-pasture underline underline-offset-4"
                >
                  {topic.link.label}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
