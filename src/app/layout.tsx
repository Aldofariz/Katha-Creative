import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { MenuBarNav } from "@/components/layout/menu-bar-nav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Katha Creative",
    template: "%s | Katha Creative",
  },
  description: "Brands with a story worth sharing.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <MotionConfig reducedMotion="user">
          <MenuBarNav />
          <div className="relative z-10 flex flex-1 flex-col">
            {children}
            <Footer />
          </div>
        </MotionConfig>
      </body>
    </html>
  );
}
