import React, { useState } from "react";
import { useLog } from "../Healper/LogContext";
import { useChallenges } from "../Healper/ChallengesContext";
import { LuArrowBigLeft, LuArrowBigRight, LuTreePalm } from "react-icons/lu";
import clsx from "clsx";

export default function DailyLogs() {
  const { getLogsForDisplay, getLogsCount } = useLog();
  const { getSelectedChallenge } = useChallenges();

  const selectedChallenge = getSelectedChallenge();
  const logs = selectedChallenge
    ? getLogsForDisplay(selectedChallenge.id, selectedChallenge.createdAt)
    : [];
  const logsCount = selectedChallenge ? getLogsCount(selectedChallenge.id) : 0;
  const COLS = 4;
  const ROWS = 8;
  const ITEMS_PER_PAGE = COLS * ROWS;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(logs.length / ITEMS_PER_PAGE);
  console.log(totalPages);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleLogs = logs.slice(startIndex, endIndex);

  return (
    <>
      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col justify-center gap-10 animate-fade-in min-h-screen overflow-y-scroll">
        {/* Header Section */}
        <header className="w-full animate-slide-up flex flex-col justify-between items-center gap-4">
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white">
              {selectedChallenge?.title || "No Challenge Selected"}
            </h1>
          </div>
          <div className="text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Progress:{" "}
              <span className="font-bold text-primary">{logsCount}</span> /{" "}
              {selectedChallenge?.days || 0} days
            </span>
          </div>
        </header>

        {/* Heat Map Grid */}
        <div className="flex flex-col justify-between items-center gap-6 animate-fade-in">
          <span className="w-full text-right text-slate-600 dark:text-slate-400 font-medium">
            Page: <span className="font-bold">{page}</span> / {totalPages}
          </span>

          <section
            className={`flex-1 w-full grid gap-2 place-items-center grid-cols-4 grid-rows-8`}
          >
            {visibleLogs.map((log, index) => (
              <div
                key={startIndex + index}
                className={`
                   w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                  flex items-center justify-center
                  transition-all duration-300
                  ${
                    log === 1
                      ? "bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white "
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 opacity-60 hover:opacity-80"
                  }
                `}
              >
                {log === 1 && (
                  <LuTreePalm
                    size={20}
                    className="md:w-7 md:h-7 drop- -md animate-fade-in"
                  />
                )}
              </div>
            ))}
          </section>

          {/* Pagination Controls */}
          <div className="flex gap-15 animate-slide-up">
            <button
              disabled={page - 1 === 0}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 md:px-6 md:py-3  -lg bg-primary text-white font-semibold text-sm md:text-base transition-all duration-200 hover: -lg hover:scale-101 active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1 md:gap-2"
            >
              <LuArrowBigLeft size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 md:px-6 md:py-3  -lg bg-primary text-white font-semibold text-sm md:text-base transition-all duration-200 hover: -lg hover:scale-101 active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1 md:gap-2"
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
