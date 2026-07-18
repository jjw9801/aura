import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA — The AI Operating System",
  description: "Build, research, and automate with AI. One platform to create documents, automate workflows, and work with GPT-4, Claude, and Gemini.",
  keywords: ["AI", "automation", "GPT-4", "Claude", "Gemini", "AI assistant", "AI writing", "workflow automation"],
  authors: [{ name: "AURA" }],
  openGraph: {
    title: "AURA — The AI Operating System",
    description: "Build, research, and automate with AI. One platform for GPT-4, Claude, and Gemini.",
    url: "https://aura-kappa-beryl.vercel.app",
    siteName: "AURA",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA — The AI Operating System",
    description: "Build, research, and automate with AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-[#09090B] text-[#FAFAFA] antialiased">
        {children}
      </body>
    </html>
  );
}