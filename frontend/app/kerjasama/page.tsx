"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { Check, ClipboardList, Settings, TrendingUp, Globe, ChevronRight, ChevronLeft, Phone } from "lucide-react";

export default function KerjasamaPage() {
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
                    src="/assets/hero-kerjasama1.png"
                    alt="Mada Kos Hero"
                    fill
                    className="object-cover"
                    priority
                />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="max-w-4xl">
                        <h4 className="text-white font-semibold mb-2">Jadi Pemilik Kos di Mada</h4>
                        <h1 className="text-4xl md:text-4xl font-bold mb-4 leading-tight">
                            Kelola Kos Lebih Menguntungkan Bersama Mada
                        </h1>
                        <p className="text-neutral-200 mb-8 text-md leading-relaxed">
                            Titipkan pengelolaan kos Anda ke Mada untuk pendapatan lebih stabil tanpa repot urusan harian.
                        </p>
                        <Button className="bg-[#B99D6B] text-white border-none hover:bg-[#A68A59] rounded-xl px-8 py-3 font-semibold flex items-center gap-2">
                            <Phone size={18} />
                            Hubungi Tim Mada
                        </Button>
                    </div>
                </div>
            </section>

            {/* 2. BENEFITS SECTION */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">

                    {/* Left: Benefits Grid */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-primary-violet mb-10">Kenapa Perlu Jadi Pemilik di Mada?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12">
                            {[
                                { icon: ClipboardList, title: "Pelaporan Keuangan Transparan", desc: "Mada menyajikan laporan keuangan rutin dan mudah dipahami. Anda mengetahui arus pemasukan dan pengeluaran tanpa perlu mengecek satu per satu." },
                                { icon: Settings, title: "Pengelolaan Tanpa Repot", desc: "Pemilik tidak perlu turun langsung mengurus operasional kos. Seluruh aktivitas harian dikelola oleh manajemen Mada." },
                                { icon: TrendingUp, title: "Layanan Penghuni Terpusat", desc: "Mada menangani kebutuhan penghuni mulai dari komplain, perawatan, hingga komunikasi harian agar hunian tetap nyaman dan tertib." },
                                { icon: Globe, title: "Akses Website untuk Monitoring", desc: "Anda memantau performa kost melalui website Mada. Informasi pengelolaan dan laporan tersedia secara terstruktur dan mudah diakses." }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    {/* Wrapper Icon & Title */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-primary-yellow rounded-lg">
                                            <item.icon size={45} />
                                        </div>
                                        <h3 className="font-bold text-md text-primary-violet leading-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                    
                                    {/* Description tetap di bawah */}
                                    <p className="text-sm text-neutral-500 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Stats Card */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="bg-primary-yellow text-white rounded-2xl p-8 w-full max-w-[200px] h-[450px] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                            {/* Decorative circles */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                            <div className="mb-8 text-center pb-8 border-b border-white/20">
                                <p className="text-sm font-medium mb-1 opacity-90">Tingkat Okupansi</p>
                                <div className="text-5xl font-bold flex items-center justify-center gap-2">
                                    <TrendingUp size={40} />
                                    99%
                                </div>
                            </div>

                            <div className="mb-8 text-center pb-8 border-b border-white/20">
                                <p className="text-sm font-medium mb-1 opacity-90">Tingkat Kepuasan Pemilik Kos</p>
                                <div className="flex justify-center gap-1 text-white mt-1">
                                    {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-sm font-medium mb-1 opacity-90">Tingkat Kepuasan Penghuni Kos</p>
                                <div className="flex justify-center gap-1 text-white mt-1">
                                    {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. STEPS SECTION */}
            <section className="py-10 bg-neutral-50 text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-primary-violet mb-16">3 Langkah untuk Jadi Pemilik di Mada</h2>

                    <div className="relative flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[25px] left-0 right-0 h-[2px] bg-[#D1C5A5] -z-0"></div>

                        {[
                            { step: "1", title: "Daftarkan Properti", desc: "Hubungi Admin Mada untuk survey dan kesepakatan awal." },
                            { step: "2", title: "Tanda Tangan Kontrak", desc: "Lakukan negosiasi dan penandatanganan kontrak." },
                            { step: "3", title: "Nikmati Hasilnya", desc: "Properti dikelola Mada dan terima pendapatan rutin." }
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center bg-transparent w-64 mb-10 md:mb-0">
                                <div className="w-14 h-14 rounded-full bg-[#C1A87D] text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg border-4 border-neutral-50">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg text-primary-violet mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. TESTIMONIAL SECTION */}
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
                                Kata Pemilik Kos Mada
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

            {/* 5. CTA Section */}
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
                    Daftarkan Kost-an Anda & Rasakan Keuntungannya
                </h1>
                <Button variant="primary" size="lg" className="!rounded-full shadow-lg shadow-black/20 border-none">
                    Hubungi Tim Mada
                </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
