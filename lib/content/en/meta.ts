import { business } from '../business';
import type { PageMeta } from '../types';

const city = business.address.city.en;

export const meta = {
  title: `Water Boring & Sanitary Services in ${city} | Mian Salamat`,
  description: `Water boring, submersible and solar pump installation, sanitary fitting and plumbing repairs in ${city}. Message Mian Salamat on WhatsApp for a quote.`,
  ogTitle: `Mian Salamat Boring & Sanitary House, ${city}`,
  ogDescription:
    'Boring, pumps and motors, sanitary installation and plumbing. See recent work and message us on WhatsApp.',
  ogImageAlt: 'Borehole cross-section illustration with the Mian Salamat name',
} satisfies PageMeta;
