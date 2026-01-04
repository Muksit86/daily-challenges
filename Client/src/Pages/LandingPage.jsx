import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../Component/Button";
import { useAuth } from "../Healper/AuthContext";
import Requesting from "../Component/Requesting";

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  const [tickCount, setTickCount] = useState(0);
  const maxTicks = 20;
  const progress = (tickCount / maxTicks) * 100;
  const navigate = useNavigate();
  const { loginAsGuest, isAuthenticated } = useAuth();

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

  return (
    <div className="bg-background dark:bg-background-dark flex flex-col min-h-screen">
      {/* Hero Section - Above the Fold */}
      <section className="flex items-center justify-center px-4 py-16 md:py-20 bg-linear-to-br from-primary/5 via-background dark:from-primary/10 dark:via-background-dark to-secondary/5 dark:to-secondary/10 animate-fade-in">
        <div className="max-w-4xl w-full text-center space-y-4 md:space-y-8 animate-slide-up">
          {/* Headline */}
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight">
            Build consistency,
            <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mt-2">
              one small win a day
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A simple challenge tracker to help you stick to habits — no login,
            no pressure.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-6 pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Guest Mode - Primary */}
              <Button
                text="Continue as Guest"
                textSize="xl"
                paddingClass="px-3 py-4"
                onClick={handleGuestLogin}
              />

              {/* Sign In - Secondary */}
              <Link className="relative">
                {isHovered && (
                  <Requesting
                    className={"absolute -top-45 -left-10 animate-fade-in"}
                  />
                )}
                <button
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="px-10 py-5 text-xl font-semibold   bg-gray-400 dark:bg-gray-400 text-white/50 dark:text-white border-2 border-gray-400 transition-all duration-200 transform"
                >
                  Sign In
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-500 font-medium">
              Guest mode is free • No login required • Start instantly
            </p>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Most habit apps feel overwhelming.
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
            ChallengeHub helps you focus on just showing up today.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-6   bg-linear-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 transform hover:scale-101 transition-all duration-200">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No streak shame
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Miss a day? No problem. Just keep going.
              </p>
            </div>

            <div className="p-6   bg-linear-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 transform hover:scale-101 transition-all duration-200">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No productivity guilt
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Track what matters to you, not us.
              </p>
            </div>

            <div className="p-6   bg-linear-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 transform hover:scale-101 transition-all duration-200">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Just daily progress
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Simple ticks. Visible growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 bg-linear-to-br from-slate-50 dark:from-slate-900 to-white dark:to-background-dark">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            How it works
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 md:p-8   bg-white dark:bg-slate-800/50  -lg hover: -xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="shrink-0 w-12 h-12 md:w-16 md:h-16   bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-white text-2xl md:text-3xl font-bold  -lg">
                1
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                  Create a challenge
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  "Sleep on time", "Read 10 pages", "Walk daily" — whatever
                  matters to you
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 md:p-8   bg-white dark:bg-slate-800/50  -lg hover: -xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="shrink-0 w-12 h-12 md:w-16 md:h-16   bg-linear-to-br from-secondary to-secondary/70 flex items-center justify-center text-white text-2xl md:text-3xl font-bold  -lg">
                2
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                  Log once per day
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  One simple tick — that's it
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-start gap-6 p-6 md:p-8   bg-white dark:bg-slate-800/50  -lg hover: -xl transition-all duration-200 transform hover:-translate-y-1">
              <div className="shrink-0 w-12 h-12 md:w-16 md:h-16   bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl md:text-3xl font-bold  -lg">
                3
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                  See progress over time
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Days completed, days remaining — your journey visualized
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Preview/Demo Section */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-4">
            See it in action
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 text-lg mb-12">
            Try the interactive demo below — this is how satisfying progress
            feels
          </p>

          <div className="flex flex-col items-center justify-center gap-6 p-8 md:p-12  -3xl bg-linear-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
            <div className="relative group">
              <svg
                className="w-64 h-64 md:w-80 md:h-80 transform -rotate-90 transition-transform group-hover:scale-101"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-slate-200 dark:text-slate-700"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 85}`}
                  strokeDashoffset={`${
                    2 * Math.PI * 85 * (1 - progress / 100)
                  }`}
                  className="text-primary transition-all duration-500 ease-out drop- -lg"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                  {tickCount}
                </span>
                <span className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1">
                  / {maxTicks} days
                </span>
                <span className="text-2xl md:text-3xl font-semibold text-primary mt-2">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <button
              onClick={handleTick}
              className="px-10 py-4 bg-primary hover:bg-primary/90 text-white font-semibold   
                                      -xl hover: -2xl transition-all duration-200 transform hover:scale-101 
                                     active:scale-100 text-lg cursor-pointer"
            >
              {tickCount >= maxTicks ? "🎉 Reset Challenge" : "✓ Log Today"}
            </button>

            <p className="text-sm text-slate-500 dark:text-slate-500 text-center max-w-xs">
              Each tick represents a day completed. Watch your progress grow!
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-16 md:py-24 px-4 bg-linear-to-br from-slate-50 dark:from-slate-900 to-white dark:to-background-dark">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 md:p-12  -3xl bg-white dark:bg-slate-800/50  -xl border border-slate-200 dark:border-slate-700">
            <div className="text-4xl text-center mb-6">🔒</div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
              Your data stays in your browser
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 text-center leading-relaxed mb-6">
              We don't require accounts. Everything is saved locally in your
              browser using localStorage.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="text-secondary text-2xl shrink-0">✓</div>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">No login required</span> for
                  the free version — start instantly
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-secondary text-2xl shrink-0">✓</div>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">You own your data</span> —
                  stored in your browser, not our servers
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-secondary text-2xl shrink-0">✓</div>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Delete anytime</span> — clear
                  your data whenever you want
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soft Monetization Section */}
      <section className="py-12 md:py-16 px-4 bg-white dark:bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
            This app is free.
          </p>
          <p className="text-base text-slate-500 dark:text-slate-500">
            Light ads support development. You can remove them anytime.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-linear-to-br from-primary/5 via-background dark:from-primary/10 dark:via-background-dark to-secondary/5 dark:to-secondary/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Ready to build your first habit?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Start your first challenge
          </p>

          <div className="flex flex-col items-center gap-6 pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Guest Mode - Primary */}
              <Button
                text="Continue as Guest"
                textSize="xl"
                paddingClass="px-3 py-4"
                onClick={handleGuestLogin}
              />

              {/* Sign In - Secondary */}
              <Link>
                <button className="px-10 py-5 text-xl font-semibold   bg-gray-400 dark:bg-gray-400 text-white/50 dark:text-white border-2 border-gray-400 transition-all duration-200 transform">
                  Sign In
                </button>
              </Link>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-500">
              Guest mode takes less than 30 seconds to start
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center text-sm text-slate-500 dark:text-slate-500">
          <p>© 2026 ChallengeHub. Simple habits, lasting change.</p>
        </div>
      </footer>
    </div>
  );
}
