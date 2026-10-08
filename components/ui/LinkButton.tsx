import type { AnchorHTMLAttributes } from 'react';

import { type ButtonSize, type ButtonVariant, buttonClasses } from './buttonStyles';

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <a className={buttonClasses(variant, size, className)} {...props} />;
}
