"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { ABOUT, SITE, STORY_STEPS } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { useIsDesktop } from "@/lib/useMediaQuery";
import { SplitHeading } from "@/components/ui/SplitHeading";

/**
 * "Pouch journey": a sticky stage inside a tall scroll track. Scroll progress
 * is split into dwell / move / dwell / move / dwell / move / dwell phases.
 * Dwell k holds the object at station k and plays its micro-animation;
 * a move eases it to the next station with a small hop.
 */
const PHASES = [0.16, 0.12, 0.16, 0.12, 0.16, 0.12, 0.16];
/** Station x as % of the desktop rail (prototype: 175/425/675/925 of 1200). */
const STATIONS = [14.58, 35.42, 56.25, 77.08];
const DOOR_X = 92;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

type Journey = {
  /** Active step: which form and text are shown. */
  active: number;
  /** Continuous station position, 0–3. */
  pos: number;
  /** Local progress of the active stage's micro-animation. */
  d: number;
  /** Move progress, or null while dwelling. */
  move: number | null;
};

function journey(p: number): Journey {
  let start = 0;
  for (let i = 0; i < PHASES.length; i++) {
    const end = start + PHASES[i];
    if (p < end || i === PHASES.length - 1) {
      const t = clamp01((p - start) / PHASES[i]);
      const k = Math.floor(i / 2);
      if (i % 2 === 0) return { active: k, pos: k, d: t, move: null };
      // The leaving stage holds its finished state; the arriving one starts fresh.
      return {
        active: t < 0.5 ? k : k + 1,
        pos: k + smoothstep(t),
        d: t < 0.5 ? 1 : 0,
        move: t,
      };
    }
    start = end;
  }
  return { active: 3, pos: 3, d: 1, move: null };
}

