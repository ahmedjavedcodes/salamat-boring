import { business } from '../business';
import type { HeroCopy } from '../types';

const city = business.address.city.en;

export const hero = {
  title: `Water boring, pumps and sanitary fitting in ${city}`,
  support:
    'We drill new bores, supply and install pumps and motors, and do bathroom, kitchen and plumbing work.',
  whatsappCta: 'Message us on WhatsApp',
  whatsappMessage: `Assalam o alaikum. I found your website and I want to ask about water boring and sanitary work in ${city}.`,
  callCta: 'Call now',
  areasLabel: 'Areas served',
  illustration: {
    title: 'How a water bore reaches groundwater',
    description:
      'A cross-section through the ground: topsoil, clay and sand above a water-bearing layer, with a bore pipe running down through them and a filter section where the water comes in.',
    layers: {
      topsoil: 'Topsoil',
      clay: 'Clay',
      sand: 'Sand',
      water: 'Water-bearing layer',
    },
    pipe: 'Bore pipe',
  },
} satisfies HeroCopy;
