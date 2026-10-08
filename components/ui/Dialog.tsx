'use client';

import { type ReactNode, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils/cn';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  /** id of the heading that names the dialog. */
  labelledBy: string;
  /** Bottom sheet on mobile, or a centred panel at every width. */
  placement?: 'sheet' | 'centre';
  className?: string;
  children: ReactNode;
};

/**
 * Thin wrapper over the native <dialog>. showModal() already traps focus, closes on Esc
 * and returns focus to the trigger (CLAUDE.md §3.9), so this only adds: open/close
 * syncing, backdrop dismissal, and a fallback for browsers without showModal (§7.4).
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  placement = 'centre',
  className,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open && !el.open) {
      if (typeof el.showModal === 'function') el.showModal();
      else el.setAttribute('open', '');
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fires for Esc and for close() alike, so state cannot drift from the element.
    const handleClose = () => onClose();
    el.addEventListener('close', handleClose);
    return () => el.removeEventListener('close', handleClose);
  }, [onClose]);

  // A click on ::backdrop reports the dialog itself as the target.
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) onClose();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClick={handleClick}
      className={cn(
        'bg-limewash text-ink backdrop:bg-aquifer/60 z-50 max-h-dvh',
        placement === 'sheet'
          ? 'md:rounded-media mb-0 w-full max-w-none rounded-none md:mx-auto md:my-auto md:w-auto md:max-w-md'
          : 'rounded-media mx-auto my-auto w-full max-w-5xl',
        className,
      )}
    >
      {children}
    </dialog>
  );
}
