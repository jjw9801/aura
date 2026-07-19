'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] border border-[#27272A] bg-[#18181B] p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Background Glows */}
          <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#7C3AED] rounded-full opacity-10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#2563EB] rounded-full opacity-10 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-[28px] md:text-[48px] font-bold tracking-tight mb-4">
              Ready to build with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#2563EB]"> AI</span>?
            </h2>

            <p className="text-[18px] text-[#A1A1AA] max-w-lg mx-auto mb-10 leading-relaxed">
              Join thousands of creators, marketers, and businesses using AURA to automate their work and grow faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] px-8 py-3.5 rounded-[18px] text-[16px] font-medium transition-colors duration-200 shadow-[0_10px_40px_rgba(124,58,237,.3)]"
                >
                  Start Free — No Credit Card Required →
                </motion.button>
              </Link>
            </div>

            <p className="text-[12px] text-[#71717A] mt-6">
              Free plan includes 5 AI requests/day. Upgrade anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}