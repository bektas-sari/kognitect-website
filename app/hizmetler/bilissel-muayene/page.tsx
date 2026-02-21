'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ArrowLeft, Brain, Eye, BarChart3, Zap, FileText, Gauge, Map } from 'lucide-react';
import Link from 'next/link';
import MetaHead from '@/components/MetaHead';
import { useLanguage } from '@/contexts/LanguageContext';

const CONTENT = {
    tr: {
        badge: 'Bilişsel Muayene',
        badgeSub: 'Cognitive Audit',
        headline: 'Dijital Ürününüzün',
        headlineHighlight: 'MR Taraması.',
        description: 'Mevcut dijital ürünlerinizin (web/mobil) bilişsel ve teknik röntgenini çekerek, kullanıcı kaybına neden olan darboğazları teşhis ediyor ve aydınlanma sağlıyoruz. Tahmin etmiyoruz. Ölçüyoruz.',
        whatWeDoTitle: 'Ne Yapıyoruz?',
        whatWeDo: [
            { icon: Eye, title: 'UX Röntgen', desc: 'Isı haritaları ve bakış takibi ile kullanıcıların ürününüzle nasıl etkileştiğini bilimsel olarak ölçüyoruz.' },
            { icon: Brain, title: 'Bilişsel Yük Analizi', desc: 'Her ekranın beyin üzerindeki yükünü hesaplayıp, bilgi mimarisini optimize ediyoruz.' },
            { icon: BarChart3, title: 'Dönüşüm Optimizasyonu', desc: 'Sürtünme noktalarını tespit edip dönüşüm oranlarını bilimsel olarak artırıyoruz.' },
            { icon: Zap, title: 'Darboğaz Teşhisi', desc: 'Kullanıcıların nerede kaybolduğunu, nerede terk ettiğini veri ile tespit ediyoruz.' },
        ],
        processTitle: 'Muayene Süreci',
        processSteps: [
            { step: 'Mevcut ürünün davranışsal veri toplaması', output: 'Davranışsal Veri Seti', outputDesc: 'Kullanıcı oturum kayıtları, tıklama verileri ve navigasyon akışlarını içeren ham veri seti.' },
            { step: 'Isı haritası ve bakış takibi analizi', output: 'Isı Haritası Raporu', outputDesc: 'Kullanıcıların en çok ve en az dikkat ettiği alanları görselleştiren detaylı ısı haritası.' },
            { step: 'Bilişsel yük ve sürtünme raporu', output: 'Bilişsel Yük Skoru', outputDesc: 'Her ekranın bilişsel karmaşıklık puanı ve sürtünme noktalarının öncelikli listesi.' },
            { step: 'Optimizasyon önerileri ve uygulama', output: 'Optimizasyon Yol Haritası', outputDesc: 'Önceliklendirilmiş iyileştirme adımları ve beklenen etki projeksiyonları.' },
        ],
        cta: 'Ücretsiz Muayene Başlat',
        back: 'Ana Sayfa',
    },
    en: {
        badge: 'Cognitive Audit',
        badgeSub: 'Bilişsel Muayene',
        headline: 'MRI Scan of Your',
        headlineHighlight: 'Digital Product.',
        description: 'We perform cognitive and technical X-rays of your existing digital products (web/mobile), diagnosing bottlenecks that cause user churn. We don\'t guess. We measure.',
        whatWeDoTitle: 'What We Do',
        whatWeDo: [
            { icon: Eye, title: 'UX X-Ray', desc: 'We scientifically measure how users interact with your product using heatmaps and gaze tracking.' },
            { icon: Brain, title: 'Cognitive Load Analysis', desc: 'We calculate the brain\'s load on every screen and optimize the information architecture.' },
            { icon: BarChart3, title: 'Conversion Optimization', desc: 'We detect friction points and scientifically increase conversion rates.' },
            { icon: Zap, title: 'Bottleneck Diagnosis', desc: 'We use data to identify where users get lost and where they abandon.' },
        ],
        processTitle: 'Audit Process',
        processSteps: [
            { step: 'Behavioral data collection from existing product', output: 'Behavioral Dataset', outputDesc: 'Raw dataset containing user session recordings, click data, and navigation flows.' },
            { step: 'Heatmap and gaze tracking analysis', output: 'Heatmap Report', outputDesc: 'Detailed heatmap visualizing the areas users focus on most and least.' },
            { step: 'Cognitive load and friction report', output: 'Cognitive Load Score', outputDesc: 'Cognitive complexity score per screen and prioritized list of friction points.' },
            { step: 'Optimization recommendations and implementation', output: 'Optimization Roadmap', outputDesc: 'Prioritized improvement steps with projected impact estimates.' },
        ],
        cta: 'Start Free Audit',
        back: 'Home',
    },
};

const OUTPUT_ICONS = [BarChart3, FileText, Gauge, Map];

