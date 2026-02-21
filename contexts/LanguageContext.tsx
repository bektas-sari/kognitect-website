'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import trData from '@/locales/tr.json';
import enData from '@/locales/en.json';

export type Locale = 'tr' | 'en';
export type Theme = 'thermal' | 'hightech';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LocaleData = Record<string, any>;

interface LanguageContextType {
    locale: Locale;
    theme: Theme;
    t: LocaleData;
    toggleLocale: () => void;
    setLocale: (locale: Locale) => void;
    /** Accent colors for inline styles that can't use CSS vars directly */
    accent: { primary: string; secondary: string };
}

const ACCENTS: Record<Theme, { primary: string; secondary: string }> = {
    thermal: { primary: '#4ECDC4', secondary: '#FF6B6B' },
    hightech: { primary: '#6366F1', secondary: '#3B82F6' },
};

const locales: Record<Locale, LocaleData> = { tr: trData, en: enData };

const LanguageContext = createContext<LanguageContextType>({
    locale: 'tr',
    theme: 'thermal',
    t: trData,
    toggleLocale: () => { },
    setLocale: () => { },
    accent: ACCENTS.thermal,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocaleState] = useState<Locale>('tr');
    const theme: Theme = locale === 'tr' ? 'thermal' : 'hightech';
    const accent = ACCENTS[theme];

    // Sync theme class on <html> element
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'hightech') {
            root.classList.add('theme-hightech');
        } else {
            root.classList.remove('theme-hightech');
        }
    }, [theme]);

    const toggleLocale = useCallback(() => {
        setLocaleState((prev) => (prev === 'tr' ? 'en' : 'tr'));
    }, []);

    const setLocale = useCallback((l: Locale) => {
        setLocaleState(l);
    }, []);

    const t = locales[locale];

    return (
        <LanguageContext.Provider value={{ locale, theme, t, toggleLocale, setLocale, accent }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
export default LanguageContext;
