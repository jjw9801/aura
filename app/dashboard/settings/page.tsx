'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [language, setLanguage] = useState("en");
  const [saved, setSaved] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  // Load user data
  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setEmail(session.user.email || "");
        setName(session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "");
      }
    };
    loadUser();
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteAccount = async () => {
    if (deleteText !== "DELETE") return;
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[28px] font-bold mb-1">Settings</h1>
        <p className="text-[#A1A1AA] text-[14px]">Manage your account and preferences.</p>
      </motion.div>

      {/* Success Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-[#22C55E] text-[#FAFAFA] px-5 py-3 rounded-[18px] text-[14px] font-medium shadow-lg"
          >
            ✓ Settings saved successfully
          </motion.div>
        )}
      </AnimatePresence>

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
            {name ? name.charAt(0).toUpperCase() : "👤"}
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#FAFAFA]">{name || "User"}</p>
            <p className="text-[12px] text-[#71717A]">{email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[14px] text-[#A1A1AA] block mb-1.5">Display Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-[#09090B] border border-[#27272A] rounded-[16px] px-4 py-2.5 text-[14px] text-[#FAFAFA] placeholder-[#71717A] outline-none focus:border-[#7C3AED] transition-colors duration-200"
            />
          </div>
          <div>
            <label className="text-[14px] text-[#A1A1AA] block mb-1.5">Email</label>
            <input
              value={email}
              disabled
              className="w-full bg-[#09090B] border border-[#27272A] rounded-[16px] px-4 py-2.5 text-[14px] text-[#71717A] outline-none cursor-not-allowed"
            />
            <p className="text-[11px] text-[#71717A] mt-1">Email cannot be changed</p>
          </div>
        </div>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B] space-y-6"
      >
        <h2 className="text-[18px] font-semibold text-[#FAFAFA]">Appearance</h2>

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#FAFAFA]">Dark Mode</p>
            <p className="text-[12px] text-[#71717A]">Use dark theme across the app</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-7 rounded-full transition-colors duration-300 relative flex-shrink-0 ${
              darkMode ? "bg-[#7C3AED]" : "bg-[#27272A]"
            }`}
          >
            <motion.div
              animate={{ x: darkMode ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-[22px] h-[22px] rounded-full bg-white absolute top-[3px] shadow-sm"
            />
          </button>
        </div>

        {/* Language */}
        <div>
          <label className="text-[14px] text-[#A1A1AA] block mb-1.5">Language</label>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-[#09090B] border border-[#27272A] rounded-[16px] px-4 py-2.5 text-[14px] text-[#FAFAFA] outline-none focus:border-[#7C3AED] transition-colors duration-200 appearance-none cursor-pointer pr-10"
            >
              <option value="en">🇺🇸 English</option>
              <option value="ko">🇰🇷 한국어</option>
              <option value="ja">🇯🇵 日本語</option>
              <option value="zh">🇨🇳 中文</option>
              <option value="es">🇪🇸 Español</option>
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none">▾</span>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B] space-y-6"
      >
        <h2 className="text-[18px] font-semibold text-[#FAFAFA]">Notifications</h2>

        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#FAFAFA]">Email Notifications</p>
            <p className="text-[12px] text-[#71717A]">Receive updates about your account</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-7 rounded-full transition-colors duration-300 relative flex-shrink-0 ${
              notifications ? "bg-[#7C3AED]" : "bg-[#27272A]"
            }`}
          >
            <motion.div
              animate={{ x: notifications ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-[22px] h-[22px] rounded-full bg-white absolute top-[3px] shadow-sm"
            />
          </button>
        </div>

        {/* Weekly Report */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#FAFAFA]">Weekly Report</p>
            <p className="text-[12px] text-[#71717A]">Get a summary of your AI usage every Monday</p>
          </div>
          <button
            onClick={() => setWeeklyReport(!weeklyReport)}
            className={`w-12 h-7 rounded-full transition-colors duration-300 relative flex-shrink-0 ${
              weeklyReport ? "bg-[#7C3AED]" : "bg-[#27272A]"
            }`}
          >
            <motion.div
              animate={{ x: weeklyReport ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-[22px] h-[22px] rounded-full bg-white absolute top-[3px] shadow-sm"
            />
          </button>
        </div>

        {/* Marketing */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#FAFAFA]">Product Updates</p>
            <p className="text-[12px] text-[#71717A]">News about new features and improvements</p>
          </div>
          <button
            onClick={() => {}}
            className="w-12 h-7 rounded-full transition-colors duration-300 relative flex-shrink-0 bg-[#7C3AED]"
          >
            <motion.div
              animate={{ x: 22 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-[22px] h-[22px] rounded-full bg-white absolute top-[3px] shadow-sm"
            />
          </button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-[24px] border border-[#EF4444]/20 bg-[#18181B]"
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
            onClick={() => setShowDelete(true)}
            className="text-[14px] border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444] hover:text-[#FAFAFA] px-5 py-2 rounded-[18px] transition-all duration-200"
          >
            Delete
          </motion.button>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            onClick={() => setShowDelete(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-[24px] border border-[#27272A] bg-[#18181B]"
            >
              <h3 className="text-[18px] font-semibold text-[#EF4444] mb-2">Delete Account</h3>
              <p className="text-[14px] text-[#A1A1AA] mb-6">
                This action is permanent and cannot be undone. All your data, chats, files, and workflows will be deleted.
              </p>

              <p className="text-[14px] text-[#FAFAFA] mb-2">
                Type <span className="font-bold text-[#EF4444]">DELETE</span> to confirm:
              </p>
              <input
                value={deleteText}
                onChange={(e) => setDeleteText(e.target.value)}
                placeholder="DELETE"
                className="w-full bg-[#09090B] border border-[#27272A] rounded-[16px] px-4 py-2.5 text-[14px] text-[#FAFAFA] placeholder-[#71717A] outline-none focus:border-[#EF4444] transition-colors duration-200 mb-4"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowDelete(false); setDeleteText(""); }}
                  className="flex-1 py-2.5 rounded-[18px] border border-[#27272A] text-[14px] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: deleteText === "DELETE" ? 1.02 : 1 }}
                  whileTap={{ scale: deleteText === "DELETE" ? 0.98 : 1 }}
                  onClick={handleDeleteAccount}
                  disabled={deleteText !== "DELETE"}
                  className={`flex-1 py-2.5 rounded-[18px] text-[14px] font-medium transition-all duration-200 ${
                    deleteText === "DELETE"
                      ? "bg-[#EF4444] text-[#FAFAFA] hover:bg-[#DC2626]"
                      : "bg-[#27272A] text-[#71717A] cursor-not-allowed"
                  }`}
                >
                  Delete Account
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-end pb-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] px-8 py-2.5 rounded-[18px] text-[14px] font-medium shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-colors duration-200"
        >
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
}