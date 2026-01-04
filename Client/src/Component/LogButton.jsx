import React, { useState, useEffect } from "react";
import { LuTreePalm } from "react-icons/lu";
import { toast } from "react-toastify";
import { useLog } from "../Healper/LogContext";

export default function LogButton({ challengeId }) {
  const { addLog, hasLoggedTodayForChallenge } = useLog();
  const [isChecked, setIsChecked] = useState(false);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);

  // Update state when challengeId changes
  useEffect(() => {
    const logged = hasLoggedTodayForChallenge(challengeId);
    setHasLoggedToday(logged);
    setIsChecked(logged);
  }, [challengeId, hasLoggedTodayForChallenge]);

  const handleLogChange = (e) => {
    const checked = e.target.checked;

    if (checked && !hasLoggedToday) {
      // Only add log if not already logged today for this challenge
      const success = addLog(challengeId, true);
      if (success) {
        setIsChecked(true);
        setHasLoggedToday(true);
        toast.success("🎉 Great job! Log recorded successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        setIsChecked(false);
        toast.error("❌ You can only log once per day!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <>
      <label
        className={`flex items-center justify-between px-6 py-4   max-w-md cursor-pointer select-none gap-3 md:gap-5 transition-all duration-500  -md hover: -lg hover:scale-101 active:scale-100 ${
          hasLoggedToday
            ? "opacity-0 scale-90 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        {/* Text */}
        <span className="text-xl md:text-3xl font-semibold text-slate-900 dark:text-white">
          Log today's win
        </span>

        {/* Actual checkbox (hidden but real) */}
        <input
          type="checkbox"
          checked={isChecked}
          disabled={hasLoggedToday && !isChecked}
          onChange={handleLogChange}
          className="peer sr-only"
        />

        {/* Custom UI */}
        <span
          className="
          w-14 h-14 md:w-18 md:h-18   flex items-center justify-center
          transition-all duration-200
          border-2 border-blue-400 dark:border-blue-500 bg-white dark:bg-slate-800  -md
          peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary
          peer-checked:animate-bounce-in hover:border-blue-500 dark:hover:border-blue-400"
        >
          <LuTreePalm
            className="
            w-7 h-7 md:w-10 md:h-10 dark:text-white text-slate-900 peer-checked:text-white
          "
          />
        </span>
      </label>
    </>
  );
}
