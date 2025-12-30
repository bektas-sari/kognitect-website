'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  MousePointer2
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
    description: string; // The metaphorical explanation
    technical: string;   // The scientific backing
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
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 bg-[#020202]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[50px_50px]" />
        <div className="absolute top-[-10%] left-[-10%] w-175 h-175 bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-175 h-175 bg-purple-900/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-200 tracking-wide uppercase">Cognitive Architecture System</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-white">
                We Engineer
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-blue-400 to-purple-400 text-glow">
                Decisions.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
          >
            We fuse <span className="text-white font-medium">Neuroscience</span> with <span className="text-white font-medium">AI Technology</span> to build rational digital ecosystems.
            <br/>
            Reduced friction. Optimized attention. Measurable trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-6"
          >
            <a href="#radar" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <span className="text-lg font-bold">Inspect Architecture</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>

            {/* GÜNCELLENDİ: Link #philosophy yerine #methodology oldu */}
            <a href="#methodology" className="px-8 py-4 rounded-full text-gray-400 border border-white/5 hover:bg-white/5 hover:text-white transition-all text-lg font-medium flex items-center gap-2">
              <Activity className="w-5 h-5" />
              The Science
            </a>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center h-100 lg:h-175 w-full mt-10 lg:mt-0"
        >
             <div className="relative w-64 h-64 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 border border-dashed border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Layers className="w-24 h-24 text-white/90 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                </div>
             </div>
        </motion.div>
      </div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

// 2. RADAR CHART
const CognitiveRadar = () => {
    const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

    const metrics = [
        { id: 0, label: "Retention", value: 95, color: "#3b82f6", desc: "Long-term user loyalty generated by habit-forming design." },
        { id: 1, label: "Clarity", value: 90, color: "#8b5cf6", desc: "Zero ambiguity. The brain understands the interface instantly." },
        { id: 2, label: "Speed", value: 85, color: "#10b981", desc: "Reduced time-to-task. Frictionless cognitive pathways." },
        { id: 3, label: "Trust", value: 100, color: "#f59e0b", desc: "Psychological safety established through consistency." },
        { id: 4, label: "Focus", value: 90, color: "#ec4899", desc: "Attention management via saliency mapping." },
    ];

    const getPoint = (index: number, total: number, radius: number) => {
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        return { x: 150 + radius * Math.cos(angle), y: 150 + radius * Math.sin(angle) };
    };

    const radarPoints = metrics.map((m, i) => {
        const p = getPoint(i, 5, 120 * (m.value / 100)); 
        return `${p.x},${p.y}`;
    }).join(" ");

    const bgPoints = [100, 75, 50, 25].map(percent => {
        return metrics.map((_, i) => {
            const p = getPoint(i, 5, 120 * (percent / 100));
            return `${p.x},${p.y}`;
        }).join(" ");
    });

    return (
        <section id="radar" className="py-32 px-6 bg-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-150 h-150 bg-blue-900/5 rounded-full blur-[100px] -z-10" />
            
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <span className="text-blue-500 font-mono text-sm tracking-widest uppercase">Performance Metrics</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">We Don't Guess. <br/><span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">We Measure the Mind.</span></h2>
                    <p className="text-gray-400 text-lg leading-relaxed">A pretty interface means nothing if the brain rejects it. We audit and optimize your product against 5 core cognitive pillars.</p>
                    
                    <div className="h-40 relative mt-8">
                        <AnimatePresence mode='wait'>
                            {hoveredMetric !== null ? (
                                <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <h4 className="text-xl font-bold mb-2" style={{ color: metrics[hoveredMetric].color }}>{metrics[hoveredMetric].label}</h4>
                                    <p className="text-gray-300">{metrics[hoveredMetric].desc}</p>
                                </motion.div>
                            ) : (
                                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 rounded-2xl border border-dashed border-white/10 flex items-center justify-center h-full text-gray-600">
                                    <span className="animate-pulse">Waiting for input... Hover chart to analyze.</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative flex items-center justify-center">
                    <div className="relative w-87.5 h-87.5 md:w-112.5 md:h-112.5">
                        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                            {bgPoints.map((points, i) => (<polygon key={i} points={points} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />))}
                            {metrics.map((_, i) => { const p = getPoint(i, 5, 120); return <line key={i} x1="150" y1="150" x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />; })}
                            <motion.polygon initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} points={radarPoints} fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_10px_#3b82f6]" />
                            {metrics.map((m, i) => {
                                const p = getPoint(i, 5, 120 * (m.value / 100));
                                return (
                                    <g key={i} onMouseEnter={() => setHoveredMetric(i)} onMouseLeave={() => setHoveredMetric(null)} className="cursor-pointer group">
                                        <circle cx={p.x} cy={p.y} r="6" fill="#000" stroke={m.color} strokeWidth="2" className="transition-all duration-300 group-hover:r-8 group-hover:fill-white" />
                                        <text x={p.x} y={p.y - 15} textAnchor="middle" fill="white" fontSize="10" className="opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-wider">{m.label} {m.value}%</text>
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

// 3. NEW VISUAL MODAL (The Show Stopper)
const DeepDiveModal = ({ data, onClose }: { data: DeepDiveData, onClose: () => void }) => {
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
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>

                {/* Left Side: The Simulation/Visual */}
                <div className="w-full md:w-5/12 bg-linear-to-br from-blue-900/10 to-purple-900/10 border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-between relative overflow-hidden">
                    {/* Background Animation */}
                    <div className="absolute inset-0 opacity-20">
                         <div className="absolute top-0 left-0 w-full h-px bg-blue-500/50 animate-[scan_2s_linear_infinite]" />
                    </div>

                    <div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${data.color === "blue" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "bg-purple-500/10 border-purple-500/30 text-purple-400"}`}>
                            <Zap className="w-3 h-3 animate-pulse" />
                            <span className="text-xs font-mono uppercase tracking-widest">Protocol Activated</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{data.title}</h2>
                        <h3 className="text-lg text-gray-500 font-mono uppercase">{data.subtitle}</h3>
                    </div>

                    {/* Simulated Analysis Visual */}
                    <div className="flex-1 flex items-center justify-center my-8">
                        <div className="relative w-48 h-48 md:w-64 md:h-64">
                            <div className={`absolute inset-0 rounded-full border-2 border-dashed animate-[spin_10s_linear_infinite] ${data.color === "blue" ? "border-blue-500/20" : "border-purple-500/20"}`} />
                            <div className={`absolute inset-4 rounded-full border border-dotted animate-[spin_15s_linear_infinite_reverse] ${data.color === "blue" ? "border-blue-500/40" : "border-purple-500/40"}`} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <data.icon className={`w-20 h-20 md:w-24 md:h-24 opacity-80 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] ${data.color === "blue" ? "text-blue-400" : "text-purple-400"}`} />
                            </div>
                        </div>
                    </div>

                    {/* Mini Metrics Grid */}
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

                {/* Right Side: The Content */}
                <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                    <div className="space-y-10">
                        {/* Metaphor Block */}
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-4">
                                <Search className="w-4 h-4 text-blue-500" /> The Problem
                            </h4>
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light border-l-2 border-blue-500 pl-6">
                                "{data.description}"
                            </p>
                        </div>

                        {/* Science Block */}
                        <div className="bg-white/3 p-6 rounded-2xl border border-white/5">
                            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-4">
                                <Brain className="w-4 h-4 text-purple-500" /> The Science
                            </h4>
                            <p className="text-gray-400 leading-relaxed">
                                {data.technical}
                            </p>
                        </div>

                        {/* CTA within Modal */}
                        <div className="pt-4">
                             <a href="#contact" onClick={onClose} className="inline-flex w-full md:w-auto justify-center items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                Initialize {data.title} <ArrowRight className="w-4 h-4" />
                             </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const PhilosophySection = () => {
  const [selectedTopic, setSelectedTopic] = useState<DeepDiveData | null>(null);

  // GÜNCELLENMİŞ DATA: PDF'ten alınan güçlü metaforlar
  const topics: DeepDiveData[] = [
    { 
      id: "static",
      title: "Static Engineer", 
      subtitle: "Foundation Architecture",
      icon: Layers, 
      color: "blue",
      description: "Most agencies are interior decorators. They sell you pretty curtains (UI) while the building's foundation is rotting. If the columns don't hold the weight of Cognitive Load, the house collapses at the first tremor.",
      technical: "We calculate the 'Cognitive Static Load' of every screen. Using Hick's Law and Working Memory limits, we place information columns exactly where the brain expects them, ensuring zero structural failure during user navigation.",
      metrics: [{label: "Stability", value: "99.9%", trend: "up"}, {label: "Load Capacity", value: "Optimized", trend: "up"}]
    },
    { 
      id: "noise",
      title: "Noise Cancellation", 
      subtitle: "Signal Processing",
      icon: Network, 
      color: "purple",
      description: "The internet is a deafening noise chamber. Competitors shout louder with brighter colors, causing 'Perceptual Blindness'. We don't shout. We find the brain's natural frequency and transmit a pure, clear signal.",
      technical: "Utilizing Signal Detection Theory, we reduce the signal-to-noise ratio in your interface. By removing visual clutter (noise), we increase the 'Saliency' of your core value proposition, making conversion the only logical path.",
      metrics: [{label: "Clarity", value: "High", trend: "up"}, {label: "Distraction", value: "0%", trend: "down"}]
    },
    { 
      id: "lock",
      title: "Biological Locksmith", 
      subtitle: "Evolutionary Fit",
      icon: Lock, 
      color: "blue",
      description: "Old software is a tight shoe that causes friction blisters. We act as biological locksmiths. We analyze the evolutionary keyhole of the human mind and carve the technology to fit perfectly with a satisfying 'click'.",
      technical: "We leverage Evolutionary Psychology principles. Humans are hardwired for energy conservation. Our designs align with 'The Path of Least Resistance', removing micro-frictions that cause cortisol spikes (stress) in users.",
      metrics: [{label: "Friction", value: "Minimal", trend: "down"}, {label: "Flow State", value: "Active", trend: "up"}]
    },
    { 
      id: "bridge",
      title: "The Bridge", 
      subtitle: "Strategic Crossing",
      icon: Activity, 
      color: "purple",
      description: "You stand on one side with a map (Idea). Between you and success is a wild river of technical chaos. We are the bridge. We don't just carry you across; we correct your compass using real data.",
      technical: "Bridging the gap between abstract Business Goals and concrete Engineering Output. We translate 'make it pop' into specific Saliency Map coordinates and 'make it user-friendly' into quantifiable Time-to-Task metrics.",
      metrics: [{label: "Risk", value: "Mitigated", trend: "down"}, {label: "ROI", value: "Maximized", trend: "up"}]
    }
  ];

  return (
    <section id="methodology" className="py-32 px-6 relative overflow-hidden bg-[#050505]">
      <AnimatePresence>
        {selectedTopic && <DeepDiveModal data={selectedTopic} onClose={() => setSelectedTopic(null)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
             <span className="text-blue-500 font-mono tracking-widest text-sm uppercase mb-4 block">Our Methodology</span>
             <h2 className="text-4xl md:text-5xl font-bold">Scientific Pillars</h2>
             <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Click on a pillar to activate the Deep Dive Analysis.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedTopic(item)}
                className="group p-8 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-blue-500/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-6">{item.subtitle}</p>
                
                <div className="flex items-center text-xs text-blue-500 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    Initiate Scan <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

// 4. PROCESS SECTION
const ProcessSection = () => {
  const steps = [
    { num: "01", title: "Cognitive Diagnostics", desc: "MRI Scan of the Product", detail: "We don't guess. We use heatmaps and behavioral data to find exactly where the brain gets stuck (friction points)." },
    { num: "02", title: "Behavioral Architecture", desc: "The Blueprint", detail: "Before pixels, we design the decision pathways. We map out the user's mental model to ensure flow and clarity." },
    { num: "03", title: "Neuro-Prototyping", desc: "Saliency Optimization", detail: "We apply 'Attention Engineering'. Adjusting contrast, hierarchy, and layout to guide the eye scientifically." },
    { num: "04", title: "Cognitive Engineering", desc: "The Build", detail: "Coding the ecosystem with Next.js & Python. We ensure the backend logic supports the frontend psychology." },
    { num: "05", title: "Continuous Optimization", desc: "Evolution", detail: "Launch is just day one. We measure Retention and Error Rates to refine the product based on real-world brain data." }
  ];

  return (
    <section className="py-32 px-6 bg-[#020202] relative overflow-hidden">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-blue-500/50 to-transparent md:-translate-x-1/2" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-24 relative z-10">
           <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-4 uppercase tracking-widest">The Kognitect Method</span>
           <h2 className="text-4xl md:text-6xl font-bold">From Chaos to <span className="text-blue-500">Clarity.</span></h2>
        </motion.div>
        <div className="relative space-y-24">
          {steps.map((step, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }} className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className={`flex-1 text-left ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <div className="inline-flex items-center gap-3 mb-4"><span className="text-5xl font-bold text-white/10 font-mono">{step.num}</span><span className="text-xl font-bold text-blue-400 uppercase tracking-wider">{step.title}</span></div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.desc}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{step.detail}</p>
              </div>
              <div className="relative flex items-center justify-center w-12 h-12 shrink-0 z-10"><div className="absolute inset-0 bg-black border border-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]" /><div className="w-3 h-3 bg-white rounded-full animate-pulse" /></div>
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. TECH STACK
const TechStack = () => {
  const [activeTech, setActiveTech] = useState<ModalData>(null);
  // Reusing InfoModal for simpler tech details if needed, or could use DeepDive.
  // Keeping InfoModal simple for now to differentiate "Pillars" (Philosophy) from "Tools" (Tech).
  
  const techs = [
    { title: "Computer Vision", icon: Eye, bg: "bg-blue-500/10", color: "text-blue-400", desc: "Gaze Tracking", details: "Using OpenCV and custom YOLO models, we track gaze and attention in real-time video feeds. This allows us to understand exactly where users are looking and for how long." },        
    { title: "Python AI Core", icon: Cpu, bg: "bg-yellow-500/10", color: "text-yellow-400", desc: "Backend Intelligence", details: "The brain behind our algorithms. We use Python for all data processing, machine learning model training, and API orchestration." },
    { title: "Behavioral Science", icon: Brain, bg: "bg-pink-500/10", color: "text-pink-400", desc: "Evolutionary Psych", details: "We apply rigorous scientific principles from psychology and neuroscience. It's not just about what people say they like; it's about how their brains unconsciously react." },    
    { title: "Saliency Mapping", icon: Layers, bg: "bg-purple-500/10", color: "text-purple-400", desc: "Heatmap generation", details: "We generate predictive heatmaps that simulate human vision. This highlights the most 'salient' (attention-grabbing) parts of an interface before any user testing is done." },
    { title: "Next.js & React", icon: Code2, bg: "bg-white/10", color: "text-white", desc: "Structural Framework", details: "We build on the bleeding edge of the web. Server-side rendering (SSR) ensures our applications are solid, SEO-friendly and lightning-fast." },
    { title: "Flutter & Dart", icon: Smartphone, bg: "bg-cyan-500/10", color: "text-cyan-400", desc: "Cross-platform", details: "We develop seamless, high-performance mobile applications that run natively on both iOS and Android from a single codebase." },
  ];

  return (
    <section id="technologies" className="py-32 px-6 border-y border-white/5 bg-black relative">
      <AnimatePresence>
        {activeTech && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setActiveTech(null)}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#0f0f11] border border-white/10 p-8 rounded-2xl max-w-lg w-full relative shadow-[0_0_50px_-10px_rgba(59,130,246,0.1)]" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setActiveTech(null)} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
                    <div className="flex items-center gap-4 mb-6"><div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400"><activeTech.icon className="w-8 h-8" /></div><h3 className="text-2xl font-bold text-white font-mono">{activeTech.title}</h3></div>
                    <p className="text-gray-300 leading-relaxed text-lg font-light">{activeTech.details}</p>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4 block">Our Arsenal</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Powered by Evidence.</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">The engine powering our perception architecture combines modern frameworks with scientific rigor.</p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-6">
          {techs.map((tech, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -5 }} onClick={() => setActiveTech({ ...tech, details: tech.details })} className="group px-8 py-6 rounded-xl bg-white/3 border border-white/10 flex items-center gap-4 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer relative active:scale-95 w-full md:w-auto justify-start md:justify-center">
              <div className={`p-2 rounded-lg ${tech.bg} ${tech.color}`}><tech.icon className="w-5 h-5" /></div>
              <div className="text-left"><span className="block font-semibold text-lg text-gray-200 group-hover:text-white transition-colors">{tech.title}</span><span className="text-xs text-gray-500 uppercase tracking-wide">{tech.desc}</span></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. PRODUCTS SECTION
const ProductsSection = () => {
  return (
    <section id="products" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4 block">Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-bold">Flagship Structures</h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-gray-400 max-w-md md:text-right text-left">Scalable solutions built on our proprietary perception engineering framework.</motion.p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group relative p-10 rounded-4xl bg-[#0a0a0a] border border-white/10 hover:border-blue-500/30 overflow-hidden transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-colors" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12"><div className="p-4 rounded-2xl bg-blue-900/20 text-blue-400 ring-1 ring-blue-500/20"><Network className="w-8 h-8" /></div><span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-white/5 text-gray-300 border border-white/10 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>Construction in Progress</span></div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Kampusyolunda</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">More than a website. We transformed a standard information request into a <strong>gamified Next.js ecosystem</strong>. Designed to align with Gen-Z's dopamine loops, increasing retention and turning university selection into an engaging journey.</p>
              <a href="https://github.com/bektas-sari/kampusyolunda-platform" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:gap-4 transition-all hover:text-white"><span>Inspect Architecture</span><ArrowRight className="w-4 h-4" /></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group relative p-10 rounded-4xl bg-[#0a0a0a] border border-white/10 hover:border-purple-500/30 overflow-hidden transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/20 transition-colors" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12"><div className="p-4 rounded-2xl bg-purple-900/20 text-purple-400 ring-1 ring-purple-500/20"><Eye className="w-8 h-8" /></div><span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">Live Beta</span></div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-purple-400 transition-colors">Visual Attention Engine</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">Proprietary predictive AI that simulates human gaze patterns, allowing us to optimize UX saliency before deployment.</p>
              <a href="https://github.com/bektas-sari/kognitect-visual-attention-engine" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-purple-400 font-medium group-hover:gap-4 transition-all hover:text-white"><span>View Demo on GitHub</span><ArrowRight className="w-4 h-4" /></a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 7. CONTACT & FOOTER
const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
           <div className="inline-block p-4 rounded-full bg-blue-600/10 mb-6"><Zap className="w-8 h-8 text-blue-500" /></div>
           <h2 className="text-4xl font-bold mb-6">Start Building with Science.</h2>
           <p className="text-gray-400 mb-12 text-lg">Ready to construct a rational, high-performance digital ecosystem? <br/>Stop guessing. Consult the architect.</p>
           <form action="https://formspree.io/f/mqazqozk" method="POST" className="space-y-4 text-left max-w-lg mx-auto">
             <div><label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label><input type="text" name="name" id="name" required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600" placeholder="Dr. Bektaş Sarı" /></div>
             <div><label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label><input type="email" name="email" id="email" required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600" placeholder="info@kognitect.com" /></div>
             <div><label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Project Brief</label><textarea name="message" id="message" rows={4} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600" placeholder="Describe the structural problem or the vision..." /></div>
             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-blue-900/20"><Send className="w-4 h-4" /> Initialize Protocol</button>
           </form>
         </motion.div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-600 font-mono">© 2025 Kognitect. Perception Architecture.</div>
        <div className="flex items-center gap-6">
          <a href="mailto:info@kognitect.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"><Mail className="w-4 h-4" />info@kognitect.com</a>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/bektas-sari/" target="_blank" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="https://github.com/bektas-sari" target="_blank" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <HeroSection />
      <CognitiveRadar />
      <PhilosophySection />
      <ProcessSection />
      <TechStack />
      <ProductsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}