import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { title: 'Ask', body: 'Type any question. The tutor writes a full answer.' },
  { title: 'Redact', body: 'The answer is hidden word by word. You see that it exists, not what it says.' },
  { title: 'Prove', body: 'Three timed questions on what the answer just taught. Seventy percent opens it.' },
  { title: 'Keep', body: 'The bars lift, you get a study sheet with flashcards, and your score moves up a tier.' },
] as const;

/**
 * On desktop the section pins and the four steps play in order as you scroll: a crimson line fills each
 * rule, the title rises out of a mask, and a bar sweeps over it and lifts. Static on phones and under
 * reduced motion.
 */
export function HowItWorks() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]', element);
      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: { trigger: element, start: 'top top', end: '+=1500', pin: true, scrub: 0.7, anticipatePin: 1 },
      });

      steps.forEach((step, index) => {
        const at = index * 1;
        const fill = step.querySelector('[data-fill]');
        const num = step.querySelector('[data-num]');
        const title = step.querySelector('[data-title]');
        const bar = step.querySelector('[data-bar]');
        const body = step.querySelector('[data-body]');
        gsap.set([num, body], { opacity: 0, y: 18 });
        gsap.set(title, { yPercent: 110 });
        gsap.set(fill, { opacity: 1, scaleX: 0, transformOrigin: 'left center' });
        gsap.set(bar, { opacity: 1, scaleX: 0, transformOrigin: 'left center' });

        timeline
          .to(fill, { scaleX: 1, duration: 0.8 }, at)
          .to(num, { opacity: 1, y: 0, duration: 0.4 }, at + 0.1)
          .to(title, { yPercent: 0, duration: 0.5 }, at + 0.2)
          .to(bar, { scaleX: 1, duration: 0.25, ease: 'power3.in' }, at + 0.55)
          .to(bar, { scaleX: 0, transformOrigin: 'right center', duration: 0.35, ease: 'power3.out' }, at + 0.8)
          .to(body, { opacity: 1, y: 0, duration: 0.5 }, at + 0.55);
      });
      timeline.to({}, { duration: 0.6 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="how" className="border-y-2 border-ink bg-sunk py-28 lg:flex lg:min-h-dvh lg:items-center lg:py-0">
      <div className="shell w-full">
        <h2 id="how" className="text-h1">
          Four steps, no shortcuts.
        </h2>
        <ol className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} data-step>
              <div className="h-1 bg-ink">
                <div data-fill className="h-full bg-crimson opacity-0" />
              </div>
              <span data-num className="label mt-5 block">
                0{index + 1}
              </span>
              <div className="relative mt-2 overflow-hidden pb-1">
                <h3 data-title className="text-h2">
                  {step.title}
                </h3>
                <span aria-hidden data-bar className="absolute inset-y-1 left-0 right-0 bg-crimson opacity-0" />
              </div>
              <p data-body className="mt-4 text-ink-2">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
