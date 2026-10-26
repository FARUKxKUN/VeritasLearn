import { ChatCircleDots, EyeSlash, Lightning, Trophy } from '@phosphor-icons/react';
import { Mascot } from '../ui/Mascot';
import { Reveal } from '../ui/Reveal';

const STEPS = [
  { title: 'Ask', body: 'Type any question. The tutor writes a full answer.', icon: ChatCircleDots, tone: 'bg-sky' },
  { title: 'Hidden', body: 'The answer arrives behind censor bars, word by word. You know it exists, not what it says.', icon: EyeSlash, tone: 'bg-sun' },
  { title: 'Beat the quiz', body: 'Three timed questions on what the answer just taught. Get 70 percent to open it.', icon: Lightning, tone: 'bg-crimson text-white' },
  { title: 'Level up', body: 'The bars lift, you get a study sheet with flashcards, and your XP climbs toward the next tier.', icon: Trophy, tone: 'bg-mint text-white' },
] as const;

export function HowItWorks() {
  return (
    <section aria-labelledby="how" className="border-y-2 border-ink bg-sun-tint py-28">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="label">How to play</p>
          <h2 id="how" className="mt-3 text-h1">
            Four moves. No shortcuts.
          </h2>
          <Mascot mood="think" size={140} className="float mt-8" />
        </Reveal>
        <ol className="grid gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal as="li" key={step.title} delay={index * 0.08}>
                <div className="pop hover-wiggle flex items-start gap-5 p-6">
                  <span className={`flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-ink shadow-[0_3px_0_0_var(--color-ink)] ${step.tone}`}>
                    <Icon size={30} weight="fill" aria-hidden />
                  </span>
                  <div>
                    <p className="label">Move {index + 1}</p>
                    <h3 className="text-h2">{step.title}</h3>
                    <p className="mt-2 text-ink-2">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
