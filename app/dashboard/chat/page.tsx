'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
  model?: string;
};

const models = [
  { name: "GPT-4", icon: "⚡", color: "#22C55E" },
  { name: "Claude", icon: "🟣", color: "#7C3AED" },
  { name: "Gemini", icon: "💎", color: "#2563EB" },
];

const suggestions = [
  "Write a blog post about AI trends",
  "Summarize this document for me",
  "Create a marketing strategy",
  "Translate to Korean",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("GPT-4");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          model: selectedModel,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error}`, model: selectedModel },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content, model: selectedModel },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Failed to connect to AI. Please try again.", model: selectedModel },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch {
      // ignore clipboard errors
    }
  };

  const currentModel = models.find((m) => m.name === selectedModel)!;

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] max-w-4xl mx-auto">
      {/* Model Selector */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 mb-4"
      >
        {models.map((model) => (
          <button
            key={model.name}
            onClick={() => setSelectedModel(model.name)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 ${
              selectedModel === model.name
                ? "bg-[#7C3AED] text-[#FAFAFA] shadow-[0_10px_40px_rgba(124,58,237,.18)]"
                : "border border-[#27272A] text-[#A1A1AA] hover:border-[#7C3AED] hover:text-[#FAFAFA]"
            }`}
          >
            <span>{model.icon}</span>
            {model.name}
          </button>
        ))}
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto pr-2">
        {/* Empty State */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center text-3xl mb-6">
              🤖
            </div>
            <h2 className="text-[28px] font-bold mb-2 text-[#FAFAFA]">AURA AI</h2>
            <p className="text-[#71717A] text-[14px] mb-8 max-w-md">
              Your AI assistant powered by {selectedModel}. Ask anything — write content, analyze data, translate, or automate tasks.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-lg w-full">
              {suggestions.map((s, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                  onClick={() => handleSend(s)}
                  className="text-left p-4 rounded-[20px] border border-[#27272A] bg-[#18181B] hover:border-[#7C3AED]/50 hover:shadow-[0_10px_40px_rgba(124,58,237,.1)] transition-all duration-300 text-[13px] text-[#A1A1AA] hover:text-[#FAFAFA]"
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages */}
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-6 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[12px] mt-1 ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#7C3AED] to-[#2563EB]"
                      : "bg-[#18181B] border border-[#27272A]"
                  }`}
                >
                  {msg.role === "user" ? "👤" : currentModel.icon}
                </div>

                <div>
                  {msg.role === "assistant" && (
                    <p className="text-[11px] text-[#71717A] mb-1 ml-1">{msg.model || selectedModel}</p>
                  )}
                  <div
                    className={`p-4 rounded-[20px] text-[14px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-[#7C3AED] text-[#FAFAFA]"
                        : "bg-[#18181B] border border-[#27272A] text-[#FAFAFA]"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "assistant" && (
                    <div className="flex gap-2 mt-2 ml-1">
                      <button
                        onClick={() => handleCopy(msg.content)}
                        className="text-[11px] text-[#71717A] hover:text-[#A1A1AA] transition-colors duration-200"
                      >
                        📋 Copy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3 mb-6"
          >
            <div className="w-8 h-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[12px] mt-1">
              {currentModel.icon}
            </div>
            <div>
              <p className="text-[11px] text-[#71717A] mb-1 ml-1">{selectedModel}</p>
              <div className="bg-[#18181B] border border-[#27272A] px-4 py-3 rounded-[20px]">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4">
        <div className="rounded-[24px] border border-[#27272A] bg-[#18181B] p-2 focus-within:border-[#7C3AED]/50 transition-colors duration-200">
          <div className="flex items-end gap-2 px-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${selectedModel}...`}
              rows={1}
              className="flex-1 bg-transparent text-[14px] text-[#FAFAFA] placeholder-[#71717A] outline-none resize-none py-2.5 min-h-[24px] max-h-[120px]"
            />
          </div>

          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-1">
              {[
                { icon: "📎", label: "Attach" },
                { icon: "🖼️", label: "Image" },
                { icon: "🎤", label: "Voice" },
              ].map((tool) => (
                <button
                  key={tool.label}
                  title={tool.label}
                  className="w-8 h-8 flex items-center justify-center rounded-[12px] text-[14px] text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-all duration-200"
                >
                  {tool.icon}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className={`flex items-center gap-2 px-5 py-2 rounded-[18px] text-[13px] font-medium transition-all duration-200 ${
                input.trim() && !isTyping
                  ? "bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] shadow-[0_10px_40px_rgba(124,58,237,.18)]"
                  : "bg-[#27272A] text-[#71717A] cursor-not-allowed"
              }`}
            >
              Send
              <span className="text-[10px] opacity-60">↵</span>
            </motion.button>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#71717A] mt-2">
          AURA AI may make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}