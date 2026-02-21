'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts';
import {
    Eye, BarChart3, Cpu, Activity, AlertTriangle, CheckCircle, ChevronRight, Scan,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ═══════════════════════════════════════════════════════
   0. DATA
   ═══════════════════════════════════════════════════════ */

const HEATMAP_ZONES = [
    { id: 'hero', label: 'Hero / CTA', x: '10%', y: '8%', w: '80%', h: '22%', score: 92, color: '#FF6B6B' },
    { id: 'nav', label: 'Navigation', x: '5%', y: '2%', w: '90%', h: '6%', score: 45, color: '#FBBF24' },
    { id: 'slider', label: 'Slider / Carousel', x: '8%', y: '32%', w: '84%', h: '18%', score: 28, color: '#60A5FA' },
    { id: 'features', label: 'Feature Cards', x: '5%', y: '53%', w: '90%', h: '20%', score: 71, color: '#4ECDC4' },
    { id: 'footer', label: 'Footer / CTA', x: '5%', y: '76%', w: '90%', h: '20%', score: 85, color: '#FF6B6B' },
];

const RADAR_DATA = [
    { axis: 'Güven', value: 88, fullMark: 100 },
    { axis: 'Netlik', value: 92, fullMark: 100 },
    { axis: 'Odak', value: 76, fullMark: 100 },
    { axis: 'Hız', value: 95, fullMark: 100 },
    { axis: 'Estetik', value: 84, fullMark: 100 },
];

const AI_LINES = [
    { type: 'warn', text: '> Tespit Edildi: Slider alanında %40 dikkat kaybı. Kullanıcılar ilk 1.2 saniyede alanı atlıyor.' },
    { type: 'info', text: '> Analiz: Hero bölgesinde CTA butonu yüksek dikkat çekiciliğe sahip (Saliency: %92).' },
    { type: 'warn', text: '> Tespit Edildi: Navigasyon barında bilişsel aşırı yük riski. 7+ menü öğesi Hick Yasası\'nı ihlal ediyor.' },
    { type: 'success', text: '> Sonuç: Feature kartları optimal F-pattern okuma yolunu destekliyor (Netlik: %92).' },
    { type: 'info', text: '> Öneri: Slider yerine statik hero + micro-interaction geçişi dönüşümü %35 artırabilir.' },
    { type: 'success', text: '> Sonuç: Footer CTA bölgesi güçlü kapatma sinyali veriyor. Hemen Harekete Geç butonu etkin.' },
    { type: 'warn', text: '> Uyarı: Mobil görünümde dokunma hedefi boyutları WCAG AA standardının altında (36px < 44px).' },
    { type: 'info', text: '> Tarama tamamlandı. Genel Bilişsel Skor: 84/100. Durum: Optimize edilebilir.' },
];

/* ═══════════════════════════════════════════════════════
   1. TABS CONFIG
   ═══════════════════════════════════════════════════════ */

type TabKey = 'heatmap' | 'metrics' | 'insights';

const TABS: { key: TabKey; label: string; icon: any }[] = [
    { key: 'heatmap', label: 'Görsel Dikkat', icon: Eye },
    { key: 'metrics', label: 'Bilişsel Skorlar', icon: BarChart3 },
    { key: 'insights', label: 'AI Önerileri', icon: Cpu },
];

/* ═══════════════════════════════════════════════════════
   2. HEATMAP TAB
   ═══════════════════════════════════════════════════════ */

function HeatmapTab({ accent }: { accent: { primary: string; secondary: string } }) {
    const [hoveredZone, setHoveredZone] = useState<string | null>(null);

    return (
        <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden bg-[#0a0c0e] border border-white/[0.06]">
            {/* Mockup wireframe background */}
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.08) 30px, rgba(255,255,255,0.08) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.08) 30px, rgba(255,255,255,0.08) 31px)' }} />

            {/* Wireframe skeleton */}
            <div className="absolute inset-0 p-4">
                <div className="w-full h-[6%] rounded bg-white/[0.04] mb-2" />
                <div className="w-full h-[22%] rounded bg-white/[0.03] mb-2 flex items-center justify-center">
                    <div className="w-32 h-8 rounded bg-white/[0.05]" />
                </div>
                <div className="w-full h-[18%] rounded bg-white/[0.02] mb-2" />
                <div className="w-full h-[20%] rounded bg-white/[0.03] mb-2 grid grid-cols-3 gap-2 p-2">
                    {[0, 1, 2].map(i => <div key={i} className="rounded bg-white/[0.04]" />)}
                </div>
                <div className="w-full h-[20%] rounded bg-white/[0.03] flex items-center justify-center">
                    <div className="w-28 h-6 rounded bg-white/[0.05]" />
                </div>
            </div>

            {/* Heatmap zones */}
            {HEATMAP_ZONES.map((zone) => {
                const isHovered = hoveredZone === zone.id;
                const opacity = zone.score > 80 ? 0.45 : zone.score > 60 ? 0.3 : zone.score > 40 ? 0.2 : 0.12;

                return (
                    <motion.div
                        key={zone.id}
                        className="absolute cursor-pointer rounded-lg transition-all duration-300"
                        style={{
                            left: zone.x, top: zone.y, width: zone.w, height: zone.h,
                            background: `radial-gradient(ellipse at center, ${zone.color}${isHovered ? 'B3' : Math.round(opacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
                            border: isHovered ? `1px solid ${zone.color}66` : '1px solid transparent',
                            zIndex: isHovered ? 20 : 10,
                        }}
                        onMouseEnter={() => setHoveredZone(zone.id)}
                        onMouseLeave={() => setHoveredZone(null)}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
                    >
                        {/* Tooltip */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                                    className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full z-30 pointer-events-none"
                                >
                                    <div className="px-4 py-3 rounded-xl bg-[#101214]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl whitespace-nowrap">
                                        <p className="text-xs font-mono text-gray-400 mb-1">{zone.label}</p>
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-3.5 h-3.5" style={{ color: zone.color }} />
                                            <span className="text-sm font-bold font-mono" style={{ color: zone.color }}>
                                                Attention Score: %{zone.score}
                                            </span>
                                        </div>
                                        <div className="mt-1.5 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: zone.color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${zone.score}%` }}
                                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-3 h-3 rotate-45 bg-[#101214]/95 border-r border-b border-white/[0.12] mx-auto -mt-1.5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}

            {/* Scan beam */}
            <motion.div
                className="absolute left-0 right-0 h-px z-10 pointer-events-none"
                style={{ background: `linear-gradient(90deg, transparent, ${accent.primary}80, white, ${accent.primary}80, transparent)`, boxShadow: `0 0 20px 2px ${accent.primary}40` }}
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   3. METRICS TAB (Radar Chart)
   ═══════════════════════════════════════════════════════ */

function MetricsTab({ accent }: { accent: { primary: string; secondary: string } }) {
    const [chartReady, setChartReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setChartReady(true), 300);
        return () => clearTimeout(t);
    }, []);

    const animatedData = RADAR_DATA.map(d => ({
        ...d,
        value: chartReady ? d.value : 0,
    }));

    return (
        <div className="space-y-6">
            {/* Radar */}
            <div className="w-full aspect-square max-w-md mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={animatedData}>
                        <PolarGrid stroke="rgba(255,255,255,0.08)" />
                        <PolarAngleAxis
                            dataKey="axis"
                            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'monospace' }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        <Radar
                            name="Skor"
                            dataKey="value"
                            stroke={accent.primary}
                            fill={accent.primary}
                            fillOpacity={0.25}
                            strokeWidth={2}
                            animationDuration={1500}
                            animationEasing="ease-out"
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Score cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {RADAR_DATA.map((item, idx) => (
                    <motion.div
                        key={item.axis}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center"
                    >
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono mb-1">{item.axis}</p>
                        <p className="text-xl font-black font-mono" style={{ color: item.value >= 85 ? '#22C55E' : item.value >= 70 ? accent.primary : accent.secondary }}>
                            {item.value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Overall score */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-3 py-4 rounded-xl border border-white/[0.08]"
                style={{ backgroundColor: `${accent.primary}08` }}
            >
                <Scan className="w-5 h-5" style={{ color: accent.primary }} />
                <span className="font-mono text-sm text-gray-400">Genel Bilişsel Skor:</span>
                <span className="text-2xl font-black font-mono" style={{ color: accent.primary }}>
                    {Math.round(RADAR_DATA.reduce((sum, d) => sum + d.value, 0) / RADAR_DATA.length)}
                    <span className="text-sm text-gray-500">/100</span>
                </span>
            </motion.div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   4. AI INSIGHTS TAB (Terminal)
   ═══════════════════════════════════════════════════════ */

function InsightsTab({ accent }: { accent: { primary: string; secondary: string } }) {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [currentText, setCurrentText] = useState('');
    const [typingIdx, setTypingIdx] = useState(0);

    useEffect(() => {
        if (visibleLines >= AI_LINES.length) return;

        const line = AI_LINES[visibleLines];
        if (typingIdx < line.text.length) {
            const speed = line.text[typingIdx] === '.' || line.text[typingIdx] === ':' ? 60 : 18;
            const timer = setTimeout(() => {
                setCurrentText(prev => prev + line.text[typingIdx]);
                setTypingIdx(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setVisibleLines(prev => prev + 1);
                setCurrentText('');
                setTypingIdx(0);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [visibleLines, typingIdx]);

    const iconForType = (type: string) => {
        switch (type) {
            case 'warn': return <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />;
            case 'success': return <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />;
            default: return <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent.primary }} />;
        }
    };

    const colorForType = (type: string) => {
        switch (type) {
            case 'warn': return 'text-amber-300/90';
            case 'success': return 'text-emerald-300/90';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="font-mono text-sm rounded-2xl bg-[#0a0c0e] border border-white/[0.06] overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-gray-600">kognitect-ai — bilişsel analiz v2.4</span>
            </div>

            {/* Terminal body */}
            <div className="p-4 md:p-6 space-y-3 min-h-[280px] max-h-[400px] overflow-y-auto">
                {/* Header line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-gray-600 mb-4"
                >
                    ═══════════════════════════════════════<br />
                    &nbsp; KOGNITECT BİLİŞSEL TARAMA RAPORU<br />
                    &nbsp; Tarih: {new Date().toLocaleDateString('tr-TR')}<br />
                    ═══════════════════════════════════════
                </motion.div>

                {/* Completed lines */}
                {AI_LINES.slice(0, visibleLines).map((line, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-start gap-2 ${colorForType(line.type)} leading-relaxed`}
                    >
                        {iconForType(line.type)}
                        <span>{line.text}</span>
                    </motion.div>
                ))}

                {/* Currently typing line */}
                {visibleLines < AI_LINES.length && (
                    <div className={`flex items-start gap-2 ${colorForType(AI_LINES[visibleLines].type)} leading-relaxed`}>
                        {iconForType(AI_LINES[visibleLines].type)}
                        <span>
                            {currentText}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="inline-block w-2 h-4 ml-0.5 align-middle"
                                style={{ backgroundColor: accent.primary }}
                            />
                        </span>
                    </div>
                )}

                {/* Done message */}
                {visibleLines >= AI_LINES.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-gray-600"
                    >
                        <span style={{ color: accent.primary }}>●</span> Tarama tamamlandı. Rapor hazır.
                    </motion.div>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   5. MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function CognitiveAnalysisPanel() {
    const { accent } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabKey>('heatmap');

    return (
        <section className="px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
                {/* Outer container — glassmorphism card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative rounded-3xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(24px)',
                        boxShadow: `0 0 80px -20px ${accent.primary}15, 0 25px 50px -12px rgba(0,0,0,0.5)`,
                    }}
                >
                    {/* Ambient glow */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${accent.primary}0A` }} />
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: `${accent.secondary}08` }} />

                    {/* Header */}
                    <div className="relative px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: `${accent.primary}1A` }}>
                                <Scan className="w-5 h-5" style={{ color: accent.primary }} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Bilişsel Muayene</h3>
                                <p className="text-xs text-gray-500 font-mono">Cognitive Audit Simulation</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-1 mt-5 -mb-px">
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab.key;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'text-white bg-white/[0.06]'
                                            : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                                            }`}
                                    >
                                        <tab.icon className="w-4 h-4" style={isActive ? { color: accent.primary } : {}} />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="tab-indicator"
                                                className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                                                style={{ backgroundColor: accent.primary }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="relative px-6 md:px-8 py-6 md:py-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'heatmap' && <HeatmapTab accent={accent} />}
                                {activeTab === 'metrics' && <MetricsTab accent={accent} />}
                                {activeTab === 'insights' && <InsightsTab accent={accent} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer badge */}
                    <div className="px-6 md:px-8 py-4 border-t border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: accent.primary }}
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-xs text-gray-600 font-mono">SİMÜLASYON MODU</span>
                        </div>
                        <span className="text-xs text-gray-600 font-mono">kognitect.com</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
