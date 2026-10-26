import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useApp } from '../../contexts/AppContext';
import { SPRING_LIVELY } from '../../lib/motion';

/** The one place bounce is allowed: a stamp-like "+50" when a gate is passed. */
export function ScorePopup() {
  const { scorePopup } = useApp();
  const reduce = useReducedMotion();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-50 flex justify-center">
      <AnimatePresence>
        {scorePopup ? (
          <motion.p
            key="popup"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            exit={{ opacity: 0, y: -16 }}
            transition={SPRING_LIVELY}
            className="rounded-full border-2 border-ink bg-sun px-6 py-2 font-display text-3xl text-ink shadow-[0_4px_0_0_var(--color-ink)]"
          >
            +{scorePopup.points} XP
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
