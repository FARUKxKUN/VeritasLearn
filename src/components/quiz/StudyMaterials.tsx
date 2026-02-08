
import { Card } from '../ui';
import { Flashcards, Flashcard } from './Flashcards';
import { BookOpen, Lightbulb, FileText, CheckCircle } from 'lucide-react';

interface StudyMaterialsProps {
    topic: string;
    summary: string;
    keyPoints: string[];
    flashcards: Flashcard[];
}

export function StudyMaterials({ topic, summary, keyPoints, flashcards }: StudyMaterialsProps) {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4">
                    <CheckCircle size={18} />
                    <span className="font-medium">Study Materials Unlocked!</span>
                </div>
                <h2 className="text-2xl font-bold text-text-primary">
                    {topic}
                </h2>
            </div>

            {/* Summary card */}
            <Card className="overflow-hidden">
                <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-blue-50">
                    <BookOpen size={20} className="text-blue-600" />
                    <h3 className="font-semibold text-text-primary">Summary</h3>
                </div>
                <div className="p-4">
                    <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {summary}
                    </p>
                </div>
            </Card>

            {/* Key points */}
            <Card className="overflow-hidden">
                <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-yellow-50">
                    <Lightbulb size={20} className="text-yellow-600" />
                    <h3 className="font-semibold text-text-primary">Key Points to Remember</h3>
                </div>
                <div className="p-4">
                    <ul className="space-y-3">
                        {keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs flex items-center justify-center font-medium">
                                    {index + 1}
                                </span>
                                <span className="text-text-primary">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>

            {/* Flashcards */}
            <Flashcards cards={flashcards} title="Practice Flashcards" />

            {/* Tip */}
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <FileText size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-purple-900 mb-1">Study Tip</p>
                    <p className="text-sm text-purple-700">
                        Review these flashcards again tomorrow to strengthen your memory. Spaced repetition is key to long-term retention!
                    </p>
                </div>
            </div>
        </div>
    );
}
