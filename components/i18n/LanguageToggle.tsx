'use client';

import { locales, localeMeta } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';

import { useLanguage } from './LanguageProvider';

/**
 * Always available after the first-visit prompt (§4.5). A group of buttons rather than a
 * select, so the current language is visible without opening anything.
 */
export function LanguageToggle({ label, className }: { label: string; className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn('inline-flex items-center gap-1 text-sm', className)}
    >
      {locales.map((candidate) => {
        const current = candidate === locale;
        return (
          <button
            key={candidate}
            type="button"
            lang={candidate}
            aria-current={current ? 'true' : undefined}
            onClick={() => setLocale(candidate)}
            className={cn(
              'rounded-input inline-flex min-h-11 min-w-11 items-center justify-center px-3',
              current ? 'bg-current/15 font-medium' : 'opacity-80 hover:opacity-100',
            )}
          >
            {localeMeta[candidate].label}
          </button>
        );
      })}
    </div>
  );
}
