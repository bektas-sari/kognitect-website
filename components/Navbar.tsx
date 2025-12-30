'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Terminal } from 'lucide-react';

const navItems = [
    { name: 'The Science', href: '#philosophy' },  // Philosophy -> The Science
    { name: 'Arsenal', href: '#technologies' },    // Technologies -> Arsenal
    { name: 'Blueprints', href: '#products' },     // Products -> Blueprints
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
                    ? 'bg-black/80 backdrop-blur-md border-b border-white/10 h-20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
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
                         {/* Eğer logonuzun içinde beyaz yazı varsa aynen kalabilir, yoksa text ekleyebiliriz */}
                        <Image
                            src="/logo-white.png"
                            alt="Kognitect | Perception Architecture"
                            width={600}
                            height={200}
                            className="h-8 w-auto md:h-24 object-contain md:scale-125 origin-left"
                            priority
                            unoptimized
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-widest relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                            </Link>
                        ))}
                        
                        <Link
                            href="#contact"
                            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
                        >
                            <Terminal className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
                            Consult Architect
                        </Link>
                    </nav>

                    {/* MOBİL MENÜ BUTONU */}
                    <button
                        className="md:hidden relative z-60 flex items-center justify-center w-10 h-10 text-white bg-white/5 rounded-lg border border-white/10 backdrop-blur-md active:bg-white/20 transition-all"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
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
                        className="fixed inset-0 z-40 bg-black/95 pt-32 px-6 md:hidden backdrop-blur-2xl"
                    >
                        <div className="flex flex-col gap-8 border-l-2 border-white/10 pl-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-4xl font-bold text-gray-500 hover:text-white transition-colors font-mono tracking-tighter"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="#contact"
                                className="mt-8 flex items-center gap-3 text-xl font-bold text-blue-400"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Terminal className="w-6 h-6" />
                                Initialize Protocol
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;