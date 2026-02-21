'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Terminal, Cpu, Globe } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import MetaHead from '@/components/MetaHead';
import ProtocolForm from '@/components/ProtocolForm';

export default function ContactPage() {
    const { t, accent } = useLanguage();
    const p = t.protocol;

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 md:px-8 flex flex-col items-center justify-center">
            <MetaHead pageKey="contact" />

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-[800px]">

                {/* LEFT COLUMN: Terminal / Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-black border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden group"
                >
                    {/* Animated Background (Network/Globe hint) */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] animate-pulse" />

                        {/* Rotating ring */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                    </div>

                    <div className="relative z-10">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <div className="ml-4 px-3 py-1 rounded bg-white/5 text-xs font-mono text-gray-500 border border-white/5">
                                bash --protocol-init
                            </div>
                        </div>

                        <div className="space-y-2 mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono tracking-widest uppercase animate-pulse">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                System Online
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter loading-none">
                                {p.title.split(' ').map((word: string, i: number) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>
                        </div>

                        <p className="font-mono text-gray-400 text-lg border-l-2 border-white/20 pl-4 py-2 mb-12">
                            &gt; {p.encrypted} <span className="animate-blink">_</span>
                        </p>
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> {p.emailLabel}
                            </p>
                            <a href="mailto:info@kognitect.com" className="text-xl md:text-2xl font-mono text-white hover:text-cyan-400 transition-colors">
                                info@kognitect.com
                            </a>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> {p.location}
                            </p>
                            <p className="text-xl md:text-2xl font-mono text-white">
                                {p.locationValue}
                            </p>
                        </div>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute bottom-6 right-6">
                        <Cpu className="w-12 h-12 text-white/5" />
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: Protocol Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full"
                >
                    <ProtocolForm />
                </motion.div>

            </div>
        </main>
    );
}
