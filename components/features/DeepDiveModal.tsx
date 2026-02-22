'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { X, Zap, Search, Brain, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface DeepDiveData {
    id: string;
    title: string;
    subtitle: string;
    icon: any;
    description: string;
    technical: string;
    metrics: { label: string; value: string; trend: "up" | "down" | "neutral" }[];
    color: string;
}

interface DeepDiveModalProps {
    data: DeepDiveData;
    onClose: () => void;
}

const DeepDiveModal = ({ data, onClose }: DeepDiveModalProps) => {
    const { t, accent } = useLanguage();
    const phil = t.philosophy;
    if (!data) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto"
            onClick={onClose}
        >
            {/* Truly Fixed Close Button for Mobile Accessibility */}
            <button
                onClick={onClose}
                className="fixed top-6 right-6 z-[120] w-12 h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white shadow-2xl active:scale-90 transition-transform md:hidden"
                aria-label="Close modal"
            >
                <X className="w-7 h-7" />
            </button>

            <motion.div
                initial={{ scale: 0.95, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 50 }}
                className="w-full max-w-5xl bg-[#080808] border border-white/10 md:rounded-3xl overflow-hidden relative shadow-2xl min-h-screen md:min-h-0 flex flex-col md:flex-row pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Desktop Close Button */}
                <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 z-50 p-3 bg-white/10 rounded-full hover:bg-white/20 hover:text-white transition-colors active:scale-90" aria-label="Close modal">
                    <X className="w-6 h-6" />
                </button>

                <div className="w-full md:w-5/12 bg-linear-to-br from-blue-900/10 to-purple-900/10 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-px animate-[scan_2s_linear_infinite]" style={{ backgroundColor: `${accent.primary}80` }} />
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6" style={{ backgroundColor: `${accent.primary}1A`, borderColor: `${accent.primary}4D`, color: accent.primary }}>
                            <Zap className="w-3 h-3 animate-pulse" />
                            <span className="text-xs font-mono uppercase tracking-widest">{phil.protocolActive}</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{data.title}</h2>
                        <h3 className="text-lg text-gray-500 font-mono uppercase">{data.subtitle}</h3>
                    </div>

                    <div className="flex-1 flex items-center justify-center my-8">
                        <div className="relative w-48 h-48 md:w-64 md:h-64">
                            <div className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_10s_linear_infinite]" style={{ borderColor: `${accent.primary}33` }} />
                            <div className="absolute inset-4 rounded-full border border-dotted animate-[spin_15s_linear_infinite_reverse]" style={{ borderColor: `${accent.primary}66` }} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <data.icon className="w-20 h-20 md:w-24 md:h-24 opacity-80" style={{ color: accent.primary, filter: `drop-shadow(0 0 20px rgba(255,255,255,0.2))` }} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {data.metrics.map((m, i) => (
                            <div key={i} className="bg-black/40 p-3 rounded-lg border border-white/5">
                                <p className="text-xs text-gray-500 uppercase">{m.label}</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-xl font-bold text-white font-mono">{m.value}</span>
                                    {m.trend === "up" && <span className="text-green-500 text-xs">▲</span>}
                                    {m.trend === "down" && <span className="text-red-500 text-xs">▼</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-7/12 p-6 xs:p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-[80vh]">
                    <div className="space-y-10">
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-4">
                                <Search className="w-4 h-4" style={{ color: accent.secondary }} /> {phil.problemLabel}
                            </h4>
                            <div className="max-w-3xl text-xl md:text-2xl text-gray-300 leading-relaxed font-light pl-6" style={{ borderLeft: `2px solid ${accent.secondary}` }}>
                                &quot;{data.description.split(/(\{\{h\}\}.*?\{\{\/h\}\}|\{\{d\}\}.*?\{\{\/d\}\}|\{\{w\}\}.*?\{\{\/w\}\})/g).map((part: string, i: number) => {
                                    if (part.startsWith('{{h}}')) return <span key={i} className="text-cyan-400 font-semibold">{part.replace(/\{\{h\}\}|\{\{\/h\}\}/g, '')}</span>;
                                    if (part.startsWith('{{d}}')) return <span key={i} className="text-gray-500">{part.replace(/\{\{d\}\}|\{\{\/d\}\}/g, '')}</span>;
                                    if (part.startsWith('{{w}}')) return <span key={i} className="text-white font-medium">{part.replace(/\{\{w\}\}|\{\{\/w\}\}/g, '')}</span>;
                                    return <span key={i}>{part}</span>;
                                })}&quot;
                            </div>
                        </div>

                        <div className="bg-white/3 p-6 rounded-2xl border border-white/5">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-4">
                                <Brain className="w-4 h-4" style={{ color: accent.primary }} /> {phil.scienceLabel}
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                {data.technical.split(/(\{\{w\}\}.*?\{\{\/w\}\})/g).map((part: string, i: number) => {
                                    if (part.startsWith('{{w}}')) return <span key={i} className="text-white font-medium">{part.replace(/\{\{w\}\}|\{\{\/w\}\}/g, '')}</span>;
                                    return <span key={i}>{part}</span>;
                                })}
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link href="/contact" onClick={onClose} className="inline-flex w-full md:w-auto justify-center items-center gap-2 px-8 py-4 text-[#101214] font-bold rounded-lg hover:opacity-90 transition-colors" style={{ backgroundImage: `linear-gradient(to right, ${accent.primary}, ${accent.primary}CC)` }}>
                                {data.title} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Close Button */}
                <div className="md:hidden border-t border-white/10 p-4 bg-[#080808]/80 backdrop-blur-md shrink-0">
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
};

export default DeepDiveModal;
