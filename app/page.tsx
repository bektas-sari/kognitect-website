'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  ChevronDown
} from 'lucide-react';

// --- Components ---

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen" />

        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-200 tracking-wide uppercase">Perception Engineering</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
              We Engineer
            </span>
            <br />
            <span className="text-blue-500 text-glow">Perception.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Translating human behavior into measurable digital value through the lens of <span className="text-white font-medium">Neuroscience</span> and <span className="text-white font-medium">Artificial Intelligence</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4"
        >
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all duration-300 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:scale-105">
            <span className="text-lg font-medium">Explore Architecture</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button className="px-8 py-4 rounded-full text-gray-300 hover:text-white transition-colors text-lg font-medium hover:bg-white/5">
            Our Philosophy
          </button>
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
  return (
    <section id="philosophy" className="py-32 px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[128px] -z-10" />

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
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
            {/* Decovative Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl -z-10" />

            {[
              { title: "Neuroscience", icon: Brain, desc: "Cognitive modeling" },
              { title: "AI Systems", icon: Network, desc: "Predictive engines" },
              { title: "Behavioral Data", icon: UsersIcon, desc: "User patterns" },
              { title: "Product Design", icon: Layers, desc: "Interface architecture" }
            ].map((item, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:bg-white/[0.06] hover:border-blue-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Start: Fix missing icon
const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);


const TechStack = () => {
  const techs = [
    { name: "Computer Vision", icon: Eye, bg: "bg-blue-500/10", color: "text-blue-400" },
    { name: "Saliency Mapping", icon: Layers, bg: "bg-purple-500/10", color: "text-purple-400" },
    { name: "Next.js", icon: Code2, bg: "bg-white/10", color: "text-white" },
    { name: "Python AI Core", icon: Cpu, bg: "bg-yellow-500/10", color: "text-yellow-400" },
    { name: "Neuromarketing", icon: Brain, bg: "bg-pink-500/10", color: "text-pink-400" },
  ];

  return (
    <section id="technologies" className="py-32 px-6 border-y border-white/5 bg-white/[0.02]">
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
            The sophisticated engine powering our perception architecture, blendind modern web frameworks with advanced machine learning.
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
              className="group px-8 py-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4 hover:border-white/20 hover:bg-white/[0.05] transition-all cursor-default"
            >
              <div className={`p-2 rounded-lg ${tech.bg} ${tech.color}`}>
                <tech.icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-lg text-gray-200 group-hover:text-white transition-colors">{tech.name}</span>
            </motion.div>
          ))}
        </div>
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
            className="text-gray-400 max-w-md text-right md:text-right text-left"
          >
            Scalable solutions built on our proprietary perception engineering framework.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative p-10 rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 hover:border-blue-500/30 overflow-hidden transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-colors" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 rounded-2xl bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30">
                  <Network className="w-8 h-8" />
                </div>
                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-white/5 text-gray-300 border border-white/10">
                  Coming Soon
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Kampusyolunda</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                A revolutionary decision-support platform for university candidates utilizing behavioral signals and AI to guide academic choices with unprecedented accuracy.
              </p>

              <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-4 transition-all">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Product 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative p-10 rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 hover:border-purple-500/30 overflow-hidden transition-all duration-500"
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
                Proprietary predictive AI that simulates human gaze patterns, allowing us to optimize UX saliency and conversion rates before a single line of code is deployed.
              </p>

              <div className="flex items-center gap-2 text-purple-400 font-medium group-hover:gap-4 transition-all">
                <span>Try Demo</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-12 px-6 border-t border-white/5 bg-black">
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
            <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
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
      <Footer />
    </main>
  );
}