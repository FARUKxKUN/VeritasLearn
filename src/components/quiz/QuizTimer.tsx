import React, { useState, useEffect, useCallback } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuizTimerProps {
    duration: number;
    onTimeUp: () => void;
    isActive: boolean;
}

export function QuizTimer({ duration, onTimeUp, isActive }: QuizTimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);

    const handleTimeUp = useCallback(() => {
        onTimeUp();
    }, [onTimeUp]);

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    useEffect(() => {
        if (!isActive) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive, handleTimeUp]);

    const isWarning = timeLeft <= 10;
    const percentage = (timeLeft / duration) * 100;

    return (
        <div className="flex items-center gap-2">
            <div
                className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-full font-mono font-medium transition-colors',
                    isWarning
                        ? 'bg-red-100 text-red-600 timer-warning'
                        : 'bg-gray-100 text-text-primary'
                )}
            >
                {isWarning ? (
                    <AlertCircle size={16} className="animate-pulse" />
                ) : (
                    <Clock size={16} />
                )}
                <span className="min-w-[40px] text-center">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
            </div>

            {/* Progress bar */}
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-1000 ease-linear',
                        isWarning ? 'bg-red-500' : 'bg-primary-500'
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
