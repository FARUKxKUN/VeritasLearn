import { useState } from 'react';
import { Header } from '../components/shared/Header';
import { ChatInterface } from '../components/chat/ChatInterface';
import { ComprehensionGate } from '../components/quiz/ComprehensionGate';
import { QuizInterface } from '../components/quiz/QuizInterface';
import { QuizResults } from '../components/quiz/QuizResults';
import { StudyMaterials } from '../components/quiz/StudyMaterials';
import { Sheet } from '../components/ui/Sheet';
import { Button } from '../components/ui/Button';
import { PrototypeNote } from '../components/ui/PrototypeNote';
import { useApp } from '../contexts/AppContext';
import { getFallbackResponse, type StudyData } from '../utils/mockData';

type ModalState = 'closed' | 'gate' | 'quiz' | 'results' | 'study';

const PASS_RATIO = 0.7;
const POINTS_FIRST_TRY = 50;
const POINTS_RETRY = 30;

export default function ChatPage() {
  const { messages, updateMessage, addScore, updateStats, stats } = useApp();
  const [modal, setModal] = useState<ModalState>('closed');
  const [messageId, setMessageId] = useState<string | null>(null);
  const [study, setStudy] = useState<StudyData | null>(null);
  const [result, setResult] = useState({ correct: 0, total: 0, points: 0 });
  const [isRetry, setIsRetry] = useState(false);

  const reset = () => {
    setModal('closed');
    setStudy(null);
    setMessageId(null);
    setIsRetry(false);
  };

  const openGate = (id: string) => {
    const index = messages.findIndex((message) => message.id === id);
    if (index < 1) return;
    setMessageId(id);
    setStudy(getFallbackResponse(messages[index - 1].content));
    setIsRetry(false);
    setModal('gate');
  };

  const copyAnswer = () => {
    if (messageId) {
      updateMessage(messageId, { locked: false, unlocked: true, unlockedWith: 'copy' });
      addScore(0, 'Copied the AI answer without the quiz');
    }
    reset();
  };

  const finishQuiz = (correct: number, total: number) => {
    const passed = correct / total >= PASS_RATIO;
    const points = passed ? (isRetry ? POINTS_RETRY : POINTS_FIRST_TRY) : 0;
    setResult({ correct, total, points });
    if (passed && messageId) {
      updateMessage(messageId, { locked: false, unlocked: true, unlockedWith: 'quiz' });
      addScore(points, `Passed the quiz${isRetry ? ' (retry)' : ''}: ${correct}/${total} correct`);
      updateStats({
        questionsAnswered: stats.questionsAnswered + 1,
        quizPassRate: Math.round((stats.quizPassRate * stats.questionsAnswered + 100) / (stats.questionsAnswered + 1)),
      });
    }
    setModal('results');
  };

  return (
    <div className="min-h-dvh">
      <Header />
      <main id="main" className="shell py-6">
        <ChatInterface onOpenGate={openGate} />
        <PrototypeNote className="py-4" />
      </main>

      <ComprehensionGate
        open={modal === 'gate'}
        onClose={reset}
        onCopy={copyAnswer}
        onLearn={() => setModal('quiz')}
      />

      <Sheet open={modal === 'quiz'} label="Comprehension quiz">
        {study ? (
          <QuizInterface
            key={isRetry ? 'retry' : 'first'}
            questions={isRetry ? study.easyQuiz : study.quiz}
            onComplete={finishQuiz}
          />
        ) : null}
      </Sheet>

      <Sheet open={modal === 'results'} label="Quiz result">
        <QuizResults
          score={result.correct}
          totalQuestions={result.total}
          pointsEarned={result.points}
          isRetry={isRetry}
          onRetry={
            result.points === 0 && !isRetry
              ? () => {
                  setIsRetry(true);
                  setModal('quiz');
                }
              : undefined
          }
          onContinue={() => (result.points > 0 ? setModal('study') : reset())}
        />
      </Sheet>

      <Sheet open={modal === 'study'} onClose={reset} label="Study sheet" className="w-[min(48rem,calc(100%-1.5rem))]">
        {study ? (
          <>
            <StudyMaterials topic={study.topic} summary={study.humanized} keyPoints={study.keyPoints} flashcards={study.flashcards} />
            <div className="mt-10">
              <Button onClick={reset}>Back to the answer</Button>
            </div>
          </>
        ) : null}
      </Sheet>
    </div>
  );
}
