import { ImageResponse } from 'next/og';

import { loadGoogleFont } from '@/lib/seo/og-font';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Browser-tab favicon: a monogram set in Archivo, the same display font and aquifer
 * token used everywhere else on the site, so the tab icon reads as the same brand
 * rather than a generic default. One icon for both locales — a favicon is small enough
 * that Urdu shaping is not attempted here; see the OG image route for why Satori can't
 * shape Arabic script at all.
 */
export default async function Icon() {
  const mark = 'MS';
  const fontData = await loadGoogleFont('Archivo', 700, mark);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#123C5C',
        color: '#EEF5FA',
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: -0.5,
      }}
    >
      {mark}
    </div>,
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Archivo', data: fontData, style: 'normal' as const, weight: 700 as const }]
        : [],
    },
  );
}
