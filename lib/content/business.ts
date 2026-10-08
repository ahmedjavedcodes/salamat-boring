/**
 * Single source of truth for business facts (CLAUDE.md §1.6).
 *
 * `VERIFY` values are usable now but must be confirmed before launch, because the
 * name, address and phone have to match the Google Business Profile character for
 * character.
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
  /** Local-dial digits for `tel:` hrefs specifically — see CLAUDE.md §8 for why this
   *  differs from phoneE164. */
  phoneTelHref: string;
  whatsapp: string;
  email: string;
  address: {
    street: LocalizedText;
    city: LocalizedText;
    region: LocalizedText;
    postalCode: string;
    country: string;
  };
  hours: { alwaysOpen: boolean };
  /**
   * Social proof. `VERIFY`: the client supplied these figures directly; they are not
   * yet backed by paperwork or a survey, so they render (unlike a TODO(client) value)
   * but should be checked before launch (§0, §1.6).
   */
  trust: {
    customersServed: number | null;
    satisfactionPercent: number | null;
    yearsActive: number | null;
    projectsCompleted: number | null;
  };
  /** TODO(client): copy from the Google Business Profile pin. */
  geo: { latitude: number; longitude: number } | null;
  /** TODO(client): likely Township and nearby Lahore areas. Not rendered while empty. */
  serviceAreas: readonly LocalizedText[];
  /** TODO(client): omit the "years in business" claim entirely until this is known. */
  yearEstablished: number | null;
  /** TODO(client): do not name a brand until the client confirms what is stocked. */
  pumpBrands: readonly string[];
  facebookUrl: string;
  /** The shop's public Google Maps listing — VERIFY against the Business Profile. */
  googleBusinessUrl: string | null;
};

export const business: Business = {
  name: {
    en: 'Mian Salamat Boring & Motor Pump',
    ur: 'میاں سلامت بورنگ اینڈ موٹر پمپ',
  },
  // VERIFY: matches the pin label on the business's own Google Maps listing, which
  // supersedes the earlier Facebook-derived name (see CLAUDE.md §8 decision log).
  phoneDisplay: '+92 333 4327876',
  phoneE164: '+923334327876',
  phoneTelHref: '03334327876',
  whatsapp: '923334327876', // VERIFY this number is on WhatsApp
  email: 'mzaid929@yahoo.com', // VERIFY it is monitored for leads
  address: {
    // VERIFY: as given by the client, matching the shop-level detail a GBP listing
    // would carry (shop number, block and sector).
    street: {
      en: 'Shop # 417, 6-B-1 Al-Madina Road, Township Block 6 Sector B 1',
      ur: 'دکان نمبر 417، 6-B-1 المدینہ روڈ، ٹاؤن شپ بلاک 6 سیکٹر B 1',
    },
    city: { en: 'Lahore', ur: 'لاہور' },
    region: { en: 'Punjab', ur: 'پنجاب' },
    postalCode: '54770',
    country: 'PK',
  },
  hours: { alwaysOpen: true }, // VERIFY. Facebook's "Always open" is sometimes a default
  trust: {
    customersServed: 100,
    satisfactionPercent: 95,
    yearsActive: 20,
    projectsCompleted: 500,
  },
  geo: null, // TODO(client): a precise lat/long, not read off a screenshot
  serviceAreas: [], // TODO(client)
  yearEstablished: null, // TODO(client)
  pumpBrands: [], // TODO(client)
  facebookUrl: 'https://www.facebook.com/p/Mian-Salamat-boring-and-sanitary-house-100064841959870/',
  googleBusinessUrl: 'https://maps.app.goo.gl/xRHDdZYV5pYEUycr7?g_st=aw',
};
