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
      <div className="bg-background dark:bg-background-dark flex-1 flex flex-col px-5 py-10 gap-5">
        {/* Head Text */}
        <header className="w-full text-sm dark:text-white font-bold flex justify-between items-center px-4 py-2 md:text-2xl gap-4">
          <span>
            {logsCount} / {selectedChallenge?.days || 0} days
          </span>
          <h2 className="text-center flex-1 text-lg md:text-xl">
            {selectedChallenge?.title || "No Challenge"}
          </h2>
          <span>
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
              transition-all relative
              ${
                log === 1 ? "bg-primary text-white" : "border-2 border-blue-400"
              }
            `}
              >
                {log === 1 && <LuTreePalm size={22} />}
              </div>
            ))}
          </section>
          <div className="flex gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-40 active:scale-105 bg-primary text-white"
            >
              <LuArrowBigLeft size={15} />
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-40 active:scale-105 bg-primary text-white"
            >
              <LuArrowBigRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
