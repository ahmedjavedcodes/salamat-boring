'use client';

import { createContext, useCallback, useContext, useSyncExternalStore } from 'react';

import { type Locale, localePath } from '@/lib/i18n/config';
import {
  hasStoredLocale,
  hasStoredLocaleOnServer,
  persistLocale,
  subscribeStoredLocale,
} from '@/lib/i18n/persistence';

type LanguageContextValue = {
  locale: Locale;
  /** null until hydrated, so the prompt never renders on the server */
  hasChosen: boolean | null;
  setLocale: (next: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  // null while server-rendering and during hydration, so the prompt never appears in
  // the HTML; the real value arrives on the first client render after hydration.
  const hasChosen = useSyncExternalStore(
    subscribeStoredLocale,
    hasStoredLocale,
    hasStoredLocaleOnServer,
  );

  const setLocale = useCallback(
    (next: Locale) => {
      // persistLocale notifies the store, which re-renders this provider.
      persistLocale(next);
      if (next !== locale) {
        // Full navigation on purpose: <html lang/dir>, fonts and metadata all change.
        // Language switches are rare; correctness beats a client-side transition.
        window.location.assign(localePath(next) + window.location.hash);
      }
    },
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, hasChosen, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
