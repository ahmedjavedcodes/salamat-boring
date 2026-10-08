'use client';

import { useState } from 'react';

import { CloseIcon, MenuIcon, PhoneIcon } from '@/components/illustrations/icons';
import { LanguageToggle } from '@/components/i18n/LanguageToggle';
import { Dialog } from '@/components/ui/Dialog';
import { buttonClasses } from '@/components/ui/buttonStyles';
import type { CommonCopy } from '@/lib/content/types';
import { telUrl } from '@/lib/utils/whatsapp';

/**
 * Mobile menu (CLAUDE.md §5.2). Selecting a link closes the sheet first and then lets
 * the anchor scroll, so the page is not scrolling behind an open dialog.
 */
export function MobileNav({
  dict,
  phoneDisplay,
}: {
  dict: Pick<CommonCopy, 'nav' | 'actions' | 'languageToggle'>;
  phoneDisplay: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={dict.nav.openMenu}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="rounded-input inline-flex size-11 items-center justify-center lg:hidden"
      >
        <MenuIcon />
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="mobile-nav-title"
        placement="sheet"
        className="surface-dark bg-aquifer text-limewash shadow-float h-dvh max-w-none md:h-dvh md:max-w-sm md:rounded-none"
      >
        <div className="flex h-full flex-col gap-8 p-6">
          <div className="flex items-center justify-between">
            <h2 id="mobile-nav-title" className="text-lg font-medium">
              {dict.nav.menuHeading}
            </h2>
            <button
              type="button"
              aria-label={dict.nav.closeMenu}
              onClick={() => setOpen(false)}
              className="rounded-input inline-flex size-11 items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label={dict.nav.label}>
            <ul className="flex flex-col">
              {dict.nav.items.map((item) => (
                <li key={item.id} className="border-limewash/20 border-b">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center py-3 text-lg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-4">
            <a
              href={telUrl()}
              data-track="call_click"
              data-source="mobile_nav"
              className={buttonClasses('adaptive', 'lg')}
            >
              <PhoneIcon className="shrink-0" />
              <span>{dict.actions.call}</span>
              <bdi dir="ltr">{phoneDisplay}</bdi>
            </a>
            <LanguageToggle label={dict.languageToggle.label} />
          </div>
        </div>
      </Dialog>
    </>
  );
}
