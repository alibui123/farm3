"use client";

import { MessageCircle, Moon, Sun } from "lucide-react";
import { AREA_NOT_LISTED, DELIVERY_TIMES, whatsappLink } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MilkWaveDivider } from "@/components/ui/MilkWave";
import { Pending, PendingBadge } from "@/components/ui/Pending";

export function TimesAndCoverage() {
  const { windows } = DELIVERY_TIMES;
  const rounds = [
    { label: "Morning", window: windows.morning, Icon: Sun, tone: "bg-amber/20 text-soil", icon: "bg-amber text-soil" },
    { label: "Evening", window: windows.evening, Icon: Moon, tone: "bg-soil text-milk", icon: "bg-milk/15 text-milk" },
  ];

  return (
    <section id="timings" className="relative bg-cream">
      <MilkWaveDivider from="#2F5D3A" to="#FBF7EE" />
      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <SplitHeading
            text={DELIVERY_TIMES.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
          />
          <p className="mt-4 text-soil-muted md:text-lg">{DELIVERY_TIMES.answer}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {rounds.map(({ label, window, Icon, tone, icon }) => (
              <li key={label} className={`rounded-3xl p-6 ${tone}`}>
                <span className={`flex h-11 w-11 items-center justify-center rounded-full ${icon}`} aria-hidden>
                  <Icon size={20} />
                </span>
                <p className="mt-5 font-display text-2xl">{label}</p>
                <p className="mt-1 text-sm opacity-85">
                  {window ?? (
                    <>
                      Every {label.toLowerCase()} <PendingBadge className="ml-1" />
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
          {!windows.morning && <Pending className="mt-4">{DELIVERY_TIMES.pendingNote}</Pending>}
        </div>

        <div>
          <SplitHeading
            text={AREA_NOT_LISTED.heading}
            className="font-display text-3xl font-semibold text-balance text-soil md:text-4xl"
          />
          <p className="mt-4 text-soil-muted md:text-lg">{AREA_NOT_LISTED.answer}</p>
          <a
            href={whatsappLink(AREA_NOT_LISTED.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-pasture px-6 py-3 text-sm font-medium text-milk transition hover:bg-pasture-deep"
          >
            <MessageCircle size={18} aria-hidden />
            {AREA_NOT_LISTED.cta}
          </a>
          <Pending className="mt-6">{AREA_NOT_LISTED.pendingNote}</Pending>
        </div>
      </div>
    </section>
  );
}
