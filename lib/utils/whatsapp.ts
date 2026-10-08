import { business } from '@/lib/content/business';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Local-dial digits, not E.164 (CLAUDE.md §8 decision log). `business.phoneE164` is
 * kept for JSON-LD, where schema.org expects the international form.
 */
export function telUrl(): string {
  return `tel:${business.phoneTelHref}`;
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
