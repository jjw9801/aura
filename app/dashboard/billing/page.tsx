'use client';

import { motion } from "framer-motion";

export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[28px] font-bold mb-1">Billing</h1>
        <p className="text-[#A1A1AA] text-[18px]">Manage your plan and payment methods.</p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B]"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[14px] text-[#71717A] mb-1">Current Plan</p>
            <h2 className="text-[28px] font-bold text-[#FAFAFA]">Free</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] px-6 py-2.5 rounded-[18px] text-[14px] font-medium shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-colors duration-200"
          >
            Upgrade to Pro
          </motion.button>
        </div>

        {/* Usage */}
        <div className="space-y-4">
          {[
            { label: "AI Requests", used: 3, total: 5, unit: "/ day" },
            { label: "Workflows", used: 1, total: 1, unit: "" },
            { label: "Storage", used: 38.9, total: 1000, unit: "MB" },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-[14px] mb-1.5">
                <span className="text-[#A1A1AA]">{item.label}</span>
                <span className="text-[#FAFAFA]">
                  {item.used} / {item.total} {item.unit}
                </span>
              </div>
              <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.used / item.total > 0.8
                      ? "bg-[#EF4444]"
                      : "bg-gradient-to-r from-[#7C3AED] to-[#2563EB]"
                  }`}
                  style={{ width: `${(item.used / item.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Plans Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-[18px] font-semibold mb-4">Compare Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Free", price: "$0", features: ["5 requests/day", "1 workflow", "1 GB storage"], current: true },
            { name: "Pro", price: "$19/mo", features: ["Unlimited requests", "Unlimited workflows", "50 GB storage", "Priority support"], current: false },
            { name: "Team", price: "$49/mo", features: ["Everything in Pro", "Team collaboration", "Admin dashboard", "Custom AI models"], current: false },
          ].map((plan, i) => (
            <div
              key={i}
              className={`p-6 rounded-[24px] border ${
                plan.current ? "border-[#7C3AED]" : "border-[#27272A]"
              } bg-[#18181B]`}
            >
              <h3 className="text-[18px] font-semibold text-[#FAFAFA] mb-1">{plan.name}</h3>
              <p className="text-[28px] font-bold text-[#FAFAFA] mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-[14px] text-[#A1A1AA]">
                    <span className="text-[#22C55E]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-2.5 rounded-[18px] text-[14px] font-medium transition-colors duration-200 ${
                  plan.current
                    ? "border border-[#7C3AED] text-[#7C3AED] cursor-default"
                    : "bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] shadow-[0_10px_40px_rgba(124,58,237,.18)]"
                }`}
              >
                {plan.current ? "Current Plan" : "Upgrade"}
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}