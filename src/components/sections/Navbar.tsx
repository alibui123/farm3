"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 shadow-[0_8px_32px_rgba(43,33,24,0.08)] transition-all duration-500 md:px-5 ${
            scrolled
              ? "border-white/50 bg-cream/75 backdrop-blur-xl"
              : "border-white/40 bg-white/45 backdrop-blur-2xl"
          } ${scrolled ? "scale-[0.98]" : "scale-100"}`}
          aria-label="Primary"
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="focus-ring rounded-full px-3 py-2 text-sm text-soil-muted transition-colors hover:text-pasture"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <MagneticLink
              href="#sample"
              className="hidden bg-amber px-4 py-2 text-sm text-soil shadow-[0_6px_20px_rgba(242,169,59,0.35)] hover:bg-amber-deep sm:inline-flex"
            >
              Get Free Sample
            </MagneticLink>
            <button
              type="button"
              className="focus-ring cursor-grow inline-flex h-10 w-10 items-center justify-center rounded-full bg-pasture/10 text-pasture lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-cream/95 px-6 pt-28 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="focus-ring block rounded-2xl px-2 py-3 font-display text-3xl text-soil"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#sample"
              onClick={() => setOpen(false)}
              className="focus-ring mt-8 inline-flex items-center justify-center rounded-full bg-amber px-6 py-3.5 font-medium text-soil"
            >
              Get Free Sample
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
