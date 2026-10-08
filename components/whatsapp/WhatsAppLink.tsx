import type { ReactNode } from 'react';

import { type ButtonSize, type ButtonVariant, buttonClasses } from '@/components/ui/buttonStyles';
import { cn } from '@/lib/utils/cn';
import { whatsappUrl } from '@/lib/utils/whatsapp';

type WhatsAppLinkProps = {
  /** Prefilled message, from the dictionary. Never assembled in a component. */
  message: string;
  /** Lead source, so the client can tell where an enquiry came from (§7.6). */
  source: string;
  appearance?: 'button' | 'inline';
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

/**
 * Every WhatsApp entry point except the floating button (§3.10). A plain anchor, so it
 * works with no JavaScript at all.
 */
export function WhatsAppLink({
  message,
  source,
  appearance = 'button',
  variant = 'whatsapp',
  size,
  className,
  children,
}: WhatsAppLinkProps) {
  const classes =
    appearance === 'button'
      ? buttonClasses(variant, size, className)
      : cn(
          'inline-flex min-h-11 items-center gap-2 text-base font-medium text-aquifer underline decoration-galvanized underline-offset-4 hover:decoration-aquifer',
          className,
        );

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      data-source={source}
      className={classes}
    >
      {children}
    </a>
  );
}
