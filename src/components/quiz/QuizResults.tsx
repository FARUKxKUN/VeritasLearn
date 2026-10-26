import { Button } from '../ui/Button';

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
    <div>
      <p className="label">{passed ? 'Gate passed' : 'Gate closed'}</p>
      <p className="tnum mt-3 font-display text-hero leading-none">
        {score}
        <span className="text-ink-3">/{totalQuestions}</span>
      </p>
      <p className="mt-4 text-ink-2">
        {passed
          ? `${percent} percent. The bars are lifting and you earned ${pointsEarned} points${isRetry ? ' for the retry' : ''}.`
          : `${percent} percent. You need 70 to open the answer. Try an easier set, or leave it locked for now.`}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {onRetry ? (
          <Button variant="crimson" onClick={onRetry}>
            Try an easier set
          </Button>
        ) : null}
        <Button variant={passed ? 'crimson' : 'outline'} onClick={onContinue}>
          {passed ? 'Open my study sheet' : 'Leave it locked'}
        </Button>
      </div>
    </div>
  );
}
