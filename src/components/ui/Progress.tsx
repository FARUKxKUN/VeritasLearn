
import { cn } from '../../lib/utils';

interface ProgressProps {
    value: number;
    max?: number;
    className?: string;
    showLabel?: boolean;
    color?: 'primary' | 'success' | 'warning' | 'danger';
}

export function Progress({
    value,
    max = 100,
    className,
    showLabel = false,
    color = 'primary'
}: ProgressProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const colors = {
        primary: 'bg-gradient-to-r from-primary-500 to-secondary-500',
        success: 'bg-gradient-to-r from-success-500 to-success-600',
        warning: 'bg-warning-500',
        danger: 'bg-danger-500',
    };

    return (
        <div className={cn('w-full', className)}>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-500 ease-out',
                        colors[color]
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showLabel && (
                <p className="mt-1 text-right text-sm text-text-secondary">
                    {Math.round(percentage)}%
                </p>
            )}
        </div>
    );
}
