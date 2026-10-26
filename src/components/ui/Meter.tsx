import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface MeterProps {
  value: number;
  label: string;
  tone?: 'ink' | 'crimson';
  className?: string;
}

/** An XP bar: chunky, outlined, fills from zero with a little shine. */
export function Meter({ value, label, tone = 'ink', className }: MeterProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setShown(clamped));
    return () => window.cancelAnimationFrame(id);
  }, [clamped]);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn('h-5 w-full overflow-hidden rounded-full border-2 border-ink bg-surface', className)}
    >
      <div
        className={cn(
          'relative h-full rounded-full transition-[width] duration-1000 ease-out-soft',
          tone === 'ink' ? 'bg-ink' : 'bg-sun',
        )}
        style={{ width: `${shown}%` }}
      >
        <span className="absolute inset-x-2 top-0.5 h-1 rounded-full bg-white/50" />
      </div>
    </div>
  );
}
