import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClientBody from "../components/ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kognitect | Algı Mimarisi",
  description: "Nörobilim ve Yapay Zeka temelinde rasyonel dijital ekosistemler inşa ediyoruz. İnsan doğası ile teknolojiyi buluşturuyoruz.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#101214] text-white antialiased`}>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="6Fjd7mqHolgxM8wRUro3aA"
          strategy="afterInteractive"
        />
        <ClientBody>
          <Navbar />
          {children}
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}