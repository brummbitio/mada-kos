"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { LocationSection } from "./LocationSection";
import { DateSection } from "./DateSection";
import { FilterSection } from "./FilterSection";

export const MobileSearchFlow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"location" | "date" | "filter" | null>("location");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      // Lock scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      // Unlock scroll
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // --- KOMPONEN TRIGGER (TETAP DI HALAMAN) ---
  const TriggerButton = (
    <div
      className="bg-white rounded-full shadow-lg border border-neutral-200 p-3 flex items-center gap-3 cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      <Search className="text-primary-yellow ml-2" size={20} />
      <div className="flex-1 text-left">
        <p className="text-sm font-semibold text-neutral-800">Mau cari kos di mana?</p>
        <p className="text-xs text-neutral-400">Jatimulyo • Mulai Rp750rb</p>
      </div>
    </div>
  );

  // --- KOMPONEN MODAL (YANG DI-PORTAL) ---
  const ModalContent = (
    <div className="fixed inset-0 z-[9999] bg-[#FAF7F2] flex flex-col h-screen w-screen animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="px-4 py-4 border-b bg-white flex justify-between items-center shrink-0">
        <span className="font-semibold text-lg text-neutral-900">Cari Kos</span>
        <button onClick={() => setIsOpen(false)} className="p-2">
          <X size={24} className="text-neutral-500" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4 pb-24">
        <LocationSection active={activeSection === "location"} onOpen={() => setActiveSection("location")} />
        <DateSection active={activeSection === "date"} onOpen={() => setActiveSection("date")} />
        <FilterSection active={activeSection === "filter"} onOpen={() => setActiveSection("filter")} />
      </div>

      {/* Footer Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex justify-between items-center">
        <button className="text-sm underline text-neutral-500 font-medium">Reset</button>
        <button 
            className="bg-primary-violet text-white px-6 py-3 rounded-xl text-sm font-bold"
            onClick={() => setIsOpen(false)}
        >
          Terapkan Filter
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Selalu render trigger di halaman agar tidak hilang */}
      {TriggerButton}

      {/* Hanya render portal jika isOpen dan sudah mounted di client */}
      {isOpen && mounted && typeof document !== "undefined"
        ? createPortal(ModalContent, document.body)
        : null}
    </>
  );
};