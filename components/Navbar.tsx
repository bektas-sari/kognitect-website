"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navItems = [
  { name: "Philosophy", href: "#philosophy" },
  { name: "Technologies", href: "#technologies" },
  { name: "Products", href: "#products" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 hover:opacity-80 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/logo-white.png"
              alt="Kognitect Logo"
              width={800} // Çözünürlük kalitesi için artırdık
              height={800}
              // DEĞİŞİKLİK BURADA:
              // h-24 yerine -> h-32 (veya daha büyük istersen h-40 yap)
              // scale-125 yerine -> scale-150 (görseli %150 büyütür)
              className="h-32 w-auto object-contain scale-150"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                // DEĞİŞİKLİK: text-sm yerine -> text-base (daha okunaklı) veya text-lg
                className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              // DEĞİŞİKLİK: Buton içindeki yazı da text-base yapıldı
              className="px-6 py-3 rounded-full bg-white text-black text-base font-semibold hover:bg-gray-200 transition-colors"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-3xl font-bold text-gray-300 hover:text-white transition-colors py-4 border-b border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-4 flex items-center justify-between text-2xl font-bold text-blue-400 py-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
