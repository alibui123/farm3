"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/lib/constants";

/** delay: entrance delay in seconds; inner pages have no PageIntro to wait for. */
export function WhatsAppFloat({ delay = 2.6 }: { delay?: number }) {
  return (
    <motion.a
      href={WHATSAPP.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="focus-ring fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-105 active:scale-95 md:right-6 md:bottom-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 18 }}
    >
      {/* Pulse ring in CSS so it runs on the compositor. */}
      <span aria-hidden className="animate-ping-ring absolute inset-0 rounded-full bg-[#25D366]" />
      <MessageCircle className="relative" size={26} />
    </motion.a>
  );
}
