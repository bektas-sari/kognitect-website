'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// ─── Styled text parser ────────────────────────────────────────────
function renderStyledText(text: string) {
    return text.split(/(\{\{h\}\}.*?\{\{\/h\}\})/g).map((part, i) => {
        if (part.startsWith('{{h}}'))
            return (
                <span key={i} className="text-cyan-400 font-semibold">
                    {part.replace(/\{\{h\}\}|\{\{\/h\}\}/g, '')}
                </span>
            );
        return <span key={i}>{part}</span>;
    });
}

// ─── 1. Bell Curve (Bilimsel Validasyon) ────────────────────────────
const BellCurveAnimation = () => {
    const points = Array.from({ length: 60 }, (_, i) => {
        const x = (i / 59) * 100;
        const t = (i - 30) / 10;
        const y = 85 - 70 * Math.exp((-t * t) / 2);
        return `${x},${y}`;
    });
    const pathData = `M ${points.join(' L ')}`;

    return (
        <div className="relative w-full h-full flex items-center justify-center p-6">
            {/* Grid background */}
            <div className="absolute inset-4 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }} />
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[320px]" preserveAspectRatio="xMidYMid meet">
                {/* Filled area */}
                <motion.path
                    d={`${pathData} L 100,85 L 0,85 Z`}
                    fill="url(#bellGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />
                {/* Curve line */}
                <motion.path
                    d={pathData}
                    fill="none"
                    stroke="rgb(34,211,238)"
                    strokeWidth="0.8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                    filter="url(#glow)"
                />
                {/* Mean line */}
                <motion.line
                    x1="50" y1="15" x2="50" y2="85"
                    stroke="rgba(34,211,238,0.4)"
                    strokeWidth="0.3"
                    strokeDasharray="2,2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                />
                {/* Sigma markers */}
                {[20, 35, 65, 80].map((x, i) => (
                    <motion.line
                        key={i} x1={x} y1="83" x2={x} y2="87"
                        stroke="rgba(34,211,238,0.3)" strokeWidth="0.3"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 + i * 0.1 }}
                    />
                ))}
                {/* Data dots on curve */}
                {[15, 25, 35, 45, 50, 55, 65, 75, 85].map((pct, i) => {
                    const idx = Math.round((pct / 100) * 59);
                    const [cx, cy] = points[idx].split(',').map(Number);
                    return (
                        <motion.circle
                            key={i} cx={cx} cy={cy} r="1"
                            fill="rgb(34,211,238)"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.8, scale: 1 }}
                            transition={{ delay: 2 + i * 0.1 }}
                        />
                    );
                })}
                <defs>
                    <linearGradient id="bellGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(6,182,212)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="rgb(6,182,212)" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
            </svg>
            {/* Labels */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-between px-8 text-[9px] font-bold text-cyan-600/50">
                <span>-3σ</span><span>-1σ</span><span>μ</span><span>+1σ</span><span>+3σ</span>
            </div>
            <motion.div
                className="absolute top-6 right-6 text-[10px] font-bold text-cyan-400"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
            >
                p &lt; 0.05 ✓
            </motion.div>
        </div>
    );
};

