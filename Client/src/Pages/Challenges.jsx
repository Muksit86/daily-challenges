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
      <div className="min-h-screen bg-background dark:bg-background-dark flex-1 flex flex-col items-center justify-center py-10 px-5 animate-fade-in">
        <main className="flex-1 flex flex-col mt-20 md:mt-0 gap-5 w-12/12">
          <header className="w-full flex dark:text-white justify-between px-4 py-2 md:text-2xl text-sm font-bold animate-slide-up">
            <span className="text-slate-700 dark:text-slate-300">
              page {page} / {totalPages}
            </span>
          </header>

          <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 flex-1">
            {visibleChallenge.map((ch, index) => (
              <div
                key={startIndex + index}
                className="relative group animate-slide-up"
              >
                <button
                  onClick={() => handleSelectChallenge(ch.id)}
                  className={`w-full flex flex-col bg-white dark:bg-slate-800 border-2 font-bold  -md   p-4 transition-all duration-200 h-full cursor-pointer hover: -lg active:scale-100 ${
                    selectedChallengeId === ch.id
                      ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900  -lg"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center text-center flex-col gap-2">
                    <span className="text-sm md:text-base dark:text-white text-slate-900 font-semibold">
                      {ch.title}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      {ch.days} days
                    </span>
                  </div>
                </button>

                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteChallenge(ch.id, e)}
                  className="absolute top-3 right-3 bg-danger text-white   p-1.5 opacity-100  -md cursor-pointer active:scale-105"
                  title="Delete challenge"
                >
                  <LuX size={16} />
                </button>
              </div>
            ))}
          </section>

          {/* Pagination controls */}
          <div className="w-full flex gap-4 justify-center animate-slide-up">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2  -lg border border-primary disabled:opacity-40 active:scale-105 bg-primary text-white font-semibold transition-all duration-200 hover: -lg hover:scale-101 active:scale-100 disabled:cursor-not-allowed"
            >
              <LuArrowBigLeft />
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2  -lg border border-primary disabled:opacity-40 active:scale-105 bg-primary text-white font-semibold transition-all duration-200 hover: -lg hover:scale-101 active:scale-100 disabled:cursor-not-allowed"
            >
              <LuArrowBigRight />
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
