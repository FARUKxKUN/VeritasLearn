import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../lib/utils';

type Variant = 'solid' | 'crimson' | 'outline' | 'ghost';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-edge px-5 font-medium leading-none transition-[background-color,color,transform,border-color] duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-45';

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-paper hover:bg-ink-2',
  crimson: 'bg-crimson text-paper hover:bg-crimson-deep',
  outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:bg-sunk',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'solid', className, type = 'button', ...rest },
  ref,
) {
  return <button ref={ref} type={type} className={cn(base, variants[variant], className)} {...rest} />;
});

interface ButtonLinkProps extends LinkProps {
  variant?: Variant;
}

export function ButtonLink({ variant = 'solid', className, ...rest }: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...rest} />;
}
