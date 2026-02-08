import { Header } from '../components/shared/Header';
import { Leaderboard } from '../components/leaderboard/Leaderboard';

export function LeaderboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container-app py-8">
                <Leaderboard />
            </main>
        </div>
    );
}
