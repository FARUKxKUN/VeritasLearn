import { Sheet } from '../ui/Sheet';
import { Button } from '../ui/Button';

interface ComprehensionGateProps {
  open: boolean;
  onClose: () => void;
  onCopy: () => void;
  onLearn: () => void;
}

export function ComprehensionGate({ open, onClose, onCopy, onLearn }: ComprehensionGateProps) {
  return (
    <Sheet open={open} onClose={onClose} label="Comprehension gate">
      <p className="label">The gate</p>
      <h2 className="mt-2 text-h2">Read it, or earn it.</h2>
      <p className="mt-4 text-ink-2">
        Three questions, thirty seconds each. Score 70 percent or more and the answer opens, you earn points, and you get a
        study sheet. Or copy the answer as it is, for no points.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button variant="crimson" onClick={onLearn} className="sm:flex-1">
          Take the check, earn 50 points
        </Button>
        <Button variant="outline" onClick={onCopy} className="sm:flex-1">
          Copy the answer, 0 points
        </Button>
      </div>
      <button type="button" onClick={onClose} className="mt-5 min-h-11 text-small text-ink-3 underline underline-offset-4 hover:text-ink">
        Not now
      </button>
    </Sheet>
  );
}
