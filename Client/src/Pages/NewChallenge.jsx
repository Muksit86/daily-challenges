import React, { useState } from "react";
import { LuCalendar, LuTreePalm, LuBell, LuClock } from "react-icons/lu";
import { useNavigate } from "react-router";
import { useChallenges } from "../Healper/ChallengesContext";
import { useAuth } from "../Healper/AuthContext";
import { useTrialProtection } from "../hooks/useTrialProtection";
import notificationService from "../services/notificationService";
import { toast } from "react-toastify";

export default function NewChallenge() {
  const navigate = useNavigate();
  const { addChallenge, loading } = useChallenges();
  const { authType, trialStatus } = useAuth();
  const { handleProtectedAction } = useTrialProtection();

  const [title, setTitle] = useState("");
  const [days, setDays] = useState("100");
  const [customDays, setCustomDays] = useState("");
  const [error, setError] = useState("");

  // Notification settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("20:00"); // Default 8 PM

  const handleNotificationToggle = async (enabled) => {
    setNotificationsEnabled(enabled);

    if (enabled) {
      // Check if notifications are supported
      if (!notificationService.isSupported()) {
        toast.error("Notifications are not supported in this browser");
        setNotificationsEnabled(false);
        return;
      }

      // Check current permission
      const permission = await notificationService.getPermission();

      if (permission === 'denied') {
        toast.error("Please enable notifications in your browser settings");
        setNotificationsEnabled(false);
        return;
      }

      if (permission !== 'granted') {
        // Request permission
        const granted = await notificationService.requestPermission();
        if (!granted) {
          toast.error("Notification permission denied");
          setNotificationsEnabled(false);
          return;
        }
        toast.success("Notifications enabled!");
      }
    }
  };

  const handleSave = async () => {
    // Check trial status first - redirect if expired
    handleProtectedAction(async () => {
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

      // TODO: Add notification settings to challenge creation
      // For now, we'll add the challenge without notification settings
      // Backend needs to be updated to accept these fields
      const challengeData = {
        title,
        days: selectedDays,
        notificationsEnabled,
        reminderTime: notificationsEnabled ? reminderTime : null,
      };

      // Add the challenge
      const result = await addChallenge(title, selectedDays);
      if (result.success) {
        // Navigate back to challenges page
        navigate("/dashboard");
      } else {
        setError(result.error || "Failed to create challenge");
      }
    })();
  };

  return (
    <>
      <main className="flex-1 bg-background dark:bg-background-dark flex justify-center items-center animate-fade-in py-10">
        <section className="w-11/12 d flex flex-col gap-10 p-2 md:w-5/12 md:mt-0 bg-white dark:bg-slate-800 md:p-6 border dark:border-slate-700 animate-slide-up">
          {/* Title Section */}
          <section className="flex flex-col text-black dark:text-white gap-2">
            <label className="flex items-center gap-2 w-fit text-sm md:text-xl font-semibold text-slate-900 dark:text-white">
              <LuTreePalm size={20} />
              <span>Title</span>
            </label>
            <input
              placeholder="Enter your challenge title"
              className="border dark:border-slate-600 p-3 text-md md:text-lg bg-white dark:bg-slate-700 dark:text-white  -md focus:outline-blue-400 focus:outline-2 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </section>

          {/* Days Section */}
          <section className="flex flex-col text-black dark:text-white gap-2">
            <label className="flex items-center gap-2 w-fit text-md md:text-xl font-semibold text-slate-900 dark:text-white">
              <LuCalendar size={20} />
              <span>Duration</span>
            </label>
            <select
              className="border dark:border-slate-600 p-3 text-md md:text-lg bg-white dark:bg-slate-700 dark:text-white focus:outline-blue-400 focus:outline-2 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            >
              <option value="30">30 Days</option>
              <option value="75">75 Days</option>
              <option value="100">100 Days</option>
              {/* <option value="custom">Custom Days</option> */}
            </select>

            {/* Custom Days Input */}
            {days === "custom" && (
              <input
                placeholder="Enter number of days"
                className="border dark:border-slate-600 p-3 text-md md:text-lg bg-white dark:bg-slate-700 dark:text-white focus:outline-blue-400 focus:outline-2 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all animate-slide-up"
                type="number"
                min="1"
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
              />
            )}
          </section>

          {/* Notification Settings Section */}
          <section className="flex flex-col text-black dark:text-white gap-3 border-t dark:border-slate-600 pt-4">
            <label className="flex items-center gap-2 w-fit text-md md:text-xl font-semibold text-slate-900 dark:text-white">
              <LuBell size={20} />
              <span>Daily Reminders</span>
            </label>

            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded border dark:border-slate-600">
              <div className="flex flex-col">
                <span className="text-sm md:text-base font-medium">Enable Notifications</span>
                <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Get daily reminders to log your progress</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => handleNotificationToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Reminder Time Picker - Show only when enabled */}
            {notificationsEnabled && (
              <div className="flex flex-col gap-2 animate-slide-up">
                <label className="flex items-center gap-2 text-sm md:text-base font-medium text-slate-900 dark:text-white">
                  <LuClock size={18} />
                  <span>Reminder Time</span>
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="border dark:border-slate-600 p-3 text-md md:text-lg bg-white dark:bg-slate-700 dark:text-white focus:outline-blue-400 focus:outline-2 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
                />
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                  We'll remind you at {reminderTime} every day to log your progress
                </p>
              </div>
            )}
          </section>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700  text-red-700 dark:text-red-200 text-sm animate-slide-up">
              {error}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-4 transition-all duration-200 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Challenge"}
          </button>
        </section>
      </main>
    </>
  );
}
