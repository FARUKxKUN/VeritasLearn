import { Star } from '@phosphor-icons/react';
import { Button } from '../ui/Button';
import { Mascot } from '../ui/Mascot';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  isRetry: boolean;
  onRetry?: () => void;
  onContinue: () => void;
}

export function QuizResults({ score, totalQuestions, pointsEarned, isRetry, onRetry, onContinue }: QuizResultsProps) {
  const passed = pointsEarned > 0;
  const percent = Math.round((score / totalQuestions) * 100);
  return (
    <div className="text-center">
      <Mascot mood={passed ? 'happy' : 'sad'} size={140} className="pop-in mx-auto" />
      <p className="label mt-4">{passed ? 'Gate passed' : 'Gate still closed'}</p>
      <p className="tnum mt-1 font-display text-hero leading-none">
        {score}
        <span className="text-ink-3">/{totalQuestions}</span>
      </p>
      {passed ? (
        <p className="pop-sm mx-auto mt-5 inline-flex min-h-11 items-center gap-2 bg-sun px-5 text-h3 font-extrabold">
          <Star size={24} weight="fill" aria-hidden /> +{pointsEarned} XP{isRetry ? ' (retry)' : ''}
        </p>
      ) : null}
      <p className="mx-auto mt-5 max-w-md text-ink-2">
        {passed
          ? `${percent} percent. The bars are lifting.`
          : `${percent} percent. You need 70 to open the answer. ${onRetry ? 'Try an easier round, or leave it locked for now.' : 'The answer stays locked for now.'}`}
      </p>
      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        {onRetry ? (
          <Button variant="crimson" onClick={onRetry}>
            Try an easier round
          </Button>
        ) : null}
        <Button variant={passed ? 'crimson' : 'outline'} onClick={onContinue}>
          {passed ? 'Open my study sheet' : 'Leave it locked'}
        </Button>
      </div>
    </div>
  );
}
