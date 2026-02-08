
import { cn } from '../../lib/utils';
import { Lock, AlertTriangle, Bot, User } from 'lucide-react';

interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
    locked?: boolean;
    onLockedClick?: () => void;
}

export function MessageBubble({ role, content, locked = false, onLockedClick }: MessageBubbleProps) {
    const isUser = role === 'user';

    return (
        <div className={cn(
            'flex gap-3 message-appear',
            isUser ? 'flex-row-reverse' : 'flex-row'
        )}>
            {/* Avatar */}
            <div className={cn(
                'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center',
                isUser ? 'bg-primary-500' : 'bg-gray-200'
            )}>
                {isUser ? (
                    <User size={18} className="text-white" />
                ) : (
                    <Bot size={18} className="text-gray-600" />
                )}
            </div>

            {/* Message content */}
            <div className={cn(
                'relative max-w-[80%] rounded-2xl px-4 py-3',
                isUser
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    : 'bg-gray-100 text-text-primary'
            )}>
                {locked ? (
                    <div
                        className="locked-content cursor-pointer group"
                        onClick={onLockedClick}
                    >
                        {/* Blurred content */}
                        <div className="blur-sm select-none pointer-events-none">
                            {content.slice(0, 200)}...
                        </div>

                        {/* Lock overlay */}
                        <div className="locked-overlay">
                            <Lock size={24} className="text-primary-500 mb-2" />
                            <p className="text-sm font-medium text-text-primary">Click to unlock</p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-warning-500">
                                <AlertTriangle size={12} />
                                <span>AI-generated content</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="whitespace-pre-wrap">
                        {content.split('\n').map((line, i) => {
                            // Simple markdown-like formatting
                            if (line.startsWith('**') && line.endsWith('**')) {
                                return <strong key={i} className="block font-semibold">{line.slice(2, -2)}</strong>;
                            }
                            if (line.startsWith('- ')) {
                                return <li key={i} className="ml-4">{line.slice(2)}</li>;
                            }
                            if (line.startsWith('> ')) {
                                return <blockquote key={i} className="border-l-2 border-primary-300 pl-3 italic my-2">{line.slice(2)}</blockquote>;
                            }
                            return <p key={i} className={line.trim() === '' ? 'h-2' : ''}>{line}</p>;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
