import React, { useState, useRef, useEffect } from "react";
import { LuTrash2, LuPencil, LuTreePalm } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import clsx from "clsx";
import Progress from "./Progress";
import { useNavigate } from "react-router";
import { useChallenges } from "../Healper/ChallengesContext";
import { useLog } from "../Healper/LogContext";
import LogButton from "./LogButton";

export default function ChallenegCard({ challenge }) {
  const navigate = useNavigate();
  const { selectChallenge, deleteChallenge, updateChallenge } = useChallenges();
  const {
    getLogsCount,
    addLog,
    hasLoggedTodayForChallenge,
    deleteLogById,
    updateChallengeName,
  } = useLog();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(challenge.title);
  const menuRef = useRef(null);

  // Calculate progress for this challenge
  const logsCount = getLogsCount(challenge.id);
  const progressPercentage = Math.round((logsCount / challenge.days) * 100);
  const hasLoggedToday = hasLoggedTodayForChallenge(challenge.id);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleCardClick = () => {
    if (!showMenu && !isEditing) {
      // Select this challenge and navigate to logs page
      selectChallenge(challenge.id);
      navigate("/logs");
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${challenge.title}"?`)) {
      deleteChallenge(challenge.id);
      deleteLogById(challenge.id);
    }
    setShowMenu(false);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveTitle = (e) => {
    e.stopPropagation();
    if (editedTitle.trim() && editedTitle !== challenge.title) {
      updateChallenge(challenge.id, { title: editedTitle.trim() });
      // Also update the challenge name in logs
      updateChallengeName(challenge.id, editedTitle.trim());
    } else {
      setEditedTitle(challenge.title); // Reset if empty or unchanged
    }
    setIsEditing(false);
  };

  const handleLog = (e) => {
    e.stopPropagation();
    if (!hasLoggedToday) {
      const success = addLog(challenge.id, challenge.title);
      if (success) {
        alert("✅ Logged successfully!");
      }
    } else {
      alert("You've already logged today for this challenge!");
    }
    setShowMenu(false);
  };

  return (
    <>
      <div className="relative border-2 border-black dark:border-white dark:bg-elevation-dark shadow-md p-4 flex flex-col items-center md:gap-3 cursor-pointer transition-all duration-200 animate-slide-up w-full h-full">
        {/* More Options Button */}
        <div className="w-full flex justify-between mb-5" ref={menuRef}>
          <button
            onClick={handleMenuClick}
            className="p-1.5 hover:bg-white/10 transition-colors duration-200"
          >
            <MdMoreVert className="w-5 h-5 text-black dark:text-white" />
          </button>

          <button onClick={handleLog} disabled={hasLoggedToday}>
            <span
              className={clsx(
                "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-200 active:animate-bounce-in",
                hasLoggedToday
                  ? "bg-primary dark:bg-primary pointer-events-none"
                  : "border-2 border-blue-900 cursor-pointer"
              )}
            >
              <LuTreePalm className="w-5 h-5 md:w-5 md:h-5 text-white" />
            </span>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute left-4 top-12 mt-2 w-40 bg-white dark:bg-slate-800  -lg  -lg border border-slate-200 dark:border-slate-700 overflow-hidden z-10 animate-fade-in">
              <button
                onClick={handleEditClick}
                className="w-full px-4 py-2.5 text-left flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <LuPencil size={16} />
                Edit Title
              </button>

              <button
                onClick={handleDelete}
                className="w-full px-4 py-2.5 text-left flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LuTrash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>

        <div
          onClick={handleCardClick}
          className="gap-2 md:gap-3 flex flex-col items-center w-full"
        >
          <Progress value={progressPercentage} size={120} />

          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTitle(e);
                if (e.key === "Escape") {
                  setEditedTitle(challenge.title);
                  setIsEditing(false);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              autoFocus
              className="text-black bg-white/20 font-bold text-base md:text-lg text-center px-2 py-1 focus:outline-none focus:border-black w-full"
            />
          ) : (
            <span className="text-black dark:text-white font-bold text-base md:text-lg text-center line-clamp-2 px-1">
              {challenge.title}
            </span>
          )}

          <span className="text-black dark:text-white text-sm">
            {logsCount} / {challenge.days} days
          </span>
        </div>
      </div>
    </>
  );
}
