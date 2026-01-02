"use client";

import { SlidersHorizontal, X, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { useFilterLogic } from "../hooks/useFilterLogic";

export const SearchFilter = () => {
    const {
        isOpen, setIsOpen,
        gender, toggleGender,
        sortBy, toggleSortBy,
        sharedFacilities, setSharedFacilities,
        roomFacilities, setRoomFacilities,
        reset
    } = useFilterLogic();

    return (
        <>
            {/* Trigger Button */}
            <button
                className={`p-3 rounded-lg transition-colors ${isOpen ? 'bg-primary-yellow/10 text-primary-yellow' : 'text-neutral-500 hover:bg-neutral-50'}`}
                onClick={() => setIsOpen(true)}
            >
                <SlidersHorizontal size={20} />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                    <div className="relative z-10 bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col max-h-[75vh] animate-in fade-in zoom-in-95 duration-200">

                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-neutral-100">
                            <h2 className="text-xl font-bold text-neutral-900">Filter Pencarian</h2>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                                <X size={24} className="text-neutral-500" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">

                            {/* Gender Section */}
                            <div className="mb-8">
                                <h3 className="font-bold text-neutral-800 mb-4">Tipe Kos</h3>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => toggleGender("Putra")}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2
                                ${gender === "Putra" ? 'border-primary-yellow bg-primary-yellow/5 text-primary-yellow font-bold' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}
                            `}
                                    >
                                        {gender === "Putra" && <Check size={18} />}
                                        Putra
                                    </button>
                                    <button
                                        onClick={() => toggleGender("Putri")}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2
                                ${gender === "Putri" ? 'border-primary-yellow bg-primary-yellow/5 text-primary-yellow font-bold' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}
                            `}
                                    >
                                        {gender === "Putri" && <Check size={18} />}
                                        Putri
                                    </button>
                                </div>
                            </div>

                            {/* Sort Price Section */}
                            <div className="mb-8">
                                <h3 className="font-bold text-neutral-800 mb-4">Urutkan Harga</h3>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => toggleSortBy("lowest")}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium
                                ${sortBy === "lowest" ? 'border-primary-yellow bg-primary-yellow/5 text-primary-yellow' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}
                            `}
                                    >
                                        Harga Terendah
                                    </button>
                                    <button
                                        onClick={() => toggleSortBy("highest")}
                                        className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium
                                ${sortBy === "highest" ? 'border-primary-yellow bg-primary-yellow/5 text-primary-yellow' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}
                            `}
                                    >
                                        Harga Tertinggi
                                    </button>
                                </div>
                            </div>

                            {/* Shared Facilities */}
                            <div className="mb-8">
                                <h3 className="font-bold text-neutral-800 mb-4">Fasilitas Bersama</h3>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                    <Checkbox label="Dapur" checked={sharedFacilities.dapur} onChange={(v) => setSharedFacilities(prev => ({ ...prev, dapur: v }))} />
                                    <Checkbox label="Bebas Jam Malam" checked={sharedFacilities.bebasJamMalam} onChange={(v) => setSharedFacilities(prev => ({ ...prev, bebasJamMalam: v }))} />
                                    <Checkbox label="Security" checked={sharedFacilities.security} onChange={(v) => setSharedFacilities(prev => ({ ...prev, security: v }))} />
                                    <Checkbox label="CCTV 24 Jam" checked={sharedFacilities.cctv} onChange={(v) => setSharedFacilities(prev => ({ ...prev, cctv: v }))} />
                                    <Checkbox label="Parkir Mobil" checked={sharedFacilities.parkirMobil} onChange={(v) => setSharedFacilities(prev => ({ ...prev, parkirMobil: v }))} />
                                    <Checkbox label="Laundry Room" checked={sharedFacilities.laundry} onChange={(v) => setSharedFacilities(prev => ({ ...prev, laundry: v }))} />
                                    <Checkbox label="Parkir Motor" checked={sharedFacilities.parkirMotor} onChange={(v) => setSharedFacilities(prev => ({ ...prev, parkirMotor: v }))} />
                                    <Checkbox label="Cleaning Service" checked={sharedFacilities.cleaningService} onChange={(v) => setSharedFacilities(prev => ({ ...prev, cleaningService: v }))} />
                                </div>
                            </div>

                            {/* Room Facilities */}
                            <div>
                                <h3 className="font-bold text-neutral-800 mb-4">Fasilitas Kamar</h3>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                                    <Checkbox label="AC" checked={roomFacilities.ac} onChange={(v) => setRoomFacilities(prev => ({ ...prev, ac: v }))} />
                                    <Checkbox label="Kamar Mandi Dalam" checked={roomFacilities.kamarMandiDalam} onChange={(v) => setRoomFacilities(prev => ({ ...prev, kamarMandiDalam: v }))} />
                                    <Checkbox label="Televisi" checked={roomFacilities.televisi} onChange={(v) => setRoomFacilities(prev => ({ ...prev, televisi: v }))} />
                                    <Checkbox label="Diffuser" checked={roomFacilities.diffuser} onChange={(v) => setRoomFacilities(prev => ({ ...prev, diffuser: v }))} />
                                    <Checkbox label="Smart Key" checked={roomFacilities.smartKey} onChange={(v) => setRoomFacilities(prev => ({ ...prev, smartKey: v }))} />
                                    <Checkbox label="Jendela Luar" checked={roomFacilities.jendelaLuar} onChange={(v) => setRoomFacilities(prev => ({ ...prev, jendelaLuar: v }))} />
                                    <Checkbox label="Wi-Fi" checked={roomFacilities.wifi} onChange={(v) => setRoomFacilities(prev => ({ ...prev, wifi: v }))} />
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-neutral-100 flex justify-end gap-3">
                            <Button variant="secondary-outline" className="border-neutral-200 text-neutral-600 px-6 rounded-xl h-12" onClick={() => setIsOpen(false)}>
                                Batal
                            </Button>
                            <Button className="bg-primary-yellow text-white px-8 rounded-xl h-12 shadow-lg shadow-primary-yellow/25 hover:bg-primary-yellow-700 hover:text-white" onClick={() => setIsOpen(false)}>
                                Terapkan Filter
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};
