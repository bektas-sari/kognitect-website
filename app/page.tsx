'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ConsultForm from '@/components/ConsultForm';
import MetaHead from '@/components/MetaHead';
import HeroVisual from '@/components/features/HeroVisual';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = dynamic(() => import('@/components/Services'), { ssr: true });
const CognitiveDashboard = dynamic(() => import('@/components/features/CognitiveDashboard'), { ssr: false });
const PhilosophySection = dynamic(() => import('@/components/features/PhilosophySection'), { ssr: true });
const TimelineSection = dynamic(() => import('@/components/features/TimelineSection'), { ssr: true });
const TechStackSection = dynamic(() => import('@/components/features/TechStackSection'), { ssr: true });
const CaseStudiesSection = dynamic(() => import('@/components/features/CaseStudiesSection'), { ssr: true });
import {
  Network,
  Brain,
  Code2,
  Eye,
  Layers,
  Cpu,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
  ChevronDown,
  Smartphone,
  X,
  Send,
  Activity,
  Zap,
  Lock,
  Search,
  BarChart3,
  Fingerprint,
  MousePointer2,
  Quote
} from 'lucide-react';

// --- Types ---
type MetricDetail = {
  label: string;
  value: string;
  trend: "up" | "down" | "neutral";
};

// 3. DEEP DIVE MODAL EXTRACTED

// 4. PHILOSOPHY SECTION EXTRACTED

// --- Components ---

