
import { useApp } from '../../contexts/AppContext';
import { TierType } from '../../types';
import { Card, CardContent, Progress } from '../ui';
import { getTierConfig, getProgressToNextTier, getPointsToNextTier, getNextTier } from '../../utils/tiers';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

export function TierCard() {
    const { score, tier } = useApp();
    const tierConfig = getTierConfig(tier);
    const nextTier = getNextTier(tier);
    const progress = getProgressToNextTier(score, tier);
    const pointsNeeded = getPointsToNextTier(score, tier);

    const allTiers = Object.values(TierType);
    const currentTierIndex = allTiers.indexOf(tier);

    return (
        <Card className="overflow-hidden">
            {/* Header gradient */}
            <div className={cn('h-2', tierConfig.gradient)} />

            <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-text-primary">Your Journey</h3>
                        <p className="text-sm text-text-secondary">Current tier: {tierConfig.name}</p>
                    </div>
                    <div className={cn(
                        'w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg',
                        tierConfig.gradient
                    )}>
                        {tierConfig.icon}
                    </div>
                </div>

                {/* Progress to next tier */}
                {nextTier && (
                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className={getTierConfig(tier).color}>
                                {tierConfig.icon} {tierConfig.name}
                            </span>
                            <span className={getTierConfig(nextTier).color}>
                                {getTierConfig(nextTier).icon} {getTierConfig(nextTier).name}
                            </span>
                        </div>
                        <Progress value={progress} showLabel />
                        <p className="text-sm text-text-secondary mt-2 text-center">
                            <span className="font-semibold">{pointsNeeded}</span> points needed
                        </p>
                    </div>
                )}

                {/* Tier ladder */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-text-secondary mb-3">All Tiers</p>
                    {allTiers.map((t, index) => {
                        const config = getTierConfig(t);
                        const isCompleted = index < currentTierIndex;
                        const isCurrent = t === tier;

                        return (
                            <div
                                key={t}
                                className={cn(
                                    'flex items-center gap-3 p-2 rounded-lg transition-colors',
                                    isCurrent && 'bg-primary-50',
                                    isCompleted && 'opacity-60'
                                )}
                            >
                                <div className={cn(
                                    'w-8 h-8 rounded-full flex items-center justify-center text-sm',
                                    isCompleted || isCurrent ? config.gradient : 'bg-gray-200'
                                )}>
                                    {isCompleted ? <Check size={14} className="text-white" /> : config.icon}
                                </div>
                                <div className="flex-1">
                                    <p className={cn(
                                        'text-sm font-medium',
                                        isCurrent ? 'text-primary-600' : 'text-text-primary'
                                    )}>
                                        {config.name}
                                    </p>
                                    <p className="text-xs text-text-secondary">
                                        {config.minScore.toLocaleString()}+ points
                                    </p>
                                </div>
                                {isCurrent && (
                                    <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded-full">
                                        Current
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
