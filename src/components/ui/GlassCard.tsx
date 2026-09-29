"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function GlassCard({
  children,
  className = "",
  tilt = false,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 });
  const shineX = useTransform(ry, [-12, 12], [20, 80]);
  const shineY = useTransform(rx, [12, -12], [20, 80]);
  const shineBg = useTransform(
    [shineX, shineY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.55), transparent 55%)`,
  );

  const onMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 16);
    rx.set((0.5 - py) * 16);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={
        tilt
          ? {
              rotateX,
              rotateY,
              transformPerspective: 900,
            }
          : undefined
      }
      whileHover={tilt ? { scale: 1.02 } : { y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`glass cursor-grow relative overflow-hidden rounded-3xl ${className}`}
    >
      {tilt && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: shineBg }}
        />
      )}
      {children}
    </motion.div>
  );
}
