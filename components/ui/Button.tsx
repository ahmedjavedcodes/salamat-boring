import type { ButtonHTMLAttributes } from 'react';

import { type ButtonSize, type ButtonVariant, buttonClasses } from './buttonStyles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
