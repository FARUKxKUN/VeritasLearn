import { Card, Tabs, TabsList, TabsTrigger, TabsContent, Avatar, Badge } from '../ui';
import { MOCK_LEADERBOARD, MOCK_NATIONAL_LEADERBOARD } from '../../utils/mockData';
import { getTierConfig } from '../../utils/tiers';
import { Trophy, Medal, Crown, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

const getRankIcon = (rank: number) => {
    switch (rank) {
        case 1:
            return <Crown size={18} className="text-yellow-500" />;
        case 2:
            return <Medal size={18} className="text-gray-400" />;
        case 3:
            return <Medal size={18} className="text-amber-600" />;
        default:
            return null;
    }
};

const getRankStyle = (rank: number) => {
    switch (rank) {
        case 1:
            return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
        case 2:
            return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
        case 3:
            return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
        default:
            return 'bg-white border-gray-100';
    }
};

export function Leaderboard() {
    return (
        <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                            <Trophy size={24} className="text-yellow-500" />
                            Leaderboard
                        </h2>
                        <p className="text-sm text-text-secondary mt-1">
                            Top learners this semester
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <Clock size={14} />
                        <span>Updated 5 min ago</span>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="university" className="p-4">
                <TabsList className="w-full md:w-auto">
                    <TabsTrigger value="university">My University</TabsTrigger>
                    <TabsTrigger value="national">National</TabsTrigger>
                </TabsList>

                <TabsContent value="university">
                    <LeaderboardList entries={MOCK_LEADERBOARD} />
                </TabsContent>

                <TabsContent value="national">
                    <LeaderboardList entries={MOCK_NATIONAL_LEADERBOARD} />
                </TabsContent>
            </Tabs>
        </Card>
    );
}

interface LeaderboardListProps {
    entries: typeof MOCK_LEADERBOARD;
}

function LeaderboardList({ entries }: LeaderboardListProps) {
    return (
        <div className="space-y-2">
            {entries.map((entry) => {
                const tierConfig = getTierConfig(entry.tier);

                return (
                    <div
                        key={entry.rank}
                        className={cn(
                            'flex items-center gap-4 p-4 rounded-xl border transition-all',
                            getRankStyle(entry.rank),
                            entry.isCurrentUser && 'ring-2 ring-primary-500 ring-offset-2'
                        )}
                    >
                        {/* Rank */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 font-bold">
                            {getRankIcon(entry.rank) || (
                                <span className="text-text-secondary text-sm">#{entry.rank}</span>
                            )}
                        </div>

                        {/* Avatar */}
                        <Avatar
                            name={entry.name}
                            highlight={entry.isCurrentUser}
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className={cn(
                                    'font-semibold truncate',
                                    entry.isCurrentUser ? 'text-primary-600' : 'text-text-primary'
                                )}>
                                    {entry.name}
                                </p>
                                {entry.isCurrentUser && (
                                    <Badge variant="default" className="text-xs">You</Badge>
                                )}
                            </div>
                            <p className="text-xs text-text-secondary truncate">
                                {entry.university}
                            </p>
                        </div>

                        {/* Tier badge */}
                        <div
                            className={cn(
                                'hidden sm:flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white',
                                tierConfig.gradient
                            )}
                        >
                            <span>{tierConfig.icon}</span>
                            <span>{tierConfig.name}</span>
                        </div>

                        {/* Score */}
                        <div className="text-right">
                            <p className="font-bold text-text-primary">
                                {entry.score.toLocaleString()}
                            </p>
                            <p className="text-xs text-text-secondary">points</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
