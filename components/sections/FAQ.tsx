'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What AI models does AURA support?",
    a: "AURA supports GPT-4, Claude, and Gemini. You can switch between models instantly and use the best one for each task. We regularly add new models as they become available.",
  },
  {
    q: "Is AURA free to use?",
    a: "Yes! AURA offers a free plan with 5 AI requests per day. For unlimited access, our Pro plan is $19/month. You can upgrade or downgrade at any time.",
  },
  {
    q: "How does the automation workflow work?",
    a: "You can create automated workflows that run on a schedule. For example, generate a blog post every morning at 8 AM, or summarize news articles daily. No coding required — just connect the steps visually.",
  },
  {
    q: "Can I use AURA for my business?",
    a: "Absolutely. Many businesses use AURA for content creation, product descriptions, customer support, translations, and more. Our Team plan includes collaboration features and custom AI models.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use industry-standard encryption and never share your data with third parties. Your conversations and files are private and only accessible by you.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel anytime with no questions asked. Your access continues until the end of your billing period. No hidden fees or cancellation charges.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[14px] text-[#7C3AED] font-medium mb-3">FAQ</p>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-tight mb-4">
            Frequently asked questions
          </h2>
          <p className="text-[#A1A1AA] text-[18px]">
            Everything you need to know about AURA.
          </p>
        </motion.div>

        {/* Questions */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-[24px] border border-[#27272A] bg-[#18181B] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-[16px] font-medium text-[#FAFAFA] pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#7C3AED] text-xl flex-shrink-0"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[14px] text-[#A1A1AA] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}