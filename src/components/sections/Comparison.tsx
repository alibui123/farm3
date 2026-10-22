"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { COMPARISON } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";

/** "Loose milk (open can)" -> "Loose milk", to fit the mobile toggle. */
const shortLabel = (col: string) => col.replace(/\s*\(.*\)$/, "");

/** Home uses the default copy; the Quality page passes its own question and answer. */
export function Comparison({
  heading = COMPARISON.heading,
  answer = COMPARISON.answer,
}: {
  heading?: string;
  answer?: string;
}) {
  const rivals = COMPARISON.columns.slice(1);
  /** Index into COMPARISON.columns of the milk shown against Al-Shukar on mobile. */
  const [rival, setRival] = useState(1);

  return (
    <section id="compare" className="relative bg-milk pb-20 md:pb-28">
      <MilkWaveDivider from="#FBF7EE" to="#FFFFFF" />
      <div className="mx-auto max-w-6xl px-5 pt-8 md:px-8 md:pt-12">
        <SplitHeading
          text={heading}
          className="max-w-3xl font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />
        <p className="mt-4 max-w-2xl text-soil-muted">{answer}</p>

        {/* Mobile: Al-Shukar head-to-head with one rival at a time, so two columns fit without sideways scrolling */}
        <div className="mt-10 md:hidden">
          <div
            role="tablist"
            aria-label="Compare Al-Shukar with"
            className="grid grid-cols-2 gap-1 rounded-full bg-cream p-1"
          >
            {rivals.map((col, i) => {
              const active = rival === i + 1;
              return (
                <button
                  key={col}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setRival(i + 1)}
                  className={`focus-ring rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-pasture text-milk shadow-sm" : "text-soil-muted"
                  }`}
                >
                  vs {shortLabel(col)}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            className="mt-4 overflow-hidden rounded-3xl border border-pasture/10 bg-cream/60"
          >
            <div className="grid grid-cols-2 bg-pasture font-display text-base font-semibold text-milk">
              <span className="px-4 py-3 text-amber">{COMPARISON.columns[0]}</span>
              <span className="px-4 py-3">{shortLabel(COMPARISON.columns[rival])}</span>
            </div>
            <dl>
              {COMPARISON.rows.map((row) => (
                <div key={row.label} className="border-t border-pasture/10 first:border-t-0">
                  <dt className="px-4 pt-3 text-xs font-semibold tracking-wider text-soil uppercase">
                    {row.label}
                  </dt>
                  <dd className="grid grid-cols-2 text-sm">
                    <span className="flex gap-2 px-4 pt-1.5 pb-3 font-medium text-pasture">
                      <Check size={16} className="mt-0.5 shrink-0" aria-hidden />
                      {row.values[0]}
                    </span>
                    <span className="px-4 pt-1.5 pb-3 text-soil-muted">
                      {row.values[rival]}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-10 hidden overflow-x-auto rounded-3xl border border-pasture/10 bg-cream/60 md:block">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm md:text-base">
            <caption className="sr-only">
              Al-Shukar milk compared with loose milk and packaged milk
            </caption>
            <thead>
              <tr className="bg-pasture text-milk">
                <td className="px-5 py-4" />
                {COMPARISON.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`px-5 py-4 font-display text-lg font-semibold ${
                      i === 0 ? "text-amber" : ""
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row) => (
                <tr key={row.label} className="border-t border-pasture/10">
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium whitespace-nowrap text-soil"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={`px-5 py-4 ${
                        i === 0
                          ? "bg-pasture/[0.07] font-medium text-pasture"
                          : "text-soil-muted"
                      }`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 max-w-2xl text-sm text-soil-muted">
          {COMPARISON.storageNote}
        </p>
      </div>
    </section>
  );
}
