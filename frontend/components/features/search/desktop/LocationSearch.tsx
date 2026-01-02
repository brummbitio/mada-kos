"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { SearchPopover } from "../shared/SearchPopover";
import { useLocationLogic, POPULAR_KOS, SEARCH_SUGGESTIONS, Category } from "../hooks/useLocationLogic";

export const LocationSearch = () => {
    const {
        isOpen, setIsOpen,
        activeCategory, setActiveCategory,
        searchValue, setSearchValue,
        handleSelectSuggestion
    } = useLocationLogic();

    const containerRef = useRef<HTMLDivElement>(null);

    // Close panel when clicking outside (Desktop only)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (window.innerWidth >= 640) {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    const SearchContent = () => (
        <>
            <div className="mb-6">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {POPULAR_KOS.map((city, idx) => (
                        <div key={idx} className="flex-shrink-0 w-28 group cursor-pointer" onClick={() => handleSelectSuggestion(city.name)}>
                            <div className="relative h-20 rounded-xl overflow-hidden mb-2 bg-neutral-100">
                                <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <p className="text-xs font-medium text-neutral-700 group-hover:text-primary-yellow text-center transition-colors">
                                {city.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex gap-6 border-b border-neutral-100 mb-4">
                    {(Object.keys(SEARCH_SUGGESTIONS) as Category[]).map((category) => (
                        <button
                            key={category}
                            className={`pb-2 text-sm font-semibold transition-colors relative ${activeCategory === category
                                ? "text-neutral-800"
                                : "text-neutral-400 hover:text-neutral-600"
                                }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                            {activeCategory === category && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-800 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2">
                    {SEARCH_SUGGESTIONS[activeCategory].map((item, idx) => (
                        <button
                            key={idx}
                            className="px-4 py-2 rounded-full border border-neutral-200 text-xs font-medium text-neutral-600 hover:border-primary-yellow hover:text-primary-yellow hover:bg-primary-yellow/5 transition-all"
                            onClick={() => handleSelectSuggestion(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );

    return (
        <div className="relative flex-1" ref={containerRef}>
            {/* Search Input Trigger */}
            <div
                className="flex items-center gap-3 px-4 py-3 border-r border-neutral-100 w-full cursor-text"
                onClick={() => setIsOpen(true)}
            >
                <MapPin className={`text-neutral-400 transition-colors ${isOpen ? 'text-primary-yellow' : ''}`} size={20} />
                <input
                    type="text"
                    placeholder="Cari Kos, daerah, atau universitas terdekat"
                    className="w-full bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400 text-sm"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                />
            </div>

            {/* Desktop Popover */}
            <SearchPopover isOpen={isOpen} className="w-[480px]">
                <SearchContent />
            </SearchPopover>
        </div>
    );
};
