"use client";

import { useState } from "react";
import { Check, Calendar, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { useDateLogic, MONTHS, DAYS, DURATION_OPTIONS } from "@/components/features/search/hooks/useDateLogic";

const FilterWrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-neutral-100 lg:border-none pb-4 lg:pb-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between lg:cursor-default"
            >
                <h4 className="font-bold text-sm text-neutral-800">{title}</h4>
                {/* Icon chevron hanya muncul di mobile */}
                <div className={`transition-transform lg:hidden ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronUp size={18} className="text-neutral-400" />
                </div>
            </button>
            
            {/* Desktop selalu tampil, Mobile tergantung state isOpen */}
            <div className={`mt-4 lg:block ${isOpen ? 'block' : 'hidden'}`}>
                {children}
            </div>
        </div>
    );
};

const jenisKos = [
    { value: "putra", label: "Putra" },
    { value: "putri", label: "Putri" },
];

const harga = [
    { value: "highest", label: "Tertinggi" },
    { value: "lowest", label: "Terendah" },
];

const universitas = [
    { value: "ub", label: "Universitas Brawijaya" },
    { value: "um", label: "Universitas Negeri Malang" },
    { value: "uin", label: "UIN Malang" },
];

const areaKos = [
    { value: "blimbing", label: "Blimbing" },
    { value: "jatimulyo", label: "Jatimulyo" },
];

const FILTER_GROUPS = [
    {
        title: "Fasilitas Bersama",
        items: [
            "Dapur",
            "Security",
            "Parkir Mobil",
            "Parkir Motor",
            "Bebas Jam Malam",
            "CCTV 24 Jam",
            "Laundry Room",
            "Free Cleaning Service",
        ],
    },
    {
        title: "Fasilitas Kamar",
        items: [
            "AC",
            "Televisi",
            "Smart Key",
            "Wi-Fi",
            "Kamar Mandi Dalam",
            "Diffuser",
            "Jendela Luar",
        ],
    },
];

/* =======================
   RADIO GROUP
======================= */
type RadioGroupLayout = "grid" | "column";

const RadioGroup = ({
    title,
    options,
    value,
    onChange,
    layout = "column",
}: {
    title: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (val: string) => void;
    layout?: RadioGroupLayout;
}) => {
    const containerClass =
        layout === "grid"
            ? "grid grid-cols-2 gap-x-6 gap-y-4"
            : "grid grid-cols-2 lg:flex lg:flex-col gap-3";

    return (
        <div>
            <h4 className="font-bold text-sm text-neutral-800 mb-3">{title}</h4>

            <div className={containerClass}>
                {options.map(opt => (
                    <label
                        key={opt.value}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                ${value === opt.value
                                    ? "bg-primary-yellow border-primary-yellow"
                                    : "border-neutral-300"
                                }`}
                        >
                            {value === opt.value && (
                                <Check size={14} className="text-white" />
                            )}
                        </div>

                        <input
                            type="radio"
                            className="hidden"
                            checked={value === opt.value}
                            onChange={() => onChange(opt.value)}
                        />

                        <span className="text-sm text-neutral-600 group-hover:text-primary-violet">
                            {opt.label}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};


