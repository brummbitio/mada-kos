"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function TentangMadaPage() {
    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(true);
    const animateSlide = (nextIndex: number) => {
        setFade(false);
        setTimeout(() => {
            setCurrent(nextIndex);
            setFade(true);
        }, 300);
    };

    const nextSlide = () => {
        animateSlide((current + 1) % testimonials.length);
    };

    const prevSlide = () => {
        animateSlide(
            current === 0 ? testimonials.length - 1 : current - 1
        );
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [current]);

    const testimonials = [
        {
            image: "/assets/kos-1.png",
            title: "Kos Abina A",
            quote:
            "Pelaporan keuangan transparan, kamar cepat terisi, gedung terawat, pelayanan komplit.",
            name: "Kari B. Claypool",
            role: "Pemilik Kos",
            avatar: "/assets/profile-1.png",
        },
        {
            image: "/assets/kos-2.png",
            title: "Kos Abina B",
            quote:
            "Manajemen sangat profesional, saya tinggal terima laporan tiap bulan.",
            name: "Rina Maheswari",
            role: "Pemilik Kos",
            avatar: "/assets/profile-2.png",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* 1. HERO SECTION */}
            <section className="relative h-[600px] flex items-center">
                <div className="absolute inset-0 overflow-hidden rounded-b-[40px] border-b-5 border-primary-yellow">
                    <Image
                        src="/assets/hero-tentang3.png"
                        alt="Hero Tentang Mada"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white text-center lg:text-left">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-4xl font-bold mb-6 leading-tight">
                            Manajemen Kos Eksklusif Terpercaya
                        </h1>
                        <p className="text-neutral-200 mb-8 leading-relaxed text-md">
                            Mada mengelola dan menyediakan kos melalui sistem digital terpusat. Pemilik dan pencari kos mendapatkan pengalaman yang lebih rapi, transparan, dan mudah diakses.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. BENEFITS SECTION (GRID) */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-primary-violet mb-10">Keuntungan Tinggal di Mada</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { img: "/assets/benefit-design.png", title: "Desain premium minimalist", desc: "Ruang bersih, rapi, dan nyaman untuk aktivitas harian." },
                        { img: "/assets/benefit-furnished.png", title: "Fully Furnished", desc: "Kamar siap huni dengan furnitur lengkap seperti AC, Water heater, dan Wi-Fi" },
                        { img: "/assets/benefit-service.png", title: "Layanan Lengkap", desc: "Pembersihan Kamar, Laundry, dan Tim Mada yang siap membantu" },
                        { img: "/assets/benefit-payment.png", title: "Pembayaran bulanan", desc: "Tersedia pembayaran bulanan yang membuat lebih ringan." },
                        { img: "/assets/benefit-website.png", title: "Website Multifungsi", desc: "Pemesanan kamar, layanan hingga pembayaran langsung lewat website." },
                        { img: "/assets/benefit-community.png", title: "Komunitas Penghuni", desc: "Lingkungan ramah dengan kegiatan bersama." },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-4 group">
                            <div className="relative h-48 w-full rounded-xl overflow-hidden shadow-sm">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary-violet mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. TESTIMONIAL */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image */}
                    <div
                        className={`relative h-[240px] md:h-[300px] lg:h-[320px] rounded-2xl overflow-hidden shadow-lg
                        transition-opacity duration-300
                        ${fade ? "opacity-100" : "opacity-0"}`}
                    >
                        <Image
                        src={testimonials[current].image}
                        alt={testimonials[current].title}
                        fill
                        className="object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-primary-yellow text-white text-xs font-bold px-3 py-1 rounded-md">
                        {testimonials[current].title}
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="flex flex-col justify-center p-6">
                        <div className="flex items-start gap-3">
                            <span className="text-[#B99D6B] text-6xl font-serif leading-none">“</span>
                            <h2 className="text-2xl font-bold text-primary-violet mt-2">
                                Kata Penghuni Kos Mada
                            </h2>
                        </div>
                        <div
                            className={`mb-6 flex gap-2 transition-opacity duration-300 delay-100
                            ${fade ? "opacity-100" : "opacity-0"}`}
                        >
                            <div>
                                    <p className="text-neutral-600 leading-relaxed italic text-sm">
                                        {testimonials[current].quote}
                                    </p>
                            </div>
                        </div>

                        <div
                            className={`flex items-center gap-4 mt-8 transition-opacity duration-300 delay-200
                            ${fade ? "opacity-100" : "opacity-0"}`}
                        >
                            <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                <Image
                                    src={testimonials[current].avatar}
                                    alt={testimonials[current].name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-primary-violet">
                                    {testimonials[current].name}
                                </p>
                                <p className="text-xs text-neutral-400">
                                    {testimonials[current].role}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-8">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 rounded-lg bg-primary-violet text-white flex items-center justify-center hover:bg-primary-violet/90"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 rounded-lg bg-primary-violet text-white flex items-center justify-center hover:bg-primary-violet/90"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SEKILAS TENTANG MADA */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-primary-violet mb-8">Sekilas Tentang Mada</h2>
                <div className="space-y-6 text-neutral-600 leading-relaxed text-justify">
                    <p>
                        Mada adalah layanan manajemen kost Eklusif yang dirancang untuk membawa profesionalisme dan efisiensi berbasis teknologi ke dalam pengelolaan properti sewa. Mada hadir untuk membantu pemilik properti mengelola aspek penyewaan, operasional, dan pemasaran dengan standar hospitality yang tinggi. Fokus utama Mada adalah menghadirkan sistem yang transparan, efisien, dan mudah dipantau bagi pemilik. Pendekatan berbasis teknologi ini sangat relevan dengan kebutuhan pasar hunian saat ini, di mana penyewa didominasi oleh Generasi Z (Gen Z) yang menuntut kepraktisan, kecepatan, dan pengalaman digital yang mulus. Komitmen ini telah terbukti melalui pencapaian seperti peningkatan okupansi rata-rata hingga 90% dan percepatan proses sewa berkat strategi pemasaran digital yang efektif.
                    </p>
                    <p>
                        Mada hadir untuk memberikan nilai lebih, baik bagi pemilik maupun penghuni. Kami memastikan properti terawat optimal melalui pemeliharaan rutin dan keamanan 24 jam. Dengan mengedepankan efisiensi, hospitality, dan inovasi, Mada menjadi pengelola yang mampu menciptakan lingkungan hunian yang aman, nyaman, dan terintegrasi secara digital, menjadikannya pilihan utama bagi Gen Z. Mada siap menjadi mitra terbaik yang mengelola properti pemilik secara optimal, dan sekaligus menjadi rumah kedua yang ideal bagi para penghuni.
                    </p>
                </div>
            </section>

            {/* 5. CTA BOTTOM */}
            <section className="relative h-[250px] flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden rounded-t-[40px] border-t-5 border-primary-yellow">
                <Image
                    src="/assets/cta.png"
                    alt="Mada Kos Hero"
                    fill
                    className="object-cover"
                    priority
                />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl sm:text-2xl font-bold text-white mb-4 leading-tight">
                    Yuk cari Kost-an idamanmu sekarang
                </h1>
                <Button variant="primary" size="lg" className="!rounded-full shadow-lg shadow-black/20 border-none">
                    Cari Sekarang
                </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
