'use client';

import { Dialog } from '@/components/ui/Dialog';
import { buttonClasses } from '@/components/ui/buttonStyles';
import type { CommonCopy } from '@/lib/content/types';

import { useLanguage } from './LanguageProvider';

/**
 * First-visit language prompt (CLAUDE.md §4.5).
 *
 * Renders only once hydrated and only when no choice has been stored, so crawlers and
 * no-JS visitors get the full page and never this dialog. Dismissing it in any way —
 * Esc, backdrop, the close button — counts as choosing English and is persisted, so it
 * never comes back.
 */
export function LanguagePrompt({ dict }: { dict: CommonCopy['languagePrompt'] }) {
  const { hasChosen, setLocale } = useLanguage();

  if (hasChosen !== false) return null;

  return (
    <Dialog
      open
      onClose={() => setLocale('en')}
      labelledBy="language-prompt-title"
      placement="sheet"
      className="border-galvanized/40 shadow-float border-t md:border"
    >
      <div className="flex flex-col gap-6 p-6 text-center">
        <div className="flex flex-col gap-2">
          <h2 id="language-prompt-title" lang="en" className="text-lg font-medium">
            {dict.titleEn}
          </h2>
          <p lang="ur" className="text-lg">
            {dict.titleUr}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            lang="en"
            autoFocus
            onClick={() => setLocale('en')}
            className={buttonClasses('primary', 'lg')}
          >
            {dict.chooseEnglish}
          </button>
          <button
            type="button"
            lang="ur"
            onClick={() => setLocale('ur')}
            className={buttonClasses('secondary', 'lg')}
          >
            {dict.chooseUrdu}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setLocale('en')}
          className="text-ink/70 min-h-11 text-sm underline underline-offset-4"
        >
          {dict.close}
        </button>
      </div>
    </Dialog>
  );
}
