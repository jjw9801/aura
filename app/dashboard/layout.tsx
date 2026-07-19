'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { clearLocalSession, getLocalSession } from "@/lib/auth";
import { SettingsProvider, useSettings } from "@/components/providers/SettingsProvider";

type Notification = {
  id: number;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  icon: string;
};

function DashboardInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { settings, email, loading, t } = useSettings();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "Welcome to AURA! 🎉", desc: "Your account has been created successfully.", time: "Just now", read: false, icon: "🎉" },
    { id: 2, title: "Try the AI Chat", desc: "Start a conversation with GPT-4, Claude, or Gemini.", time: "5 min ago", read: false, icon: "🤖" },
    { id: 3, title: "Complete your profile", desc: "Add your display name in Settings.", time: "10 min ago", read: true, icon: "👤" },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const menuItems = [
    { icon: "📊", label: t("dashboard"), href: "/dashboard" },
    { icon: "🤖", label: t("chat"), href: "/dashboard/chat" },
    { icon: "🔍", label: t("research"), href: "/dashboard/research" },
    { icon: "⚙️", label: t("workflow"), href: "/dashboard/workflow" },
    { icon: "📁", label: t("files"), href: "/dashboard/files" },
    { icon: "💳", label: t("billing"), href: "/dashboard/billing" },
    { icon: "🔧", label: t("settings"), href: "/dashboard/settings" },
  ];

  // Auth check
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const localSession = getLocalSession();

      if (!session && !localSession) {
        router.push("/auth");
        return;
      }

      setAuthChecked(true);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push("/auth");
    });
    return () => subscription.unsubscribe();
  }, [router]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearLocalSession();
    router.push("/");
  };

  if (loading || !authChecked) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-5 w-5 text-[#7C3AED]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
          </svg>
          <span className="text-[#A1A1AA] text-[14px]">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-full w-[260px] bg-[#111113] border-r border-[#27272A] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-[#27272A]">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-[#FAFAFA]">AURA</span>
            <span className="text-[#7C3AED]">.</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-[16px] text-[14px] transition-all duration-200 ${
                  isActive
                    ? "bg-[#7C3AED]/10 text-[#7C3AED] font-medium"
                    : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#27272A]">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-[12px] font-bold text-white">
              {settings.display_name ? settings.display_name.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[#FAFAFA] truncate">
                {settings.display_name || email}
              </p>
              <p className="text-[12px] text-[#71717A]">{t("freePlan")}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-[14px] text-[#A1A1AA] hover:text-[#EF4444] rounded-[16px] hover:bg-[#EF4444]/10 transition-all duration-200"
          >
            🚪 {t("logout")}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 border-b border-[#27272A] flex items-center justify-between px-6 bg-[#09090B]/80 backdrop-blur-md sticky top-0 z-30">
          <button className="lg:hidden text-[#FAFAFA] text-xl" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>

          <div className="hidden md:flex items-center gap-2 bg-[#18181B] border border-[#27272A] rounded-[16px] px-4 py-2 w-[320px]">
            <span className="text-[#71717A] text-[14px]">🔍</span>
            <input
              type="text"
              placeholder={t("search")}
              className="bg-transparent text-[14px] text-[#FAFAFA] placeholder-[#71717A] outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200 text-lg"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EF4444] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-10 w-[360px] rounded-[24px] border border-[#27272A] bg-[#18181B] shadow-2xl overflow-hidden z-50"
                  >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272A]">
                      <h3 className="text-[14px] font-semibold text-[#FAFAFA]">{t("notifications")}</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[12px] text-[#7C3AED] hover:text-[#8B5CF6] transition-colors duration-200"
                        >
                          {t("markAllRead")}
                        </button>
                      )}
                    </div>

                    <div className="max-h-[320px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-center text-[13px] text-[#71717A] py-8">{t("noNotifications")}</p>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => markRead(n.id)}
                            className={`w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-[#27272A]/30 transition-colors duration-200 border-b border-[#27272A]/50 last:border-0 ${
                              !n.read ? "bg-[#7C3AED]/5" : ""
                            }`}
                          >
                            <span className="text-xl mt-0.5">{n.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-[13px] ${!n.read ? "font-semibold text-[#FAFAFA]" : "text-[#A1A1AA]"}`}>
                                {n.title}
                              </p>
                              <p className="text-[12px] text-[#71717A] mt-0.5">{n.desc}</p>
                              <p className="text-[11px] text-[#71717A] mt-1">{n.time}</p>
                            </div>
                            {!n.read && (
                              <span className="w-2 h-2 rounded-full bg-[#7C3AED] mt-1.5 flex-shrink-0" />
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar */}
            <Link href="/dashboard/settings">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] cursor-pointer flex items-center justify-center text-[12px] font-bold text-white">
                {settings.display_name ? settings.display_name.charAt(0).toUpperCase() : "?"}
              </div>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <DashboardInner>{children}</DashboardInner>
    </SettingsProvider>
  );
}