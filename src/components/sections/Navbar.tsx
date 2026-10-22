"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronRight, Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, SAMPLE_HREF, WHATSAPP } from "@/lib/constants";

/** delay: entrance delay in seconds. The home page waits for PageIntro; inner pages pass a short one. */
export function Navbar({ delay = 1.5 }: { delay?: number }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze the page (and Lenis) behind the open mobile menu.
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border py-2.5 pr-2.5 pl-4 shadow-[0_8px_32px_rgba(43,33,24,0.08)] transition-all duration-500 md:pl-5 lg:px-5 ${
            scrolled
              ? "border-white/50 bg-cream/90 backdrop-blur-sm"
              : "border-white/40 bg-white/70 backdrop-blur-sm"
          } ${scrolled ? "scale-[0.98]" : "scale-100"}`}
          aria-label="Primary"
        >
          <Logo className="min-w-0" />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={link.href === pathname ? "page" : undefined}
                  className="focus-ring rounded-full px-3 py-2 text-sm text-soil-muted transition-colors hover:text-pasture aria-[current=page]:bg-pasture/10 aria-[current=page]:text-pasture"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={SAMPLE_HREF}
              className="focus-ring hidden items-center justify-center rounded-full font-medium transition-colors bg-amber px-4 py-2 text-sm whitespace-nowrap text-soil shadow-[0_6px_20px_rgba(242,169,59,0.35)] hover:bg-amber-deep lg:inline-flex"
            >
              Get Free Sample
            </a>
            <button
              type="button"
              className="focus-ring inline-flex h-10 items-center gap-2 rounded-full bg-pasture pr-4 pl-3.5 text-sm font-medium text-milk transition-colors hover:bg-pasture-deep lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile: a card that drops under the bar, over a dimmed page; tap outside or Escape closes it */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-soil/40 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-[84px] z-50 mx-auto max-h-[calc(100svh-100px)] max-w-5xl origin-top overflow-y-auto rounded-[28px] border border-white/50 bg-cream p-2 shadow-[0_24px_60px_rgba(43,33,24,0.25)] md:top-[88px] lg:hidden"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <a
                      href={link.href}
                      aria-current={link.href === pathname ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="focus-ring group flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl text-soil transition-colors hover:bg-pasture/5 aria-[current=page]:bg-pasture/10 aria-[current=page]:text-pasture"
                    >
                      {link.label}
                      <ChevronRight
                        size={18}
                        className="text-soil-muted/60 group-aria-[current=page]:text-pasture"
                        aria-hidden
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-pasture/10 p-2 pt-4">
                <a
                  href={SAMPLE_HREF}
                  onClick={() => setOpen(false)}
                  className="focus-ring inline-flex items-center justify-center rounded-full bg-amber px-4 py-3 text-sm font-medium text-soil"
                >
                  Get Free Sample
                </a>
                <a
                  href={WHATSAPP.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-soil"
                >
                  <MessageCircle size={16} aria-hidden />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
