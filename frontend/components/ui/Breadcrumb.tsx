"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
    active?: boolean;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
    return (
        <nav className={`flex items-center text-sm font-medium ${className}`} aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isActive = item.active || isLast;

                    return (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <ChevronRight size={16} className="text-neutral-400 mx-2" />
                            )}
                            {item.href && !isActive ? (
                                <Link
                                    href={item.href}
                                    className="text-neutral-400 hover:text-primary-violet transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={`text-primary-violet ${isActive ? 'font-semibold' : ''}`}>
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
