import { useState } from "react";

export type DurationOption = "Belum tahu" | "1 Bulan" | "3 Bulan" | "6 Bulan";

export const MONTHS = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export const DURATION_OPTIONS: DurationOption[] = ["Belum tahu", "1 Bulan", "3 Bulan", "6 Bulan"];

export const useDateLogic = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<DurationOption>("Belum tahu");
    const [endDate, setEndDate] = useState<Date | null>(null);

    // Helpers
    const isPastDate = (year: number, month: number, day: number) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);
        return date < today;
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const prevMonthDays = [];
        const prevMonthLastDate = new Date(year, month, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            prevMonthDays.push({ day: prevMonthLastDate - i, currentMonth: false });
        }
        const currentMonthDays = [];
        for (let i = 1; i <= daysInMonth; i++) {
            currentMonthDays.push({ day: i, currentMonth: true });
        }
        return [...prevMonthDays, ...currentMonthDays];
    };

    const calculateEndDate = (startDate: Date, duration: DurationOption): Date | null => {
        if (duration === "Belum tahu") return null;
        const monthsMap: Record<string, number> = {
            "1 Bulan": 1,
            "3 Bulan": 3,
            "6 Bulan": 6,
        };
        const result = new Date(startDate);
        const additionalMonths = monthsMap[duration];
        if (!additionalMonths) return null;

        result.setMonth(result.getMonth() + additionalMonths);
        return result;
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "";
        return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Actions
    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);

        // Recalculate end date if duration is already selected
        if (selectedDuration !== "Belum tahu") {
            setEndDate(calculateEndDate(newDate, selectedDuration));
        }
    };

    const handleDurationSelect = (duration: DurationOption) => {
        setSelectedDuration(duration);
        if (selectedDate) {
            const calculated = calculateEndDate(selectedDate, duration);
            setEndDate(calculated);
            // Optional: Close on duration selection? Desktop currently toggles isOpen(false) manually in UI
        }
    };

    const reset = () => {
        setSelectedDate(null);
        setSelectedDuration("Belum tahu");
        setEndDate(null);
    };

    const calendarDays = getDaysInMonth(currentMonth);

    // Derived display value
    const displayValue =
        selectedDate && endDate
            ? `${formatDate(selectedDate)} – ${formatDate(endDate)}`
            : selectedDate
                ? formatDate(selectedDate)
                : "";

    return {
        isOpen,
        setIsOpen,
        currentMonth,
        selectedDate,
        selectedDuration,
        endDate,
        calendarDays,
        isPastDate,
        handlePrevMonth,
        handleNextMonth,
        handleDateClick,
        handleDurationSelect,
        reset,
        displayValue,
        formatDate, // Exposed for Mobile UI if needed custom format
    };
};
