'use client';

import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Features() {
  const features = [
    { icon: "🤖", title: "AI Assistant", desc: "Create documents, answer questions, and analyze data instantly." },
    { icon: "📝", title: "AI Writing", desc: "Generate blog posts, emails, and reports in seconds." },
    { icon: "🌍", title: "Translation", desc: "Translate content into 50+ languages automatically." },
    { icon: "⚙️", title: "Automation", desc: "Build workflows that run 24/7 without manual work." },
    { icon: "📊", title: "Research", desc: "Analyze trends, summarize papers, and extract insights." },
    { icon: "📁", title: "Documents", desc: "Organize, search, and manage all your AI-generated files." },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#2563EB] rounded-full opacity-5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[14px] text-[#7C3AED] font-medium mb-3">FEATURES</p>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-[#A1A1AA] text-[18px] max-w-xl mx-auto">
            One platform. Six powerful tools. Zero complexity.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.25 },
              }}
              className="group p-6 rounded-[24px] border border-[#27272A] bg-[#18181B] backdrop-blur-sm hover:border-[#7C3AED]/50 hover:shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-shadow duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-[18px] font-semibold mb-2 text-[#FAFAFA]">{f.title}</h3>
              <p className="text-[14px] text-[#A1A1AA] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}