"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { Language } from '@/lib/types';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';

const translations = { en, hi };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    const browserLang = navigator.language.startsWith('hi') ? 'hi' : 'en';
    if (storedLang && ['en', 'hi'].includes(storedLang)) {
      setLanguageState(storedLang);
    } else {
      setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  };

  const t = (key: keyof typeof en): string => {
    return translations[language][key] || translations['en'][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
