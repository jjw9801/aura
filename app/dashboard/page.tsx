'use client';
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export default function DashboardPage() {
  const quickActions = [
    { icon: "🤖", title: "New Chat", desc: "Start a conversation with AI", href: "/dashboard/chat" },
    { icon: "🔍", title: "Research", desc: "Analyze and summarize content", href: "/dashboard/research" },
    { icon: "📝", title: "Write", desc: "Generate articles and posts", href: "/dashboard/chat" },
    { icon: "⚙️", title: "Workflow", desc: "Automate your tasks", href: "/dashboard/workflow" },
  ];

  const recentChats = [
    { title: "Marketing strategy for Q1", time: "2 hours ago", model: "GPT-4" },
    { title: "Translate product descriptions", time: "5 hours ago", model: "Claude" },
    { title: "Research on AI trends 2025", time: "1 day ago", model: "GPT-4" },
  ];

  const stats = [
    { label: "AI Requests", value: "1,284", change: "+12%" },
    { label: "Documents", value: "47", change: "+3" },
    { label: "Workflows", value: "8", change: "+1" },
    { label: "Time Saved", value: "32h", change: "+5h" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-[28px] font-bold mb-1">Welcome back</h1>
        <p className="text-[#A1A1AA] text-[18px]">Here&apos;s what&apos;s happening with your AI workspace.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="p-5 rounded-[24px] border border-[#27272A] bg-[#18181B]"
          >
            <p className="text-[14px] text-[#71717A] mb-2">{stat.label}</p>
            <div className="flex items-end gap-2">
              <p className="text-[28px] font-bold text-[#FAFAFA]">{stat.value}</p>
              <span className="text-[12px] text-[#22C55E] mb-1">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-[18px] font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.a
              key={i}
              href={action.href}
              whileHover={{ y: -4, scale: 1.03 }}
              className="p-5 rounded-[24px] border border-[#27272A] bg-[#18181B] hover:border-[#7C3AED]/50 hover:shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-shadow duration-300 cursor-pointer block"
            >
              <span className="text-2xl">{action.icon}</span>
              <h3 className="text-[14px] font-semibold mt-3 mb-1 text-[#FAFAFA]">{action.title}</h3>
              <p className="text-[12px] text-[#71717A]">{action.desc}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Recent Chats */}
      <motion.div
        custom={6}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-[18px] font-semibold mb-4">Recent Chats</h2>
        <div className="rounded-[24px] border border-[#27272A] bg-[#18181B] overflow-hidden">
          {recentChats.map((chat, i) => (
            <Link
              key={i}
              href="/dashboard/chat"
              className={`flex items-center justify-between px-6 py-4 hover:bg-[#27272A]/30 transition-colors duration-200 cursor-pointer ${
                i !== recentChats.length - 1 ? "border-b border-[#27272A]" : ""
              }`}
            >
            
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[16px] bg-[#7C3AED]/10 flex items-center justify-center text-lg">
                  💬
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#FAFAFA]">{chat.title}</p>
                  <p className="text-[12px] text-[#71717A]">{chat.time}</p>
                </div>
              </div>
              <span className="text-[12px] text-[#A1A1AA] border border-[#27272A] px-3 py-1 rounded-full">
                {chat.model}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* AI Models */}
      <motion.div
        custom={7}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-[18px] font-semibold mb-4">AI Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "GPT-4", status: "Available", color: "#22C55E" },
            { name: "Claude", status: "Available", color: "#22C55E" },
            { name: "Gemini", status: "Coming Soon", color: "#F59E0B" },
          ].map((model, i) => (
            <div
              key={i}
              className="p-5 rounded-[24px] border border-[#27272A] bg-[#18181B] flex items-center justify-between"
            >
              <div>
                <p className="text-[14px] font-semibold text-[#FAFAFA]">{model.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: model.color }}
                  />
                  <span className="text-[12px] text-[#71717A]">{model.status}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="text-[12px] border border-[#27272A] hover:border-[#7C3AED] text-[#A1A1AA] hover:text-[#FAFAFA] px-4 py-1.5 rounded-[18px] transition-colors duration-200"
              >
                Use
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}