import { ImageResponse } from 'next/og';

import { loadGoogleFont } from '@/lib/seo/og-font';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Larger touch icon for iOS home-screen bookmarks — same monogram as app/icon.tsx. */
export default async function AppleIcon() {
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
        fontSize: 92,
        fontWeight: 700,
        letterSpacing: -2,
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
