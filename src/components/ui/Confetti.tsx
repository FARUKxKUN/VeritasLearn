import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';

const COLORS = ['#C1221F', '#FFC53D', '#168A4A', '#002F49', '#BFE4F3'] as const;
const COUNT = 36;

/** A one-shot burst. Mount it to fire it, change `burst` to fire it again. Renders nothing under reduced motion. */
export function Confetti({ burst }: { burst: number }) {
  const reduce = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2 + (i % 3) * 0.2;
        const distance = 180 + ((i * 53) % 220);
        return {
          id: `${burst}-${i}`,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 80,
          rotate: ((i * 97) % 720) - 360,
          color: COLORS[i % COLORS.length],
          round: i % 3 === 0,
        };
      }),
    [burst],
  );
  if (reduce || burst === 0) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className={piece.round ? 'absolute size-3 rounded-full' : 'absolute h-4 w-2 rounded-sm'}
          style={{ backgroundColor: piece.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: piece.x, y: piece.y + 260, opacity: 0, scale: 1, rotate: piece.rotate }}
          transition={{ duration: 1.5, ease: [0.16, 0.8, 0.3, 1] }}
        />
      ))}
    </div>
  );
}
