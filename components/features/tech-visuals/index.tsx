'use client';

import React from 'react';
import { motion } from 'framer-motion';

// --- 1. COMPUTER VISION (Yeşil/Cyan karelerle odak tespiti) ------------------
export const CVVisual = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-black/80 flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />

            {/* Face/Object Outline Simulation */}
            <div className="w-48 h-64 border-2 border-white/10 rounded-3xl relative">
                {/* Scanning Eye Boxes */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-12 h-8 border-2 border-cyan-500/80 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    animate={{ x: [0, 10, -5, 0], y: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                    <div className="absolute -top-4 left-0 text-[8px] text-cyan-500 font-mono">EYE_L: 0.98</div>
                </motion.div>

                <motion.div
                    className="absolute top-1/4 right-1/4 w-12 h-8 border-2 border-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    animate={{ x: [0, -5, 8, 0], y: [0, 3, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.8 }}
                >
                    <div className="absolute -top-4 left-0 text-[8px] text-green-500 font-mono">EYE_R: 0.99</div>
                </motion.div>

                {/* Tracking Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                    <motion.line x1="0" y1="50%" x2="100%" y2="50%" stroke="#06b6d4" strokeWidth="1" animate={{ y1: ["40%", "60%", "40%"], y2: ["40%", "60%", "40%"] }} transition={{ duration: 2, repeat: Infinity }} />
                    <motion.line x1="50%" y1="0" x2="50%" y2="100%" stroke="#06b6d4" strokeWidth="1" animate={{ x1: ["45%", "55%", "45%"], x2: ["45%", "55%", "45%"] }} transition={{ duration: 3, repeat: Infinity }} />
                </svg>
            </div>
        </div>
    );
};

// --- 2. PYTHON CORE (Merkezden dağılan sinir ağı) ----------------------------
export const PythonVisual = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-black/80 flex items-center justify-center">
            <svg className="w-full h-full p-8" viewBox="0 0 200 200">
                {/* Center Node */}
                <circle cx="100" cy="100" r="8" fill="#eab308" className="animate-pulse" />

                {/* Radiating Nodes */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.g key={i} transform={`rotate(${angle} 100 100)`}>
                        <motion.line
                            x1="100" y1="100" x2="160" y2="100"
                            stroke="#eab308" strokeWidth="1" strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        />
                        <motion.circle
                            cx="160" cy="100" r="4" fill="#3b82f6"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 + 0.5 }}
                        />
                        {/* Data Packets */}
                        <motion.circle
                            r="2" fill="#fff"
                            animate={{ cx: [100, 160], opacity: [1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                            cy="100"
                        />
                    </motion.g>
                ))}
            </svg>
        </div>
    );
};

// --- 3. BEHAVIORAL SCIENCE (Nabız atan soyut beyin) --------------------------
export const BehaviorVisual = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-black/80 flex items-center justify-center">
            <div className="relative">
                {/* Abstract Brain Shapes */}
                <motion.div
                    className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-80">
                    <motion.path
                        d="M 60 100 Q 60 50 100 50 Q 140 50 140 100 Q 140 150 100 150 Q 60 150 60 100 Z"
                        fill="none" stroke="#ec4899" strokeWidth="2"
                        animate={{
                            d: [
                                "M 60 100 Q 60 50 100 50 Q 140 50 140 100 Q 140 150 100 150 Q 60 150 60 100 Z",
                                "M 55 100 Q 55 45 100 45 Q 145 45 145 100 Q 145 155 100 155 Q 55 155 55 100 Z",
                                "M 60 100 Q 60 50 100 50 Q 140 50 140 100 Q 140 150 100 150 Q 60 150 60 100 Z"
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M 80 100 L 120 100 M 100 80 L 100 120"
                        stroke="#ec4899" strokeWidth="1"
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </svg>

                {/* Synapse Sparks */}
                <motion.div className="absolute top-10 right-10 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                <motion.div className="absolute bottom-12 left-12 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1 }} />
            </div>
        </div>
    );
};

// --- 4. SALIENCY MAP (Isı haritası efekti) -----------------------------------
export const SaliencyVisual = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-black/80 flex items-center justify-center">
            {/* Wireframe UI Background */}
            <div className="absolute inset-10 border border-gray-700/50 rounded-lg flex flex-col gap-2 p-2 opacity-50">
                <div className="h-4 w-1/3 bg-gray-700/50 rounded" />
                <div className="flex gap-2 h-32">
                    <div className="flex-1 bg-gray-700/30 rounded" />
                    <div className="w-1/3 bg-gray-700/30 rounded" />
                </div>
                <div className="h-8 w-full bg-gray-700/30 rounded mt-auto" />
            </div>

            {/* Heatmap Blobs - Moving and merging */}
            <motion.div
                className="absolute top-1/3 left-1/3 w-24 h-24 bg-red-500/60 blur-3xl rounded-full mix-blend-screen"
                animate={{ scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-yellow-500/50 blur-3xl rounded-full mix-blend-screen"
                animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 w-20 h-20 bg-blue-500/40 blur-3xl rounded-full mix-blend-screen"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </div>
    );
};

// --- 5. NEXT.JS (Modüler UI birleşimi) ---------------------------------------
export const NextVisual = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-black/80 flex items-center justify-center perspective-1000">
            <div className="relative w-48 h-64 transform-style-3d rotate-y-12 rotate-x-12">
                {/* Header Block */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-10 bg-white/10 border border-white/20 rounded-t-lg backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0 }}
                />
                {/* Sidebar Block */}
                <motion.div
                    className="absolute top-12 left-0 bottom-0 w-12 bg-white/5 border border-white/20 rounded-bl-lg backdrop-blur-sm"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />
                {/* Content Blocks */}
                <motion.div
                    className="absolute top-12 left-14 right-0 h-32 bg-white/5 border border-white/20 rounded-br-lg backdrop-blur-sm"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                />

                {/* SSR Flash */}
                <motion.div
                    className="absolute inset-0 bg-white/5 z-50 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.2, delay: 1 }}
                />
            </div>
        </div>
    );
};

// --- 6. FLUTTER (Merkezden cihazlara akış) -----------------------------------
export const FlutterVisual = () => {
    return (
        <div className="w-full h-full relative overflow-hidden bg-black/80 flex items-center justify-center">
            {/* Center Source Code */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-900/30 border border-cyan-500/50 rounded-lg flex items-center justify-center z-10">
                <div className="text-cyan-400 font-bold">{`{ }`}</div>
            </div>

            {/* Mobile Device */}
            <motion.div
                className="absolute top-10 left-10 w-20 h-36 border-2 border-gray-600 rounded-xl bg-gray-900/50"
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div className="w-full h-full bg-cyan-500/10" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            </motion.div>

            {/* Desktop Device */}
            <motion.div
                className="absolute bottom-10 right-10 w-40 h-24 border-2 border-gray-600 rounded-lg bg-gray-900/50"
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div className="w-full h-full bg-cyan-500/10" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.7 }} />
            </motion.div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line
                    x1="50%" y1="50%" x2="20%" y2="30%"
                    stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 5"
                    animate={{ strokeDashoffset: [0, -10] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.line
                    x1="50%" y1="50%" x2="80%" y2="70%"
                    stroke="#06b6d4" strokeWidth="2" strokeDasharray="5 5"
                    animate={{ strokeDashoffset: [0, -10] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </svg>
        </div>
    );
};
