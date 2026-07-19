'use client';

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Choose Your AI",
    desc: "Select from GPT-4, Claude, or Gemini. Each model has unique strengths — use the right one for every task.",
    icon: "🤖",
  },
  {
    number: "02",
    title: "Create & Automate",
    desc: "Generate blog posts, translate content, analyze data, or build automated workflows — all in one place.",
    icon: "⚡",
  },
  {
    number: "03",
    title: "Scale & Grow",
    desc: "Publish content automatically, track performance, and let AI handle the repetitive work while you focus on growth.",
    icon: "🚀",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED] rounded-full opacity-5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[14px] text-[#7C3AED] font-medium mb-3">HOW IT WORKS</p>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-tight mb-4">
            Three steps to AI-powered growth
          </h2>
          <p className="text-[#A1A1AA] text-[18px] max-w-xl mx-auto">
            No coding required. Get started in minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-px bg-gradient-to-r from-[#7C3AED]/50 via-[#2563EB]/50 to-[#22C55E]/50" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative text-center"
            >
              {/* Number Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-[120px] h-[120px] rounded-full border border-[#27272A] bg-[#18181B] flex flex-col items-center justify-center mx-auto mb-6 relative z-10"
              >
                <span className="text-3xl mb-1">{step.icon}</span>
                <span className="text-[12px] text-[#7C3AED] font-bold">{step.number}</span>
              </motion.div>

              <h3 className="text-[18px] font-semibold text-[#FAFAFA] mb-3">{step.title}</h3>
              <p className="text-[14px] text-[#A1A1AA] leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}