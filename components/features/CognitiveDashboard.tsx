'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts';
import { Scan, Activity, Terminal, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ══════════════════════════════════════════════════════════
   TERMINAL LOG
   ══════════════════════════════════════════════════════════ */

function TerminalLog() {
    const { t: localeData } = useLanguage();
    const t = localeData.cognitiveDashboard.terminal;
    const [lines, setLines] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const terminalLines = [
        { text: t.line1, delay: 0 },
        { text: t.line2, delay: 600 },
        { text: t.line3, delay: 1100 },
        { text: t.line4, delay: 1800 },
        { text: t.line5, delay: 2500 },
        { text: t.line6, delay: 3200 },
        { text: t.line7, delay: 3900 },
        { text: t.line8, delay: 4500 },
        { text: t.line9, delay: 5100 },
        { text: t.line10, delay: 5700 },
        { text: t.line11, delay: 6400 },
    ];

    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];
        terminalLines.forEach((line) => {
            timers.push(setTimeout(() => {
                setLines(prev => [...prev, line.text]);
            }, line.delay));
        });

        // Loop: restart after all lines shown
        const loopTimer = setTimeout(() => {
            setLines([]);
            // Re-trigger
            terminalLines.forEach((line) => {
                timers.push(setTimeout(() => {
                    setLines(prev => [...prev, line.text]);
                }, line.delay));
            });
        }, 8000);
        timers.push(loopTimer);

        return () => timers.forEach(clearTimeout);
    }, [t]); // Re-run if language changes

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div className="rounded-xl bg-[#080a0c] border border-emerald-500/10 overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.04] bg-white/[0.01] shrink-0">
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
                </div>
                <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider ml-2">
                    {localeData.cognitiveDashboard.terminalHeader}
                </span>
            </div>

            {/* Lines */}
            <div ref={scrollRef} className="flex-1 p-3 overflow-y-auto space-y-2 min-h-0 scrollbar-thin">
                <AnimatePresence>
                    {lines.map((line, idx) => (
                        <motion.p
                            key={`${idx}-${line.slice(0, 10)}`}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`text-[11px] leading-relaxed ${line.toUpperCase().includes('WARNING') || line.toUpperCase().includes('UYARI') || line.includes('friction') || line.includes('sürtünme')
                                ? 'text-amber-400/80 font-medium'
                                : line.includes('✓') || line.includes('tamamlandı') || line.includes('completed')
                                    ? 'text-emerald-400/90 font-medium'
                                    : 'text-zinc-400'
                                }`}
                        >
                            {line.startsWith('> ') ? line.substring(2) : line}
                        </motion.p>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   WEBSITE MOCKUP + HEATMAP + SCAN LINE
   ══════════════════════════════════════════════════════════ */

function MockupWithHeatmap() {
    const { t: localeData } = useLanguage();
    const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);

    const heatmapSpots = [
        { id: 'logo', x: '12%', y: '4%', size: 50, color: '#FBBF24', intensity: 0.55, label: 'Logo' },
        { id: 'cta-hero', x: '50%', y: '22%', size: 80, color: '#FF6B6B', intensity: 0.7, label: 'CTA' },
        { id: 'nav-center', x: '55%', y: '4%', size: 40, color: '#FBBF24', intensity: 0.35, label: 'Nav' },
        { id: 'card-1', x: '20%', y: '58%', size: 55, color: '#4ECDC4', intensity: 0.5, label: 'Card 1' },
        { id: 'card-2', x: '50%', y: '58%', size: 55, color: '#4ECDC4', intensity: 0.5, label: 'Card 2' },
        { id: 'card-3', x: '80%', y: '58%', size: 45, color: '#60A5FA', intensity: 0.4, label: 'Card 3' },
        { id: 'footer-cta', x: '50%', y: '88%', size: 65, color: '#FF6B6B', intensity: 0.6, label: 'Footer CTA' },
    ];

    return (
        <div className="relative w-full h-full rounded-xl bg-[#080a0c] border border-cyan-500/20 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-3 h-5 rounded bg-white/[0.04] flex items-center px-3">
                    <span className="text-[9px] text-zinc-500">client-interface.ai</span>
                </div>
            </div>

            {/* Mockup body */}
            <div className="relative p-3 h-[calc(100%-36px)]">
                {/* Wireframe blocks */}
                <div className="h-full flex flex-col gap-2">
                    {/* Navbar */}
                    <div className="flex items-center gap-2 h-[8%]">
                        <div className="w-8 h-5 rounded bg-white/[0.06]" />
                        <div className="flex-1" />
                        <div className="flex gap-2">
                            {[0, 1, 2, 3].map(i => <div key={i} className="w-8 h-2 rounded bg-white/[0.04]" />)}
                        </div>
                    </div>

                    {/* Hero */}
                    <div className="h-[28%] rounded-lg bg-white/[0.03] flex flex-col items-center justify-center gap-2 border border-white/[0.04]">
                        <div className="w-[60%] h-3 rounded bg-white/[0.06]" />
                        <div className="w-[40%] h-2 rounded bg-white/[0.04]" />
                        <div className="w-20 h-6 rounded-md bg-white/[0.08] mt-1" />
                    </div>

                    {/* Slider area */}
                    <div className="h-[16%] rounded-lg bg-white/[0.02] border border-dashed border-white/[0.06] flex items-center justify-center">
                        <div className="w-[70%] h-[60%] rounded bg-white/[0.03]" />
                    </div>

                    {/* Feature cards */}
                    <div className="h-[24%] grid grid-cols-3 gap-2">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="rounded-lg bg-white/[0.03] border border-white/[0.04] p-2 flex flex-col gap-1">
                                <div className="w-5 h-5 rounded bg-white/[0.06]" />
                                <div className="w-full h-1.5 rounded bg-white/[0.04]" />
                                <div className="w-3/4 h-1.5 rounded bg-white/[0.03]" />
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.04] flex items-center justify-center">
                        <div className="w-24 h-5 rounded bg-white/[0.06]" />
                    </div>
                </div>

                {/* Heatmap spots */}
                {heatmapSpots.map((spot) => (
                    <motion.div
                        key={spot.id}
                        className="absolute rounded-full cursor-pointer"
                        style={{
                            left: spot.x, top: `calc(36px + ${spot.y})`,
                            width: spot.size, height: spot.size,
                            transform: 'translate(-50%, -50%)',
                            background: `radial-gradient(circle, ${spot.color}${Math.round(spot.intensity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
                            filter: 'blur(6px)',
                            zIndex: 10,
                        }}
                        animate={{
                            opacity: [0.6, 1, 0.6],
                            scale: hoveredSpot === spot.id ? [1, 1.3, 1] : [1, 1.08, 1],
                        }}
                        transition={{ duration: hoveredSpot === spot.id ? 0.8 : 3, repeat: Infinity, ease: 'easeInOut' }}
                        onMouseEnter={() => setHoveredSpot(spot.id)}
                        onMouseLeave={() => setHoveredSpot(null)}
                    />
                ))}

                {/* Hover tooltip */}
                <AnimatePresence>
                    {hoveredSpot && (() => {
                        const spot = heatmapSpots.find(s => s.id === hoveredSpot);
                        if (!spot) return null;
                        const score = Math.round(spot.intensity * 130);
                        return (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute z-30 pointer-events-none px-3 py-2 rounded-lg bg-[#101214]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl"
                                style={{
                                    left: spot.x,
                                    top: `calc(36px + ${spot.y} - ${spot.size / 2 + 40}px)`,
                                    transform: 'translateX(-50%)',
                                }}
                            >
                                <p className="text-[10px] font-mono text-gray-400">{spot.label}</p>
                                <p className="text-xs font-bold" style={{ color: spot.color }}>
                                    {localeData.cognitiveDashboard.attentionLabel}: %{score}
                                </p>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>

                {/* Laser scan line */}
                <motion.div
                    className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, #4ECDC4 20%, #fff 50%, #4ECDC4 80%, transparent 100%)',
                        boxShadow: '0 0 20px 4px rgba(78,205,196,0.4), 0 0 60px 8px rgba(78,205,196,0.15)',
                    }}
                    animate={{ top: ['36px', 'calc(100% - 4px)'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
                />
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */

export default function CognitiveDashboard() {
    const { t } = useLanguage();
    const dashboardLocale = t.cognitiveDashboard;
    const [chartReady, setChartReady] = useState(false);

    const radarAxes = [
        { axis: dashboardLocale.radarAxes.trust, value: 88, fullMark: 100 },
        { axis: dashboardLocale.radarAxes.focus, value: 72, fullMark: 100 },
        { axis: dashboardLocale.radarAxes.speed, value: 95, fullMark: 100 },
        { axis: dashboardLocale.radarAxes.clarity, value: 91, fullMark: 100 },
        { axis: dashboardLocale.radarAxes.aesthetics, value: 83, fullMark: 100 },
    ];

    useEffect(() => {
        const t = setTimeout(() => setChartReady(true), 500);
        return () => clearTimeout(t);
    }, []);

    const animatedRadar = radarAxes.map(d => ({ ...d, value: chartReady ? d.value : 0 }));
    const avgScore = Math.round(radarAxes.reduce((s, d) => s + d.value, 0) / radarAxes.length);

    return (
        <section id="simulation" className="px-4 py-16 md:py-24 bg-[#101214]">
            <div className="max-w-6xl mx-auto">
                {/* Section title */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
                        <Scan className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs tracking-widest text-emerald-400 uppercase font-bold">{dashboardLocale.badge}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                        {dashboardLocale.title.substring(0, dashboardLocale.title.lastIndexOf(' '))} <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">{dashboardLocale.title.split(' ').pop()}</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                        {dashboardLocale.description}
                    </p>
                </motion.div>

                {/* Dashboard Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(78,205,196,0.03) 0%, rgba(255,255,255,0.01) 50%, rgba(255,107,107,0.02) 100%)',
                        border: '1px solid rgba(78,205,196,0.15)',
                        backdropFilter: 'blur(24px)',
                        boxShadow: '0 0 80px -20px rgba(78,205,196,0.08), 0 25px 60px -15px rgba(0,0,0,0.6)',
                    }}
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-500/10 bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="w-2 h-2 rounded-full bg-cyan-400"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[11px] text-zinc-600">Cognitive Hub Intelligence</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[11px] text-zinc-600">{dashboardLocale.scoreLabel}: <span className="text-emerald-400 font-bold">{avgScore}/100</span></span>
                            <span className="text-[11px] text-zinc-700 font-bold">{dashboardLocale.simulationLabel}</span>
                        </div>
                    </div>

                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* LEFT — Radar + Terminal */}
                        <div className="p-5 flex flex-col gap-4 border-r border-cyan-500/[0.06] min-h-[500px] lg:min-h-[600px]">
                            {/* Radar chart */}
                            <div className="relative rounded-xl bg-[#080a0c]/60 border border-cyan-500/20 p-4 flex-shrink-0">
                                <div className="flex items-center gap-2 mb-3">
                                    <Activity className="w-4 h-4 text-cyan-400" />
                                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{dashboardLocale.radarTitle}</span>
                                </div>

                                <div className="w-full aspect-square max-w-[280px] mx-auto">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="72%" data={animatedRadar}>
                                            <PolarGrid stroke="rgba(78,205,196,0.1)" />
                                            <PolarAngleAxis
                                                dataKey="axis"
                                                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 500 }}
                                            />
                                            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar
                                                name="Score"
                                                dataKey="value"
                                                stroke="#4ECDC4"
                                                fill="#4ECDC4"
                                                fillOpacity={0.2}
                                                strokeWidth={2}
                                                animationDuration={1800}
                                                animationEasing="ease-out"
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Mini score pills */}
                                <div className="flex flex-wrap justify-center gap-2 mt-3">
                                    {radarAxes.map(d => (
                                        <span key={d.axis} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/[0.06]"
                                            style={{ color: d.value >= 85 ? '#22C55E' : d.value >= 70 ? '#4ECDC4' : '#FBBF24' }}>
                                            {d.axis}: {d.value}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Terminal */}
                            <div className="flex-1 min-h-[180px]">
                                <TerminalLog />
                            </div>
                        </div>

                        {/* RIGHT — Mockup + Heatmap + Scan */}
                        <div className="p-5 min-h-[500px] lg:min-h-[600px]">
                            <div className="flex items-center gap-2 mb-3">
                                <Eye className="w-4 h-4 text-cyan-400" />
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{dashboardLocale.heatmapHeader}</span>
                            </div>
                            <div className="h-[calc(100%-32px)]">
                                <MockupWithHeatmap />
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-t border-cyan-500/10 bg-white/[0.01]">
                        <span className="text-[10px] font-mono text-gray-700">{dashboardLocale.dataWarning}</span>
                        <span className="text-[10px] font-mono text-gray-700">kognitect.com</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
