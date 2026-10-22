"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT, CONTACT_PAGE, CONTACT_STATUS, WHATSAPP, WHATSAPP_DISPLAY, contactAnswer } from "@/lib/constants";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { KeepBrand } from "@/components/ui/Brand";
import { OrganicBlob } from "@/components/ui/MilkWave";
import { PendingBadge } from "@/components/ui/Pending";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export function ContactHero() {
  const reduced = usePrefersReducedMotion();
  const channels = [
    {
      label: "WhatsApp",
      value: WHATSAPP_DISPLAY,
      href: WHATSAPP.href,
      external: true,
      Icon: MessageCircle,
      tone: "bg-[#25D366] text-white",
      note: "Fastest reply",
    },
    { label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, "")}`, external: false, Icon: Phone, tone: "bg-pasture text-milk", note: null },
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, external: false, Icon: Mail, tone: "bg-amber text-soil", note: null },
  ];

  return (
    <section className="relative overflow-hidden bg-cream">
      <OrganicBlob className="pointer-events-none absolute top-24 -right-28 h-80 w-80 opacity-25" color="#A9C4A0" />
      <OrganicBlob className="pointer-events-none absolute bottom-0 -left-32 h-72 w-72 opacity-20" color="#F2A93B" />

      <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <nav aria-label="Breadcrumb">
          <ol className="inline-flex items-center gap-1.5 text-sm text-soil-muted">
            <li>
              <Link href="/" className="focus-ring rounded hover:text-pasture">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="font-medium text-soil">
              Contact
            </li>
          </ol>
        </nav>

        <div className="mt-5 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <h1 className="font-display text-[clamp(2.4rem,6.5vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-balance text-soil">
              <KeepBrand text={CONTACT_PAGE.heading} />
            </h1>
            <p className="mt-5 max-w-xl text-soil-muted md:text-lg">{CONTACT_PAGE.subtext}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={WHATSAPP.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors gap-2 bg-[#25D366] px-7 py-3.5 text-base text-soil shadow-[0_10px_30px_rgba(37,211,102,0.35)]"
              >
                <MessageCircle size={19} aria-hidden />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div>
            <SplitHeading
              text={CONTACT_PAGE.howHeading}
              className="font-display text-2xl font-semibold text-balance text-soil md:text-3xl"
            />
            <p className="mt-3 text-soil-muted">{contactAnswer()}</p>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {channels.map(({ label, value, href, external, Icon, tone, note }, i) => (
            <motion.li
              key={label}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="focus-ring group flex h-full items-center gap-4 rounded-3xl border border-pasture/10 bg-milk p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-pasture/25 hover:shadow-[0_20px_44px_rgba(43,33,24,0.08)] md:p-6"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tone}`} aria-hidden>
                  <Icon size={22} />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2 text-sm text-soil-muted">
                    {label}
                    {note && <span className="rounded-full bg-pasture/10 px-2 py-0.5 text-xs font-medium text-pasture">{note}</span>}
                    {!CONTACT_STATUS.channelsConfirmed && <PendingBadge />}
                  </span>
                  <span className="block truncate font-display text-xl text-soil">{value}</span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
