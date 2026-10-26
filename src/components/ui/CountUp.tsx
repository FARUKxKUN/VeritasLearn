import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** Counts from zero to the value the first time it is visible. */
export function CountUp({ to, prefix = '', suffix = '', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {inView || reduce ? value.toLocaleString('en-US') : 0}
      {suffix}
    </span>
  );
}
