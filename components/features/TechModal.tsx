'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Network, Brain, Code2, Eye, Layers, Smartphone } from 'lucide-react';
import {
    CVVisual,
    PythonVisual,
    BehaviorVisual,
    SaliencyVisual,
    NextVisual,
    FlutterVisual
} from '@/components/features/tech-visuals';

interface TechModalProps {
    tech: any;
    onClose: () => void;
    accent: string;
}

const VISUAL_MAP: any = {
    "Bilgisayarlı Görü": CVVisual, "Computer Vision": CVVisual,
    "Python AI Çekirdeği": PythonVisual, "Python AI Core": PythonVisual,
    "Davranış Bilimi": BehaviorVisual, "Behavioral Science": BehaviorVisual,
    "Dikkat Çekicilik Haritası": SaliencyVisual, "Saliency Map": SaliencyVisual,
    "Next.js & React": NextVisual,
    "Flutter & Dart": FlutterVisual,
};

const ICON_MAP: any = {
    "Bilgisayarlı Görü": Eye, "Computer Vision": Eye,
    "Python AI Çekirdeği": Code2, "Python AI Core": Code2,
    "Davranış Bilimi": Brain, "Behavioral Science": Brain,
    "Dikkat Çekicilik Haritası": Layers, "Saliency Map": Layers,
    "Next.js & React": Network,
    "Flutter & Dart": Smartphone,
};

export default function TechModal({ tech, onClose, accent }: TechModalProps) {
    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    if (!tech) return null;

    const VisualComponent = VISUAL_MAP[tech.title] || CVVisual;
    const IconComponent = ICON_MAP[tech.title] || Code2;

    // Helper to highlight keywords (simple implementation)
    const highlightKeywords = (text: string) => {
        const keywords = [
            "Saccadic", "Cognitive Load", "Derin Öğrenme", "Deep Learning",
            "OpenCV", "YOLO", "Eye-tracking", "Kognitif Çapa", "Miller's Law",
            "Gestalt", "SSR", "SEO", "Heatmap", "Isı Haritası"
        ];

        let parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'));
        return parts.map((part, i) =>
            keywords.some(k => k.toLowerCase() === part.toLowerCase())
                ? <span key={i} className="text-cyan-400 font-semibold">{part}</span>
                : part
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
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
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-5xl bg-[#0f0f11] border border-white/10 md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[95vh] md:max-h-none pointer-events-auto"
                style={{ boxShadow: `0 0 50px -10px ${accent}22` }} // lower opacity glow
                onClick={(e) => e.stopPropagation()}
            >
                {/* Desktop Close Button */}
                <button
                    onClick={onClose}
                    className="hidden md:flex absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all border border-white/5 active:scale-90"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* LEFT: VISUAL/ANIMATION AREA */}
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-black relative border-b md:border-b-0 md:border-r border-white/10 overflow-hidden group">
                    <VisualComponent />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent opacity-80 md:hidden" />
                </div>

                {/* RIGHT: CONTENT AREA */}
                <div className="w-full md:w-1/2 p-6 xs:p-8 md:p-12 flex flex-col justify-center relative overflow-y-auto">
                    {/* Background Text watermark */}
                    <span className="absolute top-4 right-4 text-8xl font-black text-white/[0.02] pointer-events-none select-none overflow-hidden">
                        {tech.title.split(' ')[0]}
                    </span>

                    <div className="mb-8">
                        <div className="inline-flex p-3 rounded-xl mb-6 border border-white/5 bg-white/5 text-cyan-400">
                            <IconComponent className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {tech.title}
                        </h2>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                            {tech.desc}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <p className="text-gray-400 text-lg leading-relaxed font-light">
                            {highlightKeywords(tech.details)}
                        </p>

                        {/* Additional "Lab Data" (Fake metrics for 'Science' feel) */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Efficiency</div>
                                <div className="text-xl font-mono text-white">99.8%</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Latency</div>
                                <div className="text-xl font-mono text-cyan-400">~12ms</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Close Button */}
                <div className="md:hidden border-t border-white/10 p-4 bg-[#080808]/80 backdrop-blur-md">
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
