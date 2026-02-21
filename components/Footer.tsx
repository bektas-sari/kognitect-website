'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
    const { t } = useLanguage();
    const f = t.footer;

    return (
        <footer className="bg-[#0a0a0a] border-t border-white/10 pt-16 pb-8 text-sm">
            <div className="max-w-7xl mx-auto px-6">

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* Column 1: Brand Identity */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold text-white tracking-tight">Kognitect</span>
                        </Link>
                        <p className="text-gray-500 font-mono text-xs tracking-wide uppercase">
                            {f.brand.slogan}
                        </p>
                        <div className="pt-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-400 text-xs">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                {f.brand.location}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Navigation (Site Map) */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2 inline-block">
                            {f.navigation.title}
                        </h4>
                        <nav className="flex flex-col space-y-3">
                            <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.home}
                            </Link>
                            <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.about}
                            </Link>
                            <Link href="/hizmetler" className="text-gray-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.services}
                            </Link>
                            <Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.projects}
                            </Link>
                            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 w-fit">
                                {f.navigation.contact}
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3: Connection & Legal */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2 inline-block">
                            {f.connection.title}
                        </h4>
                        <div className="space-y-6">

                            {/* Email */}
                            <a href="mailto:info@kognitect.com" className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group">
                                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                info@kognitect.com
                            </a>

                            {/* Social Icons */}
                            <div className="flex items-center gap-4">
                                <a href="https://www.linkedin.com/in/bektas-sari" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all transform hover:-translate-y-1">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a href="https://github.com/bektas-sari" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-[#333] hover:text-white transition-all transform hover:-translate-y-1">
                                    <Github className="w-4 h-4" />
                                </a>
                                <a href="https://www.instagram.com/dr.bektassari/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-[#E1306C] hover:text-white transition-all transform hover:-translate-y-1">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            </div>

                            {/* Legal Links */}
                            <div className="flex flex-col gap-1 text-xs text-gray-600">
                                <a href="#" className="hover:text-gray-400 transition-colors">{f.connection.legal.split(' • ')[0]}</a>
                                <a href="#" className="hover:text-gray-400 transition-colors">{f.connection.legal.split(' • ')[1]}</a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright */}
                <div className="border-t border-white/5 pt-8 text-center">
                    <p className="text-xs text-gray-600 font-mono">
                        {f.copyright}
                    </p>
                </div>

            </div>
        </footer>
    );
}
