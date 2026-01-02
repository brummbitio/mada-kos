"use client";

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useDateLogic, MONTHS, DAYS, DURATION_OPTIONS } from "../hooks/useDateLogic";

export const DateSection = ({
  active,
  onOpen,
}: {
  active: boolean;
  onOpen: () => void;
}) => {
  const {
    currentMonth,
    selectedDate,
    selectedDuration,
    calendarDays,
    isPastDate,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    handleDurationSelect,
    displayValue,
    formatDate
  } = useDateLogic();

  return (
    <div className="bg-white rounded-2xl p-4">
      <button
        onClick={onOpen}
        className="w-full flex justify-between items-center"
      >
        <h3 className="font-semibold text-base">Tanggal Masuk</h3>
        <span className={`text-sm ${selectedDate ? 'text-neutral-800' : 'text-neutral-400'}`}>
          {selectedDate ? formatDate(selectedDate) : "Pilih tanggal"}
        </span>
      </button>

      {active && (
        <div className="mt-6">
          <div className="flex items-center gap-3 text-sm text-neutral-500 mb-6 font-medium">
            <Calendar size={18} />
            <span>Pilih tanggal masuk kos</span>
          </div>

          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="p-1 hover:bg-neutral-50 rounded-full text-neutral-600">
              <ChevronLeft size={20} />
            </button>
            <span className="font-bold text-neutral-800">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button onClick={handleNextMonth} className="p-1 hover:bg-neutral-50 rounded-full text-neutral-600">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-4 gap-x-1 text-center mb-6">
            {DAYS.map((day) => (
              <div key={day} className="text-xs font-bold text-neutral-400">{day}</div>
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
                <div key={idx} className="flex justify-center">
                  <button
                    disabled={isDisabled}
                    onClick={() => !isDisabled && handleDateClick(item.day)}
                    className={`
                                    w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center
                                    ${!item.currentMonth ? 'invisible' : ''}
                                    ${isDisabled ? 'text-neutral-300' : 'text-neutral-800 hover:bg-neutral-50'}
                                    ${isSelected ? '!bg-primary-violet !text-white' : ''}
                                `}
                  >
                    {item.day}
                  </button>
                </div>
              )
            })}
          </div>

          <hr className="border-neutral-100 mb-6" />

          {/* Duration */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-neutral-800">Tanggal keluar</h3>
              <span className="text-xs text-neutral-400">Min. 30 hari</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {DURATION_OPTIONS.map(opt => (
                <button
                  key={opt}
                  disabled={!selectedDate}
                  onClick={() => handleDurationSelect(opt)}
                  className={`
                                px-4 py-2 rounded-full text-sm font-medium border transition-colors
                                ${!selectedDate ? 'text-neutral-300 border-neutral-100' :
                      selectedDuration === opt
                        ? 'bg-primary-yellow text-white border-primary-yellow'
                        : 'bg-white text-neutral-500 border-neutral-200'
                    }
                            `}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
