'use client';

import { motion } from "framer-motion";
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED] rounded-full opacity-10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left - Text */}
        <div>
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 border border-[#27272A] rounded-full px-4 py-1.5 text-[14px] text-[#A1A1AA] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            Now in Public Beta
          </motion.div>

          {/* Heading — 72px Bold */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[48px] md:text-[72px] font-bold tracking-tight leading-[1.05] mb-6"
          >
            The AI
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#2563EB]">
              Operating System
            </span>
          </motion.h1>

          {/* Sub — 18px */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[18px] text-[#A1A1AA] max-w-lg mb-10 leading-relaxed"
          >
            Build. Research. Automate.
            <br />
            One platform to create documents, automate workflows, and work with AI.
          </motion.p>

          {/* Buttons — rounded 18px */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] px-8 py-3 rounded-[18px] text-[14px] font-medium transition-colors duration-200 shadow-[0_10px_40px_rgba(124,58,237,.18)]"
            >
              Start Free →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="border border-[#27272A] hover:border-[#7C3AED] text-[#A1A1AA] hover:text-[#FAFAFA] px-8 py-3 rounded-[18px] text-[14px] font-medium transition-colors duration-200"
            >
              Live Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-12 flex gap-8 md:gap-12 text-[14px] text-[#71717A]"
          >
            <div>
              <p className="text-[28px] font-bold text-[#FAFAFA]">10K+</p>
              <p>Users</p>
            </div>
            <div className="w-px h-10 bg-[#27272A]" />
            <div>
              <p className="text-[28px] font-bold text-[#FAFAFA]">1M+</p>
              <p>AI Requests</p>
            </div>
            <div className="w-px h-10 bg-[#27272A]" />
            <div>
              <p className="text-[28px] font-bold text-[#FAFAFA]">99.9%</p>
              <p>Uptime</p>
            </div>
          </motion.div>
        </div>

        {/* Right - 3D Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full h-[500px] lg:h-[600px]"
        >
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="absolute inset-0 z-0"
          />
        </motion.div>
      </div>
    </section>
  );
}