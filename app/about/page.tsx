'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    Brain, Code2, Target, Rocket, GraduationCap, Briefcase, HelpCircle, Building2,
    ArrowRight, ChevronRight, Sparkles, Cpu, Eye, Palette, Workflow,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import MetaHead from '@/components/MetaHead';

/* ════════════════════════════════════════════════════════════
   1. HERO — Cinematic Persona
   ════════════════════════════════════════════════════════════ */

function HeroSection({ accent }: { accent: { primary: string; secondary: string } }) {
    const { t } = useLanguage();
    const hero = t.about.hero;
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const imgRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!imgRef.current) return;
        const rect = imgRef.current.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-16 bg-[#101214]">
            {/* Background grid + glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:50px_50px]" />
                <div className="absolute top-[-20%] right-[-15%] w-[700px] h-[700px] rounded-full blur-[180px]" style={{ backgroundColor: `${accent.primary}08` }} />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${accent.secondary}06` }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left — Text */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-2 lg:order-1"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6" style={{ backgroundColor: `${accent.primary}10`, borderColor: `${accent.primary}33` }}>
                        <Cpu className="w-3.5 h-3.5" style={{ color: accent.primary }} />
                        <span className="text-xs font-mono tracking-[0.25em] uppercase font-bold" style={{ color: accent.primary }}>{hero.badge}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05]">
                        {hero.title}{' '}
                        <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})` }}>
                            {hero.titleHighlight}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-lg" dangerouslySetInnerHTML={{ __html: hero.description }} />

                    {/* PhD badge */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                            <GraduationCap className="w-5 h-5" style={{ color: accent.primary }} />
                            <div>
                                <p className="text-xs font-bold text-white">{hero.phd}</p>
                                <p className="text-[10px] text-gray-500 font-mono">{hero.phdSub}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                            <Brain className="w-5 h-5" style={{ color: accent.secondary }} />
                            <div>
                                <p className="text-xs font-bold text-white">{hero.founder}</p>
                                <p className="text-[10px] text-gray-500 font-mono">{hero.founderSub}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right — Photo with thermal scan */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-1 lg:order-2 relative flex justify-center"
                >
                    <div
                        ref={imgRef}
                        onMouseMove={handleMouseMove}
                        className="relative w-[300px] h-[400px] md:w-[380px] md:h-[500px] lg:w-[420px] lg:h-[560px] cursor-crosshair group"
                    >
                        {/* Photo */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden"
                            style={{
                                WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                                WebkitMaskComposite: 'intersect',
                                maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                                maskComposite: 'intersect',
                            }}
                        >
                            <Image
                                src="/bektassari.jpg"
                                alt="Dr. Bektaş Sarı"
                                fill
                                className="object-cover object-top grayscale"
                                style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                                priority
                            />

                            {/* Noise overlay */}
                            <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
                            />
                        </div>

                        {/* Thermal scan overlay — follows mouse */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                            style={{
                                background: `radial-gradient(circle 120px at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${accent.primary}40, ${accent.secondary}20, transparent 70%)`,
                                mixBlendMode: 'screen',
                            }}
                        />

                        {/* Scan line */}
                        <motion.div
                            className="absolute left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                            style={{ background: `linear-gradient(90deg, transparent, ${accent.primary}80, white, ${accent.primary}80, transparent)`, boxShadow: `0 0 15px 2px ${accent.primary}30` }}
                            animate={{ top: ['10%', '90%', '10%'] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                        />

                        {/* Corner brackets */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 rounded-tl-md opacity-0 group-hover:opacity-60 transition-opacity" style={{ borderColor: accent.primary }} />
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 rounded-tr-md opacity-0 group-hover:opacity-60 transition-opacity" style={{ borderColor: accent.primary }} />
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 rounded-bl-md opacity-0 group-hover:opacity-60 transition-opacity" style={{ borderColor: accent.primary }} />
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 rounded-br-md opacity-0 group-hover:opacity-60 transition-opacity" style={{ borderColor: accent.primary }} />

                        {/* Crosshair overlay label */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider" style={{ color: accent.primary }}>
                                {hero.thermalScan}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ════════════════════════════════════════════════════════════
   2. THE HYBRID MIND — Bento Grid
   ════════════════════════════════════════════════════════════ */

const BENTO_BASE = [
    { id: 'science', icon: Brain, span: 'col-span-1', accent: '#4ECDC4' },
    { id: 'engineering', icon: Code2, span: 'col-span-1', accent: '#60A5FA' },
    { id: 'strategy', icon: Target, span: 'col-span-1', accent: '#FBBF24' },
    { id: 'vision', icon: Rocket, span: 'col-span-1 md:col-span-1', accent: '#FF6B6B' },
];

function BentoGrid({ accent }: { accent: { primary: string; secondary: string } }) {
    const { t } = useLanguage();
    const bento = t.about.bento;

    const items = BENTO_BASE.map(base => {
        const content = bento.items.find((i: any) => i.id === base.id);
        return { ...base, ...content };
    });

    return (
        <section className="px-6 py-24 bg-[#101214]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5" style={{ backgroundColor: `${accent.primary}10`, borderColor: `${accent.primary}33` }}>
                        <Sparkles className="w-4 h-4" style={{ color: accent.primary }} />
                        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: accent.primary }}>{bento.badge}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        {bento.title1} <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${accent.primary}, ${accent.secondary})` }}>{bento.titleHighlight}</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.12 }}
                            className={`group relative p-6 md:p-8 rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-white/[0.15] ${item.span}`}
                            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}
                        >
                            {/* Hover glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ backgroundColor: `${item.accent}15` }} />

                            <div className="relative z-10">
                                <div className="p-3 rounded-xl border mb-5 inline-block" style={{ backgroundColor: `${item.accent}12`, borderColor: `${item.accent}25` }}>
                                    <item.icon className="w-6 h-6" style={{ color: item.accent }} />
                                </div>
                                <p className="text-xs font-mono tracking-wider mb-1" style={{ color: item.accent }}>{item.subtitle}</p>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ════════════════════════════════════════════════════════════
   3. YOLCULUK — Horizontal Timeline
   ════════════════════════════════════════════════════════════ */

const TIMELINE_BASE = [
    {
        id: 'strateji',
        icon: Briefcase,
        color: '#FBBF24',
        codeBg: 'const strategy = buildBrandPlan(client)\nconst cx = mapCustomerJourney(touchpoints)\nreturn optimizeConversion(strategy, cx)',
    },
    {
        id: 'akademi',
        icon: GraduationCap,
        color: '#4ECDC4',
        codeBg: 'def analyze_perception(stimulus):\n  response = neural_model.predict(stimulus)\n  return cognitive_score(response)',
    },
    {
        id: 'kognitect',
        icon: Building2,
        color: '#FF6B6B',
        codeBg: 'class Kognitect(CognitiveArchitect):\n  def build(self, project):\n    return self.engineer(\n      self.perceive(project)\n    )',
    },
];

function Timeline({ accent }: { accent: { primary: string; secondary: string } }) {
    const { t } = useLanguage();
    const timeline = t.about.timeline;

    const steps = TIMELINE_BASE.map(base => {
        const content = timeline.steps.find((s: any) => s.id === base.id);
        return { ...base, ...content };
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 bg-[#0a0c0e] overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5" style={{ backgroundColor: `${accent.primary}10`, borderColor: `${accent.primary}33` }}>
                        <Workflow className="w-4 h-4" style={{ color: accent.primary }} />
                        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: accent.primary }}>{timeline.badge}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        {timeline.title}
                    </h2>
                </motion.div>
            </div>

            {/* Horizontal scroll strip */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto px-6 pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
                style={{ scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
            >
                {/* Left spacer */}
                <div className="shrink-0 w-4 md:w-[calc((100vw-72rem)/2)]" />

                {steps.map((step, idx) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: idx * 0.1 }}
                        className="shrink-0 w-[320px] md:w-[380px] snap-start"
                    >
                        <div className="h-full rounded-2xl border border-white/[0.06] overflow-hidden group hover:border-white/[0.15] transition-all duration-500"
                            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)' }}
                        >
                            {/* Code background */}
                            <div className="relative h-28 overflow-hidden border-b border-white/[0.06]">
                                <pre className="absolute inset-0 p-4 text-[10px] font-mono leading-relaxed whitespace-pre opacity-30 select-none" style={{ color: step.color }}>
                                    {step.codeBg}
                                </pre>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0c0e]" />

                                {/* Era label */}
                                <div className="absolute bottom-3 left-4">
                                    <span className="text-[10px] font-mono tracking-wider" style={{ color: step.color }}>{step.era}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 rounded-xl border" style={{ backgroundColor: `${step.color}12`, borderColor: `${step.color}25` }}>
                                        <step.icon className="w-5 h-5" style={{ color: step.color }} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{step.title}</h3>
                                        <p className="text-xs text-gray-500 font-mono">{step.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">{step.detail}</p>
                            </div>

                            {/* Step connector dot */}
                            <div className="flex items-center justify-center py-3 border-t border-white/[0.06]">
                                <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: step.color, backgroundColor: `${step.color}30` }} />
                                {idx < steps.length - 1 && (
                                    <div className="absolute w-6 h-px right-0 translate-x-full" style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }} />
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Right spacer */}
                <div className="shrink-0 w-4 md:w-[calc((100vw-72rem)/2)]" />
            </div>
        </section>
    );
}

