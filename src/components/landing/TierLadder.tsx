import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIER_CONFIG, TierType } from '../../types';
import { Stamp } from '../ui/Stamp';

gsap.registerPlugin(ScrollTrigger);

const TIERS = Object.values(TierType);

/** The ladder fills in as you scroll, one stamp per tier. Static when reduced motion is on. */
export function TierLadder() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const stamps = element.querySelectorAll('[data-stamp]');
      gsap.set(stamps, { opacity: 0.18, y: 24 });
      gsap.to(stamps, {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        ease: 'none',
        scrollTrigger: { trigger: element, start: 'top 75%', end: 'bottom 70%', scrub: 0.6 },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="tiers" className="border-t-2 border-ink bg-ink py-20 text-paper">
      <div className="shell">
        <h2 id="tiers" className="text-h1">
          Six tiers, earned.
        </h2>
        <p className="mt-4 max-w-xl text-paper/80">Points come only from passed gates. Copying never moves you.</p>
        <ol className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {TIERS.map((tier) => (
            <li key={tier} data-stamp className="flex flex-col items-start gap-4">
              <span className="rounded-full bg-paper p-1">
                <Stamp tier={tier} size="md" />
              </span>
              <div>
                <p className="font-display text-h3">{TIER_CONFIG[tier].name}</p>
                <p className="tnum font-mono text-label text-paper/70">{TIER_CONFIG[tier].minScore.toLocaleString('en-US')}+ pts</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
