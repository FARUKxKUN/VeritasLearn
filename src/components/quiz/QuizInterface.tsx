import React, { useState, useCallback } from 'react';
import { Question } from '../../types';
import { QuizTimer } from './QuizTimer';
import { Button, Progress } from '../ui';
import { cn } from '../../lib/utils';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface QuizInterfaceProps {
    questions: Question[];
    onComplete: (score: number, totalQuestions: number) => void;
}

export function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [timerActive, setTimerActive] = useState(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleTimeUp = useCallback(() => {
        if (!isAnswered) {
            setIsAnswered(true);
            setTimerActive(false);
        }
    }, [isAnswered]);

    const handleSelectAnswer = (index: number) => {
        if (isAnswered) return;
        setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        setIsAnswered(true);
        setTimerActive(false);

        if (selectedAnswer === currentQuestion.correctAnswer) {
            setCorrectAnswers(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false); setTimerActive(true);
        } else {
            // Quiz complete
            onComplete(correctAnswers, questions.length);
        }
    };

    return (
        <div className="space-y-6 no-select">
            {/* Progress header */}
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-text-primary">
                        Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="text-text-secondary">
                        {correctAnswers} correct so far
                    </span>
                </div>
                <Progress value={progress} color="primary" />
            </div>

            {/* Timer */}
            <QuizTimer
                duration={currentQuestion.timeLimit}
                onTimeUp={handleTimeUp}
                isActive={timerActive}
            />

            {/* Question */}
            <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                    {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrectAnswer = index === currentQuestion.correctAnswer;

                        let optionStyle = 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50';

                        if (isAnswered) {
                            if (isCorrectAnswer) {
                                optionStyle = 'border-green-500 bg-green-50';
                            } else if (isSelected && !isCorrectAnswer) {
                                optionStyle = 'border-red-500 bg-red-50';
                            } else {
                                optionStyle = 'border-gray-200 bg-gray-50 opacity-60';
                            }
                        } else if (isSelected) {
                            optionStyle = 'border-primary-500 bg-primary-50';
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelectAnswer(index)}
                                disabled={isAnswered}
                                className={cn(
                                    'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
                                    optionStyle,
                                    !isAnswered && 'cursor-pointer'
                                )}
                            >
                                <span className={cn(
                                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm',
                                    isSelected && !isAnswered ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                                )}>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span className="flex-1 text-text-primary">{option}</span>
                                {isAnswered && isCorrectAnswer && (
                                    <CheckCircle size={20} className="text-green-500" />
                                )}
                                {isAnswered && isSelected && !isCorrectAnswer && (
                                    <XCircle size={20} className="text-red-500" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Explanation (shown after answering) */}
            {isAnswered && (
                <div className={cn(
                    'p-4 rounded-xl animate-fade-in',
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                )}>
                    <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                            <>
                                <CheckCircle size={20} className="text-green-600" />
                                <span className="font-semibold text-green-700">Correct!</span>
                            </>
                        ) : (
                            <>
                                <XCircle size={20} className="text-red-600" />
                                <span className="font-semibold text-red-700">
                                    {selectedAnswer === null ? 'Time\'s up!' : 'Incorrect'}
                                </span>
                            </>
                        )}
                    </div>
                    <p className="text-sm text-text-secondary">
                        {currentQuestion.explanation}
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
                {!isAnswered ? (
                    <Button
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                    >
                        Submit Answer
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        className="group"
                    >
                        {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                        <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                )}
            </div>
        </div>
    );
}
