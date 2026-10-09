'use client';

import { useState } from 'react';

import { Chip } from '@/components/ui/Chip';
import { buttonClasses } from '@/components/ui/buttonStyles';
import type { ServiceId, WorkCopy } from '@/lib/content/types';

/**
 * Only the strings this island actually uses are passed in (§4.7). No `image`/`alt`
 * fields — the Recent Work section renders text only, no media (CLAUDE.md §8 decision
 * log); the underlying photos still exist in lib/content/work.ts, just unused here.
 */
export type GalleryItem = {
  id: string;
  category: ServiceId;
  caption: string;
};

type WorkGalleryProps = {
  items: GalleryItem[];
  dict: Pick<WorkCopy, 'filterLabel' | 'filters' | 'showMore'>;
  previewCount: number;
};

export function WorkGallery({ items, dict, previewCount }: WorkGalleryProps) {
  const [filter, setFilter] = useState<'all' | ServiceId>('all');
  const [expanded, setExpanded] = useState(false);

  const filtered = filter === 'all' ? items : items.filter((item) => item.category === filter);
  const shown = expanded ? filtered : filtered.slice(0, previewCount);

  return (
    <>
      {/* WorkSection sends no filters when only one category has items (§7.4). */}
      {dict.filters.length > 0 ? (
        <div role="group" aria-label={dict.filterLabel} className="mt-10 flex flex-wrap gap-2">
          {dict.filters.map((option) => (
            <Chip
              key={option.id}
              selected={filter === option.id}
              onClick={() => {
                setFilter(option.id);
                setExpanded(false);
              }}
            >
              {option.label}
            </Chip>
          ))}
        </div>
      ) : null}

      <ul className="border-galvanized/40 mt-10 border-t">
        {shown.map((item) => (
          <li key={item.id} className="border-galvanized/40 max-w-measure border-b py-5 text-base">
            {item.caption}
          </li>
        ))}
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
    </>
  );
}
