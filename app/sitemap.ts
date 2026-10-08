import type { MetadataRoute } from 'next';

import { localeUrl } from '@/lib/i18n/paths';

const languages = {
  'en-PK': localeUrl('en'),
  'ur-PK': localeUrl('ur'),
  'x-default': localeUrl('en'),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: localeUrl('en'),
      alternates: { languages },
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: localeUrl('ur'),
      alternates: { languages },
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
