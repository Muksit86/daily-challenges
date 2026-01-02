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

  console.log(logs.length);

  return (
    <>
      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col px-5 py-10 gap-5 animate-fade-in">
        {/* Head Text */}
        <header className="w-full text-sm dark:text-white font-bold flex justify-between items-center px-4 py-2 md:text-2xl gap-4 animate-slide-up">
          <span className="text-slate-700 dark:text-slate-300">
            {logsCount} / {selectedChallenge?.days || 0} days
          </span>
          <h2 className="text-center flex-1 text-lg md:text-xl text-slate-900 dark:text-white font-semibold line-clamp-1">
            {selectedChallenge?.title || "No Challenge"}
          </h2>
          <span className="text-slate-700 dark:text-slate-300">
            {page} / {totalPages} page
          </span>
        </header>

        {/* Grid + Pagination controls */}
        <div className="flex-1 flex flex-col justify-between items-center gap-5">
          <section className="w-full grid grid-cols-4 grid-rows-5 md:grid-cols-5 md:grid-rows-4 flex-1">
            {visibleLogs.map((log, index) => (
              <div
                key={startIndex + index}
                className={`
              md:w-20 md:h-20 w-10 h-10 rounded-xl
              flex items-center justify-center
              transition-all duration-200 hover:scale-110 active:scale-95
              shadow-md
              ${
                log === 1
                  ? "bg-primary text-white hover:shadow-lg"
                  : "border-2 border-blue-400 dark:border-blue-500"
              }
            `}
              >
                {log === 1 && <LuTreePalm size={22} />}
              </div>
            ))}
          </section>
          <div className="flex gap-4 animate-slide-up">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border border-primary disabled:opacity-40 active:scale-105 bg-primary text-white font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
            >
              <LuArrowBigLeft size={15} />
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-primary disabled:opacity-40 active:scale-105 bg-primary text-white font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
            >
              <LuArrowBigRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
