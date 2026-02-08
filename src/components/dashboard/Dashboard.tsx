
import { useApp } from '../../contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle, Progress } from '../ui';
import { BadgeDisplay } from '../profile/BadgeDisplay';
import { TierCard } from '../profile/TierCard';
import { getTierConfig, getProgressToNextTier, getNextTier, getPointsToNextTier } from '../../utils/tiers';
import {
    Trophy,
    MessageSquare,
    Target,
    Flame,
    TrendingDown,
    Clock,
    ArrowUp,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import { cn } from '../../lib/utils';

const statCards = [
    { key: 'questionsAnswered', label: 'Questions Answered', icon: MessageSquare, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { key: 'quizPassRate', label: 'Quiz Pass Rate', icon: Target, color: 'text-green-500', bgColor: 'bg-green-50', suffix: '%' },
    { key: 'currentStreak', label: 'Day Streak', icon: Flame, color: 'text-orange-500', bgColor: 'bg-orange-50', suffix: ' days' },
    { key: 'aiRelianceDecrease', label: 'AI Reliance ↓', icon: TrendingDown, color: 'text-purple-500', bgColor: 'bg-purple-50', suffix: '%' },
];

export function Dashboard() {
    const { score, tier, stats, activities } = useApp();
    const tierConfig = getTierConfig(tier);
    const nextTier = getNextTier(tier);
    const progress = getProgressToNextTier(score, tier);
    const pointsNeeded = getPointsToNextTier(score, tier);

    return (
        <div className="space-y-6">
            {/* Header with score */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Main score card */}
                <Card className="md:col-span-2 overflow-hidden">
                    <div className={cn('h-2', tierConfig.gradient)} />
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-text-secondary mb-1">Independence Score</p>
                                <div className="flex items-baseline gap-3">
                                    <h1 className="text-5xl font-bold gradient-text">
                                        {score.toLocaleString()}
                                    </h1>
                                    <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                                        <ArrowUp size={16} />
                                        <span>+50 today</span>
                                    </div>
                                </div>
                            </div>
                            <BadgeDisplay size="lg" showProgress={false} />
                        </div>

                        {/* Progress to next tier */}
                        {nextTier && (
                            <div className="mt-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-text-secondary">Progress to {getTierConfig(nextTier).name}</span>
                                    <span className="font-medium">{progress}%</span>
                                </div>
                                <Progress value={progress} />
                                <p className="text-xs text-text-secondary mt-2">
                                    {pointsNeeded} more points needed
                                </p>
                            </div>
                        )}

                        {/* Quick action */}
                        <div className="mt-6">
                            <Link to="/learn">
                                <Button className="w-full md:w-auto group">
                                    Start Learning
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Tier card */}
                <TierCard />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statCards.map(({ key, label, icon: Icon, color, bgColor, suffix = '' }) => (
                    <Card key={key} className="p-4">
                        <div className="flex items-start gap-3">
                            <div className={cn('p-2 rounded-lg', bgColor)}>
                                <Icon size={20} className={color} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-text-primary">
                                    {stats[key as keyof typeof stats]}{suffix}
                                </p>
                                <p className="text-xs text-text-secondary">{label}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock size={20} className="text-text-secondary" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {activities.length === 0 ? (
                        <p className="text-text-secondary text-center py-8">
                            No activity yet. Start learning to see your progress!
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {activities.slice(0, 5).map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            'w-8 h-8 rounded-full flex items-center justify-center',
                                            activity.points > 0 ? 'bg-green-100' : 'bg-gray-100'
                                        )}>
                                            {activity.points > 0 ? (
                                                <Trophy size={16} className="text-green-600" />
                                            ) : (
                                                <MessageSquare size={16} className="text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-text-primary">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-text-secondary">
                                                {new Date(activity.timestamp).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    {activity.points !== 0 && (
                                        <span className={cn(
                                            'text-sm font-bold',
                                            activity.points > 0 ? 'text-green-600' : 'text-gray-500'
                                        )}>
                                            {activity.points > 0 ? '+' : ''}{activity.points}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
