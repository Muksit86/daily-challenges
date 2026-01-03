import React, { useState } from "react";
import { useLog } from "../Healper/LogContext";
import { useChallenges } from "../Healper/ChallengesContext";
import { LuArrowBigLeft, LuArrowBigRight, LuTreePalm } from "react-icons/lu";

export default function DailyLogs() {
  const { getLogsForDisplay, getLogsCount } = useLog();
  const { getSelectedChallenge } = useChallenges();

  const selectedChallenge = getSelectedChallenge();
  const logs = selectedChallenge
    ? getLogsForDisplay(selectedChallenge.id, selectedChallenge.createdAt)
    : [];
  const logsCount = selectedChallenge ? getLogsCount(selectedChallenge.id) : 0;
  const ITEMS_PER_PAGE = 20;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(logs.length / ITEMS_PER_PAGE);
  console.log(totalPages);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleLogs = logs.slice(startIndex, endIndex);

  return (
    <>
      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col px-3 md:px-5 py-4 md:py-8 gap-5 md:gap-8 animate-fade-in min-h-screen">
        {/* Header Section */}
        <header className="w-full flex flex-col gap-2 md:gap-3 animate-slide-up">
          <div className="hidden md:flex justify-between items-center">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white line-clamp-1 pr-2">
              {selectedChallenge?.title || "No Challenge Selected"}
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 text-xs md:text-sm lg:text-base">
            <span className="hidden md:block text-slate-600 dark:text-slate-400 font-medium">
              Progress: <span className="font-bold text-primary">{logsCount}</span> / {selectedChallenge?.days || 0} days
            </span>
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Page: <span className="font-bold">{page}</span> / {totalPages}
            </span>
          </div>
        </header>

        {/* Heat Map Grid */}
        <div className="flex-1 flex flex-col-reverse justify-between md:py-10 py-5 items-center animate-fade-in">
          <section className="flex-1 w-full max-w-4xl grid grid-cols-5 sm:grid-cols-5 md:grid-cols-8 gap-2 md:gap-3 lg:gap-4 grid-rows-4 place-items-center">
            {visibleLogs.map((log, index) => (
              <div
                key={startIndex + index}
                className={`
                   w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl rounded-lg md:rounded-xl
                  flex items-center justify-center
                  transition-all duration-300
                  ${log === 1
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-110 cursor-pointer"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 opacity-60 hover:opacity-80"
                  }
                `}
              >
                {log === 1 && (
                  <LuTreePalm
                    size={20}
                    className="md:w-7 md:h-7 drop-shadow-md animate-fade-in"
                  />
                )}
              </div>
            ))}
          </section>

          {/* Pagination Controls */}
          <div className="flex gap-3 md:gap-4 animate-slide-up">
            <button
              disabled={(page - 1) === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-primary text-white font-semibold text-sm md:text-base transition-all duration-200 hover:shadow-lg hover:scale-101 active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1 md:gap-2"
            >
              <LuArrowBigLeft size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-primary text-white font-semibold text-sm md:text-base transition-all duration-200 hover:shadow-lg hover:scale-101 active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1 md:gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <LuArrowBigRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
