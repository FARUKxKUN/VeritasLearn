import { Button } from '../ui';
import { Trophy, Star, RefreshCcw, ArrowRight, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuizResultsProps {
    score: number;
    totalQuestions: number;
    pointsEarned: number;
    onRetry?: () => void;
    onContinue: () => void;
    isRetry?: boolean;
}

export function QuizResults({
    score,
    totalQuestions,
    pointsEarned,
    onRetry,
    onContinue,
    isRetry = false
}: QuizResultsProps) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
        <div className="text-center space-y-6 animate-fade-in">
            {/* Result icon */}
            <div className={cn(
                'w-24 h-24 mx-auto rounded-full flex items-center justify-center',
                passed
                    ? 'bg-gradient-to-br from-green-400 to-green-500 animate-bounce-subtle'
                    : 'bg-gradient-to-br from-orange-400 to-red-500'
            )}>
                {passed ? (
                    <Trophy size={48} className="text-white" />
                ) : (
                    <RefreshCcw size={48} className="text-white" />
                )}
            </div>

            {/* Result message */}
            <div>
                <h2 className={cn(
                    'text-2xl font-bold mb-2',
                    passed ? 'text-green-600' : 'text-orange-600'
                )}>
                    {passed ? 'Congratulations!' : 'Almost there!'}
                </h2>
                <p className="text-text-secondary">
                    {passed
                        ? 'You\'ve proven your understanding!'
                        : 'You need 70% to pass. Try again!'}
                </p>
            </div>

            {/* Score display */}
            <div className="bg-gray-50 rounded-2xl p-6 max-w-sm mx-auto">
                <div className="text-5xl font-bold gradient-text mb-2">
                    {score}/{totalQuestions}
                </div>
                <p className="text-text-secondary mb-4">
                    {percentage}% correct
                </p>

                {/* Points earned */}
                {passed && (
                    <div className="flex items-center justify-center gap-2 bg-green-100 text-green-700 rounded-full py-2 px-4">
                        <Star className="text-yellow-500" size={20} />
                        <span className="font-bold">+{pointsEarned} points earned!</span>
                        {!isRetry && <Sparkles size={16} className="text-yellow-500" />}
                    </div>
                )}
            </div>

            {/* Question breakdown */}
            <div className="flex justify-center gap-3">
                {Array.from({ length: totalQuestions }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center',
                            i < score ? 'bg-green-100' : 'bg-red-100'
                        )}
                    >
                        {i < score ? (
                            <CheckCircle size={20} className="text-green-600" />
                        ) : (
                            <XCircle size={20} className="text-red-500" />
                        )}
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3">
                {!passed && onRetry && (
                    <Button variant="outline" onClick={onRetry}>
                        <RefreshCcw size={18} className="mr-2" />
                        Try Again (30 pts)
                    </Button>
                )}
                <Button onClick={onContinue} variant={passed ? 'success' : 'default'}>
                    {passed ? 'View Unlocked Answer' : 'Continue Anyway'}
                    <ArrowRight size={18} className="ml-2" />
                </Button>
            </div>

            {/* Encouraging message */}
            <p className="text-sm text-text-secondary">
                {passed
                    ? '🌟 Your humanized answer and study materials are now available!'
                    : '💪 Don\'t give up! Understanding takes practice.'}
            </p>
        </div>
    );
}
