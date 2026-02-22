'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
    const { t, toggleLocale, accent } = useLanguage();
    const nav = t.navbar;
    const pathname = usePathname();
    const router = useRouter();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);

            // If we're NOT on the homepage, navigate there first
            if (pathname !== '/') {
                router.push(`/${href}`);
                setIsMobileMenuOpen(false);
                return;
            }

            const elem = document.getElementById(targetId);
            if (elem) {
                const headerOffset = 100;
                const elementPosition = elem.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        } else if (href === '/') {
            e.preventDefault();
            if (pathname !== '/') {
                router.push('/');
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // Always close mobile menu on any link click
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                    ? 'bg-[#101214]/80 backdrop-blur-md border-b border-white/10 h-20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent border-b border-transparent h-24'
                    } flex items-center`}
            >
                <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
                    <Link
                        href="/"
                        className="relative z-50 hover:opacity-80 transition-opacity"
                        onClick={(e) => handleScrollTo(e, '/')}
                        aria-label="Kognitect Home"
                    >
                        <Image
                            src="/logo-white.png"
                            alt="Kognitect | Perception Architecture"
                            width={600}
                            height={200}
                            className="w-28 sm:w-32 md:w-40 h-auto object-contain lg:scale-125 origin-left"
                            priority
                            unoptimized
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-5 xl:gap-10">
                        {nav.items.map((item: { name: string; href: string }) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleScrollTo(e, item.href)}
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wider relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full" style={{ backgroundColor: accent.primary }} />
                            </Link>
                        ))}

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLocale}
                            aria-label={`Switch to ${nav.langToggle === 'EN' ? 'English' : 'Turkish'}`}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            {nav.langToggle}
                        </button>

                        <Link
                            href="/contact"
                            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold transition-all duration-300 hover:bg-cyan-900/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                            style={{ '--hover-bg': `${accent.primary}33`, '--hover-border': `${accent.primary}4D` } as React.CSSProperties}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${accent.primary}33`; e.currentTarget.style.borderColor = `${accent.primary}4D`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                        >
                            <Sparkles className="w-4 h-4 group-hover:text-emerald-400 transition-colors" style={{ color: accent.primary }} />
                            {nav.cta}
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative z-60 flex items-center justify-center w-10 h-10 text-white bg-white/5 rounded-lg border border-white/10 backdrop-blur-md active:bg-white/20 transition-all"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-[#101214]/98 lg:hidden backdrop-blur-3xl overflow-y-auto"
                    >
                        <div className="min-h-screen flex flex-col justify-center px-10 py-20">
                            <div className="flex flex-col gap-6 border-l border-white/10 pl-8">
                                {nav.items.map((item: { name: string; href: string }, idx: number) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={(e) => handleScrollTo(e, item.href)}
                                            className={`text-4xl xs:text-5xl font-bold tracking-tighter transition-colors ${pathname === item.href ? 'text-white' : 'text-zinc-600'
                                                } hover:text-white`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col gap-8 mt-4"
                                >
                                    {/* Mobile Language Toggle */}
                                    <button
                                        onClick={toggleLocale}
                                        className="flex items-center gap-3 text-xl font-medium text-zinc-400 hover:text-white transition-colors"
                                    >
                                        <Globe className="w-5 h-5" />
                                        {nav.langToggle}
                                    </button>

                                    <Link
                                        href="/contact"
                                        className="flex items-center gap-3 text-2xl font-bold"
                                        style={{ color: accent.primary }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Sparkles className="w-6 h-6" />
                                        {nav.mobileCta}
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;