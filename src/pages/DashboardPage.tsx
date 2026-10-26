import { CheckCircle, Circle, Fire, Lightning, Target, Timer } from '@phosphor-icons/react';
import { Header } from '../components/shared/Header';
import { Stamp } from '../components/ui/Stamp';
import { Meter } from '../components/ui/Meter';
import { Mascot } from '../components/ui/Mascot';
import { ButtonLink } from '../components/ui/Button';
import { CountUp } from '../components/ui/CountUp';
import { Reveal } from '../components/ui/Reveal';
import { PrototypeNote } from '../components/ui/PrototypeNote';
import { useApp } from '../contexts/AppContext';
import { TIER_CONFIG, TierType } from '../types';
import { getNextTier, getPointsToNextTier, getProgressToNextTier, getTierConfig } from '../utils/tiers';
import { cn } from '../lib/utils';

const TIER_ORDER = Object.values(TierType);
const DAILY_GOAL = 100;

function isToday(value: Date | string): boolean {
  return new Date(value).toDateString() === new Date().toDateString();
}

export default function DashboardPage() {
  const { score, tier, stats, activities } = useApp();
  const config = getTierConfig(tier);
  const next = getNextTier(tier);
  const progress = getProgressToNextTier(score, tier);
  const todayEntries = activities.filter((a) => isToday(a.timestamp));
  const todayPoints = todayEntries.reduce((sum, a) => sum + a.points, 0);
  const passedToday = todayEntries.some((a) => a.points > 0);

  const quests = [
    { label: 'Beat one quiz today', done: passedToday },
    { label: `Earn ${DAILY_GOAL} XP today`, done: todayPoints >= DAILY_GOAL, detail: `${Math.min(todayPoints, DAILY_GOAL)}/${DAILY_GOAL}` },
  ];

  const figures = [
    { label: 'Questions answered', num: stats.questionsAnswered, suffix: '', icon: Target, tone: 'bg-sky' },
    { label: 'Quiz pass rate', num: stats.quizPassRate, suffix: '%', icon: Lightning, tone: 'bg-sun' },
    { label: 'Day streak', num: stats.currentStreak, suffix: '', icon: Fire, tone: 'bg-crimson-tint' },
    { label: 'Minutes studied', num: stats.totalStudyTime, suffix: '', icon: Timer, tone: 'bg-mint-tint' },
  ];

  return (
    <div className="min-h-dvh">
      <Header />
      <main id="main" className="page-in shell py-12 md:py-20">
        <section className="pop grid gap-8 bg-sun-tint p-7 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:p-10">
          <Stamp tier={tier} size="lg" />
          <div>
            <p className="label">Your level</p>
            <h1 className="text-h1">{config.name}</h1>
            <p className="tnum mt-1 text-h3 font-extrabold">
              <CountUp to={score} /> XP <span className="text-ink-3">| +{todayPoints} today</span>
            </p>
            <div className="mt-5 max-w-xl">
              <Meter value={progress} label="Progress to the next tier" tone="crimson" />
              <p className="mt-2 font-bold text-ink-2">
                {next
                  ? `${getPointsToNextTier(score, tier).toLocaleString('en-US')} XP to ${getTierConfig(next).name}`
                  : 'Top tier reached!'}
              </p>
            </div>
          </div>
          <Mascot mood="happy" size={150} className="float hidden md:block" />
        </section>

        <section aria-labelledby="quests" className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 id="quests" className="text-h2">
              Daily quests
            </h2>
            <ul className="mt-5 space-y-3">
              {quests.map((quest) => (
                <li key={quest.label} className={cn('pop-sm flex min-h-14 items-center gap-3 px-5 font-bold', quest.done && 'bg-mint-tint')}>
                  {quest.done ? (
                    <CheckCircle size={28} weight="fill" className="text-mint" aria-label="Done" />
                  ) : (
                    <Circle size={28} weight="bold" className="text-ink-3" aria-label="Not done yet" />
                  )}
                  <span className="flex-1">{quest.label}</span>
                  {quest.detail ? <span className="tnum text-ink-3">{quest.detail}</span> : null}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h2">Sample stats</h2>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              {figures.map((figure) => {
                const Icon = figure.icon;
                return (
                  <div key={figure.label} className={cn('pop p-5', figure.tone)}>
                    <Icon size={26} weight="fill" aria-hidden />
                    <dd className="tnum mt-2 font-display text-h1 leading-none">
                      <CountUp to={figure.num} suffix={figure.suffix} />
                    </dd>
                    <dt className="mt-1 font-bold text-ink-2">{figure.label}</dt>
                  </div>
                );
              })}
            </dl>
            <p className="mt-4 text-small text-ink-3">Demo numbers. Only your XP and the activity log change as you play.</p>
          </div>
        </section>

        <section aria-labelledby="ladder" className="mt-20">
          <h2 id="ladder" className="text-h2">
            The ladder
          </h2>
          <ol className="mt-8 grid grid-cols-3 gap-x-4 gap-y-10 sm:grid-cols-6">
            {TIER_ORDER.map((t, index) => {
              const reached = score >= TIER_CONFIG[t].minScore;
              return (
                <Reveal as="li" key={t} delay={index * 0.08} className="flex flex-col items-center gap-3 text-center">
                  <Stamp tier={t} muted={!reached} />
                  <div>
                    <p className="font-display text-h3">{TIER_CONFIG[t].name}</p>
                    <p className="tnum text-small font-bold text-ink-3">{TIER_CONFIG[t].minScore.toLocaleString('en-US')}+ XP</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </section>

        <section aria-labelledby="log" className="mt-20">
          <h2 id="log" className="text-h2">
            Recent activity
          </h2>
          {activities.length === 0 ? (
            <div className="pop mt-6 flex flex-col items-start gap-5 border-dashed p-8 sm:flex-row sm:items-center">
              <Mascot mood="locked" size={80} />
              <div>
                <p className="font-bold text-ink-2">Nothing yet. Ask the tutor something and beat a quiz.</p>
                <ButtonLink to="/learn" variant="crimson" className="mt-4">
                  Start playing
                </ButtonLink>
              </div>
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              {activities.map((activity) => (
                <li key={activity.id} className="pop-sm flex min-h-14 items-center justify-between gap-4 px-5 font-bold">
                  <span>{activity.description}</span>
                  <span
                    className={cn(
                      'tnum shrink-0 rounded-full px-3 py-1 font-extrabold',
                      activity.points > 0 ? 'bg-sun' : 'bg-sunk text-ink-3',
                    )}
                  >
                    {activity.points > 0 ? `+${activity.points} XP` : '0 XP'}
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
