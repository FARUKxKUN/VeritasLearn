import { TierType, TIER_CONFIG } from '../../types';
import { cn } from '../../lib/utils';

/** Each tier is a coloured medal. Colour climbs from plain paper to crimson and gold. */
const MEDAL: Record<TierType, string> = {
  [TierType.SEEKER]: 'bg-surface text-ink',
  [TierType.EXPLORER]: 'bg-sky text-ink',
  [TierType.SCHOLAR]: 'bg-mint text-white',
  [TierType.MASTER]: 'bg-ink text-sun',
  [TierType.LEGEND]: 'bg-crimson text-white',
  [TierType.TITAN]: 'bg-sun text-crimson-deep',
};

interface StampProps {
  tier: TierType;
  size?: 'sm' | 'md' | 'lg';
  muted?: boolean;
  className?: string;
}

const sizes = { sm: 'size-10 text-base', md: 'size-14 text-2xl', lg: 'size-28 text-6xl' } as const;

export function Stamp({ tier, size = 'md', muted = false, className }: StampProps) {
  const config = TIER_CONFIG[tier];
  return (
    <span
      role="img"
      aria-label={`${config.name}, tier ${config.numeral}`}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border-2 border-ink font-display leading-none shadow-[0_3px_0_0_var(--color-ink)]',
        MEDAL[tier],
        sizes[size],
        muted && 'border-dashed border-ink-3 bg-sunk text-ink-3 shadow-none',
        className,
      )}
    >
      {config.numeral}
    </span>
  );
}
