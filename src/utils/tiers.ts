import { TierType, TIER_CONFIG, type TierConfig } from '../types';

export function getTier(score: number): TierType {
  if (score >= 10000) return TierType.TITAN;
  if (score >= 5000) return TierType.LEGEND;
  if (score >= 2500) return TierType.MASTER;
  if (score >= 1200) return TierType.SCHOLAR;
  if (score >= 500) return TierType.EXPLORER;
  return TierType.SEEKER;
}

export function getTierConfig(tier: TierType): TierConfig {
  return TIER_CONFIG[tier];
}

export function getNextTier(currentTier: TierType): TierType | null {
  const tiers = Object.values(TierType);
  const index = tiers.indexOf(currentTier);
  return index < tiers.length - 1 ? tiers[index + 1] : null;
}

/** Percentage (0-100) of the way from the current tier floor to the next tier floor. */
export function getProgressToNextTier(score: number, currentTier: TierType): number {
  const next = getNextTier(currentTier);
  if (!next) return 100;
  const from = getTierConfig(currentTier).minScore;
  const to = getTierConfig(next).minScore;
  return Math.min(100, Math.round(((score - from) / (to - from)) * 100));
}

export function getPointsToNextTier(score: number, currentTier: TierType): number {
  const next = getNextTier(currentTier);
  return next ? getTierConfig(next).minScore - score : 0;
}
