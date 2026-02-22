'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { X, Activity, Cpu, ImageIcon, ExternalLink, Globe } from 'lucide-react';
import AnatomyViewport from './AnatomyViewport';

interface CaseStudyModalProps {
    study: any;
    onClose: () => void;
    accent: string;
}

export default function CaseStudyModal({ study, onClose, accent }: CaseStudyModalProps) {
    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    if (!study) return null;

    const sections = [
        {
            title: "Nöro-Teşhis / Neuro-Diagnosis",
            icon: Activity,
            content: study.diagnosis,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20"
        },
        {
            title: "Mühendislik Çözümü / Engineering Solution",
            icon: Cpu,
            content: study.solution,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-10 overflow-hidden"
            onClick={onClose}
        >
            {/* Truly Fixed Close Button for Mobile Accessibility */}
            <button
                onClick={onClose}
                className="fixed top-6 right-6 z-[120] w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white shadow-2xl active:scale-90 transition-transform md:hidden"
                aria-label="Close modal"
            >
                <X className="w-6 h-6" />
            </button>

            <motion.div
                initial={{ scale: 0.98, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.98, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                className="w-[92vw] max-w-4xl h-[96vh] bg-[#0F0F0F] border border-white/10 rounded-[32px] overflow-hidden relative shadow-2xl flex flex-col isolate pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image Area */}
                <div className="h-40 md:h-48 relative overflow-hidden shrink-0 pt-6 px-8 rounded-t-[32px]">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F0F]/50 to-[#0F0F0F] z-10 rounded-t-[32px]" />
                    <NextImage
                        src="/images/placeholder-project.svg"
                        alt={study.title}
                        fill
                        className="object-cover opacity-40 transition-transform duration-700 rounded-t-[32px]"
                        unoptimized
                    />

                    {/* Desktop Close Button */}
                    <button
                        onClick={onClose}
                        className="hidden md:flex absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all border border-white/5 active:scale-90"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-4 left-8 z-20 pr-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 ${study.category === 'research' ? 'text-purple-400' : 'text-blue-400'}`}>
                                {study.category === 'research' ? 'R&D' : 'FIELD'}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-gray-400">
                                {study.status}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-3xl font-bold text-white mb-1 leading-tight">{study.title}</h2>
                        <p className="text-gray-400 font-light text-xs line-clamp-1">{study.description}</p>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5 custom-scrollbar">
                    {/* Grid Layout for Analysis - More Compact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + (idx * 0.1) }}
                                className={`p-5 rounded-2xl border ${section.border} ${section.bg} relative overflow-hidden group`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <section.icon className={`w-4 h-4 ${section.color}`} />
                                    <h3 className={`text-[10px] font-black uppercase tracking-widest ${section.color}`}>
                                        {section.title}
                                    </h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed text-sm relative z-20">
                                    {section.content}
                                </p>
                                <section.icon className={`absolute -bottom-4 -right-4 w-20 h-20 opacity-5 ${section.color}`} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Visual Evidence Area - Prioritized */}

                    {/* Visual Evidence Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                            <ImageIcon className="w-4 h-4" />
                            Grafik Analizi / Graphics Analysis
                        </h3>

                        <div className="relative rounded-2xl overflow-hidden border border-white/5">
                            {study.visualEvidence ? (
                                <AnatomyViewport
                                    imageSrc={study.visualEvidence.image}
                                    hotspots={study.visualEvidence.hotspots}
                                    heatmapSpots={study.visualEvidence.heatmapSpots}
                                    analysisShapes={study.visualEvidence.analysisShapes}
                                />
                            ) : (
                                <div className="h-48 flex items-center justify-center bg-zinc-900/50">
                                    <div className="text-center text-zinc-600">
                                        <Activity className="w-8 h-8 mx-auto mb-2 opacity-50 animate-pulse" />
                                        <p className="text-[10px] font-mono uppercase tracking-[0.2em]">Data Streaming...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.a
                        href="#"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="group flex items-center justify-between w-full p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/5 rounded-xl text-white/50 group-hover:text-white transition-colors">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base group-hover:text-rose-400 transition-colors">
                                    Dış Erişim / External Access
                                </h3>
                                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                                    Secure Protocol Established
                                </p>
                            </div>
                        </div>

                        <div className="p-2 bg-black/40 rounded-full text-zinc-500 group-hover:text-white transition-all">
                            <ExternalLink className="w-4 h-4" />
                        </div>
                    </motion.a>
                </div>

                {/* Mobile Bottom Close Button */}
                <div className="md:hidden border-t border-white/5 p-4 bg-[#0F0F0F]/80 backdrop-blur-md shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-sm active:bg-white/10 transition-colors"
                    >
                        Geri Dön
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
