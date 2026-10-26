import { useMemo, useState } from 'react';
import { Crown } from '@phosphor-icons/react';
import { Header } from '../components/shared/Header';
import { Stamp } from '../components/ui/Stamp';
import { Tabs } from '../components/ui/Tabs';
import { Reveal } from '../components/ui/Reveal';
import { PrototypeNote } from '../components/ui/PrototypeNote';
import { useApp } from '../contexts/AppContext';
import { MOCK_LEADERBOARD, MOCK_NATIONAL_LEADERBOARD } from '../utils/mockData';
import { getTier } from '../utils/tiers';
import { cn } from '../lib/utils';

type Scope = 'university' | 'national';

const TABS = [
  { id: 'university', label: 'University' },
  { id: 'national', label: 'National' },
] as const;

const PODIUM_ORDER = [1, 0, 2] as const;
// Indexed by rank slot (0 = first place): the winner stands on the tallest block.
const PODIUM_HEIGHT = ['h-44', 'h-32', 'h-24'] as const;
const PODIUM_TONE = ['bg-sun', 'bg-sky', 'bg-sunk'] as const;

export default function LeaderboardPage() {
  const { score } = useApp();
  const [scope, setScope] = useState<Scope>('university');

  const rows = useMemo(() => {
    const base = scope === 'university' ? MOCK_LEADERBOARD : MOCK_NATIONAL_LEADERBOARD;
    const withUser = base.some((entry) => entry.isCurrentUser)
      ? base.map((entry) => (entry.isCurrentUser ? { ...entry, score, tier: getTier(score) } : entry))
      : [...base, { rank: 0, name: 'You', university: 'Your campus', tier: getTier(score), score, avatar: 'YU', isCurrentUser: true }];
    return [...withUser].sort((a, b) => b.score - a.score).map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [scope, score]);

  const podium = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className="min-h-dvh">
      <Header />
      <main id="main" className="page-in shell py-12 md:py-20">
        <p className="label">Ranks</p>
        <h1 className="mt-3 max-w-3xl text-h1">Climb with XP you earned, not answers you copied.</h1>
        <p className="mt-4 max-w-xl text-ink-2">
          Invented players and campuses. Your row uses your live XP, so beating a quiz moves you up.
        </p>
        <div className="mt-10">
          <Tabs tabs={TABS} value={scope} onChange={setScope} label="Leaderboard scope" />
        </div>

        <ol className="mt-12 grid grid-cols-3 items-end gap-3 md:gap-6" aria-label="Top three">
          {PODIUM_ORDER.map((slot, position) => {
            const row = podium[slot];
            if (!row) return null;
            return (
              <Reveal as="li" key={`${scope}-${row.name}`} delay={position * 0.1} className="flex flex-col items-center text-center">
                {slot === 0 ? <Crown size={36} weight="fill" className="float mb-1 text-sun-deep" aria-hidden /> : null}
                <Stamp tier={row.tier} size="md" />
                <p className="mt-3 max-w-full truncate font-extrabold">{row.name}</p>
                <p className="tnum text-small font-bold text-ink-3">{row.score.toLocaleString('en-US')} XP</p>
                <div
                  className={cn(
                    'pop mt-3 flex w-full items-start justify-center rounded-b-none pt-4 font-display text-h1',
                    PODIUM_HEIGHT[slot],
                    PODIUM_TONE[slot],
                    row.isCurrentUser && 'ring-4 ring-crimson',
                  )}
                >
                  {row.rank}
                </div>
              </Reveal>
            );
          })}
        </ol>

        <ol className="mt-8 space-y-3">
          {rest.map((row, i) => (
            <Reveal
              as="li"
              delay={Math.min(i, 8) * 0.05}
              y={14}
              key={`${scope}-${row.name}`}
              className={cn('pop-sm flex min-h-16 items-center gap-4 px-5', row.isCurrentUser && 'bg-sun')}
            >
              <span className="tnum w-8 font-display text-h3">{row.rank}</span>
              <Stamp tier={row.tier} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-extrabold">{row.name}</span>
                {row.university ? <span className="block truncate text-small text-ink-3">{row.university}</span> : null}
              </span>
              <span className="tnum font-extrabold">{row.score.toLocaleString('en-US')} XP</span>
            </Reveal>
          ))}
        </ol>
        <PrototypeNote className="mt-12" />
      </main>
    </div>
  );
}
