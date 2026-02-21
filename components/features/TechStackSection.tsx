'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    Network,
    Code2,
    Eye,
    Layers,
    Smartphone,
    Cpu
} from 'lucide-react';
import TechModal from './TechModal';

export default function TechStackSection() {
    const { t, accent } = useLanguage();
    const tech = t.techStack;
    const [activeTech, setActiveTech] = useState<any>(null);

    const iconMap: any = {
        "Bilgisayarlı Görü": Eye, "Computer Vision": Eye,
        "Python AI Çekirdeği": Code2, "Python AI Core": Code2,
        "Davranış Bilimi": BrainIcon, "Behavioral Science": BrainIcon, // Custom or brain icon
        "Dikkat Çekicilik Haritası": Layers, "Saliency Map": Layers,
        "Next.js & React": Network,
        "Flutter & Dart": Smartphone,
    };

    // Color accents for specific tech (cyan by default)
    const colorMap: any = {
        "Python AI Çekirdeği": "text-yellow-400", "Python AI Core": "text-yellow-400",
        "Davranış Bilimi": "text-pink-400", "Behavioral Science": "text-pink-400",
        "Dikkat Çekicilik Haritası": "text-orange-400", "Saliency Map": "text-orange-400",
        "Next.js & React": "text-white",
        "Flutter & Dart": "text-blue-400",
        "Bilgisayarlı Görü": "text-green-400", "Computer Vision": "text-green-400"
    };

    return (
        <section id="technologies" className="py-32 px-6 bg-[#101214] relative overflow-hidden border-t border-white/5">
            {/* Modal */}
            <AnimatePresence>
                {activeTech && (
                    <TechModal
                        tech={activeTech}
                        onClose={() => setActiveTech(null)}
                        accent={accent.primary}
                    />
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 text-center"
                >
                    <span className="font-mono text-sm uppercase tracking-widest text-cyan-500 mb-4 block">
                        {tech.badge}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        {tech.title}
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {tech.subtitle}
                    </p>
                </motion.div>

                {/* Tech Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tech.techs.map((item: any, idx: number) => {
                        const Icon = iconMap[item.title] || Code2;
                        const colorClass = colorMap[item.title] || "text-cyan-400";

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setActiveTech(item)}
                                className="group relative p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:bg-[#0f0f12] transition-colors cursor-pointer overflow-hidden"
                            >
                                {/* Hover Glow Border */}
                                <motion.div
                                    className="absolute inset-0 border-2 border-cyan-500/0 rounded-2xl pointer-events-none"
                                    whileHover={{ borderColor: "rgba(6,182,212,0.5)" }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Background subtle glow on hover */}
                                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`p-3 rounded-xl w-fit mb-6 bg-white/5 border border-white/5 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mb-4">
                                        {item.desc}
                                    </p>

                                    {/* Arrow indicator */}
                                    <div className="mt-auto flex items-center text-cyan-500/0 group-hover:text-cyan-500 transition-all transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 font-mono text-xs">
                                        <span>EXPLORE CORE</span>
                                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Simple Brain icon component since lucide 'Brain' is already imported but let's be safe
function BrainIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
            <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
            <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
            <path d="M6 18a4 4 0 0 1-1.967-.516" />
            <path d="M19.967 17.484A4 4 0 0 1 18 18" />
        </svg>
    )
}
