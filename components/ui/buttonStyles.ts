import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'adaptive';
export type ButtonSize = 'md' | 'lg';

/** min-h-11 / min-w-11 keeps every control at or above the 44 px touch target (§3.9). */
const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-input text-base font-medium no-underline transition-colors disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-aquifer text-limewash hover:bg-groundwater',
  secondary: 'border border-aquifer bg-transparent text-aquifer hover:bg-mist',
  ghost: 'bg-transparent text-ink hover:bg-mist',
  whatsapp: 'bg-whatsapp text-whatsapp-ink hover:bg-whatsapp/85',
  // Inherits the surrounding text colour, so it stays legible on the header as it
  // changes from transparent-over-hero to aquifer.
  adaptive: 'border border-current bg-transparent text-current hover:opacity-75',
};

const sizes: Record<ButtonSize, string> = {
  md: 'px-5 py-2',
  lg: 'px-6 py-3',
};

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}
