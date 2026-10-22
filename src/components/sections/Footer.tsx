"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import {
  CONTACT,
  NAV_LINKS,
  SERVICE_AREAS,
  SITE,
  SAMPLE_HREF,
  SOCIAL,
  WHATSAPP,
} from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

function SocialGlyph({ label }: { label: string }) {
  if (label === "Instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (label === "Facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="currentColor"
        aria-hidden
      >
        <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.6l.4-3H14V9z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="currentColor"
      aria-hidden
    >
      <path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.7 4 12 4 12 4h0s-4.7 0-7.7.2c-.5.1-1.5.1-2.4 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.4C.8 14.6 1 16.5 1 16.5s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 7.5.2 7.5.2s4.7 0 7.7-.2c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4C23.2 9.4 23 7.5 23 7.5zM9.8 14.8V8.7l6.2 3.05-6.2 3.05z" />
    </svg>
  );
}

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!word.current) return;
      gsap.fromTo(
        word.current,
        { yPercent: 40, opacity: 0.15 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      id="contact"
      className="relative overflow-hidden bg-pasture-deep text-milk"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:px-8 md:py-20">
        <div>
          <Logo full />
          <p className="mt-4 max-w-sm text-sage">{SITE.description}</p>
          <p className="mt-3 font-display text-milk/90 italic">{SITE.tagline}</p>
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-soil"
          >
            <MessageCircle size={18} />
            WhatsApp us
          </a>
        </div>

        <div>
          <p className="text-sm tracking-[0.18em] text-sage uppercase">
            Quick links
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="focus-ring text-milk/85 transition hover:text-amber"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={SAMPLE_HREF}
                className="focus-ring text-milk/85 hover:text-amber"
              >
                Free Sample
              </a>
            </li>
            <li>
              <a href="/faq" className="focus-ring text-milk/85 hover:text-amber">
                FAQ
              </a>
            </li>
            <li>
              <a href="/blog" className="focus-ring text-milk/85 hover:text-amber">
                Blog
              </a>
            </li>
            <li>
              <a href="/bulk-milk-supply" className="focus-ring text-milk/85 hover:text-amber">
                Bulk Supply
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm tracking-[0.18em] text-sage uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-milk/85">
            <li>{CONTACT.phone}</li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="focus-ring hover:text-amber"
              >
                {CONTACT.email}
              </a>
            </li>
            <li>{CONTACT.address}</li>
            <li>
              Delivering to {SERVICE_AREAS.map((a) => a.name).join(", ")} and
              surrounding areas
            </li>
            <li className="text-sage">{CONTACT.hours}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-milk/10 text-milk transition hover:bg-amber hover:text-soil"
              >
                <SocialGlyph label={s.label} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <p
        ref={word}
        className="pointer-events-none select-none px-4 text-center font-display text-[clamp(3.5rem,18vw,14rem)] leading-none font-semibold tracking-[-0.04em] text-milk/10"
        aria-hidden
      >
        AL-SHUKAR
      </p>

      <div className="border-t border-milk/10 px-5 py-5 text-center text-sm text-sage md:px-8">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
