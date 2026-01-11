import React, { useState, useEffect } from "react";
import { useChallenges } from "../Healper/ChallengesContext";
import { useLog } from "../Healper/LogContext";
import Button from "../Component/Button";
import { LuPlus, LuX, LuPartyPopper } from "react-icons/lu";
import { Link, useNavigate, useSearchParams } from "react-router";
import ChallenegCard from "../Component/ChallenegCard";
import { useTrialProtection } from "../hooks/useTrialProtection";
import { FREE_TRIAL_DAYS } from "../config/clientConfig";

export default function Dashboard() {
  const { getChallenges, loading: challengesLoading } = useChallenges();
  const { TEST_MODE, toggleTestMode, loading: logsLoading } = useLog();

  const allChallenges = getChallenges();
  const isLoading = challengesLoading || logsLoading;
  const navigate = useNavigate();
  const { handleProtectedAction, user, accountType } = useTrialProtection();
  const [searchParams, setSearchParams] = useSearchParams();

  // Banner state
  const [showBanner, setShowBanner] = useState(false);

  // Check if banner should be shown - only for free trial accounts
  useEffect(() => {
    const showBannerParam = searchParams.get("showBanner");
    const bannerDismissed = localStorage.getItem("welcomeBannerDismissed");

    // Only show banner for free trial accounts, not paid accounts
    if (showBannerParam === "true" && !bannerDismissed && accountType === "free_trial") {
      setShowBanner(true);
      // Remove the query parameter from URL
      searchParams.delete("showBanner");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, accountType]);

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem("welcomeBannerDismissed", "true");
  };

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-between p-5 border-black dark:border-white bg-background dark:bg-background-dark overflow-x-scroll animate-fade-in">
        {/* Welcome Banner for Free Trial Users */}
        {showBanner && (
          <div className="w-full mb-5 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary p-4 md:p-5 shadow-sharp-lg relative animate-slide-up">
            <button
              onClick={dismissBanner}
              className="absolute top-2 right-2 p-1 hover:bg-primary/20 transition-all"
              aria-label="Dismiss banner"
            >
              <LuX className="w-5 h-5 text-black dark:text-white" />
            </button>

            <div className="flex items-start gap-3 md:gap-4">
              <LuPartyPopper className="w-8 h-8 md:w-10 md:h-10 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold text-black dark:text-white mb-2">
                  Welcome to Challenge Hub! 🎉
                </h2>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
                  You're all set with your {FREE_TRIAL_DAYS}-day free trial! Start creating challenges and build lasting habits.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleProtectedAction(() => navigate("/newchallenge"))}
                    text="Create Your First Challenge"
                    textSize="text-xs md:text-sm"
                    paddingClass="px-3 py-2"
                    icon={<LuPlus className="w-4 h-4" />}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Head Button */}
        {allChallenges.length != 0 && (
          <header className="w-full flex justify-between mb-5 items-center animate-slide-up">
            <Button
              onClick={handleProtectedAction(() => navigate("/newchallenge"))}
              showTextOnMobile={false}
              text="New challenge"
              paddingClass="px-2 py-2"
              icon={<LuPlus className="w-5 h-5" />}
            />

            {/* Test Mode Toggle */}
            <button
              onClick={toggleTestMode}
              className={`px-3 py-2 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 ${TEST_MODE
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                }`}
            >
              {TEST_MODE ? "🧪 Minutes Mode" : "📅 Days Mode"}
            </button>
          </header>
        )}

        {/* Loading State */}
        {isLoading ? (
          <section className="flex flex-col items-center justify-center gap-4 flex-1 animate-pulse">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
              Loading challenges...
            </p>
          </section>
        ) : (
          <>
            {/* No Challenges */}
            {allChallenges.length === 0 ? (
              <section className="flex flex-col items-center justify-center gap-4 flex-1 animate-slide-up px-4">
                <div className="mb-4">
                  <svg
                    className="fill-black dark:fill-white"
                    width="50"
                    viewBox="0 0 200 200"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44.7761" height="45" />
                    <rect x="155.224" width="44.7761" height="45" />
                    <path d="M31.4079 200H0V169.397H30.7481V141.33H167.861V169.397H199.005V200H167.597V172.727H31.4079V200Z" />
                  </svg>
                </div>
                <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white text-center">
                  No challenges yet
                </p>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 text-center">
                  Create your first challenge to get started
                </p>

                <Button
                  onClick={handleProtectedAction(() => navigate("/newchallenge"))}
                  textSize="text-xs md:text-2xl"
                  text="Create Challenge"
                  icon={<LuPlus className="w-6 h-6" />}
                />

              </section>
            ) : (
              <>
                {/* All Challenges Grid */}
                <section className="w-full flex-1">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white mb-4 md:mb-6 animate-slide-up">
                    Your Challenges
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center">
                    {allChallenges.map((challenge) => (
                      <ChallenegCard key={challenge.id} challenge={challenge} />
                    ))}
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
