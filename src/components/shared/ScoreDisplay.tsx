
import { useApp } from '../../contexts/AppContext';
import { getTierConfig, getPointsToNextTier, getNextTier } from '../../utils/tiers';
import { Trophy } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ScoreDisplay() {
    const { score, tier, scorePopup } = useApp();
    const tierConfig = getTierConfig(tier);
    const nextTier = getNextTier(tier);
    const pointsNeeded = getPointsToNextTier(score, tier);

    return (
        <div className="relative flex items-center gap-3">
            {/* Score popup animation */}
            {scorePopup && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 score-popup">
                    <span className="text-success-500 font-bold text-lg">
                        +{scorePopup.points}
                    </span>
                </div>
            )}

            {/* Tier badge */}
            <div
                className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full text-white text-lg',
                    tierConfig.gradient
                )}
                title={`${tierConfig.name} Tier`}
            >
                {tierConfig.icon}
            </div>

            {/* Score and progress */}
            <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-yellow-500" />
                    <span className="font-bold text-text-primary">{score.toLocaleString()}</span>
                </div>
                {nextTier && (
                    <div className="text-xs text-text-secondary">
                        {pointsNeeded} to {getTierConfig(nextTier).name}
                    </div>
                )}
            </div>
        </div>
    );
}
