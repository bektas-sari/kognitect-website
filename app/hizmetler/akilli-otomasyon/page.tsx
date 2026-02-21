'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, ArrowLeft, Cpu, Workflow, BarChart3, Settings } from 'lucide-react';
import Link from 'next/link';
import MetaHead from '@/components/MetaHead';
import { useLanguage } from '@/contexts/LanguageContext';

const CONTENT = {
    tr: {
        badge: 'Akıllı Otomasyon',
        badgeSub: 'Intelligent Engineering',
        headline: 'Operasyonlarınızı',
        headlineHighlight: 'Otomatize Ediyoruz.',
        description: 'n8n iş akışları ve özel Python scriptleri ile operasyonel maliyetinizi azaltan, teknolojik olarak işletmenizi geleceğe taşıyan sistemler kuruyoruz. İnsan hatalarını sıfırlıyoruz.',
        whatWeDoTitle: 'Ne Yapıyoruz?',
        whatWeDo: [
            { icon: Workflow, title: 'n8n Otomasyon', desc: 'Tekrarlayan iş süreçlerinizi n8n ile otomatize ediyor, zamandan ve maliyetten tasarruf sağlıyoruz.' },
            { icon: Cpu, title: 'Python Scriptleri', desc: 'Özel Python çözümleriyle veri işleme, API entegrasyonu ve makine öğrenimi modülleri geliştiriyoruz.' },
            { icon: BarChart3, title: 'Maliyet Optimizasyonu', desc: 'Operasyonel süreçlerinizi analiz edip gereksiz maliyet kalemlerini tespit ve elimine ediyoruz.' },
            { icon: Settings, title: 'Sistem Entegrasyonu', desc: 'Mevcut sistemlerinizi birbirine bağlıyor, veri akışını kesintisiz hale getiriyoruz.' },
        ],
        processTitle: 'Süreç',
        processSteps: [
            'İş süreçlerinin haritalandırılması',
            'Otomasyon fırsatlarının tespiti',
            'n8n + Python ile sistem geliştirme',
            'Test, lansman ve sürekli optimizasyon',
        ],
        cta: 'Ücretsiz Muayene Başlat',
        back: 'Ana Sayfa',
    },
    en: {
        badge: 'Intelligent Engineering',
        badgeSub: 'Akıllı Otomasyon',
        headline: 'Automating Your',
        headlineHighlight: 'Operations.',
        description: 'We build systems using n8n workflows and custom Python scripts that reduce your operational costs and technologically propel your business into the future. We eliminate human error.',
        whatWeDoTitle: 'What We Do',
        whatWeDo: [
            { icon: Workflow, title: 'n8n Automation', desc: 'We automate your repetitive business processes with n8n, saving time and reducing costs.' },
            { icon: Cpu, title: 'Python Scripts', desc: 'We develop custom Python solutions for data processing, API integration, and machine learning modules.' },
            { icon: BarChart3, title: 'Cost Optimization', desc: 'We analyze your operational processes, identifying and eliminating unnecessary cost items.' },
            { icon: Settings, title: 'System Integration', desc: 'We connect your existing systems together, making data flow seamless.' },
        ],
        processTitle: 'Process',
        processSteps: [
            'Business process mapping',
            'Automation opportunity identification',
            'System development with n8n + Python',
            'Testing, launch, and continuous optimization',
        ],
        cta: 'Start Free Audit',
        back: 'Home',
    },
};

export default function AkilliOtomasyon() {
    const { locale, accent } = useLanguage();
    const c = CONTENT[locale];
    const pageColor = '#60A5FA'; // blue-400 as the unique page signature

    return (
        <main className="min-h-screen bg-[#101214] text-white pt-28">
            <MetaHead pageKey="akilliOtomasyon" />
            {/* Hero */}
            <section className="relative px-6 py-24 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${pageColor}0A` }} />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: `${accent.primary}08` }} />
                    <div
                        className="absolute top-0 left-0 w-[200px] h-full opacity-[0.03]"
                        style={{ background: `linear-gradient(90deg, transparent, ${pageColor}80, ${accent.primary}4D, transparent)`, animation: 'scan-beam 14s linear infinite' }}
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {c.back}
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl" style={{ backgroundColor: `${pageColor}1A`, border: `1px solid ${pageColor}33` }}>
                                <Zap className="w-8 h-8" style={{ color: pageColor }} />
                            </div>
                            <div>
                                <h2 className="font-mono text-sm uppercase tracking-widest" style={{ color: pageColor }}>{c.badge}</h2>
                                <p className="text-xs text-gray-500 font-mono">{c.badgeSub}</p>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            {c.headline} <br />
                            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${pageColor}, ${accent.primary}, ${accent.secondary})` }}>{c.headlineHighlight}</span>
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
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${pageColor}33`)}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                            >
                                <item.icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" style={{ color: pageColor }} />
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
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${pageColor}26`)}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${pageColor}1A`, border: `1px solid ${pageColor}33` }}>
                                    <span className="font-mono font-bold text-sm" style={{ color: pageColor }}>0{idx + 1}</span>
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
