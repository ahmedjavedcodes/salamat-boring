import Link from 'next/link';

import { PhoneIcon, WhatsAppIcon } from '@/components/illustrations/icons';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { WhatsAppLink } from '@/components/whatsapp/WhatsAppLink';
import en from '@/lib/content/en';
import { telUrl } from '@/lib/utils/whatsapp';

/**
 * not-found.tsx cannot read route params, so it cannot know the locale. It uses the
 * default locale's copy and, per §7.4, still offers WhatsApp and Call so a lead is
 * never lost on a bad link.
 */
export default function NotFound() {
  const { notFoundPage } = en.common;

  return (
    <main id="main" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <h1 className="display-type max-w-measure text-aquifer text-2xl">{notFoundPage.title}</h1>
      <p className="max-w-measure mt-5 text-lg">{notFoundPage.body}</p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link href="/" className={buttonClasses('primary', 'lg')}>
          {notFoundPage.home}
        </Link>
        <WhatsAppLink message={en.common.whatsapp.defaultMessage} source="not_found" size="lg">
          <WhatsAppIcon className="shrink-0" />
          <span>{en.common.actions.whatsapp}</span>
        </WhatsAppLink>
        <a
          href={telUrl()}
          data-track="call_click"
          data-source="not_found"
          className={buttonClasses('secondary', 'lg')}
        >
          <PhoneIcon className="shrink-0" />
          <span>{en.common.actions.call}</span>
        </a>
      </div>
    </main>
  );
}
