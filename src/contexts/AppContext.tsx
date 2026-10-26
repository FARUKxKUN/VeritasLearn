import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Activity, Message, TierType, UserStats } from '../types';
import { getTier } from '../utils/tiers';
import { loadActivities, loadScore, saveActivities, saveScore } from '../utils/storage';
import { DEMO_STATS } from '../utils/mockData';

const ACTIVITY_LIMIT = 20;
const POPUP_MS = 2200;

interface AppContextType {
  score: number;
  tier: TierType;
  stats: UserStats;
  activities: Activity[];
  messages: Message[];
  scorePopup: { points: number } | null;
  addScore: (points: number, reason: string) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  clearMessages: () => void;
  updateStats: (updates: Partial<UserStats>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState<number>(loadScore);
  const [stats, setStats] = useState<UserStats>(DEMO_STATS);
  const [activities, setActivities] = useState<Activity[]>(loadActivities);
  const [messages, setMessages] = useState<Message[]>([]);
  const [scorePopup, setScorePopup] = useState<{ points: number } | null>(null);
  const popupTimer = useRef<number | undefined>(undefined);

  const tier = useMemo(() => getTier(score), [score]);

  useEffect(() => saveScore(score), [score]);
  useEffect(() => saveActivities(activities), [activities]);
  useEffect(() => () => window.clearTimeout(popupTimer.current), []);

  const addScore = useCallback((points: number, reason: string) => {
    setScore((prev) => prev + points);
    const entry: Activity = {
      id: Date.now().toString(),
      type: points > 0 ? 'quiz_pass' : 'copy',
      description: reason,
      points,
      timestamp: new Date(),
    };
    setActivities((prev) => [entry, ...prev].slice(0, ACTIVITY_LIMIT));
    if (points > 0) {
      window.clearTimeout(popupTimer.current);
      setScorePopup({ points });
      popupTimer.current = window.setTimeout(() => setScorePopup(null), POPUP_MS);
    }
  }, []);

  const addMessage = useCallback((message: Message) => setMessages((prev) => [...prev, message]), []);
  const updateMessage = useCallback(
    (id: string, updates: Partial<Message>) =>
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m))),
    [],
  );
  const clearMessages = useCallback(() => setMessages([]), []);
  const updateStats = useCallback((updates: Partial<UserStats>) => setStats((prev) => ({ ...prev, ...updates })), []);

  const value = useMemo<AppContextType>(
    () => ({ score, tier, stats, activities, messages, scorePopup, addScore, addMessage, updateMessage, clearMessages, updateStats }),
    [score, tier, stats, activities, messages, scorePopup, addScore, addMessage, updateMessage, clearMessages, updateStats],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