/* =======================
   CHECKBOX GROUP
======================= */
const CheckboxGroup = ({
    title,
    items,
}: {
    title: string;
    items: string[];
}) => {
    const [checked, setChecked] = useState<string[]>([]);

    const toggle = (item: string) => {
        setChecked(prev =>
            prev.includes(item)
                ? prev.filter(i => i !== item)
                : [...prev, item]
        );
    };

    return (
        <div>
            <h4 className="font-bold text-sm text-neutral-800 mb-3">{title}</h4>
            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-3">
                {items.map(item => {
                    const active = checked.includes(item);
                    return (
                        <label
                            key={item}
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => toggle(item)}
                        >
                            <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                  ${active
                                        ? "bg-primary-yellow border-primary-yellow"
                                        : "border-neutral-300"
                                    }`}
                            >
                                {active && <Check size={14} className="text-white" />}
                            </div>
                            <span className="text-sm text-neutral-600 group-hover:text-primary-violet">
                                {item}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

/* =======================
   DATE RANGE (ADVANCED)
======================= */
const DateRange = () => {
    const {
        isOpen, setIsOpen,
        currentMonth,
        selectedDate,
        selectedDuration,
        calendarDays,
        isPastDate,
        handlePrevMonth,
        handleNextMonth,
        handleDateClick,
        handleDurationSelect,
    } = useDateLogic();

    const formatShortDate = (date: Date) => {
        const d = date.getDate();
        const m = MONTHS[date.getMonth()].substring(0, 3); // Ambil 3 huruf pertama: Jan, Feb...
        const y = date.getFullYear();
        return `${d} ${m} ${y}`;
    };

    const getEndDateLabel = () => {
        if (!selectedDate || !selectedDuration || selectedDuration === "Belum tahu") return "";

        const endDate = new Date(selectedDate);
        const durationValue = parseInt(selectedDuration);

        if (selectedDuration.includes("Bulan")) {
            endDate.setMonth(endDate.getMonth() + durationValue);
        } else if (selectedDuration.includes("Tahun")) {
            endDate.setFullYear(endDate.getFullYear() + durationValue);
        }

        return formatShortDate(endDate);
    };

    return (
        <div>
            <h4 className="font-bold text-sm text-neutral-800 mb-3">
                Tanggal Masuk
            </h4>

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between border rounded-lg px-3 py-2 text-xs transition-colors ${isOpen ? 'border-primary-yellow ring-1 ring-primary-yellow' : 'border-neutral-200 hover:border-primary-yellow'}`}
            >
                <div className="flex items-center gap-2 text-neutral-500 text-left">
                    <Calendar size={14} />
                    <div className="flex flex-col">
                        {selectedDate ? (
                            <span className="text-neutral-900 font-semibold leading-none">
                                {formatShortDate(selectedDate)} 
                                {selectedDuration && selectedDuration !== "Belum tahu" && (
                                    <span className="text-neutral-400 font-normal"> — {getEndDateLabel()}</span>
                                )}
                            </span>
                        ) : (
                            <span className="text-neutral-400">Pilih tanggal</span>
                        )}
                    </div>
                </div>
            </button>

            {/* Expandable Content */}
            {isOpen && (
                <div className="mt-4 p-4 border border-neutral-100 rounded-xl bg-white shadow-sm ring-1 ring-neutral-100">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-neutral-50 rounded-full text-neutral-600">
                            <ChevronDown size={16} />
                        </button>
                        <span className="font-bold text-sm text-neutral-800">
                            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-neutral-50 rounded-full text-neutral-600">
                            <ChevronUp size={16} />
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center mb-6">
                        {DAYS.map((day) => (
                            <div key={day} className="text-[10px] font-bold text-neutral-400 uppercase">{day}</div>
                        ))}
                        {calendarDays.map((item, idx) => {
                            const isSelected = selectedDate && item.currentMonth && selectedDate.getDate() === item.day && selectedDate.getMonth() === currentMonth.getMonth() && selectedDate.getFullYear() === currentMonth.getFullYear();
                            const isDisabled = !item.currentMonth || isPastDate(currentMonth.getFullYear(), currentMonth.getMonth(), item.day);

                            return (
                                <div key={idx} className="flex justify-center">
                                    <button
                                        disabled={isDisabled}
                                        onClick={() => !isDisabled && handleDateClick(item.day)}
                                        className={`
                                            w-7 h-7 rounded-full text-xs font-medium flex items-center justify-center transition-all
                                            ${!item.currentMonth ? 'invisible' : ''}
                                            ${isDisabled ? 'text-neutral-300' : 'text-neutral-700 hover:bg-neutral-100'}
                                            ${isSelected ? '!bg-primary-violet !text-white' : ''}
                                        `}
                                    >
                                        {item.day}
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    <div className="h-px bg-neutral-100 my-4" />

                    {/* Duration */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <h5 className="font-bold text-xs text-neutral-800">Durasi Sewa</h5>
                            <span className="text-[10px] text-neutral-400">Min. 30 hari</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {DURATION_OPTIONS.map(opt => (
                                <button
                                    key={opt}
                                    disabled={!selectedDate}
                                    onClick={() => handleDurationSelect(opt)}
                                    className={`
                                        px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
                                        ${!selectedDate ? 'opacity-50 cursor-not-allowed border-neutral-100 text-neutral-300' :
                                            selectedDuration === opt
                                                ? 'bg-primary-yellow text-white border-primary-yellow'
                                                : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-yellow'
                                        }
                                    `}
                                >
                                    {opt === "Belum tahu" ? "Belum tahu" : opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

/* =======================
   MAIN SIDEBAR
======================= */
export const FilterSidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [gender, setGender] = useState("");
    const [area, setArea] = useState("");
    const [urutkanHarga, setUrutkanHarga] = useState("");
    const [dekatUniversitas, setUniversitas] = useState("");

    return (
        <aside className="w-full lg:w-72 flex-shrink-0">
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between lg:cursor-default lg:pointer-events-none mb-6"
            >
                <h3 className="font-bold text-lg text-primary-violet">
                    Filter Pencarian
                </h3>
                {/* Icon hanya muncul di mobile */}
                <div className={`lg:hidden transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronUp size={20} className="text-primary-violet" />
                </div>
            </button>

            <div className={`space-y-8 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                <FilterWrapper title="Area Kos">
                    <RadioGroup
                        title="" // Kosongkan karena sudah ada di wrapper
                        options={areaKos}
                        value={area || ""}
                        onChange={setArea}
                        layout="grid"
                    />
                </FilterWrapper>

                <FilterWrapper title="Dekat Universitas">
                    <RadioGroup
                        title=""
                        options={universitas}
                        value={dekatUniversitas || ""}
                        onChange={setUniversitas}
                        layout="column"
                    />
                </FilterWrapper>

                <div className="pb-4 border-b border-neutral-100 lg:border-none">
                     <DateRange />
                </div>

                <FilterWrapper title="Tipe Kos">
                    <RadioGroup
                        title=""
                        options={jenisKos}
                        value={gender || ""}
                        onChange={setGender}
                        layout="grid"
                    />
                </FilterWrapper>

                <FilterWrapper title="Urutkan Harga">
                    <RadioGroup
                        title=""
                        options={harga}
                        value={urutkanHarga || ""}
                        onChange={setUrutkanHarga}
                        layout="grid"
                    />
                </FilterWrapper>

                {FILTER_GROUPS.map(group => (
                    <FilterWrapper key={group.title} title={group.title}>
                        <CheckboxGroup title="" items={group.items} />
                    </FilterWrapper>
                ))}
            </div>
        </aside>
    );
};
