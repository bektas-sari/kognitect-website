'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
    ScanlineVisual,
    NetworkVisual,
    FovealVisual,
    CodeWaterfallVisual,
    OptimizationCurveVisual
} from '@/components/features/neuro-visuals';

export default function TimelineSection() {
    const { t, accent } = useLanguage();
    const proc = t.process;

    const visuals = [
        ScanlineVisual,
        NetworkVisual,
        FovealVisual,
        CodeWaterfallVisual,
        OptimizationCurveVisual
    ];

    return (
        <section className="py-24 md:py-32 bg-[#101214] relative overflow-hidden">
            {/* Mobile: Vertical line on left. Desktop: Center. */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 md:-translate-x-1/2 z-0" />

            <div className="max-w-7xl mx-auto px-4 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 md:mb-32 relative z-10 pl-12 md:pl-0"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest">
                        {proc.badge}
                    </span>
                    <h2 className="text-3xl md:text-6xl font-bold">
                        {proc.title} <span style={{ color: accent.primary }}>{proc.titleHighlight}</span>
                    </h2>
                </motion.div>

                <div className="relative space-y-24 md:space-y-48">
                    {proc.steps.map((step: any, idx: number) => {
                        const VisualComponent = visuals[idx] || visuals[0];
                        const isOdd = idx % 2 !== 0;

                        return (
                            <TimelineStep
                                key={idx}
                                step={step}
                                index={idx}
                                Visual={VisualComponent}
                                accent={accent.primary}
                                isOdd={isOdd}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function TimelineStep({ step, index, Visual, accent, isOdd }: any) {
    return (
        <motion.div
            className={`relative flex flex-col md:flex-row items-center md:gap-24 ${isOdd ? 'md:flex-row-reverse' : ''}`}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0.3 }} // Re-trigger for glow effect
        >
            {/* CENTER NODE */}
            {/* Mobile: Left aligned (left-6). Desktop: Center (left-1/2) */}
            <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-30 transform -translate-x-1/2 md:translate-x-0 mt-2 md:mt-0">
                <motion.div
                    className="w-4 h-4 rounded-full bg-[#101214] border-2 border-gray-700"
                    variants={{
                        offscreen: { borderColor: "rgba(55, 65, 81, 1)", boxShadow: "none", scale: 1 },
                        onscreen: {
                            borderColor: accent,
                            boxShadow: `0 0 20px ${accent}`,
                            scale: 1.5,
                            transition: { duration: 0.4 }
                        }
                    }}
                />
            </div>

            {/* TEXT CONTENT */}
            <div className={`w-full md:flex-1 pl-16 md:pl-0 ${isOdd ? 'md:text-left' : 'md:text-right'} relative z-20`}>
                <motion.div
                    variants={{
                        offscreen: { opacity: 0.3, y: 10 },
                        onscreen: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                >
                    <div className={`flex items-center gap-4 mb-4 ${isOdd ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        <span className="text-5xl md:text-6xl font-bold font-mono text-white/5">
                            {step.num}
                        </span>
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                            {step.title}
                        </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {step.desc}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                        {step.detail}
                    </p>
                </motion.div>
            </div>

            {/* VISUAL COMPONENT */}
            {/* Desktop: Side column. Mobile: Absolute background behind text */}
            <motion.div
                className={`
                    md:flex-1 w-full 
                    md:static absolute inset-0 md:inset-auto h-full md:h-[400px] 
                    rounded-2xl overflow-hidden 
                    md:border md:border-white/5 md:bg-[#0a0a0a]
                    pointer-events-none md:pointer-events-auto
                `}
                variants={{
                    offscreen: { opacity: 0, scale: 0.95 },
                    onscreen: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 1, ease: "easeOut" }
                    }
                }}
            >
                {/* On mobile: opacity low. On desktop: opacity high */}
                <div className="w-full h-full opacity-20 md:opacity-100">
                    <Visual />
                </div>
            </motion.div>

        </motion.div>
    );
}
