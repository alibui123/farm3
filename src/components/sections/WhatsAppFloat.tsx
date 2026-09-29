"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="focus-ring fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_rgba(37,211,102,0.45)] md:right-6 md:bottom-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.6, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />
      <MessageCircle className="relative" size={26} />
    </motion.a>
  );
}
