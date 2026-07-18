'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard" },
  { icon: "🤖", label: "Chat", href: "/dashboard/chat" },
  { icon: "🔍", label: "Research", href: "/dashboard/research" },
  { icon: "⚙️", label: "Workflow", href: "/dashboard/workflow" },
  { icon: "📁", label: "Files", href: "/dashboard/files" },
  { icon: "💳", label: "Billing", href: "/dashboard/billing" },
  { icon: "🔧", label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth");
        return;
      }

      setUserEmail(session.user.email || "User");
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
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
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#27272A]">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-[#FAFAFA]">AURA</span>
            <span className="text-[#7C3AED]">.</span>
          </Link>
        </div>

        {/* Menu */}
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

        {/* User */}
        <div className="p-4 border-t border-[#27272A]">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB]" />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[#FAFAFA] truncate">{userEmail}</p>
              <p className="text-[12px] text-[#71717A]">Free Plan</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-[14px] text-[#A1A1AA] hover:text-[#EF4444] rounded-[16px] hover:bg-[#EF4444]/10 transition-all duration-200"
          >
            🚪 Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 border-b border-[#27272A] flex items-center justify-between px-6 bg-[#09090B]/80 backdrop-blur-md sticky top-0 z-30">
          <button
            className="lg:hidden text-[#FAFAFA] text-xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="hidden md:flex items-center gap-2 bg-[#18181B] border border-[#27272A] rounded-[16px] px-4 py-2 w-[320px]">
            <span className="text-[#71717A] text-[14px]">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-[14px] text-[#FAFAFA] placeholder-[#71717A] outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors duration-200">
              🔔
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] cursor-pointer" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}