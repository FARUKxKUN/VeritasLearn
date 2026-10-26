import { Reveal } from '../ui/Reveal';

const STEPS = [
  { title: 'Ask', body: 'Type any question. The tutor writes a full answer.' },
  { title: 'Redact', body: 'The answer is hidden word by word. You see that it exists, not what it says.' },
  { title: 'Prove', body: 'Three timed questions on what the answer just taught. Seventy percent opens it.' },
  { title: 'Keep', body: 'The bars lift, you get a study sheet with flashcards, and your score moves up a tier.' },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how" className="border-y-2 border-ink bg-sunk py-28">
      <div className="shell">
        <Reveal>
          <h2 id="how" className="text-h1">
            Four steps, no shortcuts.
          </h2>
        </Reveal>
        <ol className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.1} className="group border-t-4 border-ink pt-5 transition-colors hover:border-crimson">
              <span className="label">0{index + 1}</span>
              <h3 className="mt-2 text-h2">{step.title}</h3>
              <p className="mt-4 text-ink-2">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
