import React, { useState, useEffect, useRef } from "react";
import {
  LuLogOut,
  LuUser,
  LuMail,
  LuUserX,
  LuSun,
  LuMoon,
  LuChevronDown,
  LuLock,
} from "react-icons/lu";
import { useNavigate, Link } from "react-router";
import { useChallenges } from "../Healper/ChallengesContext";
import { useAuth } from "../Healper/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "../Healper/themeContext";
import { FREE_TRIAL_DAYS } from "../config/clientConfig";

export default function Profile() {
  const { isDark, toggleTheme } = useTheme();

  const { deleteAllChallenges } = useChallenges();
  const { logout, deleteAccount, user, trialStatus } = useAuth();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowQuickActions(false);
      }
    };

    if (showQuickActions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQuickActions]);

  const handleDeleteAllChallenges = () => {
    if (
      confirm(
        "Are you sure you want to delete all challenges? This action cannot be undone."
      )
    ) {
      deleteAllChallenges();
      toast.success("All challenges have been deleted successfully!");
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success("Logged out successfully!");
      navigate("/");
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    const result = await deleteAccount();
    if (result.success) {
      toast.success("Account deleted successfully!");
      navigate("/");
    } else {
      toast.error(
        result.error || "Failed to delete account. Please try again."
      );
    }
    setShowDeleteModal(false);
  };

  const handleChangePassword = () => {
    setShowQuickActions(false);
    navigate("/reset-password");
  };

  return (
    <>
      <main className="flex-1 flex flex-col justify-center items-center py-5 md:px-5 bg-background dark:bg-background-dark animate-fade-in overflow-y-scroll">
        <div className="flex-1 flex flex-col justify-center items-center w-full">
          <section className="flex flex-col justify-center gap-5 shadow-sharp-lg border border-gray-900 dark:bg-elevation-dark p-3 md:p-8 md:w-5/12 w-11/12 animate-slide-up">

            {/* User Info - Read Only */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base md:text-lg">
                Account Information
              </h3>

              {/* Username Display */}
              {user?.username && (
                <div className="flex flex-col gap-2">
                  <label className="flex items-center font-medium text-slate-600 dark:text-slate-400 text-sm gap-2">
                    <LuUser size={18} />
                    Username
                  </label>
                  <div className="px-4 py-3 border-2 bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 text-black dark:text-white text-base md:text-lg font-semibold">
                    {user.username}
                  </div>
                </div>
              )}

              {/* Email Display */}
              <div className="flex flex-col gap-2">
                <label className="flex items-center font-medium text-slate-600 dark:text-slate-400 text-sm gap-2">
                  <LuMail size={18} />
                  Email
                </label>
                <div className="px-4 py-3 border-2 bg-slate-50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 text-black dark:text-white text-sm md:text-base">
                  {user?.email || "Not logged in"}
                </div>
              </div>

              {/* Trial Status - Show for all users with trial */}
              {(trialStatus.isTrialActive || trialStatus.isExpired) && (
                <div className="flex flex-col gap-2 mt-4 p-4 border-2 border-blue-500 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-200">
                        Free Trial Status
                      </p>
                      {trialStatus.isExpired ? (
                        <>
                          <p className="text-red-700 dark:text-red-300 text-sm font-semibold">
                            Trial Expired
                          </p>
                          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                            You had full premium access for {FREE_TRIAL_DAYS} days
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            {trialStatus.daysRemaining} {trialStatus.daysRemaining === 1 ? "day" : "days"} of premium access remaining
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            All premium features unlocked
                          </p>
                        </>
                      )}
                    </div>
                    <Link
                      to="/upgrade"
                      className="px-4 py-2 bg-primary text-white text-sm font-semibold hover:scale-105 transition-all"
                    >
                      Upgrade
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200 dark:bg-hover-dark my-2"></div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full px-4 py-2 text-black dark:text-white text-2xl hover:cursor-pointer flex justify-center items-center gap-4 border-2 border-black dark:border-white/50 transition-all duration-200 hover:bg-hover-light dark:hover:bg-hover-dark hover:scale-101 active:scale-100"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <LuSun size={30} /> : <LuMoon size={30} />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>

            <div className="h-px bg-slate-200 dark:bg-hover-dark"></div>

            {/* Quick Actions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="w-full flex justify-between items-center px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-semibold"
              >
                <span className="text-base md:text-lg">Quick Actions</span>
                <LuChevronDown
                  size={20}
                  className={`transition-transform ${showQuickActions ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {showQuickActions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 shadow-sharp-lg z-50 animate-slide-up">
                  {/* Change Password */}
                  <button
                    onClick={handleChangePassword}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border-b border-slate-200 dark:border-slate-600"
                  >
                    <LuLock size={20} className="text-slate-600 dark:text-slate-400" />
                    <span className="text-slate-900 dark:text-white font-medium">
                      Change Password
                    </span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border-b border-slate-200 dark:border-slate-600"
                  >
                    <LuLogOut
                      size={20}
                      className="transform -rotate-90 text-blue-600 dark:text-blue-400"
                    />
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      Logout
                    </span>
                  </button>

                  {/* Delete Account */}
                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      setShowDeleteModal(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LuUserX size={20} className="text-red-600 dark:text-red-400" />
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      Delete Account
                    </span>
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 p-6 border dark:border-slate-700 max-w-md w-full animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30  ">
                <LuUserX size={24} className="text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Delete Account
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Are you sure you want to delete your account?
            </p>

            <div className="flex gap-2 justify-center md:gap-10">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2   bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-all active:scale-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-2  cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium transition-all active:scale-100  -md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
