import React, { useState } from 'react';
import { Card, Button } from '../ui';
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface Flashcard {
    id: string;
    front: string;
    back: string;
}

interface FlashcardsProps {
    cards: Flashcard[];
    title?: string;
}

export function Flashcards({ cards, title = 'Study Flashcards' }: FlashcardsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [completedCards, setCompletedCards] = useState<Set<string>>(new Set());

    const currentCard = cards[currentIndex];

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    const handleMarkComplete = () => {
        setCompletedCards(prev => new Set([...prev, currentCard.id]));
        if (currentIndex < cards.length - 1) {
            handleNext();
        }
    };

    const handleReset = () => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setCompletedCards(new Set());
    };

    const progress = (completedCards.size / cards.length) * 100;

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-purple-500" />
                    <h3 className="font-semibold text-text-primary">{title}</h3>
                </div>
                <span className="text-sm text-text-secondary">
                    {currentIndex + 1} / {cards.length}
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-gray-100">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Card area */}
            <div className="p-6">
                <div
                    onClick={handleFlip}
                    className={cn(
                        'relative w-full min-h-[200px] p-6 rounded-xl cursor-pointer transition-all duration-500 transform-gpu',
                        'flex items-center justify-center text-center',
                        isFlipped
                            ? 'bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg'
                            : 'bg-gradient-to-br from-purple-50 to-blue-100 shadow-lg hover:shadow-xl',
                        completedCards.has(currentCard.id) && 'ring-2 ring-green-500'
                    )}
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                >
                    <div
                        className="absolute inset-0 flex items-center justify-center p-6"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(0deg)'
                        }}
                    >
                        <div>
                            <p className="text-xs text-purple-500 font-medium mb-2 uppercase tracking-wide">Question</p>
                            <p className="text-lg font-medium text-text-primary">{currentCard.front}</p>
                        </div>
                    </div>

                    <div
                        className="absolute inset-0 flex items-center justify-center p-6"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                        }}
                    >
                        <div>
                            <p className="text-xs text-green-600 font-medium mb-2 uppercase tracking-wide">Answer</p>
                            <p className="text-lg font-medium text-text-primary">{currentCard.back}</p>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-text-secondary mt-3">
                    Click card to flip
                </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft size={18} className="mr-1" />
                    Previous
                </Button>

                <div className="flex gap-2">
                    {completedCards.size > 0 && (
                        <Button variant="ghost" size="sm" onClick={handleReset}>
                            <RotateCcw size={16} className="mr-1" />
                            Reset
                        </Button>
                    )}
                    {isFlipped && !completedCards.has(currentCard.id) && (
                        <Button variant="success" size="sm" onClick={handleMarkComplete}>
                            Got it! ✓
                        </Button>
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentIndex === cards.length - 1}
                >
                    Next
                    <ChevronRight size={18} className="ml-1" />
                </Button>
            </div>

            {/* Completion message */}
            {completedCards.size === cards.length && (
                <div className="p-4 bg-green-50 border-t border-green-100 text-center animate-fade-in">
                    <p className="text-green-700 font-medium">
                        🎉 You've reviewed all flashcards!
                    </p>
                </div>
            )}
        </Card>
    );
}
