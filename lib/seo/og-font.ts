/**
 * ImageResponse needs real font data; it cannot use next/font. Google Fonts serves TTF
 * to an old User-Agent, which is the format ImageResponse accepts.
 *
 * Urdu renders as empty boxes without Noto Nastaliq Urdu (CLAUDE.md §6.5), so the caller
 * checks for null and falls back to a Latin-only OG image rather than shipping boxes.
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;

  try {
    const css = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20100101' },
    }).then((res) => (res.ok ? res.text() : null));
    if (!css) return null;

    const match = /src:\s*url\(([^)]+)\)\s*format\('truetype'\)/.exec(css);
    const src = match?.[1];
    if (!src) return null;

    const font = await fetch(src);
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null; // never fail a build over a font CDN hiccup
  }
}
