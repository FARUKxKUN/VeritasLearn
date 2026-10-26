import type { Activity } from '../types';

const KEYS = {
  score: 'veritaslearn_user_score',
  activities: 'veritaslearn_activities',
} as const;

/** The demo learner starts at 1850 points, in the Scholar tier. */
export const DEMO_START_SCORE = 1850;

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked. The prototype then keeps state in memory only.
  }
}

export function saveScore(score: number): void {
  write(KEYS.score, String(score));
}

export function loadScore(): number {
  const saved = read(KEYS.score);
  const parsed = saved ? Number.parseInt(saved, 10) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : DEMO_START_SCORE;
}

export function saveActivities(activities: Activity[]): void {
  write(KEYS.activities, JSON.stringify(activities));
}

export function loadActivities(): Activity[] {
  const saved = read(KEYS.activities);
  if (!saved) return [];
  try {
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as Activity[]) : [];
  } catch {
    return [];
  }
}

export function clearAllData(): void {
  try {
    Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
  } catch {
    // Nothing to clear when storage is unavailable.
  }
}
