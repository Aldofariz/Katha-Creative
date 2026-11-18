import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { BackgroundBlobs } from "@/components/layout/background-blobs";
import { Footer } from "@/components/layout/footer";
import { MenuBarNav } from "@/components/layout/menu-bar-nav";
import { EmojiBackdrop } from "@/components/effects/emoji-backdrop";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html
      lang="en"
      className={`${bricolage.variable} ${dmSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <MotionConfig reducedMotion="user">
          <BackgroundBlobs />
          <EmojiBackdrop />
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
