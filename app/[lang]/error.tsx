'use client';

import { PhoneIcon, WhatsAppIcon } from '@/components/illustrations/icons';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { WhatsAppLink } from '@/components/whatsapp/WhatsAppLink';
import en from '@/lib/content/en';
import ur from '@/lib/content/ur';
import { telUrl } from '@/lib/utils/whatsapp';

/**
 * Localized error boundary (CLAUDE.md §7.4): one sentence on what happened, a retry,
 * and both direct contact routes so a lead is never lost.
 *
 * The dictionary is imported directly rather than through getDictionary, which is
 * server-only; this file is necessarily a Client Component.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  const { locale } = useLanguage();
  const common = locale === 'ur' ? ur.common : en.common;

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <h1 className="display-type max-w-measure text-aquifer text-2xl">{common.errorPage.title}</h1>
      <p className="max-w-measure mt-5 text-lg">{common.errorPage.body}</p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={reset} className={buttonClasses('primary', 'lg')}>
          {common.errorPage.retry}
        </button>
        <WhatsAppLink message={common.whatsapp.defaultMessage} source="error" size="lg">
          <WhatsAppIcon className="shrink-0" />
          <span>{common.actions.whatsapp}</span>
        </WhatsAppLink>
        <a
          href={telUrl()}
          data-track="call_click"
          data-source="error"
          className={buttonClasses('secondary', 'lg')}
        >
          <PhoneIcon className="shrink-0" />
          <span>{common.actions.call}</span>
        </a>
      </div>
    </main>
  );
}
