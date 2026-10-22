"use client";

import { MessageCircle } from "lucide-react";
import { SAMPLE_QUESTIONS, WHATSAPP } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";

export function SampleQuestions() {
  return (
    <section id="questions" className="relative bg-milk">
      <MilkWaveDivider from="#2F5D3A" to="#FFFFFF" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[380px_1fr] lg:gap-16">
        <div>
          <SplitHeading
            text={SAMPLE_QUESTIONS.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
          />
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-pasture px-6 py-3 text-sm font-medium text-milk transition hover:bg-pasture-deep"
          >
            <MessageCircle size={18} aria-hidden />
            Ask us on WhatsApp
          </a>
        </div>

        <dl className="divide-y divide-pasture/10 border-y border-pasture/10">
          {SAMPLE_QUESTIONS.items.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="font-display text-xl text-soil">{item.q}</dt>
              <dd className="mt-2 text-soil-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
