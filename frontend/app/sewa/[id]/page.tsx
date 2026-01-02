import { notFound } from "next/navigation";
import { PROPERTIES_DATA } from "@/data/properties";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Footer } from "@/components/layout/Footer";
import { HeroGallery } from "@/components/features/sewa/detail/HeroGallery";
import { PropertyHeader } from "@/components/features/sewa/detail/PropertyHeader";
import { LocationSection } from "@/components/features/sewa/detail/LocationSection";
import { BookingWidget } from "@/components/features/sewa/detail/BookingWidget";
import { FloorPlan } from "@/components/features/sewa/detail/FloorPlan";
import { RoomList } from "@/components/features/sewa/detail/RoomList";
import { RulesSection } from "@/components/features/sewa/detail/RulesSection";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
    const { id } = await params;

    const property = PROPERTIES_DATA.find(
        (p) => p.id === id || p.slug === id
    );

    if (!property) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "Sewa", href: "/sewa" },
                        { label: property.name, active: true }
                    ]}
                    className="mb-8"
                />

                <HeroGallery
                    mainImage={property.mainImage}
                    galleryImages={property.galleryImages}
                />

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <PropertyHeader property={property} />

                        <div className="space-y-4">
                            {property.description.map((desc, idx) => (
                                <p key={idx} className="text-neutral-600 leading-relaxed text-sm md:text-base">
                                    {desc}
                                </p>
                            ))}
                        </div>

                        <LocationSection property={property} />

                        <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <h4 className="font-bold text-neutral-900 mb-1">Visit Kos</h4>
                                    <p className="text-xs text-neutral-500">
                                        Jika kamu ingin melihat kos secara langsung, kami bisa memandu.
                                    </p>
                                </div>
                                <button className="bg-white border border-neutral-200 px-4 py-2 rounded-lg text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-colors whitespace-nowrap">
                                    Jadwalkan Visit
                                </button>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-neutral-100">
                            <h3 className="text-xl font-bold text-neutral-900 mb-6 font-primary">Denah Kos</h3>
                            <FloorPlan floorPlan={property.floorPlan} />
                            <div className="mt-8">
                                <RoomList rooms={property.roomTypes} />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-neutral-100">
                            <RulesSection rules={property.rules} />
                        </div>

                        <div className="pt-8 border-t border-neutral-100">
                            <h3 className="font-bold text-neutral-900 mb-2">Tentang Kos Abina A</h3>
                            <p className="text-sm text-neutral-500">
                                {property.description[0]}
                            </p>
                        </div>
                    </div>

                    {/* Right Sticky Sidebar (Booking Widget) */}
                    <div className="lg:col-span-4">
                        <BookingWidget price={property.price} period="/bulan" />
                    </div>
                </div>
            </div>

            <section className="bg-neutral-900 py-12 mt-12 relative overflow-hidden">
                {/* Footer CTA Background */}
                <div className="absolute inset-0 bg-[#1A1A1A]" />
                <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
                    <h2 className="text-2xl font-bold text-white mb-6">Yuk cari Kost-an idamanmu sekarang</h2>
                    <button className="bg-primary-yellow hover:bg-primary-yellow-700 text-white font-bold px-8 py-3 rounded-full transition-colors">
                        Cari Sekarang
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
