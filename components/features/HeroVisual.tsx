'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Activity, Scan, Terminal } from 'lucide-react';

/* ══════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════ */
const HEATMAP_SPOTS = [
    { id: 'logo', x: '12%', y: '4%', size: 50, color: '#FBBF24', intensity: 0.55, label: 'Logo' },
    { id: 'cta-hero', x: '50%', y: '22%', size: 80, color: '#FF6B6B', intensity: 0.7, label: 'CTA' },
    { id: 'nav-center', x: '55%', y: '4%', size: 40, color: '#FBBF24', intensity: 0.35, label: 'Nav' },
    { id: 'card-1', x: '20%', y: '58%', size: 55, color: '#4ECDC4', intensity: 0.5, label: 'Card 1' },
    { id: 'card-2', x: '50%', y: '58%', size: 55, color: '#4ECDC4', intensity: 0.5, label: 'Card 2' },
    { id: 'card-3', x: '80%', y: '58%', size: 45, color: '#60A5FA', intensity: 0.4, label: 'Card 3' },
    { id: 'footer-cta', x: '50%', y: '88%', size: 65, color: '#FF6B6B', intensity: 0.6, label: 'Footer CTA' },
];

export default function HeroVisual() {
    const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);

    return (
        <div className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full rounded-2xl bg-[#080a0c]/95 border border-cyan-500/30 overflow-hidden backdrop-blur-xl shadow-2xl group"
            >
                {/* Scanlines / Grid Background */}
                <div className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                        backgroundSize: '100% 2px, 3px 100%'
                    }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

                {/* Header Chrome */}
                <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 mx-3 h-6 rounded bg-white/[0.04] flex items-center px-3 justify-between">
                        <span className="text-[10px] text-gray-400 font-mono tracking-tight">kognitect-analysis-engine-v2.4</span>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span className="text-[9px] text-cyan-500 font-bold uppercase tracking-wider">Live</span>
                        </div>
                    </div>
                </div>

                {/* Mockup Body */}
                <div className="relative z-10 p-4 h-[calc(100%-48px)]">
                    {/* Wireframe Wrapper */}
                    <div className="h-full flex flex-col gap-3">
                        {/* Navbar */}
                        <div className="flex items-center gap-2 h-[8%]">
                            <div className="w-8 h-5 rounded bg-white/10 border border-slate-700/50" />
                            <div className="flex-1" />
                            <div className="flex gap-2">
                                {[0, 1, 2, 3].map(i => <div key={i} className="w-8 h-2 rounded bg-white/5 border border-slate-700/50" />)}
                            </div>
                        </div>

                        {/* Hero */}
                        <div className="h-[28%] rounded-lg bg-white/5 flex flex-col items-center justify-center gap-2 border border-slate-600/60">
                            <div className="w-[60%] h-3 rounded bg-white/10" />
                            <div className="w-[40%] h-2 rounded bg-white/5" />
                            <div className="w-24 h-8 rounded-md bg-cyan-500/20 mt-2 border border-cyan-500/20" />
                        </div>

                        {/* Content */}
                        <div className="h-[24%] grid grid-cols-3 gap-3">
                            {[0, 1, 2].map(i => (
                                <div key={i} className="rounded-lg bg-white/5 border border-slate-700/60 p-2 flex flex-col gap-1">
                                    <div className="w-6 h-6 rounded bg-white/10" />
                                    <div className="w-full h-1.5 rounded bg-white/5" />
                                    <div className="w-3/4 h-1.5 rounded bg-white/5" />
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex-1 rounded-lg bg-white/5 border border-slate-700/50" />
                    </div>

                    {/* Heatmap Spots */}
                    {HEATMAP_SPOTS.map((spot) => (
                        <motion.div
                            key={spot.id}
                            className="absolute rounded-full cursor-pointer mix-blend-screen"
                            style={{
                                left: spot.x, top: `calc(48px + ${spot.y})`,
                                width: spot.size, height: spot.size,
                                transform: 'translate(-50%, -50%)',
                                background: `radial-gradient(circle, ${spot.color}${Math.round(spot.intensity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
                                filter: 'blur(8px)',
                                zIndex: 10,
                            }}
                            animate={{
                                opacity: [0.4, 0.8, 0.4],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
                            onMouseEnter={() => setHoveredSpot(spot.id)}
                            onMouseLeave={() => setHoveredSpot(null)}
                        />
                    ))}

                    {/* Scanning Line */}
                    <motion.div
                        className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, #4ECDC4 40%, #fff 50%, #4ECDC4 60%, transparent 100%)',
                            boxShadow: '0 0 15px 2px rgba(78,205,196,0.5)',
                        }}
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Slow looping scanline */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[20%]"
                        animate={{ top: ['-20%', '120%'] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Floating Info Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 flex items-center justify-between z-30 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    >
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-mono uppercase">Attention Score</span>
                            <span className="text-xl font-bold text-cyan-400 font-mono drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">84/100</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1.5">
                                <Activity className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] text-emerald-400 font-mono uppercase">Optimized</span>
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono">Cognitive Load: Low</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 border border-dashed border-cyan-500/20 rounded-full z-0 opacity-50"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-5 -left-5 w-24 h-24 border border-dashed border-purple-500/20 rounded-full z-0 opacity-50"
            />
        </div>
    );
}
