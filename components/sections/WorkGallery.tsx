'use client';

import Image, { type StaticImageData } from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ChevronIcon, CloseIcon } from '@/components/illustrations/icons';
import { Chip } from '@/components/ui/Chip';
import { Dialog } from '@/components/ui/Dialog';
import { buttonClasses } from '@/components/ui/buttonStyles';
import type { ServiceId, WorkCopy } from '@/lib/content/types';
import { cn } from '@/lib/utils/cn';
import { fill } from '@/lib/utils/format';

/** Only the strings and data this island actually uses are passed in (§4.7). */
export type GalleryItem = {
  id: string;
  category: ServiceId;
  image: StaticImageData;
  alt: string;
  caption: string;
};

type WorkGalleryProps = {
  items: GalleryItem[];
  dict: Pick<WorkCopy, 'filterLabel' | 'filters' | 'showMore' | 'lightbox'>;
  previewCount: number;
};

export function WorkGallery({ items, dict, previewCount }: WorkGalleryProps) {
  const [filter, setFilter] = useState<'all' | ServiceId>('all');
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((item) => item.category === filter)),
    [items, filter],
  );

  const shown = expanded ? filtered : filtered.slice(0, previewCount);
  const current = openIndex === null ? null : filtered[openIndex];

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((index) =>
        index === null ? null : (index + delta + filtered.length) % filtered.length,
      );
    },
    [filtered.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openIndex, step]);

  // Swipe, with a threshold that ignores an accidental drag during a scroll.
  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchX;
    const end = event.changedTouches[0]?.clientX;
    setTouchX(null);
    if (start === null || end === undefined || Math.abs(end - start) < 48) return;
    step(end < start ? 1 : -1);
  };

  return (
    <>
      <div role="group" aria-label={dict.filterLabel} className="mt-10 flex flex-wrap gap-2">
        {dict.filters.map((option) => (
          <Chip
            key={option.id}
            selected={filter === option.id}
            onClick={() => {
              setFilter(option.id);
              setExpanded(false);
              setOpenIndex(null); // indices refer to the filtered list
            }}
          >
            {option.label}
          </Chip>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, index) => {
          // Spans follow the image's own shape, with no masonry library (§5.3).
          const wide = item.image.width / item.image.height > 1.4;
          return (
            <li key={item.id} className={cn(wide && 'sm:col-span-2')}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group w-full text-start"
              >
                <span className="aspect-work rounded-media bg-mist block overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    sizes={
                      wide
                        ? '(min-width: 1024px) 66vw, 100vw'
                        : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                    }
                    placeholder="blur"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="text-ink group-hover:text-aquifer mt-3 block text-sm">
                  {item.caption}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {!expanded && filtered.length > previewCount ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className={buttonClasses('secondary', 'lg', 'mt-10')}
        >
          {dict.showMore}
        </button>
      ) : null}

      <Dialog
        open={current !== null}
        onClose={() => setOpenIndex(null)}
        labelledBy="lightbox-title"
        className="bg-limewash"
      >
        {current ? (
          <div
            className="flex flex-col gap-4 p-4"
            onTouchStart={(event) => setTouchX(event.touches[0]?.clientX ?? null)}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 id="lightbox-title" className="text-ink/70 text-sm">
                {fill(dict.lightbox.counter, {
                  current: (openIndex ?? 0) + 1,
                  total: filtered.length,
                })}
              </h3>
              <button
                type="button"
                aria-label={dict.lightbox.close}
                onClick={() => setOpenIndex(null)}
                className="rounded-input inline-flex size-11 items-center justify-center"
              >
                <CloseIcon />
              </button>
            </div>

            <Image
              src={current.image}
              alt={current.alt}
              sizes="100vw"
              placeholder="blur"
              className="lightbox-image rounded-media"
            />

            <p className="text-base">{current.caption}</p>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                aria-label={dict.lightbox.previous}
                onClick={() => step(-1)}
                className="rounded-input inline-flex size-11 items-center justify-center"
              >
                <ChevronIcon className="rotate-180 rtl:-scale-x-100" />
              </button>
              <button
                type="button"
                aria-label={dict.lightbox.next}
                onClick={() => step(1)}
                className="rounded-input inline-flex size-11 items-center justify-center"
              >
                <ChevronIcon className="rtl:-scale-x-100" />
              </button>
            </div>
          </div>
        ) : null}
      </Dialog>
    </>
  );
}
