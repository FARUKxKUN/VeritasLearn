import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { MessageBubble } from './MessageBubble';
import { Button } from '../ui';
import { Send, Loader2, Trash2 } from 'lucide-react';
import { getFallbackResponse } from '../../utils/mockData';
import { Message } from '../../types';

interface ChatInterfaceProps {
    onOpenGate: (messageId: string) => void;
}

export function ChatInterface({ onOpenGate }: ChatInterfaceProps) {
    const { messages, addMessage, clearMessages } = useApp();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            locked: false,
            timestamp: new Date(),
        };

        addMessage(userMessage);
        setInput('');
        setIsLoading(true);

        // Simulate AI response delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Get response (using fallback for demo)
        const response = getFallbackResponse(userMessage.content);

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.answer,
            locked: true,
            timestamp: new Date(),
            humanizedContent: response.humanized,
        };

        addMessage(assistantMessage);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
                <div>
                    <h2 className="font-semibold text-text-primary">AI Learning Assistant</h2>
                    <p className="text-xs text-text-secondary">Ask any question to start learning</p>
                </div>
                {messages.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearMessages}
                        className="text-text-secondary hover:text-danger-500"
                    >
                        <Trash2 size={16} className="mr-1" />
                        Clear
                    </Button>
                )}
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                            <Send size={28} className="text-primary-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">
                            Start a conversation
                        </h3>
                        <p className="text-text-secondary max-w-sm">
                            Ask about any topic like "Explain photosynthesis" or "What is Newton's First Law?"
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4 justify-center">
                            {['Explain photosynthesis', "Newton's First Law", 'What is gravity?'].map((q) => (
                                <button
                                    key={q}
                                    onClick={() => setInput(q)}
                                    className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:border-primary-300 hover:bg-primary-50 transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            role={message.role}
                            content={message.unlocked ? (message.humanizedContent || message.content) : message.content}
                            locked={message.role === 'assistant' && message.locked && !message.unlocked}
                            onLockedClick={() => onOpenGate(message.id)}
                        />
                    ))
                )}

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                            <Loader2 size={18} className="text-gray-600 animate-spin" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-3">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="px-4"
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                    </Button>
                </div>
            </form>
        </div>
    );
}
