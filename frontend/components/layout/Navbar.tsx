"use client";

import React, { useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import { Menu, Globe, User } from 'lucide-react';
import Image from "next/image";
import { Button } from '../ui/Button';
import { Sidebar } from './Sidebar';

import { usePathname } from 'next/navigation';

export const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isTransparentPage = ['/', '/kerjasama', '/tentang-mada'].includes(pathname || '');

    useLayoutEffect(() => {
        const checkScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        checkScroll();
        window.addEventListener("scroll", checkScroll);
        return () => window.removeEventListener("scroll", checkScroll);
    }, []);

    // Helper classes for dynamic text color
    const navLinkClass = `text-sm font-medium text-primary-yellow transition-colors hover:opacity-80`;

    return (
        <>
            <header
                className={`fixed top-0 z-40 w-full transition-all duration-100 ${!isTransparentPage || scrolled
                        ? "bg-primary-violet shadow-sm py-2"
                        : "bg-transparent py-4"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center">
                        {/* LEFT GROUP: Logo + Nav */}
                        <div className="flex items-center gap-20">
                            {/* Logo */}
                            <Link href="/" aria-label="Kembali ke Beranda">
                                <Image
                                    src="/assets/logo-with-text.png"
                                    alt="Mada Kos Logo"
                                    width={50}
                                    height={50}
                                    className="cursor-pointer"
                                />
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-10">
                                <Link href="/sewa" className={navLinkClass}>Sewa</Link>

                                <Link href="/kerjasama" className={navLinkClass}>Kerjasama Mada</Link>

                                <Link href="/tentang-mada" className={navLinkClass}>Tentang Mada</Link>
                            </nav>
                        </div>

                        {/* RIGHT ACTIONS */}
                        <div className="hidden md:flex items-center gap-6 ml-auto">
                            <Button
                                size="sm"
                                variant="primary-outline"
                                className="rounded-full px-6"
                            >
                                <User size={16} className="mr-2" />
                                Masuk / Daftar
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden ml-auto">
                            <button
                            onClick={() => setIsSidebarOpen(true)}
                            className={`p-2 rounded-md transition-colors
                                ${
                                !isTransparentPage || scrolled
                                    ? "text-primary-yellow hover:bg-neutral-50"
                                    : "text-white hover:bg-white/20"
                                }
                            `}
                            >
                            <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </>
    );
};
