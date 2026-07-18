'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-[#27272A] py-12"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-[#FAFAFA]">Product</h4>
            <ul className="space-y-2 text-[14px] text-[#A1A1AA]">
              <li><Link href="#features" className="hover:text-[#FAFAFA] transition-colors duration-200">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-[#FAFAFA] transition-colors duration-200">Pricing</Link></li>
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">Docs</Link></li>
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-[#FAFAFA]">Company</h4>
            <ul className="space-y-2 text-[14px] text-[#A1A1AA]">
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">About</Link></li>
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">Blog</Link></li>
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-[#FAFAFA]">Legal</h4>
            <ul className="space-y-2 text-[14px] text-[#A1A1AA]">
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">Privacy</Link></li>
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-[#FAFAFA]">Connect</h4>
            <ul className="space-y-2 text-[14px] text-[#A1A1AA]">
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">X (Twitter)</Link></li>
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">GitHub</Link></li>
              <li><Link href="#" className="hover:text-[#FAFAFA] transition-colors duration-200">Discord</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#27272A] pt-8 flex flex-col md:flex-row justify-between items-center text-[14px] text-[#71717A]">
          <p>© 2025 AURA. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with AI ✦</p>
        </div>
      </div>
    </motion.footer>
  );
}