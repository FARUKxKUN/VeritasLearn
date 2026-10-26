import { cn } from '../../lib/utils';

export type MascotMood = 'locked' | 'happy' | 'sad' | 'think';

interface MascotProps {
  mood?: MascotMood;
  size?: number;
  className?: string;
  /** Decorative by default. Pass a label when the mascot carries meaning on its own. */
  label?: string;
}

/**
 * Veri, the mascot. The censor bar is its whole personality: it sits over the eyes while an answer is
 * locked and slides up when you earn the answer.
 */
export function Mascot({ mood = 'locked', size = 120, className, label }: MascotProps) {
  const open = mood === 'happy';
  const mouth =
    mood === 'happy' ? 'M44 78 Q60 94 76 78' : mood === 'sad' ? 'M46 88 Q60 76 74 88' : mood === 'think' ? 'M48 84 H66' : 'M48 82 H72';
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('shrink-0 overflow-visible', className)}
    >
      <ellipse cx="60" cy="112" rx="30" ry="5" fill="#002F49" opacity="0.15" />
      <rect x="14" y="14" width="92" height="92" rx="34" fill="#C1221F" stroke="#002F49" strokeWidth="4" />
      <path d="M30 34 Q36 26 46 25" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.5" fill="none" />
      <g>
        <circle cx="44" cy="55" r="11" fill="#fff" stroke="#002F49" strokeWidth="3" />
        <circle cx="76" cy="55" r="11" fill="#fff" stroke="#002F49" strokeWidth="3" />
        <circle cx={open ? 46 : 44} cy={open ? 53 : 56} r="5" fill="#002F49" />
        <circle cx={open ? 78 : 76} cy={open ? 53 : 56} r="5" fill="#002F49" />
      </g>
      <path d={mouth} stroke="#002F49" strokeWidth="4" strokeLinecap="round" fill={open ? '#fff' : 'none'} />
      {mood === 'sad' ? <path d="M96 56 q4 8 0 12 q-4 -4 0 -12z" fill="#BFE4F3" stroke="#002F49" strokeWidth="2" /> : null}
      <g
        style={{
          transform: open ? 'translateY(-44px) rotate(-8deg)' : 'translateY(0)',
          transformOrigin: '60px 55px',
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <rect x="22" y="46" width="76" height="20" rx="6" fill="#002F49" />
        <rect x="28" y="52" width="14" height="3" rx="1.5" fill="#fff" opacity="0.25" />
      </g>
    </svg>
  );
}
