"use client";

import { Check } from "lucide-react";
import { QUALITY_PRACTICES, SHOW_PENDING } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { PendingBadge } from "@/components/ui/Pending";

export function PracticesTable() {
  const rows = QUALITY_PRACTICES.rows.filter((row) => row.confirmed || SHOW_PENDING);

  return (
    <section id="practices" className="relative bg-milk">
      <MilkWaveDivider from="#FBF7EE" to="#FFFFFF" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-3 lg:grid-cols-[440px_1fr] lg:items-end lg:gap-12">
          <SplitHeading
            text={QUALITY_PRACTICES.heading}
            className="font-display text-3xl leading-[1.15] font-semibold text-balance text-soil md:text-5xl"
          />
          <p className="text-soil-muted md:text-lg">{QUALITY_PRACTICES.answer}</p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-3xl border border-pasture/10 bg-cream/60">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm md:text-base">
            <caption className="sr-only">
              What Al-Shukar Dairy Farms does to keep milk pure, and what each practice means for you
            </caption>
            <thead>
              <tr className="bg-pasture text-milk">
                <th scope="col" className="px-5 py-4 font-display text-lg font-semibold">
                  Practice
                </th>
                <th scope="col" className="px-5 py-4 font-display text-lg font-semibold">
                  What it means for you
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.practice}
                  className={`border-t border-pasture/10 ${row.confirmed ? "" : "bg-amber/10"}`}
                >
                  <th scope="row" className="px-5 py-5 align-top font-medium text-soil">
                    <span className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pasture text-milk"
                        aria-hidden
                      >
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span>
                        {row.practice}
                        {!row.confirmed && <PendingBadge className="ml-2" />}
                      </span>
                    </span>
                  </th>
                  <td className="px-5 py-5 text-soil-muted">{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
