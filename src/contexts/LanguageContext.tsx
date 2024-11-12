'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import { enUS } from '@/i18n/en-US';
import { zhCN } from '@/i18n/zh-CN';

type Language = 'zh-CN' | 'en-US';
type Translations = typeof zhCN;

const translations = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

interface LanguageContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh-CN');

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
  }, []);

  const value = {
    language,
    t: translations[language],
    setLanguage: handleSetLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
