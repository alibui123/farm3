"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

/**
 * Default: the round emblem beside the name, for the light navbar.
 * full: the complete round badge with lettering (footer).
 */
export function Logo({
  className = "",
  full = false,
}: {
  className?: string;
  full?: boolean;
}) {
  if (full) {
    return (
      <Link
        href="/"
        className={`focus-ring inline-block ${className}`}
        aria-label={`${SITE.shortName} home`}
      >
        <Image
          src="/brand/al-shukr-logo.png"
          alt={`${SITE.name} logo`}
          width={512}
          height={512}
          className="h-28 w-28 md:h-32 md:w-32"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`focus-ring group inline-flex items-center gap-2 ${className}`}
      aria-label={`${SITE.shortName} home`}
    >
      <Image
        src="/brand/al-shukr-emblem.png"
        alt=""
        width={40}
        height={40}
        loading="eager"
        className="h-10 w-10 shrink-0 rounded-full shadow-[0_2px_8px_rgba(43,33,24,0.15)] transition-transform group-hover:scale-105"
      />
      <span className="font-display text-xl font-semibold tracking-tight whitespace-nowrap text-soil">
        {SITE.shortName}
      </span>
    </Link>
  );
}
