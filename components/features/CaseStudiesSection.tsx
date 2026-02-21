'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, ScanLine, Activity, Target, Zap, Waves, Brain, MousePointer2, BarChart3 } from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';

export default function CaseStudiesSection() {
    const { t, accent } = useLanguage();
    const cs = t.caseStudies;
    const [activeTab, setActiveTab] = useState<'research' | 'field'>('research');
    const [selectedStudy, setSelectedStudy] = useState<any>(null);

    // Filter items based on active tab
    const filteredItems = cs.items.filter((item: any) => item.category === activeTab);

    return (
        <section id="case-studies" className="py-32 px-6 bg-[#0A0A0A] relative overflow-hidden">
            {/* Modal Logic Persistent */}
            <AnimatePresence>
                {selectedStudy && (
                    <CaseStudyModal
                        study={selectedStudy}
                        onClose={() => setSelectedStudy(null)}
                        accent={accent.primary}
                    />
                )}
            </AnimatePresence>

            {/* Premium Minimalist Accents (Subtle Grid) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.02]" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-white/[0.02]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-rose-500/5 border border-rose-500/10 text-[10px] font-bold uppercase tracking-[0.3em] text-rose-400 mb-6 font-mono">
                        {cs.badge}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white tracking-tighter">
                        {cs.title}
                    </h2>
                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed font-light">
                        {cs.subtitle}
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center mb-20">
                    <div className="bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800 backdrop-blur-md inline-flex relative overflow-hidden">
                        <motion.div
                            className="absolute top-1.5 bottom-1.5 bg-zinc-100 rounded-full shadow-md"
                            initial={false}
                            animate={{
                                left: activeTab === 'research' ? '6px' : 'calc(50% + 3px)',
                                width: 'calc(50% - 9px)',
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 40 }}
                        />

                        <button
                            onClick={() => setActiveTab('research')}
                            className={`relative z-10 px-8 py-2 rounded-full text-sm transition-all duration-300 ${activeTab === 'research' ? 'text-zinc-900 font-bold' : 'text-zinc-400 font-semibold hover:text-zinc-200'}`}
                        >
                            {cs.tabs.research}
                        </button>
                        <button
                            onClick={() => setActiveTab('field')}
                            className={`relative z-10 px-8 py-2 rounded-full text-sm transition-all duration-300 ${activeTab === 'field' ? 'text-zinc-900 font-bold' : 'text-zinc-400 font-semibold hover:text-zinc-200'}`}
                        >
                            {cs.tabs.field}
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item: any) => (
                            <CaseCard
                                key={item.id}
                                item={item}
                                onClick={() => setSelectedStudy(item)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

function CaseCard({ item, onClick }: { item: any, onClick: () => void }) {
    // Project Specific Subtitles
    const subtitleMap: any = {
        "tiktaktik": "SOSYAL GİRİŞİM ANALİZİ",
        "kampus-yolunda": "DAVRANIŞSAL TASARIM",
        "gorsel-dikkat": "NÖRO-MATEMATİK MODELLEME",
        "medistasyon": "BİLİŞSEL PSİKOLOJİ",
        "detay-oto-fren": "SİSTEMATİK GÜVENLİK",
        "fiyat-algisi": "EKONOMİK PSİKOLOJİ"
    };

    const projectSubtitle = subtitleMap[item.id] || "TEKNİK ANALİZ MODELİ";

    // Project Specific Features for 2x2 Grid (Now only technologies/methods)
    const featureMap: any = {
        "tiktaktik": ["Nöro-Tasarım", "Next.js", "Karar Mimarisi", "Python & Django"],
        "kampus-yolunda": ["Davranış Analizi", "React Native", "Kullanıcı Deneyimi", "Node.js"],
        "gorsel-dikkat": ["Göz İzleme", "OpenCV", "Dikkat Haritası", "C++ & Python"],
        "medistasyon": ["Farkındalık", "Flutter", "Bilişsel Yük", "PostgreSQL"],
        "detay-oto-fren": ["Sensör Füzyonu", "Real-time OS", "Hata Regresyonu", "Embedded C"],
        "fiyat-algisi": ["Değer Algısı", "Data Science", "Satın Alma", "Statistical R"]
    };

    const projectFeatures = featureMap[item.id] || ["Veri Analizi", "TypeScript", "Sistem Tasarımı", "Cloud Systems"];

    // Status Logic
    const isLive = item.status === "CANLI" || item.status === "LIVE" || item.status === "TAMAMLANDI" || item.status === "COMPLETED";
    const statusText = item.status;

    // Project Specific Icons
    const getIcon = () => {
        switch (item.id) {
            case 'tiktaktik': return <Waves className="w-5 h-5" />;
            case 'kampus-yolunda': return <Brain className="w-5 h-5" />;
            case 'gorsel-dikkat': return <MousePointer2 className="w-5 h-5" />;
            default: return <BarChart3 className="w-5 h-5" />;
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover="hover"
            onClick={onClick}
            className="group relative h-[560px] w-full bg-[#16181C] rounded-[32px] p-10 flex flex-col justify-between cursor-pointer border border-white/[0.03] transition-all duration-500 hover:border-rose-400/30 shadow-2xl overflow-hidden"
        >
            {/* Status Badge (Top Right) */}
            <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md z-20 ${isLive
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                {statusText}
            </div>

            {/* Soft Rose Glow on Hover */}
            <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/[0.015] transition-colors duration-500 pointer-events-none" />

            <div className="relative z-10">
                {/* 1. Technical Icon Box (Hollow, thin rose border) */}
                <div className="w-14 h-14 border border-rose-400/20 rounded-xl flex items-center justify-center mb-8 bg-rose-400/5 group-hover:border-rose-400/40 transition-colors duration-500">
                    <span className="text-rose-400/80 group-hover:text-rose-400 transition-colors">
                        {getIcon()}
                    </span>
                </div>

                {/* 2. Titles Group */}
                <div className="mb-6">
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight transition-colors group-hover:text-rose-50 leading-none">
                        {item.title}
                    </h3>
                    <p className="text-[10px] font-mono font-bold text-rose-400/90 uppercase tracking-[0.3em] group-hover:tracking-[0.35em] transition-all duration-500">
                        {projectSubtitle}
                    </p>
                </div>

                {/* 3. Description (Medium Zinc Gray) */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-normal line-clamp-3 group-hover:text-zinc-300 transition-colors">
                    {item.description}
                </p>

                {/* 4. Technical Feature Grid (2x2 Structure) */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {projectFeatures.map((tag: string, idx: number) => (
                        <div key={idx} className="bg-[#1D2126] border border-white/[0.04] rounded-lg px-4 py-3 flex items-center gap-2 group-hover:bg-[#23282F] transition-all duration-300">
                            <span className="text-rose-400/80 text-xs font-bold">+</span>
                            <span className="text-rose-400/80 text-[10px] font-bold uppercase tracking-wider truncate group-hover:text-rose-400 transition-colors">
                                {tag}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Footer CTA (Pure White) */}
            <div className="flex items-center gap-2 py-2 transition-all duration-300 text-white hover:text-gray-300 group-hover:translate-x-1">
                <span className="font-black text-xs uppercase tracking-[0.4em]">
                    KEŞFET
                </span>
                <ArrowRight className="w-4 h-4 transition-transform" />
            </div>

            {/* Subtle Top Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Box Shadow Glow Simulation */}
            <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-rose-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
}
