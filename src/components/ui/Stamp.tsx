import { TierType, TIER_CONFIG } from '../../types';
import { cn } from '../../lib/utils';

const styles = {
  outline: 'border-2 border-ink text-ink',
  solid: 'border-2 border-ink bg-ink text-paper',
  'crimson-outline': 'border-2 border-crimson text-crimson',
  crimson: 'border-2 border-crimson bg-crimson text-paper',
} as const;

interface StampProps {
  tier: TierType;
  size?: 'sm' | 'md' | 'lg';
  muted?: boolean;
  className?: string;
}

const sizes = { sm: 'size-10 text-base', md: 'size-14 text-xl', lg: 'size-24 text-4xl' } as const;

/** A tier is a rubber stamp with a roman numeral. Circles are used for stamps and nothing else. */
export function Stamp({ tier, size = 'md', muted = false, className }: StampProps) {
  const config = TIER_CONFIG[tier];
  return (
    <span
      role="img"
      aria-label={`${config.name}, tier ${config.numeral}`}
      className={cn(
        'inline-flex shrink-0 -rotate-6 items-center justify-center rounded-full font-display leading-none',
        styles[config.stamp],
        sizes[size],
        muted && 'border-line bg-transparent text-ink-3 opacity-70',
        className,
      )}
    >
      {config.numeral}
    </span>
  );
}
