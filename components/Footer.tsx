'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
    const { t } = useLanguage();
    const f = t.footer;

    return (
        <footer className="bg-[#050505] border-t border-zinc-800 pt-24 pb-12 text-sm overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">

                    {/* Column 1: Brand & Manifesto */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold text-white tracking-tight">Kognitect</span>
                        </Link>
                        <p className="text-zinc-400 leading-relaxed max-w-sm text-[15px]">
                            {t.manifesto}
                        </p>
                    </div>

                    {/* Column 2: Direct Contact */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
                            {f.connection.directContact}
                        </h4>
                        <div className="space-y-4">
                            <a href="mailto:info@kognitect.com" className="block text-xl md:text-2xl font-medium text-white hover:text-emerald-400 transition-colors duration-300">
                                info@kognitect.com
                            </a>
                            <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                İstanbul / İzmir
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-4 pt-4">
                                <a href="https://www.linkedin.com/in/bektas-sari" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="https://github.com/bektas-sari" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://www.instagram.com/dr.bektassari/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Action - CTA */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
                            {f.connection.projectPrompt}
                        </h4>
                        <div className="space-y-8">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-4 bg-emerald-500 text-zinc-950 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98]"
                            >
                                {t.startAnalysis}
                            </Link>

                            {/* Legal Links Moved Here for better balance */}
                            <div className="flex flex-col gap-2 pt-4">
                                <nav className="flex items-center gap-6 text-[13px] text-zinc-600">
                                    <Link href="/about" className="hover:text-zinc-400 transition-colors">{f.navigation.about}</Link>
                                    <Link href="/case-studies" className="hover:text-zinc-400 transition-colors">{f.navigation.projects}</Link>
                                    <Link href="/contact" className="hover:text-zinc-400 transition-colors">{f.navigation.contact}</Link>
                                </nav>
                                <div className="flex gap-4 text-xs text-zinc-700">
                                    <a href="#" className="hover:text-zinc-500 transition-colors">{f.connection.legal.split(' • ')[0]}</a>
                                    <a href="#" className="hover:text-zinc-500 transition-colors">{f.connection.legal.split(' • ')[1]}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright */}
                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-xs text-center">
                    <p>{f.copyright}</p>
                    <p className="font-mono opacity-50">v2.1.0-CLARITY</p>
                </div>

            </div>
        </footer>
    );
}
