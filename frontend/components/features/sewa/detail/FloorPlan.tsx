"use client";

import { useState } from "react";
import Image from "next/image";
import { PropertyDetail } from "@/data/properties";

interface FloorPlanProps {
    floorPlan: PropertyDetail['floorPlan'];
}

export const FloorPlan = ({ floorPlan }: FloorPlanProps) => {
    const [activeFloor, setActiveFloor] = useState(floorPlan[0].floorLabel);

    const activeImage = floorPlan.find(fp => fp.floorLabel === activeFloor)?.imageUrl;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-neutral-900">Denah Kos</h3>

            {/* Tabs */}
            <div className="flex justify-center mb-6">
                <div className="inline-flex bg-neutral-100 p-1 rounded-xl">
                    {floorPlan.map((fp) => (
                        <button
                            key={fp.floorLabel}
                            onClick={() => setActiveFloor(fp.floorLabel)}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeFloor === fp.floorLabel
                                    ? "bg-primary-yellow text-white shadow-sm"
                                    : "text-neutral-500 hover:text-neutral-900"
                                }`}
                        >
                            {fp.floorLabel}
                        </button>
                    ))}
                </div>
            </div>

            {/* Floor Plan Image */}
            <div className="border border-neutral-200 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[300px] bg-neutral-50/50">
                {/* 
                   Since we might not have real floor plan images, we can use a placeholder diagram 
                   or just the image if available. For this mock, I'll use a placeholder text if image fails 
                   or just the image tag.
                 */}
                {activeImage ? (
                    <div className="relative w-full h-[300px] md:h-[400px]">
                        <Image
                            src={activeImage}
                            alt={`Denah ${activeFloor}`}
                            fill
                            className="object-contain"
                        />
                        {/* Fallback visual for the mock if image is missing/broken (since we use dummy paths) */}
                        <div className="absolute inset-0 flex items-center justify-center -z-10 text-neutral-400">
                            Image Placeholder for {activeFloor}
                        </div>
                    </div>
                ) : (
                    <div className="text-neutral-400">Denah tidak tersedia</div>
                )}
            </div>
        </div>
    );
};
