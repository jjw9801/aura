'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      desc: "For individuals getting started",
      features: ["5 AI requests / day", "1 workflow", "Community support"],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$19",
      desc: "For professionals and creators",
      features: ["Unlimited AI requests", "Unlimited workflows", "Research tools", "Priority support"],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Team",
      price: "$49",
      desc: "For teams and businesses",
      features: ["Everything in Pro", "Team collaboration", "Admin dashboard", "Custom AI models"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[14px] text-[#7C3AED] font-medium mb-3">PRICING</p>
          <h2 className="text-[28px] md:text-[48px] font-bold tracking-tight mb-4">
            Simple pricing
          </h2>
          <p className="text-[#A1A1AA] text-[18px]">
            Start free. Upgrade when you need more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.25 },
              }}
              className={`relative p-8 rounded-[24px] border cursor-pointer transition-shadow duration-300 ${
                plan.highlight
                  ? "border-[#7C3AED] bg-[#18181B] shadow-[0_10px_40px_rgba(124,58,237,.18)]"
                  : "border-[#27272A] bg-[#18181B]"
              } hover:shadow-[0_10px_40px_rgba(124,58,237,.18)]`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-[#FAFAFA] text-[12px] font-medium px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-[18px] font-semibold mb-1 text-[#FAFAFA]">{plan.name}</h3>
              <p className="text-[14px] text-[#A1A1AA] mb-6">{plan.desc}</p>

              <div className="mb-6">
                <span className="text-[48px] font-bold text-[#FAFAFA]">{plan.price}</span>
                {plan.price !== "$0" && <span className="text-[#71717A] text-[14px]"> / month</span>}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-[14px] text-[#A1A1AA]">
                    <span className="text-[#22C55E]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 rounded-[18px] text-[14px] font-medium transition-colors duration-200 ${
                    plan.highlight
                      ? "bg-[#7C3AED] hover:bg-[#8B5CF6] text-[#FAFAFA] shadow-[0_10px_40px_rgba(124,58,237,.18)]"
                      : "border border-[#27272A] hover:border-[#7C3AED] text-[#A1A1AA] hover:text-[#FAFAFA]"
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}