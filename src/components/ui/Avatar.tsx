
import { cn } from '../../lib/utils';

interface AvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    highlight?: boolean;
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function getColorFromName(name: string): string {
    const colors = [
        'bg-blue-500',
        'bg-purple-500',
        'bg-green-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
        'bg-orange-500',
        'bg-cyan-500',
    ];

    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
}

export function Avatar({ name, size = 'md', className, highlight = false }: AvatarProps) {
    const sizes = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
    };

    return (
        <div
            className={cn(
                'flex items-center justify-center rounded-full text-white font-semibold',
                getColorFromName(name),
                sizes[size],
                highlight && 'ring-2 ring-primary-500 ring-offset-2',
                className
            )}
        >
            {getInitials(name)}
        </div>
    );
}
