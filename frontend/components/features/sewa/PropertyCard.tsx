"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface PropertyProps {
  id: string | number;
  image: string;
  name: string;
  type: "Putra" | "Putri";
  area: string;
  distance: string;
  price: string;
}

export const PropertyCard = ({ property }: { property: PropertyProps }) => {
  return (
    <Link
      href={`/sewa/${property.id}`}
      className="bg-white rounded-2xl border border-neutral-100 overflow-hidden 
                    hover:shadow-lg transition-shadow group flex flex-col h-full block"
    >

      {/* Image */}
      <div className="relative w-full h-44 sm:h-52 lg:h-56">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <Badge
          className="absolute top-3 left-3 sm:top-4 sm:left-4
                     bg-primary-yellow/90 text-white text-[10px] sm:text-xs
                     font-bold px-2 sm:px-3 py-1 border-0"
        >
          {property.type}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-base sm:text-lg text-primary-violet
                     mb-1 line-clamp-2
                     group-hover:text-primary-yellow transition-colors"
        >
          {property.name}
        </h3>

        <p className="text-[11px] sm:text-xs text-neutral-400 font-medium mb-2">
          {property.area}
        </p>

        <div className="flex items-center gap-1 text-neutral-500 text-[11px] sm:text-xs">
          <MapPin size={14} className="sm:size-[16px]" />
          <span>{property.distance}</span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t border-dashed border-neutral-100">
          <div className="flex items-end gap-1">
            <span className="text-[11px] sm:text-xs text-neutral-400 mb-1">
              mulai dari
            </span>
            <span className="font-bold text-primary-violet text-sm sm:text-base">
              {property.price}
            </span>
            <span className="text-[11px] sm:text-xs text-neutral-400 mb-1">
              /bulan
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
