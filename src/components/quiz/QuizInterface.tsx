import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Timer, X } from '@phosphor-icons/react';
import type { Question } from '../../types';
import { Button } from '../ui/Button';
import { Mascot } from '../ui/Mascot';
import { cn } from '../../lib/utils';

interface QuizInterfaceProps {
  questions: Question[];
  onComplete: (correct: number, total: number) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const question = questions[index];
  const [remaining, setRemaining] = useState(question?.timeLimit ?? 0);
  const selectedRef = useRef<number | null>(null);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const submit = useCallback(
    (choice: number | null) => {
      setSubmitted(true);
      if (choice !== null && choice === question?.correctAnswer) setCorrect((value) => value + 1);
    },
    [question?.correctAnswer],
  );

  useEffect(() => {
    if (submitted) return;
    const id = window.setTimeout(() => {
      if (remaining <= 1) {
        setRemaining(0);
        submit(selectedRef.current);
      } else {
        setRemaining(remaining - 1);
      }
    }, 1000);
    return () => window.clearTimeout(id);
  }, [remaining, submitted, submit]);

  const next = () => {
    if (index + 1 >= questions.length) {
      onComplete(correct, questions.length);
      return;
    }
    const upcoming = questions[index + 1];
    setIndex(index + 1);
    setSelected(null);
    setSubmitted(false);
    setRemaining(upcoming.timeLimit);
  };

  if (!question) return <p>No questions available.</p>;

  const urgent = remaining <= 10 && !submitted;
  const gotIt = submitted && selected === question.correctAnswer;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <ol className="flex gap-2" aria-label={`Question ${index + 1} of ${questions.length}`}>
          {questions.map((q, i) => (
            <li
              key={q.id}
              className={cn(
                'h-3 w-10 rounded-full border-2 border-ink',
                i < index ? 'bg-mint' : i === index ? 'bg-sun' : 'bg-surface',
              )}
            />
          ))}
        </ol>
        <p
          role="timer"
          aria-label={`${remaining} seconds left`}
          className={cn(
            'tnum pop-sm flex min-h-10 items-center gap-1 px-4 font-extrabold',
            urgent && 'animate-pulse bg-crimson text-white',
          )}
        >
          <Timer size={20} weight="fill" aria-hidden /> 0:{String(Math.max(remaining, 0)).padStart(2, '0')}
        </p>
      </div>
      <h2 className="mt-6 text-h2">{question.question}</h2>

      <ul className="mt-6 space-y-3">
        {question.options.map((option, optionIndex) => {
          const isCorrect = submitted && optionIndex === question.correctAnswer;
          const isWrong = submitted && optionIndex === selected && optionIndex !== question.correctAnswer;
          return (
            <li key={option}>
              <button
                type="button"
                disabled={submitted}
                aria-pressed={selected === optionIndex}
                onClick={() => setSelected(optionIndex)}
                className={cn(
                  'flex min-h-14 w-full items-center gap-4 rounded-2xl border-2 border-ink px-4 py-3 text-left font-bold shadow-[0_4px_0_0_var(--color-ink)] transition-[transform,background-color,box-shadow]',
                  !submitted && 'hover:-translate-y-0.5 active:translate-y-1 active:shadow-none',
                  !submitted && (selected === optionIndex ? 'translate-y-0.5 bg-sun shadow-[0_2px_0_0_var(--color-ink)]' : 'bg-surface hover:bg-sun-tint'),
                  isCorrect && 'pop-in bg-mint text-white',
                  isWrong && 'shake bg-crimson-tint',
                  submitted && !isCorrect && !isWrong && 'bg-surface opacity-55 shadow-none',
                )}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-current text-small font-extrabold">
                  {LETTERS[optionIndex]}
                </span>
                <span className="flex-1">{option}</span>
                {isCorrect ? <Check size={24} weight="bold" aria-label="Correct answer" /> : null}
                {isWrong ? <X size={24} weight="bold" aria-label="Your answer, incorrect" className="text-crimson" /> : null}
              </button>
            </li>
          );
        })}
      </ul>

      {submitted ? (
        <div className="mt-6 flex items-start gap-4 rounded-2xl bg-sunk p-4">
          <Mascot mood={gotIt ? 'happy' : 'sad'} size={56} />
          <div>
            <p className="font-extrabold">{gotIt ? 'Nice one!' : remaining <= 0 && selected === null ? 'Out of time!' : 'Not this time.'}</p>
            <p className="mt-1 text-ink-2">{question.explanation}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-8">
        {submitted ? (
          <Button variant="crimson" onClick={next}>
            {index + 1 >= questions.length ? 'See result' : 'Next question'}
          </Button>
        ) : (
          <Button variant="crimson" disabled={selected === null} onClick={() => submit(selected)}>
            Lock in answer
          </Button>
        )}
      </div>
    </div>
  );
}
