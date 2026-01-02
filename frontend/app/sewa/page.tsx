"use client";

import { FilterSidebar } from "@/components/features/sewa/FilterSidebar";
import { PropertyGrid } from "@/components/features/sewa/PropertyGrid";
import { Footer } from "@/components/layout/Footer";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function SewaPage() {
    return (
        <div className="min-h-screen">
            {/* Breadcrumbs / Header area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-30">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "Sewa", active: true }
                    ]}
                    className="mb-8"
                />

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto hide-scrollbar">
                        <FilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="w-full px-4 md:px-6 lg:px-8">
                        <PropertyGrid />
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
