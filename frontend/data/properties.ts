export interface RoomType {
    id: string;
    name: string;
    description: string;
    price: string;
    period: string; // e.g., "/bulan"
    images: string[];
    facilities: string[];
    available: boolean;
}


export interface PropertyDetail {
    id: string;
    slug: string;
    name: string;
    type: "Putra" | "Putri" | "Campur";
    mainImage: string;
    galleryImages: string[];
    address: string;
    city: string;
    province: string;
    postalCode: string;
    mapCoordinates: { lat: number; lng: number };
    price: string; // Starting price for display
    rating: number; // optional

    // Facilities (top level overview)
    facilities: {
        icon: string; // Lucide icon name or generic identifier
        label: string;
    }[];

    // Description text paragraphs
    description: string[];

    // Location details
    nearby: {
        category: "Universitas" | "Rumah Sakit" | "Pusat Perbelanjaan & Hiburan";
        items: { name: string; distance: string }[];
    }[];

    // Floor Plan
    floorPlan: {
        floorLabel: string; // e.g., "Lantai 1"
        imageUrl: string;
    }[];

    // Rooms
    roomTypes: RoomType[];

    // Rules & Policies
    rules: {
        title: string;
        items: string[];
    }[];

    available: boolean;
}

export const PROPERTIES_DATA: PropertyDetail[] = [
    {
        id: "1",
        slug: "kos-abina-a",
        name: "Kost Abina A",
        type: "Putra",
        available: true,
        mainImage: "/assets/kos-1.png",
        galleryImages: ["/assets/kos-1.png", "/assets/kos-2.png", "/assets/kos-3.png", "/assets/kos-1.png"],
        address: "Jl. Candi Kalasan I No 1996, Blimbing, Kec. Lowokwaru",
        city: "Kota Malang",
        province: "Jawa Timur",
        postalCode: "65125",
        mapCoordinates: { lat: -7.943, lng: 112.639 },
        price: "Rp1.600.000",
        rating: 4.8,
        facilities: [
            { icon: "Wifi", label: "Wifi" },
            { icon: "Wind", label: "AC" },
            { icon: "Bath", label: "Kamar Mandi Dalam" },
            { icon: "Car", label: "Parkir Mobil" },
            { icon: "Shield", label: "CCTV 24 Jam" },
            { icon: "Zap", label: "Bebas Jam Malam" },
        ],
        description: [
            "Kost Abina Mada Putra adalah hunian ideal bagi mahasiswa yang beraktivitas di kawasan pendidikan kota Malang. Terletak di Jalan Trowulan yang strategis, kost ini berada tepat di depan kampus STIE Malangkucecwara (ABM), bahkan hanya berjarak 5 langkah dari gerbang kampus. Akses ke perguruan tinggi lain seperti Universitas Brawijaya (UB), Polinema, dan Universitas Negeri Malang (UM) mudah dijangkau dalam waktu 6 hingga 10 menit perjalanan. Lokasi ini mempermudah mobilitas penghuni yang memiliki jadwal perkuliahan padat.",
            "Mengusung konsep Cozy, Complete, Convenient, Kost Abina Mada Putra menawarkan fasilitas lengkap, termasuk penggunaan smartkey khusus, AC, water heater, dan koneksi Wi-Fi yang sudah termasuk biaya sewa. Lingkungan kost dirancang untuk memberikan rasa aman dan tenang, dengan CCTV 24 jam, penjaga malam, serta kebebasan jam malam yang bertanggung jawab."
        ],
        nearby: [
            {
                category: "Universitas",
                items: [
                    { name: "Universitas Brawijaya", distance: "5.7 km" },
                    { name: "Universitas Negeri Malang", distance: "5.7 km" },
                    { name: "UIN Malang", distance: "5.7 km" },
                ]
            },
            {
                category: "Rumah Sakit",
                items: [
                    { name: "RS Saiful Anwar", distance: "4.2 km" },
                    { name: "RS Lavalette", distance: "3.5 km" }
                ]
            },
            {
                category: "Pusat Perbelanjaan & Hiburan",
                items: [
                    { name: "Malang Town Square", distance: "5.0 km" },
                    { name: "Cyber Mall", distance: "6.1 km" }
                ]
            }
        ],
        floorPlan: [
            { floorLabel: "Lantai 1", imageUrl: "/assets/denah-lantai-1.png" }, // placeholder
            { floorLabel: "Lantai 2", imageUrl: "/assets/denah-lantai-2.png" },
            { floorLabel: "Lantai 3", imageUrl: "/assets/denah-lantai-3.png" },
        ],
        roomTypes: [
            {
                id: "std-outside",
                name: "Standard with Outside View",
                description: "Kamar standar dengan pemandangan luar yang menyegarkan.",
                price: "Rp1.800.000",
                period: "/bulan",
                available: true,
                images: ["/assets/kos-1.png"],
                facilities: ["Jendela luar", "AC", "Kamar mandi dalam", "Smart Key", "Televisi", "Wi-Fi", "Diffuser"]
            },
            {
                id: "std-plus",
                name: "Standard Plus",
                description: "Kamar standar plus dengan fasilitas tambahan.",
                price: "Rp1.700.000",
                period: "/bulan",
                available: true,
                images: ["/assets/kos-2.png"],
                facilities: ["Lantai 1", "Televisi", "Kamar mandi dalam", "Smart Key", "Jendela luar", "AC", "Wi-Fi", "Diffuser"]
            },
            {
                id: "std",
                name: "Standard",
                description: "Pilihan ekonomis dengan kenyamanan maksimal.",
                price: "Rp1.600.000",
                period: "/bulan",
                available: true,
                images: ["/assets/kos-3.png"],
                facilities: ["AC", "Smart Key", "Kamar mandi dalam", "Televisi", "Wi-Fi", "Diffuser"]
            }
        ],
        rules: [
            {
                title: "Jam dan Tamu",
                items: [
                    "Penghuni wajib menjaga sopan santun dan ketenangan, terutama malam hari.",
                    "Tamu diperbolehkan hingga 23.00 WIB.",
                    "Tidak menginap, dan tamu lawan jenis hanya di area umum."
                ]
            },
            {
                title: "Ketertiban dan rokok",
                items: [
                    "Penghuni wajib menjaga ketenangan setelah pukul 22.00 WIB.",
                    "Merokok dilarang di dalam bangunan dan hanya diperbolehkan di area terbuka."
                ]
            },
            {
                title: "Keamanan",
                items: [
                    "Pintu utama wajib terkunci saat malam atau area depan kosong.",
                    "Barang dari kamar menjadi tanggung jawab masing-masing."
                ]
            },
            {
                title: "Larangan",
                items: [
                    "Dilarang membawa atau mengonsumsi narkoba, minuman keras, dan senjata tajam.",
                    "Hewan peliharaan tidak diperbolehkan.",
                    "Memasak hanya diperkenankan di dapur bersama."
                ]
            },
            {
                title: "Kebersihan",
                items: [
                    "Jaga kebersihan kamar dan area bersama, buang sampah pada tempatnya, dan dilarang menempel dekorasi apa pun."
                ]
            },
            {
                title: "Fasilitas",
                items: [
                    "Gunakan fasilitas secara bijak.",
                    "Mesin cuci maksimal dua kali per minggu.",
                    "Kerusakan akibat kelalaian menjadi tanggung jawab pribadi."
                ]
            }
        ]
    }
];
