'use client';

import { useEffect, useRef, useState } from 'react';

import type { NavItem } from '@/lib/content/types';
import { sectionIds } from '@/lib/i18n/paths';
import { cn } from '@/lib/utils/cn';

/**
 * Desktop section nav (CLAUDE.md §5.2).
 *
 * One IntersectionObserver marks the current link. The rootMargin narrows observation
 * to a band just under the header, so "current" means "the section you are actually
 * reading".
 *
 * The links are plain anchors in the markup, so they scroll correctly with no JS.
 */
export function ActiveSectionNav({ items, label }: { items: NavItem[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const visible = new Set<string>();

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // Earliest section in document order wins, so the highlight never flickers
        // between two neighbours that both touch the band.
        const current = sectionIds.find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: '-65px 0px -60% 0px' },
    );

    for (const section of sections) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Keep the address bar in step without stacking history entries or jumping (§5.2).
  // The first observed section is skipped: on load the hash is either already correct
  // (a deep link) or deliberately absent, and rewriting it would clobber that.
  const synced = useRef(false);
  useEffect(() => {
    if (!active) return;
    if (!synced.current) {
      synced.current = true;
      return;
    }
    const url = active === 'home' ? window.location.pathname : `#${active}`;
    window.history.replaceState(null, '', url);
  }, [active]);

  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? 'true' : undefined}
                className={cn(
                  'inline-flex min-h-11 items-center border-b-2 px-3 text-base transition-colors',
                  current ? 'border-brass' : 'border-transparent hover:border-current/40',
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
