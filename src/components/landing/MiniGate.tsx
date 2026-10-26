import { useState } from 'react';
import { RedactedAnswer } from '../chat/RedactedAnswer';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const ANSWER =
  'Plants turn **light, water and carbon dioxide** into sugar. Oxygen is released as a byproduct, which is why forests matter for the air we breathe.';
const QUESTION = 'What do plants release as a byproduct of photosynthesis?';
const OPTIONS = ['Carbon dioxide', 'Oxygen', 'Nitrogen'] as const;
const CORRECT = 1;

/** A one-question version of the real gate, so the idea can be felt in the first screen. */
export function MiniGate() {
  const [picked, setPicked] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const wrong = picked !== null && picked !== CORRECT;

  const choose = (index: number) => {
    setPicked(index);
    if (index === CORRECT) setOpen(true);
  };

  return (
    <div className="border-2 border-ink bg-surface p-5 md:p-7">
      <p className="label">Try the gate</p>
      <p className="mt-3 font-medium">Tutor answer</p>
      <RedactedAnswer text={ANSWER} locked={!open} className="mt-2 text-small" />

      <div className="mt-6 border-t-2 border-ink pt-5">
        <p className="font-display text-h3">{QUESTION}</p>
        <ul className="mt-4 grid gap-2">
          {OPTIONS.map((option, index) => (
            <li key={option}>
              <button
                type="button"
                disabled={open}
                onClick={() => choose(index)}
                className={cn(
                  'flex min-h-11 w-full items-center border-2 px-4 text-left transition-colors',
                  open && index === CORRECT ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink',
                  picked === index && wrong && 'border-crimson bg-crimson-tint',
                )}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        <p aria-live="polite" className="mt-3 min-h-6 text-small text-ink-2">
          {open ? 'Gate passed. The bars lift.' : wrong ? 'Not quite. Try again.' : ''}
        </p>
        {open ? (
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              setOpen(false);
              setPicked(null);
            }}
          >
            Lock it again
          </Button>
        ) : null}
      </div>
    </div>
  );
}
