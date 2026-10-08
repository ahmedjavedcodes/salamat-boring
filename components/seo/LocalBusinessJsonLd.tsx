import type { ServiceItem } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { localBusinessJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';

export function LocalBusinessJsonLd({
  lang,
  services,
}: {
  lang: Locale;
  services: readonly ServiceItem[];
}) {
  return (
    <script
      type="application/ld+json"
      // Already escaped by serializeJsonLd, which replaces "<" so the payload cannot
      // close this tag.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(localBusinessJsonLd(lang, services)) }}
    />
  );
}
