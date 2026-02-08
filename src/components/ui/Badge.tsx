
import { cn } from '../../lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-primary-100 text-primary-700',
        success: 'bg-success-100 text-success-700',
        warning: 'bg-yellow-100 text-yellow-700',
        danger: 'bg-red-100 text-red-700',
        outline: 'border border-gray-300 text-text-secondary bg-transparent',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
