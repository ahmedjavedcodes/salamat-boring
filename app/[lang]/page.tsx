import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LanguagePrompt } from '@/components/i18n/LanguagePrompt';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { getDictionary } from '@/lib/content';
import { isLocale, localeMeta } from '@/lib/i18n/config';
import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = await getDictionary(lang);
  return buildPageMetadata(lang, meta);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { dir } = localeMeta[lang];

  return (
    <>
      <SkipLink label={dict.common.skipToContent} />
      <SiteHeader dict={dict.common} />

      <main id="main">
        <HeroSection id="home" dict={dict.hero} dir={dir} lang={lang} />
        <ServicesSection id="services" dict={dict.services} />
        {/* The strata motif, used sparingly: a thin band in the illustration colours
            where the page turns from what we do to how we do it (§3.1). */}
        <hr aria-hidden className="strata-rule" />
        <AboutSection id="about" dict={dict.about} />
        <WorkSection id="work" dict={dict.work} lang={lang} />
        <FaqSection id="faq" dict={dict.faq} />
        <hr aria-hidden className="strata-rule" />
        <ContactSection id="contact" dict={dict.contact} lang={lang} />
      </main>

      <SiteFooter
        dict={dict.common.footer}
        languageToggleLabel={dict.common.languageToggle.label}
        lang={lang}
      />

      <FloatingWhatsApp dict={dict.common.whatsapp} />
      <LanguagePrompt dict={dict.common.languagePrompt} />
    </>
  );
}
