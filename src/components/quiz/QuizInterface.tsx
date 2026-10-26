import { useCallback, useEffect, useState } from 'react';
import { Check, X } from '@phosphor-icons/react';
import type { Question } from '../../types';
import { Button } from '../ui/Button';
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
  const [remaining, setRemaining] = useState(question.timeLimit);

  const submit = useCallback(
    (choice: number | null) => {
      setSubmitted(true);
      if (choice !== null && choice === question.correctAnswer) setCorrect((value) => value + 1);
    },
    [question.correctAnswer],
  );

  useEffect(() => {
    if (submitted) return;
    const id = window.setTimeout(() => {
      if (remaining <= 1) {
        setRemaining(0);
        submit(selected);
      } else {
        setRemaining(remaining - 1);
      }
    }, 1000);
    return () => window.clearTimeout(id);
  }, [remaining, submitted, selected, submit]);

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

  const urgent = remaining <= 10 && !submitted;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="label">
          Question {index + 1} of {questions.length}
        </p>
        <p className={cn('tnum font-mono text-h3', urgent && 'text-crimson')} role="timer" aria-label={`${remaining} seconds left`}>
          0:{String(Math.max(remaining, 0)).padStart(2, '0')}
        </p>
      </div>
      <h2 className="mt-4 text-h2">{question.question}</h2>

      <ul className="mt-6 space-y-2">
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
                  'flex min-h-12 w-full items-center gap-4 border-2 px-4 py-3 text-left transition-colors',
                  selected === optionIndex && !submitted && 'border-ink bg-sunk',
                  selected !== optionIndex && !submitted && 'border-line hover:border-ink',
                  isCorrect && 'border-ink bg-ink text-paper',
                  isWrong && 'border-crimson bg-crimson-tint',
                  submitted && !isCorrect && !isWrong && 'border-line opacity-60',
                )}
              >
                <span className="font-mono text-label">{LETTERS[optionIndex]}</span>
                <span className="flex-1">{option}</span>
                {isCorrect ? <Check size={20} weight="bold" aria-label="Correct answer" /> : null}
                {isWrong ? <X size={20} weight="bold" aria-label="Your answer, incorrect" className="text-crimson" /> : null}
              </button>
            </li>
          );
        })}
      </ul>

      {submitted ? (
        <div className="mt-6 border-l-4 border-crimson pl-4">
          <p className="label">{remaining <= 0 && selected === null ? 'Out of time' : 'Why'}</p>
          <p className="mt-1 text-ink-2">{question.explanation}</p>
        </div>
      ) : null}

      <div className="mt-8">
        {submitted ? (
          <Button onClick={next}>{index + 1 >= questions.length ? 'See result' : 'Next question'}</Button>
        ) : (
          <Button variant="crimson" disabled={selected === null} onClick={() => submit(selected)}>
            Lock in answer
          </Button>
        )}
      </div>
    </div>
  );
}
