'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
    const { t } = useLanguage();
    const f = t.footer;

    return (
        <footer className="bg-[#050505] border-t border-white/5 py-12 md:pt-16 md:pb-8 text-sm relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-16">

                    {/* Column 1: Brand Identity */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                            <Image
                                src="/logo-white.png"
                                alt="Kognitect | Perception Architecture"
                                width={160}
                                height={40}
                                className="w-32 md:w-40 h-auto object-contain"
                                unoptimized
                            />
                        </Link>
                        <p className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase leading-relaxed max-w-xs">
                            {f.brand.slogan}
                        </p>
                        <div className="pt-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[11px] font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                {f.brand.location}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Navigation (Site Map) */}
                    <div>
                        <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-8">
                            {f.navigation.title}
                        </h4>
                        <nav className="flex flex-col space-y-4">
                            <Link href="/" className="text-zinc-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.home}
                            </Link>
                            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.about}
                            </Link>
                            <Link href="/#services" className="text-zinc-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.services}
                            </Link>
                            <Link href="/case-studies" className="text-zinc-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.projects}
                            </Link>
                            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.contact}
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3: Connection & Legal */}
                    <div>
                        <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mb-8">
                            {f.connection.title}
                        </h4>
                        <div className="space-y-8">

                            {/* Email */}
                            <a href="mailto:info@kognitect.com" className="group flex flex-col gap-1 w-fit">
                                <span className="text-[10px] text-zinc-600 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">Digital Correspondence</span>
                                <span className="text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
                                    info@kognitect.com
                                </span>
                            </a>

                            {/* Social Icons */}
                            <div className="flex items-center gap-4">
                                <a href="https://www.linkedin.com/in/bektas-sari" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 text-zinc-500 hover:bg-[#0077b5] hover:text-white transition-all transform hover:-translate-y-1 border border-white/5">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a href="https://github.com/bektas-sari" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 text-zinc-500 hover:bg-[#333] hover:text-white transition-all transform hover:-translate-y-1 border border-white/5">
                                    <Github className="w-4 h-4" />
                                </a>
                                <a href="https://www.instagram.com/dr.bektassari/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-white/5 text-zinc-500 hover:bg-[#E1306C] hover:text-white transition-all transform hover:-translate-y-1 border border-white/5">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            </div>

                            {/* Legal Links */}
                            <div className="flex flex-col gap-2 pt-2 text-[11px] text-zinc-600 font-medium">
                                <a href="#" className="hover:text-zinc-400 transition-colors w-fit">{f.connection.legal.split(' • ')[0]}</a>
                                <a href="#" className="hover:text-zinc-400 transition-colors w-fit">{f.connection.legal.split(' • ')[1]}</a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 text-[11px] font-medium">
                    <p>{f.copyright}</p>
                    <p className="font-mono opacity-30 tracking-tighter">BUILD_V2.5.0-STABLE</p>
                </div>

            </div>
        </footer>
    );
}
