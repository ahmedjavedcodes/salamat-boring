import Image from 'next/image';

import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/illustrations/icons';
import { Section } from '@/components/layout/Section';
import { ContactForm } from '@/components/sections/ContactForm';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { WhatsAppLink } from '@/components/whatsapp/WhatsAppLink';
import { business } from '@/lib/content/business';
import type { ContactCopy } from '@/lib/content/types';
import mapImage from '@/lib/images/maps.png';
import type { Locale } from '@/lib/i18n/config';
import { mailtoUrl, mapsUrl, telUrl } from '@/lib/utils/whatsapp';

/**
 * Contact (CLAUDE.md §5.3). Call and WhatsApp come first because they are the fastest
 * path; email is secondary, below both.
 *
 * The map block is a static screenshot of the shop's real Google Maps pin, wrapped in
 * a link to the actual listing — not a live iframe, so nothing third-party loads with
 * the page (§7.5's "click-to-load facade" requirement is satisfied by construction:
 * there is no embed to load at all, only a static image and an outbound link).
 */
export function ContactSection({
  id,
  dict,
  lang,
}: {
  id: string;
  dict: ContactCopy;
  lang: Locale;
}) {
  const directionsUrl = business.googleBusinessUrl ?? mapsUrl(lang);

  return (
    <Section id={id} labelledBy="contact-title">
      <h2 id="contact-title" className="display-type text-aquifer text-2xl">
        {dict.heading}
      </h2>
      <p className="max-w-measure mt-5 text-lg">{dict.intro}</p>

      <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={telUrl()}
              data-track="call_click"
              data-source="contact"
              className={buttonClasses('primary', 'lg')}
            >
              <PhoneIcon className="shrink-0" />
              <span>{dict.callLabel}</span>
              <bdi dir="ltr">{business.phoneDisplay}</bdi>
            </a>

            <WhatsAppLink message={dict.whatsappMessage} source="contact" size="lg">
              <WhatsAppIcon className="shrink-0" />
              <span>{dict.whatsappLabel}</span>
            </WhatsAppLink>
          </div>

          <a
            href={mailtoUrl()}
            className="text-aquifer decoration-galvanized hover:decoration-aquifer inline-flex min-h-11 items-center gap-2 self-start text-base underline underline-offset-4"
          >
            <MailIcon className="shrink-0" />
            <span>{dict.emailLabel}</span>
            <bdi dir="ltr">{business.email}</bdi>
          </a>

          <div className="border-galvanized/40 border-t pt-8">
            <h3 className="text-ink/70 text-sm">{dict.addressHeading}</h3>
            <address className="mt-2 text-base not-italic">
              {business.address.street[lang]}
              <br />
              {business.address.city[lang]}, {business.address.region[lang]}{' '}
              <bdi dir="ltr">{business.address.postalCode}</bdi>
            </address>
          </div>

          <div className="border-galvanized/40 border-t pt-8">
            <h3 className="text-ink/70 text-sm">{dict.mapHeading}</h3>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-media border-galvanized/40 group mt-3 block overflow-hidden border"
            >
              <span className="aspect-work bg-mist relative block overflow-hidden">
                <Image
                  src={mapImage}
                  alt={dict.mapAlt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </span>
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('secondary', 'md', 'mt-4')}
            >
              <MapPinIcon className="shrink-0" />
              <span>{dict.mapsLabel}</span>
            </a>
          </div>

          {/* Rendered from business.hours, so one change updates copy and JSON-LD. */}
          {business.hours.alwaysOpen ? (
            <div className="border-galvanized/40 border-t pt-8">
              <h3 className="text-ink/70 text-sm">{dict.hoursHeading}</h3>
              <p className="mt-2 text-base">{dict.hoursAlwaysOpen}</p>
            </div>
          ) : null}
        </div>

        <ContactForm dict={dict.form} />
      </div>
    </Section>
  );
}
