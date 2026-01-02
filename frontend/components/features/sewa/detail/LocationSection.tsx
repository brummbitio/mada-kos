"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { PropertyDetail } from "@/data/properties";

interface LocationSectionProps {
    property: PropertyDetail;
}

export const LocationSection = ({ property }: LocationSectionProps) => {
    const [activeTab, setActiveTab] = useState(property.nearby[0].category);

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-neutral-900">Lokasi</h3>

            {/* Map Placeholder */}
            <div className="relative w-full h-64 bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 group">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-7.943,112.639&zoom=15&size=800x400&sensor=false&visual_refresh=true')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm text-center">
                        <MapPin className="mx-auto text-primary-violet mb-2" size={32} />
                        <p className="font-bold text-neutral-900 text-sm">{property.address}</p>
                        <p className="text-neutral-500 text-xs mt-1">Klik untuk melihat di Google Maps</p>
                    </div>
                </div>
            </div>

            {/* Address Text */}
            <div className="flex items-start gap-2 text-sm text-neutral-600">
                <MapPin size={18} className="mt-0.5 min-w-[18px]" />
                <p>{property.address}, {property.city}, {property.province} {property.postalCode}</p>
            </div>

            {/* Nearby Tabs */}
            <div className="space-y-4">
                <div className="flex gap-6 border-b border-neutral-200 overflow-x-auto hide-scrollbar">
                    {property.nearby.map((group) => (
                        <button
                            key={group.category}
                            onClick={() => setActiveTab(group.category)}
                            className={`pb-3 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === group.category
                                    ? "text-primary-violet"
                                    : "text-neutral-400 hover:text-neutral-600"
                                }`}
                        >
                            {group.category}
                            {activeTab === group.category && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-violet rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="space-y-3">
                    {property.nearby
                        .find((g) => g.category === activeTab)
                        ?.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <span className="font-medium text-neutral-700 flex items-center gap-2">
                                    {/* Simple Icon based on category could go here */}
                                    {item.name}
                                </span>
                                <span className="text-neutral-400">{item.distance}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
