import type { Metadata } from 'next';

import { business } from '@/lib/content/business';
import { metaKeywords } from '@/lib/content/keywords';
import type { PageMeta } from '@/lib/content/types';
import { type Locale, localeMeta, localePath, otherLocale } from '@/lib/i18n/config';
import { localeUrl, siteUrl } from '@/lib/i18n/paths';

export function buildPageMetadata(lang: Locale, meta: PageMeta): Metadata {
  const url = localeUrl(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    // Obsolete for Google's own ranking, but still a standard, harmless tag some
    // directories/audits check for. Built from the already-curated clusters in
    // lib/content/keywords.ts, not invented here.
    keywords: metaKeywords(lang),
    applicationName: business.name[lang],
    alternates: {
      canonical: url,
      languages: {
        'en-PK': localePath('en'),
        'ur-PK': localePath('ur'),
        'x-default': localePath('en'),
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: business.name[lang],
      title: meta.ogTitle,
      description: meta.ogDescription,
      locale: localeMeta[lang].ogLocale,
      alternateLocale: [localeMeta[otherLocale(lang)].ogLocale],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
    },
    formatDetection: { telephone: true },
  };
}
