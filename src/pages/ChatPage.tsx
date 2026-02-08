import { useState, useCallback } from 'react';
import { Header } from '../components/shared/Header';
import { ChatInterface } from '../components/chat/ChatInterface';
import { ComprehensionGate } from '../components/quiz/ComprehensionGate';
import { QuizInterface } from '../components/quiz/QuizInterface';
import { QuizResults } from '../components/quiz/QuizResults';
import { StudyMaterials } from '../components/quiz/StudyMaterials';
import { Dialog, DialogContent, Button } from '../components/ui';
import { useApp } from '../contexts/AppContext';
import { getFallbackResponse, StudyData } from '../utils/mockData';

type ModalState = 'closed' | 'gate' | 'quiz' | 'results' | 'study';

export function ChatPage() {
    const { messages, updateMessage, addScore, updateStats, stats } = useApp();
    const [modalState, setModalState] = useState<ModalState>('closed');
    const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
    const [currentStudyData, setCurrentStudyData] = useState<StudyData | null>(null);
    const [quizScore, setQuizScore] = useState({ correct: 0, total: 0, points: 0 });
    const [isRetry, setIsRetry] = useState(false);

    const handleOpenGate = useCallback((messageId: string) => {
        setCurrentMessageId(messageId);
        // Get the original user question to find proper study data
        const messageIndex = messages.findIndex(m => m.id === messageId);
        if (messageIndex > 0) {
            const userQuestion = messages[messageIndex - 1].content;
            setCurrentStudyData(getFallbackResponse(userQuestion));
        }
        setModalState('gate');
        setIsRetry(false);
    }, [messages]);

    const handleCopy = useCallback(() => {
        if (currentMessageId) {
            updateMessage(currentMessageId, { locked: false, unlocked: true });
            addScore(0, 'Copied AI answer without quiz');
        }
        setModalState('closed');
        setCurrentStudyData(null);
    }, [currentMessageId, updateMessage, addScore]);

    const handleLearn = useCallback(() => {
        setModalState('quiz');
    }, []);

    const handleQuizComplete = useCallback((correct: number, total: number) => {
        const percentage = (correct / total) * 100;
        const passed = percentage >= 70;
        const points = passed ? (isRetry ? 30 : 50) : 0;

        setQuizScore({ correct, total, points });

        if (passed && currentMessageId) {
            updateMessage(currentMessageId, {
                locked: false,
                unlocked: true
            });
            addScore(points, `Passed quiz${isRetry ? ' (retry)' : ''}: ${correct}/${total} correct`);
            updateStats({
                questionsAnswered: stats.questionsAnswered + 1,
                quizPassRate: Math.round(((stats.quizPassRate * stats.questionsAnswered + 100) / (stats.questionsAnswered + 1)))
            });
        }

        setModalState('results');
    }, [isRetry, currentMessageId, updateMessage, addScore, updateStats, stats]);

    const handleRetry = useCallback(() => {
        setIsRetry(true);
        setModalState('quiz');
    }, []);

    const handleContinue = useCallback(() => {
        // If passed, show study materials; otherwise just close
        if (quizScore.points > 0 && currentStudyData) {
            setModalState('study');
        } else {
            setModalState('closed');
            setCurrentStudyData(null);
            setCurrentMessageId(null);
        }
    }, [quizScore.points, currentStudyData]);

    const handleClose = useCallback(() => {
        if (modalState === 'gate') {
            setModalState('closed');
            setCurrentStudyData(null);
        }
    }, [modalState]);

    const handleCloseStudy = useCallback(() => {
        setModalState('closed');
        setCurrentStudyData(null);
        setCurrentMessageId(null);
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 container-app py-6">
                <div className="h-[calc(100vh-140px)]">
                    <ChatInterface onOpenGate={handleOpenGate} />
                </div>
            </main>

            {/* Comprehension Gate Modal */}
            <ComprehensionGate
                open={modalState === 'gate'}
                onClose={handleClose}
                onCopy={handleCopy}
                onLearn={handleLearn}
            />

            {/* Quiz Modal */}
            <Dialog
                open={modalState === 'quiz'}
                onClose={() => { }}
                className="max-w-2xl"
            >
                <DialogContent className="p-6">
                    {currentStudyData && (
                        <QuizInterface
                            questions={isRetry ? currentStudyData.easyQuiz : currentStudyData.quiz}
                            onComplete={handleQuizComplete}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Results Modal */}
            <Dialog
                open={modalState === 'results'}
                onClose={() => { }}
                className="max-w-lg"
            >
                <DialogContent className="p-6">
                    <QuizResults
                        score={quizScore.correct}
                        totalQuestions={quizScore.total}
                        pointsEarned={quizScore.points}
                        onRetry={quizScore.points === 0 ? handleRetry : undefined}
                        onContinue={handleContinue}
                        isRetry={isRetry}
                    />
                </DialogContent>
            </Dialog>

            {/* Study Materials Modal */}
            <Dialog
                open={modalState === 'study'}
                onClose={handleCloseStudy}
                className="max-w-3xl max-h-[90vh] overflow-y-auto"
            >
                <DialogContent className="p-6">
                    {currentStudyData && (
                        <>
                            <StudyMaterials
                                topic={currentStudyData.topic}
                                summary={currentStudyData.humanized}
                                keyPoints={currentStudyData.keyPoints}
                                flashcards={currentStudyData.flashcards}
                            />
                            <div className="mt-6 flex justify-center">
                                <Button onClick={handleCloseStudy} size="lg">
                                    Back to Chat
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
