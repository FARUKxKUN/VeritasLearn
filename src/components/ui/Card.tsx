
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    glass?: boolean;
}

export function Card({ children, className, glass = false, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-xl p-6 transition-all duration-200',
                glass ? 'glass-card' : 'bg-white shadow-lg shadow-gray-200/50',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
    return (
        <div className={cn('mb-4', className)} {...props}>
            {children}
        </div>
    );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function CardTitle({ children, className, ...props }: CardTitleProps) {
    return (
        <h3 className={cn('text-lg font-semibold text-text-primary', className)} {...props}>
            {children}
        </h3>
    );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
    return (
        <div className={cn('', className)} {...props}>
            {children}
        </div>
    );
}
