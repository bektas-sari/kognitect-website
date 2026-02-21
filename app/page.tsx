'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ConsultForm from '@/components/ConsultForm';
import Services from '@/components/Services';
import MetaHead from '@/components/MetaHead';
import CognitiveDashboard from '@/components/features/CognitiveDashboard';
import HeroVisual from '@/components/features/HeroVisual';
import TimelineSection from '@/components/features/TimelineSection';
import TechStackSection from '@/components/features/TechStackSection';
import CaseStudiesSection from '@/components/features/CaseStudiesSection';
import { useLanguage } from '@/contexts/LanguageContext';
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

type DeepDiveData = {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  description: string;
  technical: string;
  metrics: MetricDetail[];
  color: string;
};

type ModalData = {
  title: string;
  desc: string;
  details: string;
  icon: any;
} | null;

// --- Components ---

// 1. HERO SECTION
const HeroSection = () => {
  const { t } = useLanguage();
  const hero = t.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 bg-[#101214]">
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
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            <span dangerouslySetInnerHTML={{ __html: hero.titleLine1 }} />
            <br />
            {hero.titleLine2}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
            {hero.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <a
              href="#contact"
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors text-center"
            >
              {hero.ctaPrimary}
            </a>
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
    <section id="radar" className="py-32 px-6 bg-[#101214] relative overflow-hidden">
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

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative flex items-center justify-center">
          <div className="relative w-87.5 h-87.5 md:w-112.5 md:h-112.5" onMouseLeave={handleLeave}>
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

// 3. DEEP DIVE MODAL
const DeepDiveModal = ({ data, onClose }: { data: DeepDiveData, onClose: () => void }) => {
  const { t, accent } = useLanguage();
  const phil = t.philosophy;
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center p-0 md:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 50 }}
        className="w-full max-w-5xl bg-[#080808] border border-white/10 md:rounded-3xl overflow-hidden relative shadow-2xl min-h-[90vh] md:min-h-0 flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="w-full md:w-5/12 bg-linear-to-br from-blue-900/10 to-purple-900/10 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-px animate-[scan_2s_linear_infinite]" style={{ backgroundColor: `${accent.primary}80` }} />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6" style={{ backgroundColor: `${accent.primary}1A`, borderColor: `${accent.primary}4D`, color: accent.primary }}>
              <Zap className="w-3 h-3 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest">{phil.protocolActive}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{data.title}</h2>
            <h3 className="text-lg text-gray-500 font-mono uppercase">{data.subtitle}</h3>
          </div>

          <div className="flex-1 flex items-center justify-center my-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              <div className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_10s_linear_infinite]" style={{ borderColor: `${accent.primary}33` }} />
              <div className="absolute inset-4 rounded-full border border-dotted animate-[spin_15s_linear_infinite_reverse]" style={{ borderColor: `${accent.primary}66` }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <data.icon className="w-20 h-20 md:w-24 md:h-24 opacity-80" style={{ color: accent.primary, filter: `drop-shadow(0 0 20px rgba(255,255,255,0.2))` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {data.metrics.map((m, i) => (
              <div key={i} className="bg-black/40 p-3 rounded-lg border border-white/5">
                <p className="text-xs text-gray-500 uppercase">{m.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-xl font-bold text-white font-mono">{m.value}</span>
                  {m.trend === "up" && <span className="text-green-500 text-xs">▲</span>}
                  {m.trend === "down" && <span className="text-red-500 text-xs">▼</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
          <div className="space-y-10">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-4">
                <Search className="w-4 h-4" style={{ color: accent.secondary }} /> {phil.problemLabel}
              </h4>
              <div className="max-w-3xl text-xl md:text-2xl text-gray-300 leading-relaxed font-light pl-6" style={{ borderLeft: `2px solid ${accent.secondary}` }}>
                &quot;{data.description.split(/(\{\{h\}\}.*?\{\{\/h\}\}|\{\{d\}\}.*?\{\{\/d\}\}|\{\{w\}\}.*?\{\{\/w\}\})/g).map((part: string, i: number) => {
                  if (part.startsWith('{{h}}')) return <span key={i} className="text-cyan-400 font-semibold">{part.replace(/\{\{h\}\}|\{\{\/h\}\}/g, '')}</span>;
                  if (part.startsWith('{{d}}')) return <span key={i} className="text-gray-500">{part.replace(/\{\{d\}\}|\{\{\/d\}\}/g, '')}</span>;
                  if (part.startsWith('{{w}}')) return <span key={i} className="text-white font-medium">{part.replace(/\{\{w\}\}|\{\{\/w\}\}/g, '')}</span>;
                  return <span key={i}>{part}</span>;
                })}&quot;
              </div>
            </div>

            <div className="bg-white/3 p-6 rounded-2xl border border-white/5">
              <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-4">
                <Brain className="w-4 h-4" style={{ color: accent.primary }} /> {phil.scienceLabel}
              </h4>
              <p className="text-gray-400 leading-relaxed">
                {data.technical.split(/(\{\{w\}\}.*?\{\{\/w\}\})/g).map((part: string, i: number) => {
                  if (part.startsWith('{{w}}')) return <span key={i} className="text-white font-medium">{part.replace(/\{\{w\}\}|\{\{\/w\}\}/g, '')}</span>;
                  return <span key={i}>{part}</span>;
                })}
              </p>
            </div>

            <div className="pt-4">
              <a href="#contact" onClick={onClose} className="inline-flex w-full md:w-auto justify-center items-center gap-2 px-8 py-4 text-[#101214] font-bold rounded-lg hover:opacity-90 transition-colors" style={{ backgroundImage: `linear-gradient(to right, ${accent.primary}, ${accent.primary}CC)` }}>
                {data.title} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PhilosophySection = () => {
  const { t, accent } = useLanguage();
  const phil = t.philosophy;
  const [selectedTopic, setSelectedTopic] = useState<DeepDiveData | null>(null);
  const [mousePositions, setMousePositions] = useState<Record<number, { x: number; y: number } | null>>({});

  const iconMap: Record<string, any> = { static: Layers, noise: Network, lock: Lock, bridge: Activity };

  const topics: DeepDiveData[] = phil.topics.map((topic: any) => ({
    ...topic,
    icon: iconMap[topic.id] || Layers,
    color: topic.id === "noise" || topic.id === "bridge" ? "purple" : "blue",
  }));

  const handleMouseMove = (idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions(prev => ({
      ...prev,
      [idx]: { x: e.clientX - rect.left, y: e.clientY - rect.top },
    }));
  };

  const handleMouseLeave = (idx: number) => {
    setMousePositions(prev => ({ ...prev, [idx]: null }));
  };

  return (
    <section id="methodology" className="py-32 px-6 relative overflow-hidden bg-[#050505]">
      <AnimatePresence>
        {selectedTopic && <DeepDiveModal data={selectedTopic} onClose={() => setSelectedTopic(null)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-mono tracking-widest text-sm uppercase mb-4 block" style={{ color: accent.primary }}>{phil.badge}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">{phil.title}</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{phil.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((item, idx) => {
            const mp = mousePositions[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedTopic(item)}
                onMouseMove={(e) => handleMouseMove(idx, e)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="group relative rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: mp
                    ? `radial-gradient(600px circle at ${mp.x}px ${mp.y}px, rgba(6,182,212,0.12), transparent 40%), rgba(3,7,10,0.8)`
                    : 'rgba(3,7,10,0.8)',
                  border: '1px solid',
                  borderColor: mp ? 'rgba(6,182,212,0.3)' : 'rgba(255,255,255,0.06)',
                  boxShadow: mp ? `0 8px 40px -10px rgba(6,182,212,0.2)` : '0 4px 20px -8px rgba(0,0,0,0.5)',
                }}
              >
                {/* Top accent gradient bar */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                {/* Spotlight glow overlay */}
                {mp && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-60"
                    style={{
                      background: `radial-gradient(400px circle at ${mp.x}px ${mp.y}px, rgba(6,182,212,0.08), transparent 40%)`,
                    }}
                  />
                )}

                {/* Grid pattern overlay for tech feel */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }} />

                <div className="p-8 pt-7 relative z-10">
                  {/* Status dot — top right */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 8px rgba(34,211,238,0.6)' }} />
                    <span className="text-[9px] text-cyan-500 font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Active</span>
                  </div>

                  {/* Icon with ambient glow */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 rounded-2xl bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-colors duration-500" />
                    <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-950/50 to-gray-900/50 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300">
                      <item.icon className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" style={{ strokeWidth: 1.5 }} />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-50 transition-colors">{item.title}</h3>
                  <p className="text-xs text-cyan-600 font-mono uppercase tracking-widest mb-4">{item.subtitle}</p>

                  {/* Description preview — fades out */}
                  <div className="relative h-12 overflow-hidden mb-4">
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description.replace(/\{\{[whd]\}\}|\{\{\/[whd]\}\}/g, '')}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[rgb(3,7,10)] to-transparent" />
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{ color: accent.primary }}>
                    {phil.startScan} <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};



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