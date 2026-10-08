import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

/**
 * Shared section shell: the container, the consistent vertical rhythm (§3.4) and the
 * scroll offset that keeps headings clear of the sticky header (§5.2). Extracted
 * because all five sections need exactly this (§7.2).
 */
export function Section({
  id,
  labelledBy,
  surface = 'limewash',
  children,
  className,
}: {
  id: string;
  labelledBy: string;
  surface?: 'limewash' | 'mist';
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('scroll-mt-20 py-24 md:py-32', surface === 'mist' && 'bg-mist', className)}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
