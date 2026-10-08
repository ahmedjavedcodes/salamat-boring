import { WhatsAppIcon, PhoneIcon } from '@/components/illustrations/icons';
import { BoreholeSection } from '@/components/illustrations/BoreholeSection';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { WhatsAppLink } from '@/components/whatsapp/WhatsAppLink';
import { business } from '@/lib/content/business';
import type { HeroCopy } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { telUrl } from '@/lib/utils/whatsapp';

/**
 * Hero (CLAUDE.md §5.3). The illustration sits below the CTAs on mobile and is cropped
 * to its lower half — `preserveAspectRatio="xMidYMax slice"` inside a shorter box — so
 * the WhatsApp and Call buttons stay above the fold (§3.4).
 */
export function HeroSection({
  id,
  dict,
  dir,
  lang,
}: {
  id: string;
  dict: HeroCopy;
  dir: 'ltr' | 'rtl';
  lang: Locale;
}) {
  const areas = business.serviceAreas.map((area) => area[lang]);

  return (
    <section id={id} aria-labelledby="hero-title" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-20 sm:px-8 md:pt-20 lg:grid lg:grid-cols-12 lg:gap-12 lg:pb-28">
        <div className="lg:col-span-6 lg:self-center">
          <h1 id="hero-title" className="display-type max-w-measure text-display text-aquifer">
            {dict.title}
          </h1>

          <p className="max-w-measure mt-6 text-lg">{dict.support}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppLink message={dict.whatsappMessage} source="hero" size="lg">
              <WhatsAppIcon className="shrink-0" />
              <span>{dict.whatsappCta}</span>
            </WhatsAppLink>

            <a
              href={telUrl()}
              data-track="call_click"
              data-source="hero"
              className={buttonClasses('secondary', 'lg')}
            >
              <PhoneIcon className="shrink-0" />
              <span>{dict.callCta}</span>
            </a>
          </div>

          {/* Omitted entirely while business.serviceAreas is TODO(client) (§1.6). */}
          {areas.length > 0 ? (
            <p className="max-w-measure text-ink/70 mt-8 text-sm">
              {dict.areasLabel}: {areas.join(', ')}
            </p>
          ) : null}
        </div>

        <div className="mt-14 lg:col-span-6 lg:mt-0">
          <div className="aspect-strata-crop rounded-media md:aspect-strata overflow-hidden">
            <BoreholeSection dict={dict.illustration} dir={dir} />
          </div>
        </div>
      </div>
    </section>
  );
}
