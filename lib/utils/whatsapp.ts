import { business } from '@/lib/content/business';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telUrl(): string {
  return `tel:${business.phoneE164}`;
}

export function mailtoUrl(): string {
  return `mailto:${business.email}`;
}

/**
 * Google Maps search for the shop. The Business Profile URL and the map pin are both
 * TODO(client) (CLAUDE.md §1.6), so this searches the confirmed address rather than
 * shipping a placeholder coordinate.
 */
export function mapsUrl(lang: 'en' | 'ur'): string {
  const { street, city, region } = business.address;
  const query = [street[lang], city[lang], region[lang]].join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
