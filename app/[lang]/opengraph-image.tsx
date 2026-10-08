import { ImageResponse } from 'next/og';

import en from '@/lib/content/en';
import { isLocale, locales } from '@/lib/i18n/config';
import { loadGoogleFont } from '@/lib/seo/og-font';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/**
 * Per-locale OG image: the strata motif, mirrored for RTL (CLAUDE.md §6.5).
 *
 * TODO(launch): the card is Latin-branded in BOTH locales, including /ur.
 * Satori — the renderer behind ImageResponse — cannot shape Arabic script. Both
 * Noto Nastaliq Urdu and Noto Naskh Arabic make it throw on GSUB lookup types 5 and 7,
 * which Urdu shaping fundamentally requires, so there is no font choice that fixes it.
 * Rather than ship empty boxes, the image carries the Latin business name while the
 * og:title and og:description stay in Urdu (those are the text most platforms show).
 *
 * To get real Urdu into the card, replace this route for `ur` with a hand-designed
 * PNG in /public and point `openGraph.images` at it, or rasterise it with a headless
 * browser at build time.
 */

/** Palette tokens are not available inside ImageResponse, so they are repeated here.
 *  Keep in sync with app/globals.css's @theme block by hand (§8 decision log). */
const palette = {
  aquifer: '#123C5C',
  groundwater: '#2F82C0',
  galvanized: '#8CA3B8',
  brass: '#A87A2E',
  limewash: '#EEF5FA',
  silt: '#7A6550',
  sand: '#C9B48F',
};

/**
 * Strata occupy the lower 320 px only. The text sits on limewash above them, because
 * ink-on-groundwater and ink-on-silt both fail contrast (§3.2).
 */
const bands = [
  { key: 'topsoil', color: palette.silt, height: 38 },
  { key: 'clay', color: palette.galvanized, height: 60 },
  { key: 'sand', color: palette.sand, height: 50 },
  { key: 'water', color: palette.groundwater, height: 66 },
  { key: 'bedrock', color: palette.aquifer, height: 46 },
];

const STRATA_HEIGHT = bands.reduce((total, band) => total + band.height, 0);

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : 'en';
  const rtl = locale === 'ur';

  // The wordmark, not the full legal name: it is what the site brands itself with.
  const headline = en.common.brand.nameShort;
  const subtitle = en.meta.ogDescription;

  const fontData = await loadGoogleFont('Archivo', 700, `${headline}${subtitle}`);
  // Clear of the text block, which is capped at 760 px plus an 80 px gutter.
  const pipeOffset = rtl ? { left: 120 } : { right: 120 };

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.limewash,
        position: 'relative',
      }}
    >
      {/* Strata along the bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {bands.map((band) => (
          <div key={band.key} style={{ height: band.height, backgroundColor: band.color }} />
        ))}
      </div>

      {/* Ground line, where the strata begin */}
      <div
        style={{
          position: 'absolute',
          bottom: STRATA_HEIGHT,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: palette.aquifer,
        }}
      />

      {/* Bore pipe descending through them, on the side the script runs from */}
      <div
        style={{
          position: 'absolute',
          top: 150,
          ...pipeOffset,
          width: 32,
          height: 448,
          borderLeft: `8px solid ${palette.galvanized}`,
          borderRight: `8px solid ${palette.galvanized}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 598,
          ...pipeOffset,
          width: 32,
          height: 18,
          backgroundColor: palette.brass,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          padding: '68px 80px',
          maxWidth: 760,
          ...(rtl ? { marginLeft: 'auto', textAlign: 'right' } : {}),
        }}
      >
        <div style={{ fontSize: 56, lineHeight: 1.18, color: palette.aquifer, fontWeight: 700 }}>
          {headline}
        </div>
        <div style={{ fontSize: 27, lineHeight: 1.45, color: palette.aquifer, opacity: 0.85 }}>
          {subtitle}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Archivo', data: fontData, style: 'normal' as const, weight: 700 as const }]
        : [],
    },
  );
}
