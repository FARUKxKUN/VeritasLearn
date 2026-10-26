import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Flashcard } from '../../types';
import { Button } from '../ui/Button';

export function Flashcards({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<ReadonlySet<string>>(new Set());
  const reduce = useReducedMotion();
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
        className="mt-3 block min-h-48 w-full [perspective:1000px]"
      >
        <motion.span
          className="relative block min-h-48 w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 22 }}
        >
          <span
            aria-hidden={flipped}
            className="pop absolute inset-0 flex items-center justify-center bg-sky p-6 text-center font-display text-h3 [backface-visibility:hidden]"
          >
            {card.front}
          </span>
          <span
            aria-hidden={!flipped}
            className="pop absolute inset-0 flex items-center justify-center bg-ink p-6 text-center font-bold text-paper [backface-visibility:hidden] [transform:rotateY(180deg)]"
          >
            {card.back}
          </span>
        </motion.span>
      </button>
      <div className="mt-6 flex flex-wrap gap-3">
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
