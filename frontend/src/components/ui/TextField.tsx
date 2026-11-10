import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export function TextField({ id, label, className = '', ...props }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className={`h-12 rounded-field border border-line-strong bg-surface px-3.5
            text-base text-ink placeholder:text-muted
            focus-visible:outline-2 focus-visible:outline-primary
            disabled:cursor-not-allowed disabled:bg-page ${className}`}
        {...props}
      />
    </div>
  );
}
