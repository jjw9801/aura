'use client';

import { useState } from "react";
import { motion } from "framer-motion";

type FileItem = {
  id: number;
  name: string;
  type: "document" | "image" | "pdf" | "spreadsheet";
  size: string;
  modified: string;
};

const fileIcons: Record<string, string> = {
  document: "📝",
  image: "🖼️",
  pdf: "📄",
  spreadsheet: "📊",
};

export default function FilesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [files] = useState<FileItem[]>([
    { id: 1, name: "Marketing Strategy Q1.docx", type: "document", size: "2.4 MB", modified: "2 hours ago" },
    { id: 2, name: "Product Roadmap.pdf", type: "pdf", size: "5.1 MB", modified: "5 hours ago" },
    { id: 3, name: "Revenue Report.xlsx", type: "spreadsheet", size: "1.8 MB", modified: "1 day ago" },
    { id: 4, name: "Brand Guidelines.pdf", type: "pdf", size: "12.3 MB", modified: "2 days ago" },
    { id: 5, name: "Blog Draft - AI Trends.docx", type: "document", size: "890 KB", modified: "3 days ago" },
    { id: 6, name: "Hero Banner.png", type: "image", size: "3.2 MB", modified: "4 days ago" },
    { id: 7, name: "User Research Data.xlsx", type: "spreadsheet", size: "4.5 MB", modified: "5 days ago" },
    { id: 8, name: "Pitch Deck.pdf", type: "pdf", size: "8.7 MB", modified: "1 week ago" },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-[28px] font-bold mb-1">Files</h1>
          <p className="text-[#A1A1AA] text-[18px]">Manage all your AI-generated documents.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex border border-[#27272A] rounded-[16px] overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1.5 text-[14px] transition-colors duration-200 ${
                view === "grid" ? "bg-[#7C3AED] text-[#FAFAFA]" : "text-[#A1A1AA] hover:text-[#FAFAFA]"
              }`}
            >
              ▦
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 text-[14px] transition-colors duration-200 ${
                view === "list" ? "bg-[#7C3AED] text-[#FAFAFA]" : "text-[#A1A1AA] hover:text-[#FAFAFA]"
              }`}
            >
              ☰
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] px-5 py-2.5 rounded-[18px] text-[14px] font-medium shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-colors duration-200"
          >
            + Upload
          </motion.button>
        </div>
      </motion.div>

      {/* Storage Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-[24px] border border-[#27272A] bg-[#18181B]"
      >
        <div className="flex justify-between text-[14px] mb-2">
          <span className="text-[#A1A1AA]">Storage used</span>
          <span className="text-[#FAFAFA]">38.9 MB / 1 GB</span>
        </div>
        <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] rounded-full" style={{ width: "3.89%" }} />
        </div>
      </motion.div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="p-5 rounded-[24px] border border-[#27272A] bg-[#18181B] hover:border-[#7C3AED]/50 hover:shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-all duration-300 cursor-pointer"
            >
              <span className="text-3xl">{fileIcons[file.type]}</span>
              <p className="text-[14px] font-medium text-[#FAFAFA] mt-3 mb-1 truncate">{file.name}</p>
              <p className="text-[12px] text-[#71717A]">{file.size} · {file.modified}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="rounded-[24px] border border-[#27272A] bg-[#18181B] overflow-hidden">
          {files.map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center justify-between px-6 py-4 hover:bg-[#27272A]/30 transition-colors duration-200 cursor-pointer ${
                i !== files.length - 1 ? "border-b border-[#27272A]" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl">{fileIcons[file.type]}</span>
                <p className="text-[14px] font-medium text-[#FAFAFA]">{file.name}</p>
              </div>
              <div className="flex items-center gap-6 text-[12px] text-[#71717A]">
                <span>{file.size}</span>
                <span>{file.modified}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}