"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PageIntro({ onDone }: { onDone?: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(
      () => {
        setShow(false);
        onDone?.();
      },
      reduced ? 100 : 1600,
    );
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative flex h-28 w-20 flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <svg viewBox="0 0 64 96" className="h-28 w-20" aria-hidden>
              <path
                d="M32 4 C18 4 12 16 12 28 C12 48 20 62 32 92 C44 62 52 48 52 28 C52 16 46 4 32 4 Z"
                fill="none"
                stroke="#2F5D3A"
                strokeWidth="2.5"
              />
              <motion.path
                d="M32 88 C22 62 16 48 16 30 C16 20 22 12 32 12 C42 12 48 20 48 30 C48 48 42 62 32 88 Z"
                fill="#FBF7EE"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              />
            </svg>
            <motion.p
              className="mt-4 font-display text-sm tracking-[0.2em] text-pasture uppercase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              Al-shukr
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
