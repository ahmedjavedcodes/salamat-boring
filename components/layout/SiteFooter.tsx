import { LanguageToggle } from '@/components/i18n/LanguageToggle';
import { FacebookIcon, MailIcon, PhoneIcon } from '@/components/illustrations/icons';
import { business } from '@/lib/content/business';
import type { CommonCopy } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { fill } from '@/lib/utils/format';
import { mailtoUrl, telUrl } from '@/lib/utils/whatsapp';

/**
 * Name, address and phone here must stay identical to the Google Business Profile
 * (CLAUDE.md §5.3), which is why every value is read from business.ts.
 *
 * pb-28 keeps the floating WhatsApp button clear of the address and the links (§3.10).
 */
export function SiteFooter({
  dict,
  languageToggleLabel,
  lang,
}: {
  dict: CommonCopy['footer'];
  languageToggleLabel: string;
  lang: Locale;
}) {
  return (
    <footer className="surface-dark bg-aquifer text-limewash">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-28 sm:px-8 lg:grid-cols-3">
        <div className="flex flex-col gap-3">
          <p className="display-type text-lg">{business.name[lang]}</p>
          <p className="text-limewash/80 text-sm">{dict.addressHeading}</p>
          <address className="text-base not-italic">
            {business.address.street[lang]}
            <br />
            {business.address.city[lang]}, {business.address.region[lang]}{' '}
            <bdi dir="ltr">{business.address.postalCode}</bdi>
          </address>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-limewash/80 text-sm">{dict.contactHeading}</p>
          <a
            href={telUrl()}
            data-track="call_click"
            data-source="footer"
            className="inline-flex min-h-11 items-center gap-2"
          >
            <PhoneIcon className="shrink-0" />
            <bdi dir="ltr">{business.phoneDisplay}</bdi>
          </a>
          <a href={mailtoUrl()} className="inline-flex min-h-11 items-center gap-2">
            <MailIcon className="shrink-0" />
            <bdi dir="ltr">{business.email}</bdi>
          </a>
        </div>

        <div className="flex flex-col items-start gap-3">
          <p className="text-limewash/80 text-sm">{dict.elsewhereHeading}</p>
          <a
            href={business.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2"
          >
            <FacebookIcon className="shrink-0" />
            <span>{dict.facebook}</span>
          </a>
          <LanguageToggle label={languageToggleLabel} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <p className="border-limewash/20 text-limewash/80 border-t pt-6 text-sm">
          {fill(dict.copyright, { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
