import type { Transition } from 'motion/react';

/** Springs are critically damped by default. Bounce is reserved for the score popup. */
export const SPRING: Transition = { type: 'spring', stiffness: 420, damping: 40, mass: 1 };
export const SPRING_SOFT: Transition = { type: 'spring', stiffness: 260, damping: 32, mass: 1 };
export const SPRING_LIVELY: Transition = { type: 'spring', stiffness: 320, damping: 20, mass: 1 };
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;
