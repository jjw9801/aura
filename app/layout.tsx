import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA — The AI Operating System",
  description: "Build. Research. Automate.",
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