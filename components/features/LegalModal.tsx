'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LegalModalProps {
    type: 'privacy' | 'terms';
    onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
    const { t, accent } = useLanguage();
    const content = t.legal?.[type];

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!content) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-10"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-4xl max-h-[90vh] bg-[#0A0B0D] border border-white/10 rounded-[32px] overflow-hidden relative shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 sticky top-0 bg-[#0A0B0D]/80 backdrop-blur-xl z-20">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: accent.primary }}>
                            {content.title}
                        </h2>
                        {content.lastUpdated && (
                            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                                {content.lastUpdated}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/5 active:scale-95"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
                    <div
                        className="prose prose-sm prose-invert prose-cyan max-w-none 
                        prose-headings:text-white prose-headings:font-bold 
                        prose-p:text-gray-400 prose-p:leading-relaxed
                        prose-li:text-gray-400 prose-li:my-3 prose-strong:text-white
                        prose-h2:text-lg md:text-xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h2:border-l-4 prose-h2:pl-4"
                        style={{
                            // @ts-ignore
                            '--tw-prose-bullets': accent.primary,
                            borderLeftColor: accent.primary
                        } as any}
                        dangerouslySetInnerHTML={{ __html: content.content }}
                    />
                </div>

                {/* Footer / Indicator */}
                <div className="p-4 bg-white/[0.02] border-t border-white/5 flex justify-center items-center">
                    <div className="w-12 h-1 bg-white/10 rounded-full" />
                </div>
            </motion.div>
        </motion.div>
    );
}
