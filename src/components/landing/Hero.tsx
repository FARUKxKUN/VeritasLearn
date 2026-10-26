import { ArrowRight } from '@phosphor-icons/react';
import { ButtonLink } from '../ui/Button';
import { MiniGate } from './MiniGate';

export function Hero() {
  return (
    <section className="shell grid gap-12 pb-20 pt-10 md:pt-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
      <div>
        <p className="label">AI tutor with a comprehension gate</p>
        <h1 className="mt-5 text-hero">
          Prove you got it before you <span className="redact-hero">use</span> it.
        </h1>
        <p className="mt-8 max-w-xl text-body text-ink-2">
          Ask a question and the answer arrives blacked out. A short quiz lifts the bars. Pass, and you keep the answer, a
          study sheet and points toward your tier.
        </p>
        <div className="mt-8">
          <ButtonLink to="/learn" variant="crimson">
            Open the tutor <ArrowRight size={18} weight="bold" aria-hidden />
          </ButtonLink>
        </div>
      </div>
      <MiniGate />
    </section>
  );
}
