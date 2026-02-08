import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { LandingPage } from './pages/LandingPage';
import { ChatPage } from './pages/ChatPage';
import { DashboardPage } from './pages/DashboardPage';
import { LeaderboardPage } from './pages/LeaderboardPage';

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/learn" element={<ChatPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
