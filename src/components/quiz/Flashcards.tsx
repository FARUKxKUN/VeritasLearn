import { useState } from 'react';
import type { Flashcard } from '../../types';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<ReadonlySet<string>>(new Set());
  const card = cards[index];
  if (!card) return null;

  const go = (step: number) => {
    setIndex((index + step + cards.length) % cards.length);
    setFlipped(false);
  };
  const markKnown = () => {
    setKnown(new Set(known).add(card.id));
    go(1);
  };

  return (
    <div>
      <p className="label">
        Card {index + 1} of {cards.length} - {known.size} known
      </p>
      <button
        type="button"
        onClick={() => setFlipped(!flipped)}
        aria-label={flipped ? 'Showing the answer. Press to show the question.' : 'Showing the question. Press to show the answer.'}
        className={cn(
          'mt-3 flex min-h-44 w-full items-center justify-center border-2 border-ink p-6 text-center transition-colors',
          flipped ? 'bg-ink text-paper' : 'bg-surface',
        )}
      >
        <span className={cn(flipped ? 'text-body' : 'font-display text-h3')}>{flipped ? card.back : card.front}</span>
      </button>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => go(-1)}>
          Previous
        </Button>
        <Button variant="outline" onClick={() => go(1)}>
          Next
        </Button>
        <Button variant="crimson" onClick={markKnown}>
          Got it
        </Button>
      </div>
    </div>
  );
}
