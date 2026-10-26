import { ArrowRight } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'motion/react';
import { ButtonLink } from '../ui/Button';
import { MiniGate } from './MiniGate';
import { EASE_OUT_SOFT } from '../../lib/motion';

const LINES: ReadonlyArray<ReadonlyArray<string>> = [['Prove', 'you'], ['got', 'it', 'before'], ['you', 'USE', 'it.']];

export function Hero() {
  const reduce = useReducedMotion();
  let order = 0;
  return (
    <section className="shell grid gap-16 pb-28 pt-12 md:pt-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
      <div>
        <motion.p
          className="label"
          initial={reduce ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
        >
          AI tutor with a comprehension gate
        </motion.p>
        <h1 className="mt-6 text-hero">
          {LINES.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-hidden pb-[0.12em]">
              {line.map((word) => {
                const index = order++;
                const content = word === 'USE' ? <span className="redact-hero">use</span> : word;
                return (
                  <motion.span
                    key={`${lineIndex}-${word}`}
                    className="mr-[0.22em] inline-block"
                    initial={reduce ? false : { y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, delay: 0.15 + index * 0.07, ease: EASE_OUT_SOFT }}
                  >
                    {content}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-10 max-w-xl text-body text-ink-2"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE_OUT_SOFT }}
        >
          Ask a question and the answer arrives blacked out. A short quiz lifts the bars. Pass, and you keep the answer, a
          study sheet and points toward your tier.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: EASE_OUT_SOFT }}
        >
          <ButtonLink to="/learn" variant="crimson" className="group">
            Open the tutor <ArrowRight size={18} weight="bold" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </ButtonLink>
        </motion.div>
      </div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT_SOFT }}
      >
        <MiniGate />
      </motion.div>
    </section>
  );
}
