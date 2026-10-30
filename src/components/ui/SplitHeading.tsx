"use client";

import { motion, useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

/**
 * Word-reveal heading that wraps like normal prose (inline), not a flex column.
 * Reduced-motion users see the full line immediately.
 */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    // Keep each word unbreakable (e.g. "Al Shukr"), matching the animated version.
    return (
      <Tag ref={ref as never} className={className}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="whitespace-nowrap">{word}</span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="[text-wrap:balance]">
        {words.map((word, i) => (
          // Extra bottom padding keeps descenders (g, y, p) inside the mask; the
          // matching negative margin keeps line spacing unchanged.
          <span
            key={`${word}-${i}`}
            className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "130%", opacity: 0 }}
              animate={
                inView ? { y: "0%", opacity: 1 } : { y: "130%", opacity: 0 }
              }
              transition={{
                duration: 0.7,
                delay: delay + i * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
