const STEPS = [
  { title: 'Ask', body: 'Type any question. The tutor writes a full answer.' },
  { title: 'Redact', body: 'The answer is hidden word by word. You see that it exists, not what it says.' },
  { title: 'Prove', body: 'Three timed questions on what the answer just taught. Seventy percent opens it.' },
  { title: 'Keep', body: 'The bars lift, you get a study sheet with flashcards, and your score moves up a tier.' },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how" className="border-y-2 border-ink bg-sunk py-20">
      <div className="shell">
        <h2 id="how" className="text-h1">
          Four steps, no shortcuts.
        </h2>
        <ol className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="border-t-4 border-ink pt-4">
              <span className="label">0{index + 1}</span>
              <h3 className="mt-2 text-h2">{step.title}</h3>
              <p className="mt-3 text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
