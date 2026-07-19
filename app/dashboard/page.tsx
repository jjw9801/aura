'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

const usageData = [
  { day: "Mon", requests: 45 },
  { day: "Tue", requests: 72 },
  { day: "Wed", requests: 89 },
  { day: "Thu", requests: 63 },
  { day: "Fri", requests: 95 },
  { day: "Sat", requests: 42 },
  { day: "Sun", requests: 78 },
];

const modelUsage = [
  { name: "GPT-4", usage: 45, color: "#22C55E" },
  { name: "Claude", usage: 32, color: "#7C3AED" },
  { name: "Gemini", usage: 23, color: "#2563EB" },
];

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const stats = [
    {
      label: "Total Requests",
      value: "1,284",
      change: "+12%",
      trend: "up",
      icon: "⚡",
      gradient: "from-[#7C3AED]/20 to-transparent",
    },
    {
      label: "Documents",
      value: "47",
      change: "+3 this week",
      trend: "up",
      icon: "📄",
      gradient: "from-[#2563EB]/20 to-transparent",
    },
    {
      label: "Workflows",
      value: "8",
      change: "+1 active",
      trend: "up",
      icon: "🔄",
      gradient: "from-[#22C55E]/20 to-transparent",
    },
    {
      label: "Time Saved",
      value: "32h",
      change: "+5h this week",
      trend: "up",
      icon: "⏱️",
      gradient: "from-[#F59E0B]/20 to-transparent",
    },
  ];

  const quickActions = [
    { icon: "🤖", title: "New Chat", desc: "Start a conversation", href: "/dashboard/chat", color: "border-[#7C3AED]/30 hover:border-[#7C3AED]" },
    { icon: "🔍", title: "Research", desc: "Analyze content", href: "/dashboard/research", color: "border-[#2563EB]/30 hover:border-[#2563EB]" },
    { icon: "📝", title: "Write", desc: "Generate content", href: "/dashboard/chat", color: "border-[#22C55E]/30 hover:border-[#22C55E]" },
    { icon: "📁", title: "Files", desc: "Manage documents", href: "/dashboard/files", color: "border-[#F59E0B]/30 hover:border-[#F59E0B]" },
  ];

  const recentChats = [
    { title: "Marketing strategy for Q1", time: "2 hours ago", model: "GPT-4", modelColor: "#22C55E" },
    { title: "Translate product descriptions", time: "5 hours ago", model: "Claude", modelColor: "#7C3AED" },
    { title: "Research on AI trends 2025", time: "1 day ago", model: "GPT-4", modelColor: "#22C55E" },
    { title: "Write blog post about automation", time: "2 days ago", model: "Gemini", modelColor: "#2563EB" },
  ];

  const gettingStarted = [
    { label: "Create your account", done: true },
    { label: "Start your first chat", done: true },
    { label: "Create a workflow", done: false },
    { label: "Upload your first file", done: false },
    { label: "Invite a team member", done: false },
  ];

  const completedSteps = gettingStarted.filter((s) => s.done).length;
  const progress = (completedSteps / gettingStarted.length) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-[28px] font-bold mb-1">{greeting} 👋</h1>
          <p className="text-[#71717A] text-[14px]">
            Here&apos;s your AI workspace overview
          </p>
        </div>
        <Link href="/dashboard/chat">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] px-5 py-2.5 rounded-[18px] text-[14px] font-medium shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-colors duration-200"
          >
            + New Chat
          </motion.button>
        </Link>
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
            whileHover={{ y: -4 }}
            className={`relative overflow-hidden p-5 rounded-[24px] border border-[#27272A] bg-[#18181B] transition-all duration-300`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${stat.gradient} rounded-bl-full pointer-events-none`} />
            <div className="relative">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-[12px] text-[#71717A] mt-3 mb-1">{stat.label}</p>
              <p className="text-[28px] font-bold text-[#FAFAFA]">{stat.value}</p>
              <span className="text-[12px] text-[#22C55E]">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Usage Chart */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 p-6 rounded-[24px] border border-[#27272A] bg-[#18181B]"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[16px] font-semibold text-[#FAFAFA]">AI Usage</h2>
              <p className="text-[12px] text-[#71717A]">Requests this week</p>
            </div>
            <div className="flex gap-2">
              {["7D", "30D", "90D"].map((period, i) => (
                <button
                  key={period}
                  className={`text-[11px] px-3 py-1 rounded-full transition-colors duration-200 ${
                    i === 0
                      ? "bg-[#7C3AED] text-[#FAFAFA]"
                      : "text-[#71717A] hover:text-[#FAFAFA] border border-[#27272A]"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={usageData}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717A", fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#18181B",
                  border: "1px solid #27272A",
                  borderRadius: "16px",
                  color: "#FAFAFA",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#7C3AED"
                strokeWidth={2}
                fill="url(#colorRequests)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Model Usage */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B]"
        >
          <h2 className="text-[16px] font-semibold text-[#FAFAFA] mb-1">Models</h2>
          <p className="text-[12px] text-[#71717A] mb-6">Usage by model</p>

          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={modelUsage} layout="vertical" barSize={12}>
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#A1A1AA", fontSize: 12 }}
                width={50}
              />
              <Bar dataKey="usage" radius={[0, 6, 6, 0]}>
                {modelUsage.map((entry, index) => (
                  <motion.rect key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {modelUsage.map((m, i) => (
              <div key={i} className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-[#A1A1AA]">{m.name}</span>
                </div>
                <span className="text-[#FAFAFA] font-medium">{m.usage}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions + Getting Started */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Actions */}
        <motion.div
          custom={7}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <h2 className="text-[16px] font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  className={`p-4 rounded-[20px] border ${action.color} bg-[#18181B] transition-all duration-300 cursor-pointer h-full`}
                >
                  <span className="text-xl">{action.icon}</span>
                  <h3 className="text-[13px] font-semibold mt-2 mb-0.5 text-[#FAFAFA]">{action.title}</h3>
                  <p className="text-[11px] text-[#71717A]">{action.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Getting Started */}
        <motion.div
          custom={8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold text-[#FAFAFA]">Getting Started</h2>
            <span className="text-[12px] text-[#7C3AED] font-medium">{completedSteps}/{gettingStarted.length}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#27272A] rounded-full mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] rounded-full"
            />
          </div>

          <div className="space-y-3">
            {gettingStarted.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                    step.done
                      ? "bg-[#22C55E] text-white"
                      : "border border-[#27272A] text-[#71717A]"
                  }`}
                >
                  {step.done ? "✓" : ""}
                </div>
                <span
                  className={`text-[13px] ${
                    step.done ? "text-[#71717A] line-through" : "text-[#A1A1AA]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div custom={9} variants={fadeUp} initial="hidden" animate="visible">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold">Recent Activity</h2>
          <Link href="/dashboard/chat" className="text-[12px] text-[#7C3AED] hover:text-[#8B5CF6] transition-colors duration-200">
            View all →
          </Link>
        </div>
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
                <div
                  className="w-10 h-10 rounded-[16px] flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${chat.modelColor}15` }}
                >
                  💬
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#FAFAFA]">{chat.title}</p>
                  <p className="text-[12px] text-[#71717A]">{chat.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: chat.modelColor }}
                />
                <span className="text-[12px] text-[#A1A1AA]">{chat.model}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}