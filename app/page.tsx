'use client';

import React, { useState } from 'react';
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
  Smartphone, // Flutter için ikon
  X, // Modal kapatma ikonu
  Send // Form gönderme ikonu
} from 'lucide-react';

// --- Types & Data ---

type ModalData = {
  title: string;
  desc: string;
  details: string;
  icon: any;
} | null;

// --- Components ---

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-black pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN: Text */}
        <div className="space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-blue-200 tracking-wide uppercase">Perception Engineering</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/50">
                We Engineer
              </span>
              <br />
              <span className="text-blue-500 text-glow">Perception.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
          >
            Translating human behavior into measurable digital value through the lens of <span className="text-white font-medium">Neuroscience</span> and <span className="text-white font-medium">Artificial Intelligence</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <a href="#products" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all duration-300 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:scale-105">
              <span className="text-lg font-medium">Explore Architecture</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>

            <a href="#philosophy" className="px-8 py-4 rounded-full text-gray-300 hover:text-white transition-colors text-lg font-medium hover:bg-white/5">
              Our Philosophy
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Visual Placeholder (Abstract Brain/Network) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center h-75 lg:h-150 w-full mt-10 lg:mt-0"
        >
          {/* Placeholder for the 3D Ima  ge - You can replace the img src later */}
          <div className="relative w-full h-full">
            {/* Abstract Glow representing 'Perception' */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-linear-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-[80px] animate-pulse" />
            
            {/* Code/Grid Overlay Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-[80%] h-[80%] border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
               <div className="absolute w-[60%] h-[60%] border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>
            
            {/* Text Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
               <Brain className="w-24 h-24 text-white/20 mx-auto mb-4" />
               <p className="text-white/30 text-sm tracking-[0.2em]">NEURAL ARCHITECTURE</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-600 animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  const [selectedTopic, setSelectedTopic] = useState<ModalData>(null);

  const topics = [
    { 
      title: "Neuroscience", 
      icon: Brain, 
      desc: "Cognitive modeling",
      details: "We don't just design interfaces; we model cognitive loads. By understanding how the brain processes visual information, we create digital experiences that feel instantaneous and intuitive, reducing decision fatigue for users."
    },
    { 
      title: "AI Systems", 
      icon: Network, 
      desc: "Predictive engines",
      details: "Leveraging Python-based deep learning models, we analyze vast datasets to predict user behavior. Our systems adapt in real-time, providing personalized journeys that traditional static web pages cannot offer."
    },
    { 
      title: "Behavioral Data", 
      icon: UsersIcon, 
      desc: "User patterns",
      details: "Every click, scroll, and hover is a data point. We go beyond Google Analytics, using custom telemetry to understand the 'why' behind user actions, turning raw data into actionable design strategies."
    },
    { 
      title: "Product Design", 
      icon: Layers, 
      desc: "Interface architecture",
      details: "Our design system is built on atomic design principles, ensuring scalability and consistency. We fuse aesthetics with function, creating products that are not only beautiful but also mathematically optimized for conversion."
    }
  ];

  return (
    <section id="philosophy" className="py-32 px-6 relative overflow-hidden">
      {/* Modal for Details */}
      <AnimatePresence>
        {selectedTopic && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedTopic(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#111] border border-white/10 p-8 rounded-2xl max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedTopic(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X /></button>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                  <selectedTopic.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">{selectedTopic.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{selectedTopic.details}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 right-0 w-125 h-125 bg-blue-900/10 rounded-full blur-[128px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-12 bg-blue-500/50" />
              <span className="text-blue-400 font-medium tracking-widest text-sm uppercase">Philosophy</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Beyond Code.<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                We Build for the Mind.
              </span>
            </h2>

            <div className="space-y-8 text-lg text-gray-400 leading-relaxed font-light">
              <p>
                In a digital landscape saturated with noise, attention is the scarcest currency.
                Most agencies build for screens; we engineer for the neural pathways that perceive them.
              </p>
              <p>
                Founded by <strong className="text-white font-medium">Dr. Bektaş Sarı</strong> (PhD in Advertising & AI),
                Kognitect bridges the gap between rigor and creativity, transforming behavioral science into
                tangible digital advantage.
              </p>

              <div className="pt-4 flex gap-8">
                <div>
                  <h4 className="text-3xl font-bold text-white mb-1">98%</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Prediction Accuracy</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white mb-1">2.5s</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Avg. Time to Focus</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4 relative"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 rounded-3xl -z-10" />

            {topics.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedTopic(item)}
                className="group p-8 rounded-2xl bg-white/3 border border-white/5 backdrop-blur-sm hover:bg-white/6 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <span className="text-xs text-blue-500 mt-4 block opacity-0 group-hover:opacity-100 transition-opacity">Click to learn more →</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple User Icon Component
const UsersIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);


const TechStack = () => {
  const [activeTech, setActiveTech] = useState<any>(null);

  const techs = [
    { name: "Computer Vision", icon: Eye, bg: "bg-blue-500/10", color: "text-blue-400", desc: "Using OpenCV and custom models to track gaze and attention." },
    { name: "Saliency Mapping", icon: Layers, bg: "bg-purple-500/10", color: "text-purple-400", desc: "Heatmap generation to predict where users look first." },
    { name: "Next.js & React", icon: Code2, bg: "bg-white/10", color: "text-white", desc: "Building high-performance, server-side rendered web apps." },
    { name: "Python AI Core", icon: Cpu, bg: "bg-yellow-500/10", color: "text-yellow-400", desc: "The brain behind our algorithms, handling data processing." },
    { name: "Neuromarketing", icon: Brain, bg: "bg-pink-500/10", color: "text-pink-400", desc: "Applying scientific principles to marketing strategies." },
    { name: "Flutter & Dart", icon: Smartphone, bg: "bg-cyan-500/10", color: "text-cyan-400", desc: "Developing seamless cross-platform mobile experiences." },
  ];

  return (
    <section id="technologies" className="py-32 px-6 border-y border-white/5 bg-white/2 relative">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4 block">Our Arsenal</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Core Technologies</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The sophisticated engine powering our perception architecture, blending modern web frameworks with advanced machine learning.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {techs.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setActiveTech(tech)}
              className="group px-8 py-6 rounded-2xl bg-white/3 border border-white/10 flex items-center gap-4 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer relative"
            >
              <div className={`p-2 rounded-lg ${tech.bg} ${tech.color}`}>
                <tech.icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-lg text-gray-200 group-hover:text-white transition-colors">{tech.name}</span>
              
              {/* Tooltip-like detail on hover/active (Simplified for mobile) */}
              {activeTech === tech && (
                 <motion.div layoutId="tech-active" className="absolute -bottom-20 left-0 right-0 bg-black/90 border border-white/20 p-2 rounded text-xs text-white z-20 md:hidden block">
                    {tech.desc}
                 </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-sm text-gray-500">Tap/Hover cards to see details</p>
      </div>
    </section>
  );
};

const ProductsSection = () => {
  return (
    <section id="products" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase mb-4 block">Innovation</span>
            <h2 className="text-4xl md:text-5xl font-bold">Flagship Products</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-md text-right md:text-right"
          >
            Scalable solutions built on our proprietary perception engineering framework.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product 1: Kampusyolunda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative p-10 rounded-4xl bg-linear-to-b from-white/8 to-transparent border border-white/10 hover:border-blue-500/30 overflow-hidden transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-colors" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 rounded-2xl bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30">
                  <Network className="w-8 h-8" />
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-white/5 text-gray-300 border border-white/10">
                  In Development
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Kampusyolunda</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                A revolutionary decision-support platform for university candidates utilizing behavioral signals and AI to guide academic choices.
              </p>

              <a 
                href="https://github.com/bektas-sari/kampusyolunda-platform" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 font-medium group-hover:gap-4 transition-all hover:text-white"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Product 2: Visual Attention Engine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative p-10 rounded-4xl bg-linear-to-b from-white/8 to-transparent border border-white/10 hover:border-purple-500/30 overflow-hidden transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/20 transition-colors" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 rounded-2xl bg-purple-600/20 text-purple-400 ring-1 ring-purple-500/30">
                  <Eye className="w-8 h-8" />
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                  Live Beta
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4 group-hover:text-purple-400 transition-colors">Visual Attention Engine</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                Proprietary predictive AI that simulates human gaze patterns, allowing us to optimize UX saliency before deployment.
              </p>

              <a 
                href="https://github.com/bektas-sari/kognitect-visual-attention-engine" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 font-medium group-hover:gap-4 transition-all hover:text-white"
              >
                <span>View Demo on GitHub</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-white/2 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
         >
           <h2 className="text-4xl font-bold mb-6">Let's Engineer Your Perception</h2>
           <p className="text-gray-400 mb-12">Ready to transform behavioral science into digital advantage? Reach out to us.</p>
           
           <form action="https://formspree.io/f/mgoerqpo" method="POST" className="space-y-4 text-left max-w-lg mx-auto">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input type="text" name="name" id="name" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Please write your name..." />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input type="email" name="email" id="email" required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Please write your email..." />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea name="message" id="message" rows={4} required className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Tell us about your project..." />
              </div>
              
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
                <Send className="w-4 h-4" /> Send Message
              </button>
           </form>
         </motion.div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-500 text-sm">
          © 2025 Kognitect. All Rights Reserved.
        </div>

        <div className="flex items-center gap-6">
          <a href="mailto:info@kognitect.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <Mail className="w-4 h-4" />
            info@kognitect.com
          </a>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/bektas-sari/" target="_blank" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com/bektas-sari" target="_blank" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <HeroSection />
      <AboutSection />
      <TechStack />
      <ProductsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}