'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useSettings } from "@/components/providers/SettingsProvider";
import { Language } from "@/lib/i18n";

export default function SettingsPage() {
  const { settings, email, updateSetting, saveSettings, t } = useSettings();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const handleSave = async () => {
    setSaving(true);
    const ok = await saveSettings();
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteText !== "DELETE") return;
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-[28px] font-bold mb-1">{t("settings")}</h1>
        <p className="text-[#A1A1AA] text-[14px]">{t("manageAccount")}</p>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-[#22C55E] text-white px-5 py-3 rounded-[18px] text-[14px] font-medium shadow-lg"
          >
            ✓ {t("settingsSaved")}
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
        <h2 className="text-[18px] font-semibold text-[#FAFAFA]">{t("profile")}</h2>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-2xl font-bold text-white">
            {settings.display_name ? settings.display_name.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#FAFAFA]">{settings.display_name || "User"}</p>
            <p className="text-[12px] text-[#71717A]">{email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[14px] text-[#A1A1AA] block mb-1.5">{t("displayName")}</label>
            <input
              value={settings.display_name}
              onChange={(e) => updateSetting("display_name", e.target.value)}
              className="w-full bg-[#09090B] border border-[#27272A] rounded-[16px] px-4 py-2.5 text-[14px] text-[#FAFAFA] placeholder-[#71717A] outline-none focus:border-[#7C3AED] transition-colors duration-200"
            />
          </div>
          <div>
            <label className="text-[14px] text-[#A1A1AA] block mb-1.5">{t("email")}</label>
            <input
              value={email}
              disabled
              className="w-full bg-[#09090B] border border-[#27272A] rounded-[16px] px-4 py-2.5 text-[14px] text-[#71717A] outline-none cursor-not-allowed"
            />
            <p className="text-[11px] text-[#71717A] mt-1">{t("emailCannotChange")}</p>
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
        <h2 className="text-[18px] font-semibold text-[#FAFAFA]">{t("appearance")}</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#FAFAFA]">{t("darkMode")}</p>
            <p className="text-[12px] text-[#71717A]">{t("darkModeDesc")}</p>
          </div>
          <button
            onClick={() => updateSetting("dark_mode", !settings.dark_mode)}
            className={`w-12 h-7 rounded-full transition-colors duration-300 relative flex-shrink-0 ${
              settings.dark_mode ? "bg-[#7C3AED]" : "bg-[#27272A]"
            }`}
          >
            <motion.div
              animate={{ x: settings.dark_mode ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-[22px] h-[22px] rounded-full bg-white absolute top-[3px] shadow-sm"
            />
          </button>
        </div>

        <div>
          <label className="text-[14px] text-[#A1A1AA] block mb-1.5">{t("language")}</label>
          <div className="relative">
            <select
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value as Language)}
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
        <h2 className="text-[18px] font-semibold text-[#FAFAFA]">{t("notifications")}</h2>

        {[
          { key: "notifications_email" as const, label: t("emailNotifications"), desc: t("emailNotificationsDesc") },
          { key: "notifications_weekly" as const, label: t("weeklyReport"), desc: t("weeklyReportDesc") },
          { key: "notifications_updates" as const, label: t("productUpdates"), desc: t("productUpdatesDesc") },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-[#FAFAFA]">{item.label}</p>
              <p className="text-[12px] text-[#71717A]">{item.desc}</p>
            </div>
            <button
              onClick={() => updateSetting(item.key, !settings[item.key])}
              className={`w-12 h-7 rounded-full transition-colors duration-300 relative flex-shrink-0 ${
                settings[item.key] ? "bg-[#7C3AED]" : "bg-[#27272A]"
              }`}
            >
              <motion.div
                animate={{ x: settings[item.key] ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-[22px] h-[22px] rounded-full bg-white absolute top-[3px] shadow-sm"
              />
            </button>
          </div>
        ))}
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-[24px] border border-[#EF4444]/20 bg-[#18181B]"
      >
        <h2 className="text-[18px] font-semibold text-[#EF4444] mb-4">{t("dangerZone")}</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] text-[#FAFAFA]">{t("deleteAccount")}</p>
            <p className="text-[12px] text-[#71717A]">{t("deleteAccountDesc")}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDelete(true)}
            className="text-[14px] border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444] hover:text-white px-5 py-2 rounded-[18px] transition-all duration-200"
          >
            {t("delete")}
          </motion.button>
        </div>
      </motion.div>

      {/* Delete Modal */}
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
              <h3 className="text-[18px] font-semibold text-[#EF4444] mb-2">{t("deleteAccount")}</h3>
              <p className="text-[14px] text-[#A1A1AA] mb-6">{t("deleteAccountDesc")}</p>
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
                  onClick={handleDeleteAccount}
                  disabled={deleteText !== "DELETE"}
                  className={`flex-1 py-2.5 rounded-[18px] text-[14px] font-medium transition-all duration-200 ${
                    deleteText === "DELETE"
                      ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                      : "bg-[#27272A] text-[#71717A] cursor-not-allowed"
                  }`}
                >
                  {t("delete")}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex justify-end pb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={saving}
          className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-white px-8 py-2.5 rounded-[18px] text-[14px] font-medium shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-colors duration-200 disabled:opacity-50"
        >
          {saving ? t("saving") : t("saveChanges")}
        </motion.button>
      </motion.div>
    </div>
  );
}