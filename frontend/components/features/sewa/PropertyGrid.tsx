"use client";

import { PropertyCard } from "./PropertyCard";
import { PROPERTIES_DATA } from "@/data/properties";

export const PropertyGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {PROPERTIES_DATA.map((prop) => {
                // Derived data for display
                // 1. Area: Simplification from address or hardcoded logic if needed. 
                //    Data: "Jl. Candi Kalasan I No 1996, Blimbing, Kec. Lowokwaru"
                //    Target: "Blimbing, Lowokwaru"
                const areaParts = prop.address.split(',');
                const area = areaParts.length > 2
                    ? `${areaParts[1].trim()}, ${areaParts[2].replace('Kec.', '').trim()}`
                    : prop.city;

                // 2. Distance: Get first university distance
                const university = prop.nearby.find(n => n.category === "Universitas")?.items[0];
                const distance = university
                    ? `${university.distance} dari ${university.name}`
                    : `${prop.city}`;

                return (
                    <PropertyCard
                        key={prop.id}
                        property={{
                            id: prop.id,
                            name: prop.name,
                            type: prop.type as "Putra" | "Putri",
                            image: prop.mainImage,
                            area: area,
                            distance: distance,
                            price: prop.price
                        }}
                    />
                );
            })}
        </div>
    )
}
