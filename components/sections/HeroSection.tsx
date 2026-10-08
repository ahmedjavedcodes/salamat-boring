import { PhoneIcon, WhatsAppIcon } from '@/components/illustrations/icons';
import { BoreholeSection } from '@/components/illustrations/BoreholeSection';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { WhatsAppLink } from '@/components/whatsapp/WhatsAppLink';
import { business } from '@/lib/content/business';
import type { HeroCopy } from '@/lib/content/types';
import type { Locale } from '@/lib/i18n/config';
import { telUrl } from '@/lib/utils/whatsapp';

/**
 * Hero (CLAUDE.md §5.3 and §3.1).
 *
 * The borehole cross-section illustration is the signature visual here, per §3.1
 * ("spend boldness in this one place"). A client work photo briefly stood in its
 * place; it was reverted back to the SVG (see §8 decision log) and the photo now
 * lives in About instead.
 *
 * The illustration sits below the CTAs on mobile and shows in full at every size —
 * see the §8 decision log for why this no longer crops to the lower half, which §3.4
 * originally called for.
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
          <div className="aspect-strata rounded-media overflow-hidden">
            <BoreholeSection dict={dict.illustration} dir={dir} />
          </div>
        </div>
      </div>
    </section>
  );
}
