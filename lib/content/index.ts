import 'server-only';

import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from './types';

const dictionaries = {
  en: () => import('./en').then((m) => m.default),
  ur: () => import('./ur').then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export function getDictionary(lang: Locale): Promise<Dictionary> {
  return dictionaries[lang]();
}
