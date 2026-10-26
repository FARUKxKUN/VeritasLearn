export enum TierType {
  SEEKER = 'SEEKER',
  EXPLORER = 'EXPLORER',
  SCHOLAR = 'SCHOLAR',
  MASTER = 'MASTER',
  LEGEND = 'LEGEND',
  TITAN = 'TITAN',
}

/** How a tier stamp is drawn. The six tiers read as a ladder of weight, not as six colors. */
export type StampStyle = 'outline' | 'solid' | 'crimson-outline' | 'crimson';

export interface TierConfig {
  name: string;
  numeral: string;
  minScore: number;
  maxScore: number;
  stamp: StampStyle;
}

export const TIER_CONFIG: Record<TierType, TierConfig> = {
  [TierType.SEEKER]: { name: 'Seeker', numeral: 'I', minScore: 0, maxScore: 499, stamp: 'outline' },
  [TierType.EXPLORER]: { name: 'Explorer', numeral: 'II', minScore: 500, maxScore: 1199, stamp: 'outline' },
  [TierType.SCHOLAR]: { name: 'Scholar', numeral: 'III', minScore: 1200, maxScore: 2499, stamp: 'solid' },
  [TierType.MASTER]: { name: 'Master', numeral: 'IV', minScore: 2500, maxScore: 4999, stamp: 'solid' },
  [TierType.LEGEND]: { name: 'Legend', numeral: 'V', minScore: 5000, maxScore: 9999, stamp: 'crimson-outline' },
  [TierType.TITAN]: { name: 'Titan', numeral: 'VI', minScore: 10000, maxScore: Infinity, stamp: 'crimson' },
};

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  locked: boolean;
  timestamp: Date;
  unlocked?: boolean;
  /** How the answer was opened: by passing the gate, or by choosing to copy it as it is. */
  unlockedWith?: 'quiz' | 'copy';
  humanizedContent?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  timeLimit: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface UserStats {
  questionsAnswered: number;
  quizPassRate: number;
  currentStreak: number;
  aiRelianceDecrease: number;
  totalStudyTime: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  university?: string;
  tier: TierType;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface Activity {
  id: string;
  type: 'quiz_pass' | 'quiz_fail' | 'copy' | 'question';
  description: string;
  points: number;
  timestamp: Date | string;
}
