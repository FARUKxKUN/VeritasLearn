
import { useApp } from '../../contexts/AppContext';
import { getTierConfig, getProgressToNextTier, getPointsToNextTier, getNextTier } from '../../utils/tiers';
import { Progress } from '../ui';
import { cn } from '../../lib/utils';

interface BadgeDisplayProps {
    size?: 'sm' | 'md' | 'lg';
    showProgress?: boolean;
}

export function BadgeDisplay({ size = 'md', showProgress = true }: BadgeDisplayProps) {
    const { score, tier } = useApp();
    const tierConfig = getTierConfig(tier);
    const nextTier = getNextTier(tier);
    const progress = getProgressToNextTier(score, tier);
    const pointsNeeded = getPointsToNextTier(score, tier);

    const sizes = {
        sm: 'w-16 h-16 text-2xl',
        md: 'w-24 h-24 text-4xl',
        lg: 'w-32 h-32 text-5xl',
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Badge */}
            <div
                className={cn(
                    'rounded-full flex items-center justify-center shadow-lg animate-float',
                    tierConfig.gradient,
                    sizes[size]
                )}
            >
                <span>{tierConfig.icon}</span>
            </div>

            {/* Tier name */}
            <div className="text-center">
                <h3 className={cn('font-bold', tierConfig.color)}>
                    {tierConfig.name}
                </h3>
                <p className="text-sm text-text-secondary">
                    {score.toLocaleString()} points
                </p>
            </div>

            {/* Progress to next tier */}
            {showProgress && nextTier && (
                <div className="w-full max-w-[200px]">
                    <Progress value={progress} className="mb-2" />
                    <p className="text-xs text-text-secondary text-center">
                        {pointsNeeded} points to {getTierConfig(nextTier).name}
                    </p>
                </div>
            )}
        </div>
    );
}