export default function BilisselMuayene() {
    const { locale, accent } = useLanguage();
    const c = CONTENT[locale];
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-[#101214] text-white pt-28">
            <MetaHead pageKey="bilisselMuayene" />
            {/* Hero */}
            <section className="relative px-6 py-24 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${accent.primary}0A` }} />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${accent.secondary}08` }} />
                    <div
                        className="absolute top-0 left-0 w-[200px] h-full opacity-[0.03]"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent.primary}80, ${accent.secondary}4D, transparent)`, animation: 'scan-beam 14s linear infinite' }}
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors mb-8 group" style={{ '--hover-color': accent.primary } as React.CSSProperties}>
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {c.back}
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl border" style={{ backgroundColor: `${accent.primary}1A`, borderColor: `${accent.primary}33` }}>
                                <Search className="w-8 h-8" style={{ color: accent.primary }} />
                            </div>
                            <div>
                                <h2 className="font-mono text-sm uppercase tracking-widest" style={{ color: accent.primary }}>{c.badge}</h2>
                                <p className="text-xs text-gray-500 font-mono">{c.badgeSub}</p>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            {c.headline} <br />
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${accent.primary}, #60A5FA, ${accent.secondary})` }}>{c.headlineHighlight}</span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">{c.description}</p>
                    </motion.div>
                </div>
            </section>

            {/* What We Do */}
            <section className="px-6 py-20">
                <div className="max-w-5xl mx-auto">
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold mb-12">{c.whatWeDoTitle}</motion.h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {c.whatWeDo.map((item: { icon: any; title: string; desc: string }, idx: number) => (
                            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] transition-all duration-300 group"
                                style={{ animation: 'thermal-breathe 4s ease-in-out infinite', animationDelay: `${idx * 0.5}s` }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent.primary}33`)}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                            >
                                <item.icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" style={{ color: accent.primary }} />
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Process */}
            <section className="px-6 py-20 bg-[#0a0c0e]">
                <div className="max-w-5xl mx-auto">
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold mb-12">{c.processTitle}</motion.h2>
                    <div className="space-y-6">
                        {c.processSteps.map((item: { step: string; output: string; outputDesc: string }, idx: number) => {
                            const OutputIcon = OUTPUT_ICONS[idx] || FileText;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative"
                                    onMouseEnter={() => setHoveredStep(idx)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                >
                                    <div
                                        className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] border transition-all duration-300 cursor-pointer"
                                        style={{
                                            borderColor: hoveredStep === idx ? `${accent.primary}40` : 'rgba(255,255,255,0.06)',
                                            backgroundColor: hoveredStep === idx ? `${accent.primary}08` : 'rgba(255,255,255,0.02)',
                                        }}
                                    >
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300" style={{ backgroundColor: hoveredStep === idx ? `${accent.primary}26` : `${accent.primary}1A`, border: `1px solid ${accent.primary}33` }}>
                                            <span className="font-mono font-bold text-sm" style={{ color: accent.primary }}>0{idx + 1}</span>
                                        </div>
                                        <p className="text-gray-300 text-lg flex-1">{item.step}</p>
                                        <div className="hidden md:flex items-center gap-1 text-xs font-mono uppercase tracking-wider transition-opacity" style={{ color: `${accent.primary}99`, opacity: hoveredStep === idx ? 1 : 0.4 }}>
                                            <ArrowRight className="w-3 h-3" />
                                            {item.output}
                                        </div>
                                    </div>

                                    {/* Preview Popup */}
                                    <AnimatePresence>
                                        {hoveredStep === idx && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 md:right-4 top-full mt-2 z-20 w-80 p-5 rounded-xl backdrop-blur-xl border shadow-2xl"
                                                style={{
                                                    backgroundColor: 'rgba(16,18,20,0.95)',
                                                    borderColor: `${accent.primary}33`,
                                                    boxShadow: `0 20px 60px -10px rgba(0,0,0,0.8), 0 0 30px -5px ${accent.primary}1A`,
                                                }}
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${accent.primary}1A` }}>
                                                        <OutputIcon className="w-5 h-5" style={{ color: accent.primary }} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-mono uppercase tracking-wider text-gray-500">Çıktı / Output</p>
                                                        <h4 className="text-sm font-bold text-white">{item.output}</h4>
                                                    </div>
                                                </div>
                                                <div className="h-px w-full mb-3" style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent.primary}33, transparent)` }} />
                                                <p className="text-sm text-gray-400 leading-relaxed">{item.outputDesc}</p>
                                                <div className="absolute -top-2 right-8 w-4 h-4 rotate-45 border-l border-t" style={{ backgroundColor: 'rgba(16,18,20,0.95)', borderColor: `${accent.primary}33` }} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-20">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.a
                        href="/#contact"
                        className="inline-flex items-center gap-3 px-10 py-5 text-[#101214] rounded-full font-bold text-xl hover:scale-105 transition-transform"
                        style={{ backgroundImage: `linear-gradient(to right, ${accent.primary}, ${accent.primary}CC)` }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {c.cta} <ArrowRight className="w-6 h-6" />
                    </motion.a>
                </div>
            </section>
        </main>
    );
}
