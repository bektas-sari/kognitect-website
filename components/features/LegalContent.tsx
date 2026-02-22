'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import MetaHead from '@/components/MetaHead';

interface LegalContentProps {
    type: 'privacy' | 'terms';
}

export default function LegalContent({ type }: LegalContentProps) {
    const { t, accent } = useLanguage();
    const content = t.legal?.[type];

    if (!content) return null;

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-[#101214]">
            <MetaHead pageKey={type === 'privacy' ? 'privacyPolicy' : 'termsOfUse'} />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: accent.primary }}>
                        {content.title}
                    </h1>

                    {content.lastUpdated && (
                        <p className="text-gray-500 font-mono text-sm mb-12">
                            {content.lastUpdated}
                        </p>
                    )}

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
                </motion.div>
            </div>
        </div>
    );
}
