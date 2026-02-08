import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export function Dialog({ open, onClose, children, className }: DialogProps) {
    // Prevent scroll when dialog is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Dialog content */}
            <div
                className={cn(
                    'relative z-10 w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl animate-slide-up',
                    className
                )}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                    aria-label="Close dialog"
                >
                    <X size={20} className="text-gray-500" />
                </button>
                {children}
            </div>
        </div>
    );
}

interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
    return (
        <div className={cn('p-6', className)}>
            {children}
        </div>
    );
}

interface DialogHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
}

interface DialogTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
    return (
        <h2 className={cn('text-2xl font-bold text-text-primary', className)}>
            {children}
        </h2>
    );
}
