"use client";

import { FINAL_CTA, SAMPLE_HREF, WHATSAPP } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";

/** Every page ends with this CTA; inner pages pass their own headline and text. */
export function FinalCta({
  headline = FINAL_CTA.headline,
  text = FINAL_CTA.text,
  secondary = FINAL_CTA.secondary,
  button = FINAL_CTA.button,
  buttonHref = SAMPLE_HREF,
}: {
  headline?: string;
  text?: string;
  secondary?: string;
  button?: string;
  buttonHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-pasture text-milk">
      <MilkWaveDivider from="#FFFFFF" to="#2F5D3A" />
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-droplet absolute h-4 w-3 rounded-full bg-milk/25"
          style={{
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 22}%`,
            animationDuration: `${3.5 + (i % 3)}s`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center md:px-8 md:py-32">
        <SplitHeading
          text={headline}
          className="font-display text-4xl font-semibold text-balance md:text-6xl"
        />
        <p className="mt-5 max-w-xl text-milk/85 md:text-lg">{text}</p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={buttonHref}
            className="focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors bg-amber px-10 py-4 text-lg text-soil shadow-[0_16px_40px_rgba(242,169,59,0.45)] hover:bg-amber-deep"
          >
            {button}
          </a>
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors border border-milk/40 px-8 py-4 text-lg text-milk hover:bg-milk/10"
          >
            {secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
