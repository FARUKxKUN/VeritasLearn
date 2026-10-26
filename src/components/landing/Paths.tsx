import { Star } from '@phosphor-icons/react';
import { CountUp } from '../ui/CountUp';
import { Reveal } from '../ui/Reveal';

export function Paths() {
  return (
    <section aria-labelledby="paths" className="shell py-28">
      <Reveal>
        <p className="label">Your choice</p>
        <h2 id="paths" className="mt-3 text-h1">
          Pick your path.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <Reveal>
          <div className="pop h-full bg-sunk p-8 md:p-10">
            <p className="label">Path one</p>
            <h3 className="mt-2 text-h2">Copy it</h3>
            <p className="mt-3 text-ink-2">The answer opens right away. You keep it, you earn nothing, and the log notes that you copied.</p>
            <p className="mt-8 flex items-baseline gap-2 font-display text-hero leading-none text-ink-3">
              <CountUp to={0} /> <span className="text-h3">XP</span>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="pop h-full rotate-1 bg-crimson p-8 text-white transition-transform hover:rotate-0 md:p-10">
            <p className="label !text-white">Path two</p>
            <h3 className="mt-2 flex items-center gap-2 text-h2">
              Earn it <Star size={28} weight="fill" className="text-sun" aria-hidden />
            </h3>
            <p className="mt-3">Beat the quiz and you get the answer, a study sheet and XP. Miss it and an easier round is worth 30.</p>
            <p className="mt-8 flex items-baseline gap-2 font-display text-hero leading-none">
              <CountUp to={50} prefix="+" /> <span className="text-h3">XP</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
