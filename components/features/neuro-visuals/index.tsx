'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

// --- 1. SCANLINE VISUAL (Bilişsel Tanı) -------------------------------------
export const ScanlineVisual = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-black/40 rounded-xl border border-white/5">
            {/* Background Heatmap Blobs - Static mostly, subtle pulse */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" style={{ animationDuration: '4s' }} />

            {/* Moving Scanline */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        </div>
    );
};

// --- 2. NETWORK VISUAL (Davranışsal Mimari) ----------------------------------
export const NetworkVisual = () => {
    return (
        <div className="w-full h-full relative flex items-center justify-center bg-black/40 rounded-xl border border-white/5 overflow-hidden">
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 200">
                {/* Background Nodes */}
                <circle cx="40" cy="40" r="2" fill="#333" />
                <circle cx="160" cy="50" r="2" fill="#333" />
                <circle cx="30" cy="150" r="2" fill="#333" />
                <circle cx="170" cy="160" r="2" fill="#333" />
                <circle cx="100" cy="100" r="3" fill="#444" />

                {/* Faint Connections */}
                <line x1="40" y1="40" x2="100" y2="100" stroke="#222" strokeWidth="1" />
                <line x1="160" y1="50" x2="100" y2="100" stroke="#222" strokeWidth="1" />
                <line x1="30" y1="150" x2="100" y2="100" stroke="#222" strokeWidth="1" />
                <line x1="170" y1="160" x2="100" y2="100" stroke="#222" strokeWidth="1" />

                {/* Path of Least Resistance (Active Path) */}
                <motion.path
                    d="M 20 100 Q 60 40 100 100 T 180 100"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray="0 1"
                    animate={{ pathLength: [0, 1], opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Active Nodes along path */}
                <motion.circle cx="20" cy="100" r="3" fill="#06b6d4" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="100" cy="100" r="3" fill="#06b6d4" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                <motion.circle cx="180" cy="100" r="3" fill="#06b6d4" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 2 }} />
            </svg>
        </div>
    );
};

// --- 3. FOVEAL VISUAL (Nöro-Prototipleme) ------------------------------------
export const FovealVisual = () => {
    return (
        <div className="w-full h-full relative flex items-center justify-center bg-black/40 rounded-xl border border-white/5 overflow-hidden">
            {/* Concentric Pulses simulating Eye Focus */}
            <div className="relative">
                <motion.div
                    className="absolute inset-0 border border-cyan-500/30 rounded-full"
                    style={{ width: 120, height: 120, top: -60, left: -60 }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute inset-0 border border-cyan-500/60 rounded-full"
                    style={{ width: 60, height: 60, top: -30, left: -30 }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                />
                <motion.div
                    className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md"
                    style={{ width: 20, height: 20, top: -10, left: -10 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </div>
            {/* Crosshair */}
            <div className="absolute w-full h-px bg-white/5" />
            <div className="absolute h-full w-px bg-white/5" />
        </div>
    );
};

// --- 4. CODE WATERFALL VISUAL (Bilişsel Mühendislik) -------------------------
export const CodeWaterfallVisual = () => {
    // Generate random code snippets
    const snippets = [
        "import numpy as np", "def process_neuro_data(x):", "return x * weights", "useEffect(() => {",
        "const synapse = new Node()", "await optimize(tensor)", "if (threshold > 0.9):"
    ];

    return (
        <div className="w-full h-full relative overflow-hidden bg-black/40 rounded-xl border border-white/5 font-mono text-[10px] p-4 text-cyan-500/40">
            {snippets.map((txt, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: [0, 200], opacity: [0, 1, 0] }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                    className="whitespace-nowrap mb-2"
                >
                    {txt}
                </motion.div>
            ))}
        </div>
    );
};

// --- 5. OPTIMIZATION CURVE VISUAL (Sürekli Optimizasyon) ---------------------
export const OptimizationCurveVisual = () => {
    return (
        <div className="w-full h-full relative flex items-center justify-center bg-black/40 rounded-xl border border-white/5 overflow-hidden">
            <svg className="w-full h-full px-4 py-8" viewBox="0 0 200 100" preserveAspectRatio="none">
                {/* Base Line */}
                <line x1="0" y1="80" x2="200" y2="80" stroke="#333" strokeWidth="1" />

                {/* The Optimization Curve */}
                {/* Starts jagged, becomes smooth and high */}
                <motion.path
                    d="M 0 80 L 20 70 L 40 85 L 60 60 L 80 75 Q 120 80 140 40 T 200 10"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false }} // Re-animate on scroll
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Gradient Area under curve (Optional, hard to animate path d but can fade in) */}
                <motion.path
                    d="M 0 80 L 20 70 L 40 85 L 60 60 L 80 75 Q 120 80 140 40 T 200 10 V 100 H 0 Z"
                    fill="url(#gradient)"
                    opacity="0.2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    transition={{ delay: 1, duration: 1 }}
                />

                <defs>
                    <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
