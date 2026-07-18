'use client';

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-[#FAFAFA]">AURA</span>
          <span className="text-[#7C3AED]">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#A1A1AA]">
          <Link href="#features" className="hover:text-[#FAFAFA] transition-colors duration-200">Features</Link>
          <Link href="#pricing" className="hover:text-[#FAFAFA] transition-colors duration-200">Pricing</Link>
          <Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">Docs</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth" className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200">
            Log in
          </Link>
          <Link href="/auth">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] px-5 py-2 rounded-[18px] transition-colors duration-200 shadow-[0_10px_40px_rgba(124,58,237,.18)]"
            >
              Get Started
            </motion.button>
          </Link>
        </div>

        <button className="md:hidden text-[#FAFAFA]" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-[#27272A] bg-[#09090B] px-6 py-4 flex flex-col gap-4 text-sm text-[#A1A1AA] overflow-hidden"
          >
            <Link href="#features" onClick={() => setOpen(false)}>Features</Link>
            <Link href="#pricing" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="#" onClick={() => setOpen(false)}>Docs</Link>
            <Link href="/auth" onClick={() => setOpen(false)}>
              <button className="mt-2 bg-[#7C3AED] text-[#FAFAFA] px-4 py-2 rounded-[18px] text-sm w-full">
                Get Started
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}