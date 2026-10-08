import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  /** Receives the ids to wire into aria-describedby and the invalid state. */
  children: (control: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
};

/**
 * Label + control + message, with aria-invalid and aria-describedby wired for the
 * caller (CLAUDE.md §7.4). The error replaces nothing — the hint stays readable so the
 * person can still see what the field wants.
 */
export function Field({ id, label, hint, error, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-ink text-sm font-medium">
        {label}
      </label>

      {hint ? (
        <p id={hintId} className="text-ink/70 text-sm">
          {hint}
        </p>
      ) : null}

      {children({ id, describedBy, invalid: Boolean(error) })}

      {error ? (
        <p id={errorId} className="text-alert text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Shared input/select/textarea surface so the three never drift apart. */
export const controlClasses = (invalid: boolean, className?: string) =>
  cn(
    'min-h-11 w-full rounded-input border bg-mist px-3 py-2 text-base text-ink',
    invalid ? 'border-alert' : 'border-galvanized/60',
    className,
  );
