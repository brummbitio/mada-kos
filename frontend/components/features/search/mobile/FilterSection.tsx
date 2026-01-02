"use client";

import { SlidersHorizontal, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { useFilterLogic } from "../hooks/useFilterLogic";

export const FilterSection = ({
  active,
  onOpen,
}: {
  active: boolean;
  onOpen: () => void;
}) => {
  const {
    gender, toggleGender,
    sortBy, toggleSortBy,
    sharedFacilities, setSharedFacilities,
    roomFacilities, setRoomFacilities
  } = useFilterLogic();

  return (
    <div className="bg-white rounded-2xl p-4">
      <button
        onClick={onOpen}
        className="w-full flex justify-between items-center"
      >
        <h3 className="font-semibold text-base">Filter</h3>
        <SlidersHorizontal size={18} />
      </button>

      {active && (
        <div className="mt-6 space-y-6">

          {/* Gender */}
          <div>
            <p className="text-sm font-bold text-neutral-800 mb-3">Tipe Kos</p>
            <div className="flex gap-2">
              <button
                onClick={() => toggleGender("Putra")}
                className={`flex-1 py-2 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-medium
                        ${gender === "Putra" ? 'border-primary-yellow bg-primary-yellow/5 text-primary-yellow' : 'border-neutral-200 text-neutral-600'}
                    `}
              >
                {gender === "Putra" && <Check size={14} />}
                Putra
              </button>
              <button
                onClick={() => toggleGender("Putri")}
                className={`flex-1 py-2 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-medium
                        ${gender === "Putri" ? 'border-primary-yellow bg-primary-yellow/5 text-primary-yellow' : 'border-neutral-200 text-neutral-600'}
                    `}
              >
                {gender === "Putri" && <Check size={14} />}
                Putri
              </button>
            </div>
          </div>

          {/* Price Sort */}
          <div>
            <p className="text-sm font-bold text-neutral-800 mb-3">Harga</p>
            <div className="flex gap-2">
              <button
                onClick={() => toggleSortBy("lowest")}
                className={`flex-1 py-2 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-medium
                        ${sortBy === "lowest" ? 'border-primary-yellow bg-primary-yellow/5 text-primary-yellow' : 'border-neutral-200 text-neutral-600'}
                    `}
              >
                Terendah
              </button>
              <button
                onClick={() => toggleSortBy("highest")}
                className={`flex-1 py-2 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-medium
                        ${sortBy === "highest" ? 'border-primary-yellow bg-primary-yellow/5 text-primary-yellow' : 'border-neutral-200 text-neutral-600'}
                    `}
              >
                Tertinggi
              </button>
            </div>
          </div>

          {/* Shared Facilities */}
          <div>
            <h3 className="font-bold text-neutral-800 mb-4 text-sm">Fasilitas Bersama</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <Checkbox label="Dapur" checked={sharedFacilities.dapur} onChange={(v) => setSharedFacilities(prev => ({ ...prev, dapur: v }))} />
              <Checkbox label="Bebas Jam Malam" checked={sharedFacilities.bebasJamMalam} onChange={(v) => setSharedFacilities(prev => ({ ...prev, bebasJamMalam: v }))} />
              <Checkbox label="Security" checked={sharedFacilities.security} onChange={(v) => setSharedFacilities(prev => ({ ...prev, security: v }))} />
              <Checkbox label="CCTV 24 Jam" checked={sharedFacilities.cctv} onChange={(v) => setSharedFacilities(prev => ({ ...prev, cctv: v }))} />
              <Checkbox label="Parkir Mobil" checked={sharedFacilities.parkirMobil} onChange={(v) => setSharedFacilities(prev => ({ ...prev, parkirMobil: v }))} />
              <Checkbox label="Laundry Room" checked={sharedFacilities.laundry} onChange={(v) => setSharedFacilities(prev => ({ ...prev, laundry: v }))} />
              <Checkbox label="Parkir Motor" checked={sharedFacilities.parkirMotor} onChange={(v) => setSharedFacilities(prev => ({ ...prev, parkirMotor: v }))} />
            </div>
          </div>

          {/* Room Facilities */}
          <div>
            <h3 className="font-bold text-neutral-800 mb-4 text-sm">Fasilitas Kamar</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <Checkbox label="AC" checked={roomFacilities.ac} onChange={(v) => setRoomFacilities(prev => ({ ...prev, ac: v }))} />
              <Checkbox label="Kamar Mandi Dalam" checked={roomFacilities.kamarMandiDalam} onChange={(v) => setRoomFacilities(prev => ({ ...prev, kamarMandiDalam: v }))} />
              <Checkbox label="Televisi" checked={roomFacilities.televisi} onChange={(v) => setRoomFacilities(prev => ({ ...prev, televisi: v }))} />
              <Checkbox label="Wi-Fi" checked={roomFacilities.wifi} onChange={(v) => setRoomFacilities(prev => ({ ...prev, wifi: v }))} />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