function MilkCan({ d, pouring }: { d: number; pouring: boolean }) {
  const fill = 10 + 90 * clamp01(d / 0.85);
  return (
    <>
      <div
        className="absolute top-0 left-1/2 -ml-[2.5px] h-[50px] w-[5px] rounded-full bg-milk shadow-[0_0_0_1px_rgba(43,33,24,0.12)] transition-opacity duration-300"
        style={{ opacity: pouring && d < 0.85 ? 1 : 0 }}
      />
      <div className="relative flex flex-col items-center">
        <div className="h-2.5 w-16 rounded-full bg-soil" />
        <div className="h-3 w-12 bg-[var(--steel-edge)]" />
        <div className="relative h-[110px] w-[92px] rounded-[20px] border-2 border-[var(--steel-edge)] bg-[var(--steel)]">
          <div className="absolute inset-3 overflow-hidden rounded-xl bg-soil/10">
            <div
              className="absolute inset-x-0 bottom-0 bg-milk"
              style={{ height: `${fill}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Tank({ d }: { d: number }) {
  const chill = clamp01(d / 0.8);
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-24 w-36 overflow-hidden rounded-full border-2 border-[var(--steel-edge)] bg-[var(--steel)]"
        style={{ boxShadow: `0 0 0 ${12 * chill}px var(--frost)` }}
      >
        <div
          className="absolute inset-0 bg-[var(--chill)]"
          style={{ opacity: chill }}
        />
        {[30, 50, 70].map((y) => (
          <div
            key={y}
            className="absolute inset-x-7 border-t-2 border-dashed border-pasture/35"
            style={{ top: `${y}%` }}
          />
        ))}
      </div>
      <div className="flex w-20 justify-between">
        <span className="h-3.5 w-2 rounded-b-sm bg-[var(--steel-edge)]" />
        <span className="h-3.5 w-2 rounded-b-sm bg-[var(--steel-edge)]" />
      </div>
    </div>
  );
}

function Pouch({ d }: { d: number }) {
  // Press bar: descend (0–.3), hold (.3–.5), lift (.5–1).
  const lift =
    d < 0.3
      ? 1 - smoothstep(d / 0.3)
      : d < 0.5
        ? 0
        : smoothstep((d - 0.5) / 0.5);
  const sealed = d > 0.28;
  const checked = d > 0.6;
  return (
    <div className="relative h-[108px] w-[76px]">
      <div
        className="absolute -top-[52px] left-1/2 -ml-[50px] flex w-[100px] flex-col items-center"
        style={{ transform: `translateY(${-32 * lift}px)` }}
      >
        <div className="h-10 w-2 bg-[var(--steel-edge)]" />
        <div className="h-3 w-full rounded-md bg-soil" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-t-md rounded-b-[26px] border border-soil/15 bg-milk shadow-[0_8px_20px_rgba(43,33,24,0.08)]">
        <div
          className="absolute inset-x-0 top-0 h-3 bg-pasture transition-opacity duration-200"
          style={{ opacity: sealed ? 1 : 0 }}
        />
        <span className="font-display text-[11px] font-semibold text-pasture">
          {SITE.shortName}
        </span>
      </div>
      <div
        className="absolute top-5 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber text-soil shadow-[0_4px_12px_rgba(242,169,59,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.8,0.64,1)]"
        style={{ transform: `scale(${checked ? 1 : 0})` }}
      >
        <Check size={16} strokeWidth={3} />
      </div>
    </div>
  );
}

function Crate({ d, moving }: { d: number; moving: boolean }) {
  const chips = d > 0.35;
  return (
    <div className="relative">
      <div
        className="absolute top-1/2 right-full mr-3 -mt-4 flex flex-col items-end gap-2 transition-opacity duration-200"
        style={{ opacity: moving ? 1 : 0 }}
      >
        {[26, 38, 20].map((w) => (
          <span
            key={w}
            className="h-[3px] rounded-full bg-soil/25"
            style={{ width: w }}
          />
        ))}
      </div>
      <div
        className="absolute bottom-[116px] left-1/2 -ml-[70px] flex w-[140px] justify-center gap-1.5 transition-[opacity,transform] duration-300"
        style={{
          opacity: chips ? 1 : 0,
          transform: `translateY(${chips ? 0 : 6}px)`,
        }}
      >
        <span className="rounded-full bg-amber px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-soil">
          MORNING
        </span>
        <span className="rounded-full bg-soil px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-milk">
          EVENING
        </span>
      </div>
      <div className="absolute -top-8 left-1/2 -ml-5 h-12 w-10 overflow-hidden rounded-t-md border border-soil/15 bg-milk">
        <div className="h-1.5 bg-pasture" />
      </div>
      <div className="relative flex h-[76px] w-[112px] items-center justify-center rounded-xl bg-pasture shadow-[0_10px_24px_rgba(47,93,58,0.25)]">
        <div className="absolute inset-x-3 top-3 h-px bg-milk/25" />
        <div className="absolute inset-x-3 bottom-3 h-px bg-milk/25" />
        <span className="font-display text-sm font-semibold text-milk">
          {SITE.shortName}
        </span>
      </div>
    </div>
  );
}

function Door({ lit }: { lit: boolean }) {
  return (
    <div
      className="relative h-24 w-14 rounded-t-lg border-2 border-b-0 border-soil transition-opacity duration-500"
      style={{ opacity: lit ? 1 : 0.25 }}
      aria-hidden
    >
      <span className="absolute top-1/2 right-2 h-1.5 w-1.5 rounded-full bg-soil" />
    </div>
  );
}

function Form({
  index,
  d,
  moving = false,
  pouring = false,
}: {
  index: number;
  d: number;
  moving?: boolean;
  pouring?: boolean;
}) {
  if (index === 0) return <MilkCan d={d} pouring={pouring} />;
  if (index === 1) return <Tank d={d} />;
  if (index === 2) return <Pouch d={d} />;
  return <Crate d={d} moving={moving} />;
}

/** All four forms stacked in a 160×168 box; the active one crossfades in. */
function JourneyObject({ j }: { j: Journey }) {
  const rolling = j.active === 3 && j.move === null && j.d > 0.02 && j.d < 0.98;
  return STORY_STEPS.map((step, i) => {
    const on = j.active === i;
    const d = on ? j.d : j.active > i ? 1 : 0;
    return (
      <div
        key={step.title}
        className="absolute inset-0 flex origin-bottom items-end justify-center transition-[opacity,transform] duration-[350ms]"
        style={{ opacity: on ? 1 : 0, transform: `scale(${on ? 1 : 0.85})` }}
      >
        <Form
          index={i}
          d={d}
          moving={on && (j.move !== null || rolling)}
          pouring={on && j.move === null}
        />
      </div>
    );
  });
}

function objectMotion(j: Journey, hop: number, roll: number) {
  const y = j.move !== null ? -Math.sin(Math.PI * j.move) * hop : 0;
  const x = j.active === 3 && j.move === null ? smoothstep(j.d) * roll : 0;
  return { x, y };
}

function DesktopJourney({ j }: { j: Journey }) {
  const seg = Math.min(2, Math.floor(j.pos));
  const x =
    STATIONS[seg] + (STATIONS[seg + 1] - STATIONS[seg]) * (j.pos - seg);
  const { x: roll, y: hop } = objectMotion(j, 22, 90);

  return (
    <div className="relative mt-14 hidden h-[330px] lg:block">
      {/* Ground runs from the first station to the door's right edge (door is 56px wide). */}
      <div
        className="absolute top-[200px] h-0.5 bg-soil/10"
        style={{ left: `${STATIONS[0]}%`, right: `calc(${100 - DOOR_X}% - 28px)` }}
      />
      <div
        className="absolute top-[200px] h-0.5 bg-pasture"
        style={{ left: `${STATIONS[0]}%`, width: `${x - STATIONS[0]}%` }}
      />

      <div
        className="absolute top-[104px]"
        style={{ left: `${DOOR_X}%`, transform: "translateX(-50%)" }}
      >
        <Door lit={j.active === 3} />
      </div>

      <div
        className="absolute top-[32px] h-[168px] w-[160px]"
        style={{
          left: `${x}%`,
          transform: `translate(calc(-50% + ${roll}px), ${hop}px)`,
        }}
        aria-hidden
      >
        <JourneyObject j={j} />
      </div>

      <ol>
        {STORY_STEPS.map((step, i) => {
          const on = j.active === i;
          return (
            <li
              key={step.title}
              className="absolute top-[193px] w-[210px] text-center"
              style={{ left: `${STATIONS[i]}%`, transform: "translateX(-50%)" }}
            >
              <span
                className={`mx-auto block h-3.5 w-3.5 rounded-full border-2 border-pasture transition-colors duration-300 ${
                  j.pos >= i - 0.001 ? "bg-pasture" : "bg-cream"
                }`}
                aria-hidden
              />
              <div
                className="mt-4 transition-opacity duration-[400ms]"
                style={{ opacity: on ? 1 : 0.4 }}
              >
                <p className="text-[11px] font-medium tracking-[0.2em] text-soil-muted uppercase">
                  {step.label}
                </p>
                <h3 className="mt-1 font-display text-xl leading-snug text-soil">
                  {step.title}
                </h3>
              </div>
              <p
                className="mt-2 text-sm leading-relaxed text-soil-muted transition-[opacity,transform] duration-[400ms]"
                style={{
                  opacity: on ? 1 : 0,
                  transform: `translateY(${on ? 0 : 8}px)`,
                }}
              >
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function MobileJourney({ j }: { j: Journey }) {
  const { x: roll, y: hop } = objectMotion(j, 18, 55);

  return (
    <div className="lg:hidden">
      <div className="relative mx-auto mt-6 h-[180px] w-full max-w-sm">
        <div className="absolute inset-x-4 bottom-0 h-0.5 bg-soil/10" />
        <div
          className="absolute bottom-0 origin-bottom"
          style={{
            left: "calc(50% + 135px)",
            transform: "translateX(-50%) scale(0.85)",
          }}
        >
          <Door lit={j.active === 3} />
        </div>
        <div
          className="absolute bottom-0 left-1/2 h-[168px] w-[160px]"
          style={{ transform: `translate(calc(-50% + ${roll}px), ${hop}px)` }}
          aria-hidden
        >
          <JourneyObject j={j} />
        </div>
      </div>

      <div className="relative mx-auto mt-6 h-3.5 w-56" aria-hidden>
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-soil/10" />
        <div
          className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-pasture"
          style={{ width: `${(j.pos / 3) * 100}%` }}
        />
        {STORY_STEPS.map((step, i) => (
          <span
            key={step.title}
            className={`absolute top-0 h-3.5 w-3.5 rounded-full border-2 border-pasture transition-colors duration-300 ${
              j.pos >= i - 0.001 ? "bg-pasture" : "bg-cream"
            }`}
            style={{ left: `${(i / 3) * 100}%`, marginLeft: -7 }}
          />
        ))}
      </div>

      <ol className="mt-5 grid text-center">
        {STORY_STEPS.map((step, i) => {
          const on = j.active === i;
          return (
            <li
              key={step.title}
              className="[grid-area:1/1] transition-[opacity,transform] duration-[400ms]"
              style={{
                opacity: on ? 1 : 0,
                transform: `translateY(${on ? 0 : 8}px)`,
              }}
            >
              <h3 className="font-display text-xl text-soil">{step.title}</h3>
              <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-soil-muted">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Reduced motion: all four steps stacked, each in its finished state. */
function StaticJourney() {
  return (
    <ol className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
      {STORY_STEPS.map((step, i) => (
        <li key={step.title} className="text-center">
          <div className="relative mx-auto h-[200px] w-[160px]" aria-hidden>
            <div className="absolute inset-x-0 bottom-0 flex h-[168px] items-end justify-center">
              <Form index={i} d={1} />
            </div>
          </div>
          <p className="mt-5 text-[11px] font-medium tracking-[0.2em] text-soil-muted uppercase">
            {step.label}
          </p>
          <h3 className="mt-1 font-display text-xl text-soil">{step.title}</h3>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-soil-muted">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function OurStory() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const progress = useScrollProgress(root, !reduced);
  // Render only the journey for this viewport (both used to render, one hidden).
  const desktop = useIsDesktop();

  const header = (
    <div className="grid gap-3 lg:grid-cols-[380px_1fr] lg:items-end lg:gap-12">
      <SplitHeading
        text={ABOUT.heading}
        className="font-display text-3xl leading-[1.15] font-semibold text-balance text-soil md:text-5xl"
      />
      <p className="text-sm leading-relaxed text-soil-muted md:text-lg">
        {ABOUT.answer}
      </p>
    </div>
  );

  if (reduced) {
    return (
      <section id="story" className="relative bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          {header}
          <StaticJourney />
        </div>
      </section>
    );
  }

  const j = journey(progress);

  return (
    <section
      ref={root}
      id="story"
      className="relative h-[440vh] bg-cream lg:h-[470vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 pt-20 md:px-8">
          {header}
          {desktop ? <DesktopJourney j={j} /> : <MobileJourney j={j} />}
        </div>
      </div>
    </section>
  );
}
