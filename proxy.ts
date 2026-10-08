import { NextResponse, type NextRequest } from 'next/server';

const COOKIE = 'NEXT_LOCALE';

/**
 * Locale negotiation for "/" only (CLAUDE.md §4.2). An explicit /ur always wins, so
 * shared links and search results behave predictably. Accept-Language is deliberately
 * ignored: most Pakistani phones report English regardless of reading preference.
 *
 * Deviation from §4.2, worth knowing: the matcher is ['/', '/en'] rather than
 * ['/', '/en/:path*']. Redirecting everything under /en also redirected
 * /en/opengraph-image — the real URL of the English OG image, since the English page is
 * rendered from the internal /en route — which left crawlers with a 404 for it. Only
 * the exact /en page URL is now redirected, which is all §4.1 asks for.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/en') {
    return NextResponse.redirect(new URL('/', req.url), 308);
  }

  if (pathname === '/') {
    if (req.cookies.get(COOKIE)?.value === 'ur') {
      return NextResponse.redirect(new URL('/ur', req.url), 307);
    }
    return NextResponse.rewrite(new URL('/en', req.url));
  }
}

export const config = { matcher: ['/', '/en'] };
