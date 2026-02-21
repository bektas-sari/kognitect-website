'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import MetaHead from '@/components/MetaHead';
import ConsultForm from '@/components/ConsultForm';
import ContactVisual from '@/components/features/ContactVisual';

export default function ContactPage() {
    const { t, accent } = useLanguage();

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12">
            <MetaHead pageKey="contact" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* LEFT COLUMN: Brand & Info */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <ContactVisual />
                        </motion.div>

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
                                    {t.protocol.location}
                                </p>
                                <div className="space-y-2 text-xl text-zinc-300">
                                    <p>{t.footer.brand.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-6 pt-8 border-t border-zinc-900">
                            <a href="https://linkedin.com/in/bektas-sari" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">LinkedIn</a>
                            <a href="https://instagram.com/dr.bektassari" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">Instagram</a>
                            <a href="https://github.com/bektas-sari" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">GitHub</a>
                        </div>
                    </div>

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
