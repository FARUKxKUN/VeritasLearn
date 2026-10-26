import { Sheet } from '../ui/Sheet';
import { Button } from '../ui/Button';
import { Mascot } from '../ui/Mascot';

interface ComprehensionGateProps {
  open: boolean;
  onClose: () => void;
  onCopy: () => void;
  onLearn: () => void;
}

export function ComprehensionGate({ open, onClose, onCopy, onLearn }: ComprehensionGateProps) {
  return (
    <Sheet open={open} onClose={onClose} label="Comprehension gate">
      <div className="flex items-center gap-5">
        <Mascot mood="locked" size={96} className="float" />
        <div>
          <p className="label">The gate</p>
          <h2 className="text-h2">Lift the bars?</h2>
        </div>
      </div>
      <p className="mt-5 text-ink-2">
        Three questions, thirty seconds each. Get 70 percent or more and the answer opens, you earn XP, and you get a study
        sheet. Or copy the answer as it is and earn nothing.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button variant="crimson" onClick={onLearn} className="sm:flex-1">
          Beat the quiz, +50 XP
        </Button>
        <Button variant="outline" onClick={onCopy} className="sm:flex-1">
          Copy it, 0 XP
        </Button>
      </div>
      <button type="button" onClick={onClose} className="mt-5 min-h-11 font-bold text-ink-3 underline underline-offset-4 hover:text-ink">
        Not now
      </button>
    </Sheet>
  );
}
