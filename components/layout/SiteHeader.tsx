import { LanguageToggle } from '@/components/i18n/LanguageToggle';
import { PhoneIcon } from '@/components/illustrations/icons';
import { ActiveSectionNav } from '@/components/layout/ActiveSectionNav';
import { MobileNav } from '@/components/layout/MobileNav';
import { buttonClasses } from '@/components/ui/buttonStyles';
import { business } from '@/lib/content/business';
import type { CommonCopy } from '@/lib/content/types';
import { telUrl } from '@/lib/utils/whatsapp';

/**
 * Sticky, 64 px, a persistent aquifer bar at every scroll position (CLAUDE.md §5.2,
 * §8 decision log — it was transparent-over-hero originally, which let the display-size
 * hero heading pass underneath it unreadably). Everything inside inherits the header's
 * limewash `currentColor`.
 *
 * Below `sm`, the full wordmark competes for space with the phone chip and the menu
 * button and was being truncated mid-word; a compact "MS" monogram (the same mark as
 * the favicon, CLAUDE.md §8) stands in for it there instead. The full wordmark returns
 * at `sm` and up, where there is room for it.
 */
export function SiteHeader({ dict }: { dict: CommonCopy }) {
  return (
    <header className="site-header sticky top-0 z-30">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <a href="#home" aria-label={dict.brand.homeLabel} className="me-auto inline-flex">
          {/* size-11 (44px), not a tighter fit around the glyphs, to keep this link's
              tap target at the §3.9 touch-target floor. */}
          <span
            aria-hidden
            className="bg-limewash text-aquifer display-type rounded-input inline-flex size-11 items-center justify-center text-base sm:hidden"
          >
            MS
          </span>
          <span className="display-type hidden text-lg sm:inline">{dict.brand.nameShort}</span>
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
