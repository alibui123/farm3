"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOW_STEPS } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !line.current) return;

      const len = line.current.getTotalLength();
      gsap.set(line.current, { strokeDasharray: len, strokeDashoffset: len });

      gsap.to(line.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          end: "bottom 55%",
          scrub: true,
        },
      });

      gsap.from(".how-step", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 65%",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      className="relative overflow-hidden bg-milk py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SplitHeading
          text="Three steps to fresher mornings."
          className="max-w-2xl font-display text-3xl font-semibold text-balance text-soil md:text-5xl"
        />

        <div className="relative mt-14">
          <svg
            className="pointer-events-none absolute top-8 left-0 hidden h-4 w-full md:block"
            viewBox="0 0 1000 24"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={line}
              d="M80,12 C280,12 320,12 500,12 C680,12 720,12 920,12"
              fill="none"
              stroke="#2F5D3A"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
            {HOW_STEPS.map((step, i) => (
              <li key={step.title} className="how-step relative">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber font-display text-xl text-soil shadow-[0_8px_24px_rgba(242,169,59,0.35)]">
                  {i + 1}
                </div>
                <h3 className="font-display text-2xl text-soil">{step.title}</h3>
                <p className="mt-2 text-soil-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
