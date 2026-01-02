"use client";

interface SearchPopoverProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    className?: string;
}

export const SearchPopover = ({ isOpen, onClose, children, className = "" }: SearchPopoverProps) => {
    if (!isOpen) return null;

    return (
        <div className={`
        hidden sm:block absolute top-[calc(100%+12px)] left-0  bg-white rounded-3xl shadow-xl border border-neutral-100 p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200
        ${className}
    `}>
            {children}
        </div>
    );
};
