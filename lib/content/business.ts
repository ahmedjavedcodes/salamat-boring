/**
 * Single source of truth for business facts (CLAUDE.md §1.6).
 *
 * `VERIFY` values come from the client's Facebook page. They are usable now but must be
 * confirmed before launch, because the name, address and phone have to match the Google
 * Business Profile character for character.
 *
 * `TODO(client)` values are unknown. They are null or empty on purpose: every consumer
 * checks before rendering, so nothing placeholder ever reaches the page or the JSON-LD.
 * Never replace one with a guess.
 */

export type LocalizedText = { en: string; ur: string };

export type Business = {
  name: LocalizedText;
  phoneDisplay: string;
  phoneE164: string;
  whatsapp: string;
  email: string;
  address: {
    street: LocalizedText;
    city: LocalizedText;
    region: LocalizedText;
    country: string;
  };
  hours: { alwaysOpen: boolean };
  /** TODO(client): copy from the Google Business Profile pin. */
  geo: { latitude: number; longitude: number } | null;
  /** TODO(client): likely Township and nearby Lahore areas. Not rendered while empty. */
  serviceAreas: readonly LocalizedText[];
  /** TODO(client): omit the "years in business" claim entirely until this is known. */
  yearEstablished: number | null;
  /** TODO(client): do not name a brand until the client confirms what is stocked. */
  pumpBrands: readonly string[];
  facebookUrl: string;
  /** TODO(client). */
  googleBusinessUrl: string | null;
};

export const business: Business = {
  name: {
    en: 'Mian Salamat Boring and Sanitary House',
    ur: 'میاں سلامت بورنگ اینڈ سینیٹری ہاؤس',
  },
  phoneDisplay: '0304 7741748',
  phoneE164: '+923047741748',
  whatsapp: '923047741748', // VERIFY this number is on WhatsApp
  email: 'mzaid929@yahoo.com', // VERIFY it is monitored for leads
  address: {
    street: {
      en: 'Al-Madinah Road, Barket Chowk, Township', // VERIFY spelling against GBP
      ur: 'المدینہ روڈ، برکت چوک، ٹاؤن شپ', // native speaker to review
    },
    city: { en: 'Lahore', ur: 'لاہور' },
    region: { en: 'Punjab', ur: 'پنجاب' },
    country: 'PK',
  },
  hours: { alwaysOpen: true }, // VERIFY — Facebook's "Always open" is sometimes a default
  geo: null, // TODO(client)
  serviceAreas: [], // TODO(client)
  yearEstablished: null, // TODO(client)
  pumpBrands: [], // TODO(client)
  facebookUrl: 'https://www.facebook.com/p/Mian-Salamat-boring-and-sanitary-house-100064841959870/',
  googleBusinessUrl: null, // TODO(client)
};
