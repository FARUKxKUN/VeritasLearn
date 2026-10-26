const WORDS = ['ASK', 'REDACT', 'PROVE', 'KEEP'] as const;

/** A slow band of the four verbs. Decorative, so hidden from assistive tech. */
export function Marquee() {
  const row = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
  return (
    <div aria-hidden className="overflow-hidden border-y-2 border-ink bg-crimson py-5 text-paper">
      <div className="flex w-max whitespace-nowrap font-display text-h1 [animation:marquee_28s_linear_infinite]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-10 pr-10">
            {row.map((word, index) => (
              <span key={`${copy}-${index}`} className="flex items-center gap-10">
                {word}
                <span className="inline-block size-4 bg-paper" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
