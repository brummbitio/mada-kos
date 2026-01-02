import { Badge } from "@/components/ui/Badge";
import * as LucideIcons from "lucide-react";
import { PropertyDetail } from "@/data/properties";

interface PropertyHeaderProps {
    property: PropertyDetail;
}

export const PropertyHeader = ({ property }: PropertyHeaderProps) => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{property.name}</h1>
                <p className="text-neutral-500 mb-1">{property.address}, {property.city}</p>
                <div className="flex gap-2 mt-2">
                    <Badge className="bg-primary-violet/10 text-primary-violet border-none">
                        {property.type}
                    </Badge>
                    {property.rating && (
                        <Badge className="bg-primary-yellow/10 text-primary-yellow-700 border-none">
                            ★ {property.rating}
                        </Badge>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-lg text-neutral-900">Fasilitas Bersama</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                    {property.facilities.map((fac, idx) => {
                        // Dynamically render icon if it exists in Lucide, fallback to circle
                        const IconComponent = (LucideIcons as any)[fac.icon] || LucideIcons.CheckCircle2;

                        return (
                            <div key={idx} className="flex items-center gap-2 text-neutral-600">
                                <IconComponent size={18} className="text-neutral-400" />
                                <span className="text-sm">{fac.label}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2">
                    <LucideIcons.CheckCircle2 size={14} className="text-green-500" />
                    <span>Free cleaning service</span>
                </div>
            </div>
        </div>
    );
};
