import React, { useState } from "react";
import {
  LuLogOut,
  LuUser,
  LuMail,
  LuUserX,
  LuSun,
  LuMoon,
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

  return (
    <>
      <main className="flex-1 flex flex-col justify-center items-center py-5 px-3 md:px-5 bg-background dark:bg-background-dark animate-fade-in overflow-y-scroll">
        <div className="w-full max-w-7xl mt-90 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5">
            {/* Section 1: Account Information */}
            <section className="min-w-0 flex flex-col gap-4 shadow-sharp-lg border border-gray-900 dark:bg-elevation-dark p-3 md:p-8 animate-slide-up">
              <h2 className="font-bold text-slate-900 dark:text-white text-xl md:text-2xl mb-2">
                Account Information
              </h2>

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
                <div className="flex flex-col gap-2 mt-2 p-3 md:p-4 border-2 border-blue-500 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="hidden md:block text-sm font-bold text-blue-900 dark:text-blue-200">
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
                          <p className="hidden md:block text-xs text-blue-600 dark:text-blue-400 mt-1">
                            All premium features unlocked
                          </p>
                        </>
                      )}
                    </div>
                    <Link
                      to="/upgrade"
                      className="px-4 py-2 bg-primary text-white text-sm font-semibold hover:scale-105 transition-all whitespace-nowrap w-full sm:w-auto text-center"
                    >
                      Upgrade
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {/* Section 2: Settings & Actions */}
            <section className="min-w-0 flex flex-col gap-4 shadow-sharp-lg border border-gray-900 dark:bg-elevation-dark p-3 md:p-8 animate-slide-up">
              <h2 className="font-bold text-slate-900 dark:text-white text-xl md:text-2xl mb-2">
                Settings
              </h2>

              {/* Theme Toggle */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-slate-600 dark:text-slate-400 text-sm">
                  Theme
                </label>
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-3 text-black dark:text-white text-lg hover:cursor-pointer flex justify-between items-center border-2 border-black dark:border-white/50 transition-all duration-200 hover:bg-hover-light dark:hover:bg-hover-dark hover:scale-101 active:scale-100"
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  <span className="font-semibold">{isDark ? "Light Mode" : "Dark Mode"}</span>
                  {isDark ? <LuSun size={24} /> : <LuMoon size={24} />}
                </button>
              </div>

              {/* Change Password */}
              <div className="flex flex-col gap-2">
                <label className="font-medium text-slate-600 dark:text-slate-400 text-sm">
                  Password
                </label>
                <button
                  onClick={() => navigate("/reset-password")}
                  className="w-full flex items-center justify-between px-4 py-3 text-left border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  <span className="text-slate-900 dark:text-white font-medium">
                    Change Password
                  </span>
                  <LuLock size={20} className="text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200 dark:bg-hover-dark my-2"></div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-4 py-3 border-2 border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
              >
                <span className="text-blue-700 dark:text-blue-300 font-semibold text-lg">
                  Logout
                </span>
                <LuLogOut
                  size={24}
                  className="transform -rotate-90 text-blue-700 dark:text-blue-300"
                />
              </button>

              {/* Delete Account Button */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between px-4 py-3 border-2 border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
              >
                <span className="text-red-700 dark:text-red-300 font-semibold text-lg">
                  Delete Account
                </span>
                <LuUserX size={24} className="text-red-700 dark:text-red-300" />
              </button>
            </section>
          </div>
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
