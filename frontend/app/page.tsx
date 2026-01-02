"use client";

import Image from "next/image";
import { Search, MapPin, Calendar, SlidersHorizontal, Home as HomeIcon, ShieldCheck, Truck, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Footer } from "@/components/layout/Footer";
import { LocationSearch } from "@/components/features/search/desktop/LocationSearch";
import { DateSearch } from "@/components/features/search/desktop/DateSearch";
import { SearchFilter } from "@/components/features/search/desktop/SearchFilter";
import { MobileSearchFlow } from "@/components/features/search/mobile/MobileSearchFlow";
import { useState } from "react";

export default function Home() {
  const Kampus = [
    {
      name: 'Universitas Brawijaya',
      image: '/assets/universitas-brawijaya.png', // Sesuaikan dengan nama file aslimu
    },
    {
      name: 'Universitas Negeri Malang',
      image: '/assets/um.png',
    },
    {
      name: 'UIN Malang',
      image: '/assets/uin-malang.png',
    },
  ];
  const Keuntungan = [
    { 
      image: "/assets/keuntungan-1.png", 
      title: "Kos Siap Pakai", 
      desc: "Kos dilengkapi furniture lengkap termasuk AC, Wi-Fi, Water Heater, dan Diffuser." 
    },
    { 
      image: "/assets/keuntungan-2.png", 
      title: "Layanan Menyeluruh", 
      desc: "Ada pembersihan kamar dua kali sebulan dan pergantian seprai tanpa biaya tambahan" 
    },
    { 
      image: "/assets/keuntungan-3.png", 
      title: "Perpindahan Mudah", 
      desc: "Tersedia layanan pindahan tanpa biaya untuk penghuni baru." 
    },
    { 
      image: "/assets/keuntungan-4.png", 
      title: "Keamanan Sepanjang Hari", 
      desc: "Area Kos dijaga selama 24 jam" 
    },
  ];
  const Property = [
    {
      id: 1,
      name: "Kos Kosmea Putra A",
      type: "Putra",
      image: "/assets/kos-1.png",
      area: "Jatimulya, Lowokwaru",
      distance: "5.0 km dari Universitas Brawijaya",
      price: "Rp1.500.000",
    },
    {
      id: 2,
      name: "Kos Kosmea Putri B",
      type: "Putri",
      image: "/assets/kos-2.png",
      area: "Dinoyo, Lowokwaru",
      distance: "3.2 km dari Universitas Brawijaya",
      price: "Rp1.350.000",
    },
    {
      id: 3,
      name: "Kos Harmoni Putri",
      type: "Putri",
      image: "/assets/kos-3.png",
      area: "Ketawanggede",
      distance: "2.5 km dari Universitas Brawijaya",
      price: "Rp1.700.000",
    },
  ];
  const [activeFilter, setActiveFilter] = useState<"Putra" | "Putri">("Putra");
  const filteredProperty = Property.filter(
    (property) => property.type === activeFilter
  );
  const visibleProperty = filteredProperty.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Navbar disembunyikan jika Search terbuka */}

      {/* 1. Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 overflow-hidden rounded-b-[40px] border-b-5 border-primary-yellow">
          <Image
            src="/assets/hero2.png"
            alt="Mada Kos Hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left pt-20">
          <h1 className="text-4xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Bingung Kos nya di mana, MADA Solusinya!
          </h1>
          <p className="text-neutral-200 text-lg mb-10">
            Kelola properti dengan lebih mudah, atau temukan kos nyaman di Mada.
          </p>


          {/* MOBILE SEARCH FLOW */}
          <div className="block sm:hidden mt-6">
            <MobileSearchFlow />
          </div>
          {/* DESKTOP SEARCH FLOW */}
          <div className="hidden sm:flex bg-white rounded-4xl p-2 w-full shadow-2xl items-center gap-2">

            {/* Location Input */}
            <LocationSearch />

            {/* Date Input */}
            <DateSearch />

            {/* Actions */}
            <div className="flex items-center gap-2 px-2 w-full sm:w-auto mt-2 sm:mt-0">
              <SearchFilter />
              <Button className="w-full sm:w-auto !rounded-full px-8 h-12 text-base shadow-lg shadow-primary-yellow/25">
                <Search size={18} className="mr-2" />
                Cari Kos
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* 2. Campus Section */}
        <section>
          <h2 className="text-2xl font-bold text-primary-violet mb-8">Pilih Kos Dekat Kampusmu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Kampus.map((campus, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <Image
                    src={campus.image} // <--- Mengambil path gambar dari object
                    alt={campus.name}   // <--- Alt text menggunakan nama kampus
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="font-semibold text-primary-violet group-hover:text-primary-yellow transition-colors">
                  {campus.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-primary-violet">Cari Kos Sesuai Tipemu</h2>
            <div className="inline-flex bg-neutral-100 p-1 rounded-xl">
              {["Putra", "Putri"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as "Putra" | "Putri")}
                  className={`px-6 py-2 text-sm rounded-lg transition-all
                    ${
                      activeFilter === filter
                        ? "bg-primary-yellow text-white"
                        : "bg-transparent text-neutral-500 hover:text-primary-yellow"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProperty.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow group"
  >
                <div className="relative h-56">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary-yellow/90 text-white text-xs font-bold px-3 py-1 border-0">
                    {property.type}
                  </Badge>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-primary-violet mb-1 group-hover:text-primary-yellow transition-colors">
                    {property.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-2">{property.area}</p>

                  <div className="flex items-center gap-1 text-neutral-500 text-xs mb-4">
                    <MapPin size={12} />
                    <span>{property.distance}</span>
                  </div>

                  <div className="flex items-end gap-1">
                    <span className="text-xs text-neutral-400 mb-1">mulai dari</span>
                    <span className="font-bold text-primary-violet text-lg">
                      {property.price}
                    </span>
                    <span className="text-xs text-neutral-400 mb-1">/bulan</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            {filteredProperty.length > 3 && (
              <button className="text-primary-yellow font-semibold hover:underline">
                Lihat Semua
              </button>
            )}
          </div>
        </section>

        {/* 4. Feature Section */}
        <section>
          <h2 className="text-2xl font-bold text-primary-violet mb-8">Keuntungan Tinggal di Mada</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Keuntungan.map((feature, idx) => (
              <div key={idx} className="group flex flex-col">
                {/* Container Gambar */}
                <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Konten Teks */}
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-primary-violet">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-snug">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

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
