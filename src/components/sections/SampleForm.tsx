"use client";

import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider, OrganicBlob } from "@/components/ui/MilkWave";
import { SampleRequestForm } from "@/components/ui/SampleRequestForm";
import { SAMPLE } from "@/lib/constants";

export function SampleForm() {
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
          text={SAMPLE.heading}
          className="text-center font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
        />
        <p className="mx-auto mt-3 max-w-md text-center text-soil-muted">
          {SAMPLE.subtext}
        </p>
        <ul className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-pasture md:text-sm">
          {SAMPLE.rules.map((rule) => (
            <li key={rule} className="rounded-full bg-pasture/10 px-3 py-1.5">
              {rule}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <SampleRequestForm />
        </div>
      </div>
    </section>
  );
}
