"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useLocationLogic, POPULAR_KOS, SEARCH_SUGGESTIONS, Category } from "../hooks/useLocationLogic";

export const LocationSection = ({
  active,
  onOpen,
}: {
  active: boolean;
  onOpen: () => void;
}) => {
  const {
    activeCategory, setActiveCategory,
    searchValue, setSearchValue,
    handleSelectSuggestion
  } = useLocationLogic();

  return (
    <div className="bg-white rounded-2xl p-4">
      {/* HEADER */}
      <button
        onClick={onOpen}
        className="w-full flex justify-between items-center"
      >
        <h3 className="font-semibold text-base">Di mana?</h3>
        <span className="text-sm text-neutral-400">{searchValue || "Pilih Lokasi"}</span>
      </button>

      {/* CONTENT */}
      {active && (
        <div className="mt-4 space-y-5">
          {/* Search Input */}
          <div className="flex items-center border rounded-full px-4 py-3 gap-2">
            <Search size={18} className="text-neutral-400" />
            <input
              className="flex-1 outline-none text-sm"
              placeholder="Cari lokasi, nama gedung atau landmark"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* Quick Locations (Popular) */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {POPULAR_KOS.map((item, idx) => (
              <div key={idx} className="min-w-[120px] cursor-pointer" onClick={() => handleSelectSuggestion(item.name)}>
                <div className="relative h-20 rounded-xl overflow-hidden mb-2 bg-neutral-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b text-sm font-semibold">
            {(Object.keys(SEARCH_SUGGESTIONS) as Category[]).map((category) => (
              <button
                key={category}
                className={`pb-2 transition-colors ${activeCategory === category
                  ? "border-b-2 border-black text-neutral-900"
                  : "text-neutral-400"
                  }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {SEARCH_SUGGESTIONS[activeCategory].map((item, idx) => (
              <button
                key={idx}
                className="px-4 py-2 rounded-full border text-sm text-neutral-600 hover:bg-neutral-50"
                onClick={() => handleSelectSuggestion(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
