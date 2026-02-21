'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import MetaHead from '@/components/MetaHead';
import ConsultForm from '@/components/ConsultForm';

export default function ContactPage() {
    const { t, accent } = useLanguage();

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12">
            <MetaHead pageKey="contact" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* LEFT COLUMN: Brand & Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: '3rem' }}
                                className="h-[2px] bg-emerald-500"
                            />
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                                {t.philosophy.title}
                            </h1>
                            <p className="text-zinc-400 text-xl leading-relaxed max-w-lg">
                                {t.manifesto}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="group">
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
                                    {t.footer.connection.directContact}
                                </p>
                                <a href="mailto:info@kognitect.com" className="text-3xl md:text-4xl font-medium text-white hover:text-emerald-400 transition-colors duration-300">
                                    info@kognitect.com
                                </a>
                            </div>

                            <div className="space-y-4 pt-4">
                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
                                    Lokasyon
                                </p>
                                <div className="space-y-2 text-xl text-zinc-300">
                                    <p>İstanbul Office</p>
                                    <p className="text-zinc-500 text-sm">Levent, Beşiktaş</p>
                                </div>
                                <div className="space-y-2 pt-4 text-xl text-zinc-300">
                                    <p>İzmir Lab</p>
                                    <p className="text-zinc-500 text-sm">Urla, Teknopark</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-6 pt-8 border-t border-zinc-900">
                            <a href="https://linkedin.com/in/bektas-sari" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">LinkedIn</a>
                            <a href="https://instagram.com/dr.bektassari" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">Instagram</a>
                            <a href="https://github.com/bektas-sari" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">GitHub</a>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl rounded-full opacity-50 pointer-events-none" />
                        <div className="relative z-10">
                            <ConsultForm />
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