// ─── 2. Heatmap (Nöro-Tasarım) ─────────────────────────────────────
const HeatmapAnimation = () => {
    const hotspots = [
        { x: 25, y: 20, color: 'rgba(239,68,68,0.7)', size: 28, delay: 0.5 },
        { x: 50, y: 35, color: 'rgba(6,182,212,0.6)', size: 35, delay: 0.8 },
        { x: 70, y: 25, color: 'rgba(234,179,8,0.5)', size: 22, delay: 1.1 },
        { x: 35, y: 60, color: 'rgba(6,182,212,0.5)', size: 26, delay: 1.4 },
        { x: 65, y: 70, color: 'rgba(239,68,68,0.6)', size: 30, delay: 1.7 },
        { x: 80, y: 55, color: 'rgba(234,179,8,0.4)', size: 18, delay: 2.0 },
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Wireframe skeleton */}
            <div className="absolute inset-8 border border-white/10 rounded-lg">
                {/* Header bar */}
                <div className="h-8 border-b border-white/10 flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                {/* Nav bar */}
                <div className="h-6 border-b border-white/5 flex items-center px-4 gap-6">
                    {[20, 16, 24, 14].map((w, i) => (
                        <div key={i} className="h-1.5 rounded bg-white/10" style={{ width: `${w}px` }} />
                    ))}
                </div>
                {/* Content blocks */}
                <div className="p-4 space-y-3">
                    <div className="h-2 w-3/4 rounded bg-white/8" />
                    <div className="h-2 w-1/2 rounded bg-white/5" />
                    <div className="h-16 w-full rounded bg-white/3 mt-4" />
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        <div className="h-10 rounded bg-white/5" />
                        <div className="h-10 rounded bg-white/5" />
                        <div className="h-10 rounded bg-white/5" />
                    </div>
                    <div className="h-2 w-2/3 rounded bg-white/5 mt-3" />
                    <div className="h-6 w-24 rounded bg-white/8 mt-2" />
                </div>
            </div>

            {/* Heatmap hotspots */}
            {hotspots.map((spot, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${spot.x}%`, top: `${spot.y}%`,
                        width: spot.size, height: spot.size,
                        background: `radial-gradient(circle, ${spot.color}, transparent 70%)`,
                        transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.8, 0.4, 0.8],
                        scale: [0, 1.2, 0.9, 1.1],
                    }}
                    transition={{
                        delay: spot.delay,
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />
            ))}

            {/* Scan line */}
            <motion.div
                className="absolute left-8 right-8 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)' }}
                initial={{ top: '15%' }}
                animate={{ top: '85%' }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            />

            <motion.div
                className="absolute bottom-4 right-6 text-[10px] font-bold text-cyan-500/70"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            >
                Göz İzleme: Aktif
            </motion.div>
        </div>
    );
};

// ─── 3. Funnel (Kârlılık Analizi) ───────────────────────────────────
const FunnelAnimation = () => {
    const funnelSteps = [
        { label: 'Visitors', width: 90, color: 'rgba(6,182,212,0.3)', value: '12,450' },
        { label: 'Engaged', width: 72, color: 'rgba(6,182,212,0.4)', value: '8,920' },
        { label: 'Intent', width: 50, color: 'rgba(6,182,212,0.5)', value: '4,180' },
        { label: 'Convert', width: 32, color: 'rgba(34,211,238,0.6)', value: '2,340' },
    ];

    const [roiValue, setRoiValue] = useState(0);

    useEffect(() => {
        const target = 247;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setRoiValue(target);
                clearInterval(timer);
            } else {
                setRoiValue(Math.round(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 gap-2">
            {/* Funnel bars */}
            {funnelSteps.map((step, i) => (
                <motion.div
                    key={i}
                    className="relative flex items-center justify-center rounded-lg overflow-hidden"
                    style={{ width: `${step.width}%`, height: '44px', background: step.color, border: '1px solid rgba(6,182,212,0.2)' }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.3 + i * 0.25, duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="flex items-center justify-between w-full px-3">
                        <span className="text-[10px] font-mono text-cyan-300/80 uppercase tracking-wider">{step.label}</span>
                        <motion.span
                            className="text-[11px] text-white/70 font-bold"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 + i * 0.25 }}
                        >
                            {step.value}
                        </motion.span>
                    </div>
                    {/* Shimmer */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ delay: 1.5 + i * 0.3, duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
                    />
                </motion.div>
            ))}

            {/* Connecting lines between bars */}
            {[0, 1, 2].map(i => (
                <motion.div
                    key={`line-${i}`}
                    className="w-[1px] h-2 bg-cyan-500/20"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.25 }}
                />
            ))}

            {/* ROI Counter */}
            <motion.div
                className="absolute bottom-6 right-6 text-right"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">ROI</div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                    +{roiValue}%
                </div>
            </motion.div>

            {/* Conversion rate */}
            <motion.div
                className="absolute top-6 left-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Conv. Rate</div>
                <div className="text-lg font-bold text-cyan-400 font-mono">18.8%</div>
            </motion.div>
        </div>
    );
};

// ─── 4. Neural Network (Marka Stratejisi) ───────────────────────────
const NeuralNetworkAnimation = () => {
    const nodes = [
        { x: 50, y: 15, size: 6, label: 'Brand' },
        { x: 20, y: 35, size: 4.5 }, { x: 50, y: 38, size: 5 }, { x: 80, y: 33, size: 4.5 },
        { x: 12, y: 58, size: 3.5 }, { x: 38, y: 60, size: 4 }, { x: 62, y: 57, size: 4 }, { x: 88, y: 60, size: 3.5 },
        { x: 25, y: 80, size: 3 }, { x: 50, y: 82, size: 3.5 }, { x: 75, y: 80, size: 3 },
    ];
    const edges = [
        [0, 1], [0, 2], [0, 3],
        [1, 4], [1, 5], [2, 5], [2, 6], [3, 6], [3, 7],
        [4, 8], [5, 8], [5, 9], [6, 9], [6, 10], [7, 10],
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[320px]">
                <defs>
                    <filter id="nodeGlow">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {/* Edges */}
                {edges.map(([a, b], i) => (
                    <motion.line
                        key={`edge-${i}`}
                        x1={nodes[a].x} y1={nodes[a].y}
                        x2={nodes[b].x} y2={nodes[b].y}
                        stroke="rgba(6,182,212,0.2)"
                        strokeWidth="0.3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                    />
                ))}

                {/* Pulse signals along edges */}
                {edges.map(([a, b], i) => (
                    <motion.circle
                        key={`pulse-${i}`}
                        r="0.8"
                        fill="rgb(34,211,238)"
                        filter="url(#nodeGlow)"
                        initial={{ opacity: 0 }}
                        animate={{
                            cx: [nodes[a].x, nodes[b].x],
                            cy: [nodes[a].y, nodes[b].y],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            delay: 2 + i * 0.3,
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 3 + Math.random() * 2,
                        }}
                    />
                ))}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <motion.g key={`node-${i}`}>
                        {/* Outer glow */}
                        <motion.circle
                            cx={node.x} cy={node.y} r={node.size * 1.5}
                            fill="rgba(6,182,212,0.05)"
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 3, repeat: Infinity }}
                        />
                        {/* Node circle */}
                        <motion.circle
                            cx={node.x} cy={node.y} r={node.size / 2}
                            fill="rgba(3,7,10,0.8)"
                            stroke="rgb(6,182,212)"
                            strokeWidth="0.4"
                            filter="url(#nodeGlow)"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                        />
                        {/* Inner dot */}
                        <motion.circle
                            cx={node.x} cy={node.y} r={node.size / 5}
                            fill="rgb(34,211,238)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ delay: 1 + i * 0.1, duration: 2, repeat: Infinity }}
                        />
                    </motion.g>
                ))}

                {/* Label for root node */}
                <motion.text
                    x={nodes[0].x} y={nodes[0].y - 5}
                    textAnchor="middle" fontSize="3.5" fill="rgba(34,211,238,0.7)" fontWeight="bold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                >
                    FOKUS
                </motion.text>
            </svg>
        </div>
    );
};

// ─── 5. UX Scan (UX Röntgen) ────────────────────────────────────────
const UXScanAnimation = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Wireframe */}
            <div className="absolute inset-8 border border-white/10 rounded-lg">
                <div className="h-6 border-b border-white/10 flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <div className="p-4 space-y-3">
                    <div className="h-3 w-1/2 rounded bg-white/8" />
                    <div className="h-2 w-3/4 rounded bg-white/5" />
                    <div className="h-20 w-full rounded bg-white/3 mt-3" />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="h-12 rounded bg-white/5" />
                        <div className="h-12 rounded bg-white/5" />
                    </div>
                    <div className="h-8 w-28 rounded bg-white/8 mt-2" />
                </div>
            </div>

            {/* X-Ray scan beam */}
            <motion.div
                className="absolute left-8 right-8 h-12"
                style={{
                    background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.15), rgba(6,182,212,0.3), rgba(6,182,212,0.15), transparent)',
                    borderTop: '1px solid rgba(6,182,212,0.4)',
                    borderBottom: '1px solid rgba(6,182,212,0.4)',
                }}
                initial={{ top: '8%' }}
                animate={{ top: '80%' }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            />

            {/* Detection markers */}
            {[
                { x: 30, y: 45, delay: 1.5 },
                { x: 65, y: 55, delay: 2.2 },
                { x: 45, y: 72, delay: 2.8 },
            ].map((m, i) => (
                <motion.div
                    key={i}
                    className="absolute w-6 h-6 border-2 border-red-500/60 rounded"
                    style={{ left: `${m.x}%`, top: `${m.y}%`, transform: 'translate(-50%, -50%)' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0.6, 1], scale: [0, 1.2, 1, 1] }}
                    transition={{ delay: m.delay, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
            ))}

            <motion.div
                className="absolute top-4 right-6 text-[10px] font-bold text-cyan-500/70"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            >
                Tarama Hazırlanıyor...
            </motion.div>
        </div>
    );
};

// ─── 6. Bottleneck (Darboğaz Teşhisi) ──────────────────────────────
const BottleneckAnimation = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-6">
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[300px]">
                {/* Wide entry */}
                <motion.rect x="10" y="5" width="80" height="12" rx="2" fill="rgba(6,182,212,0.2)" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
                {/* Narrowing paths */}
                <motion.path d="M 10,17 L 30,35 L 70,35 L 90,17" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 1 }} />
                {/* Bottleneck */}
                <motion.rect x="30" y="35" width="40" height="10" rx="2" fill="rgba(239,68,68,0.25)" stroke="rgba(239,68,68,0.4)" strokeWidth="0.5"
                    initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6, 1] }} transition={{ delay: 0.8, duration: 2, repeat: Infinity }} />
                {/* Exit paths */}
                <motion.path d="M 30,45 L 15,60 L 85,60 L 70,45" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1 }} />
                {/* Wide exit */}
                <motion.rect x="15" y="60" width="70" height="12" rx="2" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
                {/* Flow particles */}
                {[25, 40, 50, 60, 75].map((startX, i) => (
                    <motion.circle key={i} r="1" fill="rgb(34,211,238)"
                        initial={{ cx: startX, cy: 5, opacity: 0 }}
                        animate={{ cx: [startX, 50, 50, startX < 50 ? 30 : 70, startX], cy: [5, 35, 45, 60, 75], opacity: [0, 0.8, 0.3, 0.8, 0] }}
                        transition={{ delay: 1.5 + i * 0.4, duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    />
                ))}
                {/* Drop-off label */}
                <motion.text x="78" y="42" fontSize="3.5" fill="rgba(239,68,68,0.7)" fontWeight="bold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                    -67%
                </motion.text>
            </svg>
        </div>
    );
};

// ─── 7. Cognitive Load Gauge (Bilişsel Yük Analizi) ─────────────────
const CognitiveLoadAnimation = () => {
    const segments = 12;
    return (
        <div className="relative w-full h-full flex items-center justify-center p-6">
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[280px]">
                {/* Gauge arc segments */}
                {Array.from({ length: segments }, (_, i) => {
                    const angle = -210 + (i * 240) / segments;
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 50 + 35 * Math.cos(rad);
                    const y1 = 55 + 35 * Math.sin(rad);
                    const x2 = 50 + 30 * Math.cos(rad);
                    const y2 = 55 + 30 * Math.sin(rad);
                    const progress = i / segments;
                    const color = progress < 0.4 ? 'rgba(52,211,153,0.7)' : progress < 0.7 ? 'rgba(234,179,8,0.7)' : 'rgba(239,68,68,0.7)';
                    return (
                        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" strokeLinecap="round"
                            initial={{ opacity: 0 }} animate={{ opacity: i <= 8 ? 1 : 0.2 }}
                            transition={{ delay: 0.1 * i, duration: 0.3 }} />
                    );
                })}
                {/* Needle */}
                <motion.line x1="50" y1="55" x2="50" y2="25" stroke="white" strokeWidth="0.8" strokeLinecap="round"
                    style={{ transformOrigin: '50px 55px' }}
                    initial={{ rotate: -120 }} animate={{ rotate: [- 120, 30, -10, 20] }}
                    transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }} />
                {/* Center dot */}
                <circle cx="50" cy="55" r="2" fill="white" />
                {/* Labels */}
                <motion.text x="18" y="78" fontSize="3" fill="rgba(52,211,153,0.6)" fontWeight="bold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>DÜŞÜK</motion.text>
                <motion.text x="75" y="78" fontSize="3" fill="rgba(239,68,68,0.6)" fontWeight="bold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>YÜKSEK</motion.text>
                <motion.text x="50" y="90" textAnchor="middle" fontSize="3.5" fill="rgba(6,182,212,0.7)" fontWeight="bold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>Bilişsel Yük Skoru: 6.2</motion.text>
            </svg>
        </div>
    );
};

// ─── 8. A/B Test (Dönüşüm Optimizasyonu) ───────────────────────────
const ConversionTestAnimation = () => {
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);

    useEffect(() => {
        const targetA = 3.2, targetB = 5.8;
        const steps = 40;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            setCountA(parseFloat((targetA * (step / steps)).toFixed(1)));
            setCountB(parseFloat((targetB * (step / steps)).toFixed(1)));
            if (step >= steps) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8 gap-6">
            {/* Variant A */}
            <motion.div className="w-full" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex justify-between mb-1">
                    <span className="text-[11px] font-mono text-gray-400">Variant A (Control)</span>
                    <span className="text-[11px] font-mono text-gray-400">{countA}%</span>
                </div>
                <div className="h-8 w-full bg-white/5 rounded-lg overflow-hidden relative">
                    <motion.div className="h-full bg-gradient-to-r from-gray-600/40 to-gray-500/30 rounded-lg"
                        initial={{ width: '0%' }} animate={{ width: '32%' }} transition={{ delay: 0.5, duration: 1.5 }} />
                </div>
            </motion.div>

            {/* VS divider */}
            <div className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest">vs</div>

            {/* Variant B */}
            <motion.div className="w-full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <div className="flex justify-between mb-1">
                    <span className="text-[11px] font-mono text-cyan-400">Variant B (Test)</span>
                    <span className="text-[11px] font-mono text-emerald-400">{countB}%</span>
                </div>
                <div className="h-8 w-full bg-white/5 rounded-lg overflow-hidden relative">
                    <motion.div className="h-full bg-gradient-to-r from-cyan-600/40 to-emerald-500/30 rounded-lg"
                        initial={{ width: '0%' }} animate={{ width: '58%' }} transition={{ delay: 0.8, duration: 1.5 }} />
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ delay: 2.5, duration: 1.5, repeat: Infinity, repeatDelay: 3 }} />
                </div>
            </motion.div>

            {/* Result badge */}
            <motion.div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5 }}>
                +81.3% uplift · p &lt; 0.01 ✓
            </motion.div>
        </div>
    );
};

// ─── 9. Workflow (n8n Otomasyon) ─────────────────────────────────────
const WorkflowAnimation = () => {
    const nodes = [
        { x: 10, y: 50, label: 'CRM' },
        { x: 30, y: 25, label: 'Mail' },
        { x: 30, y: 75, label: 'DB' },
        { x: 55, y: 50, label: 'n8n' },
        { x: 80, y: 30, label: 'Slack' },
        { x: 80, y: 70, label: 'Sheet' },
    ];
    const flows = [[0, 3], [1, 3], [2, 3], [3, 4], [3, 5]];
    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[320px]">
                {/* Connections */}
                {flows.map(([a, b], i) => (
                    <motion.line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
                        stroke="rgba(6,182,212,0.25)" strokeWidth="0.5" strokeDasharray="2,2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 + i * 0.2 }} />
                ))}
                {/* Flow pulses */}
                {flows.map(([a, b], i) => (
                    <motion.circle key={`p-${i}`} r="1.2" fill="rgb(34,211,238)"
                        initial={{ opacity: 0 }}
                        animate={{ cx: [nodes[a].x, nodes[b].x], cy: [nodes[a].y, nodes[b].y], opacity: [0, 1, 0] }}
                        transition={{ delay: 1.5 + i * 0.5, duration: 1, repeat: Infinity, repeatDelay: 2 }}
                    />
                ))}
                {/* Nodes */}
                {nodes.map((n, i) => (
                    <motion.g key={i}>
                        <motion.rect x={n.x - 8} y={n.y - 6} width="16" height="12" rx="2"
                            fill={i === 3 ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.05)'}
                            stroke={i === 3 ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.15)'} strokeWidth="0.5"
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.15, type: 'spring' }} />
                        <motion.text x={n.x} y={n.y + 1.5} textAnchor="middle" fontSize="3" fill={i === 3 ? 'rgb(34,211,238)' : 'rgba(255,255,255,0.5)'} fontFamily="monospace"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.15 }}>
                            {n.label}
                        </motion.text>
                    </motion.g>
                ))}
            </svg>
        </div>
    );
};

// ─── 10. Terminal (Python Scriptleri) ────────────────────────────────
const TerminalAnimation = () => {
    const lines = [
        { text: 'Veri kümesi yükleniyor...', color: 'text-emerald-400', delay: 0.3 },
        { text: '12,450 satır işleniyor...', color: 'text-zinc-500', delay: 0.8 },
        { text: 'ML pipeline aktif ediliyor...', color: 'text-zinc-500', delay: 1.4 },
        { text: 'Bilişsel modelleme çalışıyor...', color: 'text-white font-medium', delay: 2.0 },
        { text: 'Model doğruluğu: %94.7', color: 'text-emerald-400 font-bold', delay: 2.8 },
        { text: 'Analiz raporu oluşturuldu', color: 'text-emerald-400', delay: 3.4 },
    ];
    return (
        <div className="relative w-full h-full flex items-center justify-center p-6">
            <div className="w-full max-w-[300px] bg-[#080a0c] rounded-xl border border-emerald-500/10 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="h-8 bg-white/[0.02] border-b border-white/[0.04] flex items-center px-4 gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
                    <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Bilişsel Analiz</span>
                </div>
                {/* Body */}
                <div className="p-4 space-y-2 text-[11px]">
                    {lines.map((line, i) => (
                        <motion.div key={i} className={line.color}
                            initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: line.delay, duration: 0.3 }}>
                            {line.text}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── 11. Cost Reduction (Maliyet Optimizasyonu) ─────────────────────
const CostReductionAnimation = () => {
    const months = ['Q1', 'Q2', 'Q3', 'Q4'];
    const values = [85, 62, 40, 22];
    return (
        <div className="relative w-full h-full flex items-center justify-center p-6">
            <svg viewBox="0 0 100 80" className="w-full h-full max-w-[300px]">
                {/* Bars */}
                {months.map((m, i) => {
                    const x = 12 + i * 22;
                    const height = values[i] * 0.6;
                    const y = 65 - height;
                    const color = i < 2 ? 'rgba(239,68,68,0.4)' : 'rgba(52,211,153,0.4)';
                    const stroke = i < 2 ? 'rgba(239,68,68,0.6)' : 'rgba(52,211,153,0.6)';
                    return (
                        <motion.g key={i}>
                            <motion.rect x={x} y={y} width="14" height={height} rx="2" fill={color} stroke={stroke} strokeWidth="0.5"
                                initial={{ height: 0, y: 65 }} animate={{ height, y }}
                                transition={{ delay: 0.3 + i * 0.25, duration: 0.8, ease: 'easeOut' }} />
                            <motion.text x={x + 7} y={y - 3} textAnchor="middle" fontSize="3" fontFamily="monospace"
                                fill={i < 2 ? 'rgba(239,68,68,0.7)' : 'rgba(52,211,153,0.7)'}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.25 }}>
                                ${values[i]}k
                            </motion.text>
                            <text x={x + 7} y={72} textAnchor="middle" fontSize="3" fill="rgba(255,255,255,0.3)" fontFamily="monospace">{m}</text>
                        </motion.g>
                    );
                })}
                {/* Trend line */}
                <motion.path d="M 19,14 L 41,28 L 63,41 L 85,52" fill="none" stroke="rgba(52,211,153,0.5)" strokeWidth="0.5" strokeDasharray="2,1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 1.5 }} />
                {/* Baseline */}
                <line x1="8" y1="65" x2="95" y2="65" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
            </svg>
            <motion.div className="absolute bottom-6 right-6 text-right"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                <div className="text-[10px] font-mono text-gray-500">Savings</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">-74%</div>
            </motion.div>
        </div>
    );
};

// ─── 12. System Integration (Sistem Entegrasyonu) ───────────────────
const SystemIntegrationAnimation = () => {
    const systems = [
        { x: 15, y: 20, label: 'ERP' },
        { x: 85, y: 20, label: 'CRM' },
        { x: 15, y: 80, label: 'Pay' },
        { x: 85, y: 80, label: 'Log' },
        { x: 50, y: 50, label: 'API' },
    ];
    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[300px]">
                {/* Connections to center */}
                {[0, 1, 2, 3].map(i => (
                    <motion.line key={i} x1={systems[i].x} y1={systems[i].y} x2={50} y2={50}
                        stroke="rgba(6,182,212,0.2)" strokeWidth="0.5" strokeDasharray="3,2"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }} />
                ))}
                {/* Data pulses */}
                {[0, 1, 2, 3].map(i => (
                    <motion.circle key={`dp-${i}`} r="1" fill="rgb(34,211,238)"
                        animate={{
                            cx: [systems[i].x, 50, systems[i].x],
                            cy: [systems[i].y, 50, systems[i].y],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{ delay: 2 + i * 0.6, duration: 2, repeat: Infinity, repeatDelay: 2 }}
                    />
                ))}
                {/* System boxes */}
                {systems.map((s, i) => (
                    <motion.g key={i}>
                        <motion.rect x={s.x - 9} y={s.y - 7} width="18" height="14" rx="3"
                            fill={i === 4 ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.04)'}
                            stroke={i === 4 ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.15)'} strokeWidth="0.5"
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.15, type: 'spring' }} />
                        <motion.text x={s.x} y={s.y + 1.5} textAnchor="middle" fontSize="3.5"
                            fill={i === 4 ? 'rgb(34,211,238)' : 'rgba(255,255,255,0.5)'} fontFamily="monospace" fontWeight={i === 4 ? 'bold' : 'normal'}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.15 }}>
                            {s.label}
                        </motion.text>
                    </motion.g>
                ))}
                {/* Center glow */}
                <motion.circle cx="50" cy="50" r="12" fill="rgba(6,182,212,0.03)"
                    animate={{ r: [12, 16, 12] }} transition={{ duration: 3, repeat: Infinity }} />
            </svg>
        </div>
    );
};

// ─── Animation map ──────────────────────────────────────────────────
const ANIMATION_MAP: Record<string, React.FC> = {
    // Card 1
    'bilimsel-validasyon': BellCurveAnimation,
    'noro-tasarim': HeatmapAnimation,
    'karlilik-analizi': FunnelAnimation,
    'marka-stratejisi': NeuralNetworkAnimation,
    // Card 2
    'ux-rontgen': UXScanAnimation,
    'darbogaz-teshisi': BottleneckAnimation,
    'bilissel-yuk-analizi': CognitiveLoadAnimation,
    'donusum-optimizasyonu': ConversionTestAnimation,
    // Card 3
    'n8n-otomasyon': WorkflowAnimation,
    'python-scriptleri': TerminalAnimation,
    'maliyet-optimizasyonu': CostReductionAnimation,
    'sistem-entegrasyonu': SystemIntegrationAnimation,
};

// ─── Modal Component ────────────────────────────────────────────────
interface ServiceModalProps {
    modalId: string | null;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ modalId, onClose }) => {
    const { t, accent } = useLanguage();
    const modals = t.services?.modals || [];
    const [expandedStep, setExpandedStep] = useState<number | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (modalId) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            setExpandedStep(null);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [modalId, handleKeyDown]);

    const data = modals.find((m: { id: string }) => m.id === modalId);
    if (!data) return null;

    const AnimationComponent = ANIMATION_MAP[modalId || ''];

    return (
        <AnimatePresence>
            {modalId && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal body */}
                    <motion.div
                        className="relative w-full max-w-5xl rounded-2xl overflow-hidden"
                        style={{
                            backgroundColor: 'rgb(3,7,14)',
                            border: '1px solid rgba(6,182,212,0.2)',
                            boxShadow: '0 0 60px rgba(6,182,212,0.08), 0 25px 50px rgba(0,0,0,0.5)',
                        }}
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Top accent */}
                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/40 transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="grid md:grid-cols-2 min-h-[400px]">
                            {/* Left: Animation Panel */}
                            <div className="relative bg-gray-950/50 border-r border-white/5 min-h-[300px] md:min-h-[400px]">
                                {/* Grid pattern */}
                                <div className="absolute inset-0 opacity-[0.04]" style={{
                                    backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                                    backgroundSize: '24px 24px',
                                }} />
                                {AnimationComponent && <AnimationComponent />}
                            </div>

                            {/* Right: Text Panel */}
                            <div className="p-8 md:p-10 flex flex-col justify-start overflow-y-auto max-h-[80vh]">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <span className="text-[10px] font-mono tracking-widest text-cyan-600 uppercase mb-3 block">
                                        {data.subtitle}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        {data.title}
                                    </h3>
                                    <div className="h-[1px] w-16 bg-gradient-to-r from-cyan-500/50 to-transparent mb-6" />
                                    <p className="text-gray-400 leading-relaxed text-[15px]">
                                        {renderStyledText(data.description)}
                                    </p>

                                    {/* Process Steps Pipeline - Clickable Accordion */}
                                    {data.processSteps && data.processSteps.length > 0 && (
                                        <motion.div
                                            className="border-t border-gray-800 pt-6 mt-6"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4, duration: 0.4 }}
                                        >
                                            <h4 className="text-white font-bold text-xl mb-6">
                                                {data.processTitle}
                                            </h4>
                                            <div className="flex flex-col gap-3">
                                                {data.processSteps.map((item: { step: string; output: string; description?: string }, idx: number) => {
                                                    const isExpanded = expandedStep === idx;
                                                    return (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -12 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.5 + idx * 0.1 }}
                                                        >
                                                            {/* Clickable Step Header */}
                                                            <button
                                                                onClick={() => setExpandedStep(isExpanded ? null : idx)}
                                                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 cursor-pointer text-left ${isExpanded
                                                                    ? 'bg-cyan-950/30 border border-cyan-800/40'
                                                                    : 'bg-gray-900/40 border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700'
                                                                    }`}
                                                            >
                                                                {/* Number Circle */}
                                                                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200 ${isExpanded ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-cyan-900/50'
                                                                    }`}>
                                                                    <span className="text-cyan-400 font-mono text-sm">
                                                                        {String(idx + 1).padStart(2, '0')}
                                                                    </span>
                                                                </div>
                                                                {/* Step Text */}
                                                                <span className={`text-sm leading-snug flex-1 transition-colors duration-200 ${isExpanded ? 'text-white font-medium' : 'text-gray-300'
                                                                    }`}>
                                                                    {item.step}
                                                                </span>
                                                                {/* Output Label */}
                                                                <span className="font-mono text-xs text-gray-500 shrink-0 hidden sm:block">
                                                                    → {item.output}
                                                                </span>
                                                                {/* Chevron */}
                                                                <ChevronDown
                                                                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-cyan-400' : ''
                                                                        }`}
                                                                />
                                                            </button>

                                                            {/* Expanded Description Panel */}
                                                            <AnimatePresence>
                                                                {isExpanded && item.description && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <div className="mx-4 mt-0 border-l-2 border-cyan-500/30 pl-5 py-4">
                                                                            <p className="text-gray-400 text-[13px] leading-relaxed">
                                                                                {item.description}
                                                                            </p>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                    <motion.a
                                        href="#contact"
                                        onClick={onClose}
                                        className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all hover:gap-3"
                                        style={{
                                            backgroundColor: 'rgba(6,182,212,0.1)',
                                            border: '1px solid rgba(6,182,212,0.3)',
                                            color: accent.primary,
                                        }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        İletişime Geç
                                        <span className="text-xs">→</span>
                                    </motion.a>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;
