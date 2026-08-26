import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PrepMate — Placement Ready Platform",
  description: "Elite preparation platform for top tech company placements. Personalize your roadmap, practice tests, and doubts solver.",
};

import StoreInitializer from "@/components/StoreInitializer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="font-sans bg-background text-on-surface min-h-full flex flex-col overflow-x-hidden">
        <StoreInitializer />
        {children}
      </body>
    </html>
  );
}
