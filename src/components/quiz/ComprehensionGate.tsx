
import { Dialog, DialogContent, Button } from '../ui';
import { Copy, Brain, X, Check, Star, FileText, Zap } from 'lucide-react';

interface ComprehensionGateProps {
    open: boolean;
    onClose: () => void;
    onCopy: () => void;
    onLearn: () => void;
}

export function ComprehensionGate({ open, onClose, onCopy, onLearn }: ComprehensionGateProps) {
    return (
        <Dialog open={open} onClose={onClose} className="max-w-3xl">
            <DialogContent className="p-0">
                {/* Header */}
                <div className="text-center p-6 pb-4">
                    <h2 className="text-2xl font-bold text-text-primary mb-2">
                        Make Your Choice
                    </h2>
                    <p className="text-text-secondary">
                        How do you want to use this AI-generated answer?
                    </p>
                </div>

                {/* Two paths */}
                <div className="grid md:grid-cols-2 gap-4 p-6 pt-0">
                    {/* Path A - Just Copy */}
                    <div className="relative rounded-2xl border-2 border-red-200 bg-red-50/50 p-6 transition-all hover:border-red-300">
                        <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-medium text-red-500">
                            Quick Path
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <Copy size={28} className="text-red-500" />
                            </div>

                            <h3 className="text-lg font-bold text-red-700 mb-4">Just Copy</h3>

                            <ul className="space-y-2 text-sm text-left w-full mb-6">
                                <li className="flex items-center gap-2 text-red-600">
                                    <X size={16} className="flex-shrink-0" />
                                    <span>Copy without understanding</span>
                                </li>
                                <li className="flex items-center gap-2 text-red-600">
                                    <X size={16} className="flex-shrink-0" />
                                    <span>0 points earned</span>
                                </li>
                                <li className="flex items-center gap-2 text-red-600">
                                    <X size={16} className="flex-shrink-0" />
                                    <span>Plain AI text only</span>
                                </li>
                                <li className="flex items-center gap-2 text-red-600">
                                    <X size={16} className="flex-shrink-0" />
                                    <span>No study materials</span>
                                </li>
                            </ul>

                            <Button
                                variant="outline"
                                onClick={onCopy}
                                className="w-full border-red-300 text-red-600 hover:bg-red-100"
                            >
                                Copy Anyway
                            </Button>
                        </div>
                    </div>

                    {/* Path B - Understand & Learn */}
                    <div className="relative rounded-2xl border-2 border-green-300 bg-green-50/50 p-6 transition-all hover:border-green-400 hover:shadow-lg">
                        <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-medium text-green-600">
                            Recommended
                        </div>
                        <div className="absolute -top-3 right-4 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                            +50 pts
                        </div>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-pulse-slow">
                                <Brain size={28} className="text-green-600" />
                            </div>

                            <h3 className="text-lg font-bold text-green-700 mb-4">Understand & Learn</h3>

                            <ul className="space-y-2 text-sm text-left w-full mb-6">
                                <li className="flex items-center gap-2 text-green-700">
                                    <Check size={16} className="flex-shrink-0" />
                                    <span>Take comprehension quiz</span>
                                </li>
                                <li className="flex items-center gap-2 text-green-700">
                                    <Star size={16} className="flex-shrink-0 text-yellow-500" />
                                    <span className="font-medium">Earn 50 points if pass (70%+)</span>
                                </li>
                                <li className="flex items-center gap-2 text-green-700">
                                    <Zap size={16} className="flex-shrink-0" />
                                    <span>Get humanized answer in your style</span>
                                </li>
                                <li className="flex items-center gap-2 text-green-700">
                                    <FileText size={16} className="flex-shrink-0" />
                                    <span>Bonus: Flashcards + Study Guide</span>
                                </li>
                            </ul>

                            <Button
                                variant="success"
                                onClick={onLearn}
                                className="w-full"
                            >
                                Prove Understanding
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer message */}
                <div className="text-center p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <p className="text-sm text-text-secondary">
                        💡 <span className="font-medium">Your choice matters.</span> Building real understanding leads to lasting knowledge.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
