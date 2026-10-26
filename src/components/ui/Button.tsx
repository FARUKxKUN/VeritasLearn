import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../lib/utils';

type Variant = 'solid' | 'crimson' | 'sun' | 'outline' | 'ghost';

/* Chunky game buttons: a hard shadow that the button sinks into when pressed. */
const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-ink px-6 text-base font-extrabold leading-none ' +
  'transition-[transform,box-shadow,background-color] duration-150 ' +
  'shadow-[0_4px_0_0_var(--color-ink)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-ink)] ' +
  'active:translate-y-1 active:shadow-[0_0_0_0_var(--color-ink)] ' +
  'disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none disabled:hover:translate-y-0';

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-paper hover:bg-ink-2',
  crimson: 'bg-crimson text-white hover:bg-[#d52b27]',
  sun: 'bg-sun text-ink hover:bg-[#ffd267]',
  outline: 'bg-surface text-ink hover:bg-sun-tint',
  ghost: 'border-transparent bg-transparent shadow-none hover:bg-sunk hover:shadow-none active:shadow-none',
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
