"use client";

import { MapPin } from "lucide-react";
import { AREAS, QUICK_ANSWERS, SERVICE_AREAS, WHATSAPP } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";

export function DeliveryAreas() {
  return (
    <section id="areas" className="relative bg-milk">
      <MilkWaveDivider from="#FBF7EE" to="#FFFFFF" />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 md:grid-cols-[1fr_1.15fr] md:gap-16 md:px-8 md:py-24">
        <div>
          <SplitHeading
            text={AREAS.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
          />
          <p className="mt-4 text-soil-muted">{AREAS.answer}</p>

          <ul className="mt-6 flex flex-wrap gap-3">
            {SERVICE_AREAS.map((area) => (
              <li
                key={area.name}
                className="inline-flex items-center gap-2 rounded-full bg-pasture/10 px-4 py-2 text-sm text-pasture"
              >
                <MapPin size={16} aria-hidden />
                <span className="font-medium">{area.name}</span>
                <span className="text-pasture/70">({area.alias})</span>
              </li>
            ))}
            <li className="inline-flex items-center rounded-full border border-pasture/15 px-4 py-2 text-sm text-soil-muted">
              and surrounding areas
            </li>
          </ul>

          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-8 inline-flex items-center justify-center rounded-full bg-pasture px-6 py-3 text-sm font-medium text-milk transition hover:bg-pasture-deep"
          >
            {AREAS.cta}
          </a>
          <a
            href="/delivery-areas"
            className="focus-ring mt-4 block w-fit text-sm font-medium text-pasture underline underline-offset-4"
          >
            See all delivery areas
          </a>
        </div>

        <div>
          <h2 className="font-display text-3xl font-semibold text-soil md:text-4xl">
            Quick answers
          </h2>
          <dl className="mt-6 divide-y divide-pasture/10 border-y border-pasture/10">
            {QUICK_ANSWERS.map((item) => (
              <div key={item.q} className="py-5">
                <dt className="font-display text-lg text-soil">{item.q}</dt>
                <dd className="mt-1.5 text-soil-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
          <a
            href="/faq"
            className="focus-ring mt-5 inline-block text-sm font-medium text-pasture underline underline-offset-4"
          >
            More answers in our FAQ
          </a>
        </div>
      </div>
    </section>
  );
}
