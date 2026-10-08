import { type Locale, localePath } from './config';

/**
 * Canonical origin. Never hard-code a domain (CLAUDE.md §6.5); the localhost value is
 * only a development fallback so `next build` works before the domain is decided.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(
  /\/+$/,
  '',
);

export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();

/** Public, canonical URL of a locale's page. */
export const localeUrl = (l: Locale) => absoluteUrl(localePath(l));

/**
 * Where Next serves that locale's generated OG image. English renders at the internal
 * /en route, so its image lives under /en even though the page is canonically "/".
 */
export const ogImageUrl = (l: Locale) => absoluteUrl(`/${l}/opengraph-image`);

/** In-page anchors are English in both locales so shared links survive a language switch. */
export const sectionIds = ['home', 'services', 'about', 'work', 'faq', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];
