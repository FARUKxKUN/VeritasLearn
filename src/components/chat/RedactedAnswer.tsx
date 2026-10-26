import { Fragment } from 'react';
import { cn } from '../../lib/utils';

interface RedactedAnswerProps {
  text: string;
  /** While locked every word is a black bar. Flipping to false lifts the bars one after another. */
  locked: boolean;
  className?: string;
}

interface Segment {
  text: string;
  bold: boolean;
}

interface Line {
  marker: string | null;
  segments: Segment[];
}

const LIST_MARKER = /^(\d+\.|-)\s+/;

function parseLine(raw: string): Line {
  const markerMatch = raw.match(LIST_MARKER);
  const body = markerMatch ? raw.slice(markerMatch[0].length) : raw;
  const segments = body
    .split('**')
    .map((text, index) => ({ text, bold: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
  return { marker: markerMatch ? markerMatch[1] : null, segments };
}

/**
 * A tiny renderer for the tutor's answers: paragraphs, **bold**, "-" and "1." lists.
 * The same DOM is used locked and unlocked so the unlock can animate word by word.
 */
export function RedactedAnswer({ text, locked, className }: RedactedAnswerProps) {
  const lines = text.split('\n').map((raw) => raw.trim());
  let wordIndex = 0;

  return (
    <div className={cn('font-serif-answer space-y-4', className)}>
      {locked ? <span className="sr-only">This answer is locked. Pass the comprehension gate to read it.</span> : null}
      <div aria-hidden={locked} className="space-y-4">
        {lines.map((raw, lineIndex) => {
          if (!raw) return null;
          const line = parseLine(raw);
          return (
            <p key={lineIndex} className={cn(line.marker && 'flex gap-3')}>
              {line.marker ? (
                <span aria-hidden className="w-6 shrink-0 font-extrabold text-sun-deep">
                  {line.marker === '-' ? '•' : line.marker}
                </span>
              ) : null}
              <span>
                {line.segments.map((segment, segmentIndex) => (
                  <Fragment key={segmentIndex}>
                    {segment.text.split(/(\s+)/).map((piece, pieceIndex) => {
                      if (!piece) return null;
                      if (/^\s+$/.test(piece)) return <Fragment key={pieceIndex}> </Fragment>;
                      const index = Math.min(wordIndex++, 90);
                      return (
                        <span
                          key={pieceIndex}
                          data-open={!locked}
                          className={cn('redacted-word', segment.bold && 'font-semibold')}
                          style={{ ['--i' as string]: index }}
                        >
                          {piece}
                        </span>
                      );
                    })}
                  </Fragment>
                ))}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
