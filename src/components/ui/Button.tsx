
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'success';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function Button({
    variant = 'default',
    size = 'md',
    className,
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        default: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:opacity-90 focus:ring-primary-500 btn-glow',
        outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
        ghost: 'text-text-secondary hover:bg-gray-100 hover:text-text-primary focus:ring-gray-300',
        destructive: 'bg-danger-500 text-white hover:opacity-90 focus:ring-danger-500',
        success: 'bg-gradient-to-r from-success-500 to-success-600 text-white hover:opacity-90 focus:ring-success-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
