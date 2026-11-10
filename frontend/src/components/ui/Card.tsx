import type { HTMLAttributes } from 'react';

export function Card({
  className = '',
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={`flex grow basis-90 flex-col gap-5 rounded-card border border-line bg-surface p=6 sm:p-8 ${className}`}
      {...props}
    />
  );
}
