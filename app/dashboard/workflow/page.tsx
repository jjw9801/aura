'use client';

import { useState } from "react";
import { motion } from "framer-motion";

type Workflow = {
  id: number;
  name: string;
  description: string;
  status: "active" | "paused" | "draft";
  runs: number;
  lastRun: string;
};

export default function WorkflowPage() {
  const [workflows] = useState<Workflow[]>([
    { id: 1, name: "Daily News Summary", description: "Fetch top news → AI summarize → Save to Google Docs", status: "active", runs: 142, lastRun: "2 hours ago" },
    { id: 2, name: "Blog Auto-Publisher", description: "Generate blog post → SEO optimize → Publish to WordPress", status: "active", runs: 87, lastRun: "5 hours ago" },
    { id: 3, name: "Social Media Scheduler", description: "Create content → Schedule → Post to X, LinkedIn, Threads", status: "paused", runs: 56, lastRun: "1 day ago" },
    { id: 4, name: "Email Responder", description: "Read incoming emails → AI draft reply → Send for approval", status: "draft", runs: 0, lastRun: "Never" },
  ]);

  const statusColor: Record<string, { bg: string; text: string; dot: string }> = {
    active: { bg: "bg-[#22C55E]/10", text: "text-[#22C55E]", dot: "bg-[#22C55E]" },
    paused: { bg: "bg-[#F59E0B]/10", text: "text-[#F59E0B]", dot: "bg-[#F59E0B]" },
    draft: { bg: "bg-[#71717A]/10", text: "text-[#71717A]", dot: "bg-[#71717A]" },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-[28px] font-bold mb-1">Workflows</h1>
          <p className="text-[#A1A1AA] text-[18px]">Automate your tasks with AI-powered workflows.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] px-5 py-2.5 rounded-[18px] text-[14px] font-medium shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-colors duration-200"
        >
          + New Workflow
        </motion.button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active", value: workflows.filter(w => w.status === "active").length, color: "#22C55E" },
          { label: "Total Runs", value: workflows.reduce((sum, w) => sum + w.runs, 0), color: "#7C3AED" },
          { label: "Time Saved", value: "18h", color: "#2563EB" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-[24px] border border-[#27272A] bg-[#18181B]"
          >
            <p className="text-[14px] text-[#71717A] mb-1">{stat.label}</p>
            <p className="text-[28px] font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Workflow List */}
      <div className="space-y-4">
        {workflows.map((wf, i) => (
          <motion.div
            key={wf.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            whileHover={{ y: -4 }}
            className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B] hover:border-[#7C3AED]/50 hover:shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-[18px] font-semibold text-[#FAFAFA]">{wf.name}</h3>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[12px] ${statusColor[wf.status].bg} ${statusColor[wf.status].text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusColor[wf.status].dot}`} />
                    {wf.status.charAt(0).toUpperCase() + wf.status.slice(1)}
                  </span>
                </div>
                <p className="text-[14px] text-[#A1A1AA] mb-3">{wf.description}</p>
                <div className="flex items-center gap-6 text-[12px] text-[#71717A]">
                  <span>🔄 {wf.runs} runs</span>
                  <span>🕐 Last: {wf.lastRun}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[12px] border border-[#27272A] hover:border-[#7C3AED] text-[#A1A1AA] hover:text-[#FAFAFA] px-4 py-1.5 rounded-[18px] transition-colors duration-200"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[12px] border border-[#27272A] hover:border-[#22C55E] text-[#A1A1AA] hover:text-[#22C55E] px-4 py-1.5 rounded-[18px] transition-colors duration-200"
                >
                  {wf.status === "active" ? "Pause" : "Run"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}