"use client";

import { Droplets } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <a
      href="#top"
      className={`focus-ring group inline-flex items-center gap-2 ${className}`}
      aria-label={`${SITE.shortName} home`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-105 ${
          light ? "bg-milk/20 text-milk" : "bg-pasture/10 text-pasture"
        }`}
      >
        <Droplets className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />
      </span>
      <span
        className={`font-display text-xl font-semibold tracking-tight ${
          light ? "text-milk" : "text-soil"
        }`}
      >
        {SITE.shortName}
      </span>
    </a>
  );
}
