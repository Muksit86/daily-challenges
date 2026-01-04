import React, { useState } from "react";
import {
  LuChevronRight,
  LuChevronDown,
  LuLogOut,
  LuMail,
  LuTrash2,
  LuUserX,
  LuSun,
  LuMoon,
} from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import Button from "../Component/Button";
import { useChallenges } from "../Healper/ChallengesContext";
import { useAuth } from "../Healper/AuthContext";
import { toast } from "react-toastify";
import { useTheme } from "../Healper/themeContext";

export default function Profile() {
  const { isDark, toggleTheme } = useTheme();

  const { deleteAllChallenges } = useChallenges();
  const { logout, deleteAccount, user, authType, changePassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user?.email || "jonDoe@gmail.com");
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangeEmail = () => {
    // 👉 call API here
  };

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

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    const result = await changePassword(currentPassword, newPassword);
    if (result.success) {
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      toast.error(result.error || "Failed to change password");
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

  const QuickLins = [
    {
      link: "/home",
      text: "Home",
    },
    {
      link: "/about",
      text: "About",
    },
    {
      link: "/contact",
      text: "Contact",
    },
    {
      link: "/privacy",
      text: "Privacy",
    },
    {
      link: "/privacy",
      text: "Privacy",
    },
  ];
  return (
    <>
      <main className="flex-1 flex flex-col justify-center items-center py-5 md:px-5 bg-background dark:bg-background-dark animate-fade-in">
        <div className="flex-1 flex flex-col justify-center items-center w-full">
          <section className="flex flex-col justify-center gap-5 bg-white dark:bg-slate-800  -md border border-black dark:border-slate-700 p-3 md:p-8    md:w-5/12 w-11/12 animate-slide-up">
            {/* Email Section */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label className="w-full flex items-center font-bold text-slate-900 dark:text-white text-md gap-2">
                  <LuMail size={20} />
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
              w-full   px-4 py-3
              bg-white text-black dark:bg-slate-700 dark:text-white
               -sm text-sm md:text-lg
              outline-none border border-black dark:border-slate-600
              focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all
            "
                />
              </div>

              <button
                onClick={handleChangeEmail}
                className="ml-auto py-2 px-4   bg-primary hover:bg-blue-700 text-white font-medium cursor-pointer active:scale-100 transition-all duration-200  -sm"
              >
                Change
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>

            {/* Password Change Section - Only for Email Users */}
            {authType === "email" && (
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base md:text-lg">
                  Change Password
                </h3>

                <div>
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full   px-4 py-3 mt-1 bg-white text-black dark:bg-slate-700 dark:text-white  -sm text-sm md:text-lg outline-none border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full   px-4 py-3 mt-1 bg-white text-black dark:bg-slate-700 dark:text-white  -sm text-sm md:text-lg outline-none border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-900 dark:text-white">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full   px-4 py-3 mt-1 bg-white text-black dark:bg-slate-700 dark:text-white  -sm text-sm md:text-lg outline-none border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  className="ml-auto py-2 px-6   bg-primary hover:bg-blue-700 text-white font-medium cursor-pointer active:scale-100 transition-all duration-200  -sm"
                >
                  Update Password
                </button>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="w-full px-4 py-2 text-black dark:text-white text-2xl hover:cursor-pointer flex justify-center items-center gap-4 border border-black dark:border-white transition-all duration-200 hover:bg-primary/10 hover:scale-101 active:scale-100"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <LuSun size={30} /> : <LuMoon size={30} />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>

            <div className="h-px bg-slate-200 dark:bg-slate-700"></div>

            {/* Account Actions */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base md:text-lg">
                Account Actions
              </h3>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center px-4 py-3 bg-blue-300 text-white dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-200 hover:scale-102 active:scale-100"
              >
                <div className="flex items-center gap-3">
                  <LuLogOut
                    size={20}
                    className="transform -rotate-90 text-white text-sm"
                  />
                  <span className="text-base md:text-lg font-semibold text-white">
                    Logout
                  </span>
                </div>
              </button>

              {/* Delete Account Button */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex justify-center items-center px-4 py-3 bg-red-300 text-white dark:bg-red-900/20 border border-red-200 dark:border-red-800 cursor-pointer hover:bg-red-600 dark:hover:bg-red-500 transition-all duration-200 hover:scale-102 active:scale-100"
              >
                <div className="flex items-center gap-3">
                  <LuUserX size={20} className="text-white text-sm" />
                  <span className="text-base md:text-lg font-semibold text-white">
                    Delete Account
                  </span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 p-6     -2xl border dark:border-slate-700 max-w-md w-full animate-slide-up">
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
                className="px-6 py-2   bg-red-600 hover:bg-red-700 text-white font-medium transition-all active:scale-100  -md"
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
