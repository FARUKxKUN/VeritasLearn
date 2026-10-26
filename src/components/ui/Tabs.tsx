import { useId, type KeyboardEvent } from 'react';
import { cn } from '../../lib/utils';

interface TabsProps<T extends string> {
  tabs: ReadonlyArray<{ id: T; label: string }>;
  value: T;
  onChange: (id: T) => void;
  label: string;
}

/** Pill toggle with arrow-key navigation. */
export function Tabs<T extends string>({ tabs, value, onChange, label }: TabsProps<T>) {
  const group = useId();
  const move = (event: KeyboardEvent, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = tabs[(index + step + tabs.length) % tabs.length];
    onChange(next.id);
    document.getElementById(`${group}-${next.id}`)?.focus();
  };
  return (
    <div role="tablist" aria-label={label} className="pop-sm inline-flex gap-1 p-1">
      {tabs.map((tab, index) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            id={`${group}-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => move(event, index)}
            className={cn(
              'min-h-11 rounded-full px-6 font-extrabold transition-colors',
              active ? 'bg-crimson text-white' : 'text-ink-2 hover:bg-sunk',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
