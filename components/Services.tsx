'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Search, Zap, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import ServiceModal from '@/components/features/ServiceModals';

// Map ALL feature display names → modal IDs (both TR and EN)
const FEATURE_TO_MODAL: Record<string, string> = {
  // Card 1 — Algı Mimarlığı
  'Bilimsel Validasyon': 'bilimsel-validasyon',
  'Scientific Validation': 'bilimsel-validasyon',
  'Nöro-Tasarım': 'noro-tasarim',
  'Neuro-Design': 'noro-tasarim',
  'Kârlılık Analizi': 'karlilik-analizi',
  'Profitability Analysis': 'karlilik-analizi',
  'Marka Stratejisi': 'marka-stratejisi',
  'Brand Strategy': 'marka-stratejisi',
  // Card 2 — Bilişsel Muayene
  'UX Röntgen': 'ux-rontgen',
  'UX X-Ray': 'ux-rontgen',
  'Darboğaz Teşhisi': 'darbogaz-teshisi',
  'Bottleneck Diagnosis': 'darbogaz-teshisi',
  'Bilişsel Yük Analizi': 'bilissel-yuk-analizi',
  'Cognitive Load Analysis': 'bilissel-yuk-analizi',
  'Dönüşüm Optimizasyonu': 'donusum-optimizasyonu',
  'Conversion Optimization': 'donusum-optimizasyonu',
  // Card 3 — Akıllı Otomasyon
  'n8n Otomasyon': 'n8n-otomasyon',
  'n8n Automation': 'n8n-otomasyon',
  'Python Scriptleri': 'python-scriptleri',
  'Python Scripts': 'python-scriptleri',
  'Maliyet Optimizasyonu': 'maliyet-optimizasyonu',
  'Cost Optimization': 'maliyet-optimizasyonu',
  'Sistem Entegrasyonu': 'sistem-entegrasyonu',
  'System Integration': 'sistem-entegrasyonu',
};

const Services = () => {
  const { t, accent } = useLanguage();
  const content = t.services;
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const ICONS = [Eye, Search, Zap];

  return (
    <section id="services" className="py-20 md:py-32 px-6 relative overflow-hidden bg-[#101214]">
      {/* Modal */}
      <ServiceModal modalId={activeModal} onClose={() => setActiveModal(null)} />

      {/* Background ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px]" style={{ backgroundColor: `${accent.secondary}08` }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px]" style={{ backgroundColor: `${accent.primary}08` }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div
          className="absolute top-0 left-0 w-[200px] h-full opacity-[0.03]"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.primary}80, ${accent.secondary}4D, transparent)`,
            animation: 'scan-beam 15s linear infinite',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-mono tracking-widest text-sm uppercase" style={{ color: accent.primary }}>
              {content.badge}
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {content.heading}{' '}
              <br className="hidden sm:block md:block" />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${accent.secondary}, ${accent.primary}, #60A5FA)` }}>
                {content.headingHighlight}
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {content.items.map((service: { id: string; title: string; subtitle: string; description: string; features: string[]; href: string }, idx: number) => {
            const IconComponent = ICONS[idx] || Eye;
            const isCenterCard = idx === 1;
            const cardColor = idx === 0 ? accent.secondary : idx === 1 ? accent.primary : '#60A5FA';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className={`group relative rounded-2xl transition-all duration-500
                  bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
                  ${isCenterCard ? 'p-7 xs:p-9 md:-mt-2 md:mb-2' : 'p-6 xs:p-8'}
                `}
                style={{
                  animation: 'thermal-breathe 4s ease-in-out infinite',
                  animationDelay: `${idx * 0.8}s`,
                  ...(isCenterCard ? { boxShadow: `inset 0 0 0 1px ${accent.primary}1A` } : {}),
                }}
              >
                {/* Glow Effect */}
                <div
                  className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl"
                  style={{
                    background: `radial-gradient(ellipse at 30% 20%, ${accent.secondary}4D, transparent 50%),
                                 radial-gradient(ellipse at 70% 30%, ${accent.primary}40, transparent 50%),
                                 radial-gradient(ellipse at 50% 80%, ${accent.primary}33, transparent 50%)`,
                  }}
                />
                <div
                  className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"
                  style={{
                    background: `conic-gradient(from 180deg at 50% 50%, 
                      ${accent.secondary}26 0deg, 
                      ${accent.primary}1F 120deg, 
                      ${accent.secondary}1A 240deg,
                      ${accent.primary}26 360deg)`,
                  }}
                />

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

                {isCenterCard && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md" style={{ backgroundColor: `${accent.primary}1A`, border: `1px solid ${accent.primary}33`, color: accent.primary }}>
                    Merkez Odak
                  </div>
                )}

                {/* Card Content */}
                <div className="relative z-10">
                  <div className={`${isCenterCard ? 'w-16 h-16' : 'w-14 h-14'} rounded-xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: `${cardColor}1A` }}>
                    <IconComponent className={`${isCenterCard ? 'w-8 h-8' : 'w-7 h-7'} transition-colors`} style={{ color: cardColor }} />
                  </div>

                  <h3 className={`${isCenterCard ? 'text-[26px]' : 'text-2xl'} font-bold text-white mb-1 transition-all duration-300`}>
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-5">
                    {service.subtitle}
                  </p>

                  <p className="text-gray-400 leading-relaxed mb-6 text-[15px]">
                    {service.description}
                  </p>

                  {/* Feature Tags — large, clearly clickable */}
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {service.features.map((feat: string, i: number) => {
                      const modalId = FEATURE_TO_MODAL[feat];
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (modalId) setActiveModal(modalId);
                          }}
                          className="group/tag relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium border transition-all duration-300 text-left cursor-pointer border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                          style={{ backgroundColor: `${cardColor}0D`, color: `${cardColor}CC` }}
                        >
                          <Plus className="w-3.5 h-3.5 opacity-40 group-hover/tag:opacity-100 group-hover/tag:rotate-90 transition-all duration-300 shrink-0" />
                          <span className="group-hover/tag:text-cyan-300 transition-colors">{feat}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* CTA — always links to detail page */}
                  <Link
                    href={service.href}
                    className="flex items-center text-sm font-bold uppercase tracking-wider group/cta"
                  >
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: cardColor }}>{content.cta}</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 opacity-60" style={{ color: cardColor }} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
