import { business } from '../business';
import type { PageMeta } from '../types';

const city = business.address.city.en;

export const meta = {
  // Kept under 60 characters (§6.2), which is why the service list is abbreviated here
  // rather than repeating the full business name.
  title: `Water Boring, Pumps & Sanitary in ${city} | Mian Salamat`,
  description: `Water boring, water pump sales, sanitary house fitting and plumbing repairs in ${city}. Message Mian Salamat Boring & Motor Pump on WhatsApp for a quote.`,
  ogTitle: `Mian Salamat Boring & Motor Pump, ${city}`,
  ogDescription:
    'Water boring, pump and motor sales, sanitary installation and plumbing. See recent work and message us on WhatsApp.',
  ogImageAlt: 'Borehole cross-section illustration with the Mian Salamat Boring & Motor Pump name',
} satisfies PageMeta;
