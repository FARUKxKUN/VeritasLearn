import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIER_CONFIG, TierType } from '../../types';
import { Stamp } from '../ui/Stamp';

gsap.registerPlugin(ScrollTrigger);

const TIERS = Object.values(TierType);

/** The quest path: six medals on a winding trail. They pop in one by one as you scroll. */
export function TierLadder() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const nodes = element.querySelectorAll('[data-node]');
      gsap.set(nodes, { opacity: 0.15, scale: 0.6, y: 30 });
      gsap.to(nodes, {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.2,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: element, start: 'top 70%', end: 'center 55%', scrub: 0.8 },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="tiers" className="overflow-hidden border-y-2 border-ink bg-ink py-28 text-paper">
      <div className="shell">
        <p className="label !text-sun">The quest</p>
        <h2 id="tiers" className="mt-3 text-h1">
          Six tiers to climb.
        </h2>
        <p className="mt-4 max-w-xl text-paper/80">XP comes only from beaten quizzes. Copying never moves you up.</p>
        <ol className="relative mt-20 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
          <span
            aria-hidden
            className="absolute left-[8%] right-[8%] top-1/2 hidden border-t-4 border-dashed border-paper/25 lg:block"
          />
          {TIERS.map((tier, index) => (
            <li
              key={tier}
              data-node
              className={`relative flex flex-col items-center gap-4 text-center ${index % 2 === 1 ? 'lg:mt-16' : 'lg:mb-16'}`}
            >
              <Stamp tier={tier} size="md" className="!shadow-[0_4px_0_0_var(--color-sun)]" />
              <div>
                <p className="font-display text-h3">{TIER_CONFIG[tier].name}</p>
                <p className="tnum font-bold text-paper/70">{TIER_CONFIG[tier].minScore.toLocaleString('en-US')}+ XP</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
