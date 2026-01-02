import React from 'react';

type BadgeVariant = 'success' | 'info' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

export const Badge = ({
    children,
    variant = 'neutral',
    className = '',
}: BadgeProps) => {
    const variants = {
        success: 'bg-status-success/20 text-green-800 border-status-success/50',
        info: 'bg-status-info/20 text-blue-800 border-status-info/50',
        warning: 'bg-status-warning/20 text-yellow-800 border-status-warning/50',
        danger: 'bg-status-danger/20 text-red-800 border-status-danger/50',
        neutral: 'bg-neutral-100 text-neutral-700 border-neutral-300',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
};
