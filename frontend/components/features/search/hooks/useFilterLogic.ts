import { useState, useEffect } from "react";

export const useFilterLogic = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when open (reused logic)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (isOpen) document.body.style.overflow = "hidden";
            else document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // State
    const [gender, setGender] = useState<"Putra" | "Putri" | null>(null);
    const [sortBy, setSortBy] = useState<"lowest" | "highest" | null>(null);

    const [sharedFacilities, setSharedFacilities] = useState({
        dapur: false,
        security: false,
        parkirMobil: false,
        parkirMotor: false,
        bebasJamMalam: false,
        cctv: false,
        laundry: false,
        cleaningService: false,
    });

    const [roomFacilities, setRoomFacilities] = useState({
        ac: false,
        televisi: false,
        smartKey: false,
        wifi: false,
        kamarMandiDalam: false,
        diffuser: false,
        jendelaLuar: false,
    });

    // Actions
    const toggleGender = (value: "Putra" | "Putri") => {
        setGender(prev => prev === value ? null : value);
    };

    const toggleSortBy = (value: "lowest" | "highest") => {
        setSortBy(prev => prev === value ? null : value);
    };

    const reset = () => {
        setGender(null);
        setSortBy(null);
        setSharedFacilities({
            dapur: false,
            security: false,
            parkirMobil: false,
            parkirMotor: false,
            bebasJamMalam: false,
            cctv: false,
            laundry: false,
            cleaningService: false,
        });
        setRoomFacilities({
            ac: false,
            televisi: false,
            smartKey: false,
            wifi: false,
            kamarMandiDalam: false,
            diffuser: false,
            jendelaLuar: false,
        });
    };

    return {
        isOpen,
        setIsOpen,
        gender,
        sortBy,
        sharedFacilities,
        setSharedFacilities,
        roomFacilities,
        setRoomFacilities,
        toggleGender,
        toggleSortBy,
        reset
    };
};
