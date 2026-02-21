'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Client-side SEO component.
 * Sets document.title and meta[name="description"] based on the current locale.
 *
 * Usage:  <MetaHead pageKey="caseStudies" />
 */
export default function MetaHead({ pageKey }: { pageKey: string }) {
    const { t } = useLanguage();

    useEffect(() => {
        const seo = t.seo?.[pageKey];
        if (!seo) return;

        // Title
        if (seo.title) document.title = seo.title;

        // Description
        if (seo.description) {
            let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = 'description';
                document.head.appendChild(meta);
            }
            meta.content = seo.description;
        }
    }, [t, pageKey]);

    return null;
}
