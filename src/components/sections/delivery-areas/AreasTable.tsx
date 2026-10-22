"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { AREAS_TABLE, SERVICE_AREAS, SHOW_PENDING } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { Pending, PendingBadge } from "@/components/ui/Pending";

export function AreasTable() {
  // Only show the Page column once at least one area page is live.
  const showPages = SERVICE_AREAS.some((a) => a.pagePublished);
  const surrounding = AREAS_TABLE.surroundingAreas;

  return (
    <section id="areas" className="relative bg-milk">
      <MilkWaveDivider from="#FBF7EE" to="#FFFFFF" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SplitHeading
          text={AREAS_TABLE.heading}
          className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />

        <div className="mt-10 overflow-x-auto rounded-3xl border border-pasture/10 bg-cream/60">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm md:text-base">
            <caption className="sr-only">Al-Shukar fresh milk delivery areas in Lahore</caption>
            <thead>
              <tr className="bg-pasture text-milk">
                {["Area", "Also searched as", "Delivery times", ...(showPages ? ["Page"] : [])].map(
                  (col) => (
                    <th key={col} scope="col" className="px-5 py-4 font-display text-lg font-semibold">
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {SERVICE_AREAS.map((area) => (
                <tr key={area.name} className="border-t border-pasture/10">
                  <th scope="row" className="px-5 py-5 font-display text-lg font-medium text-soil">
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={17} className="text-pasture" aria-hidden />
                      {area.name}
                    </span>
                  </th>
                  <td className="px-5 py-5 text-soil-muted">{area.searchedAs}</td>
                  <td className="px-5 py-5 text-soil-muted">{AREAS_TABLE.times}</td>
                  {showPages && (
                    <td className="px-5 py-5">
                      {area.pagePublished && (
                        <a
                          href={area.slug}
                          className="focus-ring inline-flex items-center gap-1 font-medium text-pasture underline underline-offset-4"
                        >
                          Milk delivery in {area.alias}
                          <ArrowRight size={15} aria-hidden />
                        </a>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {(surrounding || SHOW_PENDING) && (
                <tr className="border-t border-pasture/10">
                  <th scope="row" className="px-5 py-5 font-display text-lg font-medium text-soil">
                    Surrounding areas
                  </th>
                  <td colSpan={showPages ? 3 : 2} className="px-5 py-5 text-soil-muted">
                    {surrounding ? surrounding.join(", ") : <PendingBadge />}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {AREAS_TABLE.dhaCoverage ? (
          <p className="mt-5 text-sm text-soil-muted">In DHA we cover {AREAS_TABLE.dhaCoverage}.</p>
        ) : (
          <Pending className="mt-5">{AREAS_TABLE.dhaPending}</Pending>
        )}
        {!surrounding && <Pending className="mt-3">{AREAS_TABLE.surroundingPending}</Pending>}
      </div>
    </section>
  );
}
