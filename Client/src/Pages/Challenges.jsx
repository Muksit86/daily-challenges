import React, { useState } from "react";
import { LuArrowBigLeft, LuArrowBigRight, LuView } from "react-icons/lu";
import { Link } from "react-router";

export default function Challenges() {
  const challengeList = [
    {
      id: 1,
      title: "sleep on time",
    },
    {
      id: 2,
      title: "Diet",
    },
    {
      id: 3,
      title: "gym",
    },
    {
      id: 4,
      title: "wakeup on time",
    },
    {
      id: 4,
      title: "wakeup on time",
    },
    {
      id: 4,
      title: "wakeup on time",
    },
    {
      id: 4,
      title: "wakeup on time",
    },
    {
      id: 4,
      title: "wakeup on time",
    },
    {
      id: 4,
      title: "wakeup on time",
    },
  ];

  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(challengeList.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleChallenge = challengeList.slice(startIndex, endIndex);

  return (
    <>
      <div className="min-h-screen bg-background flex-1 flex flex-col items-center justify-center py-10 px-5">
        <main className="flex-1 flex flex-col mt-20 md:mt-0 gap-5 w-12/12">
          <header className="w-full flex justify-between px-4 py-2 md:text-2xl text-sm font-bold">
            <span>
              page {page} / {totalPages}
            </span>
          </header>

          <section className="w-full grid md:grid-cols-4 grid-cols-2 gap-3 px-4 flex-1 ">
            {visibleChallenge.map((ch, index) => (
              <div
                key={startIndex + index}
                className="hover:scale-105 transition-all duration-150 rounded-xl flex flex-col text-center items-center justify-center relative bg-primary text-white md:text-2xl text-md gap-5"
              >
                <span>{ch.title}</span>
                <Link to="/">
                  <span>
                    <LuView />
                  </span>
                </Link>
              </div>
            ))}
          </section>

          {/* Pagination controls */}
          <div className="w-full flex gap-4 justify-center">
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
        </main>
      </div>
    </>
  );
}
