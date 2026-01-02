import React, { useState } from "react";
import LogButton from "../Component/LogButton";
import { LuArrowBigLeft, LuArrowBigRight, LuTreePalm } from "react-icons/lu";

export default function DailyLogs({ logs }) {
  const ITEMS_PER_PAGE = 20;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(logs.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleLogs = logs.slice(startIndex, endIndex);

  return (
    <>
      <div className="bg-background flex-1 flex flex-col px-5 py-10">
        {/* Head Text */}
        <header className="bg-primary w-full">
          <span>{logs.filter((l) => l === 1).length + 1} / 100 days</span>
          <span>
            page {page} / {totalPages}
          </span>
        </header>

        {/* Grid + Pagination controls */}
        <div className="bg-danger flex-1">
          <section className="w-full grid grid-cols-4">
            {visibleLogs.map((log, index) => (
              <div
                key={startIndex + index}
                className={`
              w-12 h-12 rounded-xl
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
              <LuArrowBigLeft />
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-40 active:scale-105 bg-primary text-white"
            >
              <LuArrowBigRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
