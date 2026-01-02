"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Video } from "lucide-react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface HeroGalleryProps {
    mainImage: string;
    galleryImages: string[];
    title?: string;
}

type TabType = "360" | "foto";

export const HeroGallery = ({
    mainImage,
    galleryImages,
    title = "Detail Properti",
}: HeroGalleryProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>("foto");

    /** LIGHTBOX */
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    /** SCROLL TARGET */
    const [scrollToIndex, setScrollToIndex] = useState<number | null>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const allImages = [mainImage, ...galleryImages];
    const displayImages = allImages.slice(0, 5);
    const remainingCount = allImages.length - 5;

    const toggleModal = (state: boolean) => {
        setIsModalOpen(state);
        document.body.style.overflow = state ? "hidden" : "unset";
    };

    /** AUTO SCROLL SAAT MODAL TERBUKA */
    useEffect(() => {
        if (isModalOpen && scrollToIndex !== null) {
            const el = imageRefs.current[scrollToIndex];
            if (el) {
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }, [isModalOpen, scrollToIndex]);

    return (
        <>
            {/* ================= HERO GRID ================= */}
            <div className="grid grid-cols-4 grid-rows-4 gap-1 h-[300px] md:h-[480px] rounded-lg overflow-hidden">

                {/* MAIN IMAGE */}
                <div
                    className="relative col-span-2 row-span-4 cursor-pointer"
                    onClick={() => {
                        setScrollToIndex(0);
                        toggleModal(true);
                    }}
                >
                    <Image src={displayImages[0]} alt="Main" fill className="object-cover" />
                </div>

                {displayImages.slice(1).map((img, i) => (
                    <div
                        key={i}
                        className={`relative cursor-pointer ${i === 0 ? "col-start-3 row-start-1 row-span-2" :
                            i === 1 ? "col-start-4 row-start-1 row-span-2" :
                                i === 2 ? "col-start-3 row-start-3 row-span-2" :
                                    "col-start-4 row-start-3 row-span-2"
                            }`}
                        onClick={() => {
                            setScrollToIndex(i + 1);
                            toggleModal(true);
                        }}
                    >
                        <Image src={img} alt="" fill className="object-cover" />

                        {i === 3 && remainingCount > 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                                +{remainingCount} Foto
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* ================= MODAL ================= */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col">

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-6 py-4 bg-primary-violet text-white">
                        <button
                            onClick={() => toggleModal(false)}
                            className="p-2 hover:bg-white/10 rounded-full"
                        >
                            <X />
                        </button>

                        <div className="flex gap-6 text-sm font-medium">
                            <button
                                onClick={() => setActiveTab("360")}
                                className={activeTab === "360" ? "border-b-2" : "opacity-60"}
                            >
                                360
                            </button>
                            <button
                                onClick={() => setActiveTab("foto")}
                                className={activeTab === "foto" ? "border-b-2" : "opacity-60"}
                            >
                                Foto
                            </button>
                        </div>

                        <div className="w-8" />
                    </div>

                    {/* BODY */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="max-w-2xl mx-auto">

                            {/* FOTO TAB */}
                            {activeTab === "foto" && (
                            <div className="space-y-8 max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {allImages.map((img, idx) => {
                                        const isLarge = idx % 3 === 0;

                                        return (
                                            <div
                                                key={idx}
                                                ref={(el) => {
                                                    imageRefs.current[idx] = el;
                                                }}
                                                onClick={() => {
                                                    setLightboxIndex(idx);
                                                    setLightboxOpen(true);
                                                }}
                                                className={`relative cursor-pointer overflow-hidden rounded-md bg-gray-200
                          ${isLarge ? "md:col-span-2 aspect-[16/9]" : "aspect-video"}
                        `}
                                            >
                                                <Image src={img} alt="" fill className="object-cover" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            )}

                            {/* VIDEO TAB */}
                            {activeTab === "360" && (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                                    <Video className="w-16 h-16 mb-4" />
                                    <p>Tidak ada video tersedia</p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}

            {/* ================= LIGHTBOX ================= */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={allImages.map((src) => ({ src }))}
                carousel={{ imageFit: "contain" }}
                styles={{
                    container: {
                        backgroundColor: "rgba(0,0,0,0.7)",
                    },
                    slide: {
                        maxWidth: "900px",
                        margin: "0 auto",
                        padding: "24px",
                    },
                }}
            />
        </>
    );
};
