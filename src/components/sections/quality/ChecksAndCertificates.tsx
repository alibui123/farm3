"use client";

import { Award, ClipboardCheck, FileText } from "lucide-react";
import { CERTIFICATES, QUALITY_CHECKS } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { Pending } from "@/components/ui/Pending";

/**
 * Empty certificate frame: says "not yet" visually instead of hiding the
 * question. Replaced by the document list once CERTIFICATES.documents exist.
 */
function EmptyFrame() {
  return (
    <div className="relative mt-8 rounded-3xl border border-pasture/15 bg-milk p-3" aria-hidden>
      <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[18px] border-2 border-dashed border-pasture/20 px-6 py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-pasture/25 text-pasture/40">
          <Award size={30} strokeWidth={1.5} />
        </span>
        <p className="mt-4 font-display text-xl text-soil/70">Kept for our first lab report</p>
        <p className="mt-1 max-w-xs text-sm text-soil-muted">
          Published here, with its date, when we receive it.
        </p>
      </div>
    </div>
  );
}

export function ChecksAndCertificates() {
  const { documents } = CERTIFICATES;

  return (
    <section id="checks" className="relative bg-cream">
      <MilkWaveDivider from="#FFFFFF" to="#FBF7EE" />
      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <ClipboardCheck className="mb-5 h-9 w-9 text-pasture" strokeWidth={1.5} aria-hidden />
          <SplitHeading
            text={QUALITY_CHECKS.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
          />
          <p className="mt-4 text-soil-muted md:text-lg">{QUALITY_CHECKS.answer}</p>

          {QUALITY_CHECKS.checks ? (
            <ul className="mt-8 divide-y divide-pasture/10 rounded-3xl border border-pasture/10 bg-milk">
              {QUALITY_CHECKS.checks.map((check) => (
                <li key={check.name} className="flex items-baseline justify-between gap-4 px-5 py-4">
                  <span className="font-display text-lg text-soil">{check.name}</span>
                  <span className="text-sm text-soil-muted">{check.frequency}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Pending className="mt-8">{QUALITY_CHECKS.pendingNote}</Pending>
          )}
        </div>

        <div>
          <FileText className="mb-5 h-9 w-9 text-pasture" strokeWidth={1.5} aria-hidden />
          <SplitHeading
            text={CERTIFICATES.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
          />
          <p className="mt-4 text-soil-muted md:text-lg">{CERTIFICATES.answer}</p>

          {documents.length > 0 ? (
            <ul className="mt-8 space-y-3">
              {documents.map((doc) => (
                <li key={doc.pdfUrl}>
                  <a
                    href={doc.pdfUrl}
                    className="focus-ring flex items-center justify-between gap-4 rounded-2xl border border-pasture/10 bg-milk px-5 py-4 transition hover:border-pasture/30"
                  >
                    <span className="font-display text-lg text-soil">{doc.title}</span>
                    <span className="text-sm text-soil-muted">{doc.issuedOn} · PDF</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyFrame />
          )}
        </div>
      </div>
    </section>
  );
}
