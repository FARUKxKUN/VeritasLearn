import { useId, type KeyboardEvent } from 'react';
import { cn } from '../../lib/utils';

interface TabsProps<T extends string> {
  tabs: ReadonlyArray<{ id: T; label: string }>;
  value: T;
  onChange: (id: T) => void;
  label: string;
}

/** Underlined editorial tabs with arrow-key navigation. */
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
    <div role="tablist" aria-label={label} className="flex gap-6 border-b-2 border-ink">
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
              '-mb-0.5 min-h-11 border-b-4 px-1 font-medium transition-colors',
              active ? 'border-crimson text-ink' : 'border-transparent text-ink-3 hover:text-ink',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
