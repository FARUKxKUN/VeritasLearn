import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { TierType, Message, UserStats, Activity, Question } from '../types';
import { getTier } from '../utils/tiers';
import { saveScore, loadScore, saveActivities, loadActivities } from '../utils/storage';
import { DEMO_STATS } from '../utils/mockData';

interface AppState {
    score: number;
    tier: TierType;
    stats: UserStats;
    activities: Activity[];
    messages: Message[];
    currentQuiz: Question[] | null;
    isQuizActive: boolean;
    scorePopup: { show: boolean; points: number } | null;
}

interface AppContextType extends AppState {
    addScore: (points: number, reason: string) => void;
    addMessage: (message: Message) => void;
    updateMessage: (id: string, updates: Partial<Message>) => void;
    clearMessages: () => void;
    setQuiz: (questions: Question[] | null) => void;
    setQuizActive: (active: boolean) => void;
    updateStats: (updates: Partial<UserStats>) => void;
    showScorePopup: (points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [score, setScore] = useState<number>(() => loadScore());
    const [tier, setTier] = useState<TierType>(() => getTier(loadScore()));
    const [stats, setStats] = useState<UserStats>(DEMO_STATS);
    const [activities, setActivities] = useState<Activity[]>(() => loadActivities() as Activity[]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentQuiz, setCurrentQuiz] = useState<Question[] | null>(null);
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [scorePopup, setScorePopup] = useState<{ show: boolean; points: number } | null>(null);

    // Persist score changes
    useEffect(() => {
        saveScore(score);
        setTier(getTier(score));
    }, [score]);

    // Persist activities
    useEffect(() => {
        saveActivities(activities);
    }, [activities]);

    const addScore = useCallback((points: number, reason: string) => {
        setScore(prev => prev + points);
        const newActivity: Activity = {
            id: Date.now().toString(),
            type: points > 0 ? 'quiz_pass' : 'copy',
            description: reason,
            points,
            timestamp: new Date(),
        };
        setActivities(prev => [newActivity, ...prev].slice(0, 20));

        if (points > 0) {
            showScorePopup(points);
        }
    }, []);

    const addMessage = useCallback((message: Message) => {
        setMessages(prev => [...prev, message]);
    }, []);

    const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
        setMessages(prev =>
            prev.map(msg => msg.id === id ? { ...msg, ...updates } : msg)
        );
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    const setQuiz = useCallback((questions: Question[] | null) => {
        setCurrentQuiz(questions);
    }, []);

    const setQuizActive = useCallback((active: boolean) => {
        setIsQuizActive(active);
    }, []);

    const updateStats = useCallback((updates: Partial<UserStats>) => {
        setStats(prev => ({ ...prev, ...updates }));
    }, []);

    const showScorePopup = useCallback((points: number) => {
        setScorePopup({ show: true, points });
        setTimeout(() => setScorePopup(null), 2000);
    }, []);

    return (
        <AppContext.Provider
            value={{
                score,
                tier,
                stats,
                activities,
                messages,
                currentQuiz,
                isQuizActive,
                scorePopup,
                addScore,
                addMessage,
                updateMessage,
                clearMessages,
                setQuiz,
                setQuizActive,
                updateStats,
                showScorePopup,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
