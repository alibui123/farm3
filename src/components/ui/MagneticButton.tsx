"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 280, damping: 20 });
  const y = useSpring(my, { stiffness: 280, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className={`magnetic focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors ${className}`}
    >
      {children}
    </motion.button>
  );
}

type LinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  strength?: number;
  target?: string;
  rel?: string;
};

export function MagneticLink({
  children,
  className = "",
  href,
  strength = 0.35,
  target,
  rel,
}: LinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 280, damping: 20 });
  const y = useSpring(my, { stiffness: 280, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className={`magnetic focus-ring inline-flex items-center justify-center rounded-full font-medium ${className}`}
    >
      {children}
    </motion.a>
  );
}
