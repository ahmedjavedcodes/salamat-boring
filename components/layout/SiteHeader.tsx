import { LanguageToggle } from '@/components/i18n/LanguageToggle';
import { PhoneIcon } from '@/components/illustrations/icons';
import { ActiveSectionNav } from '@/components/layout/ActiveSectionNav';
import { MobileNav } from '@/components/layout/MobileNav';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { business } from '@/lib/content/business';
import type { CommonCopy } from '@/lib/content/types';
import { telUrl } from '@/lib/utils/whatsapp';

/**
 * Sticky, 64 px, transparent over the hero and aquifer once past it (CLAUDE.md §5.2).
 * The background swap is CSS driven by `data-scrolled`, which ActiveSectionNav sets;
 * see globals.css. Everything inside inherits `currentColor` so it stays legible
 * through the change.
 */
export function SiteHeader({ dict }: { dict: CommonCopy }) {
  return (
    <header className="site-header sticky top-0 z-30">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <a
          href="#home"
          aria-label={dict.brand.homeLabel}
          className="display-type me-auto text-lg whitespace-nowrap"
        >
          {dict.brand.nameShort}
        </a>

        <ActiveSectionNav items={dict.nav.items} label={dict.nav.label} />

        <LanguageToggle label={dict.languageToggle.label} className="hidden lg:inline-flex" />

        <a
          href={telUrl()}
          data-track="call_click"
          data-source="header"
          className={buttonClasses('adaptive', 'md', 'whitespace-nowrap')}
        >
          <PhoneIcon className="shrink-0" />
          <span className="hidden sm:inline">{dict.actions.call}</span>
          <span className="sm:hidden">
            <bdi dir="ltr">{business.phoneDisplay}</bdi>
          </span>
        </a>

        <MobileNav
          dict={{ nav: dict.nav, actions: dict.actions, languageToggle: dict.languageToggle }}
          phoneDisplay={business.phoneDisplay}
        />
      </div>
    </header>
  );
}