/* ════════════════════════════════════════════════════════════
   4. TOOLKIT — Tech Weapons
   ════════════════════════════════════════════════════════════ */

const TOOLKIT_BASE = [
    { name: 'Python', color: '#3B82F6', icon: '🐍' },
    { name: 'OpenCV', color: '#22C55E', icon: '👁️' },
    { name: 'Next.js', color: '#FFFFFF', icon: '▲' },
    { name: 'Flutter', color: '#00B4D8', icon: '📱' },
    { name: 'Figma', color: '#A855F7', icon: '🎨' },
    { name: 'n8n', color: '#FF6B6B', icon: '⚡' },
    { name: 'TensorFlow', color: '#FF8C00', icon: '🧠' },
    { name: 'React', color: '#61DAFB', icon: '⚛️' },
];

function Toolkit({ accent }: { accent: { primary: string; secondary: string } }) {
    const { t } = useLanguage();
    const toolkit = t.about.toolkit;

    const items = TOOLKIT_BASE.map(base => {
        const content = toolkit.items.find((i: any) => i.name === base.name);
        return { ...base, ...content };
    });

    const [selected, setSelected] = useState<string | null>(null);

    return (
        <section className="px-6 py-24 bg-[#101214]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5" style={{ backgroundColor: `${accent.primary}10`, borderColor: `${accent.primary}33` }}>
                        <Target className="w-4 h-4" style={{ color: accent.primary }} />
                        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: accent.primary }}>{toolkit.badge}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        {toolkit.title}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {items.map((item, idx) => {
                        const isSelected = selected === item.name;
                        return (
                            <motion.button
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.06 }}
                                onClick={() => setSelected(isSelected ? null : item.name)}
                                className={`relative p-5 rounded-2xl border text-center transition-all duration-400 cursor-pointer group ${isSelected ? 'border-white/20' : 'border-white/[0.06] hover:border-white/[0.12]'}`}
                                style={{
                                    background: isSelected
                                        ? `linear-gradient(135deg, ${item.color}10, rgba(255,255,255,0.02))`
                                        : 'rgba(255,255,255,0.02)',
                                }}
                            >
                                {/* Glow */}
                                {isSelected && <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full blur-[40px]" style={{ backgroundColor: `${item.color}20` }} />}

                                <div className="relative z-10">
                                    <span className="text-2xl block mb-3">{item.icon}</span>
                                    <p className="text-sm font-bold text-white mb-1">{item.name}</p>

                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-[11px] text-gray-400 mt-2 leading-relaxed overflow-hidden"
                                            >
                                                {item.desc}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ════════════════════════════════════════════════════════════
   5. FINAL CTA — Signature
   ════════════════════════════════════════════════════════════ */

function SignatureCTA({ accent }: { accent: { primary: string; secondary: string } }) {
    const { t } = useLanguage();
    const signature = t.about.signature;

    return (
        <section className="px-6 py-24 bg-[#0a0c0e]">
            <div className="max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Handwriting-style signature */}
                    <motion.p
                        className="text-5xl md:text-7xl mb-8 bg-clip-text text-transparent"
                        style={{
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            fontStyle: 'italic',
                            fontWeight: 300,
                            backgroundImage: `linear-gradient(135deg, ${accent.primary}, ${accent.secondary})`,
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        Bektaş Sarı
                    </motion.p>

                    <div className="w-24 h-px mx-auto mb-8" style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent.primary}, transparent)` }} />

                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: signature.ctaText }} />

                    <motion.a
                        href="/contact"
                        className="inline-flex items-center gap-3 px-10 py-5 text-[#101214] rounded-full font-bold text-lg transition-transform"
                        style={{ backgroundImage: `linear-gradient(to right, ${accent.primary}, ${accent.primary}CC)` }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {signature.button} <ArrowRight className="w-5 h-5" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}

/* ════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════ */

export default function AboutPage() {
    const { accent } = useLanguage();

    return (
        <main className="min-h-screen bg-[#101214] text-white">
            <MetaHead pageKey="about" />
            <HeroSection accent={accent} />
            <BentoGrid accent={accent} />
            <Timeline accent={accent} />
            <Toolkit accent={accent} />
            <SignatureCTA accent={accent} />
        </main>
    );
}
