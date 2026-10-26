import { Header } from '../components/shared/Header';
import { Stamp } from '../components/ui/Stamp';
import { Meter } from '../components/ui/Meter';
import { ButtonLink } from '../components/ui/Button';
import { PrototypeNote } from '../components/ui/PrototypeNote';
import { useApp } from '../contexts/AppContext';
import { TIER_CONFIG, TierType } from '../types';
import { getNextTier, getPointsToNextTier, getProgressToNextTier, getTierConfig } from '../utils/tiers';
import { cn } from '../lib/utils';

const TIER_ORDER = Object.values(TierType);

function isToday(value: Date | string): boolean {
  return new Date(value).toDateString() === new Date().toDateString();
}

export default function DashboardPage() {
  const { score, tier, stats, activities } = useApp();
  const config = getTierConfig(tier);
  const next = getNextTier(tier);
  const progress = getProgressToNextTier(score, tier);
  const todayPoints = activities.filter((a) => isToday(a.timestamp)).reduce((sum, a) => sum + a.points, 0);

  const figures = [
    { label: 'Questions answered', value: String(stats.questionsAnswered) },
    { label: 'Quiz pass rate', value: `${stats.quizPassRate}%` },
    { label: 'Day streak', value: String(stats.currentStreak) },
    { label: 'Minutes studied', value: String(stats.totalStudyTime) },
  ];

  return (
    <div className="min-h-dvh">
      <Header />
      <main id="main" className="shell py-10 md:py-16">
        <p className="label">Your progress</p>
        <div className="mt-4 grid gap-10 border-b-2 border-ink pb-12 md:grid-cols-[auto_1fr] md:items-end md:gap-14">
          <Stamp tier={tier} size="lg" />
          <div>
            <h1 className="text-h1">{config.name}</h1>
            <p className="tnum mt-2 font-mono text-h3">
              {score.toLocaleString('en-US')} points <span className="text-ink-3">| +{todayPoints} today</span>
            </p>
            <div className="mt-6 max-w-xl">
              <Meter value={progress} label="Progress to the next tier" tone="crimson" />
              <p className="mt-2 text-small text-ink-2">
                {next
                  ? `${getPointsToNextTier(score, tier).toLocaleString('en-US')} points to ${getTierConfig(next).name}.`
                  : 'Top tier reached.'}
              </p>
            </div>
          </div>
        </div>

        <section aria-labelledby="sample" className="mt-12">
          <h2 id="sample" className="label">
            Sample figures
          </h2>
          <dl className="mt-4 grid grid-cols-2 border-y-2 border-ink md:grid-cols-4">
            {figures.map((figure) => (
              <div key={figure.label} className="border-line py-5 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <dt className="label">{figure.label}</dt>
                <dd className="tnum mt-1 font-display text-h1">{figure.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-small text-ink-3">Demo figures. Only your points and the activity log below change as you use the prototype.</p>
        </section>

        <section aria-labelledby="ladder" className="mt-16">
          <h2 id="ladder" className="text-h2">
            The ladder
          </h2>
          <ol className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {TIER_ORDER.map((t) => {
              const reached = score >= TIER_CONFIG[t].minScore;
              return (
                <li key={t} className={cn('flex flex-col items-start gap-3', !reached && 'opacity-80')}>
                  <Stamp tier={t} muted={!reached} />
                  <div>
                    <p className="font-display text-h3">{TIER_CONFIG[t].name}</p>
                    <p className="tnum label">{TIER_CONFIG[t].minScore.toLocaleString('en-US')}+</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-labelledby="log" className="mt-16">
          <h2 id="log" className="text-h2">
            Recent activity
          </h2>
          {activities.length === 0 ? (
            <div className="mt-6 border-2 border-dashed border-line p-8">
              <p className="text-ink-2">Nothing yet. Ask the tutor something and pass a gate.</p>
              <ButtonLink to="/learn" variant="crimson" className="mt-4">
                Open the tutor
              </ButtonLink>
            </div>
          ) : (
            <ul className="mt-6 divide-y divide-line border-y-2 border-ink">
              {activities.map((activity) => (
                <li key={activity.id} className="flex items-center justify-between gap-4 py-4">
                  <span>{activity.description}</span>
                  <span className={cn('tnum shrink-0 font-mono', activity.points > 0 ? 'text-crimson' : 'text-ink-3')}>
                    {activity.points > 0 ? `+${activity.points}` : '0'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <PrototypeNote className="mt-16" />
      </main>
    </div>
  );
}
