import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-surface hover:bg-primary-hover disabled:bg-line-strong',
  secondary:
    'border border-ink bg-surface text-ink disabled:border-line-strong disabled:text-muted',
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={`h-13 cursor-pointer rounded-field text-base font-semibold
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
            disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
