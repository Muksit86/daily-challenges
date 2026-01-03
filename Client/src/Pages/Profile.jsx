import React, { useState } from "react";
import {
  LuChevronRight,
  LuChevronDown,
  LuLogOut,
  LuMail,
  LuTrash2,
} from "react-icons/lu";
import { Link } from "react-router";
import Button from "../Component/Button";
import { useChallenges } from "../Healper/ChallengesContext";

export default function Profile() {
  const { deleteAllChallenges } = useChallenges();
  const [email, setEmail] = useState("amuksit7@gmail.com");
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);

  const handleChangeEmail = () => {
    console.log("New email:", email);
    // 👉 call API here
  };

  const handleDeleteAllChallenges = () => {
    if (
      confirm(
        "Are you sure you want to delete all challenges? This action cannot be undone."
      )
    ) {
      deleteAllChallenges();
      alert("All challenges have been deleted successfully!");
    }
  };

  return (
    <>
      <main className="bg-background dark:bg-background-dark flex-1 flex flex-col justify-center py-10 md:px-5 animate-fade-in">
        <div className="flex-1 flex flex-col justify-center items-center">
          <section className="flex flex-col justify-center gap-8 bg-white dark:bg-slate-800 shadow-md border dark:border-slate-700 p-2 md:p-8 rounded-xl md:w-5/12 w-11/12 animate-slide-up">
            {/* Email Section */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="flex items-center font-bold text-slate-900 dark:text-white text-lg gap-2 mb-2">
                  <LuMail size={20} />
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
              w-full rounded-lg px-4 py-3
              bg-white text-black dark:bg-slate-700 dark:text-white
              shadow-sm
              outline-none border border-slate-300 dark:border-slate-600
              focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all
            "
                />
              </div>

              <button
                onClick={handleChangeEmail}
                className="ml-auto md:w-3/12 w-8/12 py-2.5 px-4 rounded-lg bg-primary hover:bg-blue-700 text-white font-semibold cursor-pointer active:scale-95 transition-all duration-200 hover:shadow-lg shadow-sm"
              >
                Change Email
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200 dark:bg-slate-700"></div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
                className="flex justify-between items-center w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white text-base md:text-lg">
                  Quick Links
                </h3>
                <LuChevronDown
                  size={24}
                  className={`text-slate-600 dark:text-slate-400 transition-transform duration-300 ${isQuickLinksOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isQuickLinksOpen && (
                <div className="flex flex-col gap-3 animate-fade-in">
                  <Link
                    className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                    to="/"
                  >
                    <span className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                      Home
                    </span>
                    <LuChevronRight
                      size={24}
                      className="text-slate-600 dark:text-slate-400"
                    />
                  </Link>

                  <Link
                    className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                    to="/about"
                  >
                    <span className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                      About
                    </span>
                    <LuChevronRight
                      size={24}
                      className="text-slate-600 dark:text-slate-400"
                    />
                  </Link>

                  <Link
                    className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                    to="/privacy"
                  >
                    <span className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                      Privacy Policy
                    </span>
                    <LuChevronRight
                      size={24}
                      className="text-slate-600 dark:text-slate-400"
                    />
                  </Link>

                  <Link
                    className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                    to="/contact"
                  >
                    <span className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                      Contact
                    </span>
                    <LuChevronRight
                      size={24}
                      className="text-slate-600 dark:text-slate-400"
                    />
                  </Link>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button
                icon={<LuTrash2 size={20} />}
                showTextOnMobile={false}
                color={"danger"}
                textSize="md"
                text={"Delete all"}
                onClick={handleDeleteAllChallenges}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
