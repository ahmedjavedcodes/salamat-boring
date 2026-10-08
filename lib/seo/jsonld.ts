import { business } from '@/lib/content/business';
import type { ServiceItem } from '@/lib/content/types';
import { type Locale, otherLocale } from '@/lib/i18n/config';
import { localeUrl, ogImageUrl, siteUrl } from '@/lib/i18n/paths';

/**
 * One LocalBusiness object per locale (CLAUDE.md §6.6).
 *
 * Every field whose source is still TODO(client) is omitted rather than filled with a
 * placeholder: geo coordinates, service areas and the Google Business Profile URL. No
 * rating or review count is emitted — the client has none (§1.6).
 */
export function localBusinessJsonLd(lang: Locale, services: readonly ServiceItem[]) {
  const sameAs = [business.facebookUrl, business.googleBusinessUrl].filter(
    (url): url is string => typeof url === 'string',
  );

  return {
    '@context': 'https://schema.org',
    '@type': ['Plumber', 'Store'],
    '@id': `${siteUrl}/#business`,
    name: business.name[lang],
    alternateName: business.name[otherLocale(lang)],
    url: localeUrl(lang),
    telephone: business.phoneE164,
    email: business.email,
    image: ogImageUrl(lang),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street[lang],
      addressLocality: business.address.city[lang],
      addressRegion: business.address.region[lang],
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    ...(business.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: business.geo.latitude,
            longitude: business.geo.longitude,
          },
        }
      : {}),
    ...(business.serviceAreas.length > 0
      ? { areaServed: business.serviceAreas.map((area) => area[lang]) }
      : {}),
    ...(business.hours.alwaysOpen
      ? {
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '00:00',
              closes: '23:59',
            },
          ],
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.name },
      })),
    },
  };
}

/** Escape `<` so the payload cannot close the surrounding script tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
