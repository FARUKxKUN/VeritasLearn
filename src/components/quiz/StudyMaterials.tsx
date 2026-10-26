import type { Flashcard } from '../../types';
import { RedactedAnswer } from '../chat/RedactedAnswer';
import { Flashcards } from './Flashcards';

interface StudyMaterialsProps {
  topic: string;
  summary: string;
  keyPoints: string[];
  flashcards: Flashcard[];
}

export function StudyMaterials({ topic, summary, keyPoints, flashcards }: StudyMaterialsProps) {
  return (
    <div className="space-y-10">
      <header>
        <p className="label">Study sheet - bonus loot</p>
        <h2 className="mt-2 text-h1">{topic}</h2>
      </header>

      <section aria-labelledby="sum">
        <h3 id="sum" className="label">
          In plain words
        </h3>
        <RedactedAnswer text={summary} locked={false} className="mt-3 text-ink-2" />
      </section>

      <section aria-labelledby="pts">
        <h3 id="pts" className="label">
          Keep these
        </h3>
        <ol className="mt-4 space-y-3">
          {keyPoints.map((point, index) => (
            <li key={point} className="flex items-start gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun font-extrabold">
                {index + 1}
              </span>
              <span className="pt-1">{point}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="fc">
        <h3 id="fc" className="label">
          Flashcards
        </h3>
        <div className="mt-3">
          <Flashcards cards={flashcards} />
        </div>
      </section>
    </div>
  );
}
