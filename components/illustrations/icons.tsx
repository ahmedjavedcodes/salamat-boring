import type { SVGProps } from 'react';

/**
 * Decorative by default: every icon here sits beside a text label or inside a control
 * that carries its own accessible name, so it is hidden from assistive tech (§3.9).
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const;

/** Brand mark: filled, and never mirrored in RTL (§4.6). */
export function WhatsAppIcon(props: IconProps) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable={false}
      {...props}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.25.69-1.44 1.33-1.98 1.38-.54.06-1.04.08-1.84-.21a15.6 15.6 0 0 1-4.32-2.72 11.6 11.6 0 0 1-2.4-3.16c-.25-.5-.4-1.06-.4-1.6 0-.58.21-1.14.6-1.57.2-.22.44-.33.7-.33h.5c.22 0 .41.03.57.38.2.42.67 1.63.73 1.75.06.11.1.25.02.4-.08.16-.15.26-.27.4l-.36.42c-.12.12-.24.26-.1.5.13.25.6 1 1.3 1.62.88.8 1.62 1.05 1.86 1.17.23.12.37.1.5-.04.14-.14.6-.68.76-.92.16-.23.32-.19.54-.11.21.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.6-.19 1.29Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6c.3 4 2 7.7 4.8 10.5 2.8 2.9 6.5 4.6 10.5 4.9a1.5 1.5 0 0 0 1.6-1.5v-2a1.5 1.5 0 0 0-1.3-1.5l-2.4-.3a1.5 1.5 0 0 0-1.4.6l-.8 1a14.6 14.6 0 0 1-5.5-5.5l1-.8a1.5 1.5 0 0 0 .6-1.4L9.9 4.3A1.5 1.5 0 0 0 8.5 3Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="m3 6.5 9 6 9-6" />
    </svg>
  );
}

/** Brand mark: never mirrored in RTL (§4.6). */
export function FacebookIcon(props: IconProps) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable={false}
      {...props}
    >
      <path d="M14.5 8.5h2.3V5.3c-.4-.06-1.6-.17-3-.17-3 0-4.9 1.8-4.9 5.1v2.6H6.4v3.5h2.5V22h3.7v-5.6h2.6l.4-3.5h-3V10c0-1 .3-1.5 1.9-1.5Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

/** Directional: callers add rtl:-scale-x-100 so it follows reading order (§4.6). */
export function ChevronIcon(props: IconProps) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21c4-4.4 6-7.5 6-10a6 6 0 1 0-12 0c0 2.5 2 5.6 6 10Z" />
      <circle cx="12" cy="11" r="2.25" />
    </svg>
  );
}
