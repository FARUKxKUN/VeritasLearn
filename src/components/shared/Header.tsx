import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { getTierConfig } from '../../utils/tiers';
import { Stamp } from '../ui/Stamp';
import { cn } from '../../lib/utils';

const LINKS = [
  { to: '/learn', label: 'Tutor' },
  { to: '/dashboard', label: 'Progress' },
  { to: '/leaderboard', label: 'Leaderboard' },
] as const;

export function Header() {
  const { score, tier } = useApp();
  const config = getTierConfig(tier);
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="shell flex min-h-16 items-center justify-between gap-4">
        <Link to="/" className="flex min-h-11 items-center gap-2 font-display text-2xl leading-none">
          <img src="/logo.svg" alt="" width={32} height={32} />
          <span>
            Veritas<span className="text-crimson">Learn</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-4">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'inline-flex min-h-11 items-center border-b-4 px-2 text-small font-medium',
                  isActive ? 'border-crimson' : 'border-transparent text-ink-2 hover:text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <p className="hidden items-center gap-3 sm:flex">
          <Stamp tier={tier} size="sm" />
          <span className="leading-tight">
            <span className="tnum block font-mono text-small font-medium">{score.toLocaleString('en-US')}</span>
            <span className="label block">{config.name}</span>
          </span>
        </p>
      </div>
    </header>
  );
}
