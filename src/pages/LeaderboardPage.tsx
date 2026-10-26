import { useMemo, useState } from 'react';
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

  return (
    <div className="min-h-dvh">
      <Header />
      <main id="main" className="page-in shell py-14 md:py-24">
        <p className="label">Leaderboard</p>
        <h1 className="mt-3 text-h1">Points you earned, not answers you copied.</h1>
        <p className="mt-4 max-w-xl text-ink-2">
          Invented learners and campuses. Your row uses your live score, so passing a gate moves you up.
        </p>
        <div className="mt-10">
          <Tabs tabs={TABS} value={scope} onChange={setScope} label="Leaderboard scope" />
          <ol className="divide-y divide-line">
            {rows.map((row, i) => (
              <Reveal
                as="li"
                delay={Math.min(i, 8) * 0.05}
                y={14}
                key={`${scope}-${row.name}`}
                className={cn('flex items-center gap-4 py-5', row.isCurrentUser && 'bg-crimson-tint px-3 -mx-3')}
              >
                <span className="tnum w-8 font-display text-h3">{row.rank}</span>
                <Stamp tier={row.tier} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{row.name}</span>
                  {row.university ? <span className="block truncate text-small text-ink-3">{row.university}</span> : null}
                </span>
                <span className="tnum font-mono">{row.score.toLocaleString('en-US')}</span>
              </Reveal>
            ))}
          </ol>
        </div>
        <PrototypeNote className="mt-12" />
      </main>
    </div>
  );
}
