import React, { useState, useMemo } from "react";
import { useLog } from "../Healper/LogContext";
import { useChallenges } from "../Healper/ChallengesContext";
import {
  LuArrowBigLeft,
  LuArrowBigRight,
  LuPlus,
  LuTreePalm,
} from "react-icons/lu";
import { Link } from "react-router";
import Button from "../Component/Button";
import useGridSize from "../Healper/useGridSize";

export default function DailyLogs() {
  const { cols: COLS, rows: ROWS } = useGridSize();

  const { getLogsWithDates, getLogsCount } = useLog();
  const { getSelectedChallenge } = useChallenges();

  const selectedChallenge = getSelectedChallenge();
  const calendarData = selectedChallenge
    ? getLogsWithDates(selectedChallenge.id, selectedChallenge.createdAt)
    : [];
  const logsCount = selectedChallenge ? getLogsCount(selectedChallenge.id) : 0;

  // Group calendar data by month/year
  const groupedByMonth = useMemo(() => {
    const groups = {};
    calendarData.forEach((item) => {
      const key = item.monthYear;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    return groups;
  }, [calendarData]);

  const monthKeys = Object.keys(groupedByMonth);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(monthKeys.length - 1);

  const currentMonthData = monthKeys[currentMonthIndex]
    ? groupedByMonth[monthKeys[currentMonthIndex]]
    : [];

  // Calculate end date (challenge creation date + days)
  const endDate = useMemo(() => {
    if (!selectedChallenge) return null;
    const end = new Date(selectedChallenge.createdAt);
    end.setDate(end.getDate() + selectedChallenge.days - 1);
    return end;
  }, [selectedChallenge]);

  return (
    <>
      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col gap-4 md:gap-6 animate-fade-in md:min-h-screen md:max-h-screen overflow-y-auto p-3 md:p-5">
        {/* Header Section */}
        <header className="animate-slide-up flex-shrink-0">
          <div className="w-full flex justify-between">
            <h1 className="font-bold text-slate-900 dark:text-white md:text-xl">
              {selectedChallenge?.title || "No Challenge Selected"}
            </h1>
            {selectedChallenge && endDate && (
              <p className="hidden md:block text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {new Date(selectedChallenge.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })} → {endDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            )}
            <div className="text-xs md:text-xl">
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                Progress:{" "}
                <span className="font-bold text-primary">{logsCount}</span> /{" "}
                {selectedChallenge?.days || 0} days
              </span>
            </div>
          </div>

        </header>

        {/* Calendar View */}
        {calendarData.length > 0 ? (
          <div className="flex-1 flex flex-col gap-3 md:gap-4 animate-fade-in overflow-hidden">
            {/* Month Navigation */}
            <div className="w-full flex justify-between items-center shrink-0">
              <button
                disabled={currentMonthIndex === 0}
                onClick={() => setCurrentMonthIndex((p) => p - 1)}
                className="cursor-pointer px-3 py-2 md:px-4 md:py-2 bg-primary text-white font-semibold text-sm md:text-base transition-all duration-200 hover:shadow-lg hover:scale-101 active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1 md:gap-2"
              >
                <LuArrowBigLeft size={18} className="md:w-5 md:h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <h2 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white">
                {monthKeys[currentMonthIndex]}
              </h2>

              <button
                disabled={currentMonthIndex === monthKeys.length - 1}
                onClick={() => setCurrentMonthIndex((p) => p + 1)}
                className="cursor-pointer px-3 py-2 md:px-4 md:py-2 bg-primary text-white font-semibold text-sm md:text-base transition-all duration-200 hover:shadow-lg hover:scale-101 active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1 md:gap-2"
              >
                <span className="hidden sm:inline">Next</span>
                <LuArrowBigRight size={18} className="md:w-5 md:h-5" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="w-full grid grid-cols-7 gap-2 md:gap-3 shrink-0">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="w-full grid grid-cols-7 gap-2 md:gap-3 shrink-0">
              {/* Empty cells for days before the first day of month */}
              {currentMonthData.length > 0 &&
                Array.from({
                  length: currentMonthData[0].date.getDay(),
                }).map((_, index) => (
                  <div key={`empty-${index}`} className="w-full h-16 md:h-20 lg:h-24" />
                ))}

              {/* Actual calendar days */}
              {currentMonthData.map((item, index) => {
                const isPastEndDate = endDate && item.date > endDate;

                return (
                  <div
                    key={index}
                    className={`
                      w-full md:h-16 h-8 md:h-20 lg:h-24 border-1 border-black dark:border-white
                      flex flex-col items-center justify-center gap-1
                      transition-all duration-300 relative
                      ${item.hasLog
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-md"
                        : isPastEndDate
                          ? "bg-slate-100 dark:bg-slate-800 opacity-40"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                      }
                      ${item.isToday ? "ring-4 ring-primary ring-offset-2 dark:ring-offset-slate-900" : ""}
                      ${!isPastEndDate && !item.hasLog ? "hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer" : ""}
                    `}
                  >
                    {/* Day Number */}
                    <span className={`text-sm md:text-base lg:text-lg font-bold ${item.hasLog ? 'text-white' : ''}`}>
                      {item.dayNumber}
                    </span>

                    {/* Tree Icon for logged days */}
                    {item.hasLog && (
                      <LuTreePalm
                        size={20}
                        className="hidden md:block md:w-6 md:h-6 lg:w-7 lg:h-7 text-white drop-shadow-md animate-fade-in"
                      />
                    )}

                    {/* Today indicator */}
                    {item.isToday && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="w-full flex flex-wrap justify-center gap-4 text-xs md:text-sm shrink-0 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 border border-black dark:border-white" />
                <span className="text-slate-700 dark:text-slate-300">Logged</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-200 dark:bg-slate-700 border border-black dark:border-white" />
                <span className="text-slate-700 dark:text-slate-300">Not Logged</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-100 dark:bg-slate-800 opacity-40 border border-black dark:border-white" />
                <span className="text-slate-700 dark:text-slate-300">After End Date</span>
              </div>
            </div>
          </div>
        ) : (
          <section className="mt-10 flex flex-col items-center justify-center gap-4 animate-slide-up px-4">
            <div className="mb-2">
              <svg
                className="fill-black dark:fill-white"
                width="50"
                viewBox="0 0 200 200"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="44.7761" height="45" />
                <rect x="155.224" width="44.7761" height="45" />
                <path d="M31.4079 200H0V169.397H30.7481V141.33H167.861V169.397H199.005V200H167.597V172.727H31.4079V200Z" />
              </svg>
            </div>

            <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white text-center">
              No challenges yet
            </p>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 text-center">
              Create your first challenge to get started
            </p>

            <Link to="/newchallenge">
              <Button
                textSize="text-xs"
                text="Create Challenge"
                icon={<LuPlus className="w-6 h-6" />}
              />
            </Link>
          </section>
        )}
      </div>
    </>
  );
}