// 1. HERO SECTION
const HeroSection = () => {
  const { t } = useLanguage();
  const hero = t.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20 md:pt-32 bg-[#101214]">
      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left Column: Text */}
        <div className="flex flex-col items-start text-left space-y-8 z-10">

          {/* Badge */}
          <div className="inline-block px-3 py-1 rounded-full border border-gray-800 bg-white/[0.02] backdrop-blur-sm">
            <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">
              {hero.badge}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl xs:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            <span dangerouslySetInnerHTML={{ __html: hero.titleLine1 }} />
            <br className="hidden xs:block" />
            {hero.titleLine2}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
            {hero.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors text-center"
            >
              {hero.ctaPrimary}
            </Link>
            <a
              href="#technologies"
              className="px-8 py-4 border border-white/10 text-white rounded-full font-medium hover:bg-white/5 transition-colors text-center"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Right Column: Visual */}
        <div className="relative w-full flex items-center justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

// 2. RADAR CHART — with quote callout + autoplay carousel
const CognitiveRadar = () => {
  const { t, accent } = useLanguage();
  const radar = t.radar;
  const [activeMetric, setActiveMetric] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  const metricColors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"];
  const metrics = radar.metrics.map((m: { label: string; value: number; desc: string }, i: number) => ({
    id: i,
    label: m.label,
    value: m.value,
    color: metricColors[i],
    desc: m.desc,
  }));

  // Autoplay: cycle every 3s, pause on interaction
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleInteract = (index: number) => {
    setIsPaused(true);
    setActiveMetric(index);
  };

  const handleLeave = () => {
    setIsPaused(false);
  };

  const getPoint = (index: number, total: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    return { x: 150 + radius * Math.cos(angle), y: 150 + radius * Math.sin(angle) };
  };

  const radarPoints = metrics.map((m: { value: number }, i: number) => {
    const p = getPoint(i, 5, 120 * (m.value / 100));
    return `${p.x},${p.y}`;
  }).join(" ");

  const bgPoints = [100, 75, 50, 25].map((percent: number) => {
    return metrics.map((_: unknown, i: number) => {
      const p = getPoint(i, 5, 120 * (percent / 100));
      return `${p.x},${p.y}`;
    }).join(" ");
  });

  // Label positions — slightly outside the outermost ring
  const getLabelAnchor = (index: number): { anchor: 'start' | 'middle' | 'end'; dx: number; dy: number } => {
    // 5 points: 0=top, 1=top-right, 2=bottom-right, 3=bottom-left, 4=top-left
    const anchors: { anchor: 'start' | 'middle' | 'end'; dx: number; dy: number }[] = [
      { anchor: 'middle', dx: 0, dy: -12 },   // top
      { anchor: 'start', dx: 8, dy: 4 },       // top-right
      { anchor: 'start', dx: 6, dy: 10 },      // bottom-right
      { anchor: 'end', dx: -6, dy: 10 },        // bottom-left
      { anchor: 'end', dx: -8, dy: 4 },         // top-left
    ];
    return anchors[index];
  };

  return (
    <section id="radar" className="py-20 md:py-32 px-6 bg-[#101214] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-150 h-150 bg-blue-900/5 rounded-full blur-[100px] -z-10" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5" style={{ color: accent.primary }} />
            <span className="font-mono text-sm tracking-widest uppercase" style={{ color: accent.primary }}>{radar.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">{radar.title} <br /><span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{radar.titleHighlight}</span></h2>
          <p className="text-gray-400 text-lg leading-relaxed">{radar.description}</p>

          {/* QUOTE CALLOUT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-6 py-4 rounded-r-xl"
            style={{ borderLeft: `3px solid ${accent.secondary}` }}
          >
            <div className="absolute -left-3 -top-2 p-1.5 rounded-full" style={{ backgroundColor: `${accent.secondary}1A` }}>
              <Quote className="w-4 h-4" style={{ color: accent.secondary }} />
            </div>
            <p className="text-xl md:text-2xl font-bold italic text-white/90 leading-snug">
              &ldquo;{radar.quote}&rdquo;
            </p>
          </motion.div>

          {/* ANALYSIS OUTPUT PANEL — always active, never empty */}
          <div className="relative mt-8">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeMetric}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-xl bg-gray-900/50 border border-white/10 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: metrics[activeMetric].color, boxShadow: `0 0 10px ${metrics[activeMetric].color}` }} />
                  <h4 className="text-lg font-bold font-mono uppercase tracking-wider" style={{ color: metrics[activeMetric].color }}>{metrics[activeMetric].label}</h4>
                  <span className="ml-auto text-sm font-mono text-gray-500">{metrics[activeMetric].value}%</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{metrics[activeMetric].desc}</p>
                {/* Progress bar */}
                <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metrics[activeMetric].value}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: metrics[activeMetric].color }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative flex items-center justify-center w-full max-w-[400px] mx-auto lg:max-w-none">
          <div className="relative w-full aspect-square" onMouseLeave={handleLeave}>
            <svg viewBox="-90 -20 480 340" className="w-full h-full" style={{ filter: `drop-shadow(0 0 50px ${accent.primary}33)` }}>
              {bgPoints.map((points: string, i: number) => (<polygon key={i} points={points} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />))}
              {metrics.map((_: unknown, i: number) => { const p = getPoint(i, 5, 120); return <line key={i} x1="150" y1="150" x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />; })}
              <motion.polygon initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} points={radarPoints} fill={`${accent.primary}4D`} stroke={accent.primary} strokeWidth="2" style={{ filter: `drop-shadow(0 0 10px ${accent.primary})` }} />

              {/* Vertex nodes + Axis labels */}
              {metrics.map((m: { label: string; value: number; color: string }, i: number) => {
                const p = getPoint(i, 5, 120 * (m.value / 100));
                const labelP = getPoint(i, 5, 140);
                const { anchor, dx, dy } = getLabelAnchor(i);
                const isActive = activeMetric === i;
                return (
                  <g
                    key={i}
                    onMouseEnter={() => handleInteract(i)}
                    onClick={() => handleInteract(i)}
                    className="cursor-pointer"
                  >
                    {/* Glow ring for active */}
                    {isActive && (
                      <circle cx={p.x} cy={p.y} r="14" fill="none" stroke={m.color} strokeWidth="1.5" opacity={0.4} className="animate-ping" />
                    )}
                    {/* Outer glow */}
                    {isActive && (
                      <circle cx={p.x} cy={p.y} r="10" fill={`${m.color}33`} stroke="none" />
                    )}
                    {/* Node dot */}
                    <circle
                      cx={p.x} cy={p.y}
                      r={isActive ? 7 : 5}
                      fill={isActive ? m.color : "#000"}
                      stroke={m.color}
                      strokeWidth="2"
                      style={{ transition: 'all 0.3s ease', filter: isActive ? `drop-shadow(0 0 8px ${m.color})` : 'none' }}
                    />
                    {/* Axis label */}
                    <text
                      x={labelP.x + dx}
                      y={labelP.y + dy}
                      textAnchor={anchor}
                      fill={isActive ? m.color : '#9ca3af'}
                      fontSize="11"
                      fontFamily="system-ui, sans-serif"
                      className="uppercase"
                      style={{ transition: 'fill 0.3s ease', fontWeight: isActive ? 700 : 400, letterSpacing: '0.05em' }}
                    >
                      {m.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// 3. DEEP DIVE MODAL EXTRACTED

// 4. PHILOSOPHY SECTION EXTRACTED


// 6. PRODUCTS SECTION
const ProductsSection = () => {
  const { t, accent } = useLanguage();
  const prod = t.products;

  return (
    <section id="products" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="font-semibold tracking-wider text-sm uppercase mb-4 block" style={{ color: accent.primary }}>{prod.badge}</span>
            <h2 className="text-4xl md:text-5xl font-bold">{prod.title}</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-gray-400 max-w-md md:text-right text-left">{prod.subtitle}</motion.p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative p-10 rounded-4xl bg-[#0a0a0a] border border-white/10 overflow-hidden transition-all duration-500" style={{ '--hover-border': `${accent.primary}4D` } as React.CSSProperties} onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent.primary}4D`)} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 transition-colors" style={{ backgroundColor: `${accent.primary}1A` }} />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12"><div className="p-4 rounded-2xl" style={{ backgroundColor: `${accent.primary}1A`, color: accent.primary, boxShadow: `inset 0 0 0 1px ${accent.primary}33` }}><Network className="w-8 h-8" /></div><span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-white/5 text-gray-300 border border-white/10 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>{prod.kampusyolunda.status}</span></div>
              <h3 className="text-3xl font-bold mb-4 transition-colors" style={{ '--hover-color': accent.primary } as React.CSSProperties}>{prod.kampusyolunda.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8" dangerouslySetInnerHTML={{ __html: prod.kampusyolunda.description }} />
              <Link href="/case-studies" className="inline-flex items-center gap-2 font-medium group-hover:gap-4 transition-all hover:text-white" style={{ color: accent.primary }}><span>{prod.kampusyolunda.cta}</span><ArrowRight className="w-4 h-4" /></Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group relative p-10 rounded-4xl bg-[#0a0a0a] border border-white/10 overflow-hidden transition-all duration-500" onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent.secondary}4D`)} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 transition-colors" style={{ backgroundColor: `${accent.secondary}1A` }} />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12"><div className="p-4 rounded-2xl" style={{ backgroundColor: `${accent.secondary}1A`, color: accent.secondary, boxShadow: `inset 0 0 0 1px ${accent.secondary}33` }}><Eye className="w-8 h-8" /></div><span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide text-[#101214]" style={{ backgroundColor: accent.primary, boxShadow: `0 0 15px ${accent.primary}80` }}>{prod.vae.status}</span></div>
              <h3 className="text-3xl font-bold mb-4 transition-colors">{prod.vae.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">{prod.vae.description}</p>
              <Link href="/case-studies" className="inline-flex items-center gap-2 font-medium group-hover:gap-4 transition-all hover:text-white" style={{ color: accent.secondary }}><span>{prod.vae.cta}</span><ArrowRight className="w-4 h-4" /></Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};




export default function Home() {
  return (
    <main className="min-h-screen bg-[#101214] text-white selection:bg-[var(--accent-primary)]/30">
      <MetaHead pageKey="home" />
      <HeroSection />
      <CognitiveRadar />
      <Services />
      <PhilosophySection />
      <CognitiveDashboard />

      {/* 4. PROCESS SECTION (New Timeline) */}
      <TimelineSection />

      {/* 5. TECH STACK (New Toolkit) */}
      <TechStackSection />

      {/* 6. CASE STUDIES (Formerly Products) */}
      <CaseStudiesSection />
    </main>
  );
}