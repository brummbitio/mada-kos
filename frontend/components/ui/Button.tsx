import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'primary-outline' | 'secondary' | 'secondary-outline' |'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}
export const Button = ({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-primary-yellow hover:bg-primary-yellow-700 text-white focus:ring-primary-yellow-500',
        'primary-outline':
        'bg-transparent border border-primary-yellow text-primary-yellow hover:bg-primary-yellow/30 focus:ring-primary-yellow-500',
        secondary: 'bg-primary-violet hover:bg-primary-violet-700 text-white focus:ring-primary-violet-500',
        'secondary-outline':
        'bg-transparent border border-primary-violet text-primary-violet hover:bg-primary-violet/10 focus:ring-primary-violet-500',
        danger: 'bg-status-danger hover:bg-red-600 text-white focus:ring-red-500',
        ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-base',
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </button>
    );
};
