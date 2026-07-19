'use client';

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Kim",
    role: "Content Creator",
    avatar: "SK",
    text: "AURA completely transformed my workflow. I went from spending 4 hours writing blog posts to 20 minutes. The multi-model feature lets me pick the best AI for each task.",
    color: "from-[#7C3AED] to-[#2563EB]",
  },
  {
    name: "James Park",
    role: "E-commerce Seller",
    avatar: "JP",
    text: "I use AURA to generate product descriptions for my store. What used to take me an entire weekend now takes less than an hour. My sales have increased 40% since.",
    color: "from-[#2563EB] to-[#22C55E]",
  },
  {
    name: "Mina Lee",
    role: "Marketing Manager",
    avatar: "ML",
    text: "The automation workflows are a game-changer. I set up daily content generation and social media scheduling. It runs 24/7 without me lifting a finger.",
    color: "from-[#22C55E] to-[#F59E0B]",
  },
  {
    name: "David Chen",
    role: "Startup Founder",
    avatar: "DC",
    text: "Having GPT-4, Claude, and Gemini in one place is incredible. I compare outputs and pick the best one. No other platform offers this kind of flexibility.",
    color: "from-[#F59E0B] to-[#EF4444]",
  },
  {
    name: "Yuki Tanaka",
    role: "Freelance Translator",
    avatar: "YT",
    text: "AURA handles translations that actually sound natural. My clients can't tell the difference from human translation. It's saved me hundreds of hours.",
    color: "from-[#EF4444] to-[#7C3AED]",
  },
  {
    name: "Alex Rodriguez",
    role: "YouTuber",
    avatar: "AR",
    text: "I generate video scripts, titles, and descriptions all in AURA. The research feature helps me find trending topics. My channel grew 3x in two months.",
    color: "from-[#7C3AED] to-[#22C55E]",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[14px] text-[#7C3AED] font-medium mb-3">TESTIMONIALS</p>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-tight mb-4">
            Loved by creators worldwide
          </h2>
          <p className="text-[#A1A1AA] text-[18px] max-w-xl mx-auto">
            See how AURA is helping people save time and grow their business.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B] hover:border-[#7C3AED]/50 hover:shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-[#F59E0B] text-[14px]">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-[14px] text-[#A1A1AA] leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-[12px] font-bold text-[#FAFAFA]`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#FAFAFA]">{t.name}</p>
                  <p className="text-[12px] text-[#71717A]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}