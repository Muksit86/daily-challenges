import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { LuMoon, LuSun, LuTreePalm } from "react-icons/lu";
import Button from "../Component/Button";
import { useAuth } from "../Healper/AuthContext";
import { useTheme } from "../Healper/themeContext";
import Requesting from "../Component/Requesting";

export default function LandingPage() {
  const [requsting, setRequesting] = useState(null);
  const [tickCount, setTickCount] = useState(0);
  const maxTicks = 20;
  const progress = (tickCount / maxTicks) * 100;
  const navigate = useNavigate();
  const { loginAsGuest, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate("/dashboard");
  };

  const handleTick = () => {
    if (tickCount < maxTicks) {
      setTickCount(tickCount + 1);
    } else {
      setTickCount(0);
    }
  };

  // Calculate stroke dash offset for progress circle
  const circumference = 2 * Math.PI * 85;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="bg-background dark:bg-background-dark flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-elevation-dark border-b-2 border-black dark:border-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="text-xl font-bold text-primary">ChallengeHub</span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link
              to="/"
              className="text-sm md:text-base font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary px-3 py-2 border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm md:text-base font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary px-3 py-2 border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm md:text-base font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary px-3 py-2 border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all"
            >
              Contact Us
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm md:text-base font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary px-3 py-2 border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all"
            >
              Privacy Policy
            </Link>
            <button
              onClick={toggleTheme}
              className="cursor-pointer text-xl p-2 border-2 border-black dark:border-white hover:bg-background-sidebar dark:hover:bg-hover-dark transition-all"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <LuMoon size={25} />
              ) : (
                <LuSun size={25} color="black" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Demo */}
      <section className="bg-white dark:bg-background-dark border-b-2 border-black dark:border-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight">
                Build consistency,
                <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mt-2">
                  one small win a day
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                A simple challenge tracker to help you stick to habits — no
                login, no pressure.
              </p>

              {/* CTA Buttons */}
              <div className="relative flex flex-col sm:flex-row gap-4">
                <Button
                  text="Continue as Guest"
                  textSize="text-lg"
                  paddingClass="px-8 py-4"
                  shadow="shadow-sm/30"
                  onClick={handleGuestLogin}
                />

                <button
                  onMouseEnter={() => setRequesting(true)}
                  onMouseLeave={() => setRequesting(false)}
                  className="px-8 py-4 text-lg font-semibold bg-gray-400 text-white/50 border-2 border-gray-400 transition-all"
                >
                  Sign In
                </button>

                {requsting && (
                  <Requesting className={"absolute right-40 -top-50"} />
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Guest mode is free • No login required • Start instantly
              </p>
            </div>

            {/* Right: Interactive Demo */}
            <div className="flex justify-center md:justify-end">
              <div className="border-2 border-black dark:border-white bg-white dark:bg-elevation-dark p-6 md:p-8 shadow-sharp-xl w-full max-w-md flex flex-col items-center gap-6">
                <div className="w-full text-center border-b-2 border-black dark:border-white pb-3">
                  <span className="text-lg font-bold text-black dark:text-white">
                    Try it now!
                  </span>
                </div>

                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 200 200"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="text-primary transition-all duration-500"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-black dark:text-white">
                      {tickCount}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      / {maxTicks}
                    </span>
                    <span className="text-2xl font-semibold text-black dark:text-white mt-1">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleTick}
                  className={`w-16 h-16 flex items-center justify-center text-3xl border-2 cursor-pointer ${
                    tickCount > 0
                      ? "bg-primary border-primary"
                      : "bg-white dark:bg-elevation-dark border-blue-900"
                  } hover:bg-primary transition-all`}
                >
                  <LuTreePalm className="text-black dark:text-white" />
                </button>

                <p className="text-lg font-bold text-black dark:text-white text-center">
                  My First Challenge
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Click the palm tree to log a day!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 dark:bg-elevation-dark border-b-2 border-black dark:border-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Step 1 */}
            <div className="bg-white dark:bg-background-dark border-2 border-black dark:border-white p-6 shadow-sharp-lg hover:shadow-sharp-xl hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-primary text-white flex items-center justify-center text-2xl font-bold border-2 border-black dark:border-white mb-4">
                1
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">
                Create a challenge
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                "Sleep on time", "Read 10 pages", "Walk daily" — whatever
                matters to you
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-background-dark border-2 border-black dark:border-white p-6 shadow-sharp-lg hover:shadow-sharp-xl hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-secondary text-white flex items-center justify-center text-2xl font-bold border-2 border-black dark:border-white mb-4">
                2
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">
                Log once per day
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                One simple click — that's it
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-background-dark border-2 border-black dark:border-white p-6 shadow-sharp-lg hover:shadow-sharp-xl hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary text-white flex items-center justify-center text-2xl font-bold border-2 border-black dark:border-white mb-4">
                3
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">
                See progress over time
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Days completed, days remaining — your journey visualized
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-background-dark border-2 border-black dark:border-white p-6 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                No streak shame
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Miss a day? No problem. Just keep going.
              </p>
            </div>

            <div className="bg-white dark:bg-background-dark border-2 border-black dark:border-white p-6 text-center">
              <div className="text-5xl mb-4">✨</div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                No productivity guilt
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Track what matters to you, not us.
              </p>
            </div>

            <div className="bg-white dark:bg-background-dark border-2 border-black dark:border-white p-6 text-center">
              <div className="text-5xl mb-4">📈</div>
              <h4 className="text-lg font-bold text-black dark:text-white mb-2">
                Just daily progress
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Simple clicks. Visible growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white dark:bg-background-dark border-b-2 border-black dark:border-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-4">
            Simple & Transparent Pricing
          </h2>
          <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-12">
            Start tracking your habits today, completely free
          </p>

          <div className="bg-white dark:bg-elevation-dark border-2 border-black dark:border-white p-8 md:p-10 shadow-sharp-xl mb-8">
            <div className="text-center border-b-2 border-black dark:border-white pb-6 mb-8">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                Free Forever
              </h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-primary">$0</span>
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  /month
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-primary text-xl font-bold">✓</span>
                <span>Unlimited challenges</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-primary text-xl font-bold">✓</span>
                <span>Track progress daily</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-primary text-xl font-bold">✓</span>
                <span>Visual progress tracking</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-primary text-xl font-bold">✓</span>
                <span>No login required (guest mode)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-primary text-xl font-bold">✓</span>
                <span>Your data stays in your browser</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-gray-600 dark:text-gray-400 text-xl">
                  ℹ️
                </span>
                <span>Light ads support development</span>
              </div>
            </div>

            <Button
              text="Get Started Free"
              textSize="text-lg"
              paddingClass="px-8 py-4 w-full"
              onClick={handleGuestLogin}
            />
          </div>

          <div className="bg-gray-100 dark:bg-hover-dark border-2 border-black dark:border-white p-6 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>100% Free.</strong> We show light ads to support
              development. You can remove them anytime. Your data is stored
              locally in your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Privacy Section */}
      <section className="bg-gray-100 dark:bg-elevation-dark border-b-2 border-black dark:border-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-background-dark border-2 border-black dark:border-white p-8 md:p-12 shadow-sharp-xl">
            <div className="text-center text-5xl mb-6">🔒</div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-black dark:text-white mb-4">
              Your data stays in your browser
            </h2>
            <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              We don't require accounts. Everything is saved locally in your
              browser using localStorage.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-secondary text-2xl shrink-0 bg-green-500 px-2">
                  ✓
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">No login required</span> for
                  the free version — start instantly
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-secondary text-2xl shrink-0 bg-green-500 px-2">
                  ✓
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">You own your data</span> —
                  stored in your browser, not our servers
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-secondary text-2xl shrink-0 bg-green-500 px-2">
                  ✓
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Delete anytime</span> — clear
                  your data whenever you want
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white dark:bg-background-dark border-b-2 border-black dark:border-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white">
            Ready to build your first habit?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Start your first challenge in less than 30 seconds
          </p>

          <div className="flex justify-center">
            <Button
              text="Continue as Guest"
              textSize="text-xl"
              paddingClass="px-10 py-5"
              onClick={handleGuestLogin}
              shadow="shadow-xl/30"
            />
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            No registration needed • Start tracking immediately
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-elevation-dark border-t-2 border-black dark:border-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-8 mb-4 flex-wrap">
            <Link
              to="/"
              className="text-sm font-medium text-black dark:text-white hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-black dark:text-white hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-black dark:text-white hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm font-medium text-black dark:text-white hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2026 ChallengeHub. Simple habits, lasting change.
          </p>
        </div>
      </footer>
    </div>
  );
}
