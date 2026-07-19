import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aura-kappa-beryl.vercel.app"),
  title: "AURA — The AI Operating System",
  description: "Build. Research. Automate. One platform to create documents, automate workflows, and work with AI.",
  keywords: ["AI", "automation", "workspace", "chatbot", "productivity"],
  openGraph: {
    title: "AURA — The AI Operating System",
    description: "Build. Research. Automate. One platform to create documents, automate workflows, and work with AI.",
    url: "https://aura-kappa-beryl.vercel.app",
    siteName: "AURA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA — The AI Operating System",
    description: "Build. Research. Automate. One platform to create documents, automate workflows, and work with AI.",
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