'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navItems = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Products', href: '#products' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                    ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 h-20 shadow-2xl'
                    : 'bg-transparent border-b border-transparent h-24'
                    } flex items-center`}
            >
                <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
                    {/* LOGO */}
                    <Link
                        href="/"
                        className="relative z-50 hover:opacity-80 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Image
                            src="/logo-white.png"
                            alt="Kognitect Logo"
                            width={600}
                            height={200}
                            className="h-10 w-auto md:h-28 object-contain md:scale-125 origin-left"
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
                                className="text-base font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="#contact"
                            className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-transform hover:scale-105"
                        >
                            Get in Touch
                        </Link>
                    </nav>

                    {/* MOBİL MENÜ BUTONU (Sabit Boyutlu - Bulletproof) */}
                    <button
                        className="md:hidden relative z-[60] flex items-center justify-center w-12 h-12 text-white bg-white/10 rounded-xl border border-white/10 backdrop-blur-md active:bg-white/20 transition-all"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
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
                        className="fixed inset-0 z-40 bg-black/95 pt-32 px-6 md:hidden backdrop-blur-xl"
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