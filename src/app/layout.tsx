import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faktakoll - Nyheter & Rykten",
  description: "Vi granskar och faktakollar nyheter och rykten med hjälp av AI och mänsklig kontroll.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}