"use client";

import { motion } from "framer-motion";

export function MilkBottle({
  delay = 0,
  label,
}: {
  delay?: number;
  label: string;
}) {
  return (
    <div className="relative h-24 w-14" aria-hidden title={label}>
      <svg viewBox="0 0 56 96" className="h-full w-full">
        <path
          d="M18 8 H38 V16 C42 18 44 22 44 28 V84 C44 90 39 94 28 94 C17 94 12 90 12 84 V28 C12 22 14 18 18 16 Z"
          fill="rgba(255,255,255,0.55)"
          stroke="#2F5D3A"
          strokeWidth="2"
        />
        <rect x="20" y="2" width="16" height="8" rx="2" fill="#2F5D3A" />
        <defs>
          <clipPath id={`fill-${label}`}>
            <path d="M16 30 H40 V82 C40 86 35 90 28 90 C21 90 16 86 16 82 Z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#fill-${label})`}>
          <motion.rect
            x="12"
            width="32"
            height="70"
            fill="#FBF7EE"
            initial={{ y: 96 }}
            animate={{ y: 42 }}
            transition={{
              duration: 1.6,
              delay: 0.3 + delay,
              ease: [0.22, 1, 0.36, 1],
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1.2,
            }}
          />
          <motion.path
            d="M12 48 Q20 42 28 48 T44 48 V100 H12 Z"
            fill="#E8F0E4"
            animate={{ x: [0, 2, 0, -2, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </div>
  );
}
