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
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleLogs = logs.slice(startIndex, endIndex);

  return (
    <>
      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col px-5 py-8 gap-8 animate-fade-in min-h-screen">
        {/* Header Section */}
        <header className="w-full flex flex-col gap-3 animate-slide-up">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {selectedChallenge?.title || "No Challenge Selected"}
            </h1>
          </div>
          <div className="flex justify-between items-center text-sm md:text-base">
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Progress: <span className="font-bold text-primary">{logsCount}</span> / {selectedChallenge?.days || 0} days
            </span>
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Page: <span className="font-bold">{page}</span> / {totalPages}
            </span>
          </div>
        </header>

        {/* Heat Map Grid */}
        <div className="flex-1 flex flex-col justify-center items-center gap-8">
          <section className="w-full max-w-4xl grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-3 md:gap-4 place-items-center">
            {visibleLogs.map((log, index) => (
              <div
                key={startIndex + index}
                className={`
                  w-16 h-16 md:w-20 md:h-20 rounded-xl
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
                    size={28}
                    className="drop-shadow-md animate-fade-in"
                  />
                )}
              </div>
            ))}
          </section>

          {/* Pagination Controls */}
          <div className="flex gap-4 animate-slide-up">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              <LuArrowBigLeft size={20} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-6 py-3 rounded-lg bg-primary text-white font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <LuArrowBigRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
