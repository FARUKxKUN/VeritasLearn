import { Header } from '../components/shared/Header';
import { Dashboard } from '../components/dashboard/Dashboard';

export function DashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container-app py-8">
                <Dashboard />
            </main>
        </div>
    );
}
