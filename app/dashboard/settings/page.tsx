'use client';

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[28px] font-bold mb-1">Settings</h1>
        <p className="text-[#A1A1AA] text-[18px]">Manage your account and preferences.</p>
      </motion.div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B] space-y-5"
      >
        <h2 className="text-[18px] font-semibold text-[#FAFAFA]">Profile</h2>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-2xl">
            👤
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[14px] border border-[#27272A] hover:border-[#7C3AED] text-[#A1A1AA] hover:text-[#FAFAFA] px-4 py-2 rounded-[18px] transition-colors duration-200"
          >
            Change Avatar
          </motion.button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[14px] text-[#A1A1AA] block mb-1.5">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#09090B] border border-[#27272A] rounded-[16px] px-4 py-2.5 text-[14px] text-[#FAFAFA] outline-none focus:border-[#7C3AED] transition-colors duration-200"
            />
          </div>
          <div>
            <label className="text-[14px] text-[#A1A1AA] block mb-1.5">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#09090B] border border-[#27272A] rounded-[16px] px-4 py-2.5 text-[14px] text-[#FAFAFA] outline-none focus:border-[#7C3AED] transition-colors duration-200"
            />
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B] space-y-5"
      >
        <h2 className="text-[18px] font-semibold text-[#FAFAFA]">Preferences</h2>

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#FAFAFA]">Dark Mode</p>
            <p className="text-[12px] text-[#71717A]">Use dark theme across the app</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${
              darkMode ? "bg-[#7C3AED]" : "bg-[#27272A]"
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform duration-200 ${
              darkMode ? "translate-x-[22px]" : "translate-x-0.5"
            }`} />
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#FAFAFA]">Notifications</p>
            <p className="text-[12px] text-[#71717A]">Receive email notifications</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${
              notifications ? "bg-[#7C3AED]" : "bg-[#27272A]"
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform duration-200 ${
              notifications ? "translate-x-[22px]" : "translate-x-0.5"
            }`} />
          </button>
        </div>

        {/* Language */}
        <div>
          <label className="text-[14px] text-[#A1A1AA] block mb-1.5">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-[#09090B] border border-[#27272A] rounded-[16px] px-4 py-2.5 text-[14px] text-[#FAFAFA] outline-none focus:border-[#7C3AED] transition-colors duration-200 appearance-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="ko">한국어</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-[24px] border border-[#EF4444]/30 bg-[#18181B]"
      >
        <h2 className="text-[18px] font-semibold text-[#EF4444] mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#FAFAFA]">Delete Account</p>
            <p className="text-[12px] text-[#71717A]">Permanently delete your account and all data</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[14px] border border-[#EF4444]/50 text-[#EF4444] hover:bg-[#EF4444] hover:text-[#FAFAFA] px-5 py-2 rounded-[18px] transition-all duration-200"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>

      {/* Save */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] px-8 py-2.5 rounded-[18px] text-[14px] font-medium shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-colors duration-200"
        >
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
}