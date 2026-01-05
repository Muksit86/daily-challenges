import React, { useState, useEffect } from "react";
import { LuTreePalm } from "react-icons/lu";
import { toast } from "react-toastify";
import { useLog } from "../Healper/LogContext";

export default function LogButton({ handleLog, challengeId, challengeName }) {
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
      const success = addLog(challengeId, challengeName, true);

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
        className={`mt-5 flex items-center justify-between gap-5 select-none transition-all duration-1000 ${hasLoggedToday
            ? "pointer-events-none line-through animate-fade-out hidden"
            : ""
          }`}
      >
        {/* Text */}
        <span className="md:text-sx text-sm font-semibold text-slate-900 dark:text-white">
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
          w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
          transition-all duration-200
          border-2 border-blue-400 dark:border-blue-500 bg-white dark:bg-slate-800 rounded-md
          peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary
          peer-checked:animate-bounce-in hover:border-blue-500 dark:hover:border-blue-400"
        >
          <LuTreePalm
            className="
            w-5 h-5 md:w-5 md:h-5 dark:text-white text-slate-900 peer-checked:text-white
          "
          />
        </span>
      </label>
    </>
  );
}
