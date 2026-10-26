import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface MeterProps {
  value: number;
  label: string;
  tone?: 'ink' | 'crimson';
  className?: string;
}

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
      className={cn('h-2 w-full bg-sunk', className)}
    >
      <div
        className={cn('h-full transition-[width] duration-1000 ease-out-soft', tone === 'ink' ? 'bg-ink' : 'bg-crimson')}
        style={{ width: `${shown}%` }}
      />
    </div>
  );
}
