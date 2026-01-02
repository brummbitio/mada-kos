"use client";

import { Check } from "lucide-react";

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

export const Checkbox = ({ label, checked, onChange, className = "" }: CheckboxProps) => {
    return (
        <label className={`flex items-center gap-3 cursor-pointer group ${className}`}>
            <div
                className={`
            w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all
            ${checked
                        ? 'bg-primary-yellow border-primary-yellow'
                        : 'bg-white border-neutral-300 group-hover:border-neutral-400'
                    }
        `}
            >
                {checked && <Check size={16} className="text-white" strokeWidth={3} />}
            </div>
            <span className={`text-sm ${checked ? 'text-neutral-800 font-medium' : 'text-neutral-500'}`}>
                {label}
            </span>
            {/* Hidden input for accessibility */}
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
        </label>
    );
};
