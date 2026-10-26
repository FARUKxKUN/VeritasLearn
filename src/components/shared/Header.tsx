import { NavLink, Link } from 'react-router-dom';
import { Fire, Star } from '@phosphor-icons/react';
import { useApp } from '../../contexts/AppContext';
import { getTierConfig } from '../../utils/tiers';
import { Stamp } from '../ui/Stamp';
import { cn } from '../../lib/utils';

const LINKS = [
  { to: '/learn', label: 'Play' },
  { to: '/dashboard', label: 'Progress' },
  { to: '/leaderboard', label: 'Ranks' },
] as const;

export function Header() {
  const { score, tier, stats } = useApp();
  const config = getTierConfig(tier);
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-surface/95">
      <div className="shell flex min-h-[4.5rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
        <Link to="/" className="flex min-h-11 items-center gap-2 font-display text-2xl leading-none">
          <img src="/logo.svg" alt="" width={38} height={38} />
          <span>
            Veritas<span className="text-crimson">Learn</span>
          </span>
        </Link>
        <nav aria-label="Main" className="order-last flex w-full justify-center gap-2 sm:order-none sm:w-auto">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'inline-flex min-h-11 items-center rounded-full border-2 px-5 font-extrabold transition-colors',
                  isActive ? 'border-ink bg-sun' : 'border-transparent text-ink-2 hover:bg-sunk',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <p className="flex items-center gap-2">
          <span className="pop-sm flex min-h-10 items-center gap-1 px-3 font-extrabold" title="Day streak (sample data)">
            <Fire size={20} weight="fill" className="text-crimson" aria-hidden />
            <span className="tnum">{stats.currentStreak}</span>
            <span className="sr-only">day streak</span>
          </span>
          <span className="pop-sm flex min-h-10 items-center gap-1 px-3 font-extrabold">
            <Star size={20} weight="fill" className="text-sun-deep" aria-hidden />
            <span className="tnum">{score.toLocaleString('en-US')}</span>
            <span className="sr-only">XP</span>
          </span>
          <Stamp tier={tier} size="sm" className="max-sm:hidden" />
          <span className="sr-only">{config.name}</span>
        </p>
      </div>
    </header>
  );
}
