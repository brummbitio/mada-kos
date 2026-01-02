"use client";

import { useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SearchPopover } from "../shared/SearchPopover";
import { useDateLogic, MONTHS, DAYS, DURATION_OPTIONS, DurationOption } from "../hooks/useDateLogic";

export const DateSearch = () => {
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
        reset,
        displayValue
    } = useDateLogic();

    // Local ref for click outside
    const containerRef = useRef<HTMLDivElement>(null);

    // Close panel when clicking outside (Desktop only)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (window.innerWidth >= 640) {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    const DateContent = () => (
        <>
            {/* Header 'Tanggal Masuk' */}
            <h3 className="font-bold text-neutral-800 mb-4">Tanggal Masuk</h3>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4 px-2">
                <button onClick={handlePrevMonth} className="p-1 hover:bg-neutral-50 rounded-full text-neutral-600">
                    <ChevronLeft size={20} />
                </button>
                <span className="font-semibold text-neutral-800">
                    {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button onClick={handleNextMonth} className="p-1 hover:bg-neutral-50 rounded-full text-neutral-600">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center mb-6">
                {DAYS.map((day) => (
                    <div key={day} className="text-xs text-neutral-400 py-1 font-medium">{day}</div>
                ))}
                {calendarDays.map((item, idx) => {
                    const isSelected =
                        selectedDate &&
                        item.currentMonth &&
                        selectedDate.getDate() === item.day &&
                        selectedDate.getMonth() === currentMonth.getMonth() &&
                        selectedDate.getFullYear() === currentMonth.getFullYear();

                    const isDisabled =
                        !item.currentMonth ||
                        isPastDate(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth(),
                            item.day
                        );

                    return (
                        <button
                            key={idx}
                            disabled={isDisabled}
                            onClick={() => {
                                if (!isDisabled) handleDateClick(item.day);
                            }}
                            className={`
                                h-9 w-9 rounded-full text-sm flex items-center justify-center transition-all
                                ${isDisabled
                                    ? "text-neutral-300 cursor-not-allowed"
                                    : "text-neutral-700 hover:bg-neutral-50"}
                                ${isSelected
                                    ? "!bg-primary-violet !text-white hover:!bg-primary-violet"
                                    : ""}
                            `}
                        >
                            {item.day}
                        </button>
                    );
                })}
            </div>

            <div className="h-px bg-neutral-100 w-full mb-6" />

            {/* Tanggal Keluar / Duration */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-neutral-800">Tanggal Keluar</h3>
                <span className="text-xs text-neutral-400">Min. 30 hari</span>
            </div>

            <div className="flex flex-wrap gap-2">
                {DURATION_OPTIONS.map((option) => {
                    const isDisabled = !selectedDate;

                    return (
                        <button
                            key={option}
                            disabled={isDisabled}
                            onClick={() => {
                                handleDurationSelect(option);
                                setIsOpen(false); // Close on selection for desktop convenience
                            }}
                            className={`
                                px-4 py-2 rounded-full text-xs font-medium border transition-all
                                ${isDisabled
                                    ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed"
                                    : selectedDuration === option
                                        ? "bg-primary-yellow text-white border-primary-yellow shadow-md shadow-primary-yellow/20"
                                        : "bg-white text-neutral-600 border-neutral-200 hover:border-primary-yellow hover:text-primary-yellow"
                                }
                            `}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </>
    );

    return (
        <div className="relative flex-1" ref={containerRef}>
            {/* Trigger */}
            <div
                className="flex items-center gap-3 px-4 py-3 border-r border-neutral-100 w-full cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <CalendarIcon className={`text-neutral-400 transition-colors ${isOpen ? 'text-primary-yellow' : ''}`} size={20} />
                <div className="flex-1">
                    {displayValue ? (
                        <p className="text-sm font-medium text-neutral-800">{displayValue}</p>
                    ) : (
                        <p className="text-sm text-neutral-400">Pilih tanggal</p>
                    )}
                </div>
                {selectedDate && (
                    <button
                        onClick={(e) => { e.stopPropagation(); reset(); }}
                        className="text-neutral-400 hover:text-neutral-600"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Desktop Popover */}
            <SearchPopover isOpen={isOpen} className="w-[320px]">
                <DateContent />
            </SearchPopover>
        </div>
    );
};
