import { WhatsAppIcon } from '@/components/illustrations/icons';
import { Section } from '@/components/layout/Section';
import { TrustStats } from '@/components/sections/TrustStats';
import { WorkGallery, type GalleryItem } from '@/components/sections/WorkGallery';
import { WhatsAppLink } from '@/components/whatsapp/WhatsAppLink';
import type { WorkCopy } from '@/lib/content/types';
import { workItems, workPreviewCount } from '@/lib/content/work';
import type { Locale } from '@/lib/i18n/config';

/**
 * Work (CLAUDE.md §5.3). The gallery itself is a client island; this server component
 * resolves the captions and alt text for the current locale and hands over only those
 * strings (§4.7).
 *
 * The social-proof stats sit here, between the intro and the gallery, as a lead-in to
 * the photos that back them up (§8 decision log).
 *
 * With no photos yet, it renders a direct message and a WhatsApp action rather than an
 * empty grid or empty filter chips (§7.4).
 */
export function WorkSection({ id, dict, lang }: { id: string; dict: WorkCopy; lang: Locale }) {
  const items: GalleryItem[] = workItems.map((item) => ({
    id: item.id,
    category: item.category,
    image: item.image,
    alt: item.alt[lang],
    caption: item.caption[lang],
  }));

  // Only offer a chip for a category that has photos, so no filter can lead to an
  // empty grid (§7.4). "All" is dropped too when there is only one real category.
  const present = new Set(items.map((item) => item.category));
  const categoryFilters = dict.filters.filter(
    (filter) => filter.id !== 'all' && present.has(filter.id),
  );
  const availableFilters =
    categoryFilters.length > 1
      ? dict.filters.filter((filter) => filter.id === 'all' || present.has(filter.id))
      : [];

  return (
    <Section id={id} labelledBy="work-title">
      <h2 id="work-title" className="display-type text-aquifer text-2xl">
        {dict.heading}
      </h2>

      <p className="max-w-measure mt-5 text-lg">{dict.intro}</p>

      <TrustStats dict={dict.trust} />

      {items.length === 0 ? (
        <div className="max-w-measure mt-10">
          <p className="text-aquifer text-lg font-medium">{dict.empty.title}</p>
          <p className="mt-3 text-base">{dict.empty.body}</p>
          <WhatsAppLink
            message={dict.empty.whatsappMessage}
            source="work_empty"
            size="lg"
            className="mt-8"
          >
            <WhatsAppIcon className="shrink-0" />
            <span>{dict.empty.cta}</span>
          </WhatsAppLink>
        </div>
      ) : (
        <>
          <WorkGallery
            items={items}
            previewCount={workPreviewCount}
            dict={{
              filterLabel: dict.filterLabel,
              filters: availableFilters,
              showMore: dict.showMore,
              lightbox: dict.lightbox,
            }}
          />
        </>
      )}
    </Section>
  );
}
