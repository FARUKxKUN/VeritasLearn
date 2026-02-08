const STORAGE_KEYS = {
    USER_SCORE: 'veritaslearn_user_score',
    USER_STATS: 'veritaslearn_user_stats',
    CONVERSATIONS: 'veritaslearn_conversations',
    SCORE_HISTORY: 'veritaslearn_score_history',
    ACTIVITIES: 'veritaslearn_activities',
};

export function saveScore(score: number): void {
    localStorage.setItem(STORAGE_KEYS.USER_SCORE, score.toString());
}

export function loadScore(): number {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_SCORE);
    return saved ? parseInt(saved, 10) : 1850; // Demo user starts with 1850 points (Scholar tier)
}

export function saveStats(stats: object): void {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
}

export function loadStats(): object | null {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    return saved ? JSON.parse(saved) : null;
}

export function saveActivities(activities: object[]): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
}

export function loadActivities(): object[] {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : [];
}

export function clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}
