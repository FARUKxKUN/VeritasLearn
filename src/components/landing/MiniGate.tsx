import { useState } from 'react';
import { RedactedAnswer } from '../chat/RedactedAnswer';
import { Button } from '../ui/Button';
import { Mascot, type MascotMood } from '../ui/Mascot';
import { cn } from '../../lib/utils';

const ANSWER =
  'Plants turn **light, water and carbon dioxide** into sugar. Oxygen is released as a byproduct, which is why forests matter for the air we breathe.';
const QUESTION = 'What do plants release as a byproduct of photosynthesis?';
const OPTIONS = ['Carbon dioxide', 'Oxygen', 'Nitrogen'] as const;
const CORRECT = 1;

/** A one-question version of the real gate, so the idea can be played in the first screen. */
export function MiniGate() {
  const [picked, setPicked] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const wrong = picked !== null && picked !== CORRECT;
  const mood: MascotMood = open ? 'happy' : wrong ? 'sad' : 'locked';

  const choose = (index: number) => {
    setPicked(index);
    if (index === CORRECT) setOpen(true);
  };

  return (
    <div className="pop relative p-6 pt-10 md:p-8 md:pt-12">
      <Mascot mood={mood} size={96} className={cn('absolute -top-12 right-5', !open && !wrong && 'float')} />
      <p className="label">Quick quest - 1 question</p>
      <p className="mt-3 font-extrabold">Tutor answer</p>
      <RedactedAnswer text={ANSWER} locked={!open} className="mt-2 text-small" />

      <div className="mt-6 border-t-2 border-dashed border-line pt-5">
        <p className="text-h3 font-extrabold leading-tight">{QUESTION}</p>
        <ul className="mt-4 grid gap-3">
          {OPTIONS.map((option, index) => {
            const isWrong = picked === index && wrong;
            const isRight = open && index === CORRECT;
            return (
              <li key={option}>
                <button
                  type="button"
                  aria-disabled={open}
                  onClick={() => !open && choose(index)}
                  className={cn(
                    'flex min-h-12 w-full items-center rounded-2xl border-2 px-5 text-left font-bold shadow-[0_4px_0_0_var(--color-ink)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none',
                    isRight ? 'pop-in border-ink bg-mint text-white' : 'border-ink bg-surface hover:bg-sun-tint',
                    isWrong && 'shake bg-crimson-tint',
                  )}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
        <p aria-live="polite" className="mt-4 min-h-6 font-bold text-ink-2">
          {open ? 'Boom! Gate passed, the bars lift. +50 XP in the real thing.' : wrong ? 'Close! Try another one.' : ''}
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
            Play again
          </Button>
        ) : null}
      </div>
    </div>
  );
}
