import { Archivo } from 'next/font/google';
import Link from 'next/link';

import type { Metadata } from 'next';

import en from '@/lib/content/en';
import { business } from '@/lib/content/business';
import { localeMeta } from '@/lib/i18n/config';
import { siteUrl } from '@/lib/i18n/paths';
import { telUrl, whatsappUrl } from '@/lib/utils/whatsapp';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: en.common.notFoundPage.title,
  robots: { index: false, follow: false },
};

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

/**
 * 404 for paths outside /[lang]. Those never reach the locale layout, so this file
 * renders its own <html>. It is English, because a path with no locale segment gives
 * nothing to negotiate on, and it carries the same Call and WhatsApp actions as every
 * other dead end (§7.4).
 */
export default function GlobalNotFound() {
  const { notFoundPage, actions, whatsapp } = en.common;

  return (
    <html lang="en" dir={localeMeta.en.dir} className={archivo.variable}>
      <body className="bg-limewash font-body text-ink antialiased">
        <main className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
          <p className="display-type text-aquifer text-lg">{business.name.en}</p>
          <h1 className="display-type max-w-measure text-aquifer mt-8 text-2xl">
            {notFoundPage.title}
          </h1>
          <p className="max-w-measure mt-5 text-lg">{notFoundPage.body}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="rounded-input bg-aquifer text-limewash inline-flex min-h-11 items-center justify-center px-6 py-3 text-base font-medium no-underline"
            >
              {notFoundPage.home}
            </Link>
            <a
              href={whatsappUrl(whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-input bg-whatsapp text-whatsapp-ink inline-flex min-h-11 items-center justify-center px-6 py-3 text-base font-medium no-underline"
            >
              {actions.whatsapp}
            </a>
            <a
              href={telUrl()}
              className="rounded-input border-aquifer text-aquifer inline-flex min-h-11 items-center justify-center border px-6 py-3 text-base font-medium no-underline"
            >
              {actions.call}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
