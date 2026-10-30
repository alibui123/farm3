"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Moon, Sun } from "lucide-react";
import { AREAS_WHERE, DELIVERY_TIMES, SERVICE_AREAS } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
 * Stylised map in a 600×440 viewBox. Positions are illustrative only: the farm
 * address is never shown, so nothing here may be read as real geography.
 */
const W = 600;
const H = 440;
const FARM = { x: 84, y: 356 };
const AREAS = [
  { name: SERVICE_AREAS[0].name, x: 300, y: 190, r: 46, route: "M84,356 C150,330 205,245 300,190" },
  { name: SERVICE_AREAS[1].name, x: 428, y: 108, r: 42, route: "M84,356 C190,300 300,150 428,108" },
  { name: SERVICE_AREAS[2].name, x: 470, y: 300, r: 64, route: "M84,356 C200,392 340,340 470,300" },
];
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

type Round = "morning" | "evening";

function AreaMap({ round, on, reduced }: { round: Round; on: boolean; reduced: boolean }) {
  const evening = round === "evening";
  const animate = on && !reduced;

  return (
    <div className="relative aspect-[600/440] w-full overflow-hidden rounded-3xl border border-pasture/10" aria-hidden>
      {/* Sky layers crossfade between the two rounds. */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, color-mix(in srgb, var(--amber) 30%, var(--cream)), var(--cream) 62%)" }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: evening ? 1 : 0,
          background: "linear-gradient(160deg, var(--soil), var(--pasture-deep) 70%)",
        }}
      />

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="blocks" width="34" height="34" patternUnits="userSpaceOnUse">
            <rect x="4" y="4" width="26" height="26" rx="6" fill={evening ? "#FFFFFF" : "#2F5D3A"} fillOpacity={evening ? 0.04 : 0.05} />
          </pattern>
        </defs>
        <rect x="200" y="0" width="400" height="440" fill="url(#blocks)" />
        {/* Main road */}
        <path
          d="M150,440 C230,330 330,260 600,210"
          fill="none"
          stroke={evening ? "#FFFFFF" : "#2B2118"}
          strokeOpacity={evening ? 0.08 : 0.06}
          strokeWidth="18"
          strokeLinecap="round"
        />

        {AREAS.map((area) => (
          <circle
            key={area.name}
            cx={area.x}
            cy={area.y}
            r={area.r}
            fill={evening ? "#A9C4A0" : "#2F5D3A"}
            fillOpacity={evening ? 0.16 : 0.1}
            stroke={evening ? "#A9C4A0" : "#2F5D3A"}
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            className="transition-[fill,stroke] duration-700"
          />
        ))}

        {/* Routes redraw whenever the round changes (keyed on round). */}
        <g key={round}>
          {AREAS.map((area, i) => (
            <g key={area.name}>
              <motion.path
                d={area.route}
                fill="none"
                stroke={evening ? "#FBF7EE" : "#F2A93B"}
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={animate ? { pathLength: 0 } : false}
                animate={{ pathLength: on || reduced ? 1 : 0 }}
                transition={{ delay: 0.2 + i * 0.35, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              />
              {animate && (
                <circle r="6" fill={evening ? "#F2A93B" : "#2F5D3A"} stroke="#FFFFFF" strokeWidth="2">
                  <animateMotion
                    dur="3.4s"
                    begin={`${1.4 + i * 0.35}s`}
                    repeatCount="3"
                    fill="freeze"
                    path={area.route}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1"
                  />
                </circle>
              )}
            </g>
          ))}
        </g>

        {/* Farm: a small shed, deliberately unlabelled with any place name. */}
        <g transform={`translate(${FARM.x - 22} ${FARM.y - 40})`}>
          <path d="M0,22 L22,4 L44,22 L44,44 L0,44 Z" fill={evening ? "#F2A93B" : "#23462C"} className="transition-[fill] duration-700" />
          <rect x="16" y="28" width="12" height="16" fill={evening ? "#2B2118" : "#F2A93B"} />
        </g>
      </svg>

      <span
        className={`absolute -translate-x-1/2 translate-y-3 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors duration-700 ${
          evening ? "bg-amber text-soil" : "bg-pasture text-milk"
        }`}
        style={{ left: pct(FARM.x, W), top: pct(FARM.y, H) }}
      >
        Our farm
      </span>
      {AREAS.map((area) => (
        <span
          key={area.name}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap shadow-[0_4px_12px_rgba(43,33,24,0.12)] transition-colors duration-700 md:text-sm ${
            evening ? "bg-milk/90 text-pasture-deep" : "bg-milk text-pasture"
          }`}
          style={{ left: pct(area.x, W), top: pct(area.y, H) }}
        >
          {area.name}
        </span>
      ))}

      <span
        className={`absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-700 ${
          evening ? "bg-milk/10 text-milk" : "bg-amber text-soil"
        }`}
      >
        {evening ? <Moon size={20} /> : <Sun size={20} />}
      </span>
    </div>
  );
}

export function WhereWeDeliver() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = usePrefersReducedMotion();

  return (
    <section id="where" className="relative overflow-hidden bg-cream">
      <OrganicBlob
        className="pointer-events-none absolute top-20 -left-32 h-80 w-80 opacity-25"
        color="#A9C4A0"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SplitHeading
            text={AREAS_WHERE.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
          />
          <p className="mt-4 text-soil-muted md:text-lg">{AREAS_WHERE.answer}</p>
        </div>

        <div ref={ref}>
          <AreaMap round="morning" on={inView} reduced={reduced} />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-pasture px-4 py-2 text-sm font-medium text-milk">
              <Clock size={15} aria-hidden />
              Daily, {DELIVERY_TIMES.window}
            </p>
            <p className="text-xs text-soil-muted">{AREAS_WHERE.mapCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
