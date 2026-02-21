'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ContactVisual() {
    return (
        <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Grain/Grid */}
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />

            {/* Animated Nodes and Connections */}
            <div className="relative w-full h-full">
                {/* Orbital Rings */}
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={`ring-${ring}`}
                        className="absolute left-1/2 top-1/2 rounded-full border border-emerald-500/10"
                        style={{
                            width: ring * 120,
                            height: ring * 120,
                            x: '-50%',
                            y: '-50%',
                        }}
                        animate={{
                            rotate: ring % 2 === 0 ? 360 : -360,
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            rotate: { duration: 20 + ring * 10, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />
                ))}

                {/* Floating "Neural" Particles */}
                {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const radius = 80 + Math.random() * 100;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <motion.div
                            key={`node-${i}`}
                            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                            initial={{ x, y, opacity: 0 }}
                            animate={{
                                x: [x, x + (Math.random() - 0.5) * 40, x],
                                y: [y, y + (Math.random() - 0.5) * 40, y],
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 2
                            }}
                        />
                    );
                })}

                {/* Core Pulse */}
                <motion.div
                    className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,1)]"
                    style={{ x: '-50%', y: '-50%' }}
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 1, 0.5],
                        boxShadow: [
                            '0 0 20px rgba(16,185,129,0.5)',
                            '0 0 50px rgba(16,185,129,0.8)',
                            '0 0 20px rgba(16,185,129,0.5)'
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Sweeping Highlight */}
                <motion.div
                    className="absolute left-1/2 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
                    style={{ width: '200%', x: '-50%', y: '-50%' }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
    );
}
