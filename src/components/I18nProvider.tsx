"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppDictionary, DEFAULT_LOCALE, DICTIONARIES, isLocale, Locale } from "@/lib/i18n";

const STORAGE_KEY = "coolie-locale";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: AppDictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    const storedLocale = localStorage.getItem(STORAGE_KEY);
    return storedLocale && isLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;

    const dict = DICTIONARIES[locale];
    document.title = dict.meta.title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", dict.meta.description);
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dict: DICTIONARIES[locale],
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
