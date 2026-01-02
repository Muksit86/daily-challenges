import React, { useState } from "react";
import { LuArrowBigLeft, LuArrowBigRight, LuX } from "react-icons/lu";
import { useChallenges } from "../Healper/ChallengesContext";
import { useNavigate } from "react-router";

export default function Challenges() {
  const navigate = useNavigate();
  const {
    getChallenges,
    deleteChallenge,
    selectChallenge,
    selectedChallengeId,
  } = useChallenges();
  const [challengeList, setChallengeList] = useState(getChallenges());
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const handleDeleteChallenge = (id, e) => {
    e.stopPropagation();
    deleteChallenge(id);
    const updated = getChallenges();
    setChallengeList(updated);
    // Reset to first page if current page is empty
    if (updated.length === 0) {
      setPage(1);
    } else if (page > Math.ceil(updated.length / ITEMS_PER_PAGE)) {
      setPage(Math.ceil(updated.length / ITEMS_PER_PAGE));
    }
  };

  const handleSelectChallenge = (id) => {
    selectChallenge(id);
    // Redirect to home to show the selected challenge
    navigate("/");
  };

  const totalPages = Math.ceil(challengeList.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleChallenge = challengeList.slice(startIndex, endIndex);

  return (
    <>
      <div className="min-h-screen bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-center py-10 px-5">
        <main className="flex-1 flex flex-col mt-20 md:mt-0 gap-5 w-12/12">
          <header className="w-full flex dark:text-white justify-between px-4 py-2 md:text-2xl text-sm font-bold">
            <span>
              page {page} / {totalPages}
            </span>
          </header>

          <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 flex-1">
            {visibleChallenge.map((ch, index) => (
              <div key={startIndex + index} className="relative group">
                <button
                  onClick={() => handleSelectChallenge(ch.id)}
                  className={`w-full flex flex-col bg-white dark:bg-slate-800 border-2 font-bold shadow-sm rounded-xl p-4 hover:scale-105 transition-all h-full cursor-pointer ${
                    selectedChallengeId === ch.id
                      ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center text-center flex-col gap-2">
                    <span className="text-sm md:text-base dark:text-white text-slate-900">
                      {ch.title}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {ch.days} days
                    </span>
                  </div>
                </button>

                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteChallenge(ch.id, e)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Delete challenge"
                >
                  <LuX size={16} />
                </button>
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
