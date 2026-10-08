import { WhatsAppIcon } from '@/components/illustrations/icons';
import type { CommonCopy } from '@/lib/content/types';
import { whatsappUrl } from '@/lib/utils/whatsapp';

/**
 * The site's most important control (CLAUDE.md §3.10). A Server Component, because it
 * is only a link — it works before any JavaScript loads and with JavaScript disabled.
 *
 * Positioning (fixed, bottom-right in both locales, with the safe-area offset) lives in
 * globals.css under `.floating-whatsapp`, along with the rule that hides it while a
 * dialog is open.
 */
export function FloatingWhatsApp({ dict }: { dict: CommonCopy['whatsapp'] }) {
  return (
    <a
      href={whatsappUrl(dict.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.label}
      data-track="whatsapp_click"
      data-source="floating"
      className="floating-whatsapp bg-whatsapp text-whatsapp-ink shadow-float hover:bg-whatsapp/85 focus-visible:outline-aquifer inline-flex size-14 items-center justify-center rounded-full transition-colors md:size-auto md:gap-3 md:px-6 md:py-4"
    >
      <WhatsAppIcon className="size-7 shrink-0" />
      <span className="sr-only text-base font-medium md:not-sr-only">{dict.label}</span>
    </a>
  );
}
