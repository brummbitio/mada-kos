import { useState } from "react";

export type Category = "Daerah" | "Universitas";

export const POPULAR_KOS = [
    { name: "Kos Abina A", image: "/assets/kos-1.png" },
    { name: "Kos Abina B", image: "/assets/kos-1.png" },
    { name: "Kos Kosmea Putra A", image: "/assets/kos-3.png" },
    { name: "Kos Kosmea Putra B", image: "/assets/kos-1.png" },
    { name: "Kos Kosmea Putri", image: "/assets/kos-2.png" },
];

export const SEARCH_SUGGESTIONS: Record<Category, string[]> = {
    Daerah: [
        "Blimbing",
        "Jatimulyo",
    ],
    Universitas: [
        "Universitas Brawijaya",
        "Universitas Negeri Malang",
        "UIN Malang",
    ],
};

export const useLocationLogic = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<Category>("Universitas");
    const [searchValue, setSearchValue] = useState("");

    const handleSelectSuggestion = (value: string) => {
        setSearchValue(value);
        setIsOpen(false);
    };

    return {
        isOpen,
        setIsOpen,
        activeCategory,
        setActiveCategory,
        searchValue,
        setSearchValue,
        handleSelectSuggestion,
    };
};
