"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Check, MapPin, Repeat } from "lucide-react";
import { HOW_INTRO, HOW_PHONE, HOW_STEPS, SITE } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { useIsDesktop } from "@/lib/useMediaQuery";

/**
 * "How delivery works": a sticky stage inside a tall scroll track. Progress is
 * split into four equal segments; step k's local progress d drives the phone
 * screen for that step (typing, chat, pouch drop, subscribe toggle).
 */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const POP = "ease-[cubic-bezier(0.34,1.8,0.64,1)]";

function steps(p: number) {
  const k = Math.min(3, Math.floor(p * 4));
  return { k, d: clamp01(p * 4 - k) };
}

function FormScreen({ d }: { d: number }) {
  const pressed = d > 0.82 && d < 0.92;
  return (
    <div className="flex h-full flex-col px-5 pt-12 pb-6">
      <p className="font-display text-xl text-soil">Free sample</p>
      <p className="text-xs text-soil-muted">Takes about a minute</p>
      <div className="mt-6 space-y-4">
        {HOW_PHONE.fields.map((field, i) => {
          const fp = clamp01((d - i * 0.24) / 0.2);
          const typing = fp > 0 && fp < 1;
          return (
            <div key={field.label}>
              <p className="mb-1 text-[11px] font-medium text-soil-muted">
                {field.label}
              </p>
              <div
                className={`flex h-9 items-center rounded-lg border bg-cream/60 px-3 text-sm text-soil transition-colors duration-200 ${
                  typing ? "border-pasture" : "border-soil/15"
                }`}
              >
                {field.value.slice(0, Math.round(field.value.length * fp))}
                {typing && (
                  <span className="ml-px h-4 w-px animate-pulse bg-pasture" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`mt-auto rounded-full py-3 text-center text-sm font-medium text-milk transition-[transform,background-color] duration-150 ${
          pressed ? "scale-95 bg-pasture-deep" : "bg-pasture"
        }`}
      >
        Request free sample
      </div>
    </div>
  );
}

function ChatScreen({ d }: { d: number }) {
  const shown = [0.08, 0.38, 0.68];
  return (
    <div className="flex h-full flex-col bg-cream">
      <div className="flex items-center gap-3 bg-pasture px-4 pt-10 pb-3 text-milk">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-milk/20 font-display text-sm">
          A
        </span>
        <div>
          <p className="text-sm font-medium">{SITE.shortName} Dairy</p>
          <p className="text-[11px] text-milk/70">online</p>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 p-3">
        {HOW_PHONE.chat.map((line, i) => {
          const on = d > shown[i];
          const mine = line.from === "you";
          return (
            <div
              key={line.text}
              className={`max-w-[82%] rounded-2xl px-3 py-2 text-xs leading-snug text-soil shadow-[0_1px_2px_rgba(43,33,24,0.08)] transition-[opacity,transform] duration-300 ${
                mine
                  ? "self-end rounded-tr-sm bg-pasture/15"
                  : "self-start rounded-tl-sm bg-milk"
              }`}
              style={{
                opacity: on ? 1 : 0,
                transform: `translateY(${on ? 0 : 10}px)`,
              }}
            >
              {mine && (
                <MapPin
                  size={12}
                  className="mr-1 inline-block align-[-2px] text-pasture"
                  aria-hidden
                />
              )}
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReceiveScreen({ d }: { d: number }) {
  const drop = 1 - smoothstep(clamp01(d / 0.4));
  const tag = d > 0.45;
  const caption = d > 0.62;
  return (
    <div className="flex h-full flex-col items-center justify-center px-5">
      <div
        className="relative h-[108px] w-[76px]"
        style={{ transform: `translateY(${-300 * drop}px)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-t-md rounded-b-[26px] border border-soil/15 bg-milk shadow-[0_8px_20px_rgba(43,33,24,0.1)]">
          <div className="absolute inset-x-0 top-0 h-3 bg-pasture" />
          <span className="font-display text-[11px] font-semibold text-pasture">
            {SITE.shortName}
          </span>
        </div>
        <span
          className={`absolute -top-3 -right-9 rounded-full bg-amber px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-soil shadow-[0_4px_12px_rgba(242,169,59,0.4)] transition-transform duration-300 ${POP}`}
          style={{ transform: `scale(${tag ? 1 : 0})` }}
        >
          1 L · FREE
        </span>
      </div>
      <div className="mt-1 h-2.5 w-36 rounded-full bg-soil/15" />
      <div
        className="mt-6 text-center transition-opacity duration-300"
        style={{ opacity: caption ? 1 : 0 }}
      >
        <p className="font-display text-lg text-soil">At your door</p>
        <p className="mt-0.5 text-xs text-soil-muted">
          Sealed pouch · once per household
        </p>
      </div>
    </div>
  );
}

function SubscribeScreen({ d }: { d: number }) {
  const alternate = d > 0.4;
  const done = d > 0.72;
  return (
    <div className="flex h-full flex-col px-5 pt-12 pb-6">
      <p className="font-display text-xl text-soil">Your plan</p>
      <p className="text-xs text-soil-muted">Delivered every day, 1 to 7 pm</p>
      <div className="relative mt-6 grid grid-cols-2 rounded-full bg-soil/[0.06] p-1">
        <span
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-pasture transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${alternate ? "100%" : "0"})` }}
        />
        {[
          { label: "Daily", Icon: CalendarDays, on: !alternate },
          { label: "Alternate", Icon: Repeat, on: alternate },
        ].map(({ label, Icon, on }) => (
          <span
            key={label}
            className={`relative flex items-center justify-center gap-1.5 py-2 text-sm font-medium transition-colors duration-300 ${
              on ? "text-milk" : "text-soil-muted"
            }`}
          >
            <Icon size={14} aria-hidden />
            {label}
          </span>
        ))}
      </div>
      <div className="mt-auto grid">
        <div
          className="[grid-area:1/1] self-end rounded-full bg-pasture py-3 text-center text-sm font-medium text-milk transition-opacity duration-300"
          style={{ opacity: done ? 0 : 1 }}
        >
          Start my delivery
        </div>
        <div
          className={`[grid-area:1/1] flex flex-col items-center transition-transform duration-300 ${POP}`}
          style={{ transform: `scale(${done ? 1 : 0})` }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber text-soil shadow-[0_6px_16px_rgba(242,169,59,0.45)]">
            <Check size={24} strokeWidth={3} />
          </span>
          <p className="mt-2 font-display text-lg text-soil">
            You&apos;re subscribed
          </p>
        </div>
      </div>
    </div>
  );
}

const SCREENS = [FormScreen, ChatScreen, ReceiveScreen, SubscribeScreen];

/** 280×560 phone; screens crossfade, inactive ones hold their start or end state. */
function Phone({ k, d }: { k: number; d: number }) {
  return (
    <div
      className="relative h-[560px] w-[280px] rounded-[44px] bg-soil p-[10px] shadow-[0_30px_60px_rgba(43,33,24,0.22)]"
      aria-hidden
    >
      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-milk">
        {SCREENS.map((Screen, i) => {
          const on = k === i;
          return (
            <div
              key={i}
              className="absolute inset-0 transition-[opacity,transform] duration-[350ms]"
              style={{
                opacity: on ? 1 : 0,
                transform: `scale(${on ? 1 : 0.94})`,
              }}
            >
              <Screen d={on ? d : k > i ? 1 : 0} />
            </div>
          );
        })}
        <div className="absolute top-2.5 left-1/2 z-20 -ml-10 h-5 w-20 rounded-full bg-soil" />
      </div>
    </div>
  );
}

/** Mobile phone scale: up to 68%, smaller on short screens so the stage fits. */
function usePhoneScale() {
  const [scale, setScale] = useState(0.6);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScale(
        Math.min(0.68, Math.max(0.45, (window.innerHeight - 490) / 560)),
      );
    };
    const onResize = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return scale;
}

function StepList({ k, dim }: { k: number; dim: boolean }) {
  return (
    <ol className="relative mt-10">
      {/* Rail between the first and last circle centres (rows are 76px). */}
      <div className="absolute top-4 left-4 h-[228px] w-0.5 -translate-x-1/2 bg-soil/10" />
      <div
        className="absolute top-4 left-4 w-0.5 -translate-x-1/2 bg-pasture transition-[height] duration-300"
        style={{ height: `${(k / 3) * 228}px` }}
      />
      {HOW_STEPS.map((step, i) => {
        const reached = i <= k;
        return (
          <li key={step.title} className="relative flex h-[76px] gap-4">
            <span
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-pasture font-display text-sm transition-colors duration-300 ${
                reached ? "bg-pasture text-milk" : "bg-cream text-pasture"
              }`}
            >
              {i + 1}
            </span>
            <div
              className="pt-0.5 transition-opacity duration-300"
              style={{ opacity: dim && i !== k ? 0.4 : 1 }}
            >
              <h3 className="font-display text-xl leading-tight text-soil">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-soil-muted">{step.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const progress = useScrollProgress(root, !reduced);
  const phoneScale = usePhoneScale();
  // Render only the layout for this viewport (both used to render, one hidden).
  const desktop = useIsDesktop();

  const header = (
    <>
      <SplitHeading
        text={HOW_INTRO.heading}
        className="font-display text-3xl leading-[1.15] font-semibold text-balance text-soil md:text-5xl"
      />
      <p className="mt-3 text-sm leading-relaxed text-soil-muted md:mt-4 md:text-base">
        {HOW_INTRO.answer}
      </p>
    </>
  );

  if (reduced) {
    return (
      <section id="process" className="relative bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[520px_1fr]">
          <div>
            {header}
            <StepList k={3} dim={false} />
          </div>
          <div className="hidden justify-center lg:flex">
            <Phone k={3} d={1} />
          </div>
        </div>
      </section>
    );
  }

  const { k, d } = steps(progress);

  return (
    <section
      ref={root}
      id="process"
      className="relative h-[360vh] bg-cream lg:h-[390vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 pt-20 md:px-8">
          {desktop ? (
            /* Desktop (7a) */
            <div className="grid items-center gap-12 lg:grid-cols-[520px_1fr]">
              <div>
                {header}
                <StepList k={k} dim />
              </div>
              <div className="flex justify-center">
                <Phone k={k} d={d} />
              </div>
            </div>
          ) : (
            /* Mobile (7b) */
            <div>
              {header}
              <div
                className="relative mx-auto mt-5"
                style={{ width: 280 * phoneScale, height: 560 * phoneScale }}
              >
                <div
                  className="absolute top-0 left-0 origin-top-left"
                  style={{ transform: `scale(${phoneScale})` }}
                >
                  <Phone k={k} d={d} />
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
                {HOW_STEPS.map((step, i) => (
                  <span
                    key={step.title}
                    className={`h-2 rounded-full bg-pasture transition-[width,opacity] duration-300 ${
                      i === k ? "w-6" : "w-2"
                    }`}
                    style={{ opacity: i <= k ? 1 : 0.3 }}
                  />
                ))}
              </div>
              <ol className="mt-3 grid text-center">
                {HOW_STEPS.map((step, i) => {
                  const on = i === k;
                  return (
                    <li
                      key={step.title}
                      className="[grid-area:1/1] transition-[opacity,transform] duration-[400ms]"
                      style={{
                        opacity: on ? 1 : 0,
                        transform: `translateY(${on ? 0 : 8}px)`,
                      }}
                    >
                      <h3 className="font-display text-xl text-soil">
                        {step.title}
                      </h3>
                      <p className="mx-auto mt-1 max-w-xs text-sm text-soil-muted">
                        {step.body}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
