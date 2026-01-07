import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { LuMenu, LuMoon, LuSun, LuTreePalm } from "react-icons/lu";
import Button from "../Component/Button";
import { useAuth } from "../Healper/AuthContext";
import { useTheme } from "../Healper/themeContext";
import Requesting from "../Component/Requesting";
import IconImage from "../assets/header_logo_sm.png";

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [requsting, setRequesting] = useState(null);
  const [tickCount, setTickCount] = useState(0);
  const maxTicks = 20;
  const progress = (tickCount / maxTicks) * 100;
  const navigate = useNavigate();
  const { loginAsGuest, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const quickLinks = [
    { link: "/", text: "Home" },
    { link: "/privacy", text: "Privacy" },
    { link: "/contact", text: "Contact" },
    { link: "/about", text: "About" },
  ];

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

  const handleLinkMenu = () => {
    setMenu(!menu);
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
    <div className="bg-background dark:bg-background-dark min-h-screen">
      {/* Navigation Bar */}
      <nav className="w-full bg-white dark:bg-elevation-dark border-black dark:border-white sticky top-0 z-50">
        <div className="flex justify-between items-center md:px-4 md:py-3 p-3 border-black border-b-2">
          <div className="">
            <span className="text-xl font-bold text-primary">
              Challenge Hub
            </span>
          </div>

          <div className="hidden md:flex lg:gap-10 md:gap-4">
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

          <button
            onClick={handleLinkMenu}
            className="md:hidden hover:bg-gray-100 dark:hover:bg-hover-dark p-1 transition-all"
          >
            <LuMenu className="dark:text-white" size={25} />
          </button>
        </div>

        {menu && (
          <div className="md:hidden absolute top-15 bg-background-sidebar p-2 flex flex-col justify-between">
            {quickLinks.map((ql, index) => (
              <Link
                key={index}
                to={ql.link}
                className="text-xs md:text-base font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary px-3 py-2 border-2 border-transparent hover:border-primary hover:bg-primary/5 transition-all"
              >
                {ql.text}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <section className="bg-white dark:bg-background-dark border-b-2 border-black dark:border-white px-4 py-8">
        <div className="mx-auto">
          <div className="flex flex-col justify-center md:flex-row md:justify-between items-center gap-12">
            <div className="flex flex-col gap-4 items-center">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white">
                Build consistency,
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  one small win a day
                </span>
              </h1>

              <p className="text-sm md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed md:w-6/12">
                A simple challenge tracker to help you stick to habits — no
                login, no pressure.
              </p>

              <div className="flex flex-col gap-2 relative">
                <Button
                  text="Continue as Guest"
                  textSize="text-sm"
                  paddingClass="md:px-8 md:py-4 px-4 py-2"
                  shadow="shadow-sm/30"
                  onClick={handleGuestLogin}
                />

                <button
                  onMouseEnter={() => setRequesting(true)}
                  onMouseLeave={() => setRequesting(false)}
                  className="md:px-8 md:py-4 px-4 py-2 text-sm font-semibold bg-gray-400 text-white/50 border-2 border-gray-400 transition-all"
                >
                  Sign In
                </button>

                {requsting && (
                  <Requesting
                    className={
                      "absolute md:right-40 md:-top-50  right-0 -top-50"
                    }
                  />
                )}
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                Guest mode is free • No login required • Ads (if many visitors)
              </p>
            </div>

            <div className="flex justify-center">
              <div className="border-2 border-black dark:border-white bg-white dark:bg-elevation-dark p-6 md:p-8 shadow-sharp-xl w-full max-w-md flex flex-col items-center gap-6">
                <div className="w-full text-center border-b-2 border-black dark:border-white pb-3">
                  <span className="text-lg font-bold text-black dark:text-white">
                    Demo
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

      <section className="bg-gray-100 dark:bg-elevation-dark border-b-2 border-black dark:border-white px-4 py-8">
        <div className="mx-auto flex flex-col gap-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <div className="bg-white dark:bg-background-dark border-2 border-black dark:border-white p-6 shadow-sharp-lg hover:shadow-sharp-xl hover:-translate-x-1 hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center text-2xl font-bold border-2 border-black dark:border-white mb-4">
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

      <section className="bg-white dark:bg-background-dark border-b-2 border-black dark:border-white px-4 py-8">
        <div className="md:w-5/12 w-full mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-black dark:text-white mb-2">
            Simple & Transparent Pricing
          </h2>
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 mb-8">
            Start tracking your habits today, completely free
          </p>

          <div className="bg-white dark:bg-elevation-dark border-2 border-black dark:border-white p-8 md:p-10 shadow-sharp-xl mb-8">
            <div className="text-center border-b-2 border-black dark:border-white pb-6 mb-8">
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                Free Forever
              </h3>
              <div className="flex items-center justify-center">
                <span className="text-5xl font-bold text-primary">$0</span>
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  /month
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="text-sm flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-primary  font-bold">✓</span>
                <span>Unlimited challenges</span>
              </div>

              <div className="text-sm flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-primary  font-bold">✓</span>
                <span>Track progress daily</span>
              </div>

              <div className="text-sm flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-primary  font-bold">✓</span>
                <span>Visual progress tracking</span>
              </div>

              <div className="text-sm flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-primary  font-bold">✓</span>
                <span>No login required (guest mode)</span>
              </div>

              <div className="text-sm flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-primary  font-bold">✓</span>
                <span>Ads (only if many visitors)</span>
              </div>

              <div className="text-sm flex gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-primary  font-bold">✓</span>
                <span>Your data stays in your browser</span>
              </div>
              {/* <div className="   gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-gray-600 dark:text-gray-400 text-xl">
                  ℹ️
                </span>
                <span>Light ads support development</span>
              </div> */}
            </div>

            <Button
              text="Get Started"
              textSize="text-lg"
              paddingClass="px-4 py-2 w-full"
              onClick={handleGuestLogin}
            />
          </div>

          {/* <div className="bg-gray-100 dark:bg-hover-dark border-2 border-black dark:border-white p-6 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>100% Free.</strong> We show light ads to support
              development. You can remove them anytime. Your data is stored
              locally in your browser.
            </p>
          </div> */}
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-elevation-dark border-b-2 border-black dark:border-white px-4 py-8">
        <div className="md:w-5/12 w-full mx-auto">
          <div className="bg-white dark:bg-background-dark border-2 border-black dark:border-white p-8 md:p-12 shadow-sharp-xl">
            <div className="text-center text-4xl mb-2">🔒</div>
            <h2 className="text-xl md:text-3xl font-bold text-center text-black dark:text-white mb-4">
              Your data stays in your browser
            </h2>
            <p className="text-xs text-center text-gray-700 dark:text-gray-300 mb-8">
              We don't require accounts. Everything is saved locally in your
              browser using localStorage.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-3">
                <div className="text-secondary text-xl shrink-0 bg-green-500 px-2">
                  ✓
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">No login required</span> for
                  the free version — start instantly
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-secondary text-xl shrink-0 bg-green-500 px-2">
                  ✓
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">You own your data</span> —
                  stored in your browser, not our servers
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-secondary text-xl shrink-0 bg-green-500 px-2">
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

      <section className="bg-white dark:bg-background-dark border-b-2 border-black dark:border-white px-4 py-8">
        <div className="md:w-5/12 w-full mx-auto flex flex-col gap-10 items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-3">
              Ready to build your first habit?
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Start your first challenge in less than 30 seconds
            </p>
          </div>

          <div className="text-center">
            <div className="w-full">
              <Button
                text="Continue as Guest"
                textSize="text-xs md:text-2xl"
                paddingClass="px-8 py-3"
                className="mx-auto"
                onClick={handleGuestLogin}
                shadow="shadow-xl/30"
              />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              No registration needed • Start tracking immediately
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 dark:bg-elevation-dark border-t-2 border-black dark:border-white px-4 py-8">
        <div className="md:w-5/12 w-full mx-auto">
          <div className="flex gap-4 mb-4 justify-between items-center text-wrap">
            <Link
              to="/"
              className="text-sm font-medium text-black dark:text-white hover:text-primary transitionors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-black dark:text-white hover:text-primary transitionors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium text-black dark:text-white hover:text-primary transitionors"
            >
              Contact Us
            </Link>
            <Link
              to="/privacy-policy"
              className="text-sm font-medium text-black dark:text-white hover:text-primary transitionors"
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
