'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import CaseCasesSection from '@/components/features/CaseStudiesSection'; // Reusing the section component

export default function CaseStudiesPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-cyan-500/30">
            <Navbar />
            <div className="pt-32">
                <CaseCasesSection />
            </div>
        </main>
    );
}
