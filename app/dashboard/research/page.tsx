'use client';

import { useState } from "react";
import { motion } from "framer-motion";

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ title: string; summary: string; source: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      setResults([
        {
          title: "The Future of AI in 2025",
          summary: "AI is rapidly transforming industries from healthcare to finance. Key trends include multimodal models, AI agents, and edge computing integration.",
          source: "MIT Technology Review",
        },
        {
          title: "How Automation Changes Work",
          summary: "Studies show that AI-powered automation can reduce repetitive tasks by up to 70%, freeing workers to focus on creative and strategic activities.",
          source: "Harvard Business Review",
        },
        {
          title: "Building AI-First Products",
          summary: "Successful AI products start with clear user problems, not technology. The best teams iterate rapidly and use AI as a core feature, not an add-on.",
          source: "Y Combinator Blog",
        },
      ]);
      setIsSearching(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[28px] font-bold mb-1">AI Research</h1>
        <p className="text-[#A1A1AA] text-[18px]">Analyze trends, summarize papers, and extract insights.</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="border border-[#27272A] bg-[#18181B] rounded-[24px] p-3 flex items-center gap-3"
      >
        <span className="text-[#71717A] text-lg pl-2">🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a topic to research... (e.g. AI trends 2025)"
          className="flex-1 bg-transparent text-[14px] text-[#FAFAFA] placeholder-[#71717A] outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          disabled={!query.trim()}
          className={`px-5 py-2 rounded-[18px] text-[14px] font-medium transition-all duration-200 ${
            query.trim()
              ? "bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] shadow-[0_10px_40px_rgba(124,58,237,.18)]"
              : "bg-[#27272A] text-[#71717A] cursor-not-allowed"
          }`}
        >
          Research
        </motion.button>
      </motion.div>

      {/* Quick Topics */}
      <div className="flex flex-wrap gap-2">
        {["AI Trends 2025", "SaaS Growth Strategy", "No-Code Automation", "Content Marketing"].map((topic) => (
          <button
            key={topic}
            onClick={() => { setQuery(topic); }}
            className="text-[12px] border border-[#27272A] text-[#A1A1AA] hover:border-[#7C3AED] hover:text-[#FAFAFA] px-4 py-1.5 rounded-full transition-all duration-200"
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-12"
        >
          <div className="flex items-center gap-3 text-[#A1A1AA] text-[14px]">
            <svg className="animate-spin h-5 w-5 text-[#7C3AED]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
            </svg>
            Researching with AI...
          </div>
        </motion.div>
      )}

      {/* Results */}
      {results.length > 0 && !isSearching && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-[18px] font-semibold">Results</h2>
          {results.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-[24px] border border-[#27272A] bg-[#18181B] hover:border-[#7C3AED]/50 hover:shadow-[0_10px_40px_rgba(124,58,237,.18)] transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="text-[18px] font-semibold text-[#FAFAFA] mb-2">{result.title}</h3>
              <p className="text-[14px] text-[#A1A1AA] leading-relaxed mb-3">{result.summary}</p>
              <span className="text-[12px] text-[#7C3AED]">{result.source}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {results.length === 0 && !isSearching && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-[#71717A] text-[18px]">Enter a topic to start researching</p>
          <p className="text-[#71717A] text-[14px] mt-1">AI will analyze and summarize the latest information</p>
        </div>
      )}
    </div>
  );
}