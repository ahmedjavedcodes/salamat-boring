import type { Locale } from './config';
import { isLocale } from './config';

const STORAGE_KEY = 'msbs.locale';

export function readStoredLocale(): Locale | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v && isLocale(v) ? v : null;
  } catch {
    return null; // private mode or storage disabled
  }
}

export function persistLocale(l: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* ignore — cookie still persists the choice */
  }
  document.cookie = `NEXT_LOCALE=${l}; Path=/; Max-Age=31536000; SameSite=Lax`;
  emit();
}

/**
 * localStorage as an external store, so LanguageProvider can read it with
 * useSyncExternalStore instead of a setState-in-effect. The server snapshot is `null`,
 * which is what keeps the first-visit prompt out of the server-rendered HTML (§4.5).
 */
let listeners: (() => void)[] = [];

function emit(): void {
  for (const listener of listeners) listener();
}

export function subscribeStoredLocale(onChange: () => void): () => void {
  listeners = [...listeners, onChange];
  return () => {
    listeners = listeners.filter((listener) => listener !== onChange);
  };
}

/** Client snapshot: a primitive, so it is referentially stable between reads. */
export function hasStoredLocale(): boolean {
  return readStoredLocale() !== null;
}

export function hasStoredLocaleOnServer(): null {
  return null;
}
