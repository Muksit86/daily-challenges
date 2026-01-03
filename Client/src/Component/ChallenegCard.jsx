import React, { useState, useRef, useEffect } from "react";
import { LuTrash2, LuPencil } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

import Progress from "./Progress";
import { useNavigate } from "react-router";
import { useChallenges } from "../Healper/ChallengesContext";
import { useLog } from "../Healper/LogContext";

export default function ChallenegCard({ challenge }) {
  const navigate = useNavigate();
  const { selectChallenge, deleteChallenge, updateChallenge } = useChallenges();
  const { getLogsCount, addLog, hasLoggedTodayForChallenge } = useLog();
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
    } else {
      setEditedTitle(challenge.title); // Reset if empty or unchanged
    }
    setIsEditing(false);
  };

  const handleLog = (e) => {
    e.stopPropagation();
    if (!hasLoggedToday) {
      const success = addLog(challenge.id);
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
      <div
        className="relative bg-primary dark:bg-slate-800 p-4 md:p-5 rounded-xl flex flex-col items-center gap-2 md:gap-3 cursor-pointer transition-all duration-200 hover:shadow-lg animate-slide-up w-full max-w-sm hover:scale-101 active:scale-100"
        onClick={handleCardClick}
      >
        {/* More Options Button */}
        <div className="absolute top-2 right-2" ref={menuRef}>
          <button
            onClick={handleMenuClick}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <MdMoreVert className="w-5 h-5 text-white" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-10 animate-fade-in">
              <button
                onClick={handleLog}
                disabled={hasLoggedToday}
                className={`w-full px-4 py-2.5 text-left flex items-center gap-2 text-sm transition-colors ${hasLoggedToday
                  ? "text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
              >
                <FaCheckCircle size={16} />
                {hasLoggedToday ? "Logged ✓" : "Log Today"}
              </button>

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

        <div className="gap-2 md:gap-3 flex flex-col items-center w-full">
          <Progress value={progressPercentage} size={100} />

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
              className="text-white bg-white/20 font-bold text-base md:text-lg text-center px-2 py-1 rounded border-2 border-white/50 focus:outline-none focus:border-white w-full"
            />
          ) : (
            <span className="text-white font-bold text-base md:text-lg text-center line-clamp-2 px-1">
              {challenge.title}
            </span>
          )}

          <span className="text-white/80 text-xs md:text-sm">
            {logsCount} / {challenge.days} days
          </span>
        </div>
      </div>
    </>
  );
}
