import React, { useState } from "react";
import { LuCalendar, LuTreePalm } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useChallenges } from "../Healper/ChallengesContext";
import Button from "../Component/Button";

export default function NewChallenge() {
  const navigate = useNavigate();
  const { addChallenge } = useChallenges();

  const [title, setTitle] = useState("");
  const [days, setDays] = useState("100");
  const [customDays, setCustomDays] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    setError("");

    // Validate title
    if (!title.trim()) {
      setError("Please enter a challenge title");
      return;
    }

    // Determine which days value to use
    let selectedDays = days;
    if (days === "custom") {
      if (!customDays || isNaN(customDays) || customDays <= 0) {
        setError("Please enter a valid number of days");
        return;
      }
      selectedDays = customDays;
    }

    // Add the challenge
    const success = addChallenge(title, selectedDays);
    if (success) {
      // Navigate back to challenges page
      navigate("/challenges");
    }
  };

  return (
    <>
      <main className="flex-1 bg-background dark:bg-background-dark flex justify-center items-center animate-fade-in py-10">
        <section className="w-11/12  -md flex flex-col gap-10 p-4 md:w-5/12 md:mt-0 bg-white dark:bg-slate-800 md:p-6   border dark:border-slate-700 animate-slide-up">
          {/* Title Section */}
          <section className="flex flex-col text-black dark:text-white gap-2">
            <label className="flex items-center gap-2 w-fit text-xl font-semibold text-slate-900 dark:text-white">
              <LuTreePalm size={20} />
              <span>Title</span>
            </label>
            <input
              placeholder="Enter your challenge title"
              className="border dark:border-slate-600 p-3 text-lg bg-white dark:bg-slate-700 dark:text-white  -md focus:outline-blue-400 focus:outline-2 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>

          {/* Days Section */}
          <section className="flex flex-col text-black dark:text-white gap-2">
            <label className="flex items-center gap-2 w-fit text-xl font-semibold text-slate-900 dark:text-white">
              <LuCalendar size={20} />
              <span>Duration</span>
            </label>
            <select
              className="border dark:border-slate-600 p-3 text-lg bg-white dark:bg-slate-700 dark:text-white  -md focus:outline-blue-400 focus:outline-2 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            >
              <option value="30">30 Days</option>
              <option value="75">75 Days</option>
              <option value="100">100 Days</option>
              <option value="custom">Custom Days</option>
            </select>

            {/* Custom Days Input */}
            {days === "custom" && (
              <input
                placeholder="Enter number of days"
                className="border dark:border-slate-600 p-3 text-lg bg-white dark:bg-slate-700 dark:text-white  -md focus:outline-blue-400 focus:outline-2 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all animate-slide-up"
                type="number"
                min="1"
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
              />
            )}
          </section>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700  -md text-red-700 dark:text-red-200 text-sm animate-slide-up">
              {error}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-4  -md transition-all duration-200 hover: -lg active:scale-100  -md"
          >
            Create Challenge
          </button>
        </section>
      </main>
    </>
  );
}
