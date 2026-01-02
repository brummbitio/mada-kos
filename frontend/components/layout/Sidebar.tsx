"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Home, MapPin, Heart, Users, Gift, ChevronRight, User } from "lucide-react";
import { Button } from "../ui/Button";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <aside className="relative w-[85%] max-w-sm h-full bg-white shadow-xl flex flex-col animate-slide-in-right">

                {/* Header / User Profile */}
                <div className="bg-[#ede8dd] p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-neutral-700 hover:text-black"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex items-center gap-4 mt-2">
                        <div className="w-16 h-16 rounded-full bg-neutral-300 flex items-center justify-center overflow-hidden">
                            <User size={32} className="text-neutral-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-primary-violet">Fernando Putra</h3>
                            <Link href="#" className="text-sm text-neutral-600 flex items-center gap-1 hover:underline">
                                Edit Profil <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Coin Balance */}
                    <div className="mt-6 bg-[#f7f2e8] border border-[#eaddc5] rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary-yellow flex items-center justify-center text-white text-xs font-bold">
                                R
                            </div>
                            <span className="font-semibold text-neutral-800">Rukoin</span>
                        </div>
                        <span className="font-bold text-neutral-800">0</span>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto py-2">
                    <nav className="space-y-1">
                        <MenuItem icon={<Home size={20} />} label="My Home" />
                        <MenuItem icon={<MapPin size={20} />} label="Visit" />
                        <MenuItem icon={<Heart size={20} />} label="Favorit" />
                        <MenuItem icon={<Users size={20} />} label="Community" />
                        <MenuItem icon={<Gift size={20} />} label="Ajak Teman, Dapat Reward!" />
                    </nav>

                    <div className="px-6 pt-6 pb-2">
                        <h4 className="font-bold text-primary-violet text-lg mb-4">Explore Mada Kos</h4>
                        <nav className="space-y-4">
                            <Link href="/sewa" className="block text-neutral-600 hover:text-primary-yellow">Sewa</Link>
                            <Link href="/kerjasama" className="block text-neutral-600 hover:text-primary-yellow">Kerjasama</Link>
                            <Link href="/tentang-mada" className="block text-neutral-600 hover:text-primary-yellow">Tentang Mada</Link>
                        </nav>
                    </div>
                </div>

                {/* Footer Actions (if any) */}
                <div className="p-6 border-t border-neutral-100">
                    <Button variant="secondary" className="w-full justify-center">Log Out</Button>
                </div>

            </aside>
        </div>
    );
};

const MenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <Link
        href="#"
        className="flex items-center gap-4 px-6 py-4 text-neutral-700 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0"
    >
        <span className="text-neutral-500">{icon}</span>
        <span className="font-medium">{label}</span>
    </Link>
);
