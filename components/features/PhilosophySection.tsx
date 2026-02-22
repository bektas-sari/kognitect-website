'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Network, Lock, Activity, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import dynamic from 'next/dynamic';
import type { DeepDiveData } from './DeepDiveModal';

const DeepDiveModal = dynamic<any>(() => import('./DeepDiveModal'), { ssr: false });

export const PhilosophySection = () => {
    const { t, accent } = useLanguage();
    const phil = t.philosophy;
    const [selectedTopic, setSelectedTopic] = useState<DeepDiveData | null>(null);
    const [mousePositions, setMousePositions] = useState<Record<number, { x: number; y: number } | null>>({});

    const iconMap: Record<string, any> = { static: Layers, noise: Network, lock: Lock, bridge: Activity };

    const topics: DeepDiveData[] = phil.topics.map((topic: any) => ({
        ...topic,
        icon: iconMap[topic.id] || Layers,
        color: topic.id === "noise" || topic.id === "bridge" ? "purple" : "blue",
    }));

    const handleMouseMove = (idx: number, e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePositions(prev => ({
            ...prev,
            [idx]: { x: e.clientX - rect.left, y: e.clientY - rect.top },
        }));
    };

    const handleMouseLeave = (idx: number) => {
        setMousePositions(prev => ({ ...prev, [idx]: null }));
    };

    return (
        <section id="methodology" className="py-20 md:py-32 px-6 relative overflow-hidden bg-[#050505]">
            <AnimatePresence>
                {selectedTopic && <DeepDiveModal data={selectedTopic} onClose={() => setSelectedTopic(null)} />}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <span className="font-mono tracking-widest text-sm uppercase mb-4 block" style={{ color: accent.primary }}>{phil.badge}</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">{phil.title}</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{phil.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topics.map((item, idx) => {
                        const mp = mousePositions[idx];
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setSelectedTopic(item)}
                                onMouseMove={(e) => handleMouseMove(idx, e)}
                                onMouseLeave={() => handleMouseLeave(idx)}
                                className="group relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1"
                                style={{
                                    background: mp
                                        ? `radial-gradient(600px circle at ${mp.x}px ${mp.y}px, rgba(6,182,212,0.12), transparent 40%), rgba(3,7,10,0.8)`
                                        : 'rgba(3,7,10,0.8)',
                                    border: '1px solid',
                                    borderColor: mp ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.06)',
                                    boxShadow: mp ? `0 8px 40px -10px rgba(6,182,212,0.2)` : '0 4px 20px -8px rgba(0,0,0,0.5)',
                                }}
                            >
                                {/* Top accent gradient bar */}
                                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                                {/* Spotlight glow overlay */}
                                {mp && (
                                    <div
                                        className="absolute inset-0 rounded-2xl pointer-events-none opacity-60"
                                        style={{
                                            background: `radial-gradient(400px circle at ${mp.x}px ${mp.y}px, rgba(6,182,212,0.08), transparent 40%)`,
                                        }}
                                    />
                                )}

                                {/* Grid pattern overlay for tech feel */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                    backgroundSize: '20px 20px',
                                }} />

                                <div className="p-8 pt-7 relative z-10">
                                    {/* Status dot — top right */}
                                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 8px rgba(34,211,238,0.6)' }} />
                                        <span className="text-[9px] text-cyan-500 font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Active</span>
                                    </div>

                                    {/* Icon with ambient glow */}
                                    <div className="relative mb-6">
                                        <div className="absolute -inset-2 rounded-2xl bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-colors duration-500" />
                                        <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-950/50 to-gray-900/50 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300">
                                            <item.icon className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" style={{ strokeWidth: 1.5 }} />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-50 transition-colors">{item.title}</h3>
                                    <p className="text-xs text-cyan-600 font-mono uppercase tracking-widest mb-4">{item.subtitle}</p>

                                    {/* Description preview — fades out */}
                                    <div className="relative h-12 overflow-hidden mb-4">
                                        <p className="text-sm text-gray-500 leading-relaxed">{item.description.replace(/\{\{[whd]\}\}|\{\{\/[whd]\}\}/g, '')}</p>
                                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgb(3,7,10)] to-transparent" />
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{ color: accent.primary }}>
                                        {phil.startScan} <ArrowRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PhilosophySection;
