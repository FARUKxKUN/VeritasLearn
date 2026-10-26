import { ArrowRight, Fire, Star } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { ButtonLink } from '../ui/Button';
import { MiniGate } from './MiniGate';
import { EASE_OUT_SOFT } from '../../lib/motion';

const LINES: ReadonlyArray<ReadonlyArray<string>> = [['Beat', 'the', 'quiz.'], ['Unlock', 'the', 'ANSWER'], ['Level', 'up.']];

export function Hero() {
  const reduce = useReducedMotion();
  let order = 0;
  return (
    <section className="shell relative grid gap-20 pb-28 pt-12 md:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
      <div>
        <motion.p
          className="pop-sm inline-flex min-h-10 items-center gap-2 px-4 font-extrabold"
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        >
          <Star size={18} weight="fill" className="text-sun-deep" aria-hidden /> The AI tutor that makes you earn it
        </motion.p>
        <h1 className="mt-6 text-hero">
          {LINES.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-hidden pb-[0.18em]">
              {line.map((word) => {
                const index = order++;
                const content = word === 'ANSWER' ? <span className="redact-hero">answer.</span> : word;
                return (
                  <motion.span
                    key={`${lineIndex}-${word}`}
                    className="mr-[0.22em] inline-block"
                    initial={reduce ? false : { y: '110%', rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + index * 0.07, ease: EASE_OUT_SOFT }}
                  >
                    {content}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-8 max-w-xl text-body text-ink-2"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE_OUT_SOFT }}
        >
          Ask anything and the answer arrives hidden behind censor bars. Win a short quiz to lift them, earn XP, keep your
          streak and climb six tiers.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: EASE_OUT_SOFT }}
        >
          <ButtonLink to="/learn" variant="crimson" className="group min-h-14 px-8 text-lg">
            Start playing{' '}
            <ArrowRight size={20} weight="bold" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </ButtonLink>
          <p className="flex items-center gap-2 font-extrabold text-ink-2">
            <Fire size={22} weight="fill" className="text-crimson" aria-hidden /> No signup in the prototype
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.4 }}
      >
        <MiniGate />
      </motion.div>
    </section>
  );
}
