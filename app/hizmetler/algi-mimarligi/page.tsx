'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, ArrowLeft, Sparkles, Brain, BarChart3, Palette } from 'lucide-react';
import Link from 'next/link';
import MetaHead from '@/components/MetaHead';
import { useLanguage } from '@/contexts/LanguageContext';

const CONTENT = {
    tr: {
        badge: 'Algı Mimarlığı',
        badgeSub: 'Perception Architecture',
        headline: 'Fikirden',
        headlineHighlight: 'Kârlı Markaya.',
        description: 'Fikir aşamasındaki projeleri bilimsel validasyon (PhD derinliği) ve nöro-tasarım ilkeleriyle kârlı markalara dönüştürüyoruz. Sadece güzel değil, beynin satın almasını sağlayan ürünler inşa ediyoruz.',
        whatWeDoTitle: 'Ne Yapıyoruz?',
        whatWeDo: [
            { icon: Brain, title: 'Bilimsel Validasyon', desc: 'Fikrinizi PhD düzeyinde araştırma ve nörobilim ilkeleriyle test ediyoruz. Sezgi değil, kanıt.' },
            { icon: Palette, title: 'Nöro-Tasarım', desc: 'Beynin doğal algı mekanizmalarına uyumlu arayüzler tasarlıyoruz. Güzellik değil, bilişsel uyum.' },
            { icon: BarChart3, title: 'Kârlılık Analizi', desc: 'Her tasarım kararını ROI perspektifinden değerlendiriyoruz. Piksel değil, kâr.' },
            { icon: Sparkles, title: 'Marka Stratejisi', desc: 'Markanızı bilimsel olarak konumlandırıyoruz. Logo değil, algı mimarisi.' },
        ],
        processTitle: 'Süreç',
        processSteps: [
            'Fikir analizi ve pazar validasyonu',
            'Nöro-tasarım blueprint çıkarımı',
            'Algı testleri ve A/B optimizasyonu',
            'Kârlı marka lansmanı',
        ],
        cta: 'Ücretsiz Muayene Başlat',
        back: 'Ana Sayfa',
    },
    en: {
        badge: 'Perception Architecture',
        badgeSub: 'Algı Mimarlığı',
        headline: 'From Idea to',
        headlineHighlight: 'Profitable Brand.',
        description: 'We transform early-stage projects into profitable brands through scientific validation (PhD-depth) and neuro-design principles. We build products that don\'t just look good — they make the brain buy.',
        whatWeDoTitle: 'What We Do',
        whatWeDo: [
            { icon: Brain, title: 'Scientific Validation', desc: 'We test your idea with PhD-level research and neuroscience principles. Not intuition — evidence.' },
            { icon: Palette, title: 'Neuro-Design', desc: 'We design interfaces aligned with the brain\'s natural perception mechanisms. Not beauty — cognitive fit.' },
            { icon: BarChart3, title: 'Profitability Analysis', desc: 'We evaluate every design decision from an ROI perspective. Not pixels — profit.' },
            { icon: Sparkles, title: 'Brand Strategy', desc: 'We scientifically position your brand. Not a logo — perception architecture.' },
        ],
        processTitle: 'Process',
        processSteps: [
            'Idea analysis and market validation',
            'Neuro-design blueprint extraction',
            'Perception tests and A/B optimization',
            'Profitable brand launch',
        ],
        cta: 'Start Free Audit',
        back: 'Home',
    },
};

export default function AlgiMimarligi() {
    const { locale, accent } = useLanguage();
    const c = CONTENT[locale];

    return (
        <main className="min-h-screen bg-[#101214] text-white pt-28">
            <MetaHead pageKey="algiMimarligi" />
            {/* Hero */}
            <section className="relative px-6 py-24 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${accent.secondary}0A` }} />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${accent.primary}08` }} />
                    <div
                        className="absolute top-0 left-0 w-[200px] h-full opacity-[0.03]"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent.secondary}80, ${accent.primary}4D, transparent)`, animation: 'scan-beam 14s linear infinite' }}
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {c.back}
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl border" style={{ backgroundColor: `${accent.secondary}1A`, borderColor: `${accent.secondary}33` }}>
                                <Eye className="w-8 h-8" style={{ color: accent.secondary }} />
                            </div>
                            <div>
                                <h2 className="font-mono text-sm uppercase tracking-widest" style={{ color: accent.secondary }}>{c.badge}</h2>
                                <p className="text-xs text-gray-500 font-mono">{c.badgeSub}</p>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            {c.headline} <br />
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${accent.secondary}, ${accent.primary}, #60A5FA)` }}>{c.headlineHighlight}</span>
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
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent.secondary}33`)}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                            >
                                <item.icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" style={{ color: accent.secondary }} />
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="px-6 py-20 bg-[#0a0c0e]">
                <div className="max-w-5xl mx-auto">
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold mb-12">{c.processTitle}</motion.h2>
                    <div className="space-y-6">
                        {c.processSteps.map((step: string, idx: number) => (
                            <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] transition-colors"
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent.secondary}26`)}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent.secondary}1A`, border: `1px solid ${accent.secondary}33` }}>
                                    <span className="font-mono font-bold text-sm" style={{ color: accent.secondary }}>0{idx + 1}</span>
                                </div>
                                <p className="text-gray-300 text-lg">{step}</p>
                            </motion.div>
                        ))}
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
