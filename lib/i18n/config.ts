export const locales = ['en', 'ur'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeMeta = {
  en: { dir: 'ltr', hreflang: 'en-PK', ogLocale: 'en_PK', label: 'English' },
  ur: { dir: 'rtl', hreflang: 'ur-PK', ogLocale: 'ur_PK', label: 'اردو' },
} as const;

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

/** Canonical public path for a locale. English lives at "/", served from "/en" by a rewrite. */
export const localePath = (l: Locale) => (l === 'en' ? '/' : '/ur');

/** The other locale — there are only two, so this is total. */
export const otherLocale = (l: Locale): Locale => (l === 'en' ? 'ur' : 'en');
