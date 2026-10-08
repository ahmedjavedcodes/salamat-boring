import { Archivo, Noto_Nastaliq_Urdu } from 'next/font/google';
import { notFound } from 'next/navigation';

import { LanguageProvider } from '@/components/i18n/LanguageProvider';
import { LocalBusinessJsonLd } from '@/components/seo/LocalBusinessJsonLd';
import { getDictionary } from '@/lib/content';
import { isLocale, locales, localeMeta } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';

import '../globals.css';

/** Display and body for English: one family, two axes (§3.3). */
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

/**
 * Nastaliq is heavy, so it is never preloaded and its variable is only attached on the
 * Urdu document — the English page therefore never requests it (§3.3, §7.5).
 */
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  display: 'swap',
  preload: false,
  variable: '--font-nastaliq',
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { dir } = localeMeta[lang];
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={dir}
      className={cn(archivo.variable, lang === 'ur' && nastaliq.variable)}
    >
      <body className="bg-limewash font-body text-ink antialiased">
        <LanguageProvider locale={lang}>{children}</LanguageProvider>
        <LocalBusinessJsonLd lang={lang} services={dict.services.items} />
      </body>
    </html>
  );
}
