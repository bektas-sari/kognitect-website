// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- İŞTE BU SATIR YOKSA TASARIM ÇALIŞMAZ!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KOGNITECT",
  description: "Perception is Engineered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}