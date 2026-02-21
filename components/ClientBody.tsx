'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';

export default function ClientBody({ children }: { children: React.ReactNode }) {
    return <LanguageProvider>{children}</LanguageProvider>;
}
