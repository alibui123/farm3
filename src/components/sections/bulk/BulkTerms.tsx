"use client";

import { BULK_TERMS, SHOW_PENDING } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { PendingBadge } from "@/components/ui/Pending";

export function BulkTerms() {
  const rows = BULK_TERMS.rows.filter((row) => row.value || SHOW_PENDING);

  return (
    <section id="terms" className="relative bg-milk">
      <MilkWaveDivider from="#2F5D3A" to="#FFFFFF" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-3 lg:grid-cols-[440px_1fr] lg:items-end lg:gap-12">
          <SplitHeading
            text={BULK_TERMS.heading}
            className="font-display text-3xl leading-[1.15] font-semibold text-balance text-soil md:text-4xl"
          />
          <p className="text-soil-muted md:text-lg">{BULK_TERMS.answer}</p>
        </div>

        {/* Mobile: topic stacked above its details, so nothing needs sideways scrolling */}
        <dl className="mt-10 overflow-hidden rounded-3xl border border-pasture/10 bg-cream/60 md:hidden">
          {rows.map((row) => (
            <div
              key={row.topic}
              className={`border-t border-pasture/10 px-5 py-4 first:border-t-0 ${row.value ? "" : "bg-amber/10"}`}
            >
              <dt className="text-xs font-semibold tracking-wider text-pasture uppercase">
                {row.topic}
              </dt>
              <dd className="mt-1 text-soil">
                {row.value ?? (
                  <>
                    <PendingBadge className="mr-2" />
                    <span className="text-soil-muted">{row.pendingNote}</span>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 hidden overflow-x-auto rounded-3xl border border-pasture/10 bg-cream/60 md:block">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm md:text-base">
            <caption className="sr-only">What to know before ordering bulk milk from Al-Shukar Dairy Farms</caption>
            <thead>
              <tr className="bg-pasture text-milk">
                <th scope="col" className="px-5 py-4 font-display text-lg font-semibold">Topic</th>
                <th scope="col" className="px-5 py-4 font-display text-lg font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.topic} className={`border-t border-pasture/10 ${row.value ? "" : "bg-amber/10"}`}>
                  <th scope="row" className="w-[40%] px-5 py-5 font-medium text-soil">
                    {row.topic}
                  </th>
                  <td className="px-5 py-5 text-soil-muted">
                    {row.value ?? (
                      <>
                        <PendingBadge className="mr-2" />
                        {row.pendingNote}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
