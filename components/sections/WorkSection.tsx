import { WhatsAppIcon } from '@/components/illustrations/icons';
import { Section } from '@/components/layout/Section';
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

  return (
    <Section id={id} labelledBy="work-title">
      <h2 id="work-title" className="display-type text-aquifer text-2xl">
        {dict.heading}
      </h2>

      {items.length === 0 ? (
        <div className="max-w-measure mt-6">
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
          <p className="max-w-measure mt-5 text-lg">{dict.intro}</p>
          <WorkGallery
            items={items}
            previewCount={workPreviewCount}
            dict={{
              filterLabel: dict.filterLabel,
              filters: dict.filters,
              showMore: dict.showMore,
              lightbox: dict.lightbox,
            }}
          />
        </>
      )}
    </Section>
  );
}
