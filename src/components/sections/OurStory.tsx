"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_STEPS } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";

gsap.registerPlugin(ScrollTrigger);

export function OurStory() {
  const root = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");

      if (reduced || !desktop) {
        gsap.set(panels, { opacity: 1, clearProps: "transform" });
        if (path.current) {
          gsap.set(path.current, { strokeDashoffset: 0 });
        }
        return;
      }

      const total = panels.length;
      gsap.set(panels, { opacity: 0.35, y: 28 });
      gsap.set(panels[0], { opacity: 1, y: 0 });

      if (path.current) {
        const len = path.current.getTotalLength();
        gsap.set(path.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${total * 85}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(
        root.current,
        { backgroundColor: "#4a3424", duration: 0.5, ease: "none" },
        0,
      ).to(
        root.current,
        { backgroundColor: "#2f5d3a", duration: 0.5, ease: "none" },
        0.5,
      );

      if (path.current) {
        tl.to(path.current, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);
      }

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const at = i / (total - 1);
        tl.to(
          panels[i - 1],
          { opacity: 0.35, y: -16, duration: 0.2, ease: "none" },
          at - 0.18,
        );
        tl.to(
          panel,
          { opacity: 1, y: 0, duration: 0.22, ease: "none" },
          at - 0.12,
        );
        tl.fromTo(
          panel.querySelector(".story-img"),
          { yPercent: 8 },
          { yPercent: -6, duration: 0.35, ease: "none" },
          at - 0.18,
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="story"
      className="relative overflow-hidden bg-[#3d2a1c] text-milk md:min-h-[100svh]"
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-center px-5 pt-28 pb-16 md:h-[100svh] md:px-8 md:pt-24 md:pb-20">
        <SplitHeading
          text="A day at Al-shukr"
          className="max-w-3xl font-display text-3xl leading-[1.15] font-semibold text-milk md:text-5xl"
        />
        <p className="mt-3 max-w-xl text-base text-milk/80 md:text-lg">
          Sunrise milking to your doorstep — four quiet hours that keep every
          bottle honest.
        </p>

        <div className="relative mt-10 md:mt-12">
          {/* Desktop connecting path */}
          <svg
            className="pointer-events-none absolute top-[4.5rem] left-0 hidden h-2 w-full md:block"
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={path}
              d="M40,10 C200,10 280,10 400,10 C560,10 640,10 760,10 C880,10 920,10 960,10"
              fill="none"
              stroke="#F2A93B"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* Mobile vertical line */}
          <div
            className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-amber/40 md:hidden"
            aria-hidden
          />

          <ol className="grid gap-5 md:grid-cols-4 md:gap-5">
            {STORY_STEPS.map((step, i) => (
              <li key={step.time} className="relative md:contents">
                <span
                  className="absolute top-3 left-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-amber font-display text-[10px] text-soil md:hidden"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <article className="story-panel glass-dark ml-10 rounded-3xl p-4 md:ml-0 md:p-5">
                  <div className="story-img relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-soil/40">
                    <Image
                      src={step.image}
                      alt={`${step.title} at ${step.time} on Al-shukr Dairy Farm`}
                      fill
                      sizes="(max-width:768px) 100vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="font-display text-2xl text-amber">{step.time}</p>
                  <h3 className="mt-1 font-display text-xl text-milk">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-milk/75">
                    {step.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
