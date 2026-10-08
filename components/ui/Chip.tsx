import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean;
};

export function Chip({ selected, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'rounded-input inline-flex min-h-11 items-center border px-4 text-sm transition-colors',
        selected
          ? 'border-aquifer bg-aquifer text-limewash'
          : 'border-galvanized/60 text-ink hover:border-aquifer bg-transparent',
        className,
      )}
      {...props}
    />
  );
}
